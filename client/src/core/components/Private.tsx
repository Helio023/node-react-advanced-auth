import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Text = styled.p``;
const Button = styled.button`
  margin-top: 25px;
  padding: 10px 20px;
  outline: none;
  border: none;
  background-color: black;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
`;

const Private = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');

    navigate('/login');
  };
  return (
    <Container>
      <Text>You have access to private route</Text>
      <Button type='button' onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default Private;
