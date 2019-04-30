import * as React from 'react';
import useFormController from './useFormController';

export default function Example() {
    const {
        fieldErrors,
        formValues,
        formProps,
        fieldProps,
        submitButtonProps,
    } = useFormController({
        fieldProps: {
            myCheckbox: {
                checked: true,
                value: 'mock checkbox value',
            },
            myNoSubmitTextField: {
                noSubmit: true,
                validation: () => 'true',
                value: 'mock no submit text value'
            }
        },
        onSubmit: handleSubmit,
    });

    function handleSubmit() {
        console.log('Submitted', {formValues})
    }

    return (
        <form name="mockFormName" {...formProps} >
            <input name="myNoSubmitTextField" {...fieldProps} />
            {fieldErrors['myNoSubmitTextField'] && <div>{fieldErrors['myNoSubmitTextField']}</div>}
            <input type="checkbox" name="myCheckbox" {...fieldProps} />
            <button {...submitButtonProps}>Submit</button>
        </form>
    );

}
