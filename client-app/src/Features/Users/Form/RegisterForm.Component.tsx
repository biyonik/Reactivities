import {ErrorMessage, Form, Formik} from 'formik';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Button, Header, Label} from 'semantic-ui-react';
import TextFieldCommonFormElement from '../../../Components/Common/FormElement/TextField.CommonFormElement';
import {useStore} from '../../../Stores/Store';
import UserValidationSchema from '../../../Schemas/Yup/UserValidationSchema';
import ValidationErrorComponent from '../../../Components/Common/ErrorComponent/ValidationError.Component';

const RegisterFormComponent: React.FC = () => {
    const {userStore} = useStore();
    const {register} = userStore;
    return (
        <Formik
            initialValues={{email: '', displayName: '', userName: '', password: '', bio: 'Bio', error: null}}
            onSubmit={(values, {setErrors}) => register(values).catch(error => setErrors({error: error}))}
            validationSchema={UserValidationSchema}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to Reactivities' color='teal' textAlign='center' />
                    <TextFieldCommonFormElement placeholder='Email' name='email'></TextFieldCommonFormElement>
                    <TextFieldCommonFormElement placeholder='Display Name' name='displayName'></TextFieldCommonFormElement>
                    <TextFieldCommonFormElement placeholder='User Name' name='userName'></TextFieldCommonFormElement>
                    <TextFieldCommonFormElement placeholder='Password' name='password'
                                                type='password'></TextFieldCommonFormElement>
                    <ErrorMessage
                        name='error'
                        render={() => <ValidationErrorComponent errors={errors.error} />}
                    />
                    <Button positive content='Register' fluid type='submit' disabled={!isValid || !dirty || isSubmitting}/>
                </Form>
            )}
        </Formik>
    )
}

export default observer(RegisterFormComponent);