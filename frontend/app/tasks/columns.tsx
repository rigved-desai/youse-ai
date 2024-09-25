"use client"

import { ColumnDef } from "@tanstack/react-table";
import dayjs from 'dayjs';
import { ArrowUpDown, ArrowDown, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button";

export type Task = {
    title?: string,
    description?: string,
    status?: string,
    priority?: string,
    dueDate?: Date
};

const taskPrioritySortValues: Record<string, number> = {
    'Low': 0,
    'Medium': 1,
    'High': 2
} as const;

const taskStatusSortValues: Record<string, number> = {
    'To Do': 0,
    'In Progress': 1,
    'Completed': 2
};

export const taskTableColumns: ColumnDef<Task>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ getValue }) => {
        const description = getValue() as string | undefined;
        return description ? description : "-";
      }
    },
    {
      accessorKey: "status",
      sortingFn: (rowA, rowB, columnId) => {
        const valA = rowA.getValue(columnId) as string;
        const valB = rowB.getValue(columnId) as string;
        if(!Object.keys(taskStatusSortValues).includes(valA)) {
            return 1;
        }
        if(!Object.keys(taskStatusSortValues).includes(valB)) {
            return -1;
        }
        return taskStatusSortValues[valA] - taskStatusSortValues[valB];
    },
      header: ({ column }) => {
        const handleSort = () => {
            if(!column.getIsSorted()) {
                column.toggleSorting();
            }
            else if(column.getIsSorted() === 'asc') {
                column.toggleSorting(true);
            }
            else {
                column.toggleSorting();
            }
        }
        return (
          <Button
            variant="ghost"
            onClick={handleSort}
          >
            Status
            {
                !column.getIsSorted() ? <ArrowUpDown className="ml-2 h-4 w-4" />: 
                column.getIsSorted() === 'asc' ?<ArrowDown className="ml-2 h-4 w-4" />: <ArrowUp className="ml-2 h-4 w-4" />
            }
          </Button>
        )
      }
    },
    {
        accessorKey: "priority",
        sortingFn: (rowA, rowB, columnId) => {
            const valA = rowA.getValue(columnId) as string;
            const valB = rowB.getValue(columnId) as string;
            if(!Object.keys(taskPrioritySortValues).includes(valA)) {
                return 1;
            }
            if(!Object.keys(taskPrioritySortValues).includes(valB)) {
                return -1;
            }
            return taskPrioritySortValues[valA] - taskPrioritySortValues[valB];
        },
        header: ({ column }) => {
            const handleSort = () => {
                if(!column.getIsSorted()) {
                    column.toggleSorting();
                }
                else if(column.getIsSorted() === 'asc') {
                    column.toggleSorting(true);
                }
                else {
                    column.toggleSorting();
                }
            }
            return (
              <Button
                variant="ghost"
                onClick={handleSort}
              >
                Priority
                {
                    !column.getIsSorted() ? <ArrowUpDown className="ml-2 h-4 w-4" />: 
                    column.getIsSorted() === 'asc' ?<ArrowDown className="ml-2 h-4 w-4" />: <ArrowUp className="ml-2 h-4 w-4" />
                }
              </Button>
            )
          }
    },
    {
        accessorKey: "dueDate",
        header: ({ column }) => {
            const handleSort = () => {
                if(!column.getIsSorted()) {
                    column.toggleSorting();
                }
                else if(column.getIsSorted() === 'asc') {
                    column.toggleSorting(true);
                }
                else {
                    column.toggleSorting();
                }
            }
            return (
              <Button
                variant="ghost"
                onClick={handleSort}
              >
                Due Date
                {
                    !column.getIsSorted() ? <ArrowUpDown className="ml-2 h-4 w-4" />: 
                    column.getIsSorted() === 'asc' ?<ArrowDown className="ml-2 h-4 w-4" />: <ArrowUp className="ml-2 h-4 w-4" />
                }
              </Button>
            )
          },
        cell: ({ getValue }) => {
            const date = getValue() as string | undefined;
            return date ? dayjs(date).format("DD/MM/YY") : "-";
        }
    },
];
