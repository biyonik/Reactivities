import {observer} from 'mobx-react-lite';
import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Header, Segment, Image, Button} from 'semantic-ui-react';
import LoginFormComponent from '../../Features/Users/Form/LoginForm.Component';
import RegisterFormComponent from '../../Features/Users/Form/RegisterForm.Component';
import {useStore} from '../../Stores/Store';
import './HomePage.style.scss';

const HomePage: React.FC = () => {
    const {userStore, modalStore} = useStore();
    const {openModal} = modalStore;
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' alt='Logo' src='/assets/logo.png' style={{marginBottom: 12}}/>
                    Reactivities
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to Reactivities'/>
                        <Button as={Link} to='/activities' size='huge' inverted>Go to Activities!</Button>
                    </>
                ): (
                 <>
                     <Button onClick={() => openModal(<LoginFormComponent />)} size='huge' inverted>Login!</Button>
                     <Button onClick={() => openModal(<RegisterFormComponent />)} size='huge' inverted>Register</Button>
                 </>   
                )}
            </Container>
        </Segment>
    )
}

export default observer(HomePage);