import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Container, Divider, Grid, Paper } from '@material-ui/core'
import CopyrightIcon from '@material-ui/icons/Copyright'
import { makeStyles } from '@material-ui/styles'
import { PrimaryButton } from 'components/UIkit/index'
import { push } from 'connected-react-router'
import Image from 'react-image-resizer'
import { listenAuthState, signInGuestUser } from 'reducks/currentUser/operations'
import { getSignedIn } from 'reducks/currentUser/selectors'
import WhatIsYourTemplate from 'assets/img/src/WhatIsYourTemplate.png'
import CommingUpWithAGoodIdea from 'assets/img/src/CommingUpWithAGoodIdea.png'
import ManagingTemplates from 'assets/img/src/ManagingTemplates.png'
import PCTabletSmartPhone from 'assets/img/src/PCTabletSmartPhone.png'
import SharingTemplates from 'assets/img/src/SharingTemplates.png'
import SearchingTemplates from 'assets/img/src/SearchingTemplates.png'
import UnderDevelopping from 'assets/img/src/UnderDevelopping.png'
import no_image from 'assets/img/src/no_image.png'
import main_picture from 'assets/img/src/main_picture.jpg'

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.grey[100],
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: theme.palette.grey[900],
    marginTop: theme.spacing(2),
  },
  subTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: theme.palette.grey[800],
    height: '54px',
  },
  content: {
    fontSize: '1rem',
    color: theme.palette.grey[800],
    marginTop: theme.spacing(4),
  },
  subContent: {
    fontSize: '0.8rem',
    color: theme.palette.grey[800],
  },
  administratorIcon: {
    '& img': {
      borderRadius: '50%',
    },
  },
  footerLink: {
    fontSize: '0.8rem',
    color: theme.palette.primary.main,
    '&:hover': {
      cursor: 'pointer',
      borderBottom: '1px solid',
    },
  },
}))

const TopPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isSignedIn = getSignedIn(selector)

  useEffect(() => {
    if (!isSignedIn && localStorage.getItem('auth_token')) {
      dispatch(listenAuthState())
    }
  }, [isSignedIn, dispatch])

  return (
    <Box>
      <img src={main_picture} alt="topPageImage" />
      <Box component={Paper} p={2} className={classes.paper}>
        <Grid container className={classes.content} component="h6" spacing={1}>
          <Grid item xs={12} sm={6}>
            <Box textAlign="center">
              <PrimaryButton label={'新規登録 / ログイン'} onClick={() => dispatch(push('/signin'))} />
              <Box py={1} fontSize="0.8rem">
                新規登録の上、ログインします
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box textAlign="center">
              <PrimaryButton label="ユーザー登録無しで利用" onClick={() => dispatch(signInGuestUser())} />
              <Box py={1} fontSize="0.8rem">
                ゲストユーザーとしてログインします
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box py={4}>
          <Box className={classes.title} component="h2">
            YourTemplateとは？
          </Box>
          <Divider />
          <Box className={classes.content} component="h6" mt={2}>
            PCやスマホ上で簡単に「英語定型文」を検索、共有、管理できる無料アプリです。
            <Image src={WhatIsYourTemplate} width={200} height={200} style={{ margin: 'auto' }} />
            「英語定型文」とは、主にメールでよく使う、決まった形式・言い回しの英文章(テンプレート)のことです。
            <br />
            <br />
            英文メールを作成しているとき、
            <br />
            <Box fontWeight="bold" my={4}>
              1. 前に使っていた英文を忘れてしまった
              <br />
              <br />
              2. 毎回英文を考えるのに時間がかかった
              <br />
            </Box>
            こういった悩みを感じたことはありませんか？
            <br />
            <br />
            YourTemplateがそのお悩み解消をサポートできるかもしれません。
            <Box mt={4}>
              <Container maxWidth="xs">
                <img src={no_image} alt="postEditScreenShotImage" width="100%" />
                <Box fontSize="0.8rem" textAlign="center">
                  英語定型文作成のイメージ
                </Box>
              </Container>
            </Box>
          </Box>
        </Box>

        <Box py={4}>
          <Box className={classes.title} component="h2">
            YourTemplateでできること
          </Box>
          <Divider />
          <Box my={4}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Box className={classes.subTitle} component="h3">
                    PCやスマホからお手軽利用！
                  </Box>
                  <Image src={PCTabletSmartPhone} width={200} height={200} style={{ margin: 'auto' }} />
                  <Box className={classes.subContent} component="h6" mt={2}>
                    デスクワーク中や移動中など、PCやスマホからテンプレートを管理することができます
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Box className={classes.subTitle} component="h3">
                    シチュエーションに合うテンプレートを検索！
                  </Box>
                  <Image src={SearchingTemplates} width={200} height={200} style={{ margin: 'auto' }} />
                  <Box className={classes.subContent} component="h6" mt={2}>
                    シチュエーション別に、あなたが必要とするテンプレートを検索できる
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box className={classes.subTitle} component="h3">
                  自分用にカスタマイズしたテンプレートを作成！
                </Box>
                <Image src={CommingUpWithAGoodIdea} width={200} height={200} style={{ margin: 'auto' }} />
                <Box className={classes.subContent} component="h6" mt={2}>
                  自分向けに文章をカスタマイズできるので、使い回しが簡単にできます
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box className={classes.subTitle} component="h3">
                  作成したテンプレートを共有
                </Box>
                <Image src={SharingTemplates} width={200} height={200} style={{ margin: 'auto' }} />
                <Box className={classes.subContent} component="h6" mt={2}>
                  テンプレートを共有することで、職場仲間とデータを共有できる！
                  <Box style={{ fontSize: '0.8rem', color: 'red' }}>
                    (※ テンプレートの共有によって個人情報が公開されることはありません)
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box className={classes.subTitle} component="h3">
                  お気に入りを見つけて、マイページで簡単管理！
                </Box>
                <Image src={ManagingTemplates} width={200} height={200} style={{ margin: 'auto' }} />
                <Box className={classes.subContent} component="h6" mt={2}>
                  気に入ったテンプレートはお気に入りに追加すれば、いつでも見れて、しかも自分流にカスタマイズできます
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box className={classes.subTitle} component="h3">
                  And more ...
                </Box>
                <Image src={UnderDevelopping} width={200} height={200} style={{ margin: 'auto' }} />
                <Box className={classes.subContent} component="h6" mt={2}>
                  テンプレート管理に役立つ追加機能を開発中です
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box textAlign="center" py={4} mb={2}>
            <Box className={classes.subTitle}>まずは1分で簡単登録♪</Box>
            <Grid container component="h6" spacing={1}>
              <Grid item xs={12} sm={6}>
                <Image src={no_image} width={150} height={150} style={{ margin: 'auto' }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box textAlign="center" my={1}>
                  <PrimaryButton label={'新規登録 / ログイン'} onClick={() => dispatch(push('/signin'))} />
                </Box>
                <Box textAlign="center" my={1}>
                  <PrimaryButton label="ユーザー登録無しで利用" onClick={() => dispatch(signInGuestUser())} />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
            <Box>
              <CopyrightIcon style={{ fontSize: '0.8rem', verticalAlign: -1 }} />
            </Box>
            <Box fontSize="0.8rem" ml={1}>
              2021 重村 直毅
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box className={classes.administratorIcon}>
              <img src={no_image} alt="administratorIcon" width="30px" height="30px" />
            </Box>
            <Box ml={1} fontSize="0.8rem">
              運営者:
            </Box>
            <Box className={classes.footerLink} onClick={() => window.open('https://twitter.com/ddpmntcpbr')}>
              @ddpmntcpbr
            </Box>
            <Box mx={1} fontSize="0.8rem">
              /
            </Box>
            <Box className={classes.footerLink} onClick={() => dispatch(push('/agreement'))}>
              利用規約
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default TopPage