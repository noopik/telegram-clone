import { dispatchTypes } from '../../utils';

const initialUser = {
  name: '',
  email: '',
  idUser: '',
  avatar: null,
  phone: 0,
  verification: 0,
  refresh: '',
  token: '',
  biography: '',
};

// REDUCER FOR REGISTER FLOW
export const userReducer = (state = { initialUser }, action) => {
  switch (action.type) {
    case dispatchTypes.setUserLogin:
      return {
        ...state,
        name: action.value.name,
        email: action.value.email,
        idUser: action.value.idUser,
        avatar: action.value.avatar,
        phone: action.value.phone,
        verification: action.value.verification,
        refresh: action.value.refresh,
        token: action.value.token,
      };
    case dispatchTypes.setUserLogout:
      return {
        initialUser,
      };
    case dispatchTypes.setUserAvatar:
      return {
        ...state,
        avatar: action.value,
      };
    case dispatchTypes.setUserName:
      return {
        ...state,
        name: action.value,
      };
    case dispatchTypes.setUserPhone:
      return {
        ...state,
        phone: action.value,
      };
    case dispatchTypes.setUserBiography:
      return {
        ...state,
        biography: action.value,
      };
    default:
      return state;
  }
};
