import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import { Badge } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router"
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";

const HeaderMenu = (props) => {
    const dispatch = useDispatch();

    return (
        <>  
            <IconButton onClick={() => dispatch(push('/'))}>
                <HomeIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(push('/cart'))}>
                <Badge badgeContent={productsInCart.length} color="secondary">
                    <NotificationsNoneIcon />
                </Badge>
            </IconButton>
            <IconButton>
                <FavoriteBorderIcon />
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