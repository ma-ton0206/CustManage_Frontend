import { TaskStatus } from "@/constants/status";

export type GetTaskOut = {
    task_id: number;
    content: string;
    status: TaskStatus;
    due_date: string;
    is_completed: boolean;
}

export type PostTaskIn = {
    content: string;
    due_date: string;
    status: TaskStatus;
    is_completed: boolean;
}

export type PostTaskOut = {
    task_id: number;
}

export type PutTaskIn = {
    is_completed: boolean;
    content: string;
    due_date: string;
    status: TaskStatus;
}

export type PutTaskOut = {
    task_id: number;
}

export type DeleteTaskOut = {
    task_id: number;
}