/// <reference types="react-scripts" />
"use strict";
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

  function isFormSubmitting() {
    return !!(formIsSubmitting || formProps.formIsSubmitting);
  }

  var submitButtonProps = {
    disabled: !!(isFormSubmitting() || initialSubmit && !isEmpty(fieldErrors))
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
      disabled: isFormSubmitting(),
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
    formIsSubmitting: isFormSubmitting(),
    getFormValues: getFormValues,
    getFormProps: getFormProps,
    getFieldProps: getFieldProps,
    submitButtonProps: submitButtonProps,
    updateFieldProps: updateFieldProps
  };
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWFjdC1hcHAtZW52LmQudHMiLCIuLi9zcmMvdXNlRm9ybUNvbnRyb2xsZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVPLFMsR0FBdUIsSyxDQUF2QixTO0lBQVcsUSxHQUFZLEssQ0FBWixRO0lBRWQsUSxHQVVBLE0sQ0FWQSxRO0lBQ0EsTyxHQVNBLE0sQ0FUQSxPO0lBQ0EsRyxHQVFBLE0sQ0FSQSxHO0lBQ0EsTyxHQU9BLE0sQ0FQQSxPO0lBQ0EsTyxHQU1BLE0sQ0FOQSxPO0lBQ0EsVSxHQUtBLE0sQ0FMQSxVO0lBQ0EsUyxHQUlBLE0sQ0FKQSxTO0lBQ0EsSSxHQUdBLE0sQ0FIQSxJO0lBQ0EsRyxHQUVBLE0sQ0FGQSxHO0lBQ0EsUyxHQUNBLE0sQ0FEQSxTOztBQXFKVyxTQUFTLGlCQUFULE9BR1c7QUFBQSxNQUZ0QixVQUVzQixRQUZ0QixVQUVzQjtBQUFBLE1BRHRCLFNBQ3NCLFFBRHRCLFNBQ3NCOztBQUFBLGtCQUNjLFFBQVEsQ0FDeEMsU0FBUyxDQUFDLFVBQUQsRUFBYSxpQkFBNEI7QUFBQSxRQUExQixPQUEwQixTQUExQixPQUEwQjtBQUFBLFFBQWpCLElBQWlCLFNBQWpCLElBQWlCO0FBQUEsUUFBWCxLQUFXLFNBQVgsS0FBVztBQUM5QyxXQUFPO0FBQUMsTUFBQSxPQUFPLEVBQVAsT0FBRDtBQUFVLE1BQUEsSUFBSSxFQUFKLElBQVY7QUFBZ0IsTUFBQSxLQUFLLEVBQUw7QUFBaEIsS0FBUDtBQUNILEdBRlEsQ0FEK0IsQ0FEdEI7QUFBQTtBQUFBLE1BQ2YsVUFEZTtBQUFBLE1BQ0gsYUFERzs7QUFBQSxtQkFNZ0IsUUFBUSxDQUFjLEVBQWQsQ0FOeEI7QUFBQTtBQUFBLE1BTWYsV0FOZTtBQUFBLE1BTUYsY0FORTs7QUFBQSxtQkFPMEIsUUFBUSxDQUFVLEtBQVYsQ0FQbEM7QUFBQTtBQUFBLE1BT2YsZ0JBUGU7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QzFCLE9BRDBCO0FBQUEsUUFDakIsS0FEaUIsU0FDakIsS0FEaUI7O0FBQUEsZ0JBRU4sR0FBRyxDQUFDLFVBQUQsRUFBYSxDQUFDLElBQUQsQ0FBYixFQUFxQixFQUFyQixDQUZHO0FBQUEsUUFFMUIsSUFGMEIsU0FFMUIsSUFGMEI7QUFBQSxRQUVwQixVQUZvQixTQUVwQixVQUZvQjs7QUFJakM7QUFDSSxNQUFBLE9BQU8sRUFBUCxPQURKO0FBRUksTUFBQSxRQUFRLEVBQUUsZ0JBQWdCLEVBRjlCO0FBR0ksTUFBQSxJQUFJLEVBQUosSUFISjtBQUlJLE1BQUEsUUFBUSxFQUFFLGlCQUpkO0FBS0ksTUFBQSxHQUFHLEVBQUUsU0FMVDtBQU1JLE1BQUEsSUFBSSxFQUFFLElBQUksSUFBSSxNQU5sQjtBQU9JLE1BQUEsS0FBSyxFQUFMO0FBUEosT0FRTyxVQUFVLElBQUksRUFSckI7QUFVSDs7QUFFRCxXQUFTLFlBQVQsR0FBd0I7QUFDcEI7QUFDSSxNQUFBLFFBQVEsRUFBRTtBQURkLE9BRU8sU0FBUyxDQUFDLFVBRmpCO0FBSUg7O0FBRUQsU0FBTztBQUNILElBQUEsV0FBVyxFQUFHLGFBQUQsR0FBa0IsV0FBbEIsR0FBZ0MsRUFEMUM7QUFFSCxJQUFBLGdCQUFnQixFQUFFLGdCQUFnQixFQUYvQjtBQUdILElBQUEsYUFBYSxFQUFiLGFBSEc7QUFJSCxJQUFBLFlBQVksRUFBWixZQUpHO0FBS0gsSUFBQSxhQUFhLEVBQWIsYUFMRztBQU1ILElBQUEsaUJBQWlCLEVBQWpCLGlCQU5HO0FBT0gsSUFBQSxnQkFBZ0IsRUFBaEI7QUFQRyxHQUFQO0FBVUgiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInJlYWN0LXNjcmlwdHNcIiAvPlxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgbG9kYXNoIGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IHt1c2VFZmZlY3QsIHVzZVN0YXRlfSA9IFJlYWN0O1xuY29uc3Qge1xuICAgIGVuZHNXaXRoLFxuICAgIGZvckVhY2gsXG4gICAgZ2V0LFxuICAgIGlzQXJyYXksXG4gICAgaXNFbXB0eSxcbiAgICBpc0Z1bmN0aW9uLFxuICAgIG1hcFZhbHVlcyxcbiAgICBvbWl0LFxuICAgIHNldCxcbiAgICB0cmFuc2Zvcm0sXG59ID0gbG9kYXNoO1xuXG5pbnRlcmZhY2UgdXNlRm9ybUNvbnRyb2xsZXJBcmdzIHtcbiAgICBmaWVsZFByb3BzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgICAgVGhlIGtleSB1c2VkIGhlcmUgd2lsbCBiZSB0aGUgbmFtZSBhdHRyaWJ1dGUgb2YgdGhlIGZpZWxkLiBJdCBzaG91bGQgYmUgYSB1bmlxdWVcbiAgICAgICAgICAgIG5hbWUuIFRoaXMga2V5IHdpbGwgYmUgdGhlIGRlZmF1bHQgdmFsdWUgZm9yIHRoZSBmb3JtVmFsdWVQYXRoIGlmIHRoYXQga2V5IGlzbid0IHNldC5cbiAgICAgICAgICAgIEl0IGlzIGltcG9ydGFudCB0byBOT1Qgc2V0IGEgbmFtZSBhdHRyaWJ1ZSBpbiB0aGUgZWxlbWVudCdzL2NvbXBvbmVudCdzIHByb3BzIGFuZFxuICAgICAgICAgICAgb3ZlcnJpZGUgdGhpcyBrZXk7IG90aGVyd2lzZSwgdGhlIHZhbHVlIHdpbGwgbm90IGJlIHNldCBwcm9wZXJseSBmb3IgdGhlIGZvcm0gdmFsdWVzXG4gICAgICAgICAgICBvciB0aGUgc3RhdGUgdmFsdWUgb2YgdGhpcyBmaWVsZC4gSWYgeW91IGFyZSB0cnlpbmcgdG8gcGFzcyBhbiBhcnJheSBvZiB2YWx1ZXMgZm9yXG4gICAgICAgICAgICBjaGVja2JveGVzLCB1c2UgYSB1bmlxdWUgbmFtZSBoZXJlIGZvciBlYWNoIGNoZWNrYm94IHN1Y2ggYXMgbXlDaGVja2JveDEsIG15Q2hlY2tib3gyLFxuICAgICAgICAgICAgZXRjLiBhbmQgc2V0IHRoZSBmb3JtVmFsdWVQYXRoIHRvIHRoZSBzYW1lIGtleSB5b3Ugd2FudCBpdCB0byB1c2Ugd2l0aCBhbiBhbmdsZSBicmFja2V0LFxuICAgICAgICAgICAgYXMgaW4gW10gYXQgdGhlIGVuZCBvZiB0aGUgbmFtZS4gU2VlIGZvcm1WYWx1ZVBhdGggb24gaG93IHRvIGRvIHRoYXQuXG4gICAgICAgICovXG4gICAgICAgIFtrZXk6IHN0cmluZ106IHtcbiAgICAgICAgICAgIC8qKiBUaGUgaW5pdGFsIGNoZWNrZWQgdmFsdWUgZm9yIGEgY2hlY2tib3ggZmllbGQgd2hpY2ggY2FuIGJlIGNoYW5nZWQgYnkgdGhlIHBhcmVudCAqL1xuICAgICAgICAgICAgY2hlY2tlZD86IGJvb2xlYW4gfCB1bmRlZmluZWRcbiAgICAgICAgICAgIC8qKiBJZiB0cnVlLCB0aGlzIGZpZWxkVmFsdWUgd2lsbCBub3QgYmUgc3VibWl0dGVkIHdpdGggdGhlIGZvcm0gdmFsdWVzICovXG4gICAgICAgICAgICBkb05vdFN1Ym1pdD86IGJvb2xlYW5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgIERlZmF1bHRzIHRvIHRoZSBrZXkgb2YgdGhpcyBvYmplY3QgaWYgbm90IHNldC5cbiAgICAgICAgICAgICAgICBUaGlzIGlzIGEgcGFyYW0gZm9yIHRoZSBsb2Rhc2ggZ2V0L3NldCBmdW5jdGlvbnMgdG8gYmUgYWJsZSB0byBzZXQgdGhlIGZvcm0gdmFsdWVzIGFzIHlvdSBuZWVkLlxuICAgICAgICAgICAgICAgIFRoaXMgbWFrZXMgaXQgcG9zc2libGUgdG8gYnVpbGQgYW4gb2JqZWN0IGluIHRoZSBmb3JtIHZhbHVlcyBhcyBkZXNpcmVkIHN1Y2ggYXMgaWYgeW91XG4gICAgICAgICAgICAgICAgc2V0IHRoZSBmb3JtVmFsdWVQYXRoIHRvIG15LmZpZWxkLnBhdGguZmllbGQxLCBpdCB3b3VsZCBzdWJtaXQgdGhlIHZhbHVlIGluIGFuIG9iamVjdFxuICAgICAgICAgICAgICAgIGxpa2UgdGhpcy4uLlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbXk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDoge2ZpZWxkMTogJ3ZhbHVlIG9mIGZpZWxkMSd9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgSWYgeW91IGFkZCBhbmdsZSBicmFja2V0cyBhdCB0aGUgZW5kIGFzIGluIFtdLCB0aGlzIHdpbGwgYWRkL3JlbW92ZSB2YWx1ZXMgdG8gYW4gYXJyYXkgd2hpY2hcbiAgICAgICAgICAgICAgICBpcyBoYW5keSBmb3IgYSBzZXQgb2YgY2hlY2tib3hlcyB5b3UnZCBsaWtlIHRvIHNlbmQgYW4gYXJyYXkgb2YgdmFsdWVzIGZvciBlYWNoIGNoZWNrYm94XG4gICAgICAgICAgICAgICAgdGhhdCBpcyBjaGVja2VkLiBGb3IgaW5zdGFuY2UsIGlmIHVzZWQgc2V0IGZvcm1WYWx1ZVBhdGggdG8gbXlDaGVja2JveFtdIG9uIG11bHRpcGxlXG4gICAgICAgICAgICAgICAgY2hlY2tib3hlcyBpbiB0aGUgZm9ybSwgaXQgd291bGQgc3VibWl0IGEgdmFsdWUgbGlrZSB0aGlzLi4uXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBteUNoZWNrYm94OiBbJ3ZhbHVlIG9mIGZpcnN0IGNoZWNrYm94IGNoZWNrZWQnLCAndmFsdWUgb2Ygc2Vjb25kIGNoZWNrYm94IGNoZWNrZWQnXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBUaGUgZW1wdHkgYW5nbGUgYnJhY2tldHMsIFtdLCBjYW4gb25seSBnbyBhdCB0aGUgZW5kIG9mIHRoZSBmb3JtVmFsdWVQYXRoLiBBbnl0aGluZyBlbHNlXG4gICAgICAgICAgICAgICAgd2l0aGluIHRoZSBwYXRoIG11c3QgaGF2ZSBhbiBpbmRleCBudW1iZXIgbGlrZSBteS5maWVsZFswXS5wYXRoW10uXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgZm9ybVZhbHVlUGF0aD86IHN0cmluZyB8IHN0cmluZ1tdXG4gICAgICAgICAgICAvKiogQ2FsbGJhY2sgZnVuY3Rpb24gdG8gcnVuIGF0IHRoZSBlbmQgb2YgdGhlIG9uQ2hhbmdlIGV2ZW50IG9mIHRoZSBlbGVtZW50ICovXG4gICAgICAgICAgICBvbkFmdGVyQ2hhbmdlPzogRnVuY3Rpb25cbiAgICAgICAgICAgIC8qKiBDYWxsYmFjayBmdW5jdGlvbiB0byBydW4gYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgb25DaGFuZ2UgZXZlbnQgb2YgdGhlIGVsZW1lbnQgKi9cbiAgICAgICAgICAgIG9uQmVmb3JlQ2hhbmdlPzogRnVuY3Rpb25cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgIE90aGVyIHByb3BzIHRvIGJlIGFkZGVkIHRvIHRoZSBmaWVsZCBwcm9wcyB0aGF0IHdpbGwgbm90IGJlIHVzZWQgYnkgdGhpcyBob29rLlxuICAgICAgICAgICAgICAgIFRoZXNlIGNhbiBhbHNvIGJlIGFkZGVkIHRvIHRoZSBjb21wb25lbnQvZWxlbWVudCBkaXJlY3RseTsgaG93ZXZlciwgaXQgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgICAgICAgaGVyZSBhcyBhbiBvcHRvaW4gdG8ga2VlcCBhbGwgdGhlIHByb3BzIGluIG9uZSBwbGFjZS5cbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBvdGhlclByb3BzPzogb2JqZWN0XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICBUaGUgdHlwZSBvZiBpbnB1dCBzdWNoIGFzIGNoZWNrZWQsIHJhZGlvLCB0ZXh0LCBldGMuIFRoaXMgb25seSBuZWVkcyB0byBiZSBzZXRcbiAgICAgICAgICAgICAgICBpZiBpdCdzIHNvbWV0aGluZyBvdGhlciB0aGFuIHRleHQuXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgdHlwZT86IHN0cmluZ1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgQSBmdW5jdGlvbiBvciBhcnJheSBvZiBmdW5jdGlvbnMgdG8gcnVuIGFnYWluc3QgdGhlIHZhbHVlIG9mIHRoZSBmaWVsZFxuICAgICAgICAgICAgICAgIElmIHRoZSB2YWx1ZSBwYXNzZXMgaXQgc2hvdWxkIHJldHVybiB1bmRlZmluZWQuIElmIG5vdCwgaXQgc2hvdWxkIHJldHVyblxuICAgICAgICAgICAgICAgIHRoZSBkZXNpcmVkIGZpZWxkIGVycm9yIHN1Y2ggYXMgXCJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkXCIuIFRoZSBjYWxsYmFjayBhcmd1bWVudHNcbiAgICAgICAgICAgICAgICBhcmUgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIGZpZWxkIGZvciB0aGUgZmlyc3QgYXJndW1lbnQgYW5kIHRoZSBmaWVsZCB2YWx1ZXMgb2ZcbiAgICAgICAgICAgICAgICB0aGUgb3RoZXIgZmllbGRzIGluIHRoZSBzZWNvbmQgYXJndW1lbnQgaW4gY2FzZSB2YWxpZGF0aW9uIG5lZWRzIHRvIGhhcHBlbiBiYXNlZFxuICAgICAgICAgICAgICAgIG9uIHRoZSB2YWx1ZSBvZiBhbm90aGVyIGZpZWxkLlxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHZhbGlkYXRpb24/OiAoZmllbGRWYWx1ZTogYW55LCBmaWVsZFZhbHVlczogT2JqZWN0KSA9PiBzdHJpbmcgfCB1bmRlZmluZWQgfCBbKGZpZWxkVmFsdWU6IGFueSwgZmllbGRWYWx1ZXM6IE9iamVjdCkgPT4gc3RyaW5nIHwgdW5kZWZpbmVkXVxuICAgICAgICAgICAgLyoqIFRoZSBpbml0YWwgdmFsdWUgZm9yIHRoZSBmaWVsZCB3aGljaCBjYW4gYmUgY2hhbmdlZCBieSB0aGUgcGFyZW50ICovXG4gICAgICAgICAgICB2YWx1ZT86IG51bWJlciB8IHN0cmluZyB8IHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgfVxuICAgIGZvcm1Qcm9wczoge1xuICAgICAgICAvKipcbiAgICAgICAgICAgIE92ZXJhbGwgZGVzaXJlZCBmb3JtIHZhbHVlIHRvIHN1Ym1pdCB3aGVuIHRoZSBmaWVsZCBpcyBlbXB0eSBvciBjaGVja2JveCBpc24ndCBjaGVja2VkLlxuICAgICAgICAgICAgVGhpcyBpcyB0eXBpY2FsbHkgdGhlIHZhbHVlIHlvdSB3YW50IHRvIHNlZSBvbiB0aGUgYmFja2VuZC4gSWYgdGhpcyBpc24ndCBzZXQgb3JcbiAgICAgICAgICAgIHRoZSB2YWx1ZSBpcyBzZXQgdG8gdW5kZWZpbmVkLCB0aGUga2V5IG9mIHRoZSBmaWVsZCB3aWxsIG5vdCBiZSBzdWJtaXR0ZWQgd2l0aCB0aGVcbiAgICAgICAgICAgIGZvcm0gdmFsdWVzIG9iamVjdC5cbiAgICAgICAgKi9cbiAgICAgICAgbnVsbFZhbHVlPzogbnVsbCB8IHN0cmluZyB8IHVuZGVmaW5lZFxuICAgICAgICAvKipcbiAgICAgICAgICAgIENhbGxiYWNrIGZ1bmN0aW9uIHRvIHJ1biBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBvblN1Ym1pdCBldmVudCBvZiB0aGUgZm9ybSBlbGVtZW50LlxuICAgICAgICAgICAgVGhpcyB3aWxsIGV4ZWN1dGUgYmVmb3JlIGFueXRoaW5nIGluY2x1ZGluZyB0aGUgdmFsaWRhdGlvbiBydW5zIGFuZCB3aWxsIHBlcmZvcm1cbiAgICAgICAgICAgIGFueSB0aW1lIHRoZSBvblN1Ym1pdCBldmVudCBpcyBkaXNwYXRjaGVkLlxuICAgICAgICAqL1xuICAgICAgICBvbkJlZm9yZVN1Ym1pdD86IEZ1bmN0aW9uXG4gICAgICAgIC8qKlxuICAgICAgICAgICAgQ2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIGFsbCB2YWxpZGF0aW9uIHBhc3NlcyBmb3IgdGhlIGZvcm0gYW5kIGl0J3NcbiAgICAgICAgICAgIHNhZmUgdG8gc3VibWl0LiBUaGlzIGlzIHRoZSBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSB1c2VkIGZvciB0aGUgY2FsbCB0byB0aGVcbiAgICAgICAgICAgIGJhY2tlbmQgb3IgZGVzaXJlZCBhY3Rpb25zIGFmdGVyIGV2ZXJ5dGhpbmcgcGFzc2VzIGZyb20gdGhlIGZvcm0uIElmIHRoaXMgZnVuY3Rpb25cbiAgICAgICAgICAgIGRvZXMgbm90IHJldHVybiBhIFByb21pc2UsIHRoaXMgY3VzdG9tIGhvb2sgd2lsbCBhZGQgb25lLlxuICAgICAgICAqL1xuICAgICAgICBvbkV4ZWN1dGVTdWJtaXQ/OiBGdW5jdGlvblxuICAgICAgICAvKipcbiAgICAgICAgICAgIENhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgYWZ0ZXIgdGhlIFByb21pc2UgZnJvbSBvbkV4ZWN1dGVTdWJtaXQgaGFzIGJlZW5cbiAgICAgICAgICAgIHJlc29sdmVkLiBUaGlzIGlzIHRoZSBmdW5jdGlvbiB0byB1c2UgZm9yIHN1Y2Nlc2Z1bCBzdWJtaXRzIHN1Y2ggYXMgY2xvc2luZ1xuICAgICAgICAgICAgYSBtb2RhbCwgbmF2aWdhdGluZyB0byBhIG5ldyBwYWdlIG9yIHNob3dpbmcgYSBzdWNjZXNzIG1lc3NhZ2UuXG4gICAgICAgICovXG4gICAgICAgIG9uQWZ0ZXJTdWJtaXQ/OiBGdW5jdGlvblxuICAgICAgICAvKipcbiAgICAgICAgICAgIE90aGVyIHByb3BzIHRvIGJlIGFkZGVkIHRvIHRoZSBmb3JtIHByb3BzIHRoYXQgd2lsbCBub3QgYmUgdXNlZCBieSB0aGlzIGhvb2suXG4gICAgICAgICAgICBUaGVzZSBjYW4gYWxzbyBiZSBhZGRlZCB0byB0aGUgY29tcG9uZW50L2VsZW1lbnQgZGlyZWN0bHk7IGhvd2V2ZXIsIGl0IGlzIGF2YWlsYWJsZVxuICAgICAgICAgICAgaGVyZSBhcyBhbiBvcHRvaW4gdG8ga2VlcCBhbGwgdGhlIHByb3BzIGluIG9uZSBwbGFjZS4uXG4gICAgICAgICovXG4gICAgICAgIG90aGVyUHJvcHM/OiBPYmplY3RcbiAgICAgICAgLyoqXG4gICAgICAgICAgICBCb29sZWFuIHRvIGluZGljYXRlZCBpZiB0aGVyZSBhcmUgb3RoZXIgc3VibWlzc2lvbiBmYWN0b3JzIGdvaW5nIG9uIHdoaWNoXG4gICAgICAgICAgICB3aWxsIHVsaXRpbWF0ZWx5IGRpc2FibGUgYWxsIGZpZWxkcyBhbmQgc3VibWl0IGJ1dHRvblxuICAgICAgICAqL1xuICAgICAgICBmb3JtSXNTdWJtaXR0aW5nPzogYm9vbGVhbiB8IHVuZGVmaW5lZFxuICAgIH1cbn1cblxuaW50ZXJmYWNlIHVzZUZvcm1Db250cm9sbGVyUmVzcG9uc2Uge1xuICAgIGZpZWxkRXJyb3JzOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1xuICAgIH1cbiAgICBmb3JtSXNTdWJtaXR0aW5nOiBib29sZWFuXG4gICAgZ2V0Rm9ybVByb3BzOiAoKSA9PiAoe1xuICAgICAgICBba2V5OiBzdHJpbmddOiB7XG4gICAgICAgICAgICBvblN1Ym1pdDogRnVuY3Rpb25cbiAgICAgICAgfVxuICAgIH0pXG4gICAgZ2V0RmllbGRQcm9wczogKCkgPT4gKHtcbiAgICAgICAgY2hlY2tlZD86IGJvb2xlYW5cbiAgICAgICAgZGlzYWJsZWQ/OiBib29sZWFuXG4gICAgICAgIG5hbWU6IHN0cmluZ1xuICAgICAgICByZWY6IEZ1bmN0aW9uXG4gICAgICAgIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsXG4gICAgfSlcbiAgICBzdWJtaXRCdXR0b25Qcm9wczoge1xuICAgICAgICBkaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdXBkYXRlRmllbGRQcm9wczogRnVuY3Rpb25cbn1cblxuaW50ZXJmYWNlIGZpZWxkU3RhdGUge1xuICAgIFtrZXk6IHN0cmluZ106IHtcbiAgICAgICAgY2hlY2tlZD86IGJvb2xlYW4gfCB1bmRlZmluZWRcbiAgICAgICAgcmVmPzogYW55IC8vIFByb2JhYmx5IHNob3VsZCBmaW5kIHRoZSByaWdodCB0eXBlIGZvciB0aGlzXG4gICAgICAgIHR5cGU/OiBzdHJpbmdcbiAgICAgICAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWRcbiAgICB9XG59XG5cbmludGVyZmFjZSBmaWVsZEVycm9ycyB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZUZvcm1Db250cm9sbGVyPHVzZUZvcm1Db250cm9sbGVyUmVzcG9uc2U+KHtcbiAgICBmaWVsZFByb3BzLFxuICAgIGZvcm1Qcm9wcyxcbn06IHVzZUZvcm1Db250cm9sbGVyQXJncykge1xuICAgIGNvbnN0IFtmaWVsZFN0YXRlLCBzZXRGaWVsZFN0YXRlXSA9IHVzZVN0YXRlPGZpZWxkU3RhdGU+KFxuICAgICAgICBtYXBWYWx1ZXMoZmllbGRQcm9wcywgKHtjaGVja2VkLCB0eXBlLCB2YWx1ZX0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7Y2hlY2tlZCwgdHlwZSwgdmFsdWV9XG4gICAgICAgIH0pXG4gICAgKTtcbiAgICBjb25zdCBbZmllbGRFcnJvcnMsIHNldEZpZWxkRXJyb3JzXSA9IHVzZVN0YXRlPGZpZWxkRXJyb3JzPih7fSk7XG4gICAgY29uc3QgW2Zvcm1Jc1N1Ym1pdHRpbmcsIHNldEZvcm1Jc1N1Ym1pdHRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGNvbnN0IFtpbml0aWFsU3VibWl0LCBzZXRJbml0aWFsU3VibWl0XSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgICBjb25zdCBbZXhlY3V0ZUZpZWxkUHJvcFVwZGF0ZSwgc2V0RXhlY3V0ZUZpZWxkUHJvcFVwZGF0ZV0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoZXhlY3V0ZUZpZWxkUHJvcFVwZGF0ZSkge1xuICAgICAgICAgICAgbGV0IG5ld0ZpZWxkU3RhdGUgPSB7Li4uZmllbGRTdGF0ZX07XG5cbiAgICAgICAgICAgIGZvckVhY2goZmllbGRQcm9wcywgKGZpZWxkT2JqLCBmaWVsZE5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICBuZXdGaWVsZFN0YXRlID0ge1xuICAgICAgICAgICAgICAgICAgICAgIC4uLm5ld0ZpZWxkU3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgW2ZpZWxkTmFtZV06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ubmV3RmllbGRTdGF0ZVtmaWVsZE5hbWVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5maWVsZE9iaixcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNldEZpZWxkU3RhdGUobmV3RmllbGRTdGF0ZSk7XG4gICAgICAgICAgICBzZXRFeGVjdXRlRmllbGRQcm9wVXBkYXRlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0sW2V4ZWN1dGVGaWVsZFByb3BVcGRhdGUsIGZpZWxkUHJvcHMsIGZpZWxkU3RhdGVdKVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlRmllbGRQcm9wcygpIHtcbiAgICAgICAgc2V0RXhlY3V0ZUZpZWxkUHJvcFVwZGF0ZSh0cnVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRGaWVsZChcbiAgICAgICAgbmFtZTogc3RyaW5nLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICBjaGVja2VkPzogYm9vbGVhbiB8IHVuZGVmaW5lZFxuICAgICAgICAgICAgcmVmPzogYW55IC8vIFByb2JhYmx5IHNob3VsZCBmaW5kIHRoZSByaWdodCB0eXBlIGZvciB0aGlzXG4gICAgICAgICAgICB0eXBlPzogc3RyaW5nXG4gICAgICAgICAgICB2YWx1ZT86IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZFxuICAgIH0pIHtcbiAgICAgICAgc2V0RmllbGRTdGF0ZSh7XG4gICAgICAgICAgICAgIC4uLmZpZWxkU3RhdGUsXG4gICAgICAgICAgICAgIFtuYW1lXToge1xuICAgICAgICAgICAgICAgICAgLi4uZmllbGRTdGF0ZVtuYW1lXSxcbiAgICAgICAgICAgICAgICAgIC4uLnBheWxvYWQsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Rm9ybVZhbHVlcygpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgICAgIGxldCBmb3JtVmFsdWVzID0ge307XG5cbiAgICAgICAgZm9yRWFjaChmaWVsZFN0YXRlLCAoe2NoZWNrZWQsIHJlZiA9IHt9LCB2YWx1ZX0sIGZpZWxkTmFtZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFmaWVsZFByb3BzW2ZpZWxkTmFtZV0uZG9Ob3RTdWJtaXQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlSXNDaGVja2JveCA9IChcbiAgICAgICAgICAgICAgICAgICAgZmllbGRQcm9wc1tmaWVsZE5hbWVdLnR5cGUgPT09ICdjaGVja2JveCcgfHxcbiAgICAgICAgICAgICAgICAgICAgZmllbGRQcm9wc1tmaWVsZE5hbWVdLnR5cGUgPT09ICdyYWRpbydcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNvbnN0IG51bGxWYWx1ZSA9ICh0eXBlSXNDaGVja2JveClcbiAgICAgICAgICAgICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgOiBmb3JtUHJvcHMubnVsbFZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IChjaGVja2VkIHx8ICghdHlwZUlzQ2hlY2tib3ggJiYgdmFsdWUgJiYgdmFsdWUgIT09ICcnKSlcbiAgICAgICAgICAgICAgICAgICAgPyB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICA6IG51bGxWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGlmIChmb3JtVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtVmFsdWVQYXRoID0gZmllbGRQcm9wc1tmaWVsZE5hbWVdLmZvcm1WYWx1ZVBhdGggfHwgZmllbGROYW1lO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2V0UGF0aCA9IChpc0FycmF5KGZvcm1WYWx1ZVBhdGgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBmb3JtVmFsdWVQYXRoLmpvaW4oJy4nKS5yZXBsYWNlKCcuWycsICcuJykucmVwbGFjZSgnXS4nLCAnLicpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGZvcm1WYWx1ZVBhdGg7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVuZHNXaXRoKGZvcm1WYWx1ZVBhdGgudG9TdHJpbmcoKSwgJ1tdJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFBhdGggPSBzZXRQYXRoLnJlcGxhY2UoJ1tdJywgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEZvcm1WYWx1ZSA9ICBnZXQoZm9ybVZhbHVlcywgc2V0UGF0aCkgfHwgW107XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldChmb3JtVmFsdWVzLCBzZXRQYXRoLCBbLi4uY3VycmVudEZvcm1WYWx1ZSwgZm9ybVZhbHVlXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoZm9ybVZhbHVlcywgc2V0UGF0aCwgZm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1WYWx1ZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdEZpZWxkPEh0bWxJbnB1dEVsZW1lbnQ+KGlucHV0UmVmOiBhbnkpIHtcbiAgICAgICAgaWYgKGlucHV0UmVmICE9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBTb21lIGNvbXBvbmV0IGxpYnJhcmllcyByZXR1cm4gaW5wdXRFbGVtZW50IGFzIHRoZSBhY3R1YWwgcmVmXG4gICAgICAgICAgICAvLyBNYXkgbmVlZCB0byBhZGQgbW9yZSBpZiBvdGhlciBsaWJyYXJpZXMgYXJlIHVzZWRcbiAgICAgICAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IGdldChpbnB1dFJlZiwgJ2lucHV0RWxlbWVudCcpIHx8IGlucHV0UmVmO1xuICAgICAgICAgICAgaWYgKGlucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtuYW1lfSA9IGlucHV0RWxlbWVudDtcblxuICAgICAgICAgICAgICAgIGlmICghbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICAgICd1c2VGb3JtQ29udHJvbGxlcjogQSBuYW1lIGF0dHJpYnV0ZSBtdXN0IGJlIHNwZWNpZmllZCBmb3IgdGhpcyBlbGVtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpbnB1dEVsZW1lbnR9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghZ2V0KGZpZWxkU3RhdGUsIFtuYW1lLCAncmVmJ10pKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEZpZWxkKG5hbWUsIHtyZWY6IGlucHV0RWxlbWVudH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICAgICAgJ3VzZUZvcm1Db250cm9sbGVyOiBDb3VsZCBub3Qgc2V0IGEgcmVmIGZvciB0aGlzIGZvcm0gZmllbGQnLFxuICAgICAgICAgICAgICAgICAgICB7aW5wdXRSZWZ9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlRmllbGQobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgW3N0cmluZyB8IG51bWJlcl0gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGVGdW5jdGlvbnMgPSBmaWVsZFByb3BzW25hbWVdLnZhbGlkYXRpb247XG4gICAgICAgIGxldCBmaWVsZEVycm9yOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKHZhbGlkYXRlRnVuY3Rpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZFZhbGlkYXRpb24gPSAoaXNBcnJheSh2YWxpZGF0ZUZ1bmN0aW9ucykpID8gdmFsaWRhdGVGdW5jdGlvbnMgOiBbdmFsaWRhdGVGdW5jdGlvbnNdO1xuXG4gICAgICAgICAgICAvLyBVc2luZyB0aGUgbG9kYXNoIHRyYW5zZm9ybSB0byBydW4gdW50aWwgaXQgZmluZHMgdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAvLyBUaGlzIHdheSBpdCBvbmx5IHNob3dzIG9uZSB2YWxpZGF0aW9uIGVycm9yIGF0IGEgdGltZSB1bnRpbFxuICAgICAgICAgICAgLy8gdGhleSBhcmUgYWxsIGdvbmUgaWYgdGhlcmUgYXJlIG11bHRpcGxlcy5cbiAgICAgICAgICAgIHRyYW5zZm9ybShmaWVsZFZhbGlkYXRpb24sIChyZXR1cm5GaWVsZEVycm9ycywgdmFsaWRhdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0Z1bmN0aW9uKHZhbGlkYXRvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3VzZUZvcm1Db250cm9sbGVyOiBGaWVsZCB2YWxpZGF0b3JzIG11c3QgYmUgZnVuY3Rpb25zJywge3ZhbGlkYXRvcn0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogUHJvYmFibHkgbmVlZCB0byBtZW1vaXplIGdldEZvcm1WYWx1ZXMgb3Igc29tZXRoaW5nXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkRXJyb3IgPSB2YWxpZGF0b3IodmFsdWUsIGdldEZvcm1WYWx1ZXMpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICFmaWVsZEVycm9yO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChmaWVsZEVycm9yKSB7XG4gICAgICAgICAgICAgICAgc2V0RmllbGRFcnJvcnMoe1xuICAgICAgICAgICAgICAgICAgICAuLi5maWVsZEVycm9ycyxcbiAgICAgICAgICAgICAgICAgICAgW25hbWVdOiBmaWVsZEVycm9yLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldEZpZWxkRXJyb3JzKG9taXQoZmllbGRFcnJvcnMsIG5hbWUpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpZWxkRXJyb3I7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RmllbGRzVG9WYWxpZGF0ZSgpOiBzdHJpbmdbXSB7XG4gICAgICAgIGxldCBmaWVsZHNUb1ZhbGlkYXRlOnN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yRWFjaChmaWVsZFByb3BzLCAoZmllbGRQcm9wLCBmaWVsZE5hbWUpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWVsZFByb3AudmFsaWRhdGlvbikge1xuICAgICAgICAgICAgICAgIGZpZWxkc1RvVmFsaWRhdGUucHVzaChmaWVsZE5hbWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIGZpZWxkc1RvVmFsaWRhdGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVBbGxGaWVsZHMoKTpib29sZWFuIHtcbiAgICAgICAgbGV0IGZpZWxkc0hhdmVFcnJvciA9IGZhbHNlO1xuXG4gICAgICAgIHRyYW5zZm9ybShnZXRGaWVsZHNUb1ZhbGlkYXRlKCksIChmaWVsZEVycm9yczogT2JqZWN0LCBmaWVsZE5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmllbGRFcnJvciA9IHZhbGlkYXRlRmllbGQoXG4gICAgICAgICAgICAgICAgZmllbGROYW1lLFxuICAgICAgICAgICAgICAgIGZpZWxkU3RhdGVbZmllbGROYW1lXS5yZWYudmFsdWUsXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBmaWVsZHNIYXZlRXJyb3IgPSAhIWZpZWxkRXJyb3JcbiAgICAgICAgICAgIHJldHVybiAhZmllbGRFcnJvcjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZpZWxkc0hhdmVFcnJvcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVGaWVsZENoYW5nZShldmVudDogUmVhY3QuRm9ybUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGNoZWNrZWQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHZhbHVlXG4gICAgICAgIH0gPSBldmVudC5jdXJyZW50VGFyZ2V0IHx8IHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgbmFtZTogJ25hbWVOb3RTdXBwbGllZCcsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICB9O1xuXG4gICAgICAgIHNldEZpZWxkKG5hbWUsIHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IChjaGVja2VkID09PSB0cnVlKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHZhbGlkYXRlRmllbGQobmFtZSwgdmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUZvcm1TdWJtaXQoZXZlbnQ6IFJlYWN0LkZvcm1FdmVudDxIVE1MRm9ybUVsZW1lbnQ+KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGZpZWxkc0hhdmVFcnJvcjtcbiAgICAgICAgY29uc3Qgb25CZWZvcmVTdWJtaXQgPSBnZXQoZm9ybVByb3BzLCAnb25CZWZvcmVTdWJtaXQnLCAoKSA9PiBudWxsKTtcblxuICAgICAgICBvbkJlZm9yZVN1Ym1pdCgpO1xuICAgICAgICBpZiAoIWluaXRpYWxTdWJtaXQpIHtcbiAgICAgICAgICAgIC8vIFZhbGlkYXRpbmcgYWxsIGZpZWxkcyBmb3IgYXV0b2ZpbGwgdmFsdWVzIGlmIHRoZXJlIGhhc24ndCBiZWVuIGFuIGluaXRpYWwgc3VibWl0XG4gICAgICAgICAgICBmaWVsZHNIYXZlRXJyb3IgPSB2YWxpZGF0ZUFsbEZpZWxkcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFmaWVsZHNIYXZlRXJyb3IpIHtcbiAgICAgICAgICAgIGV4ZWN1dGVGb3JtKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRJbml0aWFsU3VibWl0KHRydWUpO1xuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVGb3JtKCkge1xuICAgICAgICBjb25zdCBvbkV4ZWN1dGVTdWJtaXQgPSBnZXQoZm9ybVByb3BzLCAnb25FeGVjdXRlU3VibWl0JywgKGZvcm1WYWx1ZXM6IG9iamVjdCkgPT4gbnVsbCk7XG4gICAgICAgIGNvbnN0IG9uQWZ0ZXJTdWJtaXQgPSBnZXQoZm9ybVByb3BzLCAnb25BZnRlclN1Ym1pdCcsICgpID0+IG51bGwpO1xuICAgICAgICBjb25zdCBmb3JtVmFsdWVzID0gZ2V0Rm9ybVZhbHVlcygpO1xuXG4gICAgICAgIHNldEZvcm1Jc1N1Ym1pdHRpbmcodHJ1ZSk7XG4gICAgICAgIGF3YWl0IChvbkV4ZWN1dGVTdWJtaXQgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICAgICAgICAgPyBvbkV4ZWN1dGVTdWJtaXQoZm9ybVZhbHVlcylcbiAgICAgICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKG9uRXhlY3V0ZVN1Ym1pdChmb3JtVmFsdWVzKSk7XG5cbiAgICAgICAgc2V0Rm9ybUlzU3VibWl0dGluZyhmYWxzZSk7XG4gICAgICAgIG9uQWZ0ZXJTdWJtaXQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0Zvcm1TdWJtaXR0aW5nKCkge1xuICAgICAgICByZXR1cm4gISEoZm9ybUlzU3VibWl0dGluZyB8fCBmb3JtUHJvcHMuZm9ybUlzU3VibWl0dGluZylcbiAgICB9XG5cbiAgICBjb25zdCBzdWJtaXRCdXR0b25Qcm9wcyA9IHtcbiAgICAgICAgZGlzYWJsZWQ6ICEhKFxuICAgICAgICAgICAgaXNGb3JtU3VibWl0dGluZygpIHx8XG4gICAgICAgICAgICAoaW5pdGlhbFN1Ym1pdCAmJiAhaXNFbXB0eShmaWVsZEVycm9ycykpXG4gICAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGaWVsZFByb3BzKG5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCB7Y2hlY2tlZCwgdmFsdWV9ID0gZ2V0KGZpZWxkU3RhdGUsIFtuYW1lXSwge30pIGFzIGFueTtcbiAgICAgICAgY29uc3Qge3R5cGUsIG90aGVyUHJvcHN9ID0gZ2V0KGZpZWxkUHJvcHMsIFtuYW1lXSwge30pIGFzIGFueTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2hlY2tlZCxcbiAgICAgICAgICAgIGRpc2FibGVkOiBpc0Zvcm1TdWJtaXR0aW5nKCksXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgb25DaGFuZ2U6IGhhbmRsZUZpZWxkQ2hhbmdlLFxuICAgICAgICAgICAgcmVmOiBpbml0RmllbGQsXG4gICAgICAgICAgICB0eXBlOiB0eXBlIHx8ICd0ZXh0JyxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgLi4ub3RoZXJQcm9wcyB8fCB7fSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZvcm1Qcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uU3VibWl0OiBoYW5kbGVGb3JtU3VibWl0LFxuICAgICAgICAgICAgLi4uZm9ybVByb3BzLm90aGVyUHJvcHMsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmaWVsZEVycm9yczogKGluaXRpYWxTdWJtaXQpID8gZmllbGRFcnJvcnMgOiB7fSxcbiAgICAgICAgZm9ybUlzU3VibWl0dGluZzogaXNGb3JtU3VibWl0dGluZygpLFxuICAgICAgICBnZXRGb3JtVmFsdWVzLFxuICAgICAgICBnZXRGb3JtUHJvcHMsXG4gICAgICAgIGdldEZpZWxkUHJvcHMsXG4gICAgICAgIHN1Ym1pdEJ1dHRvblByb3BzLFxuICAgICAgICB1cGRhdGVGaWVsZFByb3BzLFxuICAgIH07XG5cbn1cbiJdfQ==