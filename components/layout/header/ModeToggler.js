import IconButton from '@mui/material/IconButton'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import Cookies from 'js-cookie';


const ModeToggler = props => {
    // ** Props
    const { settings, saveSettings } = props

    const handleModeChange = mode => {
        saveSettings({ ...settings, mode })
    }


    const handleModeToggle = () => {
        if (settings.mode === 'light') {
            Cookies.set('mode', 'dark')
            localStorage.setItem('theme' , 'dark')
            handleModeChange('dark')
        } else {
            Cookies.set('mode', 'light')

            localStorage.setItem('theme' , 'light')
            handleModeChange('light')

        }
    }

    return (
        <IconButton color='inherit' aria-haspopup='true' onClick={handleModeToggle}>
            <WbSunnyOutlinedIcon />
        </IconButton>
    )
}

export default ModeToggler
