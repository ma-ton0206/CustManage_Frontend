import { DeleteClientOut, GetClientDetailOut, GetClientOut, PostClientIn, PostClientOut, PutClientIn, PutClientOut } from "@/types/Client";

export const getClientsAPI = async (token: string) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        const response = await fetch(`http://localhost:8000/api/clients`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch clients");
        }
        const data: GetClientOut[] = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createClientAPI = async (client_in: PostClientIn, token: string) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        const response = await fetch(`http://localhost:8000/api/clients`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(client_in),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to create client");
        }
        const data: PostClientOut = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getClientDetailAPI = async (client_id: number, token: string) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        const response = await fetch(`http://localhost:8000/api/clients/${client_id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch client detail");
        }
        const data: GetClientDetailOut = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const updateClientAPI = async (client_id: number, client_in: PutClientIn, token: string) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        const response = await fetch(`http://localhost:8000/api/clients/${client_id}`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(client_in),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to update client");
        }
        const data: PutClientOut = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteClientAPI = async (client_id: number, token: string) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        const response = await fetch(`http://localhost:8000/api/clients/${client_id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to delete client");
        }
        const data: DeleteClientOut = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}