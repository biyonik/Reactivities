import { observer } from 'mobx-react-lite';
import React from 'react';
import {Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../../Stores/Store';
import './NavBar.style.scss';



const NavBar: React.FC = () => {
    const {activityStore} = useStore();
    
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="" style={{
                        marginRight: '10px'
                    }}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button onClick={() => activityStore.openForm(undefined)} positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default observer(NavBar);