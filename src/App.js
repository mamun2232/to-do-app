import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Login/Register';
import RequireAuth from './Pages/Login/RequreAuth';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="Apps">

      <Routes>
        <Route path='/' element={<RequireAuth>
          <Home></Home>
        </RequireAuth>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>

      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

    </div>
  );
}

export default App;
