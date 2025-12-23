export type GetContactOut = {
    contact_id: number;
    contact_name: string;
    role: string;
    contact_email: string;
    contact_phone: string;
}

export type PutContactIn = {
    contact_id: number | null;
    contact_name: string;
    role: string;
    contact_email: string;
    contact_phone: string;
}

export type PutContactOut = {
    contact_id: number;
}

export type DeleteContactIn = {
    contact_id: number;
}

export type DeleteContactOut = {
    contact_id: number;
}

export type PostContactIn = {
    department_id: number;
    contact_name: string;
    role: string;
    contact_email: string;
    contact_phone: string;
}

export type PostContactOut = {
    contact_id: number;
}