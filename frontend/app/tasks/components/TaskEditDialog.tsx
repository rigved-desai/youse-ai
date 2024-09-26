
import {useState, ChangeEvent} from 'react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { TaskStatus } from './StatusFilter';
import { TaskPriority } from './PriorityFilter';

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
import { updateTask } from '@/app/api/api';
import { delay, handleError } from '@/app/utils/utils';
import { ThreeDots } from "react-loader-spinner";
import {toast} from 'sonner';


export type TaskEditDialogProps = {
    taskId: string
    title?: string,
    status?: string,
    priority?: string
    description?: string,
    dueDate?: Date
};
 
export default function TaskEditDialog({taskId, title, status, priority, description, dueDate} : TaskEditDialogProps) {

    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [newStatus, setNewStatus] = useState(status);
    const [newPriority, setnewPriority] = useState(priority);
    const [newDueDate, setnewDueDate] = useState<Date | undefined>(dueDate ?? undefined);

    const [loading, setLoading] = useState(false);

    const handleTitleChange= (e : ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    }

    const handleDescriptionChange= (e : ChangeEvent<HTMLInputElement>) => {
        setNewDescription(e.target.value);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await delay(2000);
            await updateTask({
                taskId,
                title: newTitle,
                status: newStatus,
                priority: newPriority,
                description: newDescription,
                dueDate: newDueDate
            });
            toast.success("Task updated successfully!");
        }
        catch(err) {
            const error = handleError(err);
            toast.error(error);
        }
        finally {
            setLoading(false);
        }
    } 
    
    return (
        <Dialog>
  <DialogTrigger>
  <Button variant='outline'>
    <Edit className="ml-2 h-4 w-4" />
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Task</DialogTitle>
    </DialogHeader>

    <Label htmlFor="title">Ttile</Label>
      <Input id="title" value={newTitle} onChange={handleTitleChange}/>
    <Label htmlFor="description">Description</Label>
      <Input id="description" value={newDescription} onChange={handleDescriptionChange} />
      <div  className="flex flex-row gap-5">
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='flex-grow border w-[50%]' variant='secondary'>Status: {newStatus}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={newStatus} onValueChange={setNewStatus}>
          <DropdownMenuRadioItem value={TaskStatus.TO_DO}>To Do</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={TaskStatus.IN_PROGRESS}>In Progress</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={TaskStatus.COMPLETED}>Completed</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Button className='flex-grow border w-[50%]' variant='secondary'>Priority: {newPriority}</Button>
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
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !newDueDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {newDueDate ? format(newDueDate, "PPP") : <span>Pick a Due Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={newDueDate}
          onSelect={setnewDueDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    <DialogFooter>
        <Button disabled={loading} type='submit' size={'lg'} onClick={handleSubmit}>{!loading ? "Save Changes" : <ThreeDots color="white" height="20"
  width="30"/>}</Button>
    </DialogFooter>
    <DialogFooter>
    </DialogFooter>
    

  </DialogContent>
</Dialog>

    )
}