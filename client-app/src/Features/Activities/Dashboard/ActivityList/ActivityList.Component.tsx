import React, {Fragment} from 'react';
import {ActivityModel} from '../../../../Models/ActivityModel';
import {Header} from "semantic-ui-react";
import {useStore} from '../../../../Stores/Store';
import {observer} from 'mobx-react-lite';
import ActivityListItemComponent from './ActivityListItem/ActivityListItem.Component';
import DateFormattedViewer from '../../../../Components/DateFormattedViewer';

const ActivityListComponent: React.FC = () => {
    const {activityStore} = useStore();
    const {groupedActivities} = activityStore;

    return (
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        <DateFormattedViewer date={group}/>
                    </Header>
                    {
                        activities.map((activity: ActivityModel) => (
                            <ActivityListItemComponent activity={activity} key={activity.id}/>
                        ))
                    }
                </Fragment>
            ))}
        </>

    )
}

export default observer(ActivityListComponent);