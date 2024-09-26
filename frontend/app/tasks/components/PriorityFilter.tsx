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

export type PriorityFilterProps = {
  priority: string;
  setPriority: (newPriority: string) => void;
};

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export default function PriorityFilter({ priority, setPriority }: PriorityFilterProps) {
  const handleChange = (newPriority: string) => {
    return () => {
      if (priority === newPriority) {
        setPriority('');
      } else setPriority(newPriority);
    };
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          <Filter className="mx-1" />
          {priority !== '' ? `Priority: ${priority}` : 'Priority'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Task Priority</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={priority === TaskPriority.LOW}
          onClick={handleChange(TaskPriority.LOW)}
        >
          Low
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={priority === TaskPriority.MEDIUM}
          onClick={handleChange(TaskPriority.MEDIUM)}
        >
          Medium
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={priority === TaskPriority.HIGH}
          onCheckedChange={handleChange(TaskPriority.HIGH)}
        >
          High
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
