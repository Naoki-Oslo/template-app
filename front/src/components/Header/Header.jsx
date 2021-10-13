import React, {useCallback, useState} from 'react';
import {createStyles, makeStyles}     from '@material-ui/core/styles';
import AppBar                         from '@material-ui/core/AppBar';
import Toolbar                        from '@material-ui/core/Toolbar';
import {useDispatch}                  from "react-redux";
import logo                           from "assets/img/icons/logo.png";
import {HeaderMenu, TemporaryDrawer}   from "./index";
import {push}                         from "connected-react-router"

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuBar: {
            backgroundColor: "#fff",
            color: '#444',
        },
        toolbar: {
            margin: '0 auto',
            maxWidth: 1024,
            width: '100%'
        },
        iconButtons: {
            margin: '0 0 0 auto'
        }
    }),
);

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [sideBarOpen, setSideBarOpen] = useState(false);

    const handleDrawerToggle = useCallback((event, isOpen) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setSideBarOpen(isOpen)
    }, [setSideBarOpen]);

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar className={classes.toolbar}>
                    <img alt="Logo" src={logo} width="128px" onClick={() => dispatch(push('/'))} role="button" />
                    <div className={classes.iconButtons}>
                        <HeaderMenu handleDrawerToggle={handleDrawerToggle} />
                    </div>
                </Toolbar>
            </AppBar>
            <TemporaryDrawer open={sideBarOpen} onClose={handleDrawerToggle} />
        </div>
    );
}

export default Header;