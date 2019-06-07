// TODO: This is here only to supress the warnings about act from react-dom/test-utils
// When this issue has a full resolution, https://github.com/kentcdodds/react-testing-library/issues/281,
// steps should be taken to correct this by the final solution proposed in that issue
const realModule = jest.requireActual('react');

module.exports = {
  ...realModule,
  useState: (initialState) => {
    const [state, setState] = realModule.useState(initialState);
    return [
      state,
      (value) => {
        require('react-dom/test-utils').act(() => {
          setState(value);
        });
      },
    ];
  },
  useReducer: (reducer, initialState) => {
    const [state, dispatch] = realModule.useReducer(reducer, initialState);
    return [
      state,
      (action) => {
        require('react-dom/test-utils').act(() => {
          dispatch(action);
        });
      },
    ];
  },
};
