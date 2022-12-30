import React, {useState, Fragment} from 'react';
import {Container} from 'semantic-ui-react';
import NavBar from './NavBar/NavBar';
import {v4 as uuid} from 'uuid';
import {Outlet, useLocation} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import HomePage from '../Pages/HomePage/Home.Page';

const App: React.FC = () => {
    const location = useLocation();

    return (
        <Fragment>
            {
                location.pathname === '/' ? <HomePage/> : (
                    <>
                        <NavBar/>
                        <Container style={{
                            marginTop: '7em'
                        }}>
                            <Outlet/>
                        </Container>
                    </>
                )
            }
        </Fragment>
    );
}

export default observer(App);
