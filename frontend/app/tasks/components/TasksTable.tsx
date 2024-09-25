import { DataTable } from "@/components/DataTable/DataTable";
import { Task, taskTableColumns } from "../columns";

export type TasksTableProps = {
    tasks: Task[]
}

export default function TasksTable({tasks} : TasksTableProps) {
    return (
        <DataTable columns={taskTableColumns} data={tasks} />
    )
}