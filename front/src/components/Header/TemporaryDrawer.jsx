import React, {useCallback, useEffect, useState} from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, createStyles } from '@material-ui/core/styles';
import {push} from "connected-react-router";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../reducks/users/operations";
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
import {db} from "../../firebase";
import {getUserRole} from "../../reducks/users/selectors";

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
    const selector = useSelector(state  => state);
    const userRole = getUserRole(selector);
    const isAdministrator = (userRole === "administrator");

    const selectMenu = (event, path) => {
        dispatch(push(path));
        props.onClose(event, false);
    };

    const [searchKeyword, setSearchKeyword] = useState(""),
          [filters, setFilters] = useState([
                {func: selectMenu, label: "問合せ・見積り",  id: "問合せ・見積り", value: "/product/edit"},
                {func: selectMenu, label: "注文・受領",  id: "注文・受領",  value: "/order/history"},
                {func: selectMenu, label: "支払い",  id: "支払い",  value: "/user/mypage"},
                {func: selectMenu, label: "契約",  id: "契約", value: "/product/edit"},
                {func: selectMenu, label: "依頼・申請",  id: "依頼・申請",  value: "/order/history"},
                {func: selectMenu, label: "会議・イベント",  id: "会議・イベント",  value: "/user/mypage"},
                {func: selectMenu, label: "アポイントメント",  id: "アポイントメント", value: "/product/edit"},
                {func: selectMenu, label: "出張",  id: "出張",  value: "/order/history"},
                {func: selectMenu, label: "クレーム",  id: "クレーム",  value: "/user/mypage"},
                {func: selectMenu, label: "案内・通知",  id: "案内・通知", value: "/product/edit"},
                {func: selectMenu, label: "社外の挨拶",  id: "社外の挨拶",  value: "/order/history"},
                {func: selectMenu, label: "その他",  id: "その他",  value: "/user/mypage"},
          ]);
    
    const menus = [
                {func: selectMenu, label: "問合せ・見積り",    icon: <EmailIcon/>, id: "register", value: "/product/edit"},
                {func: selectMenu, label: "注文・受領",    icon: <LocalShippingIcon/>,   id: "history",  value: "/order/history"},
                {func: selectMenu, label: "支払い", icon: <PaymentIcon/>,    id: "profile",  value: "/user/mypage"},
                {func: selectMenu, label: "契約",    icon: <CreateIcon/>, id: "register", value: "/product/edit"},
                {func: selectMenu, label: "依頼・申請",    icon: <TextsmsIcon/>,   id: "history",  value: "/order/history"},
                {func: selectMenu, label: "会議・イベント", icon: <GroupIcon/>,    id: "profile",  value: "/user/mypage"},
                {func: selectMenu, label: "アポイントメント",    icon: <ScheduleIcon/>, id: "register", value: "/product/edit"},
                {func: selectMenu, label: "出張",    icon: <FlightTakeoffIcon/>,   id: "history",  value: "/order/history"},
                {func: selectMenu, label: "クレーム", icon: <HeadsetMicIcon/>,    id: "profile",  value: "/user/mypage"},
                {func: selectMenu, label: "案内・通知",    icon: <InsertInvitationIcon/>, id: "register", value: "/product/edit"},
                {func: selectMenu, label: "社外の挨拶",    icon: <PanToolIcon/>,   id: "history",  value: "/order/history"},
                {func: selectMenu, label: "その他", icon: <MoreIcon/>,    id: "profile",  value: "/user/mypage"},
        ];

    useEffect(() => {
        db.collection('categories').orderBy("order", "asc").get()
            .then(snapshots => {
                const list = []
                snapshots.forEach(snapshot => {
                    const category = snapshot.data()
                    list.push({func: selectMenu, label: category.name, id: category.id, value: `/?category=${category.id}`})
                })
                setFilters(prevState => [...prevState, ...list])
            });
    },[])

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
                            ((isAdministrator && menu.id === "register") || menu.id !== "register") && (
                                <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                                    <ListItemIcon>
                                        {menu.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={menu.label} />
                                </ListItem>
                            )
                        ))}
                        <ListItem button key="logout" onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <ExitToAppIcon/>
                            </ListItemIcon>
                            <ListItemText primary="ログアウト" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {filters.map(filter => (
                            <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                                <ListItemText primary={filter.label} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </nav>
    );
}

export default TemporaryDrawer;