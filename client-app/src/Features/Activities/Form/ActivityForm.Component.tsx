import {observer} from 'mobx-react-lite';
import React, {FormEvent, useState, ChangeEvent, useEffect} from 'react';
import {Link, useNavigate, useParams } from 'react-router-dom';
import {Button, Form, Segment} from 'semantic-ui-react';
import LoadingComponent from '../../../Components/LoadingComponent/Loading.Component';
import {ActivityModel} from '../../../Models/ActivityModel';
import {useStore} from '../../../Stores/Store';
import {v4 as uuid} from 'uuid';


const ActivityFormComponent: React.FC = () => {
    const {activityStore} = useStore();
    const {createActivity, updateActivity, submitting, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();
    
    const [activity, setActivity] = useState<ActivityModel>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });
    
    useEffect(() => {
        if (id) {
            loadActivity(id).then((activity) => {
                setActivity(activity!);
            })
        }
    }, [id, loadActivity]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => {
                navigate(`/activities/${activity.id}`);
            });
        } else {
            updateActivity(activity).then(() => {
                navigate(`/activities/${activity.id}`);
            });
        }
    }


    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setActivity({
            ...activity,
            [name]: value
        });
    }
    
    if (loadingInitial) return <LoadingComponent content='Loading activity...' inverted/>

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
                    <Button as={Link} to={`/activities/${activity.id}`} floated='right' type='button' content='Cancel'/>
                </Button.Group>
            </Form>
        </Segment>
    )
}

export default observer(ActivityFormComponent);