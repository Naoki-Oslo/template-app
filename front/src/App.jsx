import { Container } from '@material-ui/core';
import React from 'react';
import { Footer, Loading } from 'components/UIkit/index';
import { Notification } from 'components/Notification';
// import { Header } from 'components/Header'
import Router from 'Router';
import { Header } from 'components/Header'
import 'assets/reset.css';
import 'assets/style.css';

const App = () => {
    return (
        <Loading>
            <Header />
            <main className="c-main">
                <Container maxWidth="md">
                    <Notification />
                    <Router />
                </Container>
            </main>
            <Footer />
        </Loading>
    );
};

export default App;