"use strict";

var _react = _interopRequireWildcard(require("react"));

var _reactTestingLibrary = require("react-testing-library");

var _lodash = require("lodash");

var _useFormController2 = _interopRequireDefault(require("./useFormController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

describe('useFormController', function () {
  function TestForm(useFormControllerArgs) {
    var _useState = (0, _react.useState)(""),
        _useState2 = _slicedToArray(_useState, 2),
        submitResponse = _useState2[0],
        setSubmitResonse = _useState2[1];

    var _useFormController = (0, _useFormController2.default)({
      fieldProps: {
        myCheckbox: {
          checked: true,
          nullValue: undefined,
          type: 'checkbox',
          formValuePath: 'myCheckbox[]',
          value: 'mock checkbox value'
        },
        myCheckbox2: {
          checked: false,
          nullValue: undefined,
          type: 'checkbox',
          formValuePath: 'myCheckbox[]',
          value: 'mock checkbox value 2'
        },
        myCheckbox3: {
          checked: true,
          nullValue: undefined,
          type: 'checkbox',
          formValuePath: 'myCheckbox[]',
          value: 'mock checkbox value 3'
        },
        myNoSubmitTextField: {
          doNotSubmit: true,
          validation: function validation(value) {
            return value === 'x' ? 'this is an x' : undefined;
          },
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
        nullValue: null
      }
    }),
        fieldErrors = _useFormController.fieldErrors,
        getFieldProps = _useFormController.getFieldProps,
        getFormProps = _useFormController.getFormProps,
        submitButtonProps = _useFormController.submitButtonProps;

    function handleSubmit(formValues) {
      setSubmitResonse(JSON.stringify(formValues));
    }

    function renderError(fieldName) {
      var fieldError = (0, _lodash.get)(fieldErrors, fieldName);
      return fieldError && _react.default.createElement("div", {
        style: {
          color: 'red'
        }
      }, fieldError);
    }

    return submitResponse ? _react.default.createElement("div", {
      "data-testid": "response"
    }, submitResponse) : _react.default.createElement("form", _extends({
      name: "mockFormName"
    }, getFormProps()), _react.default.createElement("div", null, _react.default.createElement("input", getFieldProps('myNoSubmitTextField')), renderError('myNoSubmitTextField')), _react.default.createElement("div", null, _react.default.createElement("input", getFieldProps('mySubmitTextField2'))), _react.default.createElement("div", null, _react.default.createElement("input", getFieldProps('myCheckbox')), _react.default.createElement("input", getFieldProps('myCheckbox2')), _react.default.createElement("input", getFieldProps('myCheckbox3'))), _react.default.createElement("button", _extends({
      "data-testid": "submitButton"
    }, submitButtonProps), "Submit"));
  }

  it('should render elements with the correct props an submit the right values',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _render, container, debug, getByTestId, submitted;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _render = (0, _reactTestingLibrary.render)(_react.default.createElement(TestForm, null)), container = _render.container, debug = _render.debug, getByTestId = _render.getByTestId;
            expect(container).toMatchSnapshot();
            _context.next = 4;
            return _reactTestingLibrary.fireEvent.click(getByTestId('submitButton'));

          case 4:
            submitted = JSON.parse(getByTestId('response').innerHTML);
            expect(submitted.myCheckbox).toEqual(["mock checkbox value", "mock checkbox value 3"]);
            expect(submitted.some.deep.nested.path).toEqual([null, "field in a path"]);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('should validate fields correctly',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var _render2, container, debug, getByTestId;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(TestForm, null)), container = _render2.container, debug = _render2.debug, getByTestId = _render2.getByTestId;

            _reactTestingLibrary.fireEvent.change(container.getElementsByName(['myNoSubmitTextField'])[0], 'x');

            _context2.next = 4;
            return _reactTestingLibrary.fireEvent.click(getByTestId('submitButton'));

          case 4:
            debug(JSON.parse(getByTestId('response').innerHTML));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});