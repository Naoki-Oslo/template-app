import React from 'react';
import TextField from "@material-ui/core/TextField";

const TextInput = (props) => {
    return (
        <TextField 
            fullWidth={props.fullWidth}
            label={props.label}
            margin="dense"
            className={props.className}
            placeholder={props.placeholder}
            multiline={props.multiline}
            required={props.required}
            rows={props.rows}
            value={props.value}
            type={props.type}
            onChange={props.onChange}
        />
    )
};

export default TextInput;