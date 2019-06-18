"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Example;

var React = _interopRequireWildcard(require("react"));

var lodash = _interopRequireWildcard(require("lodash"));

var _useFormController2 = _interopRequireDefault(require("./useFormController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useState = React.useState;
var get = lodash.get;

function Example() {
  var _useState = useState(""),
      _useState2 = _slicedToArray(_useState, 2),
      submitResponse = _useState2[0],
      setSubmitResonse = _useState2[1];

  var _useState3 = useState('field in a path'),
      _useState4 = _slicedToArray(_useState3, 2),
      submitFieldState = _useState4[0],
      setSubmitFieldState = _useState4[1];

  var _useFormController = (0, _useFormController2.default)({
    fieldProps: {
      myCheckbox: {
        checked: true,
        type: 'checkbox',
        formValuePath: 'myCheckbox[]',
        value: 'mock checkbox value',
        otherProps: {
          id: 'myCheckbox'
        }
      },
      myCheckbox2: {
        checked: false,
        type: 'checkbox',
        formValuePath: 'myCheckbox[]',
        value: 'mock checkbox value 2',
        otherProps: {
          id: 'myCheckbox2'
        }
      },
      myCheckbox3: {
        checked: true,
        type: 'checkbox',
        formValuePath: 'myCheckbox[]',
        value: 'mock checkbox value 3',
        otherProps: {
          id: 'myCheckbox3'
        }
      },
      myNoSubmitTextField: {
        doNotSubmit: true,
        validation: function validation(value) {
          return value === 'x' ? 'this is an x' : undefined;
        },
        value: 'mock no submit text value'
      },
      mySubmitTextField1: {
        formValuePath: 'some.deep.nested.path[]',
        validation: function validation(value) {
          return value === 'x' ? 'this is an x' : undefined;
        },
        value: submitFieldState
      },
      mySubmitTextField2: {
        formValuePath: 'some.deep.nested.path[]',
        validation: function validation(value) {
          return value === 'x' ? 'this is an x' : undefined;
        },
        value: submitFieldState
      }
    },
    formProps: {
      onExecuteSubmit: handleSubmit
    }
  }),
      fieldErrors = _useFormController.fieldErrors,
      getFieldProps = _useFormController.getFieldProps,
      getFormProps = _useFormController.getFormProps,
      submitButtonProps = _useFormController.submitButtonProps,
      updateFieldProps = _useFormController.updateFieldProps;

  function handleSubmit(formValues) {
    console.log('Submitted', {
      formValues: formValues
    });
    setSubmitResonse(JSON.stringify(formValues));
  }

  function renderError(fieldName) {
    var fieldError = get(fieldErrors, fieldName);
    return fieldError && React.createElement("div", {
      style: {
        color: 'red'
      }
    }, fieldError);
  }

  function handlePropFieldChange(event) {
    updateFieldProps();
    setSubmitFieldState(event.currentTarget.value);
  }

  return submitResponse ? React.createElement("div", null, submitResponse) : React.createElement("form", _extends({
    name: "mockFormName"
  }, getFormProps()), React.createElement("input", {
    onChange: handlePropFieldChange
  }), React.createElement("div", null, React.createElement("input", getFieldProps('myNoSubmitTextField')), renderError('myNoSubmitTextField')), React.createElement("div", null, React.createElement("input", getFieldProps('mySubmitTextField1')), React.createElement("input", getFieldProps('mySubmitTextField2'))), React.createElement("div", null, React.createElement("input", getFieldProps('myCheckbox')), React.createElement("label", {
    htmlFor: "myCheckbox"
  }, getFieldProps('myCheckbox').value), React.createElement("input", getFieldProps('myCheckbox2')), React.createElement("label", {
    htmlFor: "myCheckbox2"
  }, getFieldProps('myCheckbox2').value), React.createElement("input", getFieldProps('myCheckbox3')), React.createElement("label", {
    htmlFor: "myCheckbox3"
  }, getFieldProps('myCheckbox3').value)), React.createElement("button", submitButtonProps, "Submit"));
}
"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Example = _interopRequireDefault(require("./Example"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom.default.render(_react.default.createElement(_Example.default, null), document.getElementById('root'));
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9FeGFtcGxlLnRzeCIsIi4uL3NyYy9pbmRleC50c3giLCIuLi9zcmMvcmVhY3QtYXBwLWVudi5kLnRzIiwiLi4vc3JjL3VzZUZvcm1Db250cm9sbGVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTyxRLEdBQVksSyxDQUFaLFE7SUFDQSxHLEdBQU8sTSxDQUFQLEc7O0FBRVEsU0FBUyxPQUFULEdBQW1CO0FBQUEsa0JBQ2EsUUFBUSxDQUFDLEVBQUQsQ0FEckI7QUFBQTtBQUFBLE1BQ3ZCLGNBRHVCO0FBQUEsTUFDUCxnQkFETzs7QUFBQSxtQkFFa0IsUUFBUSxDQUFDLGlCQUFELENBRjFCO0FBQUE7QUFBQSxNQUV2QixnQkFGdUI7QUFBQSxNQUVMLG1CQUZLOztBQUFBLDJCQVMxQixpQ0FBa0I7QUFDbEIsSUFBQSxVQUFVLEVBQUU7QUFDUixNQUFBLFVBQVUsRUFBRTtBQUNSLFFBQUEsT0FBTyxFQUFFLElBREQ7QUFFUixRQUFBLElBQUksRUFBRSxVQUZFO0FBR1IsUUFBQSxhQUFhLEVBQUUsY0FIUDtBQUlSLFFBQUEsS0FBSyxFQUFFLHFCQUpDO0FBS1IsUUFBQSxVQUFVLEVBQUU7QUFBQyxVQUFBLEVBQUUsRUFBRTtBQUFMO0FBTEosT0FESjtBQVFSLE1BQUEsV0FBVyxFQUFFO0FBQ1QsUUFBQSxPQUFPLEVBQUUsS0FEQTtBQUVULFFBQUEsSUFBSSxFQUFFLFVBRkc7QUFHVCxRQUFBLGFBQWEsRUFBRSxjQUhOO0FBSVQsUUFBQSxLQUFLLEVBQUUsdUJBSkU7QUFLVCxRQUFBLFVBQVUsRUFBRTtBQUFDLFVBQUEsRUFBRSxFQUFFO0FBQUw7QUFMSCxPQVJMO0FBZVIsTUFBQSxXQUFXLEVBQUU7QUFDVCxRQUFBLE9BQU8sRUFBRSxJQURBO0FBRVQsUUFBQSxJQUFJLEVBQUUsVUFGRztBQUdULFFBQUEsYUFBYSxFQUFFLGNBSE47QUFJVCxRQUFBLEtBQUssRUFB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QUMsSUFBRCxDQUFiLEVBQXFCLEVBQXJCLENBREs7QUFBQSxRQUMxQixPQUQwQixTQUMxQixPQUQwQjtBQUFBLFFBQ2pCLEtBRGlCLFNBQ2pCLEtBRGlCOztBQUFBLGdCQUVOLEdBQUcsQ0FBQyxVQUFELEVBQWEsQ0FBQyxJQUFELENBQWIsRUFBcUIsRUFBckIsQ0FGRztBQUFBLFFBRTFCLElBRjBCLFNBRTFCLElBRjBCO0FBQUEsUUFFcEIsVUFGb0IsU0FFcEIsVUFGb0I7O0FBSWpDO0FBQ0ksTUFBQSxPQUFPLEVBQVAsT0FESjtBQUVJLE1BQUEsUUFBUSxFQUFFLENBQUMsQ0FBQyxnQkFGaEI7QUFHSSxNQUFBLElBQUksRUFBSixJQUhKO0FBSUksTUFBQSxRQUFRLEVBQUUsaUJBSmQ7QUFLSSxNQUFBLEdBQUcsRUFBRSxTQUxUO0FBTUksTUFBQSxJQUFJLEVBQUUsSUFBSSxJQUFJLE1BTmxCO0FBT0ksTUFBQSxLQUFLLEVBQUw7QUFQSixPQVFPLFVBQVUsSUFBSSxFQVJyQjtBQVVIOztBQUVELFdBQVMsWUFBVCxHQUF3QjtBQUNwQjtBQUNJLE1BQUEsUUFBUSxFQUFFO0FBRGQsT0FFTyxTQUFTLENBQUMsVUFGakI7QUFJSDs7QUFFRCxTQUFPO0FBQ0gsSUFBQSxXQUFXLEVBQUcsYUFBRCxHQUFrQixXQUFsQixHQUFnQyxFQUQxQztBQUVILElBQUEsYUFBYSxFQUFiLGFBRkc7QUFHSCxJQUFBLFlBQVksRUFBWixZQUhHO0FBSUgsSUFBQSxhQUFhLEVBQWIsYUFKRztBQUtILElBQUEsaUJBQWlCLEVBQWpCLGlCQUxHO0FBTUgsSUFBQSxnQkFBZ0IsRUFBaEI7QUFORyxHQUFQO0FBU0giLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBsb2Rhc2ggZnJvbSAnbG9kYXNoJztcbmltcG9ydCB1c2VGb3JtQ29udHJvbGxlciBmcm9tICcuL3VzZUZvcm1Db250cm9sbGVyJztcblxuY29uc3Qge3VzZVN0YXRlfSA9IFJlYWN0XG5jb25zdCB7Z2V0fSA9IGxvZGFzaDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRXhhbXBsZSgpIHtcbiAgICBjb25zdCBbc3VibWl0UmVzcG9uc2UsIHNldFN1Ym1pdFJlc29uc2VdID0gdXNlU3RhdGUoXCJcIik7XG4gICAgY29uc3QgW3N1Ym1pdEZpZWxkU3RhdGUsIHNldFN1Ym1pdEZpZWxkU3RhdGVdID0gdXNlU3RhdGUoJ2ZpZWxkIGluIGEgcGF0aCcpO1xuICAgIGNvbnN0IHtcbiAgICAgICAgZmllbGRFcnJvcnMsXG4gICAgICAgIGdldEZpZWxkUHJvcHMsXG4gICAgICAgIGdldEZvcm1Qcm9wcyxcbiAgICAgICAgc3VibWl0QnV0dG9uUHJvcHMsXG4gICAgICAgIHVwZGF0ZUZpZWxkUHJvcHMsXG4gICAgfSA9IHVzZUZvcm1Db250cm9sbGVyKHtcbiAgICAgICAgZmllbGRQcm9wczoge1xuICAgICAgICAgICAgbXlDaGVja2JveDoge1xuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgICAgICAgICAgICBmb3JtVmFsdWVQYXRoOiAnbXlDaGVja2JveFtdJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ21vY2sgY2hlY2tib3ggdmFsdWUnLFxuICAgICAgICAgICAgICAgIG90aGVyUHJvcHM6IHtpZDogJ215Q2hlY2tib3gnfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBteUNoZWNrYm94Mjoge1xuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICAgICAgICAgICAgZm9ybVZhbHVlUGF0aDogJ215Q2hlY2tib3hbXScsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdtb2NrIGNoZWNrYm94IHZhbHVlIDInLFxuICAgICAgICAgICAgICAgIG90aGVyUHJvcHM6IHtpZDogJ215Q2hlY2tib3gyJ30sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbXlDaGVja2JveDM6IHtcbiAgICAgICAgICAgICAgICBjaGVja2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICAgICAgICAgICAgZm9ybVZhbHVlUGF0aDogJ215Q2hlY2tib3hbXScsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdtb2NrIGNoZWNrYm94IHZhbHVlIDMnLFxuICAgICAgICAgICAgICAgIG90aGVyUHJvcHM6IHtpZDogJ215Q2hlY2tib3gzJ30sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbXlOb1N1Ym1pdFRleHRGaWVsZDoge1xuICAgICAgICAgICAgICAgIGRvTm90U3VibWl0OiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb246ICh2YWx1ZTogc3RyaW5nKSA9PiAodmFsdWUgPT09ICd4JykgPyAndGhpcyBpcyBhbiB4JyA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ21vY2sgbm8gc3VibWl0IHRleHQgdmFsdWUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbXlTdWJtaXRUZXh0RmllbGQxOiB7XG4gICAgICAgICAgICAgICAgZm9ybVZhbHVlUGF0aDogJ3NvbWUuZGVlcC5uZXN0ZWQucGF0aFtdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiAodmFsdWU6IHN0cmluZykgPT4gKHZhbHVlID09PSAneCcpID8gJ3RoaXMgaXMgYW4geCcgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHN1Ym1pdEZpZWxkU3RhdGUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbXlTdWJtaXRUZXh0RmllbGQyOiB7XG4gICAgICAgICAgICAgICAgZm9ybVZhbHVlUGF0aDogJ3NvbWUuZGVlcC5uZXN0ZWQucGF0aFtdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiAodmFsdWU6IHN0cmluZykgPT4gKHZhbHVlID09PSAneCcpID8gJ3RoaXMgaXMgYW4geCcgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHN1Ym1pdEZpZWxkU3RhdGUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBmb3JtUHJvcHM6IHtcbiAgICAgICAgICAgIG9uRXhlY3V0ZVN1Ym1pdDogaGFuZGxlU3VibWl0LFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTdWJtaXQoZm9ybVZhbHVlczogb2JqZWN0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTdWJtaXR0ZWQnLCB7Zm9ybVZhbHVlc30pXG4gICAgICAgIHNldFN1Ym1pdFJlc29uc2UoSlNPTi5zdHJpbmdpZnkoZm9ybVZhbHVlcykpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyRXJyb3IoZmllbGROYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZmllbGRFcnJvciA9IGdldChmaWVsZEVycm9ycywgZmllbGROYW1lKTtcblxuICAgICAgICByZXR1cm4gZmllbGRFcnJvciAmJiA8ZGl2IHN0eWxlPXt7Y29sb3I6ICdyZWQnfX0+e2ZpZWxkRXJyb3J9PC9kaXY+O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVByb3BGaWVsZENoYW5nZShldmVudDogUmVhY3QuRm9ybUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSB7XG4gICAgICAgIHVwZGF0ZUZpZWxkUHJvcHMoKTtcbiAgICAgICAgc2V0U3VibWl0RmllbGRTdGF0ZShldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKHN1Ym1pdFJlc3BvbnNlKVxuICAgICAgICA/IDxkaXY+e3N1Ym1pdFJlc3BvbnNlfTwvZGl2PlxuICAgICAgICA6IChcbiAgICAgICAgICAgIDxmb3JtIG5hbWU9XCJtb2NrRm9ybU5hbWVcIiB7Li4uZ2V0Rm9ybVByb3BzKCl9ID5cbiAgICAgICAgICAgICAgICA8aW5wdXQgb25DaGFuZ2U9e2hhbmRsZVByb3BGaWVsZENoYW5nZX0gLz5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5nZXRGaWVsZFByb3BzKCdteU5vU3VibWl0VGV4dEZpZWxkJyl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIHtyZW5kZXJFcnJvcignbXlOb1N1Ym1pdFRleHRGaWVsZCcpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLmdldEZpZWxkUHJvcHMoJ215U3VibWl0VGV4dEZpZWxkMScpfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5nZXRGaWVsZFByb3BzKCdteVN1Ym1pdFRleHRGaWVsZDInKX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5nZXRGaWVsZFByb3BzKCdteUNoZWNrYm94Jyl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwibXlDaGVja2JveFwiPntnZXRGaWVsZFByb3BzKCdteUNoZWNrYm94JykudmFsdWV9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4uZ2V0RmllbGRQcm9wcygnbXlDaGVja2JveDInKX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJteUNoZWNrYm94MlwiPntnZXRGaWVsZFByb3BzKCdteUNoZWNrYm94MicpLnZhbHVlfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLmdldEZpZWxkUHJvcHMoJ215Q2hlY2tib3gzJyl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwibXlDaGVja2JveDNcIj57Z2V0RmllbGRQcm9wcygnbXlDaGVja2JveDMnKS52YWx1ZX08L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24gey4uLnN1Ym1pdEJ1dHRvblByb3BzfT5TdWJtaXQ8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgKTtcblxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IEV4YW1wbGUgZnJvbSAnLi9FeGFtcGxlJztcblxuUmVhY3RET00ucmVuZGVyKDxFeGFtcGxlIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcbiIsIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwicmVhY3Qtc2NyaXB0c1wiIC8+XG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBsb2Rhc2ggZnJvbSAnbG9kYXNoJztcblxuY29uc3Qge3VzZUVmZmVjdCwgdXNlU3RhdGV9ID0gUmVhY3Q7XG5jb25zdCB7XG4gICAgZW5kc1dpdGgsXG4gICAgZm9yRWFjaCxcbiAgICBnZXQsXG4gICAgaXNBcnJheSxcbiAgICBpc0VtcHR5LFxuICAgIGlzRnVuY3Rpb24sXG4gICAgbWFwVmFsdWVzLFxuICAgIG9taXQsXG4gICAgc2V0LFxuICAgIHRyYW5zZm9ybSxcbn0gPSBsb2Rhc2g7XG5cbmludGVyZmFjZSB1c2VGb3JtQ29udHJvbGxlckFyZ3Mge1xuICAgIGZpZWxkUHJvcHM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAgICBUaGUga2V5IHVzZWQgaGVyZSB3aWxsIGJlIHRoZSBuYW1lIGF0dHJpYnV0ZSBvZiB0aGUgZmllbGQuIEl0IHNob3VsZCBiZSBhIHVuaXF1ZVxuICAgICAgICAgICAgbmFtZS4gVGhpcyBrZXkgd2lsbCBiZSB0aGUgZGVmYXVsdCB2YWx1ZSBmb3IgdGhlIGZvcm1WYWx1ZVBhdGggaWYgdGhhdCBrZXkgaXNuJ3Qgc2V0LlxuICAgICAgICAgICAgSXQgaXMgaW1wb3J0YW50IHRvIE5PVCBzZXQgYSBuYW1lIGF0dHJpYnVlIGluIHRoZSBlbGVtZW50J3MvY29tcG9uZW50J3MgcHJvcHMgYW5kXG4gICAgICAgICAgICBvdmVycmlkZSB0aGlzIGtleTsgb3RoZXJ3aXNlLCB0aGUgdmFsdWUgd2lsbCBub3QgYmUgc2V0IHByb3Blcmx5IGZvciB0aGUgZm9ybSB2YWx1ZXNcbiAgICAgICAgICAgIG9yIHRoZSBzdGF0ZSB2YWx1ZSBvZiB0aGlzIGZpZWxkLiBJZiB5b3UgYXJlIHRyeWluZyB0byBwYXNzIGFuIGFycmF5IG9mIHZhbHVlcyBmb3JcbiAgICAgICAgICAgIGNoZWNrYm94ZXMsIHVzZSBhIHVuaXF1ZSBuYW1lIGhlcmUgZm9yIGVhY2ggY2hlY2tib3ggc3VjaCBhcyBteUNoZWNrYm94MSwgbXlDaGVja2JveDIsXG4gICAgICAgICAgICBldGMuIGFuZCBzZXQgdGhlIGZvcm1WYWx1ZVBhdGggdG8gdGhlIHNhbWUga2V5IHlvdSB3YW50IGl0IHRvIHVzZSB3aXRoIGFuIGFuZ2xlIGJyYWNrZXQsXG4gICAgICAgICAgICBhcyBpbiBbXSBhdCB0aGUgZW5kIG9mIHRoZSBuYW1lLiBTZWUgZm9ybVZhbHVlUGF0aCBvbiBob3cgdG8gZG8gdGhhdC5cbiAgICAgICAgKi9cbiAgICAgICAgW2tleTogc3RyaW5nXToge1xuICAgICAgICAgICAgLyoqIFRoZSBpbml0YWwgY2hlY2tlZCB2YWx1ZSBmb3IgYSBjaGVja2JveCBmaWVsZCB3aGljaCBjYW4gYmUgY2hhbmdlZCBieSB0aGUgcGFyZW50ICovXG4gICAgICAgICAgICBjaGVja2VkPzogYm9vbGVhbiB8IHVuZGVmaW5lZFxuICAgICAgICAgICAgLyoqIElmIHRydWUsIHRoaXMgZmllbGRWYWx1ZSB3aWxsIG5vdCBiZSBzdWJtaXR0ZWQgd2l0aCB0aGUgZm9ybSB2YWx1ZXMgKi9cbiAgICAgICAgICAgIGRvTm90U3VibWl0PzogYm9vbGVhblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgRGVmYXVsdHMgdG8gdGhlIGtleSBvZiB0aGlzIG9iamVjdCBpZiBub3Qgc2V0LlxuICAgICAgICAgICAgICAgIFRoaXMgaXMgYSBwYXJhbSBmb3IgdGhlIGxvZGFzaCBnZXQvc2V0IGZ1bmN0aW9ucyB0byBiZSBhYmxlIHRvIHNldCB0aGUgZm9ybSB2YWx1ZXMgYXMgeW91IG5lZWQuXG4gICAgICAgICAgICAgICAgVGhpcyBtYWtlcyBpdCBwb3NzaWJsZSB0byBidWlsZCBhbiBvYmplY3QgaW4gdGhlIGZvcm0gdmFsdWVzIGFzIGRlc2lyZWQgc3VjaCBhcyBpZiB5b3VcbiAgICAgICAgICAgICAgICBzZXQgdGhlIGZvcm1WYWx1ZVBhdGggdG8gbXkuZmllbGQucGF0aC5maWVsZDEsIGl0IHdvdWxkIHN1Ym1pdCB0aGUgdmFsdWUgaW4gYW4gb2JqZWN0XG4gICAgICAgICAgICAgICAgbGlrZSB0aGlzLi4uXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBteToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiB7ZmllbGQxOiAndmFsdWUgb2YgZmllbGQxJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBJZiB5b3UgYWRkIGFuZ2xlIGJyYWNrZXRzIGF0IHRoZSBlbmQgYXMgaW4gW10sIHRoaXMgd2lsbCBhZGQvcmVtb3ZlIHZhbHVlcyB0byBhbiBhcnJheSB3aGljaFxuICAgICAgICAgICAgICAgIGlzIGhhbmR5IGZvciBhIHNldCBvZiBjaGVja2JveGVzIHlvdSdkIGxpa2UgdG8gc2VuZCBhbiBhcnJheSBvZiB2YWx1ZXMgZm9yIGVhY2ggY2hlY2tib3hcbiAgICAgICAgICAgICAgICB0aGF0IGlzIGNoZWNrZWQuIEZvciBpbnN0YW5jZSwgaWYgdXNlZCBzZXQgZm9ybVZhbHVlUGF0aCB0byBteUNoZWNrYm94W10gb24gbXVsdGlwbGVcbiAgICAgICAgICAgICAgICBjaGVja2JveGVzIGluIHRoZSBmb3JtLCBpdCB3b3VsZCBzdWJtaXQgYSB2YWx1ZSBsaWtlIHRoaXMuLi5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG15Q2hlY2tib3g6IFsndmFsdWUgb2YgZmlyc3QgY2hlY2tib3ggY2hlY2tlZCcsICd2YWx1ZSBvZiBzZWNvbmQgY2hlY2tib3ggY2hlY2tlZCddXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFRoZSBlbXB0eSBhbmdsZSBicmFja2V0cywgW10sIGNhbiBvbmx5IGdvIGF0IHRoZSBlbmQgb2YgdGhlIGZvcm1WYWx1ZVBhdGguIEFueXRoaW5nIGVsc2VcbiAgICAgICAgICAgICAgICB3aXRoaW4gdGhlIHBhdGggbXVzdCBoYXZlIGFuIGluZGV4IG51bWJlciBsaWtlIG15LmZpZWxkWzBdLnBhdGhbXS5cbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBmb3JtVmFsdWVQYXRoPzogc3RyaW5nIHwgc3RyaW5nW11cbiAgICAgICAgICAgIC8qKiBDYWxsYmFjayBmdW5jdGlvbiB0byBydW4gYXQgdGhlIGVuZCBvZiB0aGUgb25DaGFuZ2UgZXZlbnQgb2YgdGhlIGVsZW1lbnQgKi9cbiAgICAgICAgICAgIG9uQWZ0ZXJDaGFuZ2U/OiBGdW5jdGlvblxuICAgICAgICAgICAgLyoqIENhbGxiYWNrIGZ1bmN0aW9uIHRvIHJ1biBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBvbkNoYW5nZSBldmVudCBvZiB0aGUgZWxlbWVudCAqL1xuICAgICAgICAgICAgb25CZWZvcmVDaGFuZ2U/OiBGdW5jdGlvblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgT3RoZXIgcHJvcHMgdG8gYmUgYWRkZWQgdG8gdGhlIGZpZWxkIHByb3BzIHRoYXQgd2lsbCBub3QgYmUgdXNlZCBieSB0aGlzIGhvb2suXG4gICAgICAgICAgICAgICAgVGhlc2UgY2FuIGFsc28gYmUgYWRkZWQgdG8gdGhlIGNvbXBvbmVudC9lbGVtZW50IGRpcmVjdGx5OyBob3dldmVyLCBpdCBpcyBhdmFpbGFibGVcbiAgICAgICAgICAgICAgICBoZXJlIGFzIGFuIG9wdG9pbiB0byBrZWVwIGFsbCB0aGUgcHJvcHMgaW4gb25lIHBsYWNlLlxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG90aGVyUHJvcHM/OiBvYmplY3RcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgIFRoZSB0eXBlIG9mIGlucHV0IHN1Y2ggYXMgY2hlY2tlZCwgcmFkaW8sIHRleHQsIGV0Yy4gVGhpcyBvbmx5IG5lZWRzIHRvIGJlIHNldFxuICAgICAgICAgICAgICAgIGlmIGl0J3Mgc29tZXRoaW5nIG90aGVyIHRoYW4gdGV4dC5cbiAgICAgICAgICAgICovXG4gICAgICAgICAgICB0eXBlPzogc3RyaW5nXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICBBIGZ1bmN0aW9uIG9yIGFycmF5IG9mIGZ1bmN0aW9ucyB0byBydW4gYWdhaW5zdCB0aGUgdmFsdWUgb2YgdGhlIGZpZWxkXG4gICAgICAgICAgICAgICAgSWYgdGhlIHZhbHVlIHBhc3NlcyBpdCBzaG91bGQgcmV0dXJuIHVuZGVmaW5lZC4gSWYgbm90LCBpdCBzaG91bGQgcmV0dXJuXG4gICAgICAgICAgICAgICAgdGhlIGRlc2lyZWQgZmllbGQgZXJyb3Igc3VjaCBhcyBcIlRoaXMgZmllbGQgaXMgcmVxdWlyZWRcIi4gVGhlIGNhbGxiYWNrIGFyZ3VtZW50c1xuICAgICAgICAgICAgICAgIGFyZSB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgZmllbGQgZm9yIHRoZSBmaXJzdCBhcmd1bWVudCBhbmQgdGhlIGZpZWxkIHZhbHVlcyBvZlxuICAgICAgICAgICAgICAgIHRoZSBvdGhlciBmaWVsZHMgaW4gdGhlIHNlY29uZCBhcmd1bWVudCBpbiBjYXNlIHZhbGlkYXRpb24gbmVlZHMgdG8gaGFwcGVuIGJhc2VkXG4gICAgICAgICAgICAgICAgb24gdGhlIHZhbHVlIG9mIGFub3RoZXIgZmllbGQuXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgdmFsaWRhdGlvbj86IChmaWVsZFZhbHVlOiBhbnksIGZpZWxkVmFsdWVzOiBPYmplY3QpID0+IHN0cmluZyB8IHVuZGVmaW5lZCB8IFsoZmllbGRWYWx1ZTogYW55LCBmaWVsZFZhbHVlczogT2JqZWN0KSA9PiBzdHJpbmcgfCB1bmRlZmluZWRdXG4gICAgICAgICAgICAvKiogVGhlIGluaXRhbCB2YWx1ZSBmb3IgdGhlIGZpZWxkIHdoaWNoIGNhbiBiZSBjaGFuZ2VkIGJ5IHRoZSBwYXJlbnQgKi9cbiAgICAgICAgICAgIHZhbHVlPzogbnVtYmVyIHwgc3RyaW5nIHwgdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9ybVByb3BzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgICAgT3ZlcmFsbCBkZXNpcmVkIGZvcm0gdmFsdWUgdG8gc3VibWl0IHdoZW4gdGhlIGZpZWxkIGlzIGVtcHR5IG9yIGNoZWNrYm94IGlzbid0IGNoZWNrZWQuXG4gICAgICAgICAgICBUaGlzIGlzIHR5cGljYWxseSB0aGUgdmFsdWUgeW91IHdhbnQgdG8gc2VlIG9uIHRoZSBiYWNrZW5kLiBJZiB0aGlzIGlzbid0IHNldCBvclxuICAgICAgICAgICAgdGhlIHZhbHVlIGlzIHNldCB0byB1bmRlZmluZWQsIHRoZSBrZXkgb2YgdGhlIGZpZWxkIHdpbGwgbm90IGJlIHN1Ym1pdHRlZCB3aXRoIHRoZVxuICAgICAgICAgICAgZm9ybSB2YWx1ZXMgb2JqZWN0LlxuICAgICAgICAqL1xuICAgICAgICBudWxsVmFsdWU/OiBudWxsIHwgc3RyaW5nIHwgdW5kZWZpbmVkXG4gICAgICAgIC8qKlxuICAgICAgICAgICAgQ2FsbGJhY2sgZnVuY3Rpb24gdG8gcnVuIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIG9uU3VibWl0IGV2ZW50IG9mIHRoZSBmb3JtIGVsZW1lbnQuXG4gICAgICAgICAgICBUaGlzIHdpbGwgZXhlY3V0ZSBiZWZvcmUgYW55dGhpbmcgaW5jbHVkaW5nIHRoZSB2YWxpZGF0aW9uIHJ1bnMgYW5kIHdpbGwgcGVyZm9ybVxuICAgICAgICAgICAgYW55IHRpbWUgdGhlIG9uU3VibWl0IGV2ZW50IGlzIGRpc3BhdGNoZWQuXG4gICAgICAgICovXG4gICAgICAgIG9uQmVmb3JlU3VibWl0PzogRnVuY3Rpb25cbiAgICAgICAgLyoqXG4gICAgICAgICAgICBDYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gYWxsIHZhbGlkYXRpb24gcGFzc2VzIGZvciB0aGUgZm9ybSBhbmQgaXQnc1xuICAgICAgICAgICAgc2FmZSB0byBzdWJtaXQuIFRoaXMgaXMgdGhlIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIHVzZWQgZm9yIHRoZSBjYWxsIHRvIHRoZVxuICAgICAgICAgICAgYmFja2VuZCBvciBkZXNpcmVkIGFjdGlvbnMgYWZ0ZXIgZXZlcnl0aGluZyBwYXNzZXMgZnJvbSB0aGUgZm9ybS4gSWYgdGhpcyBmdW5jdGlvblxuICAgICAgICAgICAgZG9lcyBub3QgcmV0dXJuIGEgUHJvbWlzZSwgdGhpcyBjdXN0b20gaG9vayB3aWxsIGFkZCBvbmUuXG4gICAgICAgICovXG4gICAgICAgIG9uRXhlY3V0ZVN1Ym1pdD86IEZ1bmN0aW9uXG4gICAgICAgIC8qKlxuICAgICAgICAgICAgQ2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSBhZnRlciB0aGUgUHJvbWlzZSBmcm9tIG9uRXhlY3V0ZVN1Ym1pdCBoYXMgYmVlblxuICAgICAgICAgICAgcmVzb2x2ZWQuIFRoaXMgaXMgdGhlIGZ1bmN0aW9uIHRvIHVzZSBmb3Igc3VjY2VzZnVsIHN1Ym1pdHMgc3VjaCBhcyBjbG9zaW5nXG4gICAgICAgICAgICBhIG1vZGFsLCBuYXZpZ2F0aW5nIHRvIGEgbmV3IHBhZ2Ugb3Igc2hvd2luZyBhIHN1Y2Nlc3MgbWVzc2FnZS5cbiAgICAgICAgKi9cbiAgICAgICAgb25BZnRlclN1Ym1pdD86IEZ1bmN0aW9uXG4gICAgICAgIC8qKlxuICAgICAgICAgICAgT3RoZXIgcHJvcHMgdG8gYmUgYWRkZWQgdG8gdGhlIGZvcm0gcHJvcHMgdGhhdCB3aWxsIG5vdCBiZSB1c2VkIGJ5IHRoaXMgaG9vay5cbiAgICAgICAgICAgIFRoZXNlIGNhbiBhbHNvIGJlIGFkZGVkIHRvIHRoZSBjb21wb25lbnQvZWxlbWVudCBkaXJlY3RseTsgaG93ZXZlciwgaXQgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgICBoZXJlIGFzIGFuIG9wdG9pbiB0byBrZWVwIGFsbCB0aGUgcHJvcHMgaW4gb25lIHBsYWNlLi5cbiAgICAgICAgKi9cbiAgICAgICAgb3RoZXJQcm9wcz86IE9iamVjdFxuICAgIH1cbn1cblxuaW50ZXJmYWNlIHVzZUZvcm1Db250cm9sbGVyUmVzcG9uc2Uge1xuICAgIGZpZWxkRXJyb3JzOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1xuICAgIH1cbiAgICBnZXRGb3JtUHJvcHM6ICgpID0+ICh7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHtcbiAgICAgICAgICAgIG9uU3VibWl0OiBGdW5jdGlvblxuICAgICAgICB9XG4gICAgfSlcbiAgICBnZXRGaWVsZFByb3BzOiAoKSA9PiAoe1xuICAgICAgICBjaGVja2VkPzogYm9vbGVhblxuICAgICAgICBkaXNhYmxlZD86IGJvb2xlYW5cbiAgICAgICAgbmFtZTogc3RyaW5nXG4gICAgICAgIHJlZjogRnVuY3Rpb25cbiAgICAgICAgdmFsdWU6IHN0cmluZyB8IG51bWJlciB8IG51bGxcbiAgICB9KVxuICAgIHN1Ym1pdEJ1dHRvblByb3BzOiB7XG4gICAgICAgIGRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIH1cbiAgICB1cGRhdGVGaWVsZFByb3BzOiBGdW5jdGlvblxufVxuXG5pbnRlcmZhY2UgZmllbGRTdGF0ZSB7XG4gICAgW2tleTogc3RyaW5nXToge1xuICAgICAgICBjaGVja2VkPzogYm9vbGVhbiB8IHVuZGVmaW5lZFxuICAgICAgICByZWY/OiBhbnkgLy8gUHJvYmFibHkgc2hvdWxkIGZpbmQgdGhlIHJpZ2h0IHR5cGUgZm9yIHRoaXNcbiAgICAgICAgdHlwZT86IHN0cmluZ1xuICAgICAgICB2YWx1ZT86IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZFxuICAgIH1cbn1cblxuaW50ZXJmYWNlIGZpZWxkRXJyb3JzIHtcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmdcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlRm9ybUNvbnRyb2xsZXI8dXNlRm9ybUNvbnRyb2xsZXJSZXNwb25zZT4oe1xuICAgIGZpZWxkUHJvcHMsXG4gICAgZm9ybVByb3BzLFxufTogdXNlRm9ybUNvbnRyb2xsZXJBcmdzKSB7XG4gICAgY29uc3QgW2ZpZWxkU3RhdGUsIHNldEZpZWxkU3RhdGVdID0gdXNlU3RhdGU8ZmllbGRTdGF0ZT4oXG4gICAgICAgIG1hcFZhbHVlcyhmaWVsZFByb3BzLCAoe2NoZWNrZWQsIHR5cGUsIHZhbHVlfSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtjaGVja2VkLCB0eXBlLCB2YWx1ZX1cbiAgICAgICAgfSlcbiAgICApO1xuICAgIGNvbnN0IFtmaWVsZEVycm9ycywgc2V0RmllbGRFcnJvcnNdID0gdXNlU3RhdGU8ZmllbGRFcnJvcnM+KHt9KTtcbiAgICBjb25zdCBbZm9ybUlzU3VibWl0dGluZywgc2V0Rm9ybUlzU3VibWl0dGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3QgW2luaXRpYWxTdWJtaXQsIHNldEluaXRpYWxTdWJtaXRdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGNvbnN0IFtleGVjdXRlRmllbGRQcm9wVXBkYXRlLCBzZXRFeGVjdXRlRmllbGRQcm9wVXBkYXRlXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChleGVjdXRlRmllbGRQcm9wVXBkYXRlKSB7XG4gICAgICAgICAgICBsZXQgbmV3RmllbGRTdGF0ZSA9IHsuLi5maWVsZFN0YXRlfTtcblxuICAgICAgICAgICAgZm9yRWFjaChmaWVsZFByb3BzLCAoZmllbGRPYmosIGZpZWxkTmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIG5ld0ZpZWxkU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgLi4ubmV3RmllbGRTdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICBbZmllbGROYW1lXToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5uZXdGaWVsZFN0YXRlW2ZpZWxkTmFtZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmZpZWxkT2JqLFxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2V0RmllbGRTdGF0ZShuZXdGaWVsZFN0YXRlKTtcbiAgICAgICAgICAgIHNldEV4ZWN1dGVGaWVsZFByb3BVcGRhdGUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSxbZXhlY3V0ZUZpZWxkUHJvcFVwZGF0ZSwgZmllbGRQcm9wcywgZmllbGRTdGF0ZV0pXG5cbiAgICBmdW5jdGlvbiB1cGRhdGVGaWVsZFByb3BzKCkge1xuICAgICAgICBzZXRFeGVjdXRlRmllbGRQcm9wVXBkYXRlKHRydWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEZpZWxkKFxuICAgICAgICBuYW1lOiBzdHJpbmcsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIGNoZWNrZWQ/OiBib29sZWFuIHwgdW5kZWZpbmVkXG4gICAgICAgICAgICByZWY/OiBhbnkgLy8gUHJvYmFibHkgc2hvdWxkIGZpbmQgdGhlIHJpZ2h0IHR5cGUgZm9yIHRoaXNcbiAgICAgICAgICAgIHR5cGU/OiBzdHJpbmdcbiAgICAgICAgICAgIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkXG4gICAgfSkge1xuICAgICAgICBzZXRGaWVsZFN0YXRlKHtcbiAgICAgICAgICAgICAgLi4uZmllbGRTdGF0ZSxcbiAgICAgICAgICAgICAgW25hbWVdOiB7XG4gICAgICAgICAgICAgICAgICAuLi5maWVsZFN0YXRlW25hbWVdLFxuICAgICAgICAgICAgICAgICAgLi4ucGF5bG9hZCxcbiAgICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGb3JtVmFsdWVzKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICAgICAgbGV0IGZvcm1WYWx1ZXMgPSB7fTtcblxuICAgICAgICBmb3JFYWNoKGZpZWxkU3RhdGUsICh7Y2hlY2tlZCwgcmVmID0ge30sIHZhbHVlfSwgZmllbGROYW1lKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWZpZWxkUHJvcHNbZmllbGROYW1lXS5kb05vdFN1Ym1pdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGVJc0NoZWNrYm94ID0gKFxuICAgICAgICAgICAgICAgICAgICBmaWVsZFByb3BzW2ZpZWxkTmFtZV0udHlwZSA9PT0gJ2NoZWNrYm94JyB8fFxuICAgICAgICAgICAgICAgICAgICBmaWVsZFByb3BzW2ZpZWxkTmFtZV0udHlwZSA9PT0gJ3JhZGlvJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY29uc3QgbnVsbFZhbHVlID0gKHR5cGVJc0NoZWNrYm94KVxuICAgICAgICAgICAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICA6IGZvcm1Qcm9wcy5udWxsVmFsdWU7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gKGNoZWNrZWQgfHwgKCF0eXBlSXNDaGVja2JveCAmJiB2YWx1ZSAmJiB2YWx1ZSAhPT0gJycpKVxuICAgICAgICAgICAgICAgICAgICA/IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZvcm1WYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1WYWx1ZVBhdGggPSBmaWVsZFByb3BzW2ZpZWxkTmFtZV0uZm9ybVZhbHVlUGF0aCB8fCBmaWVsZE5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXRQYXRoID0gKGlzQXJyYXkoZm9ybVZhbHVlUGF0aCkpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGZvcm1WYWx1ZVBhdGguam9pbignLicpLnJlcGxhY2UoJy5bJywgJy4nKS5yZXBsYWNlKCddLicsICcuJylcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZm9ybVZhbHVlUGF0aDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZW5kc1dpdGgoZm9ybVZhbHVlUGF0aC50b1N0cmluZygpLCAnW10nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGF0aCA9IHNldFBhdGgucmVwbGFjZSgnW10nLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50Rm9ybVZhbHVlID0gIGdldChmb3JtVmFsdWVzLCBzZXRQYXRoKSB8fCBbXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KGZvcm1WYWx1ZXMsIHNldFBhdGgsIFsuLi5jdXJyZW50Rm9ybVZhbHVlLCBmb3JtVmFsdWVdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldChmb3JtVmFsdWVzLCBzZXRQYXRoLCBmb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZm9ybVZhbHVlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0RmllbGQ8SHRtbElucHV0RWxlbWVudD4oaW5wdXRSZWY6IGFueSkge1xuICAgICAgICBpZiAoaW5wdXRSZWYgIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIFNvbWUgY29tcG9uZXQgbGlicmFyaWVzIHJldHVybiBpbnB1dEVsZW1lbnQgYXMgdGhlIGFjdHVhbCByZWZcbiAgICAgICAgICAgIC8vIE1heSBuZWVkIHRvIGFkZCBtb3JlIGlmIG90aGVyIGxpYnJhcmllcyBhcmUgdXNlZFxuICAgICAgICAgICAgY29uc3QgaW5wdXRFbGVtZW50ID0gZ2V0KGlucHV0UmVmLCAnaW5wdXRFbGVtZW50JykgfHwgaW5wdXRSZWY7XG4gICAgICAgICAgICBpZiAoaW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3Qge25hbWV9ID0gaW5wdXRFbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VzZUZvcm1Db250cm9sbGVyOiBBIG5hbWUgYXR0cmlidXRlIG11c3QgYmUgc3BlY2lmaWVkIGZvciB0aGlzIGVsZW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAge2lucHV0RWxlbWVudH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFnZXQoZmllbGRTdGF0ZSwgW25hbWUsICdyZWYnXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RmllbGQobmFtZSwge3JlZjogaW5wdXRFbGVtZW50fSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgICAgICAndXNlRm9ybUNvbnRyb2xsZXI6IENvdWxkIG5vdCBzZXQgYSByZWYgZm9yIHRoaXMgZm9ybSBmaWVsZCcsXG4gICAgICAgICAgICAgICAgICAgIHtpbnB1dFJlZn1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVGaWVsZChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBbc3RyaW5nIHwgbnVtYmVyXSB8IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCB2YWxpZGF0ZUZ1bmN0aW9ucyA9IGZpZWxkUHJvcHNbbmFtZV0udmFsaWRhdGlvbjtcbiAgICAgICAgbGV0IGZpZWxkRXJyb3I6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAodmFsaWRhdGVGdW5jdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkVmFsaWRhdGlvbiA9IChpc0FycmF5KHZhbGlkYXRlRnVuY3Rpb25zKSkgPyB2YWxpZGF0ZUZ1bmN0aW9ucyA6IFt2YWxpZGF0ZUZ1bmN0aW9uc107XG5cbiAgICAgICAgICAgIC8vIFVzaW5nIHRoZSBsb2Rhc2ggdHJhbnNmb3JtIHRvIHJ1biB1bnRpbCBpdCBmaW5kcyB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgIC8vIFRoaXMgd2F5IGl0IG9ubHkgc2hvd3Mgb25lIHZhbGlkYXRpb24gZXJyb3IgYXQgYSB0aW1lIHVudGlsXG4gICAgICAgICAgICAvLyB0aGV5IGFyZSBhbGwgZ29uZSBpZiB0aGVyZSBhcmUgbXVsdGlwbGVzLlxuICAgICAgICAgICAgdHJhbnNmb3JtKGZpZWxkVmFsaWRhdGlvbiwgKHJldHVybkZpZWxkRXJyb3JzLCB2YWxpZGF0b3IpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzRnVuY3Rpb24odmFsaWRhdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcigndXNlRm9ybUNvbnRyb2xsZXI6IEZpZWxkIHZhbGlkYXRvcnMgbXVzdCBiZSBmdW5jdGlvbnMnLCB7dmFsaWRhdG9yfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBQcm9iYWJseSBuZWVkIHRvIG1lbW9pemUgZ2V0Rm9ybVZhbHVlcyBvciBzb21ldGhpbmdcbiAgICAgICAgICAgICAgICAgICAgZmllbGRFcnJvciA9IHZhbGlkYXRvcih2YWx1ZSwgZ2V0Rm9ybVZhbHVlcyk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gIWZpZWxkRXJyb3I7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGZpZWxkRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBzZXRGaWVsZEVycm9ycyh7XG4gICAgICAgICAgICAgICAgICAgIC4uLmZpZWxkRXJyb3JzLFxuICAgICAgICAgICAgICAgICAgICBbbmFtZV06IGZpZWxkRXJyb3IsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0RmllbGRFcnJvcnMob21pdChmaWVsZEVycm9ycywgbmFtZSkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmllbGRFcnJvcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGaWVsZHNUb1ZhbGlkYXRlKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgbGV0IGZpZWxkc1RvVmFsaWRhdGU6c3RyaW5nW10gPSBbXTtcblxuICAgICAgICBmb3JFYWNoKGZpZWxkUHJvcHMsIChmaWVsZFByb3AsIGZpZWxkTmFtZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGZpZWxkUHJvcC52YWxpZGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgZmllbGRzVG9WYWxpZGF0ZS5wdXNoKGZpZWxkTmFtZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gZmllbGRzVG9WYWxpZGF0ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUFsbEZpZWxkcygpOmJvb2xlYW4ge1xuICAgICAgICBsZXQgZmllbGRzSGF2ZUVycm9yID0gZmFsc2U7XG5cbiAgICAgICAgdHJhbnNmb3JtKGdldEZpZWxkc1RvVmFsaWRhdGUoKSwgKGZpZWxkRXJyb3JzOiBPYmplY3QsIGZpZWxkTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZEVycm9yID0gdmFsaWRhdGVGaWVsZChcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWUsXG4gICAgICAgICAgICAgICAgZmllbGRTdGF0ZVtmaWVsZE5hbWVdLnJlZi52YWx1ZSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGZpZWxkc0hhdmVFcnJvciA9ICEhZmllbGRFcnJvclxuICAgICAgICAgICAgcmV0dXJuICFmaWVsZEVycm9yO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmllbGRzSGF2ZUVycm9yO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUZpZWxkQ2hhbmdlKGV2ZW50OiBSZWFjdC5Gb3JtRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pOiB2b2lkIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgY2hlY2tlZCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgfSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQgfHwge1xuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgICBuYW1lOiAnbmFtZU5vdFN1cHBsaWVkJyxcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgIH07XG5cbiAgICAgICAgc2V0RmllbGQobmFtZSwge1xuICAgICAgICAgICAgY2hlY2tlZDogKGNoZWNrZWQgPT09IHRydWUpID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICB9KTtcbiAgICAgICAgdmFsaWRhdGVGaWVsZChuYW1lLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlRm9ybVN1Ym1pdChldmVudDogUmVhY3QuRm9ybUV2ZW50PEhUTUxGb3JtRWxlbWVudD4pIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgZmllbGRzSGF2ZUVycm9yO1xuICAgICAgICBjb25zdCBvbkJlZm9yZVN1Ym1pdCA9IGdldChmb3JtUHJvcHMsICdvbkJlZm9yZVN1Ym1pdCcsICgpID0+IG51bGwpO1xuXG4gICAgICAgIG9uQmVmb3JlU3VibWl0KCk7XG4gICAgICAgIGlmICghaW5pdGlhbFN1Ym1pdCkge1xuICAgICAgICAgICAgLy8gVmFsaWRhdGluZyBhbGwgZmllbGRzIGZvciBhdXRvZmlsbCB2YWx1ZXMgaWYgdGhlcmUgaGFzbid0IGJlZW4gYW4gaW5pdGlhbCBzdWJtaXRcbiAgICAgICAgICAgIGZpZWxkc0hhdmVFcnJvciA9IHZhbGlkYXRlQWxsRmllbGRzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWZpZWxkc0hhdmVFcnJvcikge1xuICAgICAgICAgICAgZXhlY3V0ZUZvcm0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEluaXRpYWxTdWJtaXQodHJ1ZSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUZvcm0oKSB7XG4gICAgICAgIGNvbnN0IG9uRXhlY3V0ZVN1Ym1pdCA9IGdldChmb3JtUHJvcHMsICdvbkV4ZWN1dGVTdWJtaXQnLCAoZm9ybVZhbHVlczogb2JqZWN0KSA9PiBudWxsKTtcbiAgICAgICAgY29uc3Qgb25BZnRlclN1Ym1pdCA9IGdldChmb3JtUHJvcHMsICdvbkFmdGVyU3VibWl0JywgKCkgPT4gbnVsbCk7XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZXMgPSBnZXRGb3JtVmFsdWVzKCk7XG5cbiAgICAgICAgc2V0Rm9ybUlzU3VibWl0dGluZyh0cnVlKTtcbiAgICAgICAgYXdhaXQgKG9uRXhlY3V0ZVN1Ym1pdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgICAgICA/IG9uRXhlY3V0ZVN1Ym1pdChmb3JtVmFsdWVzKVxuICAgICAgICAgICAgOiBQcm9taXNlLnJlc29sdmUob25FeGVjdXRlU3VibWl0KGZvcm1WYWx1ZXMpKTtcblxuICAgICAgICBzZXRGb3JtSXNTdWJtaXR0aW5nKGZhbHNlKTtcbiAgICAgICAgb25BZnRlclN1Ym1pdCgpO1xuICAgIH1cblxuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvblByb3BzID0ge1xuICAgICAgICBkaXNhYmxlZDogISEoXG4gICAgICAgICAgICBmb3JtSXNTdWJtaXR0aW5nIHx8XG4gICAgICAgICAgICAoaW5pdGlhbFN1Ym1pdCAmJiAhaXNFbXB0eShmaWVsZEVycm9ycykpXG4gICAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGaWVsZFByb3BzKG5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCB7Y2hlY2tlZCwgdmFsdWV9ID0gZ2V0KGZpZWxkU3RhdGUsIFtuYW1lXSwge30pIGFzIGFueTtcbiAgICAgICAgY29uc3Qge3R5cGUsIG90aGVyUHJvcHN9ID0gZ2V0KGZpZWxkUHJvcHMsIFtuYW1lXSwge30pIGFzIGFueTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2hlY2tlZCxcbiAgICAgICAgICAgIGRpc2FibGVkOiAhIWZvcm1Jc1N1Ym1pdHRpbmcsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgb25DaGFuZ2U6IGhhbmRsZUZpZWxkQ2hhbmdlLFxuICAgICAgICAgICAgcmVmOiBpbml0RmllbGQsXG4gICAgICAgICAgICB0eXBlOiB0eXBlIHx8ICd0ZXh0JyxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgLi4ub3RoZXJQcm9wcyB8fCB7fSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZvcm1Qcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uU3VibWl0OiBoYW5kbGVGb3JtU3VibWl0LFxuICAgICAgICAgICAgLi4uZm9ybVByb3BzLm90aGVyUHJvcHMsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmaWVsZEVycm9yczogKGluaXRpYWxTdWJtaXQpID8gZmllbGRFcnJvcnMgOiB7fSxcbiAgICAgICAgZ2V0Rm9ybVZhbHVlcyxcbiAgICAgICAgZ2V0Rm9ybVByb3BzLFxuICAgICAgICBnZXRGaWVsZFByb3BzLFxuICAgICAgICBzdWJtaXRCdXR0b25Qcm9wcyxcbiAgICAgICAgdXBkYXRlRmllbGRQcm9wcyxcbiAgICB9O1xuXG59XG4iXX0=