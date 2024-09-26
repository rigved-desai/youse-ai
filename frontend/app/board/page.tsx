"use client";
import { Draggable } from "@/components/dnd/Draggable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import dayjs from "dayjs";
import { ReactNode, useEffect, useState } from "react"
import { fetchTasks, updateTask } from "../api/api";
import { delay, handleError } from "../utils/utils";
import TaskColumn from "./components/TaskColumn";
import {toast} from 'sonner';


export type TaskCardComponent = {
    taskCard: ReactNode,
    id: UniqueIdentifier
    parent: UniqueIdentifier
};

export default function BoardPage() {

    const [taskComponents, setTaskComponents] = useState<TaskCardComponent[]>([]);
    const[loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAndSetData = async () => {
            setLoading(true);
            try {
                await delay(2000);
                const tasks = await fetchTasks();
                setTaskComponents(tasks.map((task) => {
                    return {
                        taskCard: (
                            <Draggable id={task._id}>
                                <Card className="my-4 mx-2 flex-grow" key={task._id}>
                                <CardHeader>
                                    <CardTitle>{task.title}</CardTitle>
                                    <CardDescription>{task.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Priority: {task.priority ?? "-"}</p>
                                    <p>Due Date: {task.dueDate ? dayjs(task.dueDate).format("DD-MM-YY") : "-"}</p>
                                </CardContent>
                            </Card>
                            </Draggable>
                        ),
                        id: task._id,
                        parent: task.status
                    } 
                }));
            }
            catch(err) {
                const error = handleError(err);
                toast.error(error);
            }        
            finally{
                setLoading(false);
            }
        }
        fetchAndSetData();
    }, []);

    async function handleDragEnd(event : DragEndEvent) {
        const {over, active} = event;
        if(!over) return;
        try {
            await updateTask({taskId: active.id as string, status: over.id as string});
        }
        catch(err) {
            const error = handleError(err);
            toast.error(error);
        }
        setTaskComponents((prevComponents) => {
            return prevComponents.map((taskComponent) => {
                if(taskComponent.id === active.id) {
                    return {
                        ...taskComponent,
                        parent: over.id
                    }
                }
                return taskComponent;
            })
        })
    }

    return (
        <div className="max-w-[80vw] mx-auto">
        <div>
        <h2 className="text-2xl font-bold tracking-tight">Kanban Board</h2>
        <p className="text-muted-foreground">
          Move your tasks around!
        </p>
      </div>
      <div className="p-3 flex gap-5">
        <DndContext onDragEnd={handleDragEnd}>
            <TaskColumn header="To Do" taskComponents={taskComponents} loading={loading}/>
            <TaskColumn header="In Progress" taskComponents={taskComponents} loading={loading}/>
            <TaskColumn header="Completed" taskComponents={taskComponents} loading={loading}/>
        </DndContext>
      </div>
    </div>
    )
}