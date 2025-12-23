import { AdminCreateUserIn, GetUserOut } from "@/types/User";

export const LoginAPI = async (email: string, password: string, setErrorMsg: (err: string) => void) => {
    try {
        const res = await fetch("http://localhost:8000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                user_email: email,
                user_password: password,
            }),
        });

        if (!res.ok) {
            const err = await res.json();
            setErrorMsg(err.detail || 'ログインに失敗しました');
            return false;
        }
        const data = await res.json();

        return {
            success: true,
            token: data.token,
            user: {
                user_id: data.user_id,
                user_name: data.user_name,
                user_email: data.user_email,
                user_role: data.user_role,
            } as GetUserOut,
        };

    } catch (err) {
        console.error('Login error:', err);
        setErrorMsg('通信エラーが発生しました');
    }
}

export const AdminCreateUserAPI = async (user_in: AdminCreateUserIn, token: string, setErrorMsg: (err: string) => void) => {
    try {
        const res = await fetch("http://localhost:8000/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify(user_in),
        });
        if (!res.ok) {
            const err = await res.json();
            setErrorMsg(err.detail || '仮登録に失敗しました');
            return false;
        }
        const data = await res.json();
        return { success: true, message: data.message, token: data.token };
    } catch (err) {
        console.error('AdminCreateUser error:', err);
        setErrorMsg('通信エラーが発生しました');
    }
}

export const RegisterCompleteAPI = async (userName: string, password: string, userEmail: string, token: string, setErrorMsg: (err: string) => void) => {
    try {
        const res = await fetch("http://localhost:8000/api/users/activate", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify({
                user_name: userName,
                user_email: userEmail,
                user_password: password,
                token: token,
            }),
        });
        if (!res.ok) {
            const err = await res.json();
            setErrorMsg(err.detail || '登録完了に失敗しました');
            return false;
        }
        const data = await res.json();
        return { success: true, message: data.message };
    } catch (err) {
        console.error('RegisterComplete error:', err);
        setErrorMsg('通信エラーが発生しました');
    }
}

export const FetchMeAPI = async (token: string) => {
    try {
        const res = await fetch("http://localhost:8000/api/users/me", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error("Not authenticated");
        }
        const data = await res.json();
        return {
            success: true,
            user: {
                user_id: data.user_id,
                user_name: data.user_name,
                user_email: data.user_email,
                user_role: data.user_role,
            } as GetUserOut
        };
    }

    catch (err) {
        console.error('FetchMe error:', err);
        throw new Error('通信エラーが発生しました');
    }
}