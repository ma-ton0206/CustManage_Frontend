export enum TaskStatus {
    NOT_STARTED = 1, //未着手
    IN_PROGRESS = 2, //作業中
    DONE = 3, //完了
}

export const TaskStatusLabel: Record<TaskStatus, string> = {
    [TaskStatus.NOT_STARTED]: "未着手",
    [TaskStatus.IN_PROGRESS]: "作業中",
    [TaskStatus.DONE]: "完了",
};

export enum SalesStatus {
    ORDER_CONFIRMED = 1,   // 受注済み
    NOT_SOLD = 2,          // 未売上
    SOLD = 3,              // 売上済み
}

export const SalesStatusLabel: Record<SalesStatus, string> = {
    [SalesStatus.ORDER_CONFIRMED]: "受注済み",
    [SalesStatus.NOT_SOLD]: "未売上",
    [SalesStatus.SOLD]: "売上済み",
};

export enum UserRole {
    ADMIN = 1, //管理者
    USER = 2, //ユーザー
}

export const adminMenuItems = [
    {
        label: "ダッシュボード",
        path: "/dashboard",
    },
    {
        label: "顧客管理",
        children: [
            { label: "顧客検索", path: "/clients/search" },
            { label: "顧客追加", path: "/clients/add" },
        ],
    },
    {
        label: "販売実績",
        children: [
            { label: "実績一覧", path: "/sales/search" },
            { label: "新規登録", path: "/sales/add" },
            { label: "顧客別実績", path: "/sales/trend" },
        ],
    },
    {
        label: "ユーザー管理",
        path: "/register",
    },
    // {
    //     label: "競合情報",
    //     path: "/competitors",
    // },
    // {
    //     label: "設定",
    //     path: "/settings",
    // }
    // {
    //     label:"404 Not Found",
    //     path: "/not-found",
    // }
];

export const userMenuItems = [
    {
        label: "ダッシュボード",
        path: "/dashboard",
    },
    {
        label: "顧客管理",
        children: [
            { label: "顧客検索", path: "/clients/search" },
            { label: "顧客追加", path: "/clients/add" },
        ],
    },
    {
        label: "販売実績",
        children: [
            { label: "実績一覧", path: "/sales/search" },
            { label: "新規登録", path: "/sales/add" },
            { label: "顧客別実績", path: "/sales/trend" },
        ],
    },
    // {
    //     label: "競合情報",
    //     path: "/competitors",
    // },
    // {
    //     label: "設定",
    //     path: "/settings",
    // }
    // {
    //     label:"404 Not Found",
    //     path: "/not-found",
    // }
];