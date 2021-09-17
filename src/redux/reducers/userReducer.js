import { dispatchTypes } from '../../utils';

const initialUser = {
  user: {},
  // name: '',
  // email: '',
  // idUser: '',
  // avatar: null,
  // phone: 0,
  // verification: 0,
  // refresh: '',
  // token: '',
  // biography: '',
};

// REDUCER FOR REGISTER FLOW
export const userReducer = (state = { initialUser }, action) => {
  switch (action.type) {
    case dispatchTypes.setUserLogin:
      return {
        ...state,
        user: action.value,
      };
    case dispatchTypes.setUserLogout:
      return {
        initialUser,
      };
    case dispatchTypes.setUpdateUser:
      return {
        ...state,
        user: action.value,
      };
    // case dispatchTypes.setUserAvatar:
    //   return {
    //     ...state,
    //     user: action.value,
    //   };
    // case dispatchTypes.setUserName:
    //   return {
    //     ...state,
    //     name: action.value,
    //   };
    // case dispatchTypes.setUserVerification:
    //   return {
    //     ...state,
    //     verification: action.value,
    //   };
    // case dispatchTypes.setUserPhone:
    //   return {
    //     ...state,
    //     phone: action.value,
    //   };
    // case dispatchTypes.setUserBiography:
    //   return {
    //     ...state,
    //     biography: action.value,
    //   };
    default:
      return state;
  }
};
