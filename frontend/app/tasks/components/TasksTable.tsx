import { DataTable } from "@/components/DataTable/DataTable";
import { taskTableColumns } from "../columns";
import { Task } from "@/app/api/api";

export type TasksTableProps = {
    tasks: Task[]
}

export default function TasksTable({tasks} : TasksTableProps) {
    return (
        <DataTable columns={taskTableColumns} data={tasks} />
    )
}