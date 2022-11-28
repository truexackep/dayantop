import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';

import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import * as React from "react";
import {Badge} from "@mui/material";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {useRouter} from "next/router";

const UserDropdown = props => {
    const {user} = props
    const {settings, saveSettings} = props
    const router = useRouter();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const styles = {
        py: 2,
        px: 4,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        color: 'text.primary',
        textDecoration: 'none',
        '& svg': {
            fontSize: '1.375rem',
            color: 'text.secondary'
        }
    }

    return <Box>
        <Tooltip title="Настройки">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ width: 36, height: 36, bgcolor: settings.mode == 'dark' ? '#232227' : '#f5f5f5', color: 'rgb(145, 85, 253)', }} alt="Remy Sharp"      />
            </IconButton>
        </Tooltip>
        <Menu
            sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            id="menu-appbar"
            anchorEl={anchorElUser}

            keepMounted
            disableScrollLock={true}

            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            <MenuItem sx={{paddingLeft: '0px !important'}}>
                <Box sx={{ pt: 2, pb: 3, px: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>

                        <Avatar alt='Соня Мармеладова' src='/images/avatars/1.png' sx={{ width: '2.5rem', height: '2.5rem', bgcolor: 'rgb(60, 50, 96)', color: 'rgb(145, 85, 253)' }} />
                        <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography sx={{ fontWeight: 600 }}>{settings.user.name}</Typography>
                            <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                                Development
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </MenuItem>
            <Divider sx={{ mt: 0, mb: 1 }} />
            <MenuItem sx={{ p: 0 }} onClick={() => {}}>
                <Box sx={styles}>
                    <PermIdentityOutlinedIcon  sx={{ marginRight: 2 }} />
                    Профиль
                </Box>
            </MenuItem>
            <MenuItem sx={{ p: 0 }} onClick={() => {}}>
                <Box sx={styles}>
                    <SettingsOutlinedIcon sx={{ marginRight: 2 }} />
                    Настройки
                </Box>
            </MenuItem>
            <Divider />
            <MenuItem sx={{ py: 2 }} onClick={() => {
                router.push('/login', { shallow: true })

                // localStorage.clear()


            }}>
                <LogoutOutlinedIcon sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
                Выйти
            </MenuItem>
        </Menu>
    </Box>

}
export default UserDropdown