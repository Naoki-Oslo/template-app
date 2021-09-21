import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TextInput, PrimaryButton } from 'components/UIkit/index';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from 'reducks/currentUser/operations';
import { updateUserProfile } from 'reducks/currentUser/operations';

const UserEdit = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const currentUser = getCurrentUser(selector);

    const [username, setUsername] = useState(""),
          [occupation, setOccupation] = useState(""),
          [organization, setOrganization] = useState(""),
          [image, setImage] = useState(""),
          [profile, setProfile] = useState(""),
          [email, setEmail] = useState(""),
          [password, setPassword] = useState(""),
          [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        setUsername(currentUser.username)
        setOccupation(currentUser.occupation)
        setOrganization(currentUser.organization)
        setImage(currentUser.image)
        setProfile(currentUser.profile)
    },[]);

    // 子コンポーネントに渡すときはuseCallback関数(メモ化)を使うとパフォーマンスが上がる。
    const inputUsername = useCallback((event) => {
        setUsername(event.target.value)
    }, [setUsername]);

    const inputOccupation = useCallback((event) => {
        setOccupation(event.target.value)
    }, [setOccupation]);

    const inputOrganization = useCallback((event) => {
        setOrganization(event.target.value)
    }, [setOrganization]);

    const inputProfile = useCallback((event) => {
        setProfile(event.target.value)
    }, [setProfile]);

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail]);
    
    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    }, [setPassword]);
    
    const inputConfirmPassword = useCallback((event) => {
        setConfirmPassword(event.target.value)
    }, [setConfirmPassword]);

    return (
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">アカウント登録</h2>
            <div className="module-spacer--medium" />
            <TextInput
                fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
                rows={1} value={username} type={"text"} onChange={inputUsername}
            />
            <TextInput
                fullWidth={true} label={"職種"} multiline={false} required={false}
                rows={1} value={occupation} type={"text"} onChange={inputOccupation}
            />
            <TextInput
                fullWidth={true} label={"組織名"} multiline={false} required={false}
                rows={1} value={organization} type={"text"} onChange={inputOrganization}
            />
            <TextInput
                fullWidth={true} label={"プロフィール"} multiline={true} required={false}
                rows={5} value={profile} type={"text"} onChange={inputProfile}
            />
            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={"パスワード"} multiline={false} required={true}
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />
            <TextInput
                fullWidth={true} label={"パスワード(再確認)"} multiline={false} required={true}
                rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label={"更新する"}
                    onClick={() => dispatch(updateUserProfile( username, occupation, organization, email, password ))}
                />
            </div>
        </div>
    )
};

export default UserEdit;