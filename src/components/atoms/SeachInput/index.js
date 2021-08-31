import React from 'react';
import styled from 'styled-components';

const SearchInput = ({ className, ...props }) => {
  return (
    <StyledSearchInput className={className}>
      <svg
        className="icon-search"
        width="23"
        height="23"
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9.5" cy="9.5" r="8" stroke="#848484" strokeWidth="3" />
        <rect
          x="14"
          y="16.1213"
          width="3"
          height="8.74773"
          rx="1.5"
          transform="rotate(-45 14 16.1213)"
          fill="#848484"
        />
      </svg>
      <input
        type="text"
        className="search-input"
        placeholder="Search contact"
        {...props}
      />
    </StyledSearchInput>
  );
};

export default SearchInput;

const StyledSearchInput = styled.div`
  background: #fafafa;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  gap: 10px;
  height: 60px;

  input {
    width: 100%;
    border: 0;
    background-color: transparent;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #848484;

    &:focus {
      outline: none;
    }
  }
`;
