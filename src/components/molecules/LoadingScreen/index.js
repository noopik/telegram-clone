import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ILLoading } from '../../../assets';

const LoadingScreen = () => {
  const loadingState = useSelector((state) => state.loadingReducer);

  if (!loadingState.status) {
    return null;
  }
  return (
    <StyledLoadingScreen>
      <div className="animation-wrapper">
        <img src={ILLoading} alt="loading" />
      </div>
    </StyledLoadingScreen>
  );
};

export default LoadingScreen;

const StyledLoadingScreen = styled.div`
  background-color: #ffffff76;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .animation-wrapper {
    width: 150px;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
