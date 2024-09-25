import { Droppable } from "@/components/dnd/Droppable"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { TaskCardComponent } from "../page"
  

export type TaskColumnProps = {
    header: string,
    taskComponents: TaskCardComponent[];
}

export default function TaskColumn({header, taskComponents} : TaskColumnProps) {

    const renderedComponents = taskComponents.filter((component)=> {
        if(component.parent === header) {
            console.log(component.parent);
            return component;
        }
    });

    return (
        <div className="flex flex-grow">
            <Droppable id={header}>
        <Card >
            <CardHeader>
                <CardTitle>{header}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className=" gap-0.5 flex flex-col flex-grow">
                 {
                    renderedComponents.length > 0 ?
                    renderedComponents.map((component) => {
                        return component.taskCard
                    }) : <p>No Tasks</p>
                 }
                 </div>
            </CardContent>
        </Card>
            </Droppable>
            </div>
    )
}