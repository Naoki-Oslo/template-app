import React, { useCallback, useState } from 'react';
import { TextInput, PrimaryButton } from 'components/UIkit/index';
import { signUp, signInGuestUser } from 'reducks/currentUser/operations';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const SignUp = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState(""),
          [occupation, setOccupation] = useState(""),
          [organization, setOrganization] = useState(""),
          [email, setEmail] = useState(""),
          [password, setPassword] = useState(""),
          [confirmPassword, setConfirmPassword] = useState("");

    // 子コンポーネントに渡すときはuseCallback関数(メモ化)を使うとパフォーマンスが上がる。
    const inputName = useCallback((event) => {
        setName(event.target.value)
    }, [setName]);

    const inputOccupation = useCallback((event) => {
        setOccupation(event.target.value)
    }, [setOccupation]);

    const inputOrganization = useCallback((event) => {
        setOrganization(event.target.value)
    }, [setOrganization]);

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
                rows={1} value={name} type={"text"} onChange={inputName}
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
                    label={"アカウントを登録する"}
                    onClick={() => dispatch(signUp(name, occupation, organization, email, password, confirmPassword))}
                />
                <div className="module-spacer--medium" />
                <PrimaryButton
                    label={"ゲストログインする"}
                    onClick={() => dispatch(signInGuestUser())}
                />
                <div className="module-spacer--medium" />
                <p className="u-text-small" onClick={() => dispatch(push('/signin'))}>アカウントをお持ちの方はこちら</p>
            </div>
        </div>
    )
};

export default SignUp;