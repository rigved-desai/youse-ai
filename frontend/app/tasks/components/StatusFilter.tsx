import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter } from 'lucide-react';

export type StatusFilterProps = {
  status: string;
  setStatus: (newStatus: string) => void;
};

export enum TaskStatus {
  TO_DO = 'To Do',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}

export default function StatusFilter({ status, setStatus }: StatusFilterProps) {
  const handleChange = (newStatus: string) => {
    return () => {
      if (status === newStatus) {
        setStatus('');
      } else setStatus(newStatus);
    };
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          <Filter className="mx-1" />
          {status !== '' ? `Status: ${status}` : 'Status'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Task Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={status === TaskStatus.TO_DO}
          onClick={handleChange(TaskStatus.TO_DO)}
        >
          To Do
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={status === TaskStatus.IN_PROGRESS}
          onClick={handleChange(TaskStatus.IN_PROGRESS)}
        >
          In Progress
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={status === TaskStatus.COMPLETED}
          onCheckedChange={handleChange(TaskStatus.COMPLETED)}
        >
          Completed
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
