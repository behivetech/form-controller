// useFormController.test.js
import React, {useState} from 'react';
import {fireEvent, render} from 'react-testing-library';
import {get} from 'lodash';
import useFormController from './useFormController';

describe('useFormController', () => {
    function TestForm(useFormControllerArgs) {
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
                mySubmitTextField2: {
                    value: 'field in a path',
                    formValuePath: 'some.deep.nested.path'
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
                            {...getFieldProps('myNoSubmitTextField')}
                        />
                        {renderError('myNoSubmitTextField')}
                    </div>
                    <div>
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
                    <button data-testid="submitButton" {...submitButtonProps}>Submit</button>
                </form>
            );
    }

    it('should validate fields correctly', () => {
        const {container, debug, getByTestId} = render(<TestForm />);

        debug();
        fireEvent.click(getByTestId('submitButton'));
        debug();
    });
});
