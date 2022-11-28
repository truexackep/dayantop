import Box from '@mui/material/Box';
import {DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {formatMoney} from "../utils/utils";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
    ButtonGroup,
    CardContent,
    Drawer,
    FormControlLabel,
    FormGroup,
    LinearProgress, Paper,
    Select,
    Switch,
    TextField
} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Autocomplete, Skeleton} from "@mui/lab";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Tooltip from "@mui/material/Tooltip";
import React, {useEffect, useState} from "react";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Carousel from 'react-material-ui-carousel'
import IconButton from "@mui/material/IconButton";
import network from "../utils/network";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import {toast} from "react-toastify";
import Divider from "@mui/material/Divider";
import Menu from '@mui/material/Menu';
import AddIcon from '@mui/icons-material/Add';
import Tags from "./tags";
import Chip from "@mui/material/Chip";

export default function Products(props) {
    let [selectedCategory, setSelectedCategory] = useState(null)
    let [open, setOpen] = useState(false)
    const [file, setFile] = useState(null);
    let [rawFile, setRawFile] = useState(null)
    let [categoryName, setCategoryName] = useState('')
    let [barcode, setBarcode] = useState('')
    let [loading, setLoading] = useState(false)
    let [buyAmount, setBuyAmount] = useState('')
    let [sellAmount, setSellAmount] = useState('')
    let [products, setProducts] = useState([])
    let [rows, setRows] = useState([
        {
            id: -11,
            photo: 'https://thumb.tildacdn.com/tild3365-3262-4563-b164-366639633938/-/format/webp/FFE02315-98DC-4C4C-9.jpeg',
            name: '-1'
        }
    ])
    let [id, setId] = useState(1)
    let [sizes, setSizes] = useState([])
    let [colors, setColors] = useState([])
    let [categories, setCategories] = useState([])
    let [photos, setPhotos] = useState([])
    let [rawFiles, setRawFiles] = useState([])
    let [variant, setVariant] = useState(false)
    let [variants, setVariants] = useState([])
    let [baseVariant, setBaseVariant] = useState([])
    let [editCategory, setEditCategory] = useState(null)
    let [selectedSize, setSelectedSize] = useState('')
    let [selectedColor, setSelectedColor] = useState('')
    let [rowsP, setRowsP] = useState([])
    const addProduct = () => {
        id = id + 1
        setId(id)
        let product = {
            id: id,
            size: '',
            color: '',
            count: 1
        }
        setProducts((prevRows) => [...prevRows, product]);


    }
    const loadProducts = () => {
        network.api({
            method: 'get',
            url: 'products/'
        }).then(response => {
            let rows = response.data
            let filtered = []
            rows.map(function (key, value) {
                key.photos = JSON.parse(key.photos)
                key.variants = JSON.parse(key.variants)
                key.varvalues = JSON.parse(key.varvalues)
                filtered.push(key)
            })

            setRowsP([...filtered])
        })
    }
    const createProduct = () => {
        const formData = new FormData();
        let reader = new FileReader();
        let files = 0
        rawFiles.map(function (key, value) {
            formData.append("photo[]", key);
            files = files + 1;
        })
        if(barcode == '') {
            toast.info('Добавьте артикул!')
            return;
        }
        if(files == 0){
            toast.info('Добавьте фото!')
            return;
        }
        if(categoryName == '') {
            toast.info('Добавьте имя!')
            return;
        }
        if(selectedCategory == null) {
            toast.info('Выберите категорию!')
            return;
        }

        //  formData.append("photo[]", rawFiles);
        formData.append('productInfo', JSON.stringify({
            barcode: barcode,
            sellAmount: sellAmount,
            buyAmount: buyAmount,
            name: categoryName,
            category: selectedCategory
        }))
        formData.append('sizes', JSON.stringify(sizes))
        formData.append('colors', JSON.stringify(colors))
        formData.append("variants", JSON.stringify(products))
        // //   formData.append('lol', rawFiles)

        network.api({
            method: 'post',
            url: 'products/',
            data: formData,
            headers: {"Content-Type": "multipart/form-data"},
        }).then(response => {
            console.log(response)
            let prd = response.data
            prd.photos = JSON.parse(prd.photos)
            prd.variants = JSON.parse(prd.variants)
            prd.varvalues = JSON.parse(prd.varvalues)
            setRowsP((lol) => [...lol, prd])
            setOpen(false)
            toast.info("Товар добавлен")
        })
    }
    const loadComponent = <Box sx={[{width: '150px'},
        {
            '&:hover': {
                color: 'gray',
                cursor: 'pointer'
            }
        }]} aria-label="upload picture" component="label">
        <input onChange={(event) => {
            rawFiles.push(event.target.files[0])
            setRawFiles([...rawFiles])
            photos.push(<Box sx={{width: '150px'}}>

                <Box sx={{width: '150px'}}
                     src={URL.createObjectURL(event.target.files[0])}
                     component={'img'}>

                </Box>

            </Box>)
            setPhotos([...photos])

        }
        } hidden accept="image/*" multiple type="file"/>

        <AddPhotoAlternateOutlinedIcon sx={{
            width: '100%',
            height: '100%'
        }}> </AddPhotoAlternateOutlinedIcon></Box>
    const columnsP = [
        {
            field: 'photo',
            headerName: 'Фото',
            renderCell: (props) => <RenderProductPhoto {...props}/>,
            width: 100
        }, {
            field: 'barcode',
            headerName: 'Артикул',
            renderCell: (props) => <RenderProductBarcode {...props}/>,
            width: 100
        },
        {
            field: 'name',
            headerName: 'Название',
            renderCell: (props) => <RenderProductName {...props}/>,
            width: 180
        },
        {
            field: 'category',
            headerName: 'Категория',
            renderCell: (props) => <RenderProductCategory {...props}/>,
            width: 120
        },
        {
            field: 'buyAmount',
            headerName: 'Закупочная цена',
            renderCell: (props) => <RenderProductSellAmount {...props}/>,
            width: 120
        }, {
            field: 'sellAmount',
            headerName: 'Цена продажи',
            renderCell: (props) => <RenderProductBuyAmount {...props}/>,
            width: 120
        },
        {
            field: 'actions',
            headerName: 'Действие',
            renderCell: (props) => <RenderActionsCol {...props}/>,
            width: 250
        },
    ]
    const columns = [

        {
            field: 'size',
            headerName: 'Размер',
            renderCell: (props) => <RenderSize {...props}/>,
            flex: 5
        },
        {
            field: 'color',
            headerName: 'Цвет',
            renderCell: (props) => <RenderColor {...props}/>,

            flex: 5

        },
        {
            field: 'count',
            headerName: 'Кол-во',
            renderCell: (props) => <RenderCount {...props}/>,

            flex: 5

        },
        {
            field: 'actions',
            headerName: 'Действие',
            renderCell: (props) => <RenderActions {...props}/>,
            flex: 2
        },
        {
            field: 'add',
            headerName: '',
            flex: 0,
            sortable: false,
            renderHeader: () => {
                return (
                    <><IconButton
                        onClick={() => {
                            addProduct();
                            console.log(products)
                        }}>
                        <AddIcon/>
                    </IconButton>
                    </>

                );
            }
        },

    ];
    useEffect(() => {
        //   loadProducts();
    }, [])


    const Variant = (props) => {
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };

        let [options, setOptions] = useState([{
            id: 1, title: 'Зелений'
        }])

        return <div>

        </div>


    }
    const RenderProductPhoto = (props) => {
        return (
            <>
                <Box sx={{height: '90px'}} component={'img'} src={props.row.photos[0]}/>

            </>
        );
    };
    const RenderProductName = (props) => {
        return (
            <>
                <Typography>{props.row.name}</Typography>
            </>
        );
    };
    const RenderProductCategory = (props) => {
        //console.log(categories.filter(kkk => kkk.category == props.row.category.id))
        return (
            <>
                <Typography>{categories.filter(kkk => kkk.category == props.row.category.id)[0].name}</Typography>
            </>
        );
    };
    const RenderProductBarcode = (props) => {
        return (
            <>
                <Typography>{props.row.barcode}</Typography>
            </>
        );
    };
    const RenderProductSellAmount = (props) => {
        return (
            <>
                <Typography>{formatMoney(props.row.sellAmount)} ₴</Typography>
            </>
        );
    };
    const RenderProductBuyAmount = (props) => {
        return (
            <>
                <Typography>{formatMoney(props.row.buyAmount)} ₴</Typography>
            </>
        );
    };
    const RenderSize = (props) => {
        return (
            <>
                <Select sx={{width: '100%'}} value={props.row.size} onChange={(event) => {
                    props.row.size = event.target.value
                    setProducts([...products])
                }} size={'small'}>
                    {sizes.map(function (key, value) {
                        return <MenuItem key={value} value={key}>{key}</MenuItem>
                    })}
                </Select>
            </>
        );
    };
    const RenderColor = (props) => {
        return (
            <>
                <Select sx={{width: '100%'}} value={props.row.color} onChange={(event) => {
                    props.row.color = event.target.value
                    setProducts([...products])
                }} size={'small'}>
                    {colors.map(function (key, value) {
                        return <MenuItem key={value} value={key}>{key}</MenuItem>
                    })}
                </Select>
            </>
        );
    };
    const RenderCount = (props) => {

        return (
            <>
                <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button onClick={(event) => {
                        if (props.row.count > 1) {
                            props.row.count = props.row.count - 1
                            setProducts([...products])
                        }
                    }}>-</Button>
                    <Button disabled>{props.row.count}</Button>
                    <Button onClick={(event) => {
                        props.row.count = props.row.count + 1
                        setProducts([...products])

                    }}>+</Button>

                </ButtonGroup>
            </>
        );
    };
    const RenderActionsCol = (props) => {
        return (
            <>
                {props.row.id < 0 ? <Skeleton sx={{width: '150px'}}></Skeleton> : <Typography>

                    <GridActionsCellItem onClick={() => {


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
                                url: 'products',
                                data: {
                                    id: props.row.id
                                }
                            }).then(response => {
                                console.log(response.data)
                                setRowsP((prev) => prev.filter(lff => lff.id !== props.row.id))
                                toast.info('Товар удален')
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
    const RenderActions = (props) => {
        return (
            <>
                {props.row.id < 0 ? <Skeleton sx={{width: '150px'}}></Skeleton> : <Typography>

                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
                        label="Cancel"
                        className="textPrimary"
                        onClick={(event) => {
                            setProducts([...products.filter(kkk => kkk.id !== props.row.id)])
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

    const loadCategories = () => {
        network.api({
            method: 'get',
            url: 'categories/'
        }).then(response => {
            categories = response.data
            setCategories([...categories])
            loadProducts();
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

                    '& .MuiDrawer-paper': {width: {xs: '100%', sm: '100%'}},
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
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Typography sx={{fontSize: '18px'}}>Добавить товар</Typography>
                            <IconButton onClick={(event) => {
                                setOpen(false)
                            }
                            }><CloseOutlinedIcon/></IconButton>

                        </Box>
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
                    <Box sx={{display: 'flex', gap: '20px', alignItems: 'flex-start', flexDirection: 'column'}}>

                        {/*<Box sx={{width: '90px', height: '90px',}}>*/}
                        {/*    {file !== null ? */}
                        {/*        <input onChange={handleLoadImage} hidden accept="image/*" multiple type="file"/>*/}

                        {/*    </IconButton> : <><IconButton aria-label="upload picture" component="label">*/}
                        {/*        <input onChange={handleLoadImage} hidden accept="image/*" multiple type="file"/>*/}

                        {/*        <AddPhotoAlternateOutlinedIcon sx={{*/}
                        {/*            width: '100%',*/}
                        {/*            height: '100%'*/}
                        {/*        }}> </AddPhotoAlternateOutlinedIcon></IconButton></>*/}
                        {/*    }*/}


                        {/*</Box>*/}
                        <Box sx={{display: 'flex', width: '100%'}}>
                            <Carousel autoPlay={false} navButtonsAlwaysVisible={true}
                                      sx={{height: 250, width: '500px'}}>


                                {(() => {
                                    let array = []
                                    photos.map(function (key, value) {
                                        array.push(<Box key={value + 1} sx={{
                                            width: '100%',
                                            height: '200px',
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}>
                                            {key}
                                        </Box>)
                                    })
                                    array.push(<Box index={0} sx={{
                                        width: '100%',
                                        height: '200px',
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}>
                                        {loadComponent}
                                    </Box>)
                                    return array
                                })()}


                            </Carousel>
                            <Box sx={{width: '100%'}}>
                                <Box sx={{display: 'flex', gap: '10px', marginBottom: '15px'}}>
                                    <Typography>Название</Typography>
                                    <Divider sx={{width: '90%'}}/>
                                </Box>

                                <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', gap: '20px'}}>

                                    <TextField value={categoryName} onChange={(event) => {
                                        setCategoryName(event.target.value)
                                    }} sx={{width: '100%'}} size={'small'} label={'Название'}/>
                                    <Box sx={{display: 'flex', gap: '20px'}}>

                                        <FormControl size={'small'} fullWidth>
                                            <TextField value={barcode} onChange={(event) => {
                                                setBarcode(event.target.value)
                                            }} sx={{width: '100%'}} size={'small'} label={'Акртикул'}/>
                                        </FormControl>
                                        <FormControl size={'small'} fullWidth>
                                            <InputLabel id="demo-simple-select-label">Категория</InputLabel>
                                            <Select
                                                size={'small'}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={selectedCategory}
                                                label="Категория"
                                                onChange={(event) => {
                                                    selectedCategory = event.target.value
                                                    setSelectedCategory(selectedCategory)
                                                }}
                                            >
                                                {categories.map(function (key, value) {
                                                    return <MenuItem key={value} value={key.id}>
                                                        {key.name}
                                                    </MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Box>

                                </Box>

                                <Box sx={{width: '100%'}}>
                                    <Box sx={{display: 'flex', gap: '10px', marginBottom: '15px', marginTop: '20px'}}>
                                        <Typography>Цена</Typography>
                                        <Divider sx={{width: '94.3%'}}/>
                                    </Box>
                                    <Box sx={{display: 'flex', gap: '20px'}}>
                                        <TextField value={buyAmount} onChange={(event) => {
                                            setBuyAmount(event.target.value)
                                        }} label={'Закупочная стоимось'} size={'small'}
                                                   sx={{width: '50%'}}></TextField>
                                        <TextField value={sellAmount} onChange={(event) => {
                                            setSellAmount(event.target.value)
                                        }} label={'Стоимость'} size={'small'} sx={{width: '50%'}}></TextField>
                                    </Box>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>

                                        <FormGroup>
                                            <FormControlLabel control={<Switch onChange={(event) => {
                                                setVariant(event.target.checked)
                                            }} checked={variant}/>} label="Товар имееет несколько вариантов"/>
                                        </FormGroup>
                                        <Button onClick={() => {
                                            createProduct();
                                        }} variant={'contained'}>Создать</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>


                    </Box>
                    {variant ? <>
                        <Box sx={{display: 'flex', width: '100%', gap: '15px'}}>
                            <Typography>Варианты</Typography>
                            <Divider sx={{width: '93%'}}/>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px'}}>
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>

                                <Box sx={{display: 'flex', gap: '20px'}}>
                                    <TextField value={'Размер'} size={'small'} disabled></TextField>
                                    <Box sx={{width: '600px'}}><Tags onChange={(event, values) => {
                                        setSizes([...values])
                                    }}/></Box>
                                </Box>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px'}}>
                                <Box sx={{display: 'flex', gap: '20px'}}>
                                    <TextField value={'Цвета'} size={'small'} disabled></TextField>
                                    <Box sx={{width: '600px'}}><Tags onChange={(event, values) => {
                                        setColors([...values])

                                    }}/></Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{display: 'flex', width: '100%', gap: '15px'}}>
                            <Typography>Товары</Typography>
                            <Divider sx={{width: '93%'}}/>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Typography sx={{marginTop: '15px'}}>Тотал: {(() => {
                                let amount = 0;
                                //   console.log(products)
                                products.map(function (key, value) {
                                    console.log(key)
                                    amount += key.count * buyAmount;
                                })
                                return formatMoney(amount);
                            })()} грн.</Typography>
                        </Box>
                        <Box sx={{height: '500px'}}>
                            <DataGrid
                                disableColumnMenu
                                components={{
                                    NoRowsOverlay: CustomNoRowsOverlay,
                                }}
                                disableColumnFilter={true}
                                columns={columns}
                                rows={products}
                                sx={{border: 'none', height: '80vh', width: '100%'}}
                                pageSize={10}

                                rowsPerPageOptions={[5]}
                                disableColumnSelector
                                disableSelectionOnClick
                                disableRestoreFocus
                            />
                        </Box>
                    </> : ''}
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
                        }}>Товары</Typography>
                        <Button onClick={() => {
                            setOpen(true)
                        }
                        } variant={'contained'}>
                            Добавить товар
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
                            columns={columnsP}
                            rows={rowsP}
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