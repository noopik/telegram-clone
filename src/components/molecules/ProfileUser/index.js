import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  AvatarDefault,
  IC_Bell,
  IC_Graph,
  IC_List,
  IC_Lock,
  IC_Monitor,
  IC_Trash,
} from '../../../assets';
import { apiAdapter } from '../../../config';
import { dispatchTypes, patternNumber, toastify } from '../../../utils';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// Styling modal
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 60,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 20,
    width: 500,
  },
}));
const StyledModalContent = styled.div`
  h2 {
    text-align: center;
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    color: #232323;
    margin-bottom: 1rem;
  }
  p {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 20px;
    text-align: center;
    margin-bottom: 1rem;
    color: #232323;
  }
  .actions {
    display: flex;
    gap: 1rem;
    .btn {
      padding: 15px 0;
      border: 0;
      border-radius: 15px;
      flex: 1;
      font-family: Rubik;
      font-size: 16px;
      color: #232323;
      &:hover {
        cursor: pointer;
        opacity: 0.5;
      }
      &.delete {
        background-color: #7e98df;
        color: #ffffff;
      }
    }
  }
`;

const ProfileUser = ({ username, avatar, phone, biography, idUser }) => {
  // const [updatePhone, setUpdatePhone] = useState(false);
  // const [phoneSubmit, setPhoneSubmit] = useState(false);
  const [bioSubmit, setBioSubmit] = useState(false);
  const router = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const token = localStorage.getItem('token');
  const userState = useSelector((state) => state.userReducer);

  // START = MODAL DELETE ACCOUNT
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const actionDeleteAccount = () => {
    apiAdapter
      .delete(`/users/${userState.idUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        toastify('Success delete account');
        dispatch({ type: dispatchTypes.setUserLogout });
        localStorage.removeItem('token');
        router.replace('/auth/login');
      })
      .catch((err) => {
        console.log(err.response);
        toastify(err.response?.message);
      });
  };

  // END = MODAL DELETE ACCOUNT

  // START = UPDATE PHONE
  const handleAvatar = () => {
    const selectAvatar = getValues('avatar')[0];
    // console.log('selectAvatar', selectAvatar);
    if (!selectAvatar) {
      return null;
    }

    if (selectAvatar) {
      const formData = new FormData();
      formData.append('avatar', selectAvatar);
      apiAdapter
        .patch(`/users/${idUser}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log('res success', res);
          const updateAvatar = res.data.data.avatar;
          dispatch({ type: dispatchTypes.setUserAvatar, value: updateAvatar });
          reset();
          return toastify('Succes update image profile', 'right');
        })
        .catch((err) => {
          console.log('ERR', err.response);
          const message = err.response?.data.message;
          reset();
          return toastify(message, 'error');
        });
    }
  };

  useEffect(() => {
    if (getValues('avatar')) {
      handleAvatar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('avatar')]);
  // END = UPLOAD AVATAR

  // START = UPDATE PHONE
  useEffect(() => {
    // setPhoneSubmit(true);
    const phoneTrigger = watch('phone');
    if (phoneTrigger?.length > 0) {
      // setPhoneSubmit(true);
    } else {
      // setPhoneSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('phone')]);

  const handlePhone = () => {
    const updatePhone = getValues('phone');
    if (!updatePhone) {
      return null;
    }
    const update = {
      phone: updatePhone,
    };
    apiAdapter
      .patch(`/users/${idUser}`, update, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const phone = res.data.data.phone;
        // setPhoneSubmit(false);
        dispatch({ type: dispatchTypes.setUserPhone, value: phone });
        return toastify('Succes update phone number', 'right');
      })
      .catch((err) => {
        console.log('ERR', err.response);
        const message = err.response?.data.message;
        if (message.split(' ').shift() === 'Duplicate') {
          return toastify('Phone alredy used', 'error');
        }
        // setPhoneSubmit(false);

        return toastify(message, 'error');
      });
  };
  // END = UPDATE PHONE

  // START = UPDATE NAME
  const handleName = () => {
    const updateName = getValues('username');
    if (!updateName) {
      return null;
    }
    const update = {
      name: updateName,
    };
    apiAdapter
      .patch(`/users/${idUser}`, update, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const phone = res.data.data.name;
        // setPhoneSubmit(false);
        dispatch({ type: dispatchTypes.setUserName, value: phone });
        return toastify('Succes update name', 'right');
      })
      .catch((err) => {
        // console.log('ERR', err.response);
        const message = err.response?.data.message;
        // setPhoneSubmit(false);

        return toastify(message, 'error');
      });
  };
  // END = UPDATE NAME

  // START = UPDATE BIOGRAPHY
  useEffect(() => {
    // setPhoneSubmit(true);
    const bioTrigger = watch('biography');
    if (bioTrigger) {
      setBioSubmit(true);
    } else {
      setBioSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('biography')]);
  // console.log('bioSubmit', bioSubmit);
  const handleBiography = () => {
    const updateBio = getValues('biography');
    if (!updateBio) {
      return null;
    }
    const update = {
      biography: updateBio,
    };
    apiAdapter
      .patch(`/users/${idUser}`, update, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log('res success', res);

        const biography = res.data.data.biography;
        setBioSubmit(false);
        dispatch({ type: dispatchTypes.setUserBiography, value: biography });
        return toastify('Succes update biography', 'right');
      })
      .catch((err) => {
        console.log('ERR', err.response);
        const message = err.response?.data.message;
        setBioSubmit(false);

        return toastify(message, 'error');
      });
  };
  // END = UPDATE BIOGRAPHY

  return (
    <StyledProfileUser>
      <div className="header">
        <svg
          onClick={() => {
            return router.goBack();
          }}
          width="11"
          height="19"
          viewBox="0 0 11 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.20711 9.3271L9.22925 3.30496C9.24226 3.29283 9.2551 3.28044 9.26777 3.26777L9.97487 2.56066C10.5607 1.97487 10.5607 1.02513 9.97487 0.43934C9.38909 -0.146447 8.43934 -0.146447 7.85355 0.43934L7.52579 0.767105L7.52513 0.766442L0.732233 7.55933C-0.244077 8.53564 -0.244079 10.1186 0.732233 11.0949L7.14646 17.5091L7.52513 17.8878L7.85357 18.2162C8.43936 18.802 9.3891 18.802 9.97489 18.2162C10.5607 17.6304 10.5607 16.6807 9.97489 16.0949L9.64645 15.7664L9.26778 15.3878C9.26635 15.3863 9.2649 15.3849 9.26346 15.3835L3.20711 9.3271Z"
            fill="#7E98DF"
          />
        </svg>
        <h3 className="text-md-bold primary text-center">{username}</h3>
      </div>
      <div className="profile-section">
        <form className="avatar-wrapper">
          <img src={avatar ? avatar : AvatarDefault} alt={username} />
          <input type="file" name="avatar" {...register('avatar')} />
        </form>
        <h3 className="fullname">{username}</h3>
        <p className="username">@{username}</p>
      </div>
      <div className="section">
        <h5 className="heading-lg">Account</h5>
        {/* <p className="subheading">{phone}</p> */}
        <p className="heading-md">Phone Number</p>
        <form onSubmit={handleSubmit(handlePhone)}>
          <input
            type="text"
            name="phone"
            className={`subheading ${errors.phone && 'text-errors'}`}
            defaultValue={phone}
            placeholder="Your phone number"
            {...register('phone', {
              pattern: patternNumber,
              minLength: 11,
              maxLength: 13,
            })}
          />
          {errors.phone && <p className="input-errors">Invalid number</p>}
        </form>
        {/* {!phone && (
          <div
            to="#"
            className="anchor primary button-add-phone"
            onClick={() => {
              setUpdatePhone(true);
            }}
          >
            Tap to add phone number
          </div>
        )}
        {!phoneSubmit && (
          <div
            to="#"
            className="anchor primary button-add-phone"
            onClick={() => {
              setPhoneSubmit(true);
            }}
          >
            Tap to change phone number
          </div>
        )}
        {phoneSubmit && (
          <div
            to="#"
            className="anchor primary button-add-phone"
            onClick={handlePhone}
          >
            Submit
          </div>
        )} */}
        <div className="divider" />
      </div>
      <div className="section">
        {/* <h5 className="heading-md">@{username}</h5> */}
        <p className="heading-md">Name</p>

        <form onSubmit={handleSubmit(handleName)}>
          <input
            type="text"
            name="username"
            className={`subheading ${errors.username && 'text-errors'}`}
            defaultValue={username}
            placeholder="Your username number"
            {...register('username', {
              minLength: 4,
            })}
          />
          {errors.username && <p className="input-errors">Invalid name</p>}
        </form>
        {/* <p className="text-md-regular gray">Username</p> */}
        <div className="divider" />
      </div>
      <div className="section">
        <h5 className="heading-md">Bio</h5>
        <form onSubmit={handleSubmit(handleBiography)}>
          <textarea
            id="bio"
            name="bio"
            placeholder="Type bio here!"
            defaultValue={biography}
            {...register('biography')}
          ></textarea>
          {bioSubmit && (
            <div>
              <div
                to="#"
                className="anchor primary button-add-phone"
                onClick={handleBiography}
              >
                Save
              </div>
            </div>
          )}
        </form>
        <div className="divider" />
      </div>
      <div className="section">
        <h5 className="heading-lg">Settings</h5>
        <div className="setting-items">
          <div className="row">
            <img src={IC_Bell} alt="icon" />
            <p className="text-md-regular">Notification and Sounds</p>
          </div>
          <div className="row">
            <img src={IC_Lock} alt="icon" />
            <p className="text-md-regular">Privacy and Security</p>
          </div>
          <div className="row">
            <img src={IC_Graph} alt="icon" />
            <p className="text-md-regular">Data and Stronge</p>
          </div>
          <div className="row">
            <img src={IC_List} alt="icon" />
            <p className="text-md-regular">Chat settings</p>
          </div>
          <div className="row">
            <img src={IC_Monitor} alt="icon" />
            <p className="text-md-regular">Devices</p>
          </div>
          <div className="row delete-action" onClick={handleOpenModal}>
            <img src={IC_Trash} alt="icon" />
            <p className="text-md-regular">Delete Account</p>
          </div>
        </div>
        <div className="divider" />
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <StyledModalContent>
              <h2 id="transition-modal-title">
                Are you sure you want to delete your account?
              </h2>
              <p id="transition-modal-description">
                After you delete account then all chat history and contact list
                will be deleted permanently.
              </p>
              <div className="actions">
                <button className="btn" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button className="btn delete" onClick={actionDeleteAccount}>
                  Delete Now
                </button>
              </div>
            </StyledModalContent>
          </div>
        </Fade>
      </Modal>
    </StyledProfileUser>
  );
};

ProfileUser.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};

ProfileUser.defaultProps = {
  username: 'Username',
  avatar: AvatarDefault,
};

export default ProfileUser;

const StyledProfileUser = styled.div`
  .header {
    display: flex;
    margin-bottom: 50px;
    .primary {
      flex: 1;
    }
    svg {
      &:hover {
        cursor: pointer;
      }
    }
  }
  .divider {
    width: 100%;
    height: 1px;
    background-color: #848484;
    margin-top: 25px;
  }
  .profile-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar-wrapper {
      width: 82px;
      height: 82px;
      margin-bottom: 25px;
      position: relative;
      input {
        position: absolute;
        height: 100%;
        left: 0;
        width: 100%;
        opacity: 0;
        &:hover {
          cursor: pointer;
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 30px;
      }
    }
    .fullname {
      font-family: Rubik;
      font-style: normal;
      font-weight: 500;
      font-size: 22px;
      line-height: 26px;
      color: #232323;
    }
    .username {
      font-family: Rubik;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;
      color: #848484;
    }
  }
  .section {
    margin-top: 25px;
  }
  .heading-lg {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 23px;
    color: #232323;
    margin-bottom: 15px;
  }
  .heading-md {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #232323;
    margin-bottom: 15px;
  }
  .subheading {
    color: #232323;
    margin-bottom: 8px;
  }
  input {
    &.subheading {
      display: block;
      border: 0;
      background-color: transparent;
      font-family: Rubik;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      width: 100%;
      line-height: 19px;
      letter-spacing: 1.335px;
      color: #232323;
      /* &.active {
        background-color: yellow;
      } */
    }
    &:focus {
      outline: 0;
    }
  }
  textarea {
    width: 100%;
    height: 80px;
    background-color: transparent;
    border: 0;
    font-size: 16px;
    width: 100%;
    line-height: 19px;
    color: #232323;
    &:focus {
      outline: 0;
    }
  }
  .input-errors {
    font-size: 16px;
    color: red;
    padding-bottom: 4px;
  }
  .text-errors {
    color: red !important;
  }
  .setting-items {
    .row {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-bottom: 1rem;
      &.delete-action {
        color: red;
      }
      &:hover {
        cursor: pointer;
        opacity: 0.5;
      }
    }
  }
  .button-add-phone {
    width: max-content;
    &:hover {
      cursor: pointer;
    }
  }
`;
