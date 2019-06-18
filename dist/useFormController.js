"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFormController;

var React = _interopRequireWildcard(require("react"));

var lodash = _interopRequireWildcard(require("lodash"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useEffect = React.useEffect,
    useState = React.useState;
var endsWith = lodash.endsWith,
    forEach = lodash.forEach,
    get = lodash.get,
    isArray = lodash.isArray,
    isEmpty = lodash.isEmpty,
    isFunction = lodash.isFunction,
    mapValues = lodash.mapValues,
    omit = lodash.omit,
    set = lodash.set,
    transform = lodash.transform;

function useFormController(_ref) {
  var fieldProps = _ref.fieldProps,
      formProps = _ref.formProps;

  var _useState = useState(mapValues(fieldProps, function (_ref2) {
    var checked = _ref2.checked,
        type = _ref2.type,
        value = _ref2.value;
    return {
      checked: checked,
      type: type,
      value: value
    };
  })),
      _useState2 = _slicedToArray(_useState, 2),
      fieldState = _useState2[0],
      setFieldState = _useState2[1];

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      fieldErrors = _useState4[0],
      setFieldErrors = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      formIsSubmitting = _useState6[0],
      setFormIsSubmitting = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      initialSubmit = _useState8[0],
      setInitialSubmit = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      executeFieldPropUpdate = _useState10[0],
      setExecuteFieldPropUpdate = _useState10[1];

  useEffect(function () {
    if (executeFieldPropUpdate) {
      var newFieldState = _objectSpread({}, fieldState);

      forEach(fieldProps, function (fieldObj, fieldName) {
        newFieldState = _objectSpread({}, newFieldState, _defineProperty({}, fieldName, _objectSpread({}, newFieldState[fieldName], fieldObj)));
      });
      setFieldState(newFieldState);
      setExecuteFieldPropUpdate(false);
    }
  }, [executeFieldPropUpdate, fieldProps, fieldState]);

  function updateFieldProps() {
    setExecuteFieldPropUpdate(true);
  }

  function setField(name, payload) {
    setFieldState(_objectSpread({}, fieldState, _defineProperty({}, name, _objectSpread({}, fieldState[name], payload))));
  }

  function getFormValues() {
    var formValues = {};
    forEach(fieldState, function (_ref3, fieldName) {
      var checked = _ref3.checked,
          _ref3$ref = _ref3.ref,
          ref = _ref3$ref === void 0 ? {} : _ref3$ref,
          value = _ref3.value;

      if (!fieldProps[fieldName].doNotSubmit) {
        var typeIsCheckbox = fieldProps[fieldName].type === 'checkbox' || fieldProps[fieldName].type === 'radio';
        var nullValue = typeIsCheckbox ? undefined : formProps.nullValue;
        var formValue = checked || !typeIsCheckbox && value && value !== '' ? value : nullValue;

        if (formValue !== undefined) {
          var formValuePath = fieldProps[fieldName].formValuePath || fieldName;
          var setPath = isArray(formValuePath) ? formValuePath.join('.').replace('.[', '.').replace('].', '.') : formValuePath;

          if (endsWith(formValuePath.toString(), '[]')) {
            setPath = setPath.replace('[]', '');
            var currentFormValue = get(formValues, setPath) || [];
            set(formValues, setPath, [].concat(_toConsumableArray(currentFormValue), [formValue]));
          } else {
            set(formValues, setPath, formValue);
          }
        }
      }
    });
    return formValues;
  }

  function initField(inputRef) {
    if (inputRef !== null) {
      // Some componet libraries return inputElement as the actual ref
      // May need to add more if other libraries are used
      var inputElement = get(inputRef, 'inputElement') || inputRef;

      if (inputElement) {
        var name = inputElement.name;

        if (!name) {
          // eslint-disable-next-line
          console.error('useFormController: A name attribute must be specified for this element', {
            inputElement: inputElement
          });
        } else if (!get(fieldState, [name, 'ref'])) {
          setField(name, {
            ref: inputElement
          });
        }
      } else {
        // eslint-disable-next-line
        console.error('useFormController: Could not set a ref for this form field', {
          inputRef: inputRef
        });
      }
    }
  }

  function validateField(name, value) {
    var validateFunctions = fieldProps[name].validation;
    var fieldError;

    if (validateFunctions) {
      var fieldValidation = isArray(validateFunctions) ? validateFunctions : [validateFunctions]; // Using the lodash transform to run until it finds the first error
      // This way it only shows one validation error at a time until
      // they are all gone if there are multiples.

      transform(fieldValidation, function (returnFieldErrors, validator) {
        if (!isFunction(validator)) {
          // eslint-disable-next-line
          console.error('useFormController: Field validators must be functions', {
            validator: validator
          });
        } else {
          // TODO: Probably need to memoize getFormValues or something
          fieldError = validator(value, getFormValues);
        }

        return !fieldError;
      });

      if (fieldError) {
        setFieldErrors(_objectSpread({}, fieldErrors, _defineProperty({}, name, fieldError)));
      } else {
        setFieldErrors(omit(fieldErrors, name));
      }
    }

    return fieldError;
  }

  function getFieldsToValidate() {
    var fieldsToValidate = [];
    forEach(fieldProps, function (fieldProp, fieldName) {
      if (fieldProp.validation) {
        fieldsToValidate.push(fieldName);
      }
    });
    return fieldsToValidate;
  }

  function validateAllFields() {
    var fieldsHaveError = false;
    transform(getFieldsToValidate(), function (fieldErrors, fieldName) {
      var fieldError = validateField(fieldName, fieldState[fieldName].ref.value);
      fieldsHaveError = !!fieldError;
      return !fieldError;
    });
    return fieldsHaveError;
  }

  function handleFieldChange(event) {
    var _ref4 = event.currentTarget || {
      checked: false,
      name: 'nameNotSupplied',
      type: 'text',
      value: undefined
    },
        checked = _ref4.checked,
        name = _ref4.name,
        type = _ref4.type,
        value = _ref4.value;

    setField(name, {
      checked: checked === true ? true : false,
      type: type,
      value: value
    });
    validateField(name, value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    var fieldsHaveError;
    var onBeforeSubmit = get(formProps, 'onBeforeSubmit', function () {
      return null;
    });
    onBeforeSubmit();

    if (!initialSubmit) {
      // Validating all fields for autofill values if there hasn't been an initial submit
      fieldsHaveError = validateAllFields();
    }

    if (!fieldsHaveError) {
      executeForm();
    }

    setInitialSubmit(true);
  }

  function executeForm() {
    return _executeForm.apply(this, arguments);
  }

  function _executeForm() {
    _executeForm = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var onExecuteSubmit, onAfterSubmit, formValues;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              onExecuteSubmit = get(formProps, 'onExecuteSubmit', function (formValues) {
                return null;
              });
              onAfterSubmit = get(formProps, 'onAfterSubmit', function () {
                return null;
              });
              formValues = getFormValues();
              setFormIsSubmitting(true);
              _context.next = 6;
              return onExecuteSubmit instanceof Promise;

            case 6:
              if (!_context.sent) {
                _context.next = 10;
                break;
              }

              onExecuteSubmit(formValues);
              _context.next = 11;
              break;

            case 10:
              Promise.resolve(onExecuteSubmit(formValues));

            case 11:
              setFormIsSubmitting(false);
              onAfterSubmit();

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _executeForm.apply(this, arguments);
  }

  var submitButtonProps = {
    disabled: !!(formIsSubmitting || initialSubmit && !isEmpty(fieldErrors))
  };

  function getFieldProps(name) {
    var _ref5 = get(fieldState, [name], {}),
        checked = _ref5.checked,
        value = _ref5.value;

    var _ref6 = get(fieldProps, [name], {}),
        type = _ref6.type,
        otherProps = _ref6.otherProps;

    return _objectSpread({
      checked: checked,
      disabled: !!formIsSubmitting,
      name: name,
      onChange: handleFieldChange,
      ref: initField,
      type: type || 'text',
      value: value
    }, otherProps || {});
  }

  function getFormProps() {
    return _objectSpread({
      onSubmit: handleFormSubmit
    }, formProps.otherProps);
  }

  return {
    fieldErrors: initialSubmit ? fieldErrors : {},
    getFormValues: getFormValues,
    getFormProps: getFormProps,
    getFieldProps: getFieldProps,
    submitButtonProps: submitButtonProps,
    updateFieldProps: updateFieldProps
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VGb3JtQ29udHJvbGxlci50c3giXSwibmFtZXMiOlsidXNlRWZmZWN0IiwiUmVhY3QiLCJ1c2VTdGF0ZSIsImVuZHNXaXRoIiwibG9kYXNoIiwiZm9yRWFjaCIsImdldCIsImlzQXJyYXkiLCJpc0VtcHR5IiwiaXNGdW5jdGlvbiIsIm1hcFZhbHVlcyIsIm9taXQiLCJzZXQiLCJ0cmFuc2Zvcm0iLCJ1c2VGb3JtQ29udHJvbGxlciIsImZpZWxkUHJvcHMiLCJmb3JtUHJvcHMiLCJjaGVja2VkIiwidHlwZSIsInZhbHVlIiwiZmllbGRTdGF0ZSIsInNldEZpZWxkU3RhdGUiLCJmaWVsZEVycm9ycyIsInNldEZpZWxkRXJyb3JzIiwiZm9ybUlzU3VibWl0dGluZyIsInNldEZvcm1Jc1N1Ym1pdHRpbmciLCJpbml0aWFsU3VibWl0Iiwic2V0SW5pdGlhbFN1Ym1pdCIsImV4ZWN1dGVGaWVsZFByb3BVcGRhdGUiLCJzZXRFeGVjdXRlRmllbGRQcm9wVXBkYXRlIiwibmV3RmllbGRTdGF0ZSIsImZpZWxkT2JqIiwiZmllbGROYW1lIiwidXBkYXRlRmllbGRQcm9wcyIsInNldEZpZWxkIiwibmFtZSIsInBheWxvYWQiLCJnZXRGb3JtVmFsdWVzIiwiZm9ybVZhbHVlcyIsInJlZiIsImRvTm90U3VibWl0IiwidHlwZUlzQ2hlY2tib3giLCJudWxsVmFsdWUiLCJ1bmRlZmluZWQiLCJmb3JtVmFsdWUiLCJmb3JtVmFsdWVQYXRoIiwic2V0UGF0aCIsImpvaW4iLCJyZXBsYWNlIiwidG9TdHJpbmciLCJjdXJyZW50Rm9ybVZhbHVlIiwiaW5pdEZpZWxkIiwiaW5wdXRSZWYiLCJpbnB1dEVsZW1lbnQiLCJjb25zb2xlIiwiZXJyb3IiLCJ2YWxpZGF0ZUZpZWxkIiwidmFsaWRhdGVGdW5jdGlvbnMiLCJ2YWxpZGF0aW9uIiwiZmllbGRFcnJvciIsImZpZWxkVmFsaWRhdGlvbiIsInJldHVybkZpZWxkRXJyb3JzIiwidmFsaWRhdG9yIiwiZ2V0RmllbGRzVG9WYWxpZGF0ZSIsImZpZWxkc1RvVmFsaWRhdGUiLCJmaWVsZFByb3AiLCJwdXNoIiwidmFsaWRhdGVBbGxGaWVsZHMiLCJmaWVsZHNIYXZlRXJyb3IiLCJoYW5kbGVGaWVsZENoYW5nZSIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsImhhbmRsZUZvcm1TdWJtaXQiLCJwcmV2ZW50RGVmYXVsdCIsIm9uQmVmb3JlU3VibWl0IiwiZXhlY3V0ZUZvcm0iLCJvbkV4ZWN1dGVTdWJtaXQiLCJvbkFmdGVyU3VibWl0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJzdWJtaXRCdXR0b25Qcm9wcyIsImRpc2FibGVkIiwiZ2V0RmllbGRQcm9wcyIsIm90aGVyUHJvcHMiLCJvbkNoYW5nZSIsImdldEZvcm1Qcm9wcyIsIm9uU3VibWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFT0EsUyxHQUF1QkMsSyxDQUF2QkQsUztJQUFXRSxRLEdBQVlELEssQ0FBWkMsUTtJQUVkQyxRLEdBVUFDLE0sQ0FWQUQsUTtJQUNBRSxPLEdBU0FELE0sQ0FUQUMsTztJQUNBQyxHLEdBUUFGLE0sQ0FSQUUsRztJQUNBQyxPLEdBT0FILE0sQ0FQQUcsTztJQUNBQyxPLEdBTUFKLE0sQ0FOQUksTztJQUNBQyxVLEdBS0FMLE0sQ0FMQUssVTtJQUNBQyxTLEdBSUFOLE0sQ0FKQU0sUztJQUNBQyxJLEdBR0FQLE0sQ0FIQU8sSTtJQUNBQyxHLEdBRUFSLE0sQ0FGQVEsRztJQUNBQyxTLEdBQ0FULE0sQ0FEQVMsUzs7QUErSVcsU0FBU0MsaUJBQVQsT0FHVztBQUFBLE1BRnRCQyxVQUVzQixRQUZ0QkEsVUFFc0I7QUFBQSxNQUR0QkMsU0FDc0IsUUFEdEJBLFNBQ3NCOztBQUFBLGtCQUNjZCxRQUFRLENBQ3hDUSxTQUFTLENBQUNLLFVBQUQsRUFBYSxpQkFBNEI7QUFBQSxRQUExQkUsT0FBMEIsU0FBMUJBLE9BQTBCO0FBQUEsUUFBakJDLElBQWlCLFNBQWpCQSxJQUFpQjtB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QUUsQ0FBQyxDQUFDekQsZ0JBRmhCO0FBR0lXLE1BQUFBLElBQUksRUFBSkEsSUFISjtBQUlJaUQsTUFBQUEsUUFBUSxFQUFFZixpQkFKZDtBQUtJOUIsTUFBQUEsR0FBRyxFQUFFWSxTQUxUO0FBTUlqQyxNQUFBQSxJQUFJLEVBQUVBLElBQUksSUFBSSxNQU5sQjtBQU9JQyxNQUFBQSxLQUFLLEVBQUxBO0FBUEosT0FRT2dFLFVBQVUsSUFBSSxFQVJyQjtBQVVIOztBQUVELFdBQVNFLFlBQVQsR0FBd0I7QUFDcEI7QUFDSUMsTUFBQUEsUUFBUSxFQUFFZDtBQURkLE9BRU94RCxTQUFTLENBQUNtRSxVQUZqQjtBQUlIOztBQUVELFNBQU87QUFDSDdELElBQUFBLFdBQVcsRUFBR0ksYUFBRCxHQUFrQkosV0FBbEIsR0FBZ0MsRUFEMUM7QUFFSGUsSUFBQUEsYUFBYSxFQUFiQSxhQUZHO0FBR0hnRCxJQUFBQSxZQUFZLEVBQVpBLFlBSEc7QUFJSEgsSUFBQUEsYUFBYSxFQUFiQSxhQUpHO0FBS0hGLElBQUFBLGlCQUFpQixFQUFqQkEsaUJBTEc7QUFNSC9DLElBQUFBLGdCQUFnQixFQUFoQkE7QUFORyxHQUFQO0FBU0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBsb2Rhc2ggZnJvbSAnbG9kYXNoJztcblxuY29uc3Qge3VzZUVmZmVjdCwgdXNlU3RhdGV9ID0gUmVhY3Q7XG5jb25zdCB7XG4gICAgZW5kc1dpdGgsXG4gICAgZm9yRWFjaCxcbiAgICBnZXQsXG4gICAgaXNBcnJheSxcbiAgICBpc0VtcHR5LFxuICAgIGlzRnVuY3Rpb24sXG4gICAgbWFwVmFsdWVzLFxuICAgIG9taXQsXG4gICAgc2V0LFxuICAgIHRyYW5zZm9ybSxcbn0gPSBsb2Rhc2g7XG5cbmludGVyZmFjZSB1c2VGb3JtQ29udHJvbGxlckFyZ3Mge1xuICAgIGZpZWxkUHJvcHM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAgICBUaGUga2V5IHVzZWQgaGVyZSB3aWxsIGJlIHRoZSBuYW1lIGF0dHJpYnV0ZSBvZiB0aGUgZmllbGQuIEl0IHNob3VsZCBiZSBhIHVuaXF1ZVxuICAgICAgICAgICAgbmFtZS4gVGhpcyBrZXkgd2lsbCBiZSB0aGUgZGVmYXVsdCB2YWx1ZSBmb3IgdGhlIGZvcm1WYWx1ZVBhdGggaWYgdGhhdCBrZXkgaXNuJ3Qgc2V0LlxuICAgICAgICAgICAgSXQgaXMgaW1wb3J0YW50IHRvIE5PVCBzZXQgYSBuYW1lIGF0dHJpYnVlIGluIHRoZSBlbGVtZW50J3MvY29tcG9uZW50J3MgcHJvcHMgYW5kXG4gICAgICAgICAgICBvdmVycmlkZSB0aGlzIGtleTsgb3RoZXJ3aXNlLCB0aGUgdmFsdWUgd2lsbCBub3QgYmUgc2V0IHByb3Blcmx5IGZvciB0aGUgZm9ybSB2YWx1ZXNcbiAgICAgICAgICAgIG9yIHRoZSBzdGF0ZSB2YWx1ZSBvZiB0aGlzIGZpZWxkLiBJZiB5b3UgYXJlIHRyeWluZyB0byBwYXNzIGFuIGFycmF5IG9mIHZhbHVlcyBmb3JcbiAgICAgICAgICAgIGNoZWNrYm94ZXMsIHVzZSBhIHVuaXF1ZSBuYW1lIGhlcmUgZm9yIGVhY2ggY2hlY2tib3ggc3VjaCBhcyBteUNoZWNrYm94MSwgbXlDaGVja2JveDIsXG4gICAgICAgICAgICBldGMuIGFuZCBzZXQgdGhlIGZvcm1WYWx1ZVBhdGggdG8gdGhlIHNhbWUga2V5IHlvdSB3YW50IGl0IHRvIHVzZSB3aXRoIGFuIGFuZ2xlIGJyYWNrZXQsXG4gICAgICAgICAgICBhcyBpbiBbXSBhdCB0aGUgZW5kIG9mIHRoZSBuYW1lLiBTZWUgZm9ybVZhbHVlUGF0aCBvbiBob3cgdG8gZG8gdGhhdC5cbiAgICAgICAgKi9cbiAgICAgICAgW2tleTogc3RyaW5nXToge1xuICAgICAgICAgICAgLyoqIFRoZSBpbml0YWwgY2hlY2tlZCB2YWx1ZSBmb3IgYSBjaGVja2JveCBmaWVsZCB3aGljaCBjYW4gYmUgY2hhbmdlZCBieSB0aGUgcGFyZW50ICovXG4gICAgICAgICAgICBjaGVja2VkPzogYm9vbGVhbiB8IHVuZGVmaW5lZFxuICAgICAgICAgICAgLyoqIElmIHRydWUsIHRoaXMgZmllbGRWYWx1ZSB3aWxsIG5vdCBiZSBzdWJtaXR0ZWQgd2l0aCB0aGUgZm9ybSB2YWx1ZXMgKi9cbiAgICAgICAgICAgIGRvTm90U3VibWl0PzogYm9vbGVhblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgRGVmYXVsdHMgdG8gdGhlIGtleSBvZiB0aGlzIG9iamVjdCBpZiBub3Qgc2V0LlxuICAgICAgICAgICAgICAgIFRoaXMgaXMgYSBwYXJhbSBmb3IgdGhlIGxvZGFzaCBnZXQvc2V0IGZ1bmN0aW9ucyB0byBiZSBhYmxlIHRvIHNldCB0aGUgZm9ybSB2YWx1ZXMgYXMgeW91IG5lZWQuXG4gICAgICAgICAgICAgICAgVGhpcyBtYWtlcyBpdCBwb3NzaWJsZSB0byBidWlsZCBhbiBvYmplY3QgaW4gdGhlIGZvcm0gdmFsdWVzIGFzIGRlc2lyZWQgc3VjaCBhcyBpZiB5b3VcbiAgICAgICAgICAgICAgICBzZXQgdGhlIGZvcm1WYWx1ZVBhdGggdG8gbXkuZmllbGQucGF0aC5maWVsZDEsIGl0IHdvdWxkIHN1Ym1pdCB0aGUgdmFsdWUgaW4gYW4gb2JqZWN0XG4gICAgICAgICAgICAgICAgbGlrZSB0aGlzLi4uXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBteToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiB7ZmllbGQxOiAndmFsdWUgb2YgZmllbGQxJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBJZiB5b3UgYWRkIGFuZ2xlIGJyYWNrZXRzIGF0IHRoZSBlbmQgYXMgaW4gW10sIHRoaXMgd2lsbCBhZGQvcmVtb3ZlIHZhbHVlcyB0byBhbiBhcnJheSB3aGljaFxuICAgICAgICAgICAgICAgIGlzIGhhbmR5IGZvciBhIHNldCBvZiBjaGVja2JveGVzIHlvdSdkIGxpa2UgdG8gc2VuZCBhbiBhcnJheSBvZiB2YWx1ZXMgZm9yIGVhY2ggY2hlY2tib3hcbiAgICAgICAgICAgICAgICB0aGF0IGlzIGNoZWNrZWQuIEZvciBpbnN0YW5jZSwgaWYgdXNlZCBzZXQgZm9ybVZhbHVlUGF0aCB0byBteUNoZWNrYm94W10gb24gbXVsdGlwbGVcbiAgICAgICAgICAgICAgICBjaGVja2JveGVzIGluIHRoZSBmb3JtLCBpdCB3b3VsZCBzdWJtaXQgYSB2YWx1ZSBsaWtlIHRoaXMuLi5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG15Q2hlY2tib3g6IFsndmFsdWUgb2YgZmlyc3QgY2hlY2tib3ggY2hlY2tlZCcsICd2YWx1ZSBvZiBzZWNvbmQgY2hlY2tib3ggY2hlY2tlZCddXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFRoZSBlbXB0eSBhbmdsZSBicmFja2V0cywgW10sIGNhbiBvbmx5IGdvIGF0IHRoZSBlbmQgb2YgdGhlIGZvcm1WYWx1ZVBhdGguIEFueXRoaW5nIGVsc2VcbiAgICAgICAgICAgICAgICB3aXRoaW4gdGhlIHBhdGggbXVzdCBoYXZlIGFuIGluZGV4IG51bWJlciBsaWtlIG15LmZpZWxkWzBdLnBhdGhbXS5cbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBmb3JtVmFsdWVQYXRoPzogc3RyaW5nIHwgc3RyaW5nW11cbiAgICAgICAgICAgIC8qKiBDYWxsYmFjayBmdW5jdGlvbiB0byBydW4gYXQgdGhlIGVuZCBvZiB0aGUgb25DaGFuZ2UgZXZlbnQgb2YgdGhlIGVsZW1lbnQgKi9cbiAgICAgICAgICAgIG9uQWZ0ZXJDaGFuZ2U/OiBGdW5jdGlvblxuICAgICAgICAgICAgLyoqIENhbGxiYWNrIGZ1bmN0aW9uIHRvIHJ1biBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBvbkNoYW5nZSBldmVudCBvZiB0aGUgZWxlbWVudCAqL1xuICAgICAgICAgICAgb25CZWZvcmVDaGFuZ2U/OiBGdW5jdGlvblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgT3RoZXIgcHJvcHMgdG8gYmUgYWRkZWQgdG8gdGhlIGZpZWxkIHByb3BzIHRoYXQgd2lsbCBub3QgYmUgdXNlZCBieSB0aGlzIGhvb2suXG4gICAgICAgICAgICAgICAgVGhlc2UgY2FuIGFsc28gYmUgYWRkZWQgdG8gdGhlIGNvbXBvbmVudC9lbGVtZW50IGRpcmVjdGx5OyBob3dldmVyLCBpdCBpcyBhdmFpbGFibGVcbiAgICAgICAgICAgICAgICBoZXJlIGFzIGFuIG9wdG9pbiB0byBrZWVwIGFsbCB0aGUgcHJvcHMgaW4gb25lIHBsYWNlLlxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG90aGVyUHJvcHM/OiBvYmplY3RcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgIFRoZSB0eXBlIG9mIGlucHV0IHN1Y2ggYXMgY2hlY2tlZCwgcmFkaW8sIHRleHQsIGV0Yy4gVGhpcyBvbmx5IG5lZWRzIHRvIGJlIHNldFxuICAgICAgICAgICAgICAgIGlmIGl0J3Mgc29tZXRoaW5nIG90aGVyIHRoYW4gdGV4dC5cbiAgICAgICAgICAgICovXG4gICAgICAgICAgICB0eXBlPzogc3RyaW5nXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICBBIGZ1bmN0aW9uIG9yIGFycmF5IG9mIGZ1bmN0aW9ucyB0byBydW4gYWdhaW5zdCB0aGUgdmFsdWUgb2YgdGhlIGZpZWxkXG4gICAgICAgICAgICAgICAgSWYgdGhlIHZhbHVlIHBhc3NlcyBpdCBzaG91bGQgcmV0dXJuIHVuZGVmaW5lZC4gSWYgbm90LCBpdCBzaG91bGQgcmV0dXJuXG4gICAgICAgICAgICAgICAgdGhlIGRlc2lyZWQgZmllbGQgZXJyb3Igc3VjaCBhcyBcIlRoaXMgZmllbGQgaXMgcmVxdWlyZWRcIi4gVGhlIGNhbGxiYWNrIGFyZ3VtZW50c1xuICAgICAgICAgICAgICAgIGFyZSB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgZmllbGQgZm9yIHRoZSBmaXJzdCBhcmd1bWVudCBhbmQgdGhlIGZpZWxkIHZhbHVlcyBvZlxuICAgICAgICAgICAgICAgIHRoZSBvdGhlciBmaWVsZHMgaW4gdGhlIHNlY29uZCBhcmd1bWVudCBpbiBjYXNlIHZhbGlkYXRpb24gbmVlZHMgdG8gaGFwcGVuIGJhc2VkXG4gICAgICAgICAgICAgICAgb24gdGhlIHZhbHVlIG9mIGFub3RoZXIgZmllbGQuXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgdmFsaWRhdGlvbj86IChmaWVsZFZhbHVlOiBhbnksIGZpZWxkVmFsdWVzOiBPYmplY3QpID0+IHN0cmluZyB8IHVuZGVmaW5lZCB8IFsoZmllbGRWYWx1ZTogYW55LCBmaWVsZFZhbHVlczogT2JqZWN0KSA9PiBzdHJpbmcgfCB1bmRlZmluZWRdXG4gICAgICAgICAgICAvKiogVGhlIGluaXRhbCB2YWx1ZSBmb3IgdGhlIGZpZWxkIHdoaWNoIGNhbiBiZSBjaGFuZ2VkIGJ5IHRoZSBwYXJlbnQgKi9cbiAgICAgICAgICAgIHZhbHVlPzogbnVtYmVyIHwgc3RyaW5nIHwgdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9ybVByb3BzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgICAgT3ZlcmFsbCBkZXNpcmVkIGZvcm0gdmFsdWUgdG8gc3VibWl0IHdoZW4gdGhlIGZpZWxkIGlzIGVtcHR5IG9yIGNoZWNrYm94IGlzbid0IGNoZWNrZWQuXG4gICAgICAgICAgICBUaGlzIGlzIHR5cGljYWxseSB0aGUgdmFsdWUgeW91IHdhbnQgdG8gc2VlIG9uIHRoZSBiYWNrZW5kLiBJZiB0aGlzIGlzbid0IHNldCBvclxuICAgICAgICAgICAgdGhlIHZhbHVlIGlzIHNldCB0byB1bmRlZmluZWQsIHRoZSBrZXkgb2YgdGhlIGZpZWxkIHdpbGwgbm90IGJlIHN1Ym1pdHRlZCB3aXRoIHRoZVxuICAgICAgICAgICAgZm9ybSB2YWx1ZXMgb2JqZWN0LlxuICAgICAgICAqL1xuICAgICAgICBudWxsVmFsdWU/OiBudWxsIHwgc3RyaW5nIHwgdW5kZWZpbmVkXG4gICAgICAgIC8qKlxuICAgICAgICAgICAgQ2FsbGJhY2sgZnVuY3Rpb24gdG8gcnVuIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIG9uU3VibWl0IGV2ZW50IG9mIHRoZSBmb3JtIGVsZW1lbnQuXG4gICAgICAgICAgICBUaGlzIHdpbGwgZXhlY3V0ZSBiZWZvcmUgYW55dGhpbmcgaW5jbHVkaW5nIHRoZSB2YWxpZGF0aW9uIHJ1bnMgYW5kIHdpbGwgcGVyZm9ybVxuICAgICAgICAgICAgYW55IHRpbWUgdGhlIG9uU3VibWl0IGV2ZW50IGlzIGRpc3BhdGNoZWQuXG4gICAgICAgICovXG4gICAgICAgIG9uQmVmb3JlU3VibWl0PzogRnVuY3Rpb25cbiAgICAgICAgLyoqXG4gICAgICAgICAgICBDYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gYWxsIHZhbGlkYXRpb24gcGFzc2VzIGZvciB0aGUgZm9ybSBhbmQgaXQnc1xuICAgICAgICAgICAgc2FmZSB0byBzdWJtaXQuIFRoaXMgaXMgdGhlIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIHVzZWQgZm9yIHRoZSBjYWxsIHRvIHRoZVxuICAgICAgICAgICAgYmFja2VuZCBvciBkZXNpcmVkIGFjdGlvbnMgYWZ0ZXIgZXZlcnl0aGluZyBwYXNzZXMgZnJvbSB0aGUgZm9ybS4gSWYgdGhpcyBmdW5jdGlvblxuICAgICAgICAgICAgZG9lcyBub3QgcmV0dXJuIGEgUHJvbWlzZSwgdGhpcyBjdXN0b20gaG9vayB3aWxsIGFkZCBvbmUuXG4gICAgICAgICovXG4gICAgICAgIG9uRXhlY3V0ZVN1Ym1pdD86IEZ1bmN0aW9uXG4gICAgICAgIC8qKlxuICAgICAgICAgICAgQ2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSBhZnRlciB0aGUgUHJvbWlzZSBmcm9tIG9uRXhlY3V0ZVN1Ym1pdCBoYXMgYmVlblxuICAgICAgICAgICAgcmVzb2x2ZWQuIFRoaXMgaXMgdGhlIGZ1bmN0aW9uIHRvIHVzZSBmb3Igc3VjY2VzZnVsIHN1Ym1pdHMgc3VjaCBhcyBjbG9zaW5nXG4gICAgICAgICAgICBhIG1vZGFsLCBuYXZpZ2F0aW5nIHRvIGEgbmV3IHBhZ2Ugb3Igc2hvd2luZyBhIHN1Y2Nlc3MgbWVzc2FnZS5cbiAgICAgICAgKi9cbiAgICAgICAgb25BZnRlclN1Ym1pdD86IEZ1bmN0aW9uXG4gICAgICAgIC8qKlxuICAgICAgICAgICAgT3RoZXIgcHJvcHMgdG8gYmUgYWRkZWQgdG8gdGhlIGZvcm0gcHJvcHMgdGhhdCB3aWxsIG5vdCBiZSB1c2VkIGJ5IHRoaXMgaG9vay5cbiAgICAgICAgICAgIFRoZXNlIGNhbiBhbHNvIGJlIGFkZGVkIHRvIHRoZSBjb21wb25lbnQvZWxlbWVudCBkaXJlY3RseTsgaG93ZXZlciwgaXQgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgICBoZXJlIGFzIGFuIG9wdG9pbiB0byBrZWVwIGFsbCB0aGUgcHJvcHMgaW4gb25lIHBsYWNlLi5cbiAgICAgICAgKi9cbiAgICAgICAgb3RoZXJQcm9wcz86IE9iamVjdFxuICAgIH1cbn1cblxuaW50ZXJmYWNlIHVzZUZvcm1Db250cm9sbGVyUmVzcG9uc2Uge1xuICAgIGZpZWxkRXJyb3JzOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1xuICAgIH1cbiAgICBnZXRGb3JtUHJvcHM6ICgpID0+ICh7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHtcbiAgICAgICAgICAgIG9uU3VibWl0OiBGdW5jdGlvblxuICAgICAgICB9XG4gICAgfSlcbiAgICBnZXRGaWVsZFByb3BzOiAoKSA9PiAoe1xuICAgICAgICBjaGVja2VkPzogYm9vbGVhblxuICAgICAgICBkaXNhYmxlZD86IGJvb2xlYW5cbiAgICAgICAgbmFtZTogc3RyaW5nXG4gICAgICAgIHJlZjogRnVuY3Rpb25cbiAgICAgICAgdmFsdWU6IHN0cmluZyB8IG51bWJlciB8IG51bGxcbiAgICB9KVxuICAgIHN1Ym1pdEJ1dHRvblByb3BzOiB7XG4gICAgICAgIGRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIH1cbiAgICB1cGRhdGVGaWVsZFByb3BzOiBGdW5jdGlvblxufVxuXG5pbnRlcmZhY2UgZmllbGRTdGF0ZSB7XG4gICAgW2tleTogc3RyaW5nXToge1xuICAgICAgICBjaGVja2VkPzogYm9vbGVhbiB8IHVuZGVmaW5lZFxuICAgICAgICByZWY/OiBhbnkgLy8gUHJvYmFibHkgc2hvdWxkIGZpbmQgdGhlIHJpZ2h0IHR5cGUgZm9yIHRoaXNcbiAgICAgICAgdHlwZT86IHN0cmluZ1xuICAgICAgICB2YWx1ZT86IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZFxuICAgIH1cbn1cblxuaW50ZXJmYWNlIGZpZWxkRXJyb3JzIHtcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmdcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlRm9ybUNvbnRyb2xsZXI8dXNlRm9ybUNvbnRyb2xsZXJSZXNwb25zZT4oe1xuICAgIGZpZWxkUHJvcHMsXG4gICAgZm9ybVByb3BzLFxufTogdXNlRm9ybUNvbnRyb2xsZXJBcmdzKSB7XG4gICAgY29uc3QgW2ZpZWxkU3RhdGUsIHNldEZpZWxkU3RhdGVdID0gdXNlU3RhdGU8ZmllbGRTdGF0ZT4oXG4gICAgICAgIG1hcFZhbHVlcyhmaWVsZFByb3BzLCAoe2NoZWNrZWQsIHR5cGUsIHZhbHVlfSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtjaGVja2VkLCB0eXBlLCB2YWx1ZX1cbiAgICAgICAgfSlcbiAgICApO1xuICAgIGNvbnN0IFtmaWVsZEVycm9ycywgc2V0RmllbGRFcnJvcnNdID0gdXNlU3RhdGU8ZmllbGRFcnJvcnM+KHt9KTtcbiAgICBjb25zdCBbZm9ybUlzU3VibWl0dGluZywgc2V0Rm9ybUlzU3VibWl0dGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3QgW2luaXRpYWxTdWJtaXQsIHNldEluaXRpYWxTdWJtaXRdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGNvbnN0IFtleGVjdXRlRmllbGRQcm9wVXBkYXRlLCBzZXRFeGVjdXRlRmllbGRQcm9wVXBkYXRlXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChleGVjdXRlRmllbGRQcm9wVXBkYXRlKSB7XG4gICAgICAgICAgICBsZXQgbmV3RmllbGRTdGF0ZSA9IHsuLi5maWVsZFN0YXRlfTtcblxuICAgICAgICAgICAgZm9yRWFjaChmaWVsZFByb3BzLCAoZmllbGRPYmosIGZpZWxkTmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIG5ld0ZpZWxkU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgLi4ubmV3RmllbGRTdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICBbZmllbGROYW1lXToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5uZXdGaWVsZFN0YXRlW2ZpZWxkTmFtZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmZpZWxkT2JqLFxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2V0RmllbGRTdGF0ZShuZXdGaWVsZFN0YXRlKTtcbiAgICAgICAgICAgIHNldEV4ZWN1dGVGaWVsZFByb3BVcGRhdGUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSxbZXhlY3V0ZUZpZWxkUHJvcFVwZGF0ZSwgZmllbGRQcm9wcywgZmllbGRTdGF0ZV0pXG5cbiAgICBmdW5jdGlvbiB1cGRhdGVGaWVsZFByb3BzKCkge1xuICAgICAgICBzZXRFeGVjdXRlRmllbGRQcm9wVXBkYXRlKHRydWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEZpZWxkKFxuICAgICAgICBuYW1lOiBzdHJpbmcsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIGNoZWNrZWQ/OiBib29sZWFuIHwgdW5kZWZpbmVkXG4gICAgICAgICAgICByZWY/OiBhbnkgLy8gUHJvYmFibHkgc2hvdWxkIGZpbmQgdGhlIHJpZ2h0IHR5cGUgZm9yIHRoaXNcbiAgICAgICAgICAgIHR5cGU/OiBzdHJpbmdcbiAgICAgICAgICAgIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkXG4gICAgfSkge1xuICAgICAgICBzZXRGaWVsZFN0YXRlKHtcbiAgICAgICAgICAgICAgLi4uZmllbGRTdGF0ZSxcbiAgICAgICAgICAgICAgW25hbWVdOiB7XG4gICAgICAgICAgICAgICAgICAuLi5maWVsZFN0YXRlW25hbWVdLFxuICAgICAgICAgICAgICAgICAgLi4ucGF5bG9hZCxcbiAgICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGb3JtVmFsdWVzKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICAgICAgbGV0IGZvcm1WYWx1ZXMgPSB7fTtcblxuICAgICAgICBmb3JFYWNoKGZpZWxkU3RhdGUsICh7Y2hlY2tlZCwgcmVmID0ge30sIHZhbHVlfSwgZmllbGROYW1lKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWZpZWxkUHJvcHNbZmllbGROYW1lXS5kb05vdFN1Ym1pdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGVJc0NoZWNrYm94ID0gKFxuICAgICAgICAgICAgICAgICAgICBmaWVsZFByb3BzW2ZpZWxkTmFtZV0udHlwZSA9PT0gJ2NoZWNrYm94JyB8fFxuICAgICAgICAgICAgICAgICAgICBmaWVsZFByb3BzW2ZpZWxkTmFtZV0udHlwZSA9PT0gJ3JhZGlvJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY29uc3QgbnVsbFZhbHVlID0gKHR5cGVJc0NoZWNrYm94KVxuICAgICAgICAgICAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICA6IGZvcm1Qcm9wcy5udWxsVmFsdWU7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gKGNoZWNrZWQgfHwgKCF0eXBlSXNDaGVja2JveCAmJiB2YWx1ZSAmJiB2YWx1ZSAhPT0gJycpKVxuICAgICAgICAgICAgICAgICAgICA/IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZvcm1WYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1WYWx1ZVBhdGggPSBmaWVsZFByb3BzW2ZpZWxkTmFtZV0uZm9ybVZhbHVlUGF0aCB8fCBmaWVsZE5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXRQYXRoID0gKGlzQXJyYXkoZm9ybVZhbHVlUGF0aCkpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGZvcm1WYWx1ZVBhdGguam9pbignLicpLnJlcGxhY2UoJy5bJywgJy4nKS5yZXBsYWNlKCddLicsICcuJylcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZm9ybVZhbHVlUGF0aDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZW5kc1dpdGgoZm9ybVZhbHVlUGF0aC50b1N0cmluZygpLCAnW10nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGF0aCA9IHNldFBhdGgucmVwbGFjZSgnW10nLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50Rm9ybVZhbHVlID0gIGdldChmb3JtVmFsdWVzLCBzZXRQYXRoKSB8fCBbXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KGZvcm1WYWx1ZXMsIHNldFBhdGgsIFsuLi5jdXJyZW50Rm9ybVZhbHVlLCBmb3JtVmFsdWVdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldChmb3JtVmFsdWVzLCBzZXRQYXRoLCBmb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZm9ybVZhbHVlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0RmllbGQ8SHRtbElucHV0RWxlbWVudD4oaW5wdXRSZWY6IGFueSkge1xuICAgICAgICBpZiAoaW5wdXRSZWYgIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIFNvbWUgY29tcG9uZXQgbGlicmFyaWVzIHJldHVybiBpbnB1dEVsZW1lbnQgYXMgdGhlIGFjdHVhbCByZWZcbiAgICAgICAgICAgIC8vIE1heSBuZWVkIHRvIGFkZCBtb3JlIGlmIG90aGVyIGxpYnJhcmllcyBhcmUgdXNlZFxuICAgICAgICAgICAgY29uc3QgaW5wdXRFbGVtZW50ID0gZ2V0KGlucHV0UmVmLCAnaW5wdXRFbGVtZW50JykgfHwgaW5wdXRSZWY7XG4gICAgICAgICAgICBpZiAoaW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3Qge25hbWV9ID0gaW5wdXRFbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VzZUZvcm1Db250cm9sbGVyOiBBIG5hbWUgYXR0cmlidXRlIG11c3QgYmUgc3BlY2lmaWVkIGZvciB0aGlzIGVsZW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAge2lucHV0RWxlbWVudH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFnZXQoZmllbGRTdGF0ZSwgW25hbWUsICdyZWYnXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RmllbGQobmFtZSwge3JlZjogaW5wdXRFbGVtZW50fSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgICAgICAndXNlRm9ybUNvbnRyb2xsZXI6IENvdWxkIG5vdCBzZXQgYSByZWYgZm9yIHRoaXMgZm9ybSBmaWVsZCcsXG4gICAgICAgICAgICAgICAgICAgIHtpbnB1dFJlZn1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVGaWVsZChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBbc3RyaW5nIHwgbnVtYmVyXSB8IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCB2YWxpZGF0ZUZ1bmN0aW9ucyA9IGZpZWxkUHJvcHNbbmFtZV0udmFsaWRhdGlvbjtcbiAgICAgICAgbGV0IGZpZWxkRXJyb3I6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAodmFsaWRhdGVGdW5jdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkVmFsaWRhdGlvbiA9IChpc0FycmF5KHZhbGlkYXRlRnVuY3Rpb25zKSkgPyB2YWxpZGF0ZUZ1bmN0aW9ucyA6IFt2YWxpZGF0ZUZ1bmN0aW9uc107XG5cbiAgICAgICAgICAgIC8vIFVzaW5nIHRoZSBsb2Rhc2ggdHJhbnNmb3JtIHRvIHJ1biB1bnRpbCBpdCBmaW5kcyB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgIC8vIFRoaXMgd2F5IGl0IG9ubHkgc2hvd3Mgb25lIHZhbGlkYXRpb24gZXJyb3IgYXQgYSB0aW1lIHVudGlsXG4gICAgICAgICAgICAvLyB0aGV5IGFyZSBhbGwgZ29uZSBpZiB0aGVyZSBhcmUgbXVsdGlwbGVzLlxuICAgICAgICAgICAgdHJhbnNmb3JtKGZpZWxkVmFsaWRhdGlvbiwgKHJldHVybkZpZWxkRXJyb3JzLCB2YWxpZGF0b3IpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzRnVuY3Rpb24odmFsaWRhdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcigndXNlRm9ybUNvbnRyb2xsZXI6IEZpZWxkIHZhbGlkYXRvcnMgbXVzdCBiZSBmdW5jdGlvbnMnLCB7dmFsaWRhdG9yfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBQcm9iYWJseSBuZWVkIHRvIG1lbW9pemUgZ2V0Rm9ybVZhbHVlcyBvciBzb21ldGhpbmdcbiAgICAgICAgICAgICAgICAgICAgZmllbGRFcnJvciA9IHZhbGlkYXRvcih2YWx1ZSwgZ2V0Rm9ybVZhbHVlcyk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gIWZpZWxkRXJyb3I7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGZpZWxkRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBzZXRGaWVsZEVycm9ycyh7XG4gICAgICAgICAgICAgICAgICAgIC4uLmZpZWxkRXJyb3JzLFxuICAgICAgICAgICAgICAgICAgICBbbmFtZV06IGZpZWxkRXJyb3IsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0RmllbGRFcnJvcnMob21pdChmaWVsZEVycm9ycywgbmFtZSkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmllbGRFcnJvcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGaWVsZHNUb1ZhbGlkYXRlKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgbGV0IGZpZWxkc1RvVmFsaWRhdGU6c3RyaW5nW10gPSBbXTtcblxuICAgICAgICBmb3JFYWNoKGZpZWxkUHJvcHMsIChmaWVsZFByb3AsIGZpZWxkTmFtZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGZpZWxkUHJvcC52YWxpZGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgZmllbGRzVG9WYWxpZGF0ZS5wdXNoKGZpZWxkTmFtZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gZmllbGRzVG9WYWxpZGF0ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUFsbEZpZWxkcygpOmJvb2xlYW4ge1xuICAgICAgICBsZXQgZmllbGRzSGF2ZUVycm9yID0gZmFsc2U7XG5cbiAgICAgICAgdHJhbnNmb3JtKGdldEZpZWxkc1RvVmFsaWRhdGUoKSwgKGZpZWxkRXJyb3JzOiBPYmplY3QsIGZpZWxkTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZEVycm9yID0gdmFsaWRhdGVGaWVsZChcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWUsXG4gICAgICAgICAgICAgICAgZmllbGRTdGF0ZVtmaWVsZE5hbWVdLnJlZi52YWx1ZSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGZpZWxkc0hhdmVFcnJvciA9ICEhZmllbGRFcnJvclxuICAgICAgICAgICAgcmV0dXJuICFmaWVsZEVycm9yO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmllbGRzSGF2ZUVycm9yO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUZpZWxkQ2hhbmdlKGV2ZW50OiBSZWFjdC5Gb3JtRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pOiB2b2lkIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgY2hlY2tlZCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgfSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQgfHwge1xuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgICBuYW1lOiAnbmFtZU5vdFN1cHBsaWVkJyxcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgIH07XG5cbiAgICAgICAgc2V0RmllbGQobmFtZSwge1xuICAgICAgICAgICAgY2hlY2tlZDogKGNoZWNrZWQgPT09IHRydWUpID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICB9KTtcbiAgICAgICAgdmFsaWRhdGVGaWVsZChuYW1lLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlRm9ybVN1Ym1pdChldmVudDogUmVhY3QuRm9ybUV2ZW50PEhUTUxGb3JtRWxlbWVudD4pIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgZmllbGRzSGF2ZUVycm9yO1xuICAgICAgICBjb25zdCBvbkJlZm9yZVN1Ym1pdCA9IGdldChmb3JtUHJvcHMsICdvbkJlZm9yZVN1Ym1pdCcsICgpID0+IG51bGwpO1xuXG4gICAgICAgIG9uQmVmb3JlU3VibWl0KCk7XG4gICAgICAgIGlmICghaW5pdGlhbFN1Ym1pdCkge1xuICAgICAgICAgICAgLy8gVmFsaWRhdGluZyBhbGwgZmllbGRzIGZvciBhdXRvZmlsbCB2YWx1ZXMgaWYgdGhlcmUgaGFzbid0IGJlZW4gYW4gaW5pdGlhbCBzdWJtaXRcbiAgICAgICAgICAgIGZpZWxkc0hhdmVFcnJvciA9IHZhbGlkYXRlQWxsRmllbGRzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWZpZWxkc0hhdmVFcnJvcikge1xuICAgICAgICAgICAgZXhlY3V0ZUZvcm0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEluaXRpYWxTdWJtaXQodHJ1ZSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUZvcm0oKSB7XG4gICAgICAgIGNvbnN0IG9uRXhlY3V0ZVN1Ym1pdCA9IGdldChmb3JtUHJvcHMsICdvbkV4ZWN1dGVTdWJtaXQnLCAoZm9ybVZhbHVlczogb2JqZWN0KSA9PiBudWxsKTtcbiAgICAgICAgY29uc3Qgb25BZnRlclN1Ym1pdCA9IGdldChmb3JtUHJvcHMsICdvbkFmdGVyU3VibWl0JywgKCkgPT4gbnVsbCk7XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZXMgPSBnZXRGb3JtVmFsdWVzKCk7XG5cbiAgICAgICAgc2V0Rm9ybUlzU3VibWl0dGluZyh0cnVlKTtcbiAgICAgICAgYXdhaXQgKG9uRXhlY3V0ZVN1Ym1pdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgICAgICA/IG9uRXhlY3V0ZVN1Ym1pdChmb3JtVmFsdWVzKVxuICAgICAgICAgICAgOiBQcm9taXNlLnJlc29sdmUob25FeGVjdXRlU3VibWl0KGZvcm1WYWx1ZXMpKTtcblxuICAgICAgICBzZXRGb3JtSXNTdWJtaXR0aW5nKGZhbHNlKTtcbiAgICAgICAgb25BZnRlclN1Ym1pdCgpO1xuICAgIH1cblxuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvblByb3BzID0ge1xuICAgICAgICBkaXNhYmxlZDogISEoXG4gICAgICAgICAgICBmb3JtSXNTdWJtaXR0aW5nIHx8XG4gICAgICAgICAgICAoaW5pdGlhbFN1Ym1pdCAmJiAhaXNFbXB0eShmaWVsZEVycm9ycykpXG4gICAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGaWVsZFByb3BzKG5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCB7Y2hlY2tlZCwgdmFsdWV9ID0gZ2V0KGZpZWxkU3RhdGUsIFtuYW1lXSwge30pIGFzIGFueTtcbiAgICAgICAgY29uc3Qge3R5cGUsIG90aGVyUHJvcHN9ID0gZ2V0KGZpZWxkUHJvcHMsIFtuYW1lXSwge30pIGFzIGFueTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2hlY2tlZCxcbiAgICAgICAgICAgIGRpc2FibGVkOiAhIWZvcm1Jc1N1Ym1pdHRpbmcsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgb25DaGFuZ2U6IGhhbmRsZUZpZWxkQ2hhbmdlLFxuICAgICAgICAgICAgcmVmOiBpbml0RmllbGQsXG4gICAgICAgICAgICB0eXBlOiB0eXBlIHx8ICd0ZXh0JyxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgLi4ub3RoZXJQcm9wcyB8fCB7fSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZvcm1Qcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uU3VibWl0OiBoYW5kbGVGb3JtU3VibWl0LFxuICAgICAgICAgICAgLi4uZm9ybVByb3BzLm90aGVyUHJvcHMsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmaWVsZEVycm9yczogKGluaXRpYWxTdWJtaXQpID8gZmllbGRFcnJvcnMgOiB7fSxcbiAgICAgICAgZ2V0Rm9ybVZhbHVlcyxcbiAgICAgICAgZ2V0Rm9ybVByb3BzLFxuICAgICAgICBnZXRGaWVsZFByb3BzLFxuICAgICAgICBzdWJtaXRCdXR0b25Qcm9wcyxcbiAgICAgICAgdXBkYXRlRmllbGRQcm9wcyxcbiAgICB9O1xuXG59XG4iXX0=