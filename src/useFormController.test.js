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
                    nullValue: undefined,
                    type: 'checkbox',
                    formValuePath: 'myCheckbox[]',
                    value: 'mock checkbox value',
                },
                myCheckbox2: {
                    checked: false,
                    nullValue: undefined,
                    type: 'checkbox',
                    formValuePath: 'myCheckbox[]',
                    value: 'mock checkbox value 2',
                },
                myCheckbox3: {
                    checked: true,
                    nullValue: undefined,
                    type: 'checkbox',
                    formValuePath: 'myCheckbox[]',
                    value: 'mock checkbox value 3',
                },
                myNoSubmitTextField: {
                    doNotSubmit: true,
                    validation: (value) => (value === 'x') ? 'this is an x' : undefined,
                    value: 'mock no submit text value'
                },
                mySubmitTextField1: {
                    value: '',
                    formValuePath: 'some.deep.nested.path[]'
                },
                mySubmitTextField2: {
                    value: 'field in a path',
                    formValuePath: 'some.deep.nested.path[]'
                }
            },
            formProps: {
                onExecuteSubmit: handleSubmit,
                nullValue: null,
            }
        });

        function handleSubmit(formValues) {
            setSubmitResonse(JSON.stringify(formValues))
        }

        function renderError(fieldName) {
            const fieldError = get(fieldErrors, fieldName);

            return fieldError && <div style={{color: 'red'}}>{fieldError}</div>;
        }

        return (submitResponse)
            ? <div data-testid="response">{submitResponse}</div>
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
                            {...getFieldProps('myCheckbox')}
                        />
                        <input
                            {...getFieldProps('myCheckbox2')}
                        />
                        <input
                            {...getFieldProps('myCheckbox3')}
                        />
                    </div>
                    <button data-testid="submitButton" {...submitButtonProps}>Submit</button>
                </form>
            );
    }

    it('should render elements with the correct props an submit the right values', async () => {
        const {container, debug, getByTestId} = render(<TestForm />);

        expect(container).toMatchSnapshot();

        await fireEvent.click(getByTestId('submitButton'));

        const submitted = JSON.parse(getByTestId('response').innerHTML);

        expect(submitted.myCheckbox).toEqual(["mock checkbox value", "mock checkbox value 3"]);
        expect((submitted.some.deep.nested.path)).toEqual([null, "field in a path"]);
    });

    it('should validate fields correctly', async () => {
        const {container, debug, getByTestId} = render(<TestForm />);

        fireEvent.change(container.getElementsByName(['myNoSubmitTextField'])[0], 'x')
        await fireEvent.click(getByTestId('submitButton'));
        debug(JSON.parse(getByTestId('response').innerHTML));
    });
});
