import Box from '@mui/material/Box';
import {DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {CardContent, Drawer, LinearProgress, TextField} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Skeleton} from "@mui/lab";
import Tooltip from "@mui/material/Tooltip";
import {useEffect, useState} from "react";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Carousel from 'react-material-ui-carousel'
import IconButton from "@mui/material/IconButton";
import network from "../utils/network";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import {toast} from "react-toastify";

export default function Categories(props) {

    let [open, setOpen] = useState(false)
    const [file, setFile] = useState(null);
    let [rawFile, setRawFile] = useState(null)
    let [categoryName, setCategoryName] = useState('')
    let [loading, setLoading] = useState(false)
    let [rows, setRows] = useState([
        {
            id: -11,
            photo: 'https://thumb.tildacdn.com/tild3365-3262-4563-b164-366639633938/-/format/webp/FFE02315-98DC-4C4C-9.jpeg',
            name: '-1'
        },
        {
            id: -2,
            photo: 'https://thumb.tildacdn.com/tild3365-3262-4563-b164-366639633938/-/format/webp/FFE02315-98DC-4C4C-9.jpeg',
            name: '-1'
        },
        {
            id: -3,
            photo: 'https://thumb.tildacdn.com/tild3365-3262-4563-b164-366639633938/-/format/webp/FFE02315-98DC-4C4C-9.jpeg',
            name: '-1'
        },
        {
            id: -4,
            photo: 'https://thumb.tildacdn.com/tild3365-3262-4563-b164-366639633938/-/format/webp/FFE02315-98DC-4C4C-9.jpeg',
            name: '-1'
        },
        {
            id: -5,
            photo: 'https://thumb.tildacdn.com/tild3365-3262-4563-b164-366639633938/-/format/webp/FFE02315-98DC-4C4C-9.jpeg',
            name: '-1'
        },
        {
            id: -6,
            photo: 'https://thumb.tildacdn.com/tild3365-3262-4563-b164-366639633938/-/format/webp/FFE02315-98DC-4C4C-9.jpeg',
            name: '-1'
        },
        {
            id: -7,
            photo: 'https://thumb.tildacdn.com/tild3365-3262-4563-b164-366639633938/-/format/webp/FFE02315-98DC-4C4C-9.jpeg',
            name: '-1'
        },
        {
            id: -8,
            photo: 'https://thumb.tildacdn.com/tild3365-3262-4563-b164-366639633938/-/format/webp/FFE02315-98DC-4C4C-9.jpeg',
            name: '-1'
        },
        {
            id: -9,
            photo: 'https://thumb.tildacdn.com/tild3365-3262-4563-b164-366639633938/-/format/webp/FFE02315-98DC-4C4C-9.jpeg',
            name: '-1'
        },
        {
            id: -10,
            photo: 'https://thumb.tildacdn.com/tild3365-3262-4563-b164-366639633938/-/format/webp/FFE02315-98DC-4C4C-9.jpeg',
            name: '-1'
        },
    ])
    let [editCategory, setEditCategory] = useState(null)
    const columns = [
        {
            field: 'id',
            headerName: 'ID', width: 90, renderCell: (props) => <RenderId {...props}/>
        },
        {
            field: 'photo',
            headerName: 'Фото',
            renderCell: (props) => <RenderPhoto {...props}/>,
            width: 120
        },
        {
            field: 'name',
            headerName: 'Название',
            renderCell: (props) => <RenderName {...props}/>,
            width: 250
        }, {
            field: 'actions',
            headerName: 'Действие',
            renderCell: (props) => <RenderActions {...props}/>,
            width: 250
        },
    ];
    const RenderActions = (props) => {
        return (
            <>
                {props.row.id < 0 ? <Skeleton sx={{width: '150px'}}></Skeleton> : <Typography>

                    <GridActionsCellItem onClick={() => {
                        editCategory = props.row
                        setEditCategory(editCategory)
                        setCategoryName(editCategory.name)
                        setOpen(true)
                        setFile(editCategory.photo)

                    }
                    }
                                         icon={<EditIcon/>}
                                         label="Save"

                    />
                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
                        label="Cancel"
                        className="textPrimary"
                        onClick={(event) => {
                            network.api({
                                method: 'delete',
                                url: 'categories/',
                                data: {
                                    id: props.row.id
                                }
                            }).then(response => {
                                setRows([...rows.filter(k => k.id != props.row.id)])
                                toast.info('Категория была удалена')

                            })
                        }
                        }
                        color="inherit"
                    />
                </Typography>
                }
            </>
        );
    };
    const RenderPhoto = (props) => {
        return (
            <>
                {props.row.id < 0 ? <Skeleton variant="rounded" width={210} height={90}/> :
                    <Box sx={{height: '90px'}} component={'img'} src={props.row.photo}/>

                }
            </>
        );
    };
    const RenderName = (props) => {
        return (
            <>
                {props.row.id < 0 ? <Skeleton sx={{width: '100%'}}></Skeleton> :
                    <Typography>{props.row.name}</Typography>
                }
            </>
        );
    };
    const RenderId = (props) => {
        return (
            <>
                {props.row.id < 0 ? <Skeleton sx={{width: '100%'}}></Skeleton> : <Typography>{props.row.id}</Typography>
                }
            </>
        );
    };
    const loadCategories = () => {
        network.api({
            method: 'get',
            url: 'categories/'
        }).then(response => {
            rows = response.data
            setRows([...rows])
        })
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
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]
    useEffect(() => {
        loadCategories()
    }, [])
    const handleLoadImage = (event) => {
        setFile(
            URL.createObjectURL(event.target.files[0])
        );
        setRawFile(event.target.files[0])
    }

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

    return (
        <>
            <Drawer
                sx={{

                    '& .MuiDrawer-paper': {width: {xs: '90%', sm: '30%'}},
                }}
                anchor={'right'}
                open={open}
                onClose={(event) => {
                    setOpen(false)
                }
                }
            >
                <CardHeader

                    title={<Box>
                        <Typography sx={{fontSize: '18px'}}>Добавить категорию</Typography>
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
                    <Box sx={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                        <Box sx={{width: '90px', height: '90px',}}>
                            {file !== null ? <IconButton aria-label="upload picture" component="label"><Box
                                sx={{width: '90px', height: '90px',}} src={file} component={'img'}>

                            </Box>
                                <input onChange={handleLoadImage} hidden accept="image/*" multiple type="file"/>

                            </IconButton> : <><IconButton aria-label="upload picture" component="label">
                                <input onChange={handleLoadImage} hidden accept="image/*" multiple type="file"/>

                                <AddPhotoAlternateOutlinedIcon sx={{
                                    width: '100%',
                                    height: '100%'
                                }}> </AddPhotoAlternateOutlinedIcon></IconButton></>
                            }


                            {/*</Carousel>*/}
                            <Typography>Фотография</Typography>
                        </Box>
                        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', gap: '20px'}}>
                            <TextField value={categoryName} onChange={(event) => {
                                setCategoryName(event.target.value)
                            }} sx={{width: '100%'}} size={'small'} label={'Название'}/>
                            {editCategory == null ?  <Button onClick={(event) => {
                                setLoading(true)
                                const formData = new FormData();
                                formData.append("selectedFile", rawFile);
                                formData.append('categoryName', categoryName)
                                network.api({
                                    method: 'post',
                                    url: 'categories/',
                                    data: formData,
                                    headers: {"Content-Type": "multipart/form-data"},
                                }).then(response => {
                                    //  rows.unshift(response.data)
                                    setOpen(false)
                                    setRows([response.data, ...rows])
                                    setLoading(false)
                                    toast.info('Категория была добавлена')
                                })
                            }} variant={'contained'}>Создать</Button> : <Button onClick={(event) => {
                                setLoading(true)

                                const formData = new FormData();
                                let reader = new FileReader();
                                formData.append("id", editCategory.id);
                                if(rawFile == null) {
                                    formData.append("selectedFile", '-1');
                                }else {
                                    formData.append("selectedFile", rawFile);

                                }
                                formData.append('categoryName', categoryName)
                                network.api({
                                    method: 'post',
                                    url: 'categories/',
                                    data: formData,
                                    headers: {"Content-Type": "multipart/form-data"},
                                }).then(response => {
                                   console.log(response.data)
                                    let row = rows.filter(kk => kk.id == editCategory.id)[0]
                                    row.name = categoryName
                                    row.photo = response.data.photo
                                    setRows([...rows])
                                    setLoading(false)
                                    setOpen(false)
                                    toast.info('Категория была обновлена')
                                })
                            }} variant={'contained'}>Редактировать</Button>}

                        </Box>
                    </Box>
                    {/*<TextField value={articleName} onChange={(event) => {*/}
                    {/*    setArticleName(event.target.value)*/}
                    {/*}*/}
                    {/*} label={'Название'} size={'small'} fullWidth/>*/}
                    {/*<Button onClick={(event) => {*/}
                    {/*    updateArticle();*/}
                    {/*}*/}
                    {/*} fullWidth sx={{marginTop: '20px'}}*/}
                    {/*        variant={'contained'}>{editArticle !== null ? 'Редактировать' : 'Создать'}</Button>*/}
                </CardContent>
            </Drawer>
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
                        }}>Категории</Typography>
                        <Button onClick={() => {
                            setOpen(true)
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
                    <Box sx={{height: 635, width: '100%'}}>
                        <DataGrid
                            components={{
                                NoRowsOverlay: CustomNoRowsOverlay,
                            }}
                            disableColumnFilter={true}
                            columns={columns}
                            rows={rows}
                            pageSize={10}
                            getRowHeight={({id, densityFactor}) => {
                                return 100;
                            }}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            disableColumnSelector
                            disableColumnMenu
                            disableSelectionOnClick
                            disableRestoreFocus
                        />
                    </Box>
                </CardContent>
            </Card>
        </>
    )


}