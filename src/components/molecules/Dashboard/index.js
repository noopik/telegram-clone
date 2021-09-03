import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  IC_AddContact,
  IC_Bookmark,
  IC_logout,
  IC_Person,
  IC_Question,
  IC_Setting,
  IC_Telephone,
} from '../../../assets';
import { apiAdapter } from '../../../config';
import { logoutAction } from '../../../redux/actions';
import { roomActiveAction } from '../../../redux/actions/roomActive';
import { breakpoints } from '../../../utils/breakpoints';
import { SearchInput } from '../../atoms';
import MessageCard from '../MessageCard';

const Dashboard = ({ addContactAction }) => {
  const router = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  // const [resultSearching, setResultSearching] = useState([]);
  const userState = useSelector((state) => state.userReducer);
  const [history, setHistory] = useState([]);

  // const [messages, setMessages] = useState([1, 2]);
  const [navbarPopup, setNavbarPopup] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    // getValues,
    reset,
    // formState: { errors },
  } = useForm();

  // START = SEARCHING ACTION
  const handleSearching = () => {
    const keyword = watch('seaching');
    if (keyword) {
      apiAdapter
        .get(`/users?src=${keyword}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const resData = res.data.data;
          // console.log(resData);
          setHistory(resData);
        })
        .catch((err) => {
          // console.log(err.response);
          if (err?.response?.status === 404) {
            // setResultSearching(null);
          }
        });
    }
  };

  useEffect(() => {
    if (watch('seaching')?.length > 0) {
      handleSearching();
    } else {
      reset();
      // setResultSearching([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('seaching')]);

  // END = SEARCHING ACTION

  // START = DATA HISTORY SEMENTARA
  useEffect(() => {
    apiAdapter
      .get(`/users?limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const resData = res.data.data;
        // console.log(resData);
        setHistory(resData);
      })
      .catch((err) => {
        // console.log(err.response);
        if (err?.response?.status === 404) {
          // setResultSearching(null);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // END = DATA HISTORY SEMENTARA

  return (
    <StyledDashboard>
      <div className="header-wrapper">
        <div className="header">
          <h1 className="logo">Telegram</h1>
          <svg
            className="navigation"
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              navbarPopup ? setNavbarPopup(false) : setNavbarPopup(true);
            }}
          >
            <rect
              x="6"
              y="8"
              width="22"
              height="3.3"
              rx="1.65"
              fill="#7E98DF"
            />
            <rect
              x="6"
              y="15.7"
              width="13.2"
              height="3.3"
              rx="1.65"
              fill="#7E98DF"
            />
            <rect
              x="6"
              y="23.4"
              width="22"
              height="3.3"
              rx="1.65"
              fill="#7E98DF"
            />
          </svg>
          {navbarPopup && (
            <div className="nav-popover">
              <div
                className="row"
                onClick={() => {
                  router.push('/profile');
                }}
              >
                <img src={IC_Setting} alt="icon" />
                <p>Setting</p>
              </div>
              <div className="row">
                <img src={IC_Person} alt="icon" />
                <p>Contacts</p>
              </div>
              <div className="row">
                <img src={IC_Telephone} alt="icon" />
                <p>Calls</p>
              </div>
              <div className="row">
                <img src={IC_Bookmark} alt="icon" />
                <p>Save messages</p>
              </div>
              <div className="row">
                <img src={IC_AddContact} alt="icon" />
                <p>Invite Friends</p>
              </div>
              <div className="row">
                <img src={IC_Question} alt="icon" />
                <p>Telegram FAQ</p>
              </div>
              <div
                className="row"
                onClick={async () => {
                  await dispatch(logoutAction(token, userState.idUser));
                  return router.replace('/auth/login');
                }}
              >
                <img src={IC_logout} alt="icon" />
                <p>Logout</p>
              </div>
            </div>
          )}
        </div>
        <div className="search-wrapper">
          <form onSubmit={handleSubmit(handleSearching)}>
            <SearchInput
              name="seaching"
              className="search-input-wrapper"
              {...register('seaching')}
            />
          </form>
          <div className="add-contact" onClick={addContactAction}>
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="10" width="3" height="23" rx="1.5" fill="#7E98DF" />
              <rect
                x="23"
                y="10"
                width="3"
                height="23"
                rx="1.5"
                transform="rotate(90 23 10)"
                fill="#7E98DF"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="body">
        {/* <MessageCard /> */}
        {history &&
          history.map((item) => {
            return (
              <MessageCard
                key={item.idUser}
                username={item.name}
                avatar={item.avatar}
                message={item.phone}
                onClick={() => {
                  dispatch(roomActiveAction(token, item.idUser));
                }}
              />
            );
          })}
      </div>
    </StyledDashboard>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`
  .header-wrapper {
    position: sticky;
    background-color: #ffffff;
    top: 0;
    padding: 45px 30px;
    padding-bottom: 0;
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 50px;
      position: sticky;
      position: sticky;
      top: 0;
      .logo {
        font-family: Rubik;
        font-style: normal;
        font-weight: 500;
        font-size: 29px;
        line-height: 34px;
        text-align: center;
        color: #7e98df;
      }
      .navigation {
        &:hover {
          opacity: 0.5;
          cursor: pointer;
        }
      }
      .nav-popover {
        position: absolute;
        right: 0;
        top: 50px;
        width: 250px;
        padding: 22px 30px;
        background: #7e98df;
        border-radius: 35px 10px 35px 35px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        z-index: 1;
        ${breakpoints.lessThan('lg')` 
            width: 200px; 
        `}
        ${breakpoints.lessThan('sm')`
         border-radius: 10px 35px 35px 35px;
         right: -100px;
         position: fixed;
         
        `}
      }
      .row {
        display: flex;
        align-items: center;
        gap: 1rem;
        p {
          font-style: normal;
          font-family: Rubik;
          font-weight: normal;
          font-size: 16px;
          color: #ffffff;
        }
        &:hover {
          opacity: 0.5;
          cursor: pointer;
        }
        img {
          ${breakpoints.lessThan('lg')` 
            display: none; 
        `}
        }
      }
    }
    .search-wrapper {
      display: flex;
      align-items: center;
      margin-bottom: 50px;
      gap: 1rem;
      width: 100%;
      .search-input-wrapper {
      }
      .add-contact {
        box-sizing: content-box;
        width: 32px;
        height: 32px;
      }
    }
  }
  .body {
    padding: 0 30px;
    ${breakpoints.lessThan('lg')` 
       padding: 0;
    `}
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
  }
`;
