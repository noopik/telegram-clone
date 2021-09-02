import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Input = ({
  error,
  label,
  defaultValue,
  errorMessage,
  type,
  id,
  showPassword,
  innerRef,
  ...props
}) => {
  // id = standard-error-helper-text

  const Icons = {
    openEye: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.8 6C7.8 6 4.384 8.488 3 12C4.384 15.512 7.8 18 11.8 18C15.8 18 19.216 15.512 20.6 12C19.216 8.488 15.8 6 11.8 6ZM11.8 16C9.592 16 7.8 14.208 7.8 12C7.8 9.792 9.592 8 11.8 8C14.008 8 15.8 9.792 15.8 12C15.8 14.208 14.008 16 11.8 16ZM11.8 9.6C10.472 9.6 9.4 10.672 9.4 12C9.4 13.328 10.472 14.4 11.8 14.4C13.128 14.4 14.2 13.328 14.2 12C14.2 10.672 13.128 9.6 11.8 9.6Z"
          fill="#232323"
        />
      </svg>
    ),
    closeEye: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.8 6C7.8 6 4.384 8.488 3 12C4.384 15.512 7.8 18 11.8 18C15.8 18 19.216 15.512 20.6 12C19.216 8.488 15.8 6 11.8 6ZM11.8 16C9.592 16 7.8 14.208 7.8 12C7.8 9.792 9.592 8 11.8 8C14.008 8 15.8 9.792 15.8 12C15.8 14.208 14.008 16 11.8 16ZM11.8 9.6C10.472 9.6 9.4 10.672 9.4 12C9.4 13.328 10.472 14.4 11.8 14.4C13.128 14.4 14.2 13.328 14.2 12C14.2 10.672 13.128 9.6 11.8 9.6Z"
          fill="#E1E1E1"
        />
        <rect
          x="3.35156"
          y="3.87915"
          width="23.3248"
          height="2.6132"
          rx="1.3066"
          transform="rotate(36.2609 3.35156 3.87915)"
          fill="#E1E1E1"
        />
      </svg>
    ),
  };

  return (
    <StyledTextField>
      <TextFieldCustom
        error={error}
        id={id}
        label={label}
        name={id}
        defaultValue={defaultValue}
        helperText={error ? errorMessage : null}
        type={type}
        ref={innerRef}
        {...props}
      />
      <div className="icon" onClick={showPassword}>
        {id === 'password' &&
          Icons[type === 'password' ? 'closeEye' : 'openEye']}
      </div>
    </StyledTextField>
  );
};

Input.propTypes = {
  error: PropTypes.bool,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  errorMessage: PropTypes.string,
  id: PropTypes.string,
};

export default Input;

// styling
const StyledTextField = styled.div`
  position: relative;
  label {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #848484;
    opacity: 0.75;
  }
  input {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #232323;
  }
  .icon {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 20px;
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
`;

const TextFieldCustom = styled(TextField)`
  width: 100%;
`;
