import React from "react";
import {TextField} from "@mui/material";
import {makeStyles} from "@mui/material/styles";
import {Autocomplete} from "@mui/lab";
import Chip from "@mui/material/Chip";


export default function Tags(props) {


    const handleChange = (x, emails) => console.log(x, emails);

    return (
        <div>
            <Autocomplete
                size={'small'}
                multiple
                id="tags-filled"

                onChange={props.onChange}
                options={[]}
                defaultValue={""}
                freeSolo
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip key={index} size={'small'} label={option} {...getTagProps({ index })} />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        size={'small'}
                        {...params}
                        variant="outlined"
                        label="Значения"
                        placeholder="Добавить значение"
                    />
                )}
            />
        </div>
    );
}