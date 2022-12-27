import React, {FormEvent, useState, ChangeEvent} from 'react';
import {Button, Form, Segment} from 'semantic-ui-react';
import {ActivityModel} from '../../../Models/ActivityModel';

interface Props {
    activity: ActivityModel | undefined;
    closeForm: () => void;
    createOrEdit: (activity: ActivityModel) => void;
}

const ActivityFormComponent: React.FC<Props> = ({activity: selectedActivity, closeForm, createOrEdit}: Props) => {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    };

    const [activity, setActivity] = useState(initialState);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        createOrEdit(activity);
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
                <Form.Input placeholder='Date' name='date' value={activity.date}
                            onChange={(e) => handleInputChange(e)}/>
                <Form.Input placeholder='City' name='city' value={activity.city}
                            onChange={(e) => handleInputChange(e)}/>
                <Form.Input placeholder='Venue' name='venue' value={activity.venue}
                            onChange={(e) => handleInputChange(e)}/>
                <Button.Group widths='2'>
                    <Button floated='right' positive type='submit' content='Submit'/>
                    <Button onClick={() => closeForm()} floated='right' type='button' content='Cancel'/>
                </Button.Group>
            </Form>
        </Segment>
    )
}

export default ActivityFormComponent;