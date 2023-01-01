import React from 'react';
import {useField} from 'formik';
import { observer } from 'mobx-react-lite';
import {Form, Label, Select} from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    options: any;
}

const SelectCommonFormElement: React.FC<Props> = (props: Props) => {
    const [field, meta, helpers] = useField(props.name);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select 
                options={props.options} 
                clearable
                value={field.value || null}
                onChange={(e, d) => helpers.setValue(d.value)}
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ): null}
        </Form.Field>
    )
}

export default observer(SelectCommonFormElement);