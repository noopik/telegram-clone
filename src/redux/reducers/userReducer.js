import { AvatarDefault } from '../../assets/images';
import { dispatchTypes } from '../../utils';

const initialUser = {
  born: '',
  email: '',
  gender: '',
  idUser: '',
  image: null,
  name: '',
  phoneNumber: 0,
  verified: 0,
  refresh: '',
  token: '',
};

// REDUCER FOR REGISTER FLOW
export const userReducer = (state = { initialUser }, action) => {
  switch (action.type) {
    case dispatchTypes.setUserLogin:
      return {
        ...state,
        born: action.value.born,
        email: action.value.email,
        gender: action.value.gender,
        idUser: action.value.idUser,
        image: action.value.image,
        password: action.value.password,
        name: action.value.name,
        phoneNumber: action.value.phoneNumber,
        verified: action.value.verified,
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
        image: action.value,
      };
    case dispatchTypes.setUserName:
      return {
        ...state,
        name: action.value,
      };
    default:
      return state;
  }
};
