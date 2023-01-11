import React from 'react';
import {Button, Icon, Item, Label, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {ActivityModel} from '../../../../../Models/ActivityModel';
import {observer} from 'mobx-react-lite';
import {format} from 'date-fns';
import ActivityListItemAttendeeComponent from '../ActivityListItemAttendee/ActivityListItemAttendee.Component';

interface Props {
    activity: ActivityModel
}


const ActivityListItemComponent: React.FC<Props> = ({activity}: Props) => {

    return (
        <Segment.Group>
            <Segment>
                {activity.isCancelled && (
                    <Label attached='top' color='red' content='Cancelled' style={{
                        textAlign: 'center'
                    }} />
                )}
                <Item.Group>
                    <Item>
                        <Item.Image style={{
                            marginBottom: 3
                        }} size='tiny' circular src='/assets/user.png'/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>
                                Hosted by {activity.host?.displayName}
                            </Item.Description>
                            {activity.isHost && (
                                <Item.Description>
                                    <Label color='orange' basic>
                                        You are hosting this activity
                                    </Label>
                                </Item.Description>
                            )}
                            {activity.isGoing && !activity.isHost && (
                                <Item.Description>
                                    <Label color='green' basic>
                                        You are going to this activity
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker'/> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                <ActivityListItemAttendeeComponent attendees={activity.attendees!} />
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button 
                    as={Link} 
                    to={`/activities/${activity.id}`} 
                    color='teal' 
                    floated='right' 
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}

export default observer(ActivityListItemComponent);