import React, {Fragment, useEffect} from 'react';
import {Container} from 'semantic-ui-react';
import NavBar from './NavBar/NavBar';
import {Outlet, useLocation} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import HomePage from '../Pages/HomePage/Home.Page';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../Stores/Store';
import LoadingComponent from '../Components/LoadingComponent/Loading.Component';
import ModalContainerComponent from '../Components/Common/Modal/ModalContainer.Component';


const App: React.FC = () => {
    const location = useLocation();
    const {commonStore, userStore} = useStore();

    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore]);
    
    if (!commonStore.appLoaded) return <LoadingComponent content='Loading App....' inverted={true} />
    
    
    return (
        <Fragment>
            <ModalContainerComponent />
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
