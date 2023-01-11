import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { List, Image, Popup } from 'semantic-ui-react';
import { ProfileModel } from '../../../../../Models/ProfileModel';
import ProfileCardComponent from '../../../../Profiles/ProfileCard/ProfileCard.Component';

interface Props {
    attendees: ProfileModel[];
}

const ActivityListItemAttendeeComponent:React.FC<Props> = ({attendees}: Props) => {
    return (
        <List horizontal>
            {
                attendees && attendees.map(attendee => (
                    <Popup
                        hoverable
                        key={attendee.username}
                        trigger={
                            <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                                <Image size='mini' circular src={attendee.image || '/assets/user.png'} />
                            </List.Item>
                        }
                    >
                        <Popup.Content>
                            <ProfileCardComponent profile={attendee} />
                        </Popup.Content>
                    </Popup>
                ))
            }
            
        </List>
    )
}

export default observer(ActivityListItemAttendeeComponent);