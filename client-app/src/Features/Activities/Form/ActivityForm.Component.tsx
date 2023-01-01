import {observer} from 'mobx-react-lite';
import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Button, Header, Segment} from 'semantic-ui-react';
import LoadingComponent from '../../../Components/LoadingComponent/Loading.Component';
import {ActivityModel} from '../../../Models/ActivityModel';
import {useStore} from '../../../Stores/Store';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import TextFieldCommonFormElement from '../../../Components/Common/FormElement/TextField.CommonFormElement';
import TextAreaCommonFormElement from '../../../Components/Common/FormElement/TextArea.CommonFormElement';
import SelectFormElement from '../../../Components/Common/FormElement/Select.CommonFormElement';
import {CategoryOptions} from '../../../Components/Common/Options/Category.Options';
import DateFieldCommonFormElement from '../../../Components/Common/FormElement/DateField.CommonFormElement';
import {v4 as uuid} from 'uuid';
import ActivityValidationSchema from '../../../Schemas/Yup/ActivityValidationSchema';

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
        date: null,
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

    const handleFormSubmit = (activity: ActivityModel) => {
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


    if (loadingInitial) return <LoadingComponent content='Loading activity...' inverted/>

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal'/>
            <Formik
                validationSchema={ActivityValidationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className='ui form' onSubmit={(e) => handleSubmit(e)} autoComplete='off'>
                        <TextFieldCommonFormElement name='title' placeholder='Title'/>
                        <TextAreaCommonFormElement placeholder='Description' name='description' rows={5} cols={10}/>
                        <SelectFormElement placeholder='Category' name='category' options={CategoryOptions}/>
                        <DateFieldCommonFormElement placeholderText='Date'
                                                    name='date'
                                                    showTimeSelect
                                                    timeCaption='time'
                                                    dateFormat='MMMM d, yyyy h:mm aa'
                        />

                        <Header content='Location Details' sub color='orange'/>
                        <TextFieldCommonFormElement placeholder='City' name='city'/>
                        <TextFieldCommonFormElement placeholder='Venue' name='venue'/>

                        <Button.Group widths='2'>
                            <Button loading={submitting} 
                                    disabled={isSubmitting || !dirty || !isValid} 
                                    floated='right'
                                    positive 
                                    type='submit' 
                                    content='Submit'
                            />
                            <Button as={Link} to={`/activities/${activity.id}`} floated='right' type='button'
                                    content='Cancel'/>
                        </Button.Group>
                    </Form>
                )}
            </Formik>

        </Segment>
    )
}

export default observer(ActivityFormComponent);