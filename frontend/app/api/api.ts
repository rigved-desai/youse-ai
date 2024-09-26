import { redirect } from 'next/navigation';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getAuthToken() {
  return Cookies.get('tasks-auth-token');
}

export type Task = {
  _id: string;
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: Date;
};

export type FetchTasksRequest = {
  status?: string;
  priority?: string;
};

export type FetchTasksResponse = {
  data?: {
    _id: string;
    title: string;
    status: string;
    priority: string;
    description?: string;
    dueDate?: Date;
  }[];
  error?: string;
};

export async function fetchTasks(req?: FetchTasksRequest) {
  const status = req?.status ?? '';
  const priority = req?.priority ?? '';
  const queryParams = {
    status,
    priority,
  };
  const queryURLString = new URLSearchParams(queryParams).toString();
  try {
    const authToken = getAuthToken();
    const resp = await fetch(`${API_BASE_URL}/task?${queryURLString}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const respBody = (await resp.json()) as FetchTasksResponse;
    const { data, error } = respBody;
    if (error) {
      throw Error(error);
    }
    if (!data) {
      throw Error('Something went wrong!');
    }
    return data;
  } catch (err) {
    throw err;
  }
}

export type CreateTaskRequest = {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: Date;
};

export type CreateTaskResponse = {
  error?: string;
};

export async function createTask(req: CreateTaskRequest) {
  try {
    const authToken = getAuthToken();
    const { title, description, status, priority, dueDate } = req;
    const resp = await fetch(`${API_BASE_URL}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        title,
        description,
        status,
        priority,
        dueDate,
      }),
    });
    const respBody = (await resp.json()) as CreateTaskResponse;
    const { error } = respBody;
    if (error) {
      throw Error(error);
    }
  } catch (err) {
    throw err;
  }
}

export type UpdateTaskRequest = {
  taskId: string;
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: Date;
};

export type UpdateTaskResponse = {
  data: {
    _id: string;
    title: string;
    status: string;
    priority: string;
    description?: string;
    dueDate?: Date;
  };
  error?: string;
};

export async function updateTask(req: UpdateTaskRequest) {
  try {
    const authToken = getAuthToken();
    const { taskId, title, description, status, priority, dueDate } = req;
    const resp = await fetch(`${API_BASE_URL}/task/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        title,
        description,
        status,
        priority,
        dueDate,
      }),
    });
    const respBody = (await resp.json()) as UpdateTaskResponse;
    const { data, error } = respBody;
    if (error) {
      throw Error(error);
    }
    if (!data) {
      throw Error('Something went wrong!');
    }
  } catch (err) {
    throw err;
  }
}

export type DeleteTaskRequest = {
  taskId: string;
};

export type DeleteTaskResponse = {
  error?: string;
};

export async function deleteTask(req: DeleteTaskRequest) {
  try {
    const authToken = getAuthToken();
    const { taskId } = req;
    const resp = await fetch(`${API_BASE_URL}/task/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    const respBody = (await resp.json()) as DeleteTaskResponse;
    const { error } = respBody;
    if (error) {
      throw Error(error);
    }
  } catch (err) {
    throw err;
  }
}

export type SignUpUserRequest = {
  username: string;
  password: string;
};

export type SignUpUserResponse = {
  error?: string;
};

export async function signUpUser(req: SignUpUserRequest) {
  try {
    const { username, password } = req;
    const resp = await fetch(`${API_BASE_URL}/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const respBody = (await resp.json()) as SignUpUserResponse;
    const { error } = respBody;
    if (error) {
      throw Error(error);
    }
  } catch (err) {
    throw err;
  }
}

export type LoginUserRequest = {
  username: string;
  password: string;
};
export type LoginUserResponse = {
  error?: string;
};

export async function loginUser(req: LoginUserRequest) {
  try {
    const { username, password } = req;
    const resp = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const respBody = (await resp.json()) as LoginUserResponse;
    const { error } = respBody;
    if (error) {
      throw Error(error);
    }
    const authHeader = resp.headers.get('Authorization');
    if (!authHeader) {
      throw Error('Something went wrong!');
    }
    const token = authHeader.split(' ')[1];
    Cookies.set('tasks-auth-token', token, {
      expires: 1,
    });
  } catch (err) {
    throw err;
  }
}

export function logoutUser() {
  Cookies.remove('tasks-auth-token');
  redirect('/login');
}
