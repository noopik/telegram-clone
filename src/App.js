// import { useEffect } from 'react';
// import io from 'socket.io-client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './config/Routes';
import { persistor, store } from './redux/store';

function App() {
  // useEffect(() => {
  //   const socket = io('http://localhost:3030');
  //   console.log(socket);
  // }, []);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
