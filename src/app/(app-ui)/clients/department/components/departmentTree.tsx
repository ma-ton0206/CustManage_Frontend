"use client";

import { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import { GetDepartmentOut, TreeData } from "@/types/Department";
import { getDepartmentsAPI } from "@/app/API/departent";

type DepartmentTreeProps = {
    treeData: TreeData[];
    setTreeData: (treeData: TreeData[]) => void;
    convertToTreeData: (dept: GetDepartmentOut) => TreeData;
    onSelectNode: (node: any) => void;
    client_id: number;
    token: string;
};

export default function DepartmentTree({ treeData, setTreeData, convertToTreeData, onSelectNode, client_id, token }: DepartmentTreeProps) {
    const [translate, setTranslate] = useState({ x: 0, y: 0 });


    useEffect(() => {
        const dimensions = document.getElementById("tree-container")?.getBoundingClientRect();
        if (dimensions) {
            setTranslate({ x: dimensions.width / 2, y: 50 });
        }
    }, []);

    useEffect(() => {
        const fetchDepartments = async () => {
            const data = await getDepartmentsAPI(client_id, token);
            const treeData: TreeData[] = data.map(convertToTreeData);
            setTreeData(treeData);
        }
        fetchDepartments();
    }, [])



    return (
        <div id="tree-container" style={{ width: "100%", height: "800px" }}>
            {treeData.length > 0 ? (
                <Tree
                    data={treeData}
                    translate={translate}
                    orientation="vertical"
                    onNodeClick={(node: any) => onSelectNode(node.data)}
                    pathFunc="diagonal"
                />
            ) : (
                <div>データがありません</div>
            )}
        </div>
    );
}
