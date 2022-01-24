import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Register from './core/components/Register';
import Login from './core/components/Login';
import ForgetPassword from './core/components/ForgetPassword';
import ResetPassword from './core/components/ResetPassword';
import Private from './core/components/Private';
import PrivateRoute from './core/Routing/PrivateRoute';
import Home from './core/pages/Home';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 50px;

  @media only screen and (max-width: 450px) {
    padding: 20px;
  }
`;

const App = () => {
  return (
    <Container>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='forgetpassword' element={<ForgetPassword />} />
        <Route path='passwordreset/:token' element={<ResetPassword />} />
        <Route
          path='private'
          element={
            <PrivateRoute>
              <Private />
            </PrivateRoute>
          }
        />
      </Routes>
    </Container>
  );
};

export default App;
