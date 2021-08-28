// import { useEffect } from 'react';
// import io from 'socket.io-client';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './config/Routes';
import { Provider } from 'react-redux';

function App() {
  // useEffect(() => {
  //   const socket = io('http://localhost:4000');
  //   console.log(socket);
  // }, []);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
