import {observer} from 'mobx-react-lite';
import React, {FormEvent, useState, ChangeEvent, useEffect} from 'react';
import {Button, Form, Segment} from 'semantic-ui-react';
import {ActivityModel} from '../../../Models/ActivityModel';
import {useStore} from '../../../Stores/Store';


const ActivityFormComponent: React.FC = () => {
    const {activityStore} = useStore();
    const {selectedActivity, closeForm, createActivity, updateActivity, submitting} = activityStore;

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    };

    const [activity, setActivity] = useState<ActivityModel>(initialState);

    useEffect(() => {
        if (activity) {
            setActivity(activity);
        }
    }, [activity])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        activity && activity.id ? updateActivity(activity) : createActivity(activity)
    }


    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setActivity({
            ...activity,
            [name]: value
        });
    }

    return (
        <Segment clearing>
            <Form onSubmit={(e) => handleSubmit(e)} autoComplete='off'>
                <Form.Input placeholder='Title' name='title' value={activity.title}
                            onChange={(e) => handleInputChange(e)}/>
                <Form.TextArea placeholder='Description' name='description' value={activity.description}
                               onChange={(e) => handleInputChange(e)}/>
                <Form.Input placeholder='Category' name='category' value={activity.category}
                            onChange={(e) => handleInputChange(e)}/>
                <Form.Input type='date' placeholder='Date' name='date' value={activity.date}
                            onChange={(e) => handleInputChange(e)}/>
                <Form.Input placeholder='City' name='city' value={activity.city}
                            onChange={(e) => handleInputChange(e)}/>
                <Form.Input placeholder='Venue' name='venue' value={activity.venue}
                            onChange={(e) => handleInputChange(e)}/>
                <Button.Group widths='2'>
                    <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                    <Button onClick={() => closeForm()} floated='right' type='button' content='Cancel'/>
                </Button.Group>
            </Form>
        </Segment>
    )
}

export default observer(ActivityFormComponent);