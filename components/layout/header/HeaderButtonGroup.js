import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useState} from "react";


export const HeaderButtonGroup = (props) => {
    let [buttons, setButtons] = useState(props.buttons)
    let [selected, setSelected] = useState(props.selected)
    return <Box style={{display: 'flex', gap: '20px', width: '100%', justifyContent: 'center'}}>
        {buttons.map(function (button, val) {
            return <Button key={val} onClick={(event) => {
                selected = button.value
                setSelected(selected)
                props.onChange(selected)
            }
            } variant={selected == button.value ? 'contained' : 'outlined'} color="warning" className={'button-warning'}>
                <Typography className={'button-label'} variant="button" display="block" sx={{padding: '0px'}}>
                    {button.label}
                </Typography>
            </Button>
        })}
    </Box>
}
