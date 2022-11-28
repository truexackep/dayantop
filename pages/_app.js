import '../styles/globals.css'
import {CircularProgress, createTheme, ThemeProvider, useMediaQuery} from "@mui/material";
import {SettingsConsumer, SettingsContext, SettingsProvider} from "../components/context/settingsContext";
import ThemeComponent from "../components/theme/ThemeComponent";
import {useTheme} from "@mui/material/styles";
import UserLayout from "../components/layout/UserLayout";
import {toast, ToastContainer} from "react-toastify";
import App from 'next/app';
import network from "../utils/network";
import axios from "axios";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css';
import {useSettings} from "../components/context/hooks/useSettings";
import { Router } from 'next/dist/client/router'




const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  MuiUseMediaQuery: {
    defaultProps: {
      noSsr: true,
    },
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  MuiUseMediaQuery: {
    defaultProps: {
      noSsr: true,
    },
  },
});

function MyApp({ Component, pageProps, cookies  }) {
  const router = useRouter()

  let [user, setUser] = useState(null)
  // const cookie = useCookie(pageProps.cookie)
  console.log(pageProps)
  const { settings, saveSettings } = useSettings()
  let [loading, setLoading] = useState(router.pathname !== '/login')
  useEffect(() => {

    if(localStorage.getItem('user_id')) {
      setLoading(true)

      network.api({
        method: 'get',
        url: 'users/'+localStorage.getItem('user_id')+'/'
      }).then(response => {
        user = response.data
        console.log(user)
        setUser(user)
        settings.user = user
        settings.user.role.permissions = JSON.parse(settings.user.role.permissions)
        settings.mode = localStorage.getItem('theme')

        saveSettings({...settings})
        setLoading(false)
      })

    }
    if(!localStorage.getItem('theme')){
      localStorage.setItem('theme', 'dark');
    }
  }, [])
  const getLayout = Component.getLayout ?? (page => <UserLayout user={user}>{page}</UserLayout>)

  useEffect(() => {


  }, [])

  return  <>
    {loading ?  <Box sx={{ display: 'flex', position: 'absolute', right: '50%', bottom: '50%' }}>
          <CircularProgress />
        </Box> :
    <SettingsProvider>
    <SettingsConsumer>

      {({ settings, saveSettings, hidden }) => {
        return <ThemeComponent settings={settings} saveSettings={saveSettings}>{getLayout(<Component user={user}  hidden={hidden} saveSettings={saveSettings} settings={settings} {...pageProps} />)}</ThemeComponent>
      }}
    </SettingsConsumer>
  </SettingsProvider> }
 </>
    }

export default MyApp
