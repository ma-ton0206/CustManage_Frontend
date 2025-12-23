import { GetSalesDetailOut, GetSalesOut, GetSalesTrendOut, GetYearSalesOut, PostSalesIn, PostSalesOut, PutSalesIn, PutSalesOut, GetTopSalesOut } from "@/types/Sales";

export const getSalesAPI = async (token: string) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        const response = await fetch(`http://localhost:8000/api/sales`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch sales");
        }
        const data: GetSalesOut[] = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const getSalesDetailAPI = async (sales_id: number, token: string) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        const response = await fetch(`http://localhost:8000/api/sales/${sales_id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch sales detail");
        }
        const data: GetSalesDetailOut = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const createSalesAPI = async (sales: PostSalesIn, token: string) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        console.log("typeof sales:", typeof sales);
        console.log("sales:", sales);
        const response = await fetch(`http://localhost:8000/api/sales`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(sales),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to create sales");
        }
        const data: PostSalesOut = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const putSalesAPI = async (sales_id: number, sales: PutSalesIn, token: string) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        const response = await fetch(`http://localhost:8000/api/sales/${sales_id}`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(sales),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to update sales");
        }
        const data: PutSalesOut = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const getSalesTrendAPI = async (client_id: number, start_date: string, end_date: string, token: string) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        const response = await fetch(`http://localhost:8000/api/sales/trend/${client_id}?start_date=${start_date}&end_date=${end_date}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch sales trend");
        }
        const data: GetSalesTrendOut[] = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const getYearSalesAPI = async (year: number, token: string) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        const response = await fetch(`http://localhost:8000/api/sales/trend/year/${year}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch year sales");
        }
        const data: GetYearSalesOut[] = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const getTopSalesAPI = async (year: number, token: string) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        const response = await fetch(`http://localhost:8000/api/sales/top/${year}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch top sales");
        }
        const data: GetTopSalesOut[] = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}