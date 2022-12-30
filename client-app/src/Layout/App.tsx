import React, {useState, Fragment} from 'react';
import {Container} from 'semantic-ui-react';
import NavBar from './NavBar/NavBar';
import {v4 as uuid} from 'uuid';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const App: React.FC = () => {
    return (
        <Fragment>
            <NavBar />
            <Container style={{
                marginTop: '7em'
            }}>
                <Outlet />
            </Container>
        </Fragment>
    );
}

export default observer(App);
