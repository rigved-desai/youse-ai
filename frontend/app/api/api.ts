const API_BASE_URL = "http://localhost:8000/api"

export type Task = {
    _id: string
    title?: string,
    description?: string,
    status?: string,
    priority?: string,
    dueDate?: Date
};

export type FetchTasksRequest = {
    status?: string,
    priority?: string
}

export type FetchTasksResponse = {
    data?: {
        _id: string,
        title: string,
        status: string,
        priority: string,
        description?: string,
        dueDate?: Date
    }[],
    error?: string
};

export async function fetchTasks(req?: FetchTasksRequest) {
    const status = req?.status ?? "";
    const priority = req?.priority ?? "";
    const queryParams = {
        status,
        priority
    };
    const queryURLString = new URLSearchParams(queryParams).toString();
    try {
        const resp = await fetch(`${API_BASE_URL}/task?${queryURLString}`);
        const respBody = await resp.json() as FetchTasksResponse;
        const { data, error } = respBody;
        if(error) {
            throw Error(error);
        }
        if(!data) {
            throw Error("Something went wrong!");
        }
        return data;
    }
    catch(err) {
        throw err;
    }
}

export type UpdateTaskRequest = {
    taskId: string;
    title?: string,
    description?: string,
    status?: string,
    priority?: string
}

export async function updateTask(req : UpdateTaskRequest) {
    try {
        const {taskId, title, description, status, priority} = req;
        const resp = await fetch(`${API_BASE_URL}/task/${taskId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                status,
                priority
            })
        });
        console.log(resp.ok);
    }
    catch(err) {
        throw err;
    }
}