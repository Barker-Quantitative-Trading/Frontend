"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider
} from '@mui/material';

import { Home as HomeIcon, BarChart as BarChartIcon, Settings as SettingsIcon } from '@mui/icons-material';

import ThemeToggle from "./ThemeToggle";

type NavItem = { href: string; label: string; icon?: React.ReactNode };

const drawerWidth = 240;

interface SidebarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  items?: NavItem[];
}

const defaultItems: NavItem[] = [
	{ href: '/', label: 'Home', icon: <HomeIcon /> },
	{ href: '/dashboard', label: 'Dashboard', icon: <SettingsIcon /> },
	{ href: '/ticker', label: 'Ticker', icon: <BarChartIcon /> },
	{ href: '/screener', label: 'Screener', icon: <SettingsIcon /> },
	{ href: '/backtest', label: 'Backtest', icon: <SettingsIcon /> },
	{ href: '/strategies', label: 'Strategies', icon: <SettingsIcon /> },
	{ href: '/account', label: 'Account', icon: <SettingsIcon /> },
];

export default function Sidebar({ darkMode, setDarkMode, items = defaultItems }: SidebarProps) {
	const pathname = usePathname() || "/";

	return (
		<Drawer
			variant="permanent"
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
			}}
		>
			<Toolbar />
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
			<Box sx={{ overflow: 'auto' }}>
				<List>
					{items.map((it) => {
						const selected = pathname === it.href;
						return (
							<ListItem key={it.href} disablePadding>
								<ListItemButton component={Link} href={it.href} selected={selected}>
									{it.icon && <ListItemIcon>{it.icon}</ListItemIcon>}
									<ListItemText primary={it.label} />
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
				<Divider />
			</Box>
		</Drawer>
	);
}
