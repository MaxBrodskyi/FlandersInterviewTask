import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthorizationPage from './Components/Authorization/AuthorizationPage';
import LandingPage from './Components/LandingPage/LandingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthorizationPage />}></Route>
          <Route path='/landingPage' element={<LandingPage />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
}

export default App;
