import React, {FormEvent, useState, ChangeEvent, useEffect} from 'react';
import {Button, Form, Segment} from 'semantic-ui-react';
import {ActivityModel} from '../../../Models/ActivityModel';

interface Props {
    activity: ActivityModel | undefined;
    closeForm: () => void;
    createOrEdit: (activity: ActivityModel) => void;
    submitting: boolean;
}

const ActivityFormComponent: React.FC<Props> = ({
                                                    activity,
                                                    closeForm,
                                                    createOrEdit,
                                                    submitting
                                                }: Props) => {

    const initialState = activity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    };
    
    const [formActivity, setFormActivity] = useState<ActivityModel>(initialState);

    useEffect(() => {
        setFormActivity(activity!);
    }, [activity])
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        createOrEdit(formActivity);
    }


    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setFormActivity({
            ...formActivity,
            [name]: value
        });
    }
    
    return (
        <Segment clearing>
            <Form onSubmit={(e) => handleSubmit(e)} autoComplete='off'>
                <Form.Input placeholder='Title' name='title' value={formActivity.title}
                            onChange={(e) => handleInputChange(e)}/>
                <Form.TextArea placeholder='Description' name='description' value={formActivity.description}
                               onChange={(e) => handleInputChange(e)}/>
                <Form.Input placeholder='Category' name='category' value={formActivity.category}
                            onChange={(e) => handleInputChange(e)}/>
                <Form.Input type='date' placeholder='Date' name='date' value={formActivity.date}
                            onChange={(e) => handleInputChange(e)}/>
                <Form.Input placeholder='City' name='city' value={formActivity.city}
                            onChange={(e) => handleInputChange(e)}/>
                <Form.Input placeholder='Venue' name='venue' value={formActivity.venue}
                            onChange={(e) => handleInputChange(e)}/>
                <Button.Group widths='2'>
                    <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                    <Button onClick={() => closeForm()} floated='right' type='button' content='Cancel'/>
                </Button.Group>
            </Form>
        </Segment>
    )
}

export default ActivityFormComponent;