import * as React from 'react';
import * as lodash from 'lodash';
import useFormController from './useFormController';

const {useState} = React
const {get} = lodash;

export default function Example() {
    const [submitResponse, setSubmitResonse] = useState("");
    const [submitFieldState, setSubmitFieldState] = useState('field in a path');
    const {
        fieldErrors,
        getFieldProps,
        getFormProps,
        submitButtonProps,
        updateFieldProps,
    } = useFormController({
        fieldProps: {
            myCheckbox: {
                checked: true,
                type: 'checkbox',
                formValuePath: 'myCheckbox[]',
                value: 'mock checkbox value',
                otherProps: {id: 'myCheckbox'},
            },
            myCheckbox2: {
                checked: false,
                type: 'checkbox',
                formValuePath: 'myCheckbox[]',
                value: 'mock checkbox value 2',
                otherProps: {id: 'myCheckbox2'},
            },
            myCheckbox3: {
                checked: true,
                type: 'checkbox',
                formValuePath: 'myCheckbox[]',
                value: 'mock checkbox value 3',
                otherProps: {id: 'myCheckbox3'},
            },
            myNoSubmitTextField: {
                doNotSubmit: true,
                validation: (value: string) => (value === 'x') ? 'this is an x' : undefined,
                value: 'mock no submit text value'
            },
            mySubmitTextField1: {
                formValuePath: 'some.deep.nested.path[]',
                validation: (value: string) => (value === 'x') ? 'this is an x' : undefined,
                value: submitFieldState,
            },
            mySubmitTextField2: {
                formValuePath: 'some.deep.nested.path[]',
                validation: (value: string) => (value === 'x') ? 'this is an x' : undefined,
                value: submitFieldState,
            },
        },
        formProps: {
            onExecuteSubmit: handleSubmit,
        }
    });

    function handleSubmit(formValues: object) {
        console.log('Submitted', {formValues})
        setSubmitResonse(JSON.stringify(formValues))
    }

    function renderError(fieldName: string) {
        const fieldError = get(fieldErrors, fieldName);

        return fieldError && <div style={{color: 'red'}}>{fieldError}</div>;
    }

    function handlePropFieldChange(event: React.FormEvent<HTMLInputElement>) {
        updateFieldProps();
        setSubmitFieldState(event.currentTarget.value);
    }

    return (submitResponse)
        ? <div>{submitResponse}</div>
        : (
            <form name="mockFormName" {...getFormProps()} >
                <input onChange={handlePropFieldChange} />
                <div>
                    <input
                        {...getFieldProps('myNoSubmitTextField')}
                    />
                    {renderError('myNoSubmitTextField')}
                </div>
                <div>
                    <input
                        {...getFieldProps('mySubmitTextField1')}
                    />
                    <input
                        {...getFieldProps('mySubmitTextField2')}
                    />
                </div>
                <div>
                    <input
                        {...getFieldProps('myCheckbox')}
                    />
                    <label htmlFor="myCheckbox">{getFieldProps('myCheckbox').value}</label>
                    <input
                        {...getFieldProps('myCheckbox2')}
                    />
                    <label htmlFor="myCheckbox2">{getFieldProps('myCheckbox2').value}</label>
                    <input
                        {...getFieldProps('myCheckbox3')}
                    />
                    <label htmlFor="myCheckbox3">{getFieldProps('myCheckbox3').value}</label>
                </div>
                <button {...submitButtonProps}>Submit</button>
            </form>
        );

}
