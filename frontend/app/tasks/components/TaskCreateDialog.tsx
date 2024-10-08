import { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CirclePlus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TaskStatus } from './StatusFilter';
import { TaskPriority } from './PriorityFilter';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { createTask } from '@/app/api/api';
import { ThreeDots } from 'react-loader-spinner';
import { delay, handleError } from '@/app/utils/utils';
import { toast } from 'sonner';

export type TaskCreateDialogProps = {
  toggleRefresh: () => void;
};

export default function TaskCreateDialog({ toggleRefresh }: TaskCreateDialogProps) {
  const [newTitle, setNewTitle] = useState<string>();
  const [newDescription, setNewDescription] = useState<string>();
  const [newStatus, setNewStatus] = useState<string>();
  const [newPriority, setnewPriority] = useState<string>();
  const [newDueDate, setnewDueDate] = useState<Date>();

  const [loading, setLoading] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewDescription(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await delay(2000);
      await createTask({
        title: newTitle,
        status: newStatus,
        priority: newPriority,
        description: newDescription,
        dueDate: newDueDate,
      });
      toast.success('Task created successfully!');
      toggleRefresh();
    } catch (err) {
      const error = handleError(err);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <CirclePlus className="mx-1" />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <Label htmlFor="title">Title</Label>
        <Input id="title" value={newTitle} onChange={handleTitleChange} />
        <Label htmlFor="description">Description</Label>
        <Input id="description" value={newDescription} onChange={handleDescriptionChange} />
        <div className="flex flex-row gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-[50%] flex-grow border" variant="secondary">
                Status: {newStatus}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={newStatus} onValueChange={setNewStatus}>
                <DropdownMenuRadioItem value={TaskStatus.TO_DO}>To Do</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={TaskStatus.IN_PROGRESS}>
                  In Progress
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={TaskStatus.COMPLETED}>
                  Completed
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-[50%] flex-grow border" variant="secondary">
                Priority: {newPriority}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={newPriority} onValueChange={setnewPriority}>
                <DropdownMenuRadioItem value={TaskPriority.LOW}>Low</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={TaskPriority.MEDIUM}>Medium</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={TaskPriority.HIGH}>High</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'justify-start text-left font-normal',
                !newDueDate && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {newDueDate ? format(newDueDate, 'PPP') : <span>Pick a Due Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={newDueDate} onSelect={setnewDueDate} initialFocus />
          </PopoverContent>
        </Popover>
        <DialogFooter>
          <Button disabled={loading} type="submit" size={'lg'} onClick={handleSubmit}>
            {!loading ? 'Create' : <ThreeDots color="white" height="20" width="30" />}
          </Button>
        </DialogFooter>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
