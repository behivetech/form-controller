// useFormController.test.js
import {render} from 'react-testing-library';
import useFormController from './useFormController';

describe('useFormController', () => {
    const mockHandleSubmit = jest.fn();

    function renderForm(useFormControllerArgs) {
        const {
            fieldErrors,
            formValues,
            formProps,
            fieldProps,
            submitButtonProps,
        } = useFormController({
            fieldProps: {
                mockCheckbox: {
                    checked: true,
                    value: 'mock checkbox value',
                },
                mockNoSubmitTextField: {
                    noSubmit: true,
                    value: 'mock no submit text value'
                }
            },
            onSubmit: mockHandleSubmit,
        });

        return (
            <form name="mockFormName" {...formProps} >
                <input name="mockNoSubmitTextField" {...fieldProps} />
                <input type="checkbox" name="mockCheckbox" {...fieldProps} />
            </form>
        );
    }

    it('should validate fields correctly', () => {
        const {container, debug} = render(renderForm());

        debug();
    });
});
