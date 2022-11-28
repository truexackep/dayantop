import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import {useEffect, useState} from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import * as React from "react";
import Tabs from '@mui/material/Tabs';

import {
    CardContent, Checkbox,
    CircularProgress,
    Drawer,
    FormControl, FormControlLabel, FormGroup, FormLabel,
    Grid,
    InputLabel, LinearProgress,
    Paper, Radio, RadioGroup,
    Select, Switch, tabsClasses,
    TextField
} from "@mui/material";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import network from "../utils/network";
import {toast} from "react-toastify";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {styled} from "@mui/material/styles";
import {Skeleton} from "@mui/lab";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from '@mui/icons-material/Edit';
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";


export default function Settings(props) {
    let [selectedTab, setSelectedTab] = useState('1')
    let [apiKey, setApiKey] = useState('')
    let [keitaroPostback, setKeitaroPostback] = useState('')
    let [brocardAPIKey, setBrocardAPIKey] = useState('')
    let [selectedModel, setSelectedModel] = useState(1)
    let [loading, setLoading] = useState(false)
    let [loadingBroCardAPI, setLoadingBroCardAPI] = useState(false)
    let [shows, setShows] = useState(apiKey !== '')
    let [editArticle, setEditArticle] = useState(null)
    let [articleName, setArticleName] = useState('');
    let [selectedRoleTag, setSelectedRoleTag] = useState(0);
    let [roles, setRoles] = useState([
        {id: -1, name: '', rules: 1, users: '', date: ''},
        {id: -2, name: '', rules: 1, users: '', date: ''},
        {id: -3, name: '', rules: 1, users: '', date: ''},
        {id: -4, name: '', rules: 1, users: '', date: ''},
        {id: -5, name: '', rules: 1, users: '', date: ''},
        {id: -6, name: '', rules: 1, users: '', date: ''},
        {id: -7, name: '', rules: 1, users: '', date: ''},
        {id: -8, name: '', rules: 1, users: '', date: ''},
        {id: -9, name: '', rules: 1, users: '', date: ''},
        {id: -10, name: '', rules: 1, users: '', date: ''},
    ])
    let [roleName, setRoleName] = useState('')
    const {settings, saveSettings} = props
    let [expenseArticlesRows, setExpenseArticlesRows] = useState([

        {id: -1, name: '', rules: 1, users: '', date: ''},
        {id: -2, name: '', rules: 1, users: '', date: ''},
        {id: -3, name: '', rules: 1, users: '', date: ''},
        {id: -4, name: '', rules: 1, users: '', date: ''},
        {id: -5, name: '', rules: 1, users: '', date: ''},
        {id: -6, name: '', rules: 1, users: '', date: ''},
        {id: -7, name: '', rules: 1, users: '', date: ''},
        {id: -8, name: '', rules: 1, users: '', date: ''},
        {id: -9, name: '', rules: 1, users: '', date: ''},
        {id: -10, name: '', rules: 1, users: '', date: ''},
    ])
    let [incomeArticlesRows, setIncomeArticlesRows] = useState([

        {id: -1, name: '', rules: 1, users: '', date: ''},
        {id: -2, name: '', rules: 1, users: '', date: ''},
        {id: -3, name: '', rules: 1, users: '', date: ''},
        {id: -4, name: '', rules: 1, users: '', date: ''},
        {id: -5, name: '', rules: 1, users: '', date: ''},
        {id: -6, name: '', rules: 1, users: '', date: ''},
        {id: -7, name: '', rules: 1, users: '', date: ''},
        {id: -8, name: '', rules: 1, users: '', date: ''},
        {id: -9, name: '', rules: 1, users: '', date: ''},
        {id: -10, name: '', rules: 1, users: '', date: ''},
    ])
    const RenderId = (props) => {
        return (
            <>
                {props.row.id < 0 ? <Skeleton sx={{width: '100%'}}></Skeleton> : <Typography>{props.row.id}</Typography>
                }
            </>
        );
    };
    const RenderName = (props) => {
        return (
            <>
                {props.row.id < 0 ? <Skeleton sx={{width: '100%'}}></Skeleton> :
                    <Tooltip title={props.row.name}><Chip sx={{width: '130px'}} label={props.row.name}
                                                          color={props.row.isDefault == '1' ? 'primary' : 'success'}
                                                          variant="outlined"/></Tooltip>
                }
            </>
        );
    };
    const RenderPermissions = (props) => {
        return (
            <>
                {props.row.id < 0 ? <Skeleton sx={{width: '100%'}}></Skeleton> : <Typography>{(() => {
                    return Object.keys((props.row.permissions)).length
                })()}</Typography>
                }
            </>
        );
    };
    const RenderTime = (props) => {
        return (
            <>
                {props.row.id < 0 ? <Skeleton sx={{width: '100%'}}></Skeleton> :
                    <Typography>{props.row.time}</Typography>
                }
            </>
        );
    };
    const RenderActionRoles = (props) => {
        let [anchorEl, setAnchorEl] = useState(null);

        const open = Boolean(anchorEl)

        const handleOpen = (event) => {
            setAnchorEl(event.currentTarget)
            console.log(event)
        }

        return (
            <>
                {props.row.id < 0 ? <Skeleton sx={{width: '100%'}}></Skeleton> : <Typography>

                    <GridActionsCellItem
                        icon={<MoreVertIcon/>
                        }
                        label="Cancel"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        className="textPrimary"
                        color="inherit"
                        onClick={handleOpen}

                    />
                    <Menu
                        disableScrollLock={false}
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        onClose={(event) => {
                            console.log('sloe')
                            anchorEl = null
                            setAnchorEl(null)
                        }
                        }
                        open={open}
                    >

                        <MenuItem onClick={(event) => {
                            setEditRole(props.row)
                            roleName = props.row.name
                            setRoleName(roleName)
                        }
                        }>
                            <ListItemIcon sx={{marginRight: '0px'}}>
                                <EditIcon sx={{marginRight: '0px'}}/>
                            </ListItemIcon>
                            <Typography variant="inherit">Редактировать</Typography>
                        </MenuItem>
                        {props.row.isDefault == '1' ? '' : <MenuItem onClick={() => {
                            network.api({
                                method: 'delete',
                                url: 'articles/',
                                data: {
                                    id: props.row.id
                                }
                            }).then(response => {
                                if (props.row.type == 0) {
                                    setExpenseArticlesRows([...expenseArticlesRows.filter(article => article.id !== props.row.id)])
                                } else {
                                    setIncomeArticlesRows([...incomeArticlesRows.filter(article => article.id !== props.row.id)])

                                }
                                toast.info('Статья удалена')
                            })
                        }
                        }>
                            <ListItemIcon sx={{marginRight: '0px'}}>
                                <DeleteOutlineOutlinedIcon sx={{marginRight: '0px'}}/>
                            </ListItemIcon>
                            <Typography variant="inherit">Удалить</Typography>
                        </MenuItem>}

                    </Menu>
                </Typography>
                }
            </>
        );
    };
    const RenderAction = (props) => {
        let [anchorEl, setAnchorEl] = useState(null);

        const open = Boolean(anchorEl)

        const handleOpen = (event) => {
            setAnchorEl(event.currentTarget)
            console.log(event)
        }

        return (
            <>
                {props.row.id < 0 ? <Skeleton sx={{width: '100%'}}></Skeleton> : <Typography>

                    <GridActionsCellItem
                        icon={<MoreVertIcon/>
                        }
                        label="Cancel"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        className="textPrimary"
                        color="inherit"
                        onClick={handleOpen}

                    />
                    <Menu
                        disableScrollLock={false}
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        onClose={(event) => {
                            console.log('sloe')
                            anchorEl = null
                            setAnchorEl(null)
                        }
                        }
                        open={open}
                    >

                        <MenuItem onClick={(event) => {
                            setEditArticle(props.row)
                            setArticleName(props.row.name)
                        }
                        }>
                            <ListItemIcon sx={{marginRight: '0px'}}>
                                <EditIcon sx={{marginRight: '0px'}}/>
                            </ListItemIcon>
                            <Typography variant="inherit">Редактировать</Typography>
                        </MenuItem>
                        {props.row.isDefault == '1' ? '' : <MenuItem onClick={() => {
                            network.api({
                                method: 'delete',
                                url: 'articles/',
                                data: {
                                    id: props.row.id
                                }
                            }).then(response => {
                                if (props.row.type == 0) {
                                    setExpenseArticlesRows([...expenseArticlesRows.filter(article => article.id !== props.row.id)])
                                } else {
                                    setIncomeArticlesRows([...incomeArticlesRows.filter(article => article.id !== props.row.id)])

                                }
                                toast.info('Статья удалена')
                            })
                        }
                        }>
                            <ListItemIcon sx={{marginRight: '0px'}}>
                                <DeleteOutlineOutlinedIcon sx={{marginRight: '0px'}}/>
                            </ListItemIcon>
                            <Typography variant="inherit">Удалить</Typography>
                        </MenuItem>}

                    </Menu>
                </Typography>
                }
            </>
        );
    };

    const expenseArticlesColumns = [
        {field: 'id', headerName: 'ID', width: 120, renderCell: (props) => <RenderId {...props}/>},
        {field: 'name', headerName: 'Название', width: 270, renderCell: (props) => <RenderName {...props}/>},
        {field: 'actions', headerName: 'Действие', width: 100, renderCell: (props) => <RenderAction {...props}/>},


    ]
    const incomeArticlesColumns = [
        {field: 'id', headerName: 'ID', width: 120, renderCell: (props) => <RenderId {...props}/>},
        {field: 'name', headerName: 'Название', width: 270, renderCell: (props) => <RenderName {...props}/>},
        {field: 'actions', headerName: 'Действие', width: 100, renderCell: (props) => <RenderAction {...props}/>},


    ]

    const columns = [
        {field: 'id', headerName: 'ID', width: 120, renderCell: (props) => <RenderId {...props}/>},
        {field: 'name', headerName: 'Название', width: 200, renderCell: (props) => <RenderName {...props}/>},
        {field: 'rules', headerName: 'Права', width: 150, renderCell: (props) => <RenderPermissions {...props}/>},
        {field: 'users', headerName: 'Сотрудников', width: 200, renderCell: (props) => <RenderId {...props}/>},
        {field: 'date', headerName: 'Дата создания', width: 200, renderCell: (props) => <RenderTime {...props}/>},
        {field: 'actions', headerName: 'Действие', width: 150, renderCell: (props) => <RenderActionRoles {...props}/>},

    ];

    function handleChange(event, newValue) {
        if (newValue == '1') {
            setRoles([{id: -1, name: '', rules: 1, users: '', date: ''},
                {id: -2, name: '', rules: 1, users: '', date: ''},
                {id: -3, name: '', rules: 1, users: '', date: ''},
                {id: -4, name: '', rules: 1, users: '', date: ''},
                {id: -5, name: '', rules: 1, users: '', date: ''},
                {id: -6, name: '', rules: 1, users: '', date: ''},
                {id: -7, name: '', rules: 1, users: '', date: ''},
                {id: -8, name: '', rules: 1, users: '', date: ''},
                {id: -9, name: '', rules: 1, users: '', date: ''},
                {id: -10, name: '', rules: 1, users: '', date: ''},])
        }
        loadRoles()
        setSelectedTab(newValue)
    }

    const StyledGridOverlay = styled('div')(({theme}) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        '& .ant-empty-img-1': {
            fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
        },
        '& .ant-empty-img-2': {
            fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
        },
        '& .ant-empty-img-3': {
            fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
        },
        '& .ant-empty-img-4': {
            fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
        },
        '& .ant-empty-img-5': {
            fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
            fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
        },
    }));

    function CustomNoRowsOverlay() {
        return (
            <StyledGridOverlay>
                <svg
                    width="120"
                    height="100"
                    viewBox="0 0 184 152"
                    aria-hidden
                    focusable="false"
                >
                    <g fill="none" fillRule="evenodd">
                        <g transform="translate(24 31.67)">
                            <ellipse
                                className="ant-empty-img-5"
                                cx="67.797"
                                cy="106.89"
                                rx="67.797"
                                ry="12.668"
                            />
                            <path
                                className="ant-empty-img-1"
                                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                            />
                            <path
                                className="ant-empty-img-2"
                                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                            />
                            <path
                                className="ant-empty-img-3"
                                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                            />
                        </g>
                        <path
                            className="ant-empty-img-3"
                            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                        />
                        <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"/>
                            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"/>
                        </g>
                    </g>
                </svg>
                <Box sx={{mt: 1}}>Пусто</Box>
            </StyledGridOverlay>
        );
    }

    let [openAddExpense, setOpenAddExpense] = useState(false);
    let [openAddIncome, setOpenAddIncome] = useState(false);
    let [editRole, setEditRole] = useState(null);
    let [permissions, setPermissions] = useState([]);
    const updateArticle = () => {
        console.log('lol')

        if (editArticle == null) {
            setLoading(true)
            network.api({
                method: 'post',
                url: 'articles/',
                data: {
                    name: articleName,
                    type: openAddExpense ? 0 : openAddIncome ? 1 : ''
                }
            }).then(response => {
                console.log(response)
                if (openAddExpense) {
                    setExpenseArticlesRows([...expenseArticlesRows, response.data])
                } else {
                    setIncomeArticlesRows([...incomeArticlesRows, response.data])
                }
                setOpenAddIncome(false)
                setOpenAddExpense(false)
                setLoading(false)
                toast.info('Статья добавлена')

            })
        } else {
            setLoading(true)

            network.api({
                method: 'put',
                url: 'articles/',
                data: {
                    id: editArticle.id,
                    name: articleName,
                    type: editArticle.type
                }
            }).then(response => {
                console.log(response.data)
                setLoading(false)
                editArticle.name = articleName;
                setExpenseArticlesRows([...expenseArticlesRows]);
                setIncomeArticlesRows([...incomeArticlesRows]);
                editArticle = null
                setEditArticle(editArticle)
                toast.info('Статья отредактирована')
            })
        }
    }
    useEffect(() => {
        loadSettings()
        loadRoles()
        loadArticles()
        loadPermissions()
        settings.headerContent = ''

    }, [])
    const loadRoles = () => {
        network.api({
            method: 'get',
            url: 'roles/'
        }).then(response => {
            roles = response.data
            roles.map(function (lll, kkk){
                lll.permissions = JSON.parse(lll.permissions)
            })
            setRoles([...roles])
        })
    }
    const loadArticles = () => {
        network.api({
            method: 'get',
            url: 'articles/'
        }).then(response => {
            expenseArticlesRows = response.data.articles.filter(article => article.type == 0)
            setExpenseArticlesRows([...expenseArticlesRows])

            incomeArticlesRows = response.data.articles.filter(article => article.type == 1)
            setIncomeArticlesRows([...incomeArticlesRows])
        })
    }
    const loadSettings = () => {
        setLoading(true)

        network.api({
            method: 'get',
            url: 'settings'
        }).then(response => {
            let accept = true;
            let keitaroPostbackDB = response.data.filter(kkk => kkk.key == 'keitaroPostback');
            if (keitaroPostbackDB.length == 1) {
                keitaroPostback = keitaroPostbackDB[0].value
                setKeitaroPostback(keitaroPostback)

            } else {
                accept = false
            }
            let keitaroApiKey = response.data.filter(kkk => kkk.key == 'keitaroApiKey');
            if (keitaroApiKey.length == 1) {
                apiKey = keitaroApiKey[0].value
                setApiKey(apiKey)
            } else {
                accept = false
            }
            let brocardAPIKey = response.data.filter(kkk => kkk.key == 'brocardAPIKey');
            if (brocardAPIKey.length == 1) {
                apiKey = brocardAPIKey[0].value
                setBrocardAPIKey(apiKey)
            } else {
                accept = false
            }
            if (accept)
                setShows(true)
            setLoading(false)
        })
    }
    const loadPermissions = () => {
        network.api({
            method: 'get',
            url: 'permissions'
        }).then(response => {
            permissions = response.data
            setPermissions([...permissions])
           // console.log(permissions)
        })
    }
    const updateRole = () => {
        console.log(editRole.permissions)
        network.api({
            method: 'put',
            url: 'roles',
            data: {
                id: editRole.id,
                permissions: JSON.stringify(editRole.permissions),
                name: roleName
            }
        }).then(response => {
            console.log(response)
        })
    }
    return <>
        <React.Fragment key={'right'}>
            <Drawer
                sx={{

                    '& .MuiDrawer-paper': {width: {xs: '90%', sm: '30%'}},
                }}
                anchor={'right'}
                open={openAddExpense || openAddIncome || editArticle !== null}
                onClose={(event) => {
                    setOpenAddExpense(false)
                    setOpenAddIncome(false)
                    setEditArticle(null)
                    setArticleName('')
                }
                }
            >

                <CardHeader

                    title={<Box>
                        {openAddExpense ? <Typography sx={{fontSize: '18px'}}>Создать статью расхода</Typography> : ''}
                        {openAddIncome ? <Typography sx={{fontSize: '18px'}}>Создать статью дохода</Typography> : ''}
                        {editArticle !== null ?
                            <Typography sx={{fontSize: '18px'}}>Редактирование статьи</Typography> : ''}
                        <LinearProgress sx={{marginTop: '10px', opacity: loading ? 1 : 0}}/>
                    </Box>}
                    style={{paddingBottom: '0px'}}
                    titleTypographyProps={{
                        sx: {
                            mb: 2.5,
                            lineHeight: '2rem !important',
                            letterSpacing: '0.15px !important'
                        }
                    }}
                />
                <CardContent style={{}} sx={{pt: theme => `${theme.spacing(3)} !important`, paddingTop: '0px'}}>
                    <TextField value={articleName} onChange={(event) => {
                        setArticleName(event.target.value)
                    }
                    } label={'Название'} size={'small'} fullWidth/>
                    <Button onClick={(event) => {
                        updateArticle();
                    }
                    } fullWidth sx={{marginTop: '20px'}}
                            variant={'contained'}>{editArticle !== null ? 'Редактировать' : 'Создать'}</Button>
                </CardContent>

            </Drawer>
        </React.Fragment>
        {editRole !== null ?
        <React.Fragment key={'right'}>
            <Drawer
                sx={{

                    '& .MuiDrawer-paper': {width: {xs: '90%', sm: '40%'}},
                }}
                anchor={'right'}
                open={editRole !== null}
                onClose={(event) => {
                    setEditRole(null)

                }
                }
            >

                <CardHeader

                    title={<Box>
                        {openAddExpense ? <Typography sx={{fontSize: '18px'}}>Создать статью расхода</Typography> : ''}
                        {openAddIncome ? <Typography sx={{fontSize: '18px'}}>Создать статью дохода</Typography> : ''}
                        {editArticle !== null ?
                            <Typography sx={{fontSize: '18px'}}>Редактирование должности</Typography> : ''}
                        <LinearProgress sx={{marginTop: '10px', opacity: loading ? 1 : 0}}/>
                    </Box>}
                    style={{paddingBottom: '0px'}}
                    titleTypographyProps={{
                        sx: {
                            mb: 2.5,
                            lineHeight: '2rem !important',
                            letterSpacing: '0.15px !important'
                        }
                    }}
                />
                <CardContent style={{}} sx={{pt: theme => `${theme.spacing(3)} !important`, paddingTop: '0px'}}>
                    <TextField value={roleName} onChange={(event) => {
                        roleName = event.target.value
                        setRoleName(roleName)
                    }
                    } label={'Название'} size={'small'} fullWidth/>
                    <Box
                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', marginTop: '50px'}}
                    >
                        <TabContext value={selectedRoleTag}>

                        <TabList

                            orientation="vertical"
                            variant="scrollable"
                            value={selectedRoleTag}
                            onChange={(event, newValue) => {
                                setSelectedRoleTag(newValue)
                            }
                            }
                            aria-label="Vertical tabs example"
                            sx={{[`& .${tabsClasses.scrollButtons}`]: {
                                    '&.Mui-disabled': { opacity: 0.3 },
                                }, borderRight: 1, borderColor: 'divider', height: '500px' }}
                        >
                            <Tab label="Дашборд" value={8} />
                            <Tab label="Дашборд компании" value={9} />
                            <Tab label="Статистика" value={5} />
                            <Tab label="Офферы" value={10} />
                            <Tab label="Расход / Приход" value={0}/>
                            <Tab label="Финансы" value={11}/>
                            <Tab label="Форма заказа" value={1}/>

                            <Tab label="Список заказов" value={12}/>



                            <Tab label="Карты" value={2} />
                            <Tab label="Пользователи" value={3} />
                            <Tab label="Настройки" value={4} />

                        </TabList>
                            <TabPanel value={8} index={0}>
                                {permissions.filter(perm => perm.groups == 8).map(function (key, value){
                                    return <FormGroup  key={'12'} sx={{display: 'flex', flexWrap: 'wrap'}}>

                                        <FormControlLabel  control={<Checkbox onChange={(event) => {
                                            editRole.permissions[key.name] = event.target.checked
                                            // console.log( editRole.permissions[key.name])
                                            setEditRole({...editRole})
                                        }} checked={editRole.permissions[key.name]}/>} label={key.alias} />
                                    </FormGroup>
                                })}
                            </TabPanel>
                            <TabPanel value={4} index={0}>
                                {permissions.filter(perm => perm.groups == 4).map(function (key, value){
                                    return <FormGroup key={'13'}  sx={{display: 'flex', flexWrap: 'wrap'}}>

                                        <FormControlLabel  control={<Checkbox onChange={(event) => {
                                            editRole.permissions[key.name] = event.target.checked
                                            // console.log( editRole.permissions[key.name])
                                            setEditRole({...editRole})
                                        }} checked={editRole.permissions[key.name]}/>} label={key.alias} />
                                    </FormGroup>
                                })}
                            </TabPanel>
                            <TabPanel value={3} index={0}>
                                {permissions.filter(perm => perm.groups == 3).map(function (key, value){
                                    return <FormGroup key={'14'}  sx={{display: 'flex', flexWrap: 'wrap'}}>

                                        <FormControlLabel  control={<Checkbox onChange={(event) => {
                                            editRole.permissions[key.name] = event.target.checked
                                            // console.log( editRole.permissions[key.name])
                                            setEditRole({...editRole})
                                        }} checked={editRole.permissions[key.name]}/>} label={key.alias} />
                                    </FormGroup>
                                })}
                            </TabPanel>
                            <TabPanel value={12} index={0}>
                                {permissions.filter(perm => perm.groups == 12).map(function (key, value){
                                    return <FormGroup key={'15'}  sx={{display: 'flex', flexWrap: 'wrap'}}>

                                        <FormControlLabel  control={<Checkbox onChange={(event) => {
                                            editRole.permissions[key.name] = event.target.checked
                                            // console.log( editRole.permissions[key.name])
                                            setEditRole({...editRole})
                                        }} checked={editRole.permissions[key.name]}/>} label={key.alias} />
                                    </FormGroup>
                                })}
                            </TabPanel>
                            <TabPanel value={10} index={0}>
                                {permissions.filter(perm => perm.groups == 10).map(function (key, value){
                                    return <FormGroup key={'18'}  sx={{display: 'flex', flexWrap: 'wrap'}}>

                                        <FormControlLabel  control={<Checkbox onChange={(event) => {
                                            editRole.permissions[key.name] = event.target.checked
                                            // console.log( editRole.permissions[key.name])
                                            setEditRole({...editRole})
                                        }} checked={editRole.permissions[key.name]}/>} label={key.alias} />
                                    </FormGroup>
                                })}
                            </TabPanel>
                            <TabPanel value={11} index={0}>
                                {permissions.filter(perm => perm.groups == 11).map(function (key, value){
                                    return <FormGroup key={'133'}  sx={{display: 'flex', flexWrap: 'wrap'}}>

                                        <FormControlLabel  control={<Checkbox onChange={(event) => {
                                            editRole.permissions[key.name] = event.target.checked
                                            // console.log( editRole.permissions[key.name])
                                            setEditRole({...editRole})
                                        }} checked={editRole.permissions[key.name]}/>} label={key.alias} />
                                    </FormGroup>
                                })}
                            </TabPanel>
                            <TabPanel value={9} index={0}>
                                {permissions.filter(perm => perm.groups == 9).map(function (key, value){
                                    return <FormGroup key={'1654'}  sx={{display: 'flex', flexWrap: 'wrap'}}>

                                        <FormControlLabel  control={<Checkbox onChange={(event) => {
                                            editRole.permissions[key.name] = event.target.checked
                                            // console.log( editRole.permissions[key.name])
                                            setEditRole({...editRole})
                                        }} checked={editRole.permissions[key.name]}/>} label={key.alias} />
                                    </FormGroup>
                                })}
                            </TabPanel>
                            <TabPanel value={5} index={0}>
                                {permissions.filter(perm => perm.groups == 5).map(function (key, value){
                                    return <FormGroup key={'1334'}  sx={{display: 'flex', flexWrap: 'wrap'}}>

                                        <FormControlLabel  control={<Checkbox onChange={(event) => {
                                            editRole.permissions[key.name] = event.target.checked
                                            // console.log( editRole.permissions[key.name])
                                            setEditRole({...editRole})
                                        }} checked={editRole.permissions[key.name]}/>} label={key.alias} />
                                    </FormGroup>
                                })}
                            </TabPanel>
                            <TabPanel value={0} index={0}>
                                {permissions.filter(perm => perm.groups == 0).map(function (key, value){
                                    return <FormGroup key={'13231'}  sx={{display: 'flex', flexWrap: 'wrap'}}>

                                        <FormControlLabel  control={<Checkbox onChange={(event) => {
                                            editRole.permissions[key.name] = event.target.checked
                                            // console.log( editRole.permissions[key.name])
                                            setEditRole({...editRole})
                                        }} checked={editRole.permissions[key.name]}/>} label={key.alias} />
                                    </FormGroup>
                                })}
                            </TabPanel>
                            <TabPanel value={2} index={0}>
                                {permissions.filter(perm => perm.groups == 2).map(function (key, value){
                                    return <FormGroup key={'11241'}  sx={{display: 'flex', flexWrap: 'wrap'}}>

                                        <FormControlLabel  control={<Checkbox onChange={(event) => {
                                            editRole.permissions[key.name] = event.target.checked
                                            // console.log( editRole.permissions[key.name])
                                            setEditRole({...editRole})
                                        }} checked={editRole.permissions[key.name]}/>} label={key.alias} />
                                    </FormGroup>
                                })}
                            </TabPanel>
                            <TabPanel value={1} index={0}>
                                {permissions.filter(perm => perm.groups == 1).map(function (key, value){
                                    return <FormGroup key={'1'} sx={{display: 'flex', flexWrap: 'wrap'}}>

                                        <FormControlLabel  control={<Checkbox onChange={(event) => {
                                            editRole.permissions[key.name] = event.target.checked
                                            // console.log( editRole.permissions[key.name])
                                            setEditRole({...editRole})
                                        }} checked={editRole.permissions[key.name]}/>} label={key.alias} />
                                    </FormGroup>
                                })}
                            </TabPanel>
                        </TabContext>
                    </Box>
                    <Button onClick={(event) => {
                        updateRole();
                    }
                    } fullWidth sx={{marginTop: '20px'}}
                            variant={'contained'}>{editRole !== null ? 'Редактировать' : 'Создать'}</Button>
                </CardContent>

            </Drawer>
        </React.Fragment> : ''}

        <Box sx={{width: '100%', typography: 'body1'}}>
            <TabContext value={selectedTab}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Основные" value="1"/>
                        <Tab label="Доступы" value="2"/>
                        <Tab label="Расход / Приход" value="3"/>
                    </TabList>
                </Box>
                <TabPanel value={'1'}>
                    <Box component="form"
                         sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 340}}>
                        <TextField onBlur={(event) => {
                            if(brocardAPIKey.length > 10){
                                setLoadingBroCardAPI(true)
                                network.api({
                                    method: 'get',
                                    url: 'settings/validate/?target=brocard&api_key=' + brocardAPIKey
                                }).then(response => {
                                    console.log(response)
                                    if ('error' in response.data) {
                                        toast.info('Ошибка')
                                        setLoadingBroCardAPI(false)

                                    }
                                    if ('status' in response.data) {
                                        setShows(true)
                                        toast.info('Успешная интеграция с BroCard')
                                        setLoadingBroCardAPI(false)

                                    }
                                })
                            }
                        }} value={brocardAPIKey} onChange={(event) => {
                            brocardAPIKey = event.target.value
                            setBrocardAPIKey(event.target.value)

                        }
                        } size={'small'} label={'BroCard API Key'} sx={{width: '400px'}}>

                        </TextField>
                        {loadingBroCardAPI ? <Box sx={{alignItems: 'center', height: '40px'}}> <CircularProgress
                                sx={{margin: '2px', padding: '8px', height: '32px'}}/> </Box>
                            : <Box sx={{alignItems: 'center', height: '40px'}}> <IconButton sx={{p: '10px'}}
                                                                                            aria-label="menu">
                                <Tooltip title={'API'}><QuestionMarkOutlinedIcon/></Tooltip>
                            </IconButton></Box>}
                    </Box> <Box component="form"
                                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 340}}>
                    <TextField value={keitaroPostback} onChange={(event) => {
                        setKeitaroPostback(event.target.value)
                    }
                    } size={'small'} label={'Keitaro Postback'} sx={{width: '400px'}}>

                    </TextField>
                    <IconButton sx={{p: '10px'}} aria-label="menu">
                        <Tooltip title={'API'}><QuestionMarkOutlinedIcon/></Tooltip>
                    </IconButton>
                </Box>
                    <Box component="form"
                         sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 340}}>
                        <TextField onBlur={(event) => {
                            if (keitaroPostback !== '' && apiKey) {
                                setLoading(true)

                                network.api({
                                    method: 'get',
                                    url: 'settings/validate/?target=keitaro&api_key=' + apiKey + '&postback=' + encodeURIComponent(keitaroPostback)
                                }).then(response => {
                                    if ('error' in response.data) {
                                        toast.info('Ошибка')

                                    }
                                    if ('status' in response.data) {
                                        setShows(true)
                                        setLoading(false)
                                        toast.info('Успешная интеграция с трекером')
                                    }
                                })
                            }
                        }
                        } value={apiKey} onChange={(event) => {
                            setApiKey(event.target.value)
                        }
                        } size={'small'} label={'Keitaro API Key'} sx={{width: '340px'}}>

                        </TextField>
                        {loading ? <Box sx={{alignItems: 'center', height: '40px'}}> <CircularProgress
                                sx={{margin: '2px', padding: '8px', height: '32px'}}/> </Box>
                            : <Box sx={{alignItems: 'center', height: '40px'}}> <IconButton sx={{p: '10px'}}
                                                                                            aria-label="menu">
                                <Tooltip title={'API'}><QuestionMarkOutlinedIcon/></Tooltip>
                            </IconButton></Box>}

                    </Box>
                    {apiKey !== '' && keitaroPostback !== '' && !loading && shows ?
                        <Box component={'form'} sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 340}}>
                            <FormControl sx={{width: '290px'}} size={'small'}>
                                <InputLabel id="demo-simple-select-label">Схема</InputLabel>
                                <Select size={'small'} labelId="demo-select-small"
                                        id="demo-select-small"
                                        label="Схема"
                                        value={selectedModel}
                                        MenuProps={{disableScrollLock: true}}
                                >
                                    <MenuItem value={1}>
                                        Компания - Пользователь
                                    </MenuItem>
                                    <MenuItem value={2}>
                                        Общая компания
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <IconButton sx={{p: '10px'}} aria-label="menu">
                                <Tooltip title={'API'}><QuestionMarkOutlinedIcon/></Tooltip>
                            </IconButton>
                        </Box> : ''}
                </TabPanel>
                <TabPanel value={'2'}>

                    <div style={{height: 630, width: '100%'}}>

                        <DataGrid sx={{border: 'none'}}
                                  components={{
                                      NoRowsOverlay: CustomNoRowsOverlay,
                                  }}
                                  disableColumnFilter={true}
                                  columns={columns}
                                  rows={roles}
                                  pageSize={10}
                                  rowsPerPageOptions={[5]}
                                  checkboxSelection
                                  disableColumnSelector
                                  disableColumnMenu
                                  disableSelectionOnClick
                                  disableRestoreFocus


                        />
                    </div>
                </TabPanel>
                <TabPanel value={'3'}>
                    <Grid container spacing={3} columns={{xs: 1, sm: 12, md: 6}}>
                        <Grid item xs={2} sm={2} md={3}>
                            <Card className={'card'}>
                                <CardHeader

                                    title={<div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Typography sx={{
                                            fontWeight: '500',
                                            fontSize: '1.25rem'
                                        }}>Статьи расхода</Typography>
                                        <Button onClick={() => {
                                            setOpenAddExpense(true)
                                        }
                                        } variant={'contained'}>
                                            Добавить
                                        </Button>
                                    </div>}
                                    style={{paddingBottom: '0px'}}
                                    titleTypographyProps={{
                                        sx: {
                                            mb: 2.5,
                                            lineHeight: '2rem !important',
                                            letterSpacing: '0.15px !important'
                                        }
                                    }}
                                />
                                <CardContent className={'trtfgfg'} sx={{pt: theme => `${theme.spacing(3)} !important`}}>
                                    <div style={{height: 630, width: '100%'}}>

                                        <DataGrid sx={{border: 'none'}}
                                                  components={{
                                                      NoRowsOverlay: CustomNoRowsOverlay,
                                                  }}
                                                  disableColumnFilter={true}
                                                  columns={expenseArticlesColumns}
                                                  rows={expenseArticlesRows}
                                                  pageSize={10}
                                                  rowsPerPageOptions={[5]}
                                                  checkboxSelection
                                                  disableColumnSelector
                                                  disableColumnMenu
                                                  disableSelectionOnClick
                                                  disableRestoreFocus


                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={2} sm={2} md={3}>
                            <Card className={'card'}>
                                <CardHeader

                                    title={<div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Typography sx={{
                                            fontWeight: '500',
                                            fontSize: '1.25rem'
                                        }}>Статьи дохода</Typography>
                                        <Button onClick={(event) => {
                                            setOpenAddIncome(true)
                                        }
                                        } variant={'contained'}>
                                            Добавить
                                        </Button>
                                    </div>}
                                    style={{paddingBottom: '0px'}}
                                    titleTypographyProps={{
                                        sx: {
                                            mb: 2.5,
                                            lineHeight: '2rem !important',
                                            letterSpacing: '0.15px !important'
                                        }
                                    }}
                                />
                                <CardContent className={'trtfgfg'} sx={{pt: theme => `${theme.spacing(3)} !important`}}>
                                    <div style={{height: 630, width: '100%'}}>

                                        <DataGrid sx={{border: 'none'}}
                                                  components={{
                                                      NoRowsOverlay: CustomNoRowsOverlay,
                                                  }}
                                                  disableColumnFilter={true}
                                                  columns={incomeArticlesColumns}
                                                  rows={incomeArticlesRows}
                                                  pageSize={10}
                                                  rowsPerPageOptions={[5]}
                                                  checkboxSelection
                                                  disableColumnSelector
                                                  disableColumnMenu
                                                  disableSelectionOnClick
                                                  disableRestoreFocus


                                        />
                                    </div>
                                </CardContent>
                            </Card>

                        </Grid>
                    </Grid>
                </TabPanel>
            </TabContext>
        </Box>
    </>
}