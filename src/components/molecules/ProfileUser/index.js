/* eslint-disable react-hooks/exhaustive-deps */
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';
import {
  AvatarDefault,
  IC_Bell,
  IC_Graph,
  IC_List,
  IC_Lock,
  IC_Monitor,
  IC_Trash,
} from '../../../assets';
import { deleteUser, updateUser } from '../../../redux/actions';
import { phoneRegExp, toastify } from '../../../utils';

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

const ProfileUser = () => {
  const userState = useSelector((state) => state.userReducer.user);
  const [bioSubmit, setBioSubmit] = useState(false);
  const [avatar, setAvatar] = useState();
  const [biography, setBiography] = useState(
    userState?.biography ? userState?.biography : ''
  );
  const token = localStorage.getItem('token');
  const router = useHistory();

  const dispatch = useDispatch();

  const formikPhone = useFormik({
    enableReinitialize: true,
    initialValues: {
      phone: userState.phone || '',
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(11, 'Password must be at least 11 charaters')
        .max(13, 'Password must be less than 13 charaters'),
    }),
    onSubmit: (values) => {
      dispatch(updateUser(values, userState.idUser, token));
    },
  });

  const formikName = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userState.name || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
    }),
    onSubmit: (values) => {
      dispatch(updateUser(values, userState.idUser, token));
    },
  });

  // START = MODAL DELETE ACCOUNT
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const actionDeleteAccount = () => {
    dispatch(deleteUser(token, userState.idUser, router));
  };
  // END = MODAL DELETE ACCOUNT

  // START = UPDATE PHONE
  const handleAvatar = () => {
    if (!avatar) {
      return null;
    } else {
      const userUpdate = {
        avatar: avatar,
      };
      if (
        avatar.type === 'image/jpeg' ||
        avatar.type === 'image/jpg' ||
        avatar.type === 'image/png' ||
        avatar.type === 'image/gif'
      ) {
        if (avatar.size > 1048576 * 2) {
          toastify(
            `${avatar.name} | Failed to upload. max size file is 2mb`,
            'error'
          );
        } else {
          dispatch(updateUser(userUpdate, userState.idUser, token));
        }
      } else {
        toastify(
          `${avatar.name} |  Failed to upload. Only image is allowed`,
          'error'
        );
      }
    }
  };

  useEffect(() => {
    if (avatar) {
      handleAvatar();
    }
  }, [avatar]);
  // END = UPLOAD AVATAR

  // START = UPDATE BIOGRAPHY
  useEffect(() => {
    if (biography) {
      setBioSubmit(true);
    } else {
      setBioSubmit(false);
    }
  }, [biography]);
  // console.log('bioSubmit', bioSubmit);
  
  const handleBiography = () => {
    if (!biography) {
      return null;
    }
    const updateBio = {
      biography,
    };
    dispatch(updateUser(updateBio, userState.idUser, token));
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
        <h3 className="text-md-bold primary text-center">{userState.name}</h3>
      </div>
      <div className="profile-section">
        <form className="avatar-wrapper">
          <img
            src={userState?.avatar ? userState?.avatar : AvatarDefault}
            alt={userState.name}
          />
          <input
            type="file"
            name="avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </form>
        <h3 className="fullname">{userState.name}</h3>
        <p className="username">@{userState.name}</p>
      </div>
      <div className="section">
        <h5 className="heading-lg">Account</h5>
        {/* <p className="subheading">{phone}</p> */}
        <p className="heading-md">Phone Number</p>
        <form onSubmit={formikPhone.handleSubmit}>
          <input
            type="text"
            name="phone"
            className={`subheading ${
              formikPhone.errors.phone && 'text-errors'
            }`}
            placeholder="Your phone number"
            onChange={formikPhone.handleChange}
            value={formikPhone.values.phone}
          />
          {formikPhone.errors.phone && (
            <p className="input-errors">{formikPhone.errors.phone}</p>
          )}
        </form>
        <div className="divider" />
      </div>
      <div className="section">
        <p className="heading-md">Name</p>
        <form onSubmit={formikName.handleSubmit}>
          <input
            type="text"
            name="name"
            className={`subheading ${formikName.errors.name && 'text-errors'}`}
            onChange={formikName.handleChange}
            value={formikName.values.name}
          />
          {formikName.errors.name && (
            <p className="input-errors">{formikName.errors.name}</p>
          )}
        </form>
        {/* <p className="text-md-regular gray">Username</p> */}
        <div className="divider" />
      </div>
      <div className="section">
        <h5 className="heading-md">Bio</h5>
        <form>
          <textarea
            id="bio"
            name="bio"
            placeholder="Type bio here!"
            defaultValue={userState?.biography}
            onChange={(e) => setBiography(e.target.value)}
            // {...register('biography')}
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
          <div className="row delete-action" onClick={() => setOpen(true)}>
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
        onClose={() => setOpen(false)}
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
                <button className="btn" onClick={() => setOpen(false)}>
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
  padding: 45px 30px;

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
