// ** React Imports
import {createContext, useEffect, useState} from 'react'

// ** ThemeConfig Import
import themeConfig from '../../configs/themeConfig'
import {useMediaQuery} from "@mui/material";

const initialSettings = {
    themeColor: 'primary',
    mode: themeConfig.mode,
    contentWidth: themeConfig.contentWidth,
    headerContent: '',
    user: null
}

// ** Create Context
export const SettingsContext = createContext({
    saveSettings: () => null,
    settings: initialSettings
})

export const SettingsProvider = ({ children }) => {
    // ** State

    const hidden = useMediaQuery('(min-width:600px)', {noSsr: true})


    const [settings, setSettings] = useState({ ...initialSettings })

    const saveSettings = updatedSettings => {
        setSettings(updatedSettings)
    }

    return <SettingsContext.Provider value={{ settings, saveSettings }}>{children}</SettingsContext.Provider>
}

export const SettingsConsumer = SettingsContext.Consumer
