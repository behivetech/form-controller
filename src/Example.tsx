import * as React from 'react';
import * as lodash from 'lodash';
import useFormController from './useFormController';

const {useState} = React
const {get} = lodash;

export default function Example() {
    const [submitResponse, setSubmitResonse] = useState("")
    const {
        fieldErrors,
        getFieldProps,
        getFormProps,
        submitButtonProps,
    } = useFormController({
        fieldProps: {
            myCheckbox: {
                checked: true,
                type: 'checkbox',
                value: 'mock checkbox value',
            },
            myNoSubmitTextField: {
                doNotSubmit: true,
                validation: (value: string) => (value === 'x') ? 'this is an x' : undefined,
                value: 'mock no submit text value'
            }
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

    return (submitResponse)
        ? <div>{submitResponse}</div>
        : (
            <form name="mockFormName" {...getFormProps()} >
                <div>
                    <input
                        name="myNoSubmitTextField"
                        id="myNoSubmitTextField"
                        {...getFieldProps('myNoSubmitTextField')}
                    />
                    {renderError('myNoSubmitTextField')}
                </div>
                <div>
                    <input
                        type="checkbox"
                        name="myCheckbox"
                        id="myCheckbox"
                        {...getFieldProps('myCheckbox')}
                    />
                    <label htmlFor="myNoSubmitTextField">Checkbox Value</label>
                </div>
                <button {...submitButtonProps}>Submit</button>
            </form>
        );

}
