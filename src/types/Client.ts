export type GetClientOut = {
    client_id: number;
    client_name: string;
    client_address: string;
    client_phone: string;
}

export type GetClientDetailOut = {
    client_id: number;
    client_name: string;
    industry: string;
    client_phone: string;
    client_address: string;
}

export type GetTopClientOut = {
    client_id: number;
    client_name: string;
    year_sales_price: number;
}

export type PostClientIn = {
    client_name: string;
    industry: string;
    client_phone: string;
    client_address: string;
}

export type PostClientOut = {
    client_id: number;
}

export type PutClientIn = {
    client_name: string;
    industry: string;
    client_phone: string;
    client_address: string;
}

export type PutClientOut = {
    client_id: number;
}

export type DeleteClientOut = {
    client_id: number;
}

export type GetClientNameOut = {
    client_name: string;
}