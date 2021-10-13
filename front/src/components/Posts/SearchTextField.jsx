import React, {useCallback, useState, useEffect} from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import {push} from "connected-react-router";
import {useDispatch} from "react-redux";
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
import SelectAllIcon from '@material-ui/icons/SelectAll';

const useStyles = makeStyles({
    searchField: {
        textAlign: 'center',
        display: 'flex',
        width: 500,
    }
});

const SearchTextField = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const selectMenu = (event, path) => {
        dispatch(push(path));
    };

    const [keyword, setKeyword] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);
          
    const menus = [
                {func: selectMenu, label: "テンプレート一覧", icon: <SelectAllIcon />, id: "テンプレート一覧", value: "テンプレート一覧", path: "/posts/list"},
                {func: selectMenu, label: "問合せ・見積り",    icon: <EmailIcon/>, id: "問合せ・見積り", value: "問合せ・見積り", path: "/posts/list/?category=1"},
                {func: selectMenu, label: "注文・受領",    icon: <LocalShippingIcon/>,   id: "注文・受領",  value: "注文・受領", path: "/posts/list/?category=2"},
                {func: selectMenu, label: "支払い", icon: <PaymentIcon/>,    id: "支払い",  value: "支払い", path: "/posts/list/?category=3"},
                {func: selectMenu, label: "契約",    icon: <CreateIcon/>, id: "契約", value: "契約", path: "/posts/list/?category=4"},
                {func: selectMenu, label: "依頼・申請",    icon: <TextsmsIcon/>,   id: "依頼・申請",  value: "依頼・申請", path: "/posts/list/?category=5"},
                {func: selectMenu, label: "会議・イベント", icon: <GroupIcon/>,    id: "会議・イベント",  value: "会議・イベント", path: "/posts/list/?category=6"},
                {func: selectMenu, label: "アポイントメント",    icon: <ScheduleIcon/>, id: "アポイントメント", value: "アポイントメント", path: "/posts/list/?category=7"},
                {func: selectMenu, label: "出張",    icon: <FlightTakeoffIcon/>,   id: "出張",  value: "出張", path: "/posts/list/?category=8"},
                {func: selectMenu, label: "クレーム", icon: <HeadsetMicIcon/>,    id: "クレーム",  value: "クレーム", path: "/posts/list/?category=9"},
                {func: selectMenu, label: "案内・通知",    icon: <InsertInvitationIcon/>, id: "案内・通知", value: "案内・通知", path: "/posts/list/?category=10"},
                {func: selectMenu, label: "社外の挨拶",    icon: <PanToolIcon/>,   id: "社外の挨拶",  value: "社外の挨拶", path: "/posts/list/?category=11"},
                {func: selectMenu, label: "その他", icon: <MoreIcon/>,    id: "その他",  value: "その他", path: "/posts/list/?category=12"},
        ];

    useEffect(() => {
        if(keyword === "") {
            return;
        }

        const searchKeywords = keyword
            .trim()
            .toLowerCase()
            .match(/[^\s]+/g);

        if (searchKeywords === null) {
            return;
        }

        const result = props.posts.filter((post) => 
            searchKeywords.every((kw) => post.content_en.toLowerCase().indexOf(kw) !== -1)
        );

        setFilteredPosts((result.length !== null) ? result : []);
    }, [keyword]);

    const inputKeyword = useCallback((event) => {
        setKeyword(event.target.value)
    }, [setKeyword]);

    return (
        <>
                    <div className={classes.searchField}>
                        <TextInput
                            fullWidth={true} label={"キーワードを入力"} multiline={false}
                            onChange={inputKeyword} required={false} rows={1} value={keyword} type={"text"}
                        />
                        <IconButton>
                            <SearchIcon onClick={() => props.onClick(filteredPosts)}/>
                        </IconButton>
                    </div>
                    <List style={{fontSize: 10, display: 'flex', flexFlow: 'row wrap'}}>
                        {menus.map(menu => (
                                <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.path)} style={{width: 220}}>
                                    <ListItemIcon>
                                        {menu.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={menu.label} />
                                </ListItem>
                            )
                        )}
                    </List>
                    <div className="module-spacer--extra-small" />
                    <Divider />
                    <div className="module-spacer--extra-small" />
        </>
    );
}

export default SearchTextField;