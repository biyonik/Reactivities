import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import {Item, Label, List, Segment, Image } from 'semantic-ui-react';
import { ProfileModel } from '../../../../Models/ProfileModel';

interface Props {
 attendees: ProfileModel[];    
}


const ActivityDetailedSidebarComponent: React.FC<Props> = ({attendees}: Props) => {
    return (
        <>
            <Segment
                textAlign='center'
                style={{border: 'none'}}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {attendees && attendees.length} {attendees.length === 1 ? 'person' : 'people'} going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {
                        attendees && attendees.map(attendee => (
                            <Item style={{position: 'relative'}} key={attendee.username}>
                                <Label
                                    style={{position: 'absolute'}}
                                    color='orange'
                                    ribbon='right'
                                >
                                    Host
                                </Label>
                                <Image size='tiny' src={attendee.image || '/assets/user.png'}/>
                                <Item.Content verticalAlign='middle'>
                                    <Item.Header as='h3'>
                                        <Link to={`/profiles/${attendee.username}`}>{attendee.displayName}</Link>
                                    </Item.Header>
                                    <Item.Extra style={{color: 'orange'}}>Following</Item.Extra>
                                </Item.Content>
                            </Item>
                        ))
                    }
                    
                    
                    {/*<Item style={{position: 'relative'}}>*/}
                    {/*    <Image size='tiny' src={'/assets/user.png'}/>*/}
                    {/*    <Item.Content verticalAlign='middle'>*/}
                    {/*        <Item.Header as='h3'>*/}
                    {/*            <Link to={`#`}>Tom</Link>*/}
                    {/*        </Item.Header>*/}
                    {/*        <Item.Extra style={{color: 'orange'}}>Following</Item.Extra>*/}
                    {/*    </Item.Content>*/}
                    {/*</Item>*/}
                    
                    {/*<Item style={{position: 'relative'}}>*/}
                    {/*    <Image size='tiny' src={'/assets/user.png'}/>*/}
                    {/*    <Item.Content verticalAlign='middle'>*/}
                    {/*        <Item.Header as='h3'>*/}
                    {/*            <Link to={`#`}>Sally</Link>*/}
                    {/*        </Item.Header>*/}
                    {/*    </Item.Content>*/}
                    {/*</Item>*/}
                </List>
            </Segment>
        </>
    )
}

export default observer(ActivityDetailedSidebarComponent);