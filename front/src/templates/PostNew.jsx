import React, { useCallback, useEffect, useState } from 'react';
import { PrimaryButton, SelectBox, TextInput } from "components/UIkit";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "reducks/posts/operations";
import { createMemo } from 'reducks/memos/operations';
import { getCategories } from 'reducks/categories/selectors';
import { fetchCategories } from 'reducks/categories/operations';
import { getUserId } from 'reducks/currentUser/selectors';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    button_row: {
        display: 'flex',
        justifyContent: 'space-around',
    },
})

const PostNew = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    const data = getCategories(selector);

    const [title, setTitle] = useState(""),
          [subject, setSubject] = useState(""),
          [category, setCategory] = useState(""),
          [categories, setCategories] = useState([]),
          [contentEnglish, setContentEnglish] = useState(""),
          [contentJapanese, setContentJapanese] = useState(""),
          [tips, setTips] = useState("");
    
    const inputTitle = useCallback((event) => {
        setTitle(event.target.value)
    }, [setTitle])

    const inputSubject = useCallback((event) => {
        setSubject(event.target.value)
    }, [setSubject])

    const inputContentEnglish = useCallback((event) => {
        setContentEnglish(event.target.value)
    }, [setContentEnglish])

    const inputContentJapanese = useCallback((event) => {
        setContentJapanese(event.target.value)
    }, [setContentJapanese])

    const inputTips = useCallback((event) => {
        setTips(event.target.value)
    }, [setTips])

    useEffect(() => {
        dispatch(fetchCategories())
        setCategories(data)
    },[])

    return (
        <div>
            <div className="c-section-container">
                <h2 className="u-text__headline u-text-center">テンプレートの作成</h2>
                <TextInput
                    fullWidth={true} label={"タイトル"} multiline={false} required={true}
                    onChange={inputTitle} rows={1} value={title} type={"text"}
                />
                <SelectBox
                    label={"カテゴリー"} options={categories} required={true} select={setCategory} value={category}
                />
                <TextInput
                    fullWidth={true} label={"件名"} multiline={false} required={true}
                    onChange={inputSubject} rows={1} value={subject} type={"text"}
                />
                <TextInput
                    fullWidth={true} label={"English(英訳)"} multiline={true} required={true}
                    onChange={inputContentEnglish} rows={8} value={contentEnglish} type={"text"}
                />
                <TextInput
                    fullWidth={true} label={"Japanese(和訳)"} multiline={true} required={true}
                    onChange={inputContentJapanese} rows={8} value={contentJapanese} type={"text"}
                />
                <TextInput
                    fullWidth={true} label={"説明/補足"} multiline={true} required={false}
                    onChange={inputTips} rows={8} value={tips} type={"text"}
                />
                <div className="module-spacer--small"/>
                <div className={classes.button_row}>
                    <PrimaryButton
                        label={"投稿する"}
                        onClick={() => dispatch(createPost( uid, title, subject, category, contentEnglish, contentJapanese, tips ))}
                    />
                    <PrimaryButton
                        label={"メモする"}
                        onClick={() => dispatch(createMemo( uid, title, subject, category, contentEnglish, contentJapanese, tips ))}
                    />
                </div>
            </div>
        </div>
    );
};

export default PostNew;