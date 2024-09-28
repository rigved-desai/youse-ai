'use client';

import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import {
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
  CircleDashed,
  Timer,
  CheckCircle,
  ChevronRight,
  ChevronUp,
  ChevronsUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Task } from '../api/api';
import TaskEditDialog from './components/TaskEditDialog';
import { TaskStatus } from './components/StatusFilter';
import { TaskPriority } from './components/PriorityFilter';

const taskPrioritySortValues: Record<string, number> = {
  Low: 0,
  Medium: 1,
  High: 2,
};

const taskStatusSortValues: Record<string, number> = {
  'To Do': 0,
  'In Progress': 1,
  Completed: 2,
};

export const taskTableColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ getValue }) => {
      const description = getValue() as string | undefined;
      return description ? description : '-';
    },
  },
  {
    accessorKey: 'status',
    sortingFn: (rowA, rowB, columnId) => {
      const valA = rowA.getValue(columnId) as string;
      const valB = rowB.getValue(columnId) as string;
      if (!Object.keys(taskStatusSortValues).includes(valA)) {
        return 1;
      }
      if (!Object.keys(taskStatusSortValues).includes(valB)) {
        return -1;
      }
      return taskStatusSortValues[valA] - taskStatusSortValues[valB];
    },
    header: ({ column }) => {
      const handleSort = () => {
        if (!column.getIsSorted()) {
          column.toggleSorting();
        } else if (column.getIsSorted() === 'asc') {
          column.toggleSorting(true);
        } else {
          column.toggleSorting();
        }
      };
      return (
        <Button variant="ghost" onClick={handleSort}>
          Status
          {!column.getIsSorted() ? (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUp className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const status = getValue() as string;
      return (
        <div className="flex flex-row gap-1">
          {status === TaskStatus.TO_DO ? (
            <CircleDashed color="grey" />
          ) : status === TaskStatus.IN_PROGRESS ? (
            <Timer color="orange" />
          ) : (
            <CheckCircle color="green" />
          )}
          {<p className="mt-0.5">{status}</p>}
        </div>
      );
    },
  },
  {
    accessorKey: 'priority',
    sortingFn: (rowA, rowB, columnId) => {
      const valA = rowA.getValue(columnId) as string;
      const valB = rowB.getValue(columnId) as string;
      if (!Object.keys(taskPrioritySortValues).includes(valA)) {
        return 1;
      }
      if (!Object.keys(taskPrioritySortValues).includes(valB)) {
        return -1;
      }
      return taskPrioritySortValues[valA] - taskPrioritySortValues[valB];
    },
    header: ({ column }) => {
      const handleSort = () => {
        if (!column.getIsSorted()) {
          column.toggleSorting();
        } else if (column.getIsSorted() === 'asc') {
          column.toggleSorting(true);
        } else {
          column.toggleSorting();
        }
      };
      return (
        <Button variant="ghost" onClick={handleSort}>
          Priority
          {!column.getIsSorted() ? (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUp className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const priority = getValue() as string;
      return (
        <div className="flex flex-row gap-1">
          {priority === TaskPriority.LOW ? (
            <ChevronRight color="green" />
          ) : priority === TaskPriority.MEDIUM ? (
            <ChevronUp color="orange" />
          ) : (
            <ChevronsUp color="red" />
          )}
          {<p className="mt-0.5">{priority}</p>}
        </div>
      );
    },
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => {
      const handleSort = () => {
        if (!column.getIsSorted()) {
          column.toggleSorting();
        } else if (column.getIsSorted() === 'asc') {
          column.toggleSorting(true);
        } else {
          column.toggleSorting();
        }
      };
      return (
        <Button variant="ghost" onClick={handleSort}>
          Due Date
          {!column.getIsSorted() ? (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUp className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const date = getValue() as string | undefined;
      return date ? dayjs(date).format('DD/MM/YY') : '-';
    },
  },
  {
    id: 'Update',
    cell: ({ row }) => {
      const task = row.original;
      const { _id, title, description, status, priority, dueDate } = task;
      return (
        <TaskEditDialog
          taskId={_id}
          title={title}
          description={description}
          status={status}
          priority={priority}
          dueDate={dueDate}
        ></TaskEditDialog>
      );
    },
  },
];
