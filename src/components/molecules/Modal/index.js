import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AvatarDefault } from '../../../assets';
import { apiAdapter } from '../../../config';
import { isBlank, toastify } from '../../../utils';
import { Button, SearchInput } from '../../atoms';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    marginTop: 150,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: 0,
    width: 500,
    borderRadius: 15,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalContent = styled.div`
  h1 {
    font-size: 24px;
  }
  .result-wrapper {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .item {
      display: flex;
      gap: 1rem;
      img {
        width: 60px;
        height: 60px;
        border-radius: 15px;
        object-fit: cover;
      }
      .desc {
        flex: 1;
        margin-right: 2rem;
        max-width: 250px;
        .name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 2px;
        }
        .phone {
          margin-bottom: 2px;
        }
      }
      .action {
        display: flex;
        align-items: center;
        .btn-add {
          padding: 0 20px;
          height: 40px;
        }
      }
    }
  }
`;

export default function TransitionsModal({ showModal, openModal, closeModal }) {
  const userState = useSelector((state) => state.userReducer);
  const [resultSearching, setResultSearching] = useState([]);
  const classes = useStyles();
  const token = localStorage.getItem('token');
  const [keywordSearch, setKeywordSearch] = useState('');

  // START = SEARCHING ACTION
  const handleSearching = () => {
    if (!isBlank(keywordSearch)) {
      apiAdapter
        .get(`/users?src=${keywordSearch}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log(res);
          const resData = res.data.data;
          setResultSearching(resData);
        })
        .catch((err) => {
          // console.log(err.response);
          if (err?.response?.status === 404) {
            setResultSearching(null);
          }
        });
    }
  };

  useEffect(() => {
    if (keywordSearch.length > 0) {
      handleSearching();
    } else {
      setResultSearching([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywordSearch]);

  // END = SEARCHING ACTION

  // START = ADD CONTACT ACTION
  const addContactAction = (idFriend) => {
    // console.log('token', token);

    const dataContact = {
      idUser: userState.idUser,
      idFriend,
    };
    apiAdapter
      .post(`/contacts`, dataContact, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        toastify('Success add contact');
      })
      .catch((err) => {
        // console.log(err.response);
      });
  };
  // END = ADD CONTACT ACTION
  // TESTING ADD CONTACT
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={showModal}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <div className={classes.paper}>
            <ModalContent>
              {/* <h1>Search Contact</h1> */}
              <SearchInput
                name="seaching"
                onChange={(e) => setKeywordSearch(e.target.value)}
                value={keywordSearch}
              />
              <div className="result-wrapper">
                {resultSearching &&
                  resultSearching.map((person) => {
                    return (
                      <div className="item">
                        <img
                          src={person.avatar ? person.avatar : AvatarDefault}
                          alt={person.name}
                        />
                        <div className="desc">
                          <p className="name">{person.name}</p>
                          <p className="phone">{person.phone}</p>
                          <p className="bio">{person.biography}</p>
                        </div>
                        <div className="action">
                          <Button
                            primary
                            className="btn-add"
                            onClick={() => addContactAction(person.idUser)}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                {!resultSearching && <p>Not found</p>}
              </div>
            </ModalContent>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
