import Tasks from "./components/Tasks";
import { redirect } from "next/navigation";
import jwt from 'jsonwebtoken';
import {cookies} from 'next/headers';
import TasksGreetingHeader from "./components/TasksGreetingHeader";

export default async function TasksPage() {

    const cookieStore = cookies();
    const token = cookieStore.get("tasks-auth-token");
    if(!token) {
        redirect("/login");
    }
    const payload = jwt.decode(token.value) as {username: string};
    const username = payload.username;

    return (
        <div className="max-w-[80vw] mx-auto">
            <TasksGreetingHeader username={username}/>
          <Tasks />
        </div>
    )

}