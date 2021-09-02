import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = ({
  children,
  icon,
  primary,
  outline,
  className,
  onClick,
  disable,
}) => {
  const icons = {
    google: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.2825 10.356H11.9555V13.807H16.7475C16.3015 16 14.4345 17.26 11.9555 17.26C11.2619 17.2612 10.5748 17.1254 9.93371 16.8605C9.29263 16.5955 8.71016 16.2067 8.21971 15.7161C7.72926 15.2256 7.34048 14.643 7.07566 14.0019C6.81085 13.3608 6.67521 12.6737 6.67653 11.98C6.67534 11.2864 6.81108 10.5994 7.07595 9.95842C7.34083 9.3174 7.72963 8.73498 8.22006 8.24454C8.7105 7.75411 9.29292 7.3653 9.93394 7.10043C10.575 6.83556 11.2619 6.69982 11.9555 6.701C13.2145 6.701 14.3525 7.14801 15.2455 7.879L17.8455 5.28C16.2615 3.899 14.2305 3.047 11.9555 3.047C10.7813 3.04357 9.61805 3.27231 8.53258 3.72007C7.4471 4.16783 6.46086 4.82578 5.63058 5.65606C4.8003 6.48634 4.14235 7.47258 3.6946 8.55805C3.24684 9.64353 3.01809 10.8068 3.02153 11.981C3.01796 13.1552 3.24661 14.3186 3.69432 15.4041C4.14204 16.4896 4.79997 17.4759 5.63028 18.3062C6.46059 19.1366 7.44689 19.7945 8.53242 20.2422C9.61795 20.6899 10.7813 20.9186 11.9555 20.915C16.4225 20.915 20.4845 17.666 20.4845 11.981C20.4845 11.453 20.4035 10.884 20.2825 10.356Z"
          fill="#7E98DF"
        />
      </svg>
    ),
  };
  return (
    <StyledButton
      primary={primary}
      outline={outline}
      className={className}
      onClick={onClick}
      disabled={disable}
    >
      {icon && icons[icon]}
      <p>{children}</p>
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.string,
  className: PropTypes.string,
  primary: PropTypes.bool,
  outline: PropTypes.bool,
};
export default Button;

const StyledButton = styled.button`
  border: 0;
  height: 60px;
  border-radius: 70px;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  background-color: ${({ primary, disabled }) => {
    if (disabled) return '#bebebe';
    if (primary) return '#7e98df';
    return 'transparent';
  }};
  color: ${({ primary, outline, disabled }) => {
    if (disabled) return '#858585';
    if (primary) return '#FFFFFF';
    if (outline) return '#7E98DF';
    return 'transparent';
  }};
  border: ${({ outline }) => {
    if (outline) return '1px solid #7E98DF';
  }};
  &:hover {
    opacity: ${({ disabled }) => {
      if (disabled) return 1;
      return 0.7;
    }};
    cursor: ${({ disabled }) => {
      if (disabled) return 'not-allowed';
      return 'pointer';
    }};
  }
`;
