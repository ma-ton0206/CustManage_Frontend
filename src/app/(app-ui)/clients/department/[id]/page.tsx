"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import DepartmentTree from "../components/departmentTree";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "next/navigation";
import PageProtection from "@/app/pageProtection";
import { useAuth } from "@/app/contexts/auth/auth";
import { getDepartmentsAPI, postDepartmentAPI, putDepartmentAPI, deleteDepartmentAPI, updateDepartmentNameAPI } from "@/app/API/departent";
import { GetDepartmentOut, TreeData } from "@/types/Department";

export default function DepartmentPage() {
    const { id } = useParams();
    const { token } = useAuth();

    const [treeData, setTreeData] = useState<TreeData[]>([]);
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [departmentName, setDepartmentName] = useState("");

    // ノード選択時
    const handleSelectNode = (node: any) => {
        setSelectedNode(node);
        setDepartmentName(node.name);
    };

    const convertToTreeData = (dept: GetDepartmentOut): TreeData => {
        return {
            name: dept.department_name,
            attributes: {
                department_id: dept.department_id,
                parent_department_id: dept.parent_department_id,
            },
            children: dept.children?.map(convertToTreeData) ?? [],
        };
    };

    const handleSaveDepartmentName = async () => {
        if (window.confirm("保存しますか？")) {
            try {
                await updateDepartmentNameAPI(
                    parseInt(id as string),
                    token,
                    selectedNode.attributes.department_id,
                    departmentName)
                const data = await getDepartmentsAPI(parseInt(id as string), token);
                setTreeData(data.map(convertToTreeData));
            } catch (error) {
                console.error(error);
                console.log("保存に失敗しました");
            }
            finally {
                setSelectedNode(null);
                setDepartmentName("");
            }
        } else {
            console.log("保存をキャンセルしました");
        }
    };

    const handleDeleteDepartment = async () => {
        if(selectedNode.attributes.parent_department_id === 0) {
            alert("親ノードは削除できません");
            return;
        }
        if (window.confirm("削除しますか？")) {
            try {
                await deleteDepartmentAPI(parseInt(id as string), token, selectedNode.attributes.department_id);
                const data = await getDepartmentsAPI(parseInt(id as string), token);
                setTreeData(data.map(convertToTreeData));
            } catch (error) {
                console.error(error);
            }
            finally {
                setSelectedNode(null);
                setDepartmentName("");
            }
        } else {
            console.log("削除をキャンセルしました");
        }
    }

    const handleAddChildNode = async () => {
        try {
            await postDepartmentAPI(
                parseInt(id as string),
                token,
                {
                    parent_department_id: selectedNode.attributes.department_id,
                    department_name: departmentName
                }
            );
            const data = await getDepartmentsAPI(parseInt(id as string), token);
            setTreeData(data.map(convertToTreeData));
        } catch (error) {
            console.error(error);
        }
        finally {
            setSelectedNode(null);
            setDepartmentName("");
        }
    }

    return (
        <PageProtection>
            <Box p={4} bgcolor="#fff" border="1px solid #ddd">
                {/* 上部 編集フォーム */}
                {
                    selectedNode && (
                        <Box mb={3} borderBottom="1px solid #ddd" pb={2}>
                            <Typography variant="h6" gutterBottom>
                                選択中: {selectedNode.name}
                            </Typography>

                            <Box display="flex" alignItems="center" gap={2} mb={2}>
                                <TextField
                                    label="部署名"
                                    value={departmentName}
                                    onChange={(e) => setDepartmentName(e.target.value)}
                                    size="small"
                                />
                                <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={handleAddChildNode}>
                                    子ノード追加
                                </Button>
                                <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDeleteDepartment}>
                                    削除
                                </Button>
                                <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSaveDepartmentName}>
                                    保存
                                </Button>
                            </Box>
                        </Box>
                    )
                }

                {/* ツリー図 */}
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="60vh"
                    border="1px solid #ccc"
                    borderRadius={2}
                    p={2}
                >
                    <DepartmentTree treeData={treeData} setTreeData={setTreeData} convertToTreeData={convertToTreeData} onSelectNode={handleSelectNode} client_id={parseInt(id as string)} token={token} />
                </Box>

                {/* 下部ボタン */}
                <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                    <Button variant="contained" color="error" startIcon={<CloseIcon />}>
                        キャンセル
                    </Button>
                    <Button variant="contained" color="primary" startIcon={<SaveIcon />}>
                        保存
                    </Button>
                </Box>
            </Box >
        </PageProtection >
    );
}
