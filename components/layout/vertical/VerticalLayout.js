// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Fab from '@mui/material/Fab'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'



// ** Theme Config Import
import themeConfig from '../../../configs/themeConfig'




import AppBar from "@mui/material/AppBar";
import Header from "../header/header";
import Navigation from "../navigation";

const VerticalLayoutWrapper = styled('div')({
    height: '100%',
    display: 'flex'
})

const MainContentWrapper = styled(Box)({
    flexGrow: 1,
    minWidth: 0,
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
})

const ContentWrapper = styled('main')(({ theme }) => ({
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(6),
    transition: 'padding .25s ease-in-out',
    [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    }
}))

const VerticalLayout = props => {
    // ** Props
    const {hidden, saveSettings, settings, children, scrollToTop, user } = props
    console.log(user)

    const navWidth = themeConfig.navigationSize

    // ** States
    const [navVisible, setNavVisible] = useState(false)

    // ** Toggle Functions
    const toggleNavVisibility = () => setNavVisible(!navVisible)

    return (
        <>
            <VerticalLayoutWrapper className='layout-wrapper'>
                <Navigation
                    navWidth={navWidth}
                    navVisible={navVisible}
                    setNavVisible={setNavVisible}
                    toggleNavVisibility={toggleNavVisibility}
                    {...props}
                />
                <MainContentWrapper className='layout-content-wrapper'>
                    <Header  toggleNavVisibility={toggleNavVisibility} {...props} />


                    <ContentWrapper
                        className='layout-page-content'

                    >
                        {children}
                    </ContentWrapper>




                </MainContentWrapper>
            </VerticalLayoutWrapper>

            {/*{scrollToTop ? (*/}
            {/*    scrollToTop(props)*/}
            {/*) : (*/}
            {/*    <ScrollToTop className='mui-fixed'>*/}
            {/*        <Fab color='primary' size='small' aria-label='scroll back to top'>*/}

            {/*        </Fab>*/}
            {/*    </ScrollToTop>*/}
            {/*)}*/}
        </>
    )
}

export default VerticalLayout
