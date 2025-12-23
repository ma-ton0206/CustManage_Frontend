"use client";

import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { adminMenuItems, userMenuItems, UserRole } from "@/constants/status";
import { usePathname } from "next/navigation";
import { Fragment, useState, useEffect } from "react";
import { useLoading } from "@/app/contexts/Loading/LoadingContext";
import { useAuth } from "@/app/contexts/auth/auth";


export default function Sidebar() {
    const { setIsLoading, navigateTo } = useLoading();
    const { user } = useAuth();
    const [openMenu, setOpenMenu] = useState<string | null>(null); // 親の開閉状態
    const [activePage, setActivePage] = useState<string>("ダッシュボード");

    const pathname = usePathname();

    useEffect(() => {
        // ✅ ページパスが変わったらローディングをOFFにする
        setIsLoading(false);
    }, [pathname, setIsLoading]);

    const handleClick = (path: string) => {
        setActivePage(path);
        navigateTo(path);
    }

    return (
        <Box
            width={200}
            bgcolor="#f4f4f4"
            minHeight="100vh"
            borderRight="1px solid #ddd"
            p={2}
        >
            <Typography variant="h6" gutterBottom>
                CustManage
            </Typography>
            <List>
                {user?.user_role === UserRole.ADMIN && adminMenuItems.map((item) => (
                    <Fragment key={item.label}>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    if (item.children) {
                                        setOpenMenu((prev) => (prev === item.label ? null : item.label));
                                    } else {
                                        handleClick(item.path);
                                    }
                                }}

                                selected={openMenu === item.label}
                            >
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>

                        {/* 子要素（サブメニュー） */}
                        {item.children && openMenu === item.label && (
                            <List component="div" disablePadding sx={{ pl: 4, pt: 1 }}>
                                {item.children.map((child) => (
                                    <ListItemButton
                                        key={child.label}
                                        onClick={() => {
                                            handleClick(child.path);
                                        }}
                                        selected={activePage === child.label}
                                    >
                                        <ListItemText primary={child.label} />
                                    </ListItemButton>
                                ))}
                            </List>
                        )}
                    </Fragment>
                ))}
                {user?.user_role === UserRole.USER && userMenuItems.map((item) => (
                    <Fragment key={item.label}>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => handleClick(item.path || "")}
                                selected={activePage === item.label}
                            >
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    </Fragment>
                ))}
            </List>

        </Box>
    );
}
