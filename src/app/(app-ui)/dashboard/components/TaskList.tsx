"use client";

import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { TaskStatus } from "@/constants/status";
import { GetTaskOut, PostTaskIn, PutTaskIn } from "@/types/Task";
import { getTasksAPI, createTaskAPI, updateTaskAPI, deleteTaskAPI } from "@/app/API/task";
import { useAuth } from "@/app/contexts/auth/auth";

// const mockTasks: GetTaskOut[] = [
//     { task_id: 1, content: "未対応案件1", status: TaskStatus.DONE as unknown as typeof TaskStatus, due_date: new Date("2025-01-01"), is_completed: false },
//     { task_id: 2, content: "未対応案件2", status: TaskStatus.NOT_STARTED as unknown as typeof TaskStatus, due_date: new Date("2025-01-01"), is_completed: false },
//     { task_id: 3, content: "未対応案件3", status: TaskStatus.IN_PROGRESS as unknown as typeof TaskStatus, due_date: new Date("2025-01-01"), is_completed: false },
//     { task_id: 4, content: "未対応案件4", status: TaskStatus.NOT_STARTED as unknown as typeof TaskStatus, due_date: new Date("2025-01-01"), is_completed: false },
// ];

//backからfront：YYYY-MM-DD
//frontからback：YYYY-MM-DD
//front内では

// export const convertTaskDate = (task: GetTaskOut): GetTaskOut => {
//     const toDateObj = (date: Date): Date => {
//         return new Date(date);
//     };
//     return {
//         ...task,
//         due_date: toDateObj(task.due_date)
//     };
// };

// export const convertPutTaskDate = (task: PutTaskIn): PutTaskIn => {
//     return {
//         ...task,
//         due_date: new Date(task.due_date.toISOString().split("T")[0]),
//     };
// };

export default function TaskList() {
    const { token, isLoggedIn } = useAuth();
    const [content, setContent] = useState("");
    const [tasks, setTasks] = useState<GetTaskOut[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<GetTaskOut[]>([]);
    //実際はPostTask
    const newTask: PostTaskIn = {
        content: content,
        due_date: new Date().toISOString().split("T")[0],
        status: TaskStatus.NOT_STARTED,
        is_completed: false
    };

    const fetchTasks = async () => {
        try {
            if (!isLoggedIn || !token) return;
            console.log("TaskList token", token);
            console.log("TaskList isLoggedIn", isLoggedIn);
            const res = await getTasksAPI(token);
            console.log("res", res);
            setTasks(res);
            setFilteredTasks(res);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (!isLoggedIn || !token) return;
        fetchTasks();
    }, [isLoggedIn, token]);

    //ここはPOST APIを呼び出す
    const handleAddTask = async () => {
        try {
            if (!isLoggedIn || !token) return;
            console.log("TaskList handleAddTask token", token);
            console.log("TaskList handleAddTask isLoggedIn", isLoggedIn);
            const res = await createTaskAPI(newTask, token);
            if (res) {
                fetchTasks();
                setContent("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateTask = async (task_id: number, task: PutTaskIn) => {
        try {
            if (!isLoggedIn || !token) return;
            console.log("TaskList handleUpdateTask token", token);
            console.log("TaskList handleUpdateTask isLoggedIn", isLoggedIn);
            const updatedTask = {
                is_completed: task.is_completed,
                content: task.content,
                due_date: task.due_date,
                status: task.status,
            }
            const res = await updateTaskAPI(task_id, updatedTask, token);
            if (res) {
                fetchTasks();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleStatusFilter = (status: string) => {
        if (status === "") {
            setFilteredTasks(tasks);
        } else if (status === String(TaskStatus.NOT_STARTED)) {
            setFilteredTasks(tasks.filter((task: GetTaskOut) =>
                task.status === TaskStatus.NOT_STARTED)
            );
        } else if (status === String(TaskStatus.IN_PROGRESS)) {
            setFilteredTasks(tasks.filter((task: GetTaskOut) =>
                task.status === TaskStatus.IN_PROGRESS)
            );
        } else if (status === String(TaskStatus.DONE)) {
            setFilteredTasks(tasks.filter((task: GetTaskOut) =>
                task.status === TaskStatus.DONE)
            );
        }
    };

    const handleDeleteTask = async (task_id: number) => {
        try {
            if (!isLoggedIn || !token) return;
            console.log("TaskList handleDeleteTask token", token);
            console.log("TaskList handleDeleteTask isLoggedIn", isLoggedIn);
            const res = await deleteTaskAPI(task_id, token);
            if (res) {
                fetchTasks();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                未対応案件
            </Typography>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
                <TextField
                    size="small"
                    placeholder="入力してください。"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <TextField
                    select
                    label="ソート"
                    size="small"
                    sx={{ minWidth: 120 }}
                    defaultValue=""
                    onChange={(e) => handleStatusFilter(e.target.value)}
                >
                    <MenuItem value="">全て</MenuItem>
                    <MenuItem value={String(TaskStatus.NOT_STARTED)}>未着手</MenuItem>
                    <MenuItem value={String(TaskStatus.IN_PROGRESS)}>作業中</MenuItem>
                    <MenuItem value={String(TaskStatus.DONE)}>完了</MenuItem>
                </TextField>
                <Button variant="contained" onClick={handleAddTask}>追加</Button>
            </Box>

            {filteredTasks.map((task: GetTaskOut) => (
                <Box
                    key={task.task_id}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={1}
                    p={1}
                    border="1px solid #ddd"
                    borderRadius={2}
                    bgcolor="#fff"
                >
                    <Typography>{task.content}</Typography>
                    <TextField
                        select
                        size="small"
                        value={String(task.status)}
                        onChange={(e) => handleUpdateTask(task.task_id, { ...task, status: Number(e.target.value) as TaskStatus })}
                    >
                        <MenuItem value={String(TaskStatus.NOT_STARTED)}>未着手</MenuItem>
                        <MenuItem value={String(TaskStatus.IN_PROGRESS)}>作業中</MenuItem>
                        <MenuItem value={String(TaskStatus.DONE)}>完了</MenuItem>
                    </TextField>
                    <TextField
                        type="date"
                        size="small"
                        value={task.due_date}
                        sx={{ width: 150 }}
                        onChange={(e) => handleUpdateTask(task.task_id, { ...task, due_date: e.target.value })}
                    />
                    <Button variant="contained" color="error" onClick={() => handleDeleteTask(task.task_id)}>削除</Button>
                </Box>
            ))}
        </Box>
    );
}
