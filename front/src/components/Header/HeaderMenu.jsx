import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from "@material-ui/core/IconButton";
import { Badge } from "@material-ui/core";
import { push } from "connected-react-router"
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { getUserId } from 'reducks/currentUser/selectors';

const HeaderMenu = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const userId = getUserId(selector);

    return (
        <>  
            <IconButton onClick={() => dispatch(push('/users/' + String(userId)))}>
                <AccountCircleIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(push('/'))}>
                <Badge badgeContent={1} color="secondary">
                    <NotificationsNoneIcon />
                </Badge>
            </IconButton>
            <IconButton  onClick={() => dispatch(push('/posts/new'))}>
                <NoteAddIcon />
            </IconButton>
            <IconButton
                aria-label="Menu Items"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => props.handleDrawerToggle(e, true)}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
        </>
    );
};

export default HeaderMenu;