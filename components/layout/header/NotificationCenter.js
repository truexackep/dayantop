// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu from '@mui/material/Menu'
import MuiAvatar from '@mui/material/Avatar'
import MuiMenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
// ** Icons Imports


// ** Third Party Components

// ** Styled Menu component
const Menu = styled(MuiMenu)(({ theme }) => ({
    '& .MuiMenu-paper': {
        width: 380,
        overflow: 'hidden',
        marginTop: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    '& .MuiMenu-list': {
        padding: 0
    }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.divider}`
}))

const styles = {
    maxHeight: 349,
    '& .MuiMenuItem-root:last-of-type': {
        border: 0
    }
}

// ** Styled PerfectScrollbar component


// ** Styled Avatar component
const Avatar = styled(MuiAvatar)({
    width: '2.375rem',
    height: '2.375rem',
    fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    flex: '1 1 100%',
    overflow: 'hidden',
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)({
    flex: '1 1 100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
})

const NotificationCenter = () => {
    // ** States
    const [anchorEl, setAnchorEl] = useState(null)

    // ** Hook
    const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

    const handleDropdownOpen = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleDropdownClose = () => {
        setAnchorEl(null)
    }

    const ScrollWrapper = ({ children }) => {
        if (hidden) {
            return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
        } else {

            return  <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>

        }
    }

    return (
        <Fragment>
            <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
                <NotificationsNoneOutlinedIcon />
            </IconButton>
            <Menu
                disableScrollLock={true}

                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleDropdownClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem disableRipple>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Typography sx={{ fontWeight: 600 }}>Уведомления</Typography>
                        <Chip
                            size='small'
                            label='8 новых'
                            color='primary'
                            sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
                        />
                    </Box>
                </MenuItem>
                <ScrollWrapper>
                    <MenuItem onClick={handleDropdownClose}>
                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                            <Avatar>S</Avatar>
                            <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                                <MenuItemTitle>Начался новый месяц 🎉</MenuItemTitle>
                                <MenuItemSubtitle variant='body2'>Посмотрите отчёт за прошлый месяц !</MenuItemSubtitle>
                            </Box>
                            <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                                Сегодня
                            </Typography>
                        </Box>
                    </MenuItem>


                </ScrollWrapper>
                <MenuItem
                    disableRipple
                    sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
                >
                    <Button fullWidth variant='contained' onClick={handleDropdownClose}>
                        Прочитать все уведомления
                    </Button>
                </MenuItem>
            </Menu>
        </Fragment>
    )
}

export default NotificationCenter
