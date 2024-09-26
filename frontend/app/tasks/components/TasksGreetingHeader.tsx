"use client";

import { useUser } from "@/app/contexts/UserContext";

export type TasksGreetingHeaderProps = {
    username: string;
}

export default function TasksGreetingHeader({username} : TasksGreetingHeaderProps) {
    
    const userContext = useUser();
    if(!userContext) {
        console.log("No user context");
        return null;
    }
    const {user, updateUserContext} = userContext;
    if(!user) {
        updateUserContext(username);
    }

    return (
        <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back {username}!</h2>
            <p className="text-muted-foreground">
              Here's a list of your tasks!
            </p>
        </div>
    )
}