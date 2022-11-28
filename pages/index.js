import Head from 'next/head'
import VerticalLayout from "../components/layout/vertical/VerticalLayout";
import {CardContent, CircularProgress, Grid, useMediaQuery} from "@mui/material";
import {DashboardIcon} from "../components/icons/DashboardIcon";
import {DashboardCompanyIcon} from "../components/icons/Dashboard-company";
import Card from '@mui/material/Card'
import { Doughnut } from 'react-chartjs-2';

import CardHeader from '@mui/material/CardHeader'
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import ReactApexcharts from "../components/charts/ReactApexcharts";
import {useTheme} from "@mui/material/styles";
import {Stats} from "../components/icons/Stats";
import {Users} from "../components/icons/Users";
import {Expense} from "../components/icons/Expense";
import {Offers} from "../components/icons/Offers";
import {Cards} from "../components/icons/Cards";
import {Finances} from "../components/icons/Finances";
import {OrderForm} from "../components/icons/OrderForm";
import {OrderList} from "../components/icons/OrderList";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import * as React from "react";
import {useEffect} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {HeaderButtonGroup} from "../components/layout/header/HeaderButtonGroup";


export default function Home(props) {
    const hidden = useMediaQuery((theme) => theme.breakpoints.down('lg'), {noSsr: true})
    const theme = useTheme()
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Chart.js Bar Chart',
            },
        },
        animation: {
            onComplete: function(animation) {
            console.log(animation)
            }
        }
    };
    const data = {
        labels: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
        datasets: [{
            label: 'Расход',
            data: [],
            backgroundColor: [
                'rgba(252,0,0,0.34)',
                'rgba(252,0,0,0.34)',
                'rgba(252,0,0,0.34)',
                'rgba(252,0,0,0.34)',
                'rgba(252,0,0,0.34)',
                'rgba(252,0,0,0.34)',
                'rgba(252,0,0,0.34)',


            ],
            borderColor: [
                'rgb(252,0,49)',
                'rgb(252,0,49)',
                'rgb(252,0,49)',
                'rgb(252,0,49)',
                'rgb(252,0,49)',
                'rgb(252,0,49)',
                'rgb(252,0,49)',
            ],
            borderWidth: 3,
            fill: false
        },
            {
                label: 'Приход',
                data: [],
                backgroundColor: [
                    'rgba(35,70,252,0.35)',
                    'rgba(35,70,252,0.35)',
                    'rgba(35,70,252,0.35)',
                    'rgba(35,70,252,0.35)',
                    'rgba(35,70,252,0.35)',
                    'rgba(35,70,252,0.35)',
                    'rgba(35,70,252,0.35)',


                ],
                borderColor: [
                    'rgb(99,154,255)',
                    'rgb(99,154,255)',
                    'rgb(99,154,255)',
                    'rgb(99,154,255)',
                    'rgb(99,154,255)',
                    'rgb(99,154,255)',
                    'rgb(99,154,255)',
                    'rgb(99,154,255)',

                ],
                borderWidth: 3,
                fill: false
            },
            {
                label: 'Профит',
                data: [],
                backgroundColor: [
                    '#225820',
                    '#225820',
                    '#225820',
                    '#225820',
                    '#225820',
                    '#225820',
                    '#225820',






                ],
                borderColor: [
                    'rgb(18,255,0)',
                    'rgb(18,255,0)',
                    'rgb(18,255,0)',
                    'rgb(18,255,0)',
                    'rgb(18,255,0)',
                    'rgb(18,255,0)',

                ],
                borderWidth: 3,
                fill: false
            }]
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        ArcElement
    );
    const doughnutChart = {
            labels: ["Расход", "Профит"],
            datasets: [
                {
                    label: "Средний показатель ROI",
                    backgroundColor: [
                        'rgba(252,0,0,0.34)',
                        'rgba(9,255,0,0.22)',

                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)'
                    ],
                    borderDash: [5, 5],
                    borderDashOffset: 2,
                    borderWidth: 3.5,
                    borderColor: [
                        'rgb(252,0,49)',
                        'rgb(18,255,0)',


                        'rgb(64,64,64)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    data: [30, 40],
                }
            ]

    };

    const {settings, saveSettings} = props
    useEffect(() => {
        settings.headerContent = <HeaderButtonGroup onChange={(event) => {
            console.log(event)
        }
        } buttons={[{label: 'Сегодня', value: 'today'}, {label: 'Вчера', value: 'yesterday'}, {label: 'Месяц', value: 'month'}, {label: 'Выбрать', value: 'select'},
        ]} selected={'today'}/>
        saveSettings({...settings})
    }, [])
    return (
    <>
        <Head>
            <title>Дашборд</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

            <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
        </Head>


            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 3, md: 8 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                   <Grid  item xs={2} sm={4} md={4}>
                       <div className={'card1 red'}>
                           <div className={'card-body'}>
                               <p style={{fontSize: '27px', fontWeight: '600'}}>РАСХОД</p>
                               <p style={{fontSize: '27px', fontWeight: '600'}}>0.00 $</p>
                           </div>
                       </div>
                   </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <div className={'card1 blue'}>
                            <div className={'card-body'}>
                                <p style={{fontSize: '27px', fontWeight: '600'}}>РАСХОД</p>
                                <p style={{fontSize: '27px', fontWeight: '600'}}>0.00 $</p>
                            </div>
                        </div>
                        {/*<Card className={'blue card card-stats '}>*/}
                        {/*    <CardHeader*/}
                        {/*        style={{*/}
                        {/*            padding: '0px!important',*/}
                        {/*            height: '30px !important',*/}
                        {/*            fontWeight: '600 !important'*/}
                        {/*        }}*/}
                        {/*        title={<p style={{fontSize: '1.625rem !important', fontWeight: '500 !important'}}>ПРИХОД</p>}*/}

                        {/*        titleTypographyProps={{*/}
                        {/*            sx: {*/}
                        {/*                mb: 2.5,*/}
                        {/*                lineHeight: '2rem !important',*/}
                        {/*                letterSpacing: '0.15px !important'*/}
                        {/*            }*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*    <CardContent   style={{*/}
                        {/*        padding: '0px !important'*/}
                        {/*    }} sx={{ pt: theme => `${theme.spacing(3)} !important` }}>*/}

                        {/*        <span style={{fontSize: '33px !important', fontWeight: '500 !important'}}>0.00 $</span>*/}
                        {/*    </CardContent>*/}
                        {/*</Card>*/}


                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <div className={'card1 green'}>
                            <div className={'card-body'}>
                                <p style={{fontSize: '27px', fontWeight: '600'}}>РАСХОД</p>
                                <p style={{fontSize: '27px', fontWeight: '600'}}>0.00 $</p>
                            </div>
                        </div>

                    </Grid>
                </Grid>

            </Box>
        <Box style={{marginTop: '20px'}}>
            <Card className={'card'}>
                <CardHeader

                    title={'ALL TEAM'}
                    style={{paddingBottom: '0px'}}
                    titleTypographyProps={{
                        sx: {
                            mb: 2.5,
                            lineHeight: '2rem !important',
                            letterSpacing: '0.15px !important'
                        }
                    }}
                />
                <CardContent   style={{

                }} sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={'kok'} width={'70px'}></TableCell>
                                    <TableCell className={'kok'} width={'80px'} align="right">Пролив</TableCell>
                                    <TableCell className={'kok'} align="right">Эквайринг</TableCell>
                                    <TableCell className={'kok'} align="right">Карты</TableCell>
                                    <TableCell className={'kok'} align="right">Акки</TableCell>
                                    <TableCell className={'kok'} align="right">Прилки</TableCell>
                                    <TableCell className={'kok'} align="right">Dolphin</TableCell>
                                    <TableCell className={'kok'} align="right">Расход</TableCell>
                                    <TableCell className={'kok'} align="right">Приход</TableCell>
                                    <TableCell className={'kok'} align="right">Профит</TableCell>
                                    <TableCell className={'kok'} align="right">ROI %</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow
                                    className={'row'}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px'}} className={'cell default'} component="th" scope="row">
                                        TOTAL
                                    </TableCell>
                                    <TableCell className={'cell orange'} align="right">0.00 $</TableCell>
                                    <TableCell className={'cell default'} align="right">0.00 $</TableCell>
                                    <TableCell className={'cell darkorange'} align="right">0.00 $</TableCell>
                                    <TableCell className={'cell whitepink'} align="right">0.00 $</TableCell>
                                    <TableCell className={'cell whitered'} align="right">0.00 $</TableCell>
                                    <TableCell className={'cell whiteblue'} align="right">0.00 $</TableCell>
                                    <TableCell className={'cell whitepinkred'} align="right">0.00 $</TableCell>
                                    <TableCell className={'cell wt-blue'} align="right">0.00 $</TableCell>
                                    <TableCell className={'cell wt-green'} align="right">0.00 $</TableCell>
                                    <TableCell sx={{borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}} className={'cell default'} align="right">100 %</TableCell>

                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                </CardContent>
            </Card>
        </Box>
        <Box style={{marginTop: '20px'}}>
            <Grid container spacing={5} columns={{ xs: 1, sm: 2, md: 6,}}>
                <Grid item xs={2} sm={2} md={4} >

                    <Card className={'card adaptive'}>
                        <CardHeader

                            title={'Профит по дням'}
                            style={{paddingBottom: '0px'}}
                            titleTypographyProps={{
                                sx: {
                                    mb: 2.5,
                                    lineHeight: '2rem !important',
                                    letterSpacing: '0.15px !important'
                                }
                            }}
                        />
                        <CardContent   style={{
                            display: 'flex', justifyContent: 'center'
                        }} sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
                            <Bar  onProgress={(event) => {
                                console.log(event)
                            }} options={options} data={data} />
                            {/*<CircularProgress />*/}
                            {/*<CircularProgress  />*/}



                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={1} sm={2} md={2}>

                    <Card sx={{height: '470px'}} className={'card'}>


                        <CardHeader

                            title={<p style={{fontSize: '17px', margin: '0'}}>Средний ROI за текущий месяц</p>}
                            style={{paddingBottom: '0px'}}
                            titleTypographyProps={{
                                sx: {
                                    mb: 2.5,
                                    lineHeight: '2rem !important',
                                    letterSpacing: '0.15px !important'
                                }
                            }}
                        />
                        <CardContent   style={{

                            justifyContent: 'center',
                            display: 'flex',
                            textAlign: 'center'
                        }} sx={{ pt: theme => `${theme.spacing(3)} !important` }}>

                            <Doughnut
                                data={doughnutChart}
                                width={100}
                                height={360}
                                options={{ maintainAspectRatio: false }}
                            />


                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>

    </>
  )
}
