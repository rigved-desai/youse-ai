import { TaskStatus } from '@/app/tasks/components/StatusFilter';
import { Droppable } from '@/components/dnd/Droppable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, CircleDashed, Timer } from 'lucide-react';
import { TaskCardComponent } from '../page';

export type TaskColumnProps = {
  header: string;
  taskComponents: TaskCardComponent[];
  loading: boolean;
};

export default function TaskColumn({ header, taskComponents, loading }: TaskColumnProps) {
  const renderedComponents = taskComponents.filter((component) => {
    if (component.parent === header) {
      return component;
    }
  });

  return (
    <div className="flex flex-grow">
      <Droppable id={header}>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex flex-row gap-1">
                {header === TaskStatus.TO_DO ? (
                  <CircleDashed color="grey" />
                ) : header === TaskStatus.IN_PROGRESS ? (
                  <Timer color="orange" />
                ) : (
                  <CheckCircle color="green" />
                )}
                {<p className="mt-1">{header}</p>}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!loading ? (
              <div className="flex flex-col gap-0.5">
                {renderedComponents.length > 0 ? (
                  renderedComponents.map((component) => {
                    return component.taskCard;
                  })
                ) : (
                  <p>No Tasks</p>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Skeleton className="h-[125px] w-auto rounded-xl" key={1} />
                <Skeleton className="h-[125px] w-auto rounded-xl" key={2} />
                <Skeleton className="h-[125px] w-auto rounded-xl" key={3} />
              </div>
            )}
          </CardContent>
        </Card>
      </Droppable>
    </div>
  );
}
