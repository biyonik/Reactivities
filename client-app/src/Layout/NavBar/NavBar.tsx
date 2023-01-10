import {observer} from 'mobx-react-lite';
import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Button, Container, Menu, Image, Dropdown} from 'semantic-ui-react';
import {useStore} from '../../Stores/Store';
import './NavBar.style.scss';

const NavBar: React.FC = () => {
    const {userStore: {user, logout}} = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="" style={{
                        marginRight: '10px'
                    }}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='Activities'/>
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity'/>
                </Menu.Item>
                <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right'/>
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user'/>
                            <Dropdown.Item onClick={logout} text='Logout' icon='power'/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default observer(NavBar);