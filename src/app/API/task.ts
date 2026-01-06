import { GetTaskOut, PostTaskIn, PutTaskIn, PostTaskOut, PutTaskOut, DeleteTaskOut } from "@/types/Task";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTasksAPI = async (token: string) => {
    try {
        console.log("token", token);
        if (!token) {
            throw new Error("Token is required");
        }
        console.log("getTasksAPI called");
        const response = await fetch(`${API_URL}/api/tasks`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log("response", response);
        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }
        console.log("response ok");
        const data: GetTaskOut[] = await response.json();
        console.log("data", data);
        return data;    
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createTaskAPI = async (task_in: PostTaskIn, token: string) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        const response = await fetch(`${API_URL}/api/tasks`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(task_in),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to create task");
        }
        const data: PostTaskOut = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateTaskAPI = async (task_id: number, task: PutTaskIn, token: string) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        const response = await fetch(`${API_URL}/api/tasks/${task_id}`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(task),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json", 
            },
        });
        if (!response.ok) {
            throw new Error("Failed to update task");
        }
        const data: PutTaskOut = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteTaskAPI = async (task_id: number, token: string) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        const response = await fetch(`${API_URL}/api/tasks/${task_id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to delete task");
        }
        const data: DeleteTaskOut = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}