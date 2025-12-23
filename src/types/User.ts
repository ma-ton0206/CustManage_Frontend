import { UserRole } from "../constants/status";
//Inはフロント→バック
//Outはバック→フロント

export type GetUserOut = {
    user_id: string;
    user_name: string;
    user_email: string;
    user_role: UserRole;
}

export type PostUserIn = {
    user_email: string;
    user_password: string;
    user_name: string;
    company_id: string;
}

export type PostUserOut = {
    user_id: string;
    company_id: string;
}

export type PutUserIn = {
    user_email: string;
    user_password: string;
    user_name: string;
}

export type DeleteUserInOut = {
    user_id: string;
}

export type LoginUserIn = {
    user_email: string;
    user_password: string;
}

export type LoginUserOut = {
    user_id: string;
    user_name: string;
    user_email: string;
    access_token: string;
}

export type AdminCreateUserIn = {
    user_email: string;
    user_role: UserRole;
}

export type AdminCreateUserOut = {
    message: string;
    user_email: string;
    token: string;
}

export type ActivateUserIn = {
    user_email: string;
    user_password: string;
    token: string;
}

export type ActivateUserOut = {
    message: string;
}