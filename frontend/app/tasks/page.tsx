"use client";

import { useEffect, useState } from "react"
import { fetchTasks } from "../api/api"
import { Task } from "./columns";
import PriorityFilter from "./components/PriorityFilter";
import StatusFilter from "./components/StatusFilter";
import TasksTable from "./components/TasksTable";


export default function TasksPage() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);

    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");

    useEffect(() => {
        const fetchAndSetData = async () => {
            try {
                const tasks = await fetchTasks(status, priority); 
                setTasks(tasks);
            }
            catch(err) {
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchAndSetData();
    }, [status, priority]);
    
    if(loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="max-w-[80vw] mx-auto">
            <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here's a list of your tasks!
            </p>
          </div>
            <div className="container flex p-2 gap-5">
                <StatusFilter status={status} setStatus={setStatus} />
                <PriorityFilter priority={priority} setPriority={setPriority} />
            </div>
        <TasksTable tasks={tasks} />
        </div>
    )

}