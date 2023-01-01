import React from 'react';
import {useField} from 'formik';
import { observer } from 'mobx-react-lite';
import {Form, Label} from "semantic-ui-react";
interface Props {
    placeholder: string;
    name: string;
    label?: string;
    rows: number;
    cols: number;
}

const TextAreaCommonFormElement: React.FC<Props> = (props: Props) => {
    const [field, meta] = useField(props.name);
    
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <textarea {...field} {...props} />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ): null}
        </Form.Field>
    )
}

export default observer(TextAreaCommonFormElement);