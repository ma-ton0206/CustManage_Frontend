import { DeleteDepartmentOut, GetDepartmentOut, PostDepartmentIn, PostDepartmentOut, PutDepartmentIn, PutDepartmentOut, UpdateDepartmentNameOut } from "@/types/Department";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getDepartmentsAPI = async (client_id: number, token: string) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        const res = await fetch(`${API_URL}/api/departments/${client_id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error("Failed to fetch departments");
        }
        const data: GetDepartmentOut[] = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const postDepartmentAPI = async (client_id: number, token: string, department: PostDepartmentIn) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        const res = await fetch(`${API_URL}/api/departments/${client_id}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(department),
        });
        if (!res.ok) {
            throw new Error("Failed to post department");
        }
        const data: PostDepartmentOut = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const putDepartmentAPI = async (client_id: number, token: string, department: PutDepartmentIn) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        const res = await fetch(`${API_URL}/api/departments/${client_id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(department),
        });
        if (!res.ok) {
            throw new Error("Failed to put department");
        }
        const data: PutDepartmentOut = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteDepartmentAPI = async (client_id: number, token: string, department_id: number) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        const res = await fetch(`${API_URL}/api/departments/${client_id}/${department_id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error("Failed to delete department");
        }
        const data: DeleteDepartmentOut = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateDepartmentNameAPI = async (
    client_id: number,
    token: string,
    department_id: number,
    department_name: string
) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        const res = await fetch(`${API_URL}/api/departments/${client_id}/${department_id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ department_name: department_name }),
        });
        if (!res.ok) {
            throw new Error("Failed to update department name");
        }
        const data: UpdateDepartmentNameOut = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}