import {Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'semantic-ui-react';
import TextFieldCommonFormElement from '../../../Components/Common/FormElement/TextField.CommonFormElement';
import { useStore } from '../../../Stores/Store';

const LoginFormComponent: React.FC = () => {
    const {userStore} = useStore();
    const {login} = userStore;
    return (
        <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={values => login(values)}
        >
            {({handleSubmit, isSubmitting}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <TextFieldCommonFormElement placeholder='Email' name='email'></TextFieldCommonFormElement>
                    <TextFieldCommonFormElement placeholder='Password' name='password' type='password'></TextFieldCommonFormElement>
                    <Button positive content='Login' fluid type='submit' />
                </Form>
            )}
        </Formik>
    )
}

export default observer(LoginFormComponent);