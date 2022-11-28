import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';


import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles'
import styles from './header.module.css'
import {InputAdornment, TextField, useMediaQuery} from "@mui/material";
import VerticalLayout from "../vertical/VerticalLayout";
import ModeToggler from "./ModeToggler";
import {Fragment} from "react";
import UserDropdown from "./UserDropdown";
import NotificationCenter from "./NotificationCenter";
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


export default function Header (props) {


    const { hidden, settings, saveSettings, toggleNavVisibility, user } = props
    console.log(user)
    console.log(props)
    const hiddenSm = true
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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

    return  (
        <AppBar elevation={0} color='default' className='layout-navbar' position='sticky'>
            <Toolbar
                className='navbar-content-container'

            >

                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                        {hidden ? (
                            <IconButton
                                style={{marginLeft: '0.3125rem'}}
                                color='inherit'
                                onClick={toggleNavVisibility}
                                sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}

                            >
                                <MenuOutlinedIcon/>

                            </IconButton>
                        ) : null}


                    </Box>

                    <Box sx={{marginRight: '150px'}}>
                    { !hidden ? settings.headerContent : ''}
                    </Box>
                    <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>

                        <ModeToggler {...props}/>
                        <NotificationCenter/>
                        <UserDropdown {...props}/>
                    </Box>

                </Box>

            </Toolbar>
        </AppBar>


            )
}



