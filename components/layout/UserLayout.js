// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// ** Layout Imports
// !Do not remove this Layout import
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

// ** Hook Import
import {DashboardIcon} from "../icons/DashboardIcon";
import {DashboardCompanyIcon} from "../icons/Dashboard-company";
import {Stats} from "../icons/Stats";
import {Offers} from "../icons/Offers";
import {Expense} from "../icons/Expense";
import {Finances} from "../icons/Finances";
import {OrderForm} from "../icons/OrderForm";
import {OrderList} from "../icons/OrderList";
import {Cards} from "../icons/Cards";
import {Users} from "../icons/Users";
import VerticalLayout from "./vertical/VerticalLayout";
import {useSettings} from "../context/hooks/useSettings";
import {ToastContainer} from "react-toastify";
import {Settings} from "../icons/Settings";
import {useRouter} from "next/router";
import Error404 from "../../pages/404";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
const UserLayout = ({children, user}) => {
    // ** Hooks
    console.log(user)
    const router = useRouter();
    const menu = [
        {
            title: 'Дашборд',
            icon: <DashboardIcon className={'menu-icon'}/>,
            path: '/',
            permissions: 'dashboard'

        },
        {
            title: 'Магазин',
            icon: <ShoppingCartOutlinedIcon />,
            path: '/shop',
            permissions: 'settings'

        },
        {
            title: 'Товары',
            icon: <ShoppingBagOutlinedIcon/>,
            path: '/products',
            permissions: 'settings'

        },
        {
            title: 'Категории товаров',
            icon: <CategoryOutlinedIcon />,
            path: '/categories',
            permissions: 'settings'

        },
        {
            title: 'Пользователи',
            icon: <Users className={'menu-icon'}/>,
            path: '/users',
            permissions: 'users'

        }
    ]
    /**
     *  The below variable will hide the current layout menu at given screen size.
     *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
     *  You can change the screen size from which you want to hide the current layout menu.
     *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
     *  to know more about what values can be passed to this hook.
     *  ! Do not change this value unless you know what you are doing. It can break the template.
     */
    const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
    const {settings, saveSettings} = useSettings()
    return (
        <>

            {(() => {
                console.log(settings.user)
                if (!settings.user.role.permissions[menu.filter(kkk => kkk.path == router.pathname)[0].permissions]) {
                    return <Error404/>
                } else {
                    return <VerticalLayout
                        hidden={hidden}
                        saveSettings={saveSettings}
                        user={user}
                        settings={settings}
                        verticalNavItems={menu} // Navigation Items

                    >
                        <ToastContainer/>
                        {settings.headerContent !== '' ? (() => {
                            if (hidden) {
                                return <Box sx={{marginBottom: '20px'}}>{settings.headerContent}</Box>
                            }
                        })() : ''}
                        {settings.user.role.permissions[menu.filter(kkk => kkk.path == router.pathname)[0].permissions] ? children : ''}

                    </VerticalLayout>
                }

            })()}


        </>

    )
}

export default UserLayout
