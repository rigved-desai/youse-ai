'use client';

import { DataTable } from '@/components/DataTable/DataTable';
import { taskTableColumns } from '../columns';
import { fetchTasks, Task } from '@/app/api/api';
import { useEffect, useState } from 'react';
import StatusFilter from './StatusFilter';
import PriorityFilter from './PriorityFilter';
import TaskCreateDialog from './TaskCreateDialog';
import { delay, handleError } from '@/app/utils/utils';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'sonner';

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => {
    setRefresh((prev) => {
      return !prev;
    });
  };

  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    const fetchAndSetData = async () => {
      setLoading(true);
      try {
        await delay(2000);
        const tasks = await fetchTasks({ status, priority });
        setTasks(tasks);
      } catch (err) {
        const error = handleError(err);
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAndSetData();
  }, [status, priority, refresh]);

  if (loading) {
    return (
      <div className="container flex justify-center gap-5 p-2">
        <ThreeDots color="black" />
      </div>
    );
  }

  return (
    <>
      <div className="container flex gap-5 p-2">
        <TaskCreateDialog toggleRefresh={toggleRefresh} />
        <StatusFilter status={status} setStatus={setStatus} />
        <PriorityFilter priority={priority} setPriority={setPriority} />
      </div>
      <DataTable columns={taskTableColumns} data={tasks} />
    </>
  );
}
