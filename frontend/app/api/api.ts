const API_BASE_URL = "http://localhost:8000/api"

export type FetchTasksResponse = {
    data?: {
        _id: string,
        title: string,
        status: string,
        priority: string,
        description?: string
    }[],
    error?: string
};

export async function fetchTasks(status: string, priority: string) {
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