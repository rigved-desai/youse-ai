"use client"

import { DataTable } from "@/components/DataTable/DataTable";
import { taskTableColumns } from "../columns";
import { fetchTasks, Task } from "@/app/api/api";
import { useEffect, useState } from "react";
import StatusFilter from "./StatusFilter";
import PriorityFilter from "./PriorityFilter";
import TaskCreateDialog from "./TaskCreateDialog";
import { delay } from "@/app/utils/utils";
import {ThreeDots} from 'react-loader-spinner';


export default function Tasks() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);

    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");

    useEffect(() => {
        const fetchAndSetData = async () => {
            setLoading(true);
            try {
                await delay(2000);
                const tasks = await fetchTasks({status, priority}); 
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
            <div className="container flex justify-center p-2 gap-5">
                <ThreeDots color="black"/>
            </div>    
        )
    }

    return (
        <>
        <div className="container flex p-2 gap-5">
                <TaskCreateDialog />
                <StatusFilter status={status} setStatus={setStatus} />
                <PriorityFilter priority={priority} setPriority={setPriority} />
            </div>
        <DataTable columns={taskTableColumns} data={tasks} />
        </>
    )
}