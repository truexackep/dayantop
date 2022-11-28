import Box from "@mui/material/Box";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {useEffect, useState} from "react";
import {Skeleton} from "@mui/lab";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import network from "../utils/network";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {useRouter} from "next/router";
import Link from 'next/link'
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import {
    CardContent, Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    Select,
    Tabs,
    tabsClasses,
    TextField
} from "@mui/material";
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import Divider from "@mui/material/Divider";
import TabPanel from "@mui/lab/TabPanel";

export default function Users(props) {
    const router = useRouter()
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
    let [loadRows, setLoadRows] = useState([
        {id: -1, user: 0, email: '', role: '', status: ''},
        {id: -2, user: 0, email: '', role: '', status: ''},
        {id: -3, user: 0, email: '', role: '', status: ''},
        {id: -4, user: 0, email: '', role: '', status: ''},
        {id: -5, user: 0, email: '', role: '', status: ''},
        {id: -6, user: 0, email: '', role: '', status: ''},
        {id: -7, user: 0, email: '', role: '', status: ''},
        {id: -8, user: 0, email: '', role: '', status: ''},
        {id: -9, user: 0, email: '', role: '', status: ''},
        {id: -10, user: 0, email: '', role: '', status: ''},

    ])
    let [selectedRoleTag, setSelectedRoleTag] = useState(8);
    let [permissions, setPermissions] = useState([]);

    let [roles, setRoles] = useState([{id: -1, name: <Skeleton width={'100%'}></Skeleton>}])
    let [selectedRole, setSelectedRole] = useState(-1)
    let [selectedTab, setSelectedTab] = useState(0)
    let [selectedStatus, setSelectedStatus] = useState(-1)
    let [rows, setRows] = useState([...loadRows])
    let [selectedUser, setSelectedUser] = useState(null)
    const {settings, saveSettings} = props

    let [search, setSearch] = useState('')
    const RenderId = (props) => {
        return (
            <>
                {props.row.id < 0 ? <Skeleton sx={{width: '70px'}}></Skeleton> : <Typography>{props.row.id}</Typography>
                }
            </>
        );
    };
    const RenderVerticals = (props) => {
        return (
            <>
                {props.row.id < 0 ? <Skeleton sx={{width: '70px'}}></Skeleton> :
                    <Typography>{props.row.vertical.name}</Typography>
                }
            </>
        );
    };
    const RenderList = (props) => {


        return (
            <Box sx={{pt: 2, pb: 3, px: 4, paddingLeft: '0px !important',}}>
                <Box sx={{display: 'flex', paddingLeft: '0px !important', alignItems: 'center'}}>
                    {props.row.id > 0 ? <>
                        <Avatar alt={props.row.name} src={props.row.photo}
                                sx={{
                                    width: '32px',
                                    height: '32px',
                                    bgcolor: 'rgb(60, 50, 96)',
                                    color: 'rgb(145, 85, 253)'
                                }}/>
                        <Box sx={{
                            display: 'flex',
                            paddingLeft: '0px !important',
                            marginLeft: 3,
                            alignItems: 'flex-start',
                            flexDirection: 'column'
                        }}>
                            <Typography>{props.row.name}</Typography>
                            <Typography variant='body2' sx={{fontSize: '0.8rem', color: 'text.disabled'}}>

                                {props.row.tag}
                            </Typography>
                        </Box>
                    </> : <> <Skeleton variant="circular" width={32} height={32}/>
                        <Box sx={{
                            display: 'flex',
                            paddingLeft: '0px !important',
                            marginLeft: 3,
                            alignItems: 'flex-start',
                            flexDirection: 'column'
                        }}>
                            <Typography><Skeleton sx={{width: '190px'}}></Skeleton></Typography>
                            <Typography variant='body2'>
                                <Skeleton sx={{width: '190px'}}></Skeleton>
                            </Typography>
                        </Box></>}

                </Box>
            </Box>
        );
    };
    const RenderTg = (props) => {
        return (
            <>
                {props.row.id < 0 ? <Skeleton sx={{width: '100%'}}></Skeleton> :
                    <Typography>{props.row.telegram}</Typography>
                }
            </>
        );
    };
    const RenderEmail = (props) => {
        return (
            <>
                {props.row.id < 0 ? <Skeleton sx={{width: '100%'}}></Skeleton> :
                    <Typography>{props.row.email}</Typography>
                }
            </>
        );
    };
    const RenderRole = (props) => {
        return (
            <>
                {props.row.id < 0 ? <Skeleton sx={{width: '100%'}}></Skeleton> :
                    <Typography>{props.row.role.name}</Typography>
                }
            </>
        );
    };
    const RenderStatus = (props) => {
        return (
            <>
                {props.row.id < 0 ? <Skeleton sx={{width: '100%'}}></Skeleton> : <Tooltip title={(() => {
                    if (props.row.status == 1) {
                        return 'Активный'
                    }
                    if (props.row.status == 0) {
                        return 'Удален'
                    }
                })()}><Chip sx={{width: '100px'}} label={(() => {
                    if (props.row.status == 1) {
                        return 'Активный'
                    }
                    if (props.row.status == 0) {
                        return 'Удален'
                    }

                })()} color={(() => {

                    if (props.row.status == 1) {
                        return 'success'
                    }
                    if (props.row.status == 0) {
                        return 'error'
                    }
                })()} variant="outlined"/></Tooltip>
                }
            </>
        );
    };
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
                            router.push('?id=' + props.row.id)
                        }
                        }>
                            <ListItemIcon sx={{marginRight: '0px'}}>
                                <InfoOutlinedIcon sx={{marginRight: '0px'}}/>
                            </ListItemIcon>
                            <Typography variant="inherit">Подробности</Typography>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon sx={{marginRight: '0px'}}>
                                <DeleteOutlineOutlinedIcon sx={{marginRight: '0px'}}/>
                            </ListItemIcon>
                            <Typography variant="inherit">Удалить</Typography>
                        </MenuItem>

                    </Menu>
                </Typography>
                }
            </>
        );
    };
    const columns = [
        {field: 'id', headerName: 'ID', width: 70, renderCell: (props) => <RenderId {...props}/>},
        {field: 'user', headerName: 'Пользователь', width: 250, renderCell: (props) => <RenderList {...props}/>},
        {field: 'email', headerName: 'Email', width: 180, renderCell: (props) => <RenderEmail {...props}/>},
        {field: 'telegram', headerName: 'Telegram', width: 180, renderCell: (props) => <RenderTg {...props}/>},
        {field: 'role', headerName: 'Должность', width: 180, renderCell: (props) => <RenderRole {...props}/>},
        {field: 'verticals', headerName: 'Вертикаль', width: 150, renderCell: (props) => <RenderVerticals {...props}/>},
        {field: 'status', headerName: 'Статус', width: 180, renderCell: (props) => <RenderStatus {...props}/>},
        {field: 'action', headerName: 'Действие', width: 80, renderCell: (props) => <RenderAction {...props}/>},

    ];

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
                <Box sx={{mt: 1}}>Нету пользователей</Box>
            </StyledGridOverlay>
        );
    }

    useEffect(() => {
        if (router.query.id) {
            network.api({
                method: 'get',
                url: 'users/' + router.query.id
            }).then(response => {
                selectedUser = response.data
             //  selectedUser.permissions = JSON.parse(selectedUser.permissions)
                console.log(selectedUser)
                setSelectedUser(selectedUser)
            })
        }
    }, [router])
    useEffect(() => {
        loadPermissions();
        loadUsers()
        loadRoles()
        settings.headerContent = ''

    }, [])
    const loadUsers = () => {
        network.api({
            method: 'get',
            url: 'users/'
        }).then(response => {
            setRows(response.data)
        })
    }
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue)
    }
    const loadRoles = () => {
        network.api({
            method: 'get',
            url: 'roles/'
        }).then(response => {
            roles = response.data
            console.log(roles)
            setRoles([...roles])
        })
    }

    return <>
        <Box sx={{width: '100%', typography: 'body1'}}>
            {router.query.id == null ? <>
                    <Card className={'card'}>
                        <CardHeader

                            title={'Фильтры'}
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
                            <Grid container spacing={4}>
                                <Grid item md={4} xs={12}>
                                    <FormControl size={'small'} fullWidth>
                                        <InputLabel>Должность</InputLabel>
                                        <Select endAdornment={<IconButton
                                            sx={{marginRight: '20px', display: selectedRole == -1 ? 'none' : 'flex'}}
                                            onClick={(event) => {
                                                setSelectedRole(-1)
                                            }
                                            }><ClearIcon/></IconButton>} onChange={(event) =>

                                            setSelectedRole(event.target.value)
                                        } value={selectedRole} label={'Должность'} size={'small'}>
                                            {roles.map(function (key, value) {
                                                return <MenuItem key={value} value={key.id}>
                                                    {key.name}
                                                </MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={4} xs={12}>

                                    <FormControl size={'small'} fullWidth>
                                        <InputLabel>Статус</InputLabel>
                                        <Select value={selectedStatus} endAdornment={<IconButton
                                            sx={{marginRight: '20px', display: selectedStatus == -1 ? 'none' : 'flex'}}
                                            onClick={(event) => {
                                                setSelectedStatus(-1)
                                            }
                                            }><ClearIcon/></IconButton>} onChange={(event) => {
                                            setSelectedStatus(event.target.value)
                                        }
                                        } label={'Статус'} size={'small'}>
                                            <MenuItem value={1}>
                                                Активный
                                            </MenuItem>
                                            <MenuItem value={0}>
                                                Удалён
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card sx={{marginTop: '20px'}} className={'card'}>
                        <CardHeader

                            title={'Пользователи'}
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
                            <Grid container spacing={1} justifyContent={'flex-end'}>

                                <Grid md={3} xs={6} item>
                                    <FormControl size={'small'} fullWidth>
                                        <TextField endAdornment={<IconButton
                                            sx={{marginRight: '20px', display: search == '' ? 'none' : 'flex'}}
                                            onClick={(event) => {
                                                setSearch('')
                                            }
                                            }><ClearIcon/></IconButton>} value={search} onChange={(event) => {
                                            setSearch(event.target.value)
                                        }
                                        } label={'Поиск'} size={'small'}>

                                        </TextField>
                                    </FormControl>
                                </Grid>
                                <Grid item md={1.2} xs={6}>
                                    <Button variant={'contained'}>Добавить</Button>

                                </Grid>
                            </Grid>

                            <div style={{height: 630, width: '100%'}}>

                                <DataGrid sx={{border: 'none'}}
                                          components={{
                                              NoRowsOverlay: CustomNoRowsOverlay,
                                          }}
                                          disableColumnFilter={true}
                                          rows={(() => {
                                              let filtered = rows;
                                              console.log(selectedRole)

                                              if (selectedStatus !== -1) {
                                                  console.log(selectedStatus)
                                                  console.log(rows)
                                                  filtered = filtered.filter(ky => ky.status == selectedStatus);
                                              }
                                              if (selectedRole !== -1) {
                                                  console.log(selectedRole)
                                                  console.log(rows)
                                                  filtered = filtered.filter(ky => ky.role.id == selectedRole);
                                              }
                                              if (search !== '') {
                                                  filtered = filtered.filter(ky => ky.name.toLowerCase().includes(search.toLowerCase()) || ky.tag.toLowerCase().includes(search.toLowerCase()))
                                              }
                                              return filtered;
                                          })()}
                                          columns={columns}
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
                    </Card></> :
                <Grid container spacing={3} columns={{xs: 1, sm: 1, md: 12}}>
                    <Grid item xs={4}>
                        <Card className={'card'}>
                            <CardHeader

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
                                {selectedUser !== null ?
                                    <Box>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginTop: '30px',
                                            flexDirection: 'column',
                                            gap: '20px'
                                        }}>
                                            <Avatar src={selectedUser.photo} alt={selectedUser.name}
                                                    sx={{bgcolor: '#3c3260', width: 120, height: 120, color: '#8f54f9'}}
                                                    variant="rounded">

                                            </Avatar>
                                            <Typography sx={{fontWeight: 'bold'}}>{selectedUser.name}</Typography>
                                            <Chip label={selectedUser.role.name} color="error"/>


                                        </Box>
                                        <Box sx={{marginTop: '30px'}}>
                                            <Typography sx={{
                                                fontSize: '18px',
                                                fontWeight: '500',
                                                marginBottom: '10px'
                                            }}>Информация</Typography>
                                            <Divider sx={{mt: 0, mb: 1}}/>

                                        </Box>
                                    </Box> :
                                    <Box><Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginTop: '30px',
                                        flexDirection: 'column',
                                        gap: '20px'
                                    }}>
                                        <Skeleton width={120} height={120} variant="rounded"/>

                                        <Skeleton width={140} height={20} variant="rounded"/>

                                    </Box>
                                        <Box sx={{marginTop: '30px'}}>
                                            <Typography sx={{
                                                fontSize: '18px',
                                                fontWeight: '500',
                                                marginBottom: '10px'
                                            }}>Информация</Typography>
                                            <Divider sx={{mt: 0, mb: 1}}/>

                                        </Box>
                                    </Box>}
                            </CardContent>
                        </Card>

                    </Grid>
                    <Grid item xs={8}>
                        <Box sx={{

                            width: {xs: 360, sm: '100%'},
                        }}>


                            <TabContext value={selectedTab}>
                                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>

                                    <TabList sx={{
                                        [`& .${tabsClasses.scrollButtons}`]: {
                                            '&.Mui-disabled': {opacity: 0.3},
                                        },
                                    }} variant="scrollable"
                                             scrollButtons onChange={handleChange}
                                             aria-label="lab API tabs example">
                                        <Tab label={<div style={{display: 'flex', alignItems: 'center'}}>
                                            <PersonOutlineOutlinedIcon/>ОСНОВные</div>}/>
                                        <Tab
                                            label={<div style={{display: 'flex', alignItems: 'center'}}>
                                                <HttpsOutlinedIcon/>БЕЗопасность
                                            </div>}/>
                                        <Tab label={<div style={{display: 'flex', alignItems: 'center'}}>
                                            <InsertChartOutlinedIcon/>keitaro</div>}/>
                                        <Tab label={<div style={{display: 'flex', alignItems: 'center'}}>
                                            <NotificationsNoneOutlinedIcon/>уведомления</div>}/>
                                        <Tab label={<div style={{display: 'flex', alignItems: 'center'}}>
                                            <HistoryOutlinedIcon/>история</div>}/>
                                    </TabList>
                                </Box>
                                {selectedUser !== null ?
                                <TabPanel value={0}>
                                    <Card className={'card'}>
                                        <CardHeader
                                            title={'Основные'}
                                            style={{paddingBottom: '0px'}}
                                            titleTypographyProps={{
                                                sx: {
                                                    mb: 2.5,
                                                    lineHeight: '2rem !important',
                                                    letterSpacing: '0.15px !important'
                                                }
                                            }}
                                        />
                                        <CardContent className={'trtfgfg'}
                                                     sx={{pt: theme => `${theme.spacing(3)} !important`}}>
                                            <FormControl                                             sx={{paddingTop: '0px'}}
                                            >
                                                <InputLabel id="demo-simple-select-helper-label">Должность</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="demo-simple-select-helper"
                                                    value={selectedUser.role.id}
                                                    label="Должность"
                                                    size={'small'}
                                                    onChange={(event) => {
                                                        let sel = roles.filter(perme => perme.id == event.target.value)[0];
                                                        selectedUser.role = sel
                                                        selectedUser.permissions = JSON.parse(sel.permissions)
                                                        //setPermissions([...permissions])
                                                        setSelectedUser({...selectedUser})
                                                    }
                                                    }
                                                >
                                                    {roles.map(function (key, value) {
                                                        return <MenuItem key={value} value={key.id}>
                                                            {key.name}
                                                        </MenuItem>
                                                    })}
                                                </Select>
                                            </FormControl>
                                            <Box
                                                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex',}}
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
                                                            }, borderRight: 1, borderColor: 'divider', height: '400px' }}
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
                                                            return <FormGroup key={8+value} sx={{display: 'flex', flexWrap: 'wrap'}}>

                                                                <FormControlLabel  control={<Checkbox onChange={(event) => {
                                                                    selectedUser.permissions[key.name] = event.target.checked
                                                                    setSelectedUser({...selectedUser})

                                                                    // console.log( editRole.permissions[key.name])
                                                                   // setEditRole({...editRole})
                                                                }} checked={  selectedUser.permissions[key.name] }/>} label={key.alias} />
                                                            </FormGroup>
                                                        })}
                                                    </TabPanel>
                                                    <TabPanel value={4} index={0}>
                                                        {permissions.filter(perm => perm.groups == 4).map(function (key, value){
                                                            return <FormGroup key={4+value}  sx={{display: 'flex', flexWrap: 'wrap'}}>

                                                                <FormControlLabel  control={<Checkbox onChange={(event) => {
                                                                    selectedUser.permissions[key.name] = event.target.checked
                                                                    setSelectedUser({...selectedUser})
                                                                    // console.log( editRole.permissions[key.name])
                                                                    //setEditRole({...editRole})
                                                                }} checked={  selectedUser.permissions[key.name]}/>} label={key.alias} />
                                                            </FormGroup>
                                                        })}
                                                    </TabPanel>
                                                    <TabPanel value={3} index={0}>
                                                        {permissions.filter(perm => perm.groups == 3).map(function (key, value){
                                                            return <FormGroup key={3+value}  sx={{display: 'flex', flexWrap: 'wrap'}}>

                                                                <FormControlLabel  control={<Checkbox onChange={(event) => {
                                                                    selectedUser.permissions[key.name] = event.target.checked
                                                                    setSelectedUser({...selectedUser})

                                                                    // console.log( editRole.permissions[key.name])
                                                                    //setEditRole({...editRole})
                                                                }} checked={  selectedUser.permissions[key.name]}/>} label={key.alias} />
                                                            </FormGroup>
                                                        })}
                                                    </TabPanel>
                                                    <TabPanel value={12} index={0}>
                                                        {permissions.filter(perm => perm.groups == 12).map(function (key, value){
                                                            return <FormGroup key={12+value}  sx={{display: 'flex', flexWrap: 'wrap'}}>

                                                                <FormControlLabel  control={<Checkbox onChange={(event) => {
                                                                    selectedUser.permissions[key.name] = event.target.checked
                                                                    setSelectedUser({...selectedUser})

                                                                    // console.log( editRole.permissions[key.name])
                                                                    //setEditRole({...editRole})
                                                                }} checked={  selectedUser.permissions[key.name]}/>} label={key.alias} />
                                                            </FormGroup>
                                                        })}
                                                    </TabPanel>
                                                    <TabPanel value={10} index={0}>
                                                        {permissions.filter(perm => perm.groups == 10).map(function (key, value){
                                                            return <FormGroup key={10+value} sx={{display: 'flex', flexWrap: 'wrap'}}>

                                                                <FormControlLabel  control={<Checkbox onChange={(event) => {
                                                                    selectedUser.permissions[key.name] = event.target.checked
                                                                    setSelectedUser({...selectedUser})

                                                                    // console.log( editRole.permissions[key.name])
                                                                    //setEditRole({...editRole})
                                                                }} checked={  selectedUser.permissions[key.name]}/>} label={key.alias} />
                                                            </FormGroup>
                                                        })}
                                                    </TabPanel>
                                                    <TabPanel value={11} index={0}>
                                                        {permissions.filter(perm => perm.groups == 11).map(function (key, value){
                                                            return <FormGroup key={11+value} sx={{display: 'flex', flexWrap: 'wrap'}}>

                                                                <FormControlLabel  control={<Checkbox onChange={(event) => {
                                                                    selectedUser.permissions[key.name] = event.target.checked
                                                                    setSelectedUser({...selectedUser})

                                                                    // console.log( editRole.permissions[key.name])
                                                                    // setEditRole({...editRole})
                                                                }} checked={  selectedUser.permissions[key.name]}/>} label={key.alias} />
                                                            </FormGroup>
                                                        })}
                                                    </TabPanel>
                                                    <TabPanel value={9} index={0}>
                                                        {permissions.filter(perm => perm.groups == 9).map(function (key, value){
                                                            return <FormGroup key={9+value}  sx={{display: 'flex', flexWrap: 'wrap'}}>

                                                                <FormControlLabel  control={<Checkbox onChange={(event) => {
                                                                    selectedUser.permissions[key.name] = event.target.checked
                                                                    // console.log( editRole.permissions[key.name])
                                                                    setSelectedUser({...selectedUser})

                                                                    //  setEditRole({...editRole})
                                                                }} checked={  selectedUser.permissions[key.name]}/>} label={key.alias} />
                                                            </FormGroup>
                                                        })}
                                                    </TabPanel>
                                                    <TabPanel value={5} index={0}>
                                                        {permissions.filter(perm => perm.groups == 5).map(function (key, value){
                                                            return <FormGroup key={5+value}  sx={{display: 'flex', flexWrap: 'wrap'}}>

                                                                <FormControlLabel  control={<Checkbox onChange={(event) => {
                                                                    selectedUser.permissions[key.name] = event.target.checked
                                                                    // console.log( editRole.permissions[key.name])
                                                                    setSelectedUser({...selectedUser})

                                                                    //  setEditRole({...editRole})
                                                                }} checked={  selectedUser.permissions[key.name]}/>} label={key.alias} />
                                                            </FormGroup>
                                                        })}
                                                    </TabPanel>
                                                    <TabPanel value={0} index={0}>

                                                        {permissions.filter(perm => perm.groups == 0).map(function (key, value){
                                                            console.log(selectedUser.permissions[key.name])
                                                            //console.log(key.name)
                                                            return <FormGroup key={25+value}  sx={{display: 'flex', flexWrap: 'wrap'}}>

                                                                <FormControlLabel  control={<Checkbox onChange={(event) => {
                                                                    selectedUser.permissions[key.name] = event.target.checked
                                                                    // console.log( editRole.permissions[key.name])
                                                                    setSelectedUser({...selectedUser})
                                                                    // setEditRole({...editRole})
                                                                }} checked={  selectedUser.permissions[key.name]}/>} label={key.alias} />
                                                            </FormGroup>
                                                        })}
                                                    </TabPanel>
                                                    <TabPanel value={2} index={0}>
                                                        {permissions.filter(perm => perm.groups == 2).map(function (key, value){
                                                            return <FormGroup key={2+value}  sx={{display: 'flex', flexWrap: 'wrap'}}>

                                                                <FormControlLabel  control={<Checkbox onChange={(event) => {
                                                                    selectedUser.permissions[key.name] = event.target.checked
                                                                    setSelectedUser({...selectedUser})

                                                                    // console.log( editRole.permissions[key.name])
                                                                    // setEditRole({...editRole})
                                                                }} checked={  selectedUser.permissions[key.name]}/>} label={key.alias} />
                                                            </FormGroup>
                                                        })}
                                                    </TabPanel>
                                                    <TabPanel value={1} index={0}>
                                                        {permissions.filter(perm => perm.groups == 1).map(function (key, value){
                                                            return <FormGroup key={1+value} sx={{display: 'flex', flexWrap: 'wrap'}}>

                                                                <FormControlLabel  control={<Checkbox onChange={(event) => {
                                                                    selectedUser.permissions[key.name] = event.target.checked
                                                                    setSelectedUser({...selectedUser})

                                                                    // console.log( editRole.permissions[key.name])
                                                                    //  setEditRole({...editRole})
                                                                }} checked={  selectedUser.permissions[key.name]}/>} label={key.alias} />
                                                            </FormGroup>
                                                        })}
                                                    </TabPanel>
                                                </TabContext>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </TabPanel> : ''}
                            </TabContext>


                        </Box>
                    </Grid>
                </Grid>}
        </Box>
    </>
}