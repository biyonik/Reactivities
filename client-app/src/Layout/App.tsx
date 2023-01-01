import React, {Fragment} from 'react';
import {Container} from 'semantic-ui-react';
import NavBar from './NavBar/NavBar';
import {Outlet, useLocation} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import HomePage from '../Pages/HomePage/Home.Page';
import { ToastContainer } from 'react-toastify';


const App: React.FC = () => {
    const location = useLocation();

    return (
        <Fragment>
            <ToastContainer position='bottom-right' hideProgressBar={true} theme='colored' />
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
