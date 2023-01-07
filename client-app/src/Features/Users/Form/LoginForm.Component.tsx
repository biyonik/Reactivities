import {ErrorMessage, Form, Formik} from 'formik';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Button, Header, Label} from 'semantic-ui-react';
import TextFieldCommonFormElement from '../../../Components/Common/FormElement/TextField.CommonFormElement';
import {useStore} from '../../../Stores/Store';

const LoginFormComponent: React.FC = () => {
    const {userStore} = useStore();
    const {login} = userStore;
    return (
        <Formik
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => login(values).catch(error => setErrors({error: 'Invalid email or password!'}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center' />
                    <TextFieldCommonFormElement placeholder='Email' name='email'></TextFieldCommonFormElement>
                    <TextFieldCommonFormElement placeholder='Password' name='password'
                                                type='password'></TextFieldCommonFormElement>
                    <ErrorMessage 
                        name='error'
                        render={() => <Label style={{marginBottom: 10}} basic color='red' content={errors.error} />}
                    />
                    <Button positive content='Login' fluid type='submit'/>
                </Form>
            )}
        </Formik>
    )
}

export default observer(LoginFormComponent);