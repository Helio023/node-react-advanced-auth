import { Navigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const auth = localStorage.getItem('authToken');
  return <div>{auth ? children : <Navigate to='/login' />}</div>;
};

export default PrivateRoute;
