import React, {useCallback, useState} from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, createStyles } from '@material-ui/core/styles';
import {push} from "connected-react-router";
import {useDispatch} from "react-redux";
import {signOut} from "../../reducks/currentUser/operations";
import {TextInput} from "../UIkit";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import EmailIcon from '@material-ui/icons/Email';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PaymentIcon from '@material-ui/icons/Payment';
import CreateIcon from '@material-ui/icons/Create';
import TextsmsIcon from '@material-ui/icons/Textsms';
import GroupIcon from '@material-ui/icons/Group';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import PanToolIcon from '@material-ui/icons/PanTool';
import MoreIcon from '@material-ui/icons/More';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SelectAllIcon from '@material-ui/icons/SelectAll';

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

    const selectMenu = (event, path) => {
        dispatch(push(path));
        props.onClose(event, false);
    };

    const [searchKeyword, setSearchKeyword] = useState("")    
    const menus = [
                {func: selectMenu, label: "テンプレート一覧", icon: <SelectAllIcon />, id: "テンプレート一覧", value: "/posts/list"},
                {func: selectMenu, label: "問合せ・見積り",    icon: <EmailIcon/>, id: "問合せ・見積り", value: "/posts/list/?category=1"},
                {func: selectMenu, label: "注文・受領",    icon: <LocalShippingIcon/>,   id: "注文・受領",  value: "/posts/list/?category=2"},
                {func: selectMenu, label: "支払い", icon: <PaymentIcon/>,    id: "支払い",  value: "/posts/list/?category=3"},
                {func: selectMenu, label: "契約",    icon: <CreateIcon/>, id: "契約", value: "/posts/list/?category=4"},
                {func: selectMenu, label: "依頼・申請",    icon: <TextsmsIcon/>,   id: "依頼・申請",  value: "/posts/list/?category=5"},
                {func: selectMenu, label: "会議・イベント", icon: <GroupIcon/>,    id: "会議・イベント",  value: "/posts/list/?category=6"},
                {func: selectMenu, label: "アポイントメント",    icon: <ScheduleIcon/>, id: "アポイントメント", value: "/posts/list/?category=7"},
                {func: selectMenu, label: "出張",    icon: <FlightTakeoffIcon/>,   id: "出張",  value: "/posts/list/?category=8"},
                {func: selectMenu, label: "クレーム", icon: <HeadsetMicIcon/>,    id: "クレーム",  value: "/posts/list/?category=9"},
                {func: selectMenu, label: "案内・通知",    icon: <InsertInvitationIcon/>, id: "案内・通知", value: "/posts/list/?category=10"},
                {func: selectMenu, label: "社外の挨拶",    icon: <PanToolIcon/>,   id: "社外の挨拶",  value: "/posts/list/?category=11"},
                {func: selectMenu, label: "その他", icon: <MoreIcon/>,    id: "その他",  value: "/posts/list/?category=12"},
        ];

    const inputSearchKeyword = useCallback((event) => {
        setSearchKeyword(event.target.value)
    }, [setSearchKeyword])

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
                    <div className={classes.searchField}>
                        <TextInput
                            fullWidth={false} label={"キーワードを入力"} multiline={false}
                            onChange={inputSearchKeyword} required={false} rows={1} value={searchKeyword} type={"text"}
                        />
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {menus.map(menu => (
                                <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                                    <ListItemIcon>
                                        {menu.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={menu.label} />
                                </ListItem>
                            )
                        )}
                        <ListItem button key="logout" onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <ExitToAppIcon/>
                            </ListItemIcon>
                            <ListItemText primary="ログアウト" />
                        </ListItem>
                    </List>
                    <Divider />
                </div>
            </Drawer>
        </nav>
    );
}

export default TemporaryDrawer;