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
            },
            myCheckbox2: {
                checked: true,
                type: 'checkbox',
                formValuePath: 'myCheckbox[]',
                value: 'mock checkbox value 2',
            },
            myCheckbox3: {
                checked: true,
                type: 'checkbox',
                formValuePath: 'myCheckbox[]',
                value: 'mock checkbox value 3',
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
                        type="checkbox"
                        id="myCheckbox"
                        {...getFieldProps('myCheckbox')}
                    />
                    <input
                        type="checkbox"
                        id="myCheckbox2"
                        {...getFieldProps('myCheckbox2')}
                    />
                    <input
                        type="checkbox"
                        id="myCheckbox3"
                        {...getFieldProps('myCheckbox3')}
                    />
                    <label htmlFor="myNoSubmitTextField">Checkbox Value</label>
                </div>
                <button {...submitButtonProps}>Submit</button>
            </form>
        );

}
