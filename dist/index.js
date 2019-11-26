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
          var _fieldValues = getFormValues();

          fieldError = validator(_fieldValues[name], _fieldValues);
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

    if (!validateAllFields()) {
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
    var _objectSpread5;

    var _ref5 = get(fieldState, [name], {}),
        checked = _ref5.checked,
        value = _ref5.value;

    var _ref6 = get(fieldProps, [name], {}),
        inputRefKey = _ref6.inputRefKey,
        type = _ref6.type,
        otherProps = _ref6.otherProps;

    return _objectSpread((_objectSpread5 = {
      checked: checked,
      disabled: isFormSubmitting(),
      name: name,
      onChange: handleFieldChange
    }, _defineProperty(_objectSpread5, inputRefKey || 'ref', initField), _defineProperty(_objectSpread5, "type", type || 'text'), _defineProperty(_objectSpread5, "value", value), _objectSpread5), otherProps || {});
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWFjdC1hcHAtZW52LmQudHMiLCIuLi9zcmMvdXNlRm9ybUNvbnRyb2xsZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVPLFMsR0FBdUIsSyxDQUF2QixTO0lBQVcsUSxHQUFZLEssQ0FBWixRO0lBRWQsUSxHQVVBLE0sQ0FWQSxRO0lBQ0EsTyxHQVNBLE0sQ0FUQSxPO0lBQ0EsRyxHQVFBLE0sQ0FSQSxHO0lBQ0EsTyxHQU9BLE0sQ0FQQSxPO0lBQ0EsTyxHQU1BLE0sQ0FOQSxPO0lBQ0EsVSxHQUtBLE0sQ0FMQSxVO0lBQ0EsUyxHQUlBLE0sQ0FKQSxTO0lBQ0EsSSxHQUdBLE0sQ0FIQSxJO0lBQ0EsRyxHQUVBLE0sQ0FGQSxHO0lBQ0EsUyxHQUNBLE0sQ0FEQSxTOztBQXdKVyxTQUFTLGlCQUFULE9BR1c7QUFBQSxNQUZ0QixVQUVzQixRQUZ0QixVQUVzQjtBQUFBLE1BRHRCLFNBQ3NCLFFBRHRCLFNBQ3NCOztBQUFBLGtCQUNjLFFBQVEsQ0FDeEMsU0FBUyxDQUFDLFVBQUQsRUFBYSxpQkFBNEI7QUFBQSxRQUExQixPQUEwQixTQUExQixPQUEwQjtBQUFBLFFBQWpCLElBQWlCLFNBQWpCLElBQWlCO0FBQUEsUUFBWCxLQUFXLFNBQVgsS0FBVztBQUM5QyxXQUFPO0FBQUMsTUFBQSxPQUFPLEVBQVAsT0FBRDtBQUFVLE1BQUEsSUFBSSxFQUFKLElBQVY7QUFBZ0IsTUFBQSxLQUFLLEVBQUw7QUFBaEIsS0FBUDtBQUNILEdBRlEsQ0FEK0IsQ0FEdEI7QUFBQTtBQUFBLE1BQ2YsVUFEZTtBQUFBLE1BQ0gsYUFERzs7QUFBQSxtQkFNZ0IsUUFBUSxDQUFjLEVBQWQsQ0FOeEI7QUFBQTtBQUFBLE1BTWYsV0FOZTtBQUFBLE1BTUYsY0FORTs7QUFBQSxtQkFPMEIsUUFBUSxDQUFVLEtBQVYsQ0FQbEM7QUFBQTtBQUFBLE1BT2YsZ0JBUGU7QUFBQSxNQU9HLG1CQVBIOztBQUFBLG1CQVFvQixRQUFRLENBQVUsS0FBVixDQVI1QjtBQUFBO0FBQUEsTUFRZixhQVJlO0FBQUEsTUFRQSxnQkFSQTs7QUFBQSxtQkFTc0MsUUFBUSxDQUFVLEtBQVYsQ0FUOUM7QUFBQTtBQUFBLE1BU2Ysc0JBVGU7QUFBQSxNQVNTLHlCQVRUOztBQVd0QixFQUFBLFNBQVMsQ0FBQyxZQUFNO0FBQ1osUUFBSSxzQkFBSixFQUE0QjtBQUN4QixVQUFJLGFBQWEscUJBQU8sVUFBUCxDQUFqQjs7QUFFQSxNQUFBLE9BQU8sQ0FBQyxVQUFELEVBQWEsVUFBQyxRQUFELEVBQVcsU0FBWCxFQUF5QjtBQUN6QyxRQUFBLGFBQWEscUJBQ0osYUFESSxzQkFFTixTQUZNLG9CQUdBLGFBQWEsQ0FBQyxTQUFELENBSGIsRUFJQSxRQUpBLEdBQWI7QUFPSCxPQVJNLENBQVA7QUFVQSxNQUFBLGFBQWEsQ0FBQyxhQUFELENBQWI7QUFDQSxNQUFBLHlCQUF5QixDQUFDLEtBQUQsQ0FBekI7QUFDSDtBQUNKLEdBakJRLEVBaUJQLENBQUMsc0JBQUQsRUFBeUIsVUFBekIsRUFBcUMsVUFBckMsQ0FqQk8sQ0FBVDs7QUFtQkEsV0FBUyxnQkFBVCxHQUE0QjtBQUN4QixJQUFBLHlCQUF5QixDQUFDLElBQUQsQ0FBekI7QUFDSDs7QUFFRCxXQUFTLFFBQVQsQ0FDSSxJQURKLEVBRUksT0FGSixFQU9HO0FBQ0MsSUFBQSxhQUFhLG1CQUNKLFVBREksc0JBRU4sSUFGTSxvQkFHQSxVQUFVLENBQUMsSUFBRCxDQUhWLEVBSUEsT0FKQSxJQUFiO0FBT0g7O0FBRUQsV0FBUyxhQUFULEdBQStDO0FBQzNDLFFBQUksVUFBVSxHQUFHLEVBQWpCO0FBRUEsSUFBQSxPQUFPLENBQUMsVUFBRCxFQUFhLGlCQUE2QixTQUE3QixFQUEyQztBQUFBLFVBQXpDLE9BQXlDLFNBQXpDLE9BQXlDO0FBQUEsNEJBQWhDLEdBQWdDO0FBQUEsVUFBaEMsR0FBZ0MsMEJBQTFCLEVBQTBCO0FBQUEsVUFBdEIsS0FBc0IsU0FBdEIsS0FBc0I7O0FBQzNELFVBQUksQ0FBQyxVQUFVLENBQUMsU0FBRCxDQUFWLENBQXNCLFdBQTNCLEVBQXdDO0FBQ3BDLFlBQU0sY0FBYyxHQUNoQixVQUFVLENBQUMsU0FBRCxDQUFWLENBQXNCLElBQXRCLEtBQStCLFVBQS9CLElBQ0EsVUFBVSxDQUFDLFNBQUQsQ0FBVixDQUFzQixJQUF0QixLQUErQixPQUZuQztBQUlBLFlBQU0sU0FBUyxHQUFJLGNBQUQsR0FDWixTQURZLEdBRVosU0FBUyxDQUFDLFNBRmhCO0FBR0EsWUFBTSxTQUFTLEdBQUksT0FBTyxJQUFLLENBQUMsY0FBRCxJQUFtQixLQUFuQixJQUE0QixLQUFLLEtBQUssRUFBbkQsR0FDWixLQURZLEdBRVosU0FGTjs7QUFJQSxZQUFJLFNBQVMsS0FBSyxTQUFsQixFQUE2QjtBQUN6QixjQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsU0FBRCxDQUFWLENBQXNCLGFBQXRCLElBQXVDLFNBQTdEO0FBQ0EsY0FBSSxPQUFPLEdBQUksT0FBTyxDQUFDLGFBQUQsQ0FBUixHQUNSLGFBQWEsQ0FBQyxJQUFkLENBQW1CLEdBQW5CLEVBQXdCLE9BQXhCLENBQWdDLElBQWhDLEVBQXNDLEdBQXRDLEVBQTJDLE9BQTNDLENBQW1ELElBQW5ELEVBQXlELEdBQXpELENBRFEsR0FFUixhQUZOOztBQUlBLGNBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFkLEVBQUQsRUFBMkIsSUFBM0IsQ0FBWixFQUE4QztBQUMxQyxZQUFBLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBUixDQUFnQixJQUFoQixFQUFzQixFQUF0QixDQUFWO0FBQ0EsZ0JBQU0sZ0JBQWdCLEdBQUksR0FBRyxDQUFDLFVBQUQsRUFBYSxPQUFiLENBQUgsSUFBNEIsRUFBdEQ7QUFFQSxZQUFBLEdBQUcsQ0FBQyxVQUFELEVBQWEsT0FBYiwrQkFBMEIsZ0JBQTFCLElBQTRDLFNBQTVDLEdBQUg7QUFDSCxXQUxELE1BS087QUFDSCxZQUFBLEdBQUcsQ0FBQyxVQUFELEVBQWEsT0FBYixFQUFzQixTQUF0QixDQUFIO0FBQ0g7QUFDSjtBQUNKO0FBQ0osS0E3Qk0sQ0FBUDtBQStCQSxXQUFPLFVBQVA7QUFDSDs7QUFFRCxXQUFTLFNBQVQsQ0FBcUMsUUFBckMsRUFBb0Q7QUFDaEQsUUFBSSxRQUFRLEtBQUssSUFBakIsRUFBdUI7QUFDbkI7QUFDQTtBQUNBLFVBQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxRQUFELEVBQVcsY0FBWCxDQUFILElBQWlDLFFBQXREOztBQUNBLFVBQUksWUFBSixFQUFrQjtBQUFBLFlBQ1AsSUFETyxHQUNDLFlBREQsQ0FDUCxJQURPOztBQUdkLFlBQUksQ0FBQyxJQUFMLEVBQVc7QUFDUDtBQUNBLFVBQUEsT0FBTyxDQUFDLEtBQVIsQ0FDSSx3RUFESixFQUVJO0FBQUMsWUFBQSxZQUFZLEVBQVo7QUFBRCxXQUZKO0FBSUgsU0FORCxNQU1PLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBRCxFQUFhLENBQUMsSUFBRCxFQUFPLEtBQVAsQ0FBYixDQUFSLEVBQXFDO0FBQ3hDLFVBQUEsUUFBUSxDQUFDLElBQUQsRUFBTztBQUFDLFlBQUEsR0FBRyxFQUFFO0FBQU4sV0FBUCxDQUFSO0FBQ0g7QUFDSixPQVpELE1BWU87QUFDSDtBQUNBLFFBQUEsT0FBTyxDQUFDLEtBQVIsQ0FDSSw0REFESixFQUVJO0FBQUMsVUFBQSxRQUFRLEVBQVI7QUFBRCxTQUZKO0FBSUg7QUFDSjtBQUNKOztBQUVELFdBQVMsYUFBVCxDQUF1QixJQUF2QixFQUFxQyxLQUFyQyxFQUE2RjtBQUN6RixRQUFNLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxJQUFELENBQVYsQ0FBaUIsVUFBM0M7QUFDQSxRQUFJLFVBQUo7O0FBRUEsUUFBSSxpQkFBSixFQUF1QjtBQUNuQixVQUFNLGVBQWUsR0FBSSxPQUFPLENBQUMsaUJBQUQsQ0FBUixHQUErQixpQkFBL0IsR0FBbUQsQ0FBQyxpQkFBRCxDQUEzRSxDQURtQixDQUduQjtBQUNBO0FBQ0E7O0FBQ0EsTUFBQSxTQUFTLENBQUMsZUFBRCxFQUFrQixVQUFDLGlCQUFELEVBQW9CLFNBQXBCLEVBQWtDO0FBQ3pELFlBQUksQ0FBQyxVQUFVLENBQUMsU0FBRCxDQUFmLEVBQTRCO0FBQ3hCO0FBQ0EsVUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLHVEQUFkLEVBQXVFO0FBQUMsWUFBQSxTQUFTLEVBQVQ7QUFBRCxXQUF2RTtBQUNILFNBSEQsTUFHTztBQUNIO0FBQ0EsY0FBTSxZQUFXLEdBQUcsYUFBYSxFQUFqQzs7QUFFQSxVQUFBLFVBQVUsR0FBRyxTQUFTLENBQUMsWUFBVyxDQUFDLElBQUQsQ0FBWixFQUFvQixZQUFwQixDQUF0QjtBQUNIOztBQUdELGVBQU8sQ0FBQyxVQUFSO0FBQ0gsT0FiUSxDQUFUOztBQWVBLFVBQUksVUFBSixFQUFnQjtBQUNaLFFBQUEsY0FBYyxtQkFDUCxXQURPLHNCQUVULElBRlMsRUFFRixVQUZFLEdBQWQ7QUFJSCxPQUxELE1BS087QUFDSCxRQUFBLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBRCxFQUFjLElBQWQsQ0FBTCxDQUFkO0FBQ0g7QUFDSjs7QUFFRCxXQUFPLFVBQVA7QUFDSDs7QUFFRCxXQUFTLG1CQUFULEdBQXlDO0FBQ3JDLFFBQUksZ0JBQXlCLEdBQUcsRUFBaEM7QUFFQSxJQUFBLE9BQU8sQ0FBQyxVQUFELEVBQWEsVUFBQyxTQUFELEVBQVksU0FBWixFQUEwQjtBQUMxQyxVQUFJLFNBQVMsQ0FBQyxVQUFkLEVBQTBCO0FBQ3RCLFFBQUEsZ0JBQWdCLENBQUMsSUFBakIsQ0FBc0IsU0FBdEI7QUFDSDtBQUNKLEtBSk0sQ0FBUDtBQU1BLFdBQU8sZ0JBQVA7QUFDSDs7QUFFRCxXQUFTLGlCQUFULEdBQXFDO0FBQ2pDLFFBQUksZUFBZSxHQUFHLEtBQXRCO0FBRUEsSUFBQSxTQUFTLENBQUMsbUJBQW1CLEVBQXBCLEVBQXdCLFVBQUMsV0FBRCxFQUFzQixTQUF0QixFQUE0QztBQUN6RSxVQUFNLFVBQVUsR0FBRyxhQUFhLENBQzVCLFNBRDRCLEVBRTVCLFVBQVUsQ0FBQyxTQUFELENBQVYsQ0FBc0IsR0FBdEIsQ0FBMEIsS0FGRSxDQUFoQztBQUtBLE1BQUEsZUFBZSxHQUFHLENBQUMsQ0FBQyxVQUFwQjtBQUNBLGFBQU8sQ0FBQyxVQUFSO0FBQ0gsS0FSUSxDQUFUO0FBVUEsV0FBTyxlQUFQO0FBQ0g7O0FBRUQsV0FBUyxpQkFBVCxDQUEyQixLQUEzQixFQUEyRTtBQUFBLGdCQU1uRSxLQUFLLENBQUMsYUFBTixJQUF1QjtBQUN2QixNQUFBLE9BQU8sRUFBRSxLQURjO0FBRXZCLE1BQUEsSUFBSSxFQUFFLGlCQUZpQjtBQUd2QixNQUFBLElBQUksRUFBRSxNQUhpQjtBQUl2QixNQUFBLEtBQUssRUFBRTtBQUpnQixLQU40QztBQUFBLFFBRW5FLE9BRm1FLFNBRW5FLE9BRm1FO0FBQUEsUUFHbkUsSUFIbUUsU0FHbkUsSUFIbUU7QUFBQSxRQUluRSxJQUptRSxTQUluRSxJQUptRTtBQUFBLFFBS25FLEtBTG1FLFNBS25FLEtBTG1FOztBQWF2RSxJQUFBLFFBQVEsQ0FBQyxJQUFELEVBQU87QUFDWCxNQUFBLE9BQU8sRUFBRyxPQUFPLEtBQUssSUFBYixHQUFxQixJQUFyQixHQUE0QixLQUQxQjtBQUVYLE1BQUEsSUFBSSxFQUFKLElBRlc7QUFHWCxNQUFBLEtBQUssRUFBTDtBQUhXLEtBQVAsQ0FBUjtBQUtBLElBQUEsYUFBYSxDQUFDLElBQUQsRUFBTyxLQUFQLENBQWI7QUFDSDs7QUFFRCxXQUFTLGdCQUFULENBQTBCLEtBQTFCLEVBQW1FO0FBQy9ELElBQUEsS0FBSyxDQUFDLGNBQU47QUFFQSxRQUFJLGVBQUo7QUFDQSxRQUFNLGNBQWMsR0FBRyxHQUFHLENBQUMsU0FBRCxFQUFZLGdCQUFaLEVBQThCO0FBQUEsYUFBTSxJQUFOO0FBQUEsS0FBOUIsQ0FBMUI7QUFFQSxJQUFBLGNBQWM7O0FBRWQsUUFBSSxDQUFDLGlCQUFpQixFQUF0QixFQUEwQjtBQUN0QixNQUFBLFdBQVc7QUFDZDs7QUFFRCxJQUFBLGdCQUFnQixDQUFDLElBQUQsQ0FBaEI7QUFDSDs7QUF2TnFCLFdBeU5QLFdBek5PO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSw0QkF5TnRCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNVLGNBQUEsZUFEVixHQUM0QixHQUFHLENBQUMsU0FBRCxFQUFZLGlCQUFaLEVBQStCLFVBQUMsVUFBRDtBQUFBLHVCQUF3QixJQUF4QjtBQUFBLGVBQS9CLENBRC9CO0FBRVUsY0FBQSxhQUZWLEdBRTBCLEdBQUcsQ0FBQyxTQUFELEVBQVksZUFBWixFQUE2QjtBQUFBLHVCQUFNLElBQU47QUFBQSxlQUE3QixDQUY3QjtBQUdVLGNBQUEsVUFIVixHQUd1QixhQUFhLEVBSHBDO0FBS0ksY0FBQSxtQkFBbUIsQ0FBQyxJQUFELENBQW5CO0FBTEo7QUFBQSxxQkFNVyxlQUFlLFlBQVksT0FOdEM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFPVSxjQUFBLGVBQWUsQ0FBQyxVQUFELENBUHpCO0FBQUE7QUFBQTs7QUFBQTtBQVFVLGNBQUEsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsZUFBZSxDQUFDLFVBQUQsQ0FBL0IsQ0FSVjs7QUFBQTtBQVVJLGNBQUEsbUJBQW1CLENBQUMsS0FBRCxDQUFuQjtBQUNBLGNBQUEsYUFBYTs7QUFYakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0F6TnNCO0FBQUE7QUFBQTs7QUF1T3RCLFdBQVMsZ0JBQVQsR0FBNEI7QUFDeEIsV0FBTyxDQUFDLEVBQUUsZ0JBQWdCLElBQUksU0FBUyxDQUFDLGdCQUFoQyxDQUFSO0FBQ0g7O0FBRUQsTUFBTSxpQkFBaUIsR0FBRztBQUN0QixJQUFBLFFBQVEsRUFBRSxDQUFDLEVBQ1AsZ0JBQWdCLE1BQ2YsYUFBYSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQUQsQ0FGbkI7QUFEVyxHQUExQjs7QUFPQSxXQUFTLGFBQVQsQ0FBdUIsSUFBdkIsRUFBcUM7QUFBQTs7QUFBQSxnQkFDUixHQUFHLENBQUMsVUFBRCxFQUFhLENBQUMsSUFBRCxDQUFiLEVBQXFCLEVBQXJCLENBREs7QUFBQSxRQUMxQixPQUQwQixTQUMxQixPQUQwQjtBQUFBLFFBQ2pCLEtBRGlCLFNBQ2pCLEtBRGlCOztBQUFBLGdCQUVPLEdBQUcsQ0FBQyxVQUFELEVBQWEsQ0FBQyxJQUFELENBQWIsRUFBcUIsRUFBckIsQ0FGVjtBQUFBLFFBRTFCLFdBRjBCLFNBRTFCLFdBRjBCO0FBQUEsUUFFYixJQUZhLFNBRWIsSUFGYTtBQUFBLFFBRVAsVUFGTyxTQUVQLFVBRk87O0FBSWpDO0FBQ0ksTUFBQSxPQUFPLEVBQVAsT0FESjtBQUVJLE1BQUEsUUFBUSxFQUFFLGdCQUFnQixFQUY5QjtBQUdJLE1BQUEsSUFBSSxFQUFKLElBSEo7QUFJSSxNQUFBLFFBQVEsRUFBRTtBQUpkLHVDQUtLLFdBQVcsSUFBSSxLQUxwQixFQUs0QixTQUw1QiwyQ0FNVSxJQUFJLElBQUksTUFObEIsNENBT0ksS0FQSixvQkFRTyxVQUFVLElBQUksRUFSckI7QUFVSDs7QUFFRCxXQUFTLFlBQVQsR0FBd0I7QUFDcEI7QUFDSSxNQUFBLFFBQVEsRUFBRTtBQURkLE9BRU8sU0FBUyxDQUFDLFVBRmpCO0FBSUg7O0FBRUQsU0FBTztBQUNILElBQUEsV0FBVyxFQUFHLGFBQUQsR0FBa0IsV0FBbEIsR0FBZ0MsRUFEMUM7QUFFSCxJQUFBLGdCQUFnQixFQUFFLGdCQUFnQixFQUYvQjtBQUdILElBQUEsYUFBYSxFQUFiLGFBSEc7QUFJSCxJQUFBLFlBQVksRUFBWixZQUpHO0FBS0gsSUFBQSxhQUFhLEVBQWIsYUFMRztBQU1ILElBQUEsaUJBQWlCLEVBQWpCLGlCQU5HO0FBT0gsSUFBQSxnQkFBZ0IsRUFBaEI7QUFQRyxHQUFQO0FBVUgiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInJlYWN0LXNjcmlwdHNcIiAvPlxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgbG9kYXNoIGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IHt1c2VFZmZlY3QsIHVzZVN0YXRlfSA9IFJlYWN0O1xuY29uc3Qge1xuICAgIGVuZHNXaXRoLFxuICAgIGZvckVhY2gsXG4gICAgZ2V0LFxuICAgIGlzQXJyYXksXG4gICAgaXNFbXB0eSxcbiAgICBpc0Z1bmN0aW9uLFxuICAgIG1hcFZhbHVlcyxcbiAgICBvbWl0LFxuICAgIHNldCxcbiAgICB0cmFuc2Zvcm0sXG59ID0gbG9kYXNoO1xuXG5pbnRlcmZhY2UgdXNlRm9ybUNvbnRyb2xsZXJBcmdzIHtcbiAgICBmaWVsZFByb3BzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgICAgVGhlIGtleSB1c2VkIGhlcmUgd2lsbCBiZSB0aGUgbmFtZSBhdHRyaWJ1dGUgb2YgdGhlIGZpZWxkLiBJdCBzaG91bGQgYmUgYSB1bmlxdWVcbiAgICAgICAgICAgIG5hbWUuIFRoaXMga2V5IHdpbGwgYmUgdGhlIGRlZmF1bHQgdmFsdWUgZm9yIHRoZSBmb3JtVmFsdWVQYXRoIGlmIHRoYXQga2V5IGlzbid0IHNldC5cbiAgICAgICAgICAgIEl0IGlzIGltcG9ydGFudCB0byBOT1Qgc2V0IGEgbmFtZSBhdHRyaWJ1ZSBpbiB0aGUgZWxlbWVudCdzL2NvbXBvbmVudCdzIHByb3BzIGFuZFxuICAgICAgICAgICAgb3ZlcnJpZGUgdGhpcyBrZXk7IG90aGVyd2lzZSwgdGhlIHZhbHVlIHdpbGwgbm90IGJlIHNldCBwcm9wZXJseSBmb3IgdGhlIGZvcm0gdmFsdWVzXG4gICAgICAgICAgICBvciB0aGUgc3RhdGUgdmFsdWUgb2YgdGhpcyBmaWVsZC4gSWYgeW91IGFyZSB0cnlpbmcgdG8gcGFzcyBhbiBhcnJheSBvZiB2YWx1ZXMgZm9yXG4gICAgICAgICAgICBjaGVja2JveGVzLCB1c2UgYSB1bmlxdWUgbmFtZSBoZXJlIGZvciBlYWNoIGNoZWNrYm94IHN1Y2ggYXMgbXlDaGVja2JveDEsIG15Q2hlY2tib3gyLFxuICAgICAgICAgICAgZXRjLiBhbmQgc2V0IHRoZSBmb3JtVmFsdWVQYXRoIHRvIHRoZSBzYW1lIGtleSB5b3Ugd2FudCBpdCB0byB1c2Ugd2l0aCBhbiBhbmdsZSBicmFja2V0LFxuICAgICAgICAgICAgYXMgaW4gW10gYXQgdGhlIGVuZCBvZiB0aGUgbmFtZS4gU2VlIGZvcm1WYWx1ZVBhdGggb24gaG93IHRvIGRvIHRoYXQuXG4gICAgICAgICovXG4gICAgICAgIFtrZXk6IHN0cmluZ106IHtcbiAgICAgICAgICAgIC8qKiBUaGUgaW5pdGFsIGNoZWNrZWQgdmFsdWUgZm9yIGEgY2hlY2tib3ggZmllbGQgd2hpY2ggY2FuIGJlIGNoYW5nZWQgYnkgdGhlIHBhcmVudCAqL1xuICAgICAgICAgICAgY2hlY2tlZD86IGJvb2xlYW4gfCB1bmRlZmluZWRcbiAgICAgICAgICAgIC8qKiBJZiB0cnVlLCB0aGlzIGZpZWxkVmFsdWUgd2lsbCBub3QgYmUgc3VibWl0dGVkIHdpdGggdGhlIGZvcm0gdmFsdWVzICovXG4gICAgICAgICAgICBkb05vdFN1Ym1pdD86IGJvb2xlYW5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgIERlZmF1bHRzIHRvIHRoZSBrZXkgb2YgdGhpcyBvYmplY3QgaWYgbm90IHNldC5cbiAgICAgICAgICAgICAgICBUaGlzIGlzIGEgcGFyYW0gZm9yIHRoZSBsb2Rhc2ggZ2V0L3NldCBmdW5jdGlvbnMgdG8gYmUgYWJsZSB0byBzZXQgdGhlIGZvcm0gdmFsdWVzIGFzIHlvdSBuZWVkLlxuICAgICAgICAgICAgICAgIFRoaXMgbWFrZXMgaXQgcG9zc2libGUgdG8gYnVpbGQgYW4gb2JqZWN0IGluIHRoZSBmb3JtIHZhbHVlcyBhcyBkZXNpcmVkIHN1Y2ggYXMgaWYgeW91XG4gICAgICAgICAgICAgICAgc2V0IHRoZSBmb3JtVmFsdWVQYXRoIHRvIG15LmZpZWxkLnBhdGguZmllbGQxLCBpdCB3b3VsZCBzdWJtaXQgdGhlIHZhbHVlIGluIGFuIG9iamVjdFxuICAgICAgICAgICAgICAgIGxpa2UgdGhpcy4uLlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbXk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDoge2ZpZWxkMTogJ3ZhbHVlIG9mIGZpZWxkMSd9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgSWYgeW91IGFkZCBhbmdsZSBicmFja2V0cyBhdCB0aGUgZW5kIGFzIGluIFtdLCB0aGlzIHdpbGwgYWRkL3JlbW92ZSB2YWx1ZXMgdG8gYW4gYXJyYXkgd2hpY2hcbiAgICAgICAgICAgICAgICBpcyBoYW5keSBmb3IgYSBzZXQgb2YgY2hlY2tib3hlcyB5b3UnZCBsaWtlIHRvIHNlbmQgYW4gYXJyYXkgb2YgdmFsdWVzIGZvciBlYWNoIGNoZWNrYm94XG4gICAgICAgICAgICAgICAgdGhhdCBpcyBjaGVja2VkLiBGb3IgaW5zdGFuY2UsIGlmIHVzZWQgc2V0IGZvcm1WYWx1ZVBhdGggdG8gbXlDaGVja2JveFtdIG9uIG11bHRpcGxlXG4gICAgICAgICAgICAgICAgY2hlY2tib3hlcyBpbiB0aGUgZm9ybSwgaXQgd291bGQgc3VibWl0IGEgdmFsdWUgbGlrZSB0aGlzLi4uXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBteUNoZWNrYm94OiBbJ3ZhbHVlIG9mIGZpcnN0IGNoZWNrYm94IGNoZWNrZWQnLCAndmFsdWUgb2Ygc2Vjb25kIGNoZWNrYm94IGNoZWNrZWQnXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBUaGUgZW1wdHkgYW5nbGUgYnJhY2tldHMsIFtdLCBjYW4gb25seSBnbyBhdCB0aGUgZW5kIG9mIHRoZSBmb3JtVmFsdWVQYXRoLiBBbnl0aGluZyBlbHNlXG4gICAgICAgICAgICAgICAgd2l0aGluIHRoZSBwYXRoIG11c3QgaGF2ZSBhbiBpbmRleCBudW1iZXIgbGlrZSBteS5maWVsZFswXS5wYXRoW10uXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgZm9ybVZhbHVlUGF0aD86IHN0cmluZyB8IHN0cmluZ1tdXG4gICAgICAgICAgICAvKiogQWx0ZXJuYXRlIGtleSB0byBiZSB1c2VkIGZvciB0aGUgcmVmIGZvciBjb21wb25lbnRzIHRoYXQgdXNlIG90aGVyIGtleXMgc3VjaCBhcyBpbnB1dFJlZiBpbnN0ZWFkICovXG4gICAgICAgICAgICBpbnB1dFJlZktleT86IHN0cmluZ1xuICAgICAgICAgICAgLyoqIENhbGxiYWNrIGZ1bmN0aW9uIHRvIHJ1biBhdCB0aGUgZW5kIG9mIHRoZSBvbkNoYW5nZSBldmVudCBvZiB0aGUgZWxlbWVudCAqL1xuICAgICAgICAgICAgb25BZnRlckNoYW5nZT86IEZ1bmN0aW9uXG4gICAgICAgICAgICAvKiogQ2FsbGJhY2sgZnVuY3Rpb24gdG8gcnVuIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIG9uQ2hhbmdlIGV2ZW50IG9mIHRoZSBlbGVtZW50ICovXG4gICAgICAgICAgICBvbkJlZm9yZUNoYW5nZT86IEZ1bmN0aW9uXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICBPdGhlciBwcm9wcyB0byBiZSBhZGRlZCB0byB0aGUgZmllbGQgcHJvcHMgdGhhdCB3aWxsIG5vdCBiZSB1c2VkIGJ5IHRoaXMgaG9vay5cbiAgICAgICAgICAgICAgICBUaGVzZSBjYW4gYWxzbyBiZSBhZGRlZCB0byB0aGUgY29tcG9uZW50L2VsZW1lbnQgZGlyZWN0bHk7IGhvd2V2ZXIsIGl0IGlzIGF2YWlsYWJsZVxuICAgICAgICAgICAgICAgIGhlcmUgYXMgYW4gb3B0b2luIHRvIGtlZXAgYWxsIHRoZSBwcm9wcyBpbiBvbmUgcGxhY2UuXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgb3RoZXJQcm9wcz86IG9iamVjdFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgVGhlIHR5cGUgb2YgaW5wdXQgc3VjaCBhcyBjaGVja2VkLCByYWRpbywgdGV4dCwgZXRjLiBUaGlzIG9ubHkgbmVlZHMgdG8gYmUgc2V0XG4gICAgICAgICAgICAgICAgaWYgaXQncyBzb21ldGhpbmcgb3RoZXIgdGhhbiB0ZXh0LlxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHR5cGU/OiBzdHJpbmdcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgIEEgZnVuY3Rpb24gb3IgYXJyYXkgb2YgZnVuY3Rpb25zIHRvIHJ1biBhZ2FpbnN0IHRoZSB2YWx1ZSBvZiB0aGUgZmllbGRcbiAgICAgICAgICAgICAgICBJZiB0aGUgdmFsdWUgcGFzc2VzIGl0IHNob3VsZCByZXR1cm4gdW5kZWZpbmVkLiBJZiBub3QsIGl0IHNob3VsZCByZXR1cm5cbiAgICAgICAgICAgICAgICB0aGUgZGVzaXJlZCBmaWVsZCBlcnJvciBzdWNoIGFzIFwiVGhpcyBmaWVsZCBpcyByZXF1aXJlZFwiLiBUaGUgY2FsbGJhY2sgYXJndW1lbnRzXG4gICAgICAgICAgICAgICAgYXJlIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBmaWVsZCBmb3IgdGhlIGZpcnN0IGFyZ3VtZW50IGFuZCB0aGUgZmllbGQgdmFsdWVzIG9mXG4gICAgICAgICAgICAgICAgdGhlIG90aGVyIGZpZWxkcyBpbiB0aGUgc2Vjb25kIGFyZ3VtZW50IGluIGNhc2UgdmFsaWRhdGlvbiBuZWVkcyB0byBoYXBwZW4gYmFzZWRcbiAgICAgICAgICAgICAgICBvbiB0aGUgdmFsdWUgb2YgYW5vdGhlciBmaWVsZC5cbiAgICAgICAgICAgICovXG4gICAgICAgICAgICB2YWxpZGF0aW9uPzogKGZpZWxkVmFsdWU6IGFueSwgZmllbGRWYWx1ZXM6IE9iamVjdCkgPT4gc3RyaW5nIHwgdW5kZWZpbmVkIHwgWyhmaWVsZFZhbHVlOiBhbnksIGZpZWxkVmFsdWVzOiBPYmplY3QpID0+IHN0cmluZyB8IHVuZGVmaW5lZF1cbiAgICAgICAgICAgIC8qKiBUaGUgaW5pdGFsIHZhbHVlIGZvciB0aGUgZmllbGQgd2hpY2ggY2FuIGJlIGNoYW5nZWQgYnkgdGhlIHBhcmVudCAqL1xuICAgICAgICAgICAgdmFsdWU/OiBudW1iZXIgfCBzdHJpbmcgfCB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3JtUHJvcHM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAgICBPdmVyYWxsIGRlc2lyZWQgZm9ybSB2YWx1ZSB0byBzdWJtaXQgd2hlbiB0aGUgZmllbGQgaXMgZW1wdHkgb3IgY2hlY2tib3ggaXNuJ3QgY2hlY2tlZC5cbiAgICAgICAgICAgIFRoaXMgaXMgdHlwaWNhbGx5IHRoZSB2YWx1ZSB5b3Ugd2FudCB0byBzZWUgb24gdGhlIGJhY2tlbmQuIElmIHRoaXMgaXNuJ3Qgc2V0IG9yXG4gICAgICAgICAgICB0aGUgdmFsdWUgaXMgc2V0IHRvIHVuZGVmaW5lZCwgdGhlIGtleSBvZiB0aGUgZmllbGQgd2lsbCBub3QgYmUgc3VibWl0dGVkIHdpdGggdGhlXG4gICAgICAgICAgICBmb3JtIHZhbHVlcyBvYmplY3QuXG4gICAgICAgICovXG4gICAgICAgIG51bGxWYWx1ZT86IG51bGwgfCBzdHJpbmcgfCB1bmRlZmluZWRcbiAgICAgICAgLyoqXG4gICAgICAgICAgICBDYWxsYmFjayBmdW5jdGlvbiB0byBydW4gYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgb25TdWJtaXQgZXZlbnQgb2YgdGhlIGZvcm0gZWxlbWVudC5cbiAgICAgICAgICAgIFRoaXMgd2lsbCBleGVjdXRlIGJlZm9yZSBhbnl0aGluZyBpbmNsdWRpbmcgdGhlIHZhbGlkYXRpb24gcnVucyBhbmQgd2lsbCBwZXJmb3JtXG4gICAgICAgICAgICBhbnkgdGltZSB0aGUgb25TdWJtaXQgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cbiAgICAgICAgKi9cbiAgICAgICAgb25CZWZvcmVTdWJtaXQ/OiBGdW5jdGlvblxuICAgICAgICAvKipcbiAgICAgICAgICAgIENhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiBhbGwgdmFsaWRhdGlvbiBwYXNzZXMgZm9yIHRoZSBmb3JtIGFuZCBpdCdzXG4gICAgICAgICAgICBzYWZlIHRvIHN1Ym1pdC4gVGhpcyBpcyB0aGUgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgdXNlZCBmb3IgdGhlIGNhbGwgdG8gdGhlXG4gICAgICAgICAgICBiYWNrZW5kIG9yIGRlc2lyZWQgYWN0aW9ucyBhZnRlciBldmVyeXRoaW5nIHBhc3NlcyBmcm9tIHRoZSBmb3JtLiBJZiB0aGlzIGZ1bmN0aW9uXG4gICAgICAgICAgICBkb2VzIG5vdCByZXR1cm4gYSBQcm9taXNlLCB0aGlzIGN1c3RvbSBob29rIHdpbGwgYWRkIG9uZS5cbiAgICAgICAgKi9cbiAgICAgICAgb25FeGVjdXRlU3VibWl0PzogRnVuY3Rpb25cbiAgICAgICAgLyoqXG4gICAgICAgICAgICBDYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlIGFmdGVyIHRoZSBQcm9taXNlIGZyb20gb25FeGVjdXRlU3VibWl0IGhhcyBiZWVuXG4gICAgICAgICAgICByZXNvbHZlZC4gVGhpcyBpcyB0aGUgZnVuY3Rpb24gdG8gdXNlIGZvciBzdWNjZXNmdWwgc3VibWl0cyBzdWNoIGFzIGNsb3NpbmdcbiAgICAgICAgICAgIGEgbW9kYWwsIG5hdmlnYXRpbmcgdG8gYSBuZXcgcGFnZSBvciBzaG93aW5nIGEgc3VjY2VzcyBtZXNzYWdlLlxuICAgICAgICAqL1xuICAgICAgICBvbkFmdGVyU3VibWl0PzogRnVuY3Rpb25cbiAgICAgICAgLyoqXG4gICAgICAgICAgICBPdGhlciBwcm9wcyB0byBiZSBhZGRlZCB0byB0aGUgZm9ybSBwcm9wcyB0aGF0IHdpbGwgbm90IGJlIHVzZWQgYnkgdGhpcyBob29rLlxuICAgICAgICAgICAgVGhlc2UgY2FuIGFsc28gYmUgYWRkZWQgdG8gdGhlIGNvbXBvbmVudC9lbGVtZW50IGRpcmVjdGx5OyBob3dldmVyLCBpdCBpcyBhdmFpbGFibGVcbiAgICAgICAgICAgIGhlcmUgYXMgYW4gb3B0b2luIHRvIGtlZXAgYWxsIHRoZSBwcm9wcyBpbiBvbmUgcGxhY2UuLlxuICAgICAgICAqL1xuICAgICAgICBvdGhlclByb3BzPzogT2JqZWN0XG4gICAgICAgIC8qKlxuICAgICAgICAgICAgQm9vbGVhbiB0byBpbmRpY2F0ZWQgaWYgdGhlcmUgYXJlIG90aGVyIHN1Ym1pc3Npb24gZmFjdG9ycyBnb2luZyBvbiB3aGljaFxuICAgICAgICAgICAgd2lsbCB1bGl0aW1hdGVseSBkaXNhYmxlIGFsbCBmaWVsZHMgYW5kIHN1Ym1pdCBidXR0b25cbiAgICAgICAgKi9cbiAgICAgICAgZm9ybUlzU3VibWl0dGluZz86IGJvb2xlYW4gfCB1bmRlZmluZWRcbiAgICB9XG59XG5cbmludGVyZmFjZSB1c2VGb3JtQ29udHJvbGxlclJlc3BvbnNlIHtcbiAgICBmaWVsZEVycm9yczoge1xuICAgICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmdcbiAgICB9XG4gICAgZm9ybUlzU3VibWl0dGluZzogYm9vbGVhblxuICAgIGdldEZvcm1Qcm9wczogKCkgPT4gKHtcbiAgICAgICAgW2tleTogc3RyaW5nXToge1xuICAgICAgICAgICAgb25TdWJtaXQ6IEZ1bmN0aW9uXG4gICAgICAgIH1cbiAgICB9KVxuICAgIGdldEZpZWxkUHJvcHM6ICgpID0+ICh7XG4gICAgICAgIGNoZWNrZWQ/OiBib29sZWFuXG4gICAgICAgIGRpc2FibGVkPzogYm9vbGVhblxuICAgICAgICBuYW1lOiBzdHJpbmdcbiAgICAgICAgcmVmPzogRnVuY3Rpb25cbiAgICAgICAgW2tleTogc3RyaW5nXTogRnVuY3Rpb25cbiAgICAgICAgdmFsdWU6IHN0cmluZyB8IG51bWJlciB8IG51bGxcbiAgICB9KVxuICAgIHN1Ym1pdEJ1dHRvblByb3BzOiB7XG4gICAgICAgIGRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIH1cbiAgICB1cGRhdGVGaWVsZFByb3BzOiBGdW5jdGlvblxufVxuXG5pbnRlcmZhY2UgZmllbGRTdGF0ZSB7XG4gICAgW2tleTogc3RyaW5nXToge1xuICAgICAgICBjaGVja2VkPzogYm9vbGVhbiB8IHVuZGVmaW5lZFxuICAgICAgICByZWY/OiBhbnkgLy8gUHJvYmFibHkgc2hvdWxkIGZpbmQgdGhlIHJpZ2h0IHR5cGUgZm9yIHRoaXNcbiAgICAgICAgdHlwZT86IHN0cmluZ1xuICAgICAgICB2YWx1ZT86IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZFxuICAgIH1cbn1cblxuaW50ZXJmYWNlIGZpZWxkRXJyb3JzIHtcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmdcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlRm9ybUNvbnRyb2xsZXI8dXNlRm9ybUNvbnRyb2xsZXJSZXNwb25zZT4oe1xuICAgIGZpZWxkUHJvcHMsXG4gICAgZm9ybVByb3BzLFxufTogdXNlRm9ybUNvbnRyb2xsZXJBcmdzKSB7XG4gICAgY29uc3QgW2ZpZWxkU3RhdGUsIHNldEZpZWxkU3RhdGVdID0gdXNlU3RhdGU8ZmllbGRTdGF0ZT4oXG4gICAgICAgIG1hcFZhbHVlcyhmaWVsZFByb3BzLCAoe2NoZWNrZWQsIHR5cGUsIHZhbHVlfSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtjaGVja2VkLCB0eXBlLCB2YWx1ZX1cbiAgICAgICAgfSlcbiAgICApO1xuICAgIGNvbnN0IFtmaWVsZEVycm9ycywgc2V0RmllbGRFcnJvcnNdID0gdXNlU3RhdGU8ZmllbGRFcnJvcnM+KHt9KTtcbiAgICBjb25zdCBbZm9ybUlzU3VibWl0dGluZywgc2V0Rm9ybUlzU3VibWl0dGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3QgW2luaXRpYWxTdWJtaXQsIHNldEluaXRpYWxTdWJtaXRdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGNvbnN0IFtleGVjdXRlRmllbGRQcm9wVXBkYXRlLCBzZXRFeGVjdXRlRmllbGRQcm9wVXBkYXRlXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChleGVjdXRlRmllbGRQcm9wVXBkYXRlKSB7XG4gICAgICAgICAgICBsZXQgbmV3RmllbGRTdGF0ZSA9IHsuLi5maWVsZFN0YXRlfTtcblxuICAgICAgICAgICAgZm9yRWFjaChmaWVsZFByb3BzLCAoZmllbGRPYmosIGZpZWxkTmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIG5ld0ZpZWxkU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgLi4ubmV3RmllbGRTdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICBbZmllbGROYW1lXToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5uZXdGaWVsZFN0YXRlW2ZpZWxkTmFtZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmZpZWxkT2JqLFxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2V0RmllbGRTdGF0ZShuZXdGaWVsZFN0YXRlKTtcbiAgICAgICAgICAgIHNldEV4ZWN1dGVGaWVsZFByb3BVcGRhdGUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSxbZXhlY3V0ZUZpZWxkUHJvcFVwZGF0ZSwgZmllbGRQcm9wcywgZmllbGRTdGF0ZV0pXG5cbiAgICBmdW5jdGlvbiB1cGRhdGVGaWVsZFByb3BzKCkge1xuICAgICAgICBzZXRFeGVjdXRlRmllbGRQcm9wVXBkYXRlKHRydWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEZpZWxkKFxuICAgICAgICBuYW1lOiBzdHJpbmcsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIGNoZWNrZWQ/OiBib29sZWFuIHwgdW5kZWZpbmVkXG4gICAgICAgICAgICByZWY/OiBhbnkgLy8gUHJvYmFibHkgc2hvdWxkIGZpbmQgdGhlIHJpZ2h0IHR5cGUgZm9yIHRoaXNcbiAgICAgICAgICAgIHR5cGU/OiBzdHJpbmdcbiAgICAgICAgICAgIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkXG4gICAgfSkge1xuICAgICAgICBzZXRGaWVsZFN0YXRlKHtcbiAgICAgICAgICAgICAgLi4uZmllbGRTdGF0ZSxcbiAgICAgICAgICAgICAgW25hbWVdOiB7XG4gICAgICAgICAgICAgICAgICAuLi5maWVsZFN0YXRlW25hbWVdLFxuICAgICAgICAgICAgICAgICAgLi4ucGF5bG9hZCxcbiAgICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGb3JtVmFsdWVzKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICAgICAgbGV0IGZvcm1WYWx1ZXMgPSB7fTtcblxuICAgICAgICBmb3JFYWNoKGZpZWxkU3RhdGUsICh7Y2hlY2tlZCwgcmVmID0ge30sIHZhbHVlfSwgZmllbGROYW1lKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWZpZWxkUHJvcHNbZmllbGROYW1lXS5kb05vdFN1Ym1pdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGVJc0NoZWNrYm94ID0gKFxuICAgICAgICAgICAgICAgICAgICBmaWVsZFByb3BzW2ZpZWxkTmFtZV0udHlwZSA9PT0gJ2NoZWNrYm94JyB8fFxuICAgICAgICAgICAgICAgICAgICBmaWVsZFByb3BzW2ZpZWxkTmFtZV0udHlwZSA9PT0gJ3JhZGlvJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY29uc3QgbnVsbFZhbHVlID0gKHR5cGVJc0NoZWNrYm94KVxuICAgICAgICAgICAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICA6IGZvcm1Qcm9wcy5udWxsVmFsdWU7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gKGNoZWNrZWQgfHwgKCF0eXBlSXNDaGVja2JveCAmJiB2YWx1ZSAmJiB2YWx1ZSAhPT0gJycpKVxuICAgICAgICAgICAgICAgICAgICA/IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZvcm1WYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1WYWx1ZVBhdGggPSBmaWVsZFByb3BzW2ZpZWxkTmFtZV0uZm9ybVZhbHVlUGF0aCB8fCBmaWVsZE5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXRQYXRoID0gKGlzQXJyYXkoZm9ybVZhbHVlUGF0aCkpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGZvcm1WYWx1ZVBhdGguam9pbignLicpLnJlcGxhY2UoJy5bJywgJy4nKS5yZXBsYWNlKCddLicsICcuJylcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZm9ybVZhbHVlUGF0aDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZW5kc1dpdGgoZm9ybVZhbHVlUGF0aC50b1N0cmluZygpLCAnW10nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGF0aCA9IHNldFBhdGgucmVwbGFjZSgnW10nLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50Rm9ybVZhbHVlID0gIGdldChmb3JtVmFsdWVzLCBzZXRQYXRoKSB8fCBbXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KGZvcm1WYWx1ZXMsIHNldFBhdGgsIFsuLi5jdXJyZW50Rm9ybVZhbHVlLCBmb3JtVmFsdWVdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldChmb3JtVmFsdWVzLCBzZXRQYXRoLCBmb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZm9ybVZhbHVlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0RmllbGQ8SHRtbElucHV0RWxlbWVudD4oaW5wdXRSZWY6IGFueSkge1xuICAgICAgICBpZiAoaW5wdXRSZWYgIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIFNvbWUgY29tcG9uZXQgbGlicmFyaWVzIHJldHVybiBpbnB1dEVsZW1lbnQgYXMgdGhlIGFjdHVhbCByZWZcbiAgICAgICAgICAgIC8vIE1heSBuZWVkIHRvIGFkZCBtb3JlIGlmIG90aGVyIGxpYnJhcmllcyBhcmUgdXNlZFxuICAgICAgICAgICAgY29uc3QgaW5wdXRFbGVtZW50ID0gZ2V0KGlucHV0UmVmLCAnaW5wdXRFbGVtZW50JykgfHwgaW5wdXRSZWY7XG4gICAgICAgICAgICBpZiAoaW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3Qge25hbWV9ID0gaW5wdXRFbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VzZUZvcm1Db250cm9sbGVyOiBBIG5hbWUgYXR0cmlidXRlIG11c3QgYmUgc3BlY2lmaWVkIGZvciB0aGlzIGVsZW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAge2lucHV0RWxlbWVudH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFnZXQoZmllbGRTdGF0ZSwgW25hbWUsICdyZWYnXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RmllbGQobmFtZSwge3JlZjogaW5wdXRFbGVtZW50fSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgICAgICAndXNlRm9ybUNvbnRyb2xsZXI6IENvdWxkIG5vdCBzZXQgYSByZWYgZm9yIHRoaXMgZm9ybSBmaWVsZCcsXG4gICAgICAgICAgICAgICAgICAgIHtpbnB1dFJlZn1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVGaWVsZChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBbc3RyaW5nIHwgbnVtYmVyXSB8IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCB2YWxpZGF0ZUZ1bmN0aW9ucyA9IGZpZWxkUHJvcHNbbmFtZV0udmFsaWRhdGlvbjtcbiAgICAgICAgbGV0IGZpZWxkRXJyb3I6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAodmFsaWRhdGVGdW5jdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkVmFsaWRhdGlvbiA9IChpc0FycmF5KHZhbGlkYXRlRnVuY3Rpb25zKSkgPyB2YWxpZGF0ZUZ1bmN0aW9ucyA6IFt2YWxpZGF0ZUZ1bmN0aW9uc107XG5cbiAgICAgICAgICAgIC8vIFVzaW5nIHRoZSBsb2Rhc2ggdHJhbnNmb3JtIHRvIHJ1biB1bnRpbCBpdCBmaW5kcyB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgIC8vIFRoaXMgd2F5IGl0IG9ubHkgc2hvd3Mgb25lIHZhbGlkYXRpb24gZXJyb3IgYXQgYSB0aW1lIHVudGlsXG4gICAgICAgICAgICAvLyB0aGV5IGFyZSBhbGwgZ29uZSBpZiB0aGVyZSBhcmUgbXVsdGlwbGVzLlxuICAgICAgICAgICAgdHJhbnNmb3JtKGZpZWxkVmFsaWRhdGlvbiwgKHJldHVybkZpZWxkRXJyb3JzLCB2YWxpZGF0b3IpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzRnVuY3Rpb24odmFsaWRhdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcigndXNlRm9ybUNvbnRyb2xsZXI6IEZpZWxkIHZhbGlkYXRvcnMgbXVzdCBiZSBmdW5jdGlvbnMnLCB7dmFsaWRhdG9yfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBQcm9iYWJseSBuZWVkIHRvIG1lbW9pemUgZ2V0Rm9ybVZhbHVlcyBvciBzb21ldGhpbmdcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmllbGRWYWx1ZXMgPSBnZXRGb3JtVmFsdWVzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgZmllbGRFcnJvciA9IHZhbGlkYXRvcihmaWVsZFZhbHVlc1tuYW1lXSwgZmllbGRWYWx1ZXMpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICFmaWVsZEVycm9yO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChmaWVsZEVycm9yKSB7XG4gICAgICAgICAgICAgICAgc2V0RmllbGRFcnJvcnMoe1xuICAgICAgICAgICAgICAgICAgICAuLi5maWVsZEVycm9ycyxcbiAgICAgICAgICAgICAgICAgICAgW25hbWVdOiBmaWVsZEVycm9yLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldEZpZWxkRXJyb3JzKG9taXQoZmllbGRFcnJvcnMsIG5hbWUpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpZWxkRXJyb3I7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RmllbGRzVG9WYWxpZGF0ZSgpOiBzdHJpbmdbXSB7XG4gICAgICAgIGxldCBmaWVsZHNUb1ZhbGlkYXRlOnN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yRWFjaChmaWVsZFByb3BzLCAoZmllbGRQcm9wLCBmaWVsZE5hbWUpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWVsZFByb3AudmFsaWRhdGlvbikge1xuICAgICAgICAgICAgICAgIGZpZWxkc1RvVmFsaWRhdGUucHVzaChmaWVsZE5hbWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIGZpZWxkc1RvVmFsaWRhdGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVBbGxGaWVsZHMoKTpib29sZWFuIHtcbiAgICAgICAgbGV0IGZpZWxkc0hhdmVFcnJvciA9IGZhbHNlO1xuXG4gICAgICAgIHRyYW5zZm9ybShnZXRGaWVsZHNUb1ZhbGlkYXRlKCksIChmaWVsZEVycm9yczogT2JqZWN0LCBmaWVsZE5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmllbGRFcnJvciA9IHZhbGlkYXRlRmllbGQoXG4gICAgICAgICAgICAgICAgZmllbGROYW1lLFxuICAgICAgICAgICAgICAgIGZpZWxkU3RhdGVbZmllbGROYW1lXS5yZWYudmFsdWUsXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBmaWVsZHNIYXZlRXJyb3IgPSAhIWZpZWxkRXJyb3JcbiAgICAgICAgICAgIHJldHVybiAhZmllbGRFcnJvcjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZpZWxkc0hhdmVFcnJvcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVGaWVsZENoYW5nZShldmVudDogUmVhY3QuRm9ybUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGNoZWNrZWQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHZhbHVlXG4gICAgICAgIH0gPSBldmVudC5jdXJyZW50VGFyZ2V0IHx8IHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgbmFtZTogJ25hbWVOb3RTdXBwbGllZCcsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICB9O1xuXG4gICAgICAgIHNldEZpZWxkKG5hbWUsIHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IChjaGVja2VkID09PSB0cnVlKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHZhbGlkYXRlRmllbGQobmFtZSwgdmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUZvcm1TdWJtaXQoZXZlbnQ6IFJlYWN0LkZvcm1FdmVudDxIVE1MRm9ybUVsZW1lbnQ+KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGZpZWxkc0hhdmVFcnJvcjtcbiAgICAgICAgY29uc3Qgb25CZWZvcmVTdWJtaXQgPSBnZXQoZm9ybVByb3BzLCAnb25CZWZvcmVTdWJtaXQnLCAoKSA9PiBudWxsKTtcblxuICAgICAgICBvbkJlZm9yZVN1Ym1pdCgpO1xuXG4gICAgICAgIGlmICghdmFsaWRhdGVBbGxGaWVsZHMoKSkge1xuICAgICAgICAgICAgZXhlY3V0ZUZvcm0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEluaXRpYWxTdWJtaXQodHJ1ZSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUZvcm0oKSB7XG4gICAgICAgIGNvbnN0IG9uRXhlY3V0ZVN1Ym1pdCA9IGdldChmb3JtUHJvcHMsICdvbkV4ZWN1dGVTdWJtaXQnLCAoZm9ybVZhbHVlczogb2JqZWN0KSA9PiBudWxsKTtcbiAgICAgICAgY29uc3Qgb25BZnRlclN1Ym1pdCA9IGdldChmb3JtUHJvcHMsICdvbkFmdGVyU3VibWl0JywgKCkgPT4gbnVsbCk7XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZXMgPSBnZXRGb3JtVmFsdWVzKCk7XG5cbiAgICAgICAgc2V0Rm9ybUlzU3VibWl0dGluZyh0cnVlKTtcbiAgICAgICAgYXdhaXQgKG9uRXhlY3V0ZVN1Ym1pdCBpbnN0YW5jZW9mIFByb21pc2UpXG4gICAgICAgICAgICA/IG9uRXhlY3V0ZVN1Ym1pdChmb3JtVmFsdWVzKVxuICAgICAgICAgICAgOiBQcm9taXNlLnJlc29sdmUob25FeGVjdXRlU3VibWl0KGZvcm1WYWx1ZXMpKTtcblxuICAgICAgICBzZXRGb3JtSXNTdWJtaXR0aW5nKGZhbHNlKTtcbiAgICAgICAgb25BZnRlclN1Ym1pdCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRm9ybVN1Ym1pdHRpbmcoKSB7XG4gICAgICAgIHJldHVybiAhIShmb3JtSXNTdWJtaXR0aW5nIHx8IGZvcm1Qcm9wcy5mb3JtSXNTdWJtaXR0aW5nKVxuICAgIH1cblxuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvblByb3BzID0ge1xuICAgICAgICBkaXNhYmxlZDogISEoXG4gICAgICAgICAgICBpc0Zvcm1TdWJtaXR0aW5nKCkgfHxcbiAgICAgICAgICAgIChpbml0aWFsU3VibWl0ICYmICFpc0VtcHR5KGZpZWxkRXJyb3JzKSlcbiAgICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZpZWxkUHJvcHMobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHtjaGVja2VkLCB2YWx1ZX0gPSBnZXQoZmllbGRTdGF0ZSwgW25hbWVdLCB7fSkgYXMgYW55O1xuICAgICAgICBjb25zdCB7aW5wdXRSZWZLZXksIHR5cGUsIG90aGVyUHJvcHN9ID0gZ2V0KGZpZWxkUHJvcHMsIFtuYW1lXSwge30pIGFzIGFueTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2hlY2tlZCxcbiAgICAgICAgICAgIGRpc2FibGVkOiBpc0Zvcm1TdWJtaXR0aW5nKCksXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgb25DaGFuZ2U6IGhhbmRsZUZpZWxkQ2hhbmdlLFxuICAgICAgICAgICAgW2lucHV0UmVmS2V5IHx8ICdyZWYnXTogaW5pdEZpZWxkLFxuICAgICAgICAgICAgdHlwZTogdHlwZSB8fCAndGV4dCcsXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIC4uLm90aGVyUHJvcHMgfHwge30sXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGb3JtUHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvblN1Ym1pdDogaGFuZGxlRm9ybVN1Ym1pdCxcbiAgICAgICAgICAgIC4uLmZvcm1Qcm9wcy5vdGhlclByb3BzLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmllbGRFcnJvcnM6IChpbml0aWFsU3VibWl0KSA/IGZpZWxkRXJyb3JzIDoge30sXG4gICAgICAgIGZvcm1Jc1N1Ym1pdHRpbmc6IGlzRm9ybVN1Ym1pdHRpbmcoKSxcbiAgICAgICAgZ2V0Rm9ybVZhbHVlcyxcbiAgICAgICAgZ2V0Rm9ybVByb3BzLFxuICAgICAgICBnZXRGaWVsZFByb3BzLFxuICAgICAgICBzdWJtaXRCdXR0b25Qcm9wcyxcbiAgICAgICAgdXBkYXRlRmllbGRQcm9wcyxcbiAgICB9O1xuXG59XG4iXX0=