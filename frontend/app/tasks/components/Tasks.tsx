"use client"

import { DataTable } from "@/components/DataTable/DataTable";
import { taskTableColumns } from "../columns";
import { fetchTasks, Task } from "@/app/api/api";
import { useEffect, useState } from "react";
import StatusFilter from "./StatusFilter";
import PriorityFilter from "./PriorityFilter";
import TaskCreateDialog from "./TaskCreateDialog";


export default function Tasks() {

    const [tasks, setTasks2] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);

    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");

    useEffect(() => {
        const fetchAndSetData = async () => {
            setLoading(true);
            try {
                const tasks = await fetchTasks({status, priority}); 
                setTasks2(tasks);
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