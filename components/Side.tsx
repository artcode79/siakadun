import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { HomeSharp, PeopleAltOutlined, PeopleSharp } from '@mui/icons-material'

const drawerWidth = 240

const navItems = [
	{
		name: 'Dashboard',
		link: '/dashboard',
		icon: () => <HomeSharp />,
	},
	{
		name: 'Mahasiswa',
		link: '/mahasiswa',
		icon: () => <PeopleAltOutlined />,
	},
]

const navItems2 = [
	{
		name: 'User',
		onclick: () => {
			console.log('clicked')
		},
		icon: () => <PeopleSharp />,
	},
]

export default function Side({ children }: { children: React.ReactNode }) {
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						SiAkaD
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: 'auto' }}>
					<List>
						{navItems.map((text, index) => (
							<ListItem key={index} disablePadding>
								<ListItemButton component="a" href={text.link}>
									<ListItemIcon>{text.icon()}</ListItemIcon>
									<ListItemText primary={text.name} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						{navItems2.map((text, index) => (
							<ListItem key={index} disablePadding>
								<ListItemButton onClick={text.onclick}>
									<ListItemIcon> {text.icon()}</ListItemIcon>
									<ListItemText primary={text.name} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Box>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				{children}
			</Box>
		</Box>
	)
}
