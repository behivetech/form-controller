import * as React from 'react';
import * as lodash from 'lodash';

const {useEffect, useState} = React;
const {
    endsWith,
    forEach,
    get,
    isArray,
    isEmpty,
    isFunction,
    mapValues,
    omit,
    set,
    transform,
} = lodash;

interface useFormControllerArgs {
    fieldProps: {
        /**
            The key used here will be the name attribute of the field. It should be a unique
            name. This key will be the default value for the formValuePath if that key isn't set.
            It is important to NOT set a name attribue in the element's/component's props and
            override this key; otherwise, the value will not be set properly for the form values
            or the state value of this field. If you are trying to pass an array of values for
            checkboxes, use a unique name here for each checkbox such as myCheckbox1, myCheckbox2,
            etc. and set the formValuePath to the same key you want it to use with an angle bracket,
            as in [] at the end of the name. See formValuePath on how to do that.
        */
        [key: string]: {
            /** The inital checked value for a checkbox field which can be changed by the parent */
            checked?: boolean | undefined
            /** If true, this fieldValue will not be submitted with the form values */
            doNotSubmit?: boolean
            /**
                Defaults to the key of this object if not set.
                This is a param for the lodash get/set functions to be able to set the form values as you need.
                This makes it possible to build an object in the form values as desired such as if you
                set the formValuePath to my.field.path.field1, it would submit the value in an object
                like this...
                {
                    my: {
                        field: {
                            path: {field1: 'value of field1'}
                        }
                    }
                }
                If you add angle brackets at the end as in [], this will add/remove values to an array which
                is handy for a set of checkboxes you'd like to send an array of values for each checkbox
                that is checked. For instance, if used set formValuePath to myCheckbox[] on multiple
                checkboxes in the form, it would submit a value like this...
                {
                    myCheckbox: ['value of first checkbox checked', 'value of second checkbox checked']
                }
                The empty angle brackets, [], can only go at the end of the formValuePath. Anything else
                within the path must have an index number like my.field[0].path[].
            */
            formValuePath?: string | string[]
            /** Alternate key to be used for the ref for components that use other keys such as inputRef instead */
            inputRefKey?: string
            /** Callback function to run at the end of the onChange event of the element */
            onAfterChange?: Function
            /** Callback function to run at the beginning of the onChange event of the element */
            onBeforeChange?: Function
            /**
                Other props to be added to the field props that will not be used by this hook.
                These can also be added to the component/element directly; however, it is available
                here as an optoin to keep all the props in one place.
            */
            otherProps?: object
            /**
                The type of input such as checked, radio, text, etc. This only needs to be set
                if it's something other than text.
            */
            type?: string
            /**
                A function or array of functions to run against the value of the field
                If the value passes it should return undefined. If not, it should return
                the desired field error such as "This field is required". The callback arguments
                are the current value of the field for the first argument and the field values of
                the other fields in the second argument in case validation needs to happen based
                on the value of another field.
            */
            validation?: (fieldValue: any, fieldValues: Object) => string | undefined | [(fieldValue: any, fieldValues: Object) => string | undefined]
            /** The inital value for the field which can be changed by the parent */
            value?: number | string | undefined
        }
    }
    formProps: {
        /**
            Overall desired form value to submit when the field is empty or checkbox isn't checked.
            This is typically the value you want to see on the backend. If this isn't set or
            the value is set to undefined, the key of the field will not be submitted with the
            form values object.
        */
        nullValue?: null | string | undefined
        /**
            Callback function to run at the beginning of the onSubmit event of the form element.
            This will execute before anything including the validation runs and will perform
            any time the onSubmit event is dispatched.
        */
        onBeforeSubmit?: Function
        /**
            Callback function to execute when all validation passes for the form and it's
            safe to submit. This is the function that should be used for the call to the
            backend or desired actions after everything passes from the form. If this function
            does not return a Promise, this custom hook will add one.
        */
        onExecuteSubmit?: Function
        /**
            Callback function to execute after the Promise from onExecuteSubmit has been
            resolved. This is the function to use for succesful submits such as closing
            a modal, navigating to a new page or showing a success message.
        */
        onAfterSubmit?: Function
        /**
            Other props to be added to the form props that will not be used by this hook.
            These can also be added to the component/element directly; however, it is available
            here as an optoin to keep all the props in one place..
        */
        otherProps?: Object
        /**
            Boolean to indicated if there are other submission factors going on which
            will ulitimately disable all fields and submit button
        */
        formIsSubmitting?: boolean | undefined
    }
}

interface useFormControllerResponse {
    fieldErrors: {
        [key: string]: string
    }
    formIsSubmitting: boolean
    getFormProps: () => ({
        [key: string]: {
            onSubmit: Function
        }
    })
    getFieldProps: () => ({
        checked?: boolean
        disabled?: boolean
        name: string
        ref?: Function
        [key: string]: Function
        value: string | number | null
    })
    submitButtonProps: {
        disabled: boolean | undefined;
    }
    updateFieldProps: Function
}

interface fieldState {
    [key: string]: {
        checked?: boolean | undefined
        ref?: any // Probably should find the right type for this
        type?: string
        value?: string | number | undefined
    }
}

interface fieldErrors {
    [key: string]: string
}

export default function useFormController<useFormControllerResponse>({
    fieldProps,
    formProps,
}: useFormControllerArgs) {
    const [fieldState, setFieldState] = useState<fieldState>(
        mapValues(fieldProps, ({checked, type, value}) => {
            return {checked, type, value}
        })
    );
    const [fieldErrors, setFieldErrors] = useState<fieldErrors>({});
    const [formIsSubmitting, setFormIsSubmitting] = useState<boolean>(false);
    const [initialSubmit, setInitialSubmit] = useState<boolean>(false);
    const [executeFieldPropUpdate, setExecuteFieldPropUpdate] = useState<boolean>(false);

    useEffect(() => {
        if (executeFieldPropUpdate) {
            let newFieldState = {...fieldState};

            forEach(fieldProps, (fieldObj, fieldName) => {
                newFieldState = {
                      ...newFieldState,
                      [fieldName]: {
                          ...newFieldState[fieldName],
                          ...fieldObj,
                      }
                }
            });

            setFieldState(newFieldState);
            setExecuteFieldPropUpdate(false);
        }
    },[executeFieldPropUpdate, fieldProps, fieldState])

    function updateFieldProps() {
        setExecuteFieldPropUpdate(true);
    }

    function setField(
        name: string,
        payload: {
            checked?: boolean | undefined
            ref?: any // Probably should find the right type for this
            type?: string
            value?: string | number | undefined
    }) {
        setFieldState({
              ...fieldState,
              [name]: {
                  ...fieldState[name],
                  ...payload,
              }
        });
    }

    function getFormValues(): {[key: string]: any} {
        let formValues = {};

        forEach(fieldState, ({checked, ref = {}, value}, fieldName) => {
            if (!fieldProps[fieldName].doNotSubmit) {
                const typeIsCheckbox = (
                    fieldProps[fieldName].type === 'checkbox' ||
                    fieldProps[fieldName].type === 'radio'
                );
                const nullValue = (typeIsCheckbox)
                    ? undefined
                    : formProps.nullValue;
                const formValue = (checked || (!typeIsCheckbox && value && value !== ''))
                    ? value
                    : nullValue;

                if (formValue !== undefined) {
                    const formValuePath = fieldProps[fieldName].formValuePath || fieldName;
                    let setPath = (isArray(formValuePath))
                        ? formValuePath.join('.').replace('.[', '.').replace('].', '.')
                        : formValuePath;

                    if (endsWith(formValuePath.toString(), '[]')) {
                        setPath = setPath.replace('[]', '');
                        const currentFormValue =  get(formValues, setPath) || [];

                        set(formValues, setPath, [...currentFormValue, formValue]);
                    } else {
                        set(formValues, setPath, formValue);
                    }
                }
            }
        });

        return formValues;
    }

    function initField<HtmlInputElement>(inputRef: any) {
        if (inputRef !== null) {
            // Some componet libraries return inputElement as the actual ref
            // May need to add more if other libraries are used
            const inputElement = get(inputRef, 'inputElement') || inputRef;
            if (inputElement) {
                const {name} = inputElement;

                if (!name) {
                    // eslint-disable-next-line
                    console.error(
                        'useFormController: A name attribute must be specified for this element',
                        {inputElement}
                    );
                } else if (!get(fieldState, [name, 'ref'])) {
                    setField(name, {ref: inputElement});
                }
            } else {
                // eslint-disable-next-line
                console.error(
                    'useFormController: Could not set a ref for this form field',
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
                    // TODO: Probably need to memoize getFormValues or something
                    const fieldValues = getFormValues();

                    fieldError = validator(fieldValues[name], fieldValues);
                }


                return !fieldError;
            });

            if (fieldError) {
                setFieldErrors({
                    ...fieldErrors,
                    [name]: fieldError,
                })
            } else {
                setFieldErrors(omit(fieldErrors, name))
            }
        }

        return fieldError;
    }

    function getFieldsToValidate(): string[] {
        let fieldsToValidate:string[] = [];

        forEach(fieldProps, (fieldProp, fieldName) => {
            if (fieldProp.validation) {
                fieldsToValidate.push(fieldName)
            }
        })

        return fieldsToValidate;
    }

    function validateAllFields():boolean {
        let fieldsHaveError = false;

        transform(getFieldsToValidate(), (fieldErrors: Object, fieldName: string) => {
            const fieldError = validateField(
                fieldName,
                fieldState[fieldName].ref.value,
            );

            fieldsHaveError = !!fieldError
            return !fieldError;
        });

        return fieldsHaveError;
    }

    function handleFieldChange(event: React.FormEvent<HTMLInputElement>): void {
        const {
            checked,
            name,
            type,
            value
        } = event.currentTarget || {
            checked: false,
            name: 'nameNotSupplied',
            type: 'text',
            value: undefined,
        };

        setField(name, {
            checked: (checked === true) ? true : false,
            type,
            value,
        });
        validateField(name, value);
    }

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let fieldsHaveError;
        const onBeforeSubmit = get(formProps, 'onBeforeSubmit', () => null);

        onBeforeSubmit();

        if (!validateAllFields()) {
            executeForm();
        }

        setInitialSubmit(true);
    }

    async function executeForm() {
        const onExecuteSubmit = get(formProps, 'onExecuteSubmit', (formValues: object) => null);
        const onAfterSubmit = get(formProps, 'onAfterSubmit', () => null);
        const formValues = getFormValues();

        setFormIsSubmitting(true);
        await (onExecuteSubmit instanceof Promise)
            ? onExecuteSubmit(formValues)
            : Promise.resolve(onExecuteSubmit(formValues));

        setFormIsSubmitting(false);
        onAfterSubmit();
    }

    function isFormSubmitting() {
        return !!(formIsSubmitting || formProps.formIsSubmitting)
    }

    const submitButtonProps = {
        disabled: !!(
            isFormSubmitting() ||
            (initialSubmit && !isEmpty(fieldErrors))
        )
    }

    function getFieldProps(name: string) {
        const {checked, value} = get(fieldState, [name], {}) as any;
        const {inputRefKey, type, otherProps} = get(fieldProps, [name], {}) as any;

        return {
            checked,
            disabled: isFormSubmitting(),
            name,
            onChange: handleFieldChange,
            [inputRefKey || 'ref']: initField,
            type: type || 'text',
            value,
            ...otherProps || {},
        }
    }

    function getFormProps() {
        return {
            onSubmit: handleFormSubmit,
            ...formProps.otherProps,
        }
    }

    return {
        fieldErrors: (initialSubmit) ? fieldErrors : {},
        formIsSubmitting: isFormSubmitting(),
        getFormValues,
        getFormProps,
        getFieldProps,
        submitButtonProps,
        updateFieldProps,
    };

}
