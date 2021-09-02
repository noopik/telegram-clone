import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styled from 'styled-components';
import { Button, SearchInput } from '../../atoms';
import { AvatarDefault } from '../../../assets';
import { useForm } from 'react-hook-form';
import { apiAdapter } from '../../../config';
import { useSelector } from 'react-redux';
import { toastify } from '../../../utils';

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
    if (watch('seaching')?.length > 0) {
      handleSearching();
    } else {
      reset();
      setResultSearching([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('seaching')]);

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
              <form onSubmit={handleSubmit(handleSearching)}>
                <SearchInput {...register('seaching')} />
              </form>
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
