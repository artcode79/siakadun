import * as React from 'react'
import { useRouter } from 'next/navigation'
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
import {
	HomeSharp,
	PeopleAltOutlined,
	PeopleSharp,
	Logout,
} from '@mui/icons-material'
import { signOut } from 'firebase/auth'
import { auth } from '~/libs/firebase'
import {
	Avatar,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
} from '@mui/material'
import { settings } from 'firebase/analytics'

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
	{
		name: 'Fakultas',
		link: '/fakultas',
		icon: () => <PeopleAltOutlined />,
	},
	{
		name: 'Jurusan',
		link: '/jurusan',
		icon: () => <PeopleAltOutlined />,
	},
]

const handleSignOut = () => {
	signOut(auth)
}

export default function Side({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const navItems2 = [
		{
			name: 'User',
			onclick: () => {
				router.push('/users')
			},
			icon: () => <PeopleSharp />,
		},
		{ name: 'Logout', onclick: () => handleSignOut(), icon: () => <Logout /> },
	]
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	)

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position="absolute"
				elevation={0}
				sx={{
					height: '65px',
					zIndex: theme => theme.zIndex.drawer + 1,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						height: '100%',
						mr: '3',
					}}
				>
					<Typography variant="h4" component="div">
						Dashboard
					</Typography>
					<Box sx={{ flexGrow: 0, ml: 3 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar
									alt="Remy Sharp"
									src="https://images.unsplash.com/photo-1690802029151-60c464079267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
								/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
							<MenuItem onClick={handleSignOut}>
								<Logout /> Logout
							</MenuItem>
						</Menu>
					</Box>
				</Box>
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
