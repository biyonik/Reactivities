import React from 'react';
import {Grid, List} from 'semantic-ui-react';
import { ActivityModel } from '../../../Models/ActivityModel';

interface Props {
    activities: ActivityModel[];
}

const ActivityDashboardComponent: React.FC<Props> = ({activities}: Props) => {
    return (
        <Grid>
            <Grid.Column width='10'>
                <List>
                    {
                        activities.map((activity: ActivityModel) => (
                            <List.Item key={activity.id}>
                                <List.Content>
                                    <List.Header as='a'>{activity.title}</List.Header>
                                    <List.Description as='a'>{activity.description}</List.Description>
                                </List.Content>
                            </List.Item>
                        ))
                    }
                </List>
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboardComponent;