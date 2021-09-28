import React from 'react';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

const useStyles = makeStyles ({
    icon: {
        height: 48,
        width: 48
    }
});

const ImageUpload = (props) => {
    const classes = useStyles();

    return (
        <div className="u-text-right">
            <span>プロフィール画像を設定する</span>
            <IconButton className={classes.icon}>
                <label>
                    <AddPhotoAlternateIcon />
                    <input className="u-display-none" type="file" id="image" 
                           accept="image/jpeg, image/png, image/jpg, image/gif"
                           onChange={props.onChange}
                    />
                </label>
            </IconButton>
        </div>
    );
};

export default ImageUpload;