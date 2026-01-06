export type GetDepartmentOut = {
    department_id: number;
    parent_department_id: number;
    department_name: string;
    children: GetDepartmentOut[];
}

export type PutDepartmentIn = {
    department_id: number | null;
    department_name: string;
    parent_department_id: number;
    children: PutDepartmentIn[];
}

export type TreeData = {
    name: string;
    attributes: { department_id: number; parent_department_id: number };
    children: TreeData[];
}

export type PutDepartmentOut = {
    department_id: number;
}

export type DeleteDepartmentIn = {
    department_id: number;
}

export type DeleteDepartmentOut = {
    department_id: number;
}

export type PostDepartmentIn = {
    parent_department_id: number;
    department_name: string;
}

export type PostDepartmentOut = {
    department_id: number;
}

export type UpdateDepartmentNameIn = {
    department_name: string;
}

export type UpdateDepartmentNameOut = {
    department_id: number;
}

export interface TreeNodeDatum {
    name: string;
    attributes?: Record<string, string | number | boolean>;
    children?: TreeNodeDatum[];
}
