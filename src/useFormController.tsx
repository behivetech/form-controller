import * as React from 'react';
import * as lodash from 'lodash';

const {useState} = React;
const {
    forEach,
    get,
    isArray,
    isEmpty,
    isFunction,
    mapValues,
    omit,
    transform,
} = lodash;

interface useFormControllerArgs {
   fieldProps: {
       [key: string]: {
           checked?: Boolean
           noSubmit?: Boolean
           value?: string | number | [string | number] | undefined
           validation?: () => string | [() => string]
       }
   };
   onSubmit: Function;
}

interface useFormControllerResponse {
    fieldErrors: {
        [key: string]: string
    };
    formValues: {
        [key: string]: string
    };
    formProps: {
        [key: string]: {
            onSubmit: Function
        }
    };
    fieldProps: {
        checked?: Boolean;
        disabled: Boolean | undefined;
        ref: ()=> {
            inputElement: {value: string}
        };
        value: string | number | [string | number] | undefined;
    }
    submitButtonProps: {
        disabled: Boolean | undefined;
    }
}

interface formValues {
    [key: string]: string | number | [string | number] | undefined
}

interface fieldRefs {
    [key: string]: any
}

interface fieldErrors {
    [key: string]: string
}

export default function useFormController<useFormControllerResponse>({
    fieldProps,
    onSubmit,
}: useFormControllerArgs) {
    const [formValues, setFormValues] = useState<formValues>(mapValues(fieldProps, 'value') || {});
    const [fieldRefs, setFieldRefs] = useState<fieldRefs>({});
    const [fieldErrors, setFieldErrors] = useState<fieldErrors>({});
    const [formIsSubmitting, setFormIsSubmitting] = useState<Boolean>(false);
    const [initialSubmit, setInitialSubmit] = useState<Boolean>(false);

    function setFormValuesState({
            name,
            checked,
            type,
            value,
        }:
        {
            name: string,
            checked: Boolean | undefined,
            type: string
            value: string | number | [string | number] | undefined
        }
    ) {
        const fieldValue = (checked || type !== 'checkbox') ? value : "";

        setFormValues({
            ...formValues,
            [name]: fieldValue,
        });
    }

    function setFieldRefsState(name: string, inputRef: any) {
        setFieldRefs({
            ...fieldRefs,
            [name]: inputRef,
        });
    }

    function initField<HtmlInputElement>(inputRef: any) {
        if (inputRef !== null) {
            // Some componet libraries return inputElement as the actual ref
            // May need to add more if other libraries are used
            const inputElement = get(inputRef, 'inputElement') || inputRef;
            if (inputElement) {
                const {checked, name, type, value} = inputElement;

                if (!name) {
                    // eslint-disable-next-line
                    console.error(
                        'useFormSubmission: A name attribute must be specified for this element',
                        {inputElement}
                    );
                } else if (!fieldRefs[name]) {
                    setFieldRefsState(name, inputElement);
                    !fieldProps[name].noSubmit && setFormValuesState({
                        name,
                        checked,
                        type,
                        value,
                    });
                }
            } else {
                // eslint-disable-next-line
                console.error(
                    'useFormSubmission: Could not set a ref for this form field',
                    {inputRef}
                );
            }
        }
    }

    function validateField(name: string, value: string | number | [string | number] | undefined) {
        const validateFunctions = fieldProps[name].validation;
        let fieldError: string | undefined;

        if (validateFunctions) {
            const fieldValidation = (isArray(validateFunctions)) ? validateFunctions : [validateFunctions];

            // Using the lodash transform to run until it finds the first error
            // This way it only shows one validation error at a time until
            // they are all gone if there are multiples.
            transform(fieldValidation, (returnFieldErrors, validator) => {
                if (!isFunction(validator)) {
                    // eslint-disable-next-line
                    console.error('useFormController: Field validators must be functions', {validator})
                } else {
                    fieldError = validator(value);
                }


                return !fieldError;
            });

            if (fieldError) {
                setFieldErrors({...fieldErrors, [name]: fieldError});
            } else {
                setFieldErrors(omit(fieldErrors, name));
            }
        }

        return fieldError;
    }

    function getFieldsToValidate(): string[] {
        let fieldsToValidate:string[] = [];

        forEach(fieldProps, (fieldProp, key) => {
            if (fieldProp.validation) {
                fieldsToValidate.push(key)
            }
        })

        return fieldsToValidate;
    }

    function validateAllFields() {
        let fieldsHaveError;

        transform(getFieldsToValidate(), (fieldErrors: Object, fieldName: string) => {
            const fieldError = validateField(
                fieldName,
                fieldRefs[fieldName].value,
            );

            fieldsHaveError = !!fieldError
            return !fieldError;
        });

        return fieldsHaveError;
    }

    function handleFieldChange(event: React.FormEvent<HTMLInputElement>): void {
        event.preventDefault();

        const {
            checked,
            name,
            type,
            value
        } = event.currentTarget;

        setFormValuesState({
            name,
            checked,
            type,
            value,
        });
        validateField(name, value);
    }

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let fieldsHaveError;

        setFormIsSubmitting(true);

        if (!initialSubmit) {
            // Validating all fields for autofill values if there hasn't been an initial submit
            fieldsHaveError = validateAllFields();
        }

        if (!fieldsHaveError) {
            executeForm();
        }

        setInitialSubmit(true);
    }

    async function executeForm() {
        await (onSubmit instanceof Promise)
            ? onSubmit()
            : Promise.resolve(onSubmit());

        setFormIsSubmitting(false);
    }

    const submitButtonProps = {
        disabled: !!(formIsSubmitting || (!initialSubmit && !isEmpty(fieldErrors))),
    }

    const formFieldProps = {
        disabled: !!formIsSubmitting,
        onChange: handleFieldChange,
        ref: initField,
    }

    const formProps = {
        onSubmit: handleFormSubmit
    };

    return {
        fieldErrors,
        formValues,
        formProps,
        fieldProps: formFieldProps,
        submitButtonProps,
    };

}
