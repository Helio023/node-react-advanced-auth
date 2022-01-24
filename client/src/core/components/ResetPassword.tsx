import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//Styles
const Form = styled.form`
  width: 400px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  padding: 30px;
`;
const FormHeader = styled.h3`
  font-size: 26px;
  text-align: center;
  font-weight: normal;
  margin-bottom: 20px;
`;
const FormGroup = styled.div`
  width: 100%;
  &:not(:first-child) {
    margin-top: 25px;
  }
`;
const FormInput = styled.input`
  width: 100%;
  padding: 12px 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
`;
const FormLabel = styled.label`
  width: 100%;
  display: block;
  margin-bottom: 5px;
  color: #bbb;
`;
const FormError = styled.span`
  font-size: 13px;
  color: #a70707;
`;
const Button = styled.button`
  width: 100%;
  margin-top: 25px;
  background-color: black;
  color: #fff;
  font-size: 18px;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 15px 30px;
  cursor: pointer;
`;
const LoginLink = styled.span`
  color: teal;
  display: inline-block;
  margin-top: 10px;
  font-size: 16px;
`;

type NotificationProps = {
  color?: string;
};
const Notification = styled.p<NotificationProps>`
  font-size: 18px;
  color: ${(props) => (props.color === 'green' ? 'teal' : 'red')};
`;

type UserData = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const BASE_URL = 'http://localhost:3000/api/auth';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasReset, setHasReset] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();

  const onReset = (data: UserData) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/resetpassword/${token}`, data)
      .then(() => {
        setHasReset(true);
        setHasError(false);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      })
      .catch(() => {
        setHasError(true);
      })

      .finally(() => setIsLoading(false));
  };

  return (
    <Form onSubmit={handleSubmit(onReset)}>
      <FormHeader>Reset password</FormHeader>
      {hasReset && (
        <Notification color='green'>Password successfully reset</Notification>
      )}
      {hasError && <Notification>Passwords don't match!</Notification>}
      <FormGroup>
        <FormLabel>Password</FormLabel>
        <FormInput
          placeholder='********'
          type='password'
          {...register('password', {
            required: 'Required field',
            minLength: {
              value: 8,
              message: 'Password must contain at least 8 characters',
            },
          })}
        />
        {errors.password && <FormError>* {errors.password.message}</FormError>}
      </FormGroup>
      <FormGroup>
        <FormLabel>Confirm password</FormLabel>
        <FormInput
          placeholder='********'
          type='password'
          {...register('passwordConfirm', { required: true })}
        />
        {errors.passwordConfirm && <FormError>* Required field</FormError>}
      </FormGroup>
      {isLoading ? <Button>Reseting...</Button> : <Button>Reset</Button>}
      <LoginLink>
        Or <Link to='/login'>Login</Link>
      </LoginLink>
    </Form>
  );
};

export default Register;
