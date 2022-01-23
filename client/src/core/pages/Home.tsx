import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div``;
const Header = styled.h1`
  font-size: 36px;
`;

const ButtonsGroup = styled.div`
  margin-top: 30px;
  text-align: center;
`;

type ButtonProps = {
  bg?: string;
};

const Button = styled.button<ButtonProps>`
  padding: 15px 30px;
  border-radius: 5px;
  font-size: 18px;
  outline: none;
  margin-right: 30px;
  background-color: ${(props) =>
    props.bg === 'transparent' ? 'transparent' : 'black'};
  color: ${(props) => (props.bg === 'transparent' ? 'black' : 'white')};
  border: ${(props) =>
    props.bg === 'transparent' ? '2px solid black' : 'none'};
  cursor: pointer;
`;

const Home = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };
  const handleRegister = () => {
    navigate('/register');
  };
  return (
    <Container>
      <Header>Welcome to advanced MERN STACK authantication</Header>
      <ButtonsGroup>
        <Button type='button' onClick={handleRegister}>
          Register
        </Button>
        <Button type='button' bg='transparent' onClick={handleLogin}>
          Login
        </Button>
      </ButtonsGroup>
    </Container>
  );
};

export default Home;
