import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, createStyles } from '@material-ui/core/styles';
import {useDispatch} from "react-redux";
import {signOut} from 'reducks/currentUser/operations';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import ShareIcon from '@mui/icons-material/Share';
import HelpIcon from '@mui/icons-material/Help';
import { push } from 'connected-react-router';

const useStyles = makeStyles((theme) =>
    createStyles({
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: 256,
                flexShrink: 0,
            }
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: 256,
        },
        searchField: {
            alignItems: 'center',
            display: 'flex',
            marginLeft: 32
        }
    }),
);

const TemporaryDrawer = (props) => {
    const { container } = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant="temporary"
                anchor={"right"}
                open={props.open}
                onClose={(e) => props.onClose(e, false)}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <div
                    onClose={(e) => props.onClose(e, false)}
                    onKeyDown={(e) => props.onClose(e, false)}
                >
                    <Divider />
                        <ListItem button key="howToUse" onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <HelpIcon/>
                            </ListItemIcon>
                            <ListItemText primary="How to use ?" />
                        </ListItem>
                        <ListItem button key="share" onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <ShareIcon/>
                            </ListItemIcon>
                            <ListItemText primary="SNSでシェアする" />
                        </ListItem>
                        <ListItem button key="signin" onClick={() => dispatch(push('/signin'))}>
                            <ListItemIcon>
                                <LoginIcon/>
                            </ListItemIcon>
                            <ListItemText primary="ログイン" />
                        </ListItem>
                        <ListItem button key="logout" onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <ExitToAppIcon/>
                            </ListItemIcon>
                            <ListItemText primary="ログアウト" />
                        </ListItem>
                    <Divider />
                </div>
            </Drawer>
        </nav>
    );
}

export default TemporaryDrawer;