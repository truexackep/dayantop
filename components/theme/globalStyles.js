const GlobalStyles = theme => {
  return {
    '& .apexcharts-legend': {
      textAlign: 'center',
      justifyContent: 'center !important'
    },
    '.row': {
      background: theme.palette.mode == 'light' ? 'rgba(2,2,2,0.03)' : '#363636!important'
    },
    '& .apexcharts-legend-series': {
      margin: `${theme.spacing(0.75, 2)} !important`,
      '& .apexcharts-legend-text': {
        marginLeft: theme.spacing(0.75),
        color: `${theme.palette.text.primary} !important`
      }
    },
    '.menu-icon *': {
      stroke: theme.palette.mode === 'light' ? 'black' : 'white'
    },
    '.default': {
      color: theme.palette.mode == 'light' ? 'rgba(2,2,2,0.03)' : 'white !important'

    },
   
    '.card': {
      background: theme.palette.mode === 'light' ? '#FFF' : '#292929 !important'
    },
    '.ps__rail-y': {
      zIndex: 1,
      right: '0 !important',
      left: 'auto !important',
      '&:hover, &:focus, &.ps--clicking': {
        backgroundColor: theme.palette.mode === 'light' ? '#E4E5EB !important' : '#423D5D !important'
      },
      '& .ps__thumb-y': {
        right: '3px !important',
        left: 'auto !important',
        backgroundColor: theme.palette.mode === 'light' ? '#C2C4D1 !important' : '#504B6D !important'
      },
      '.layout-vertical-nav &': {
        '& .ps__thumb-y': {
          width: 4,
          backgroundColor: theme.palette.mode === 'light' ? '#C2C4D1 !important' : '#504B6D !important'
        },
        '&:hover, &:focus, &.ps--clicking': {
          backgroundColor: 'transparent !important',
          '& .ps__thumb-y': {
            width: 6
          }
        }
      }
    },
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        left: 0,
        top: 0,
        height: 3,
        width: '100%',
        zIndex: 2000,
        position: 'fixed',
        backgroundColor: theme.palette.primary.main
      }
    }
  }
}

export default GlobalStyles
