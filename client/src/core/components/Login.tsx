import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const Error = styled.p`
  color: #b40606;
  font-size: 18px;
  text-align: center;
`;
const LoginLink = styled.span`
  color: teal;
  display: inline-block;
  margin-top: 10px;
  font-size: 16px;
`;

type UserData = {
  email: string;
  password: string;
};

const BASE_URL = 'http://localhost:3000/api/auth';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();

  const onRegister = (data: UserData) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/login`, data)
      .then((user) => {
        localStorage.setItem('authToken', user.data.token);

        navigate('/private');
      })
      .catch(() => {
        setHasError(true);
      })

      .finally(() => setIsLoading(false));
  };

  return (
    <Form onSubmit={handleSubmit(onRegister)}>
      <FormHeader>Login</FormHeader>
      {hasError && <Error>Email ou senha errado!</Error>}
      <FormGroup>
        <FormLabel>Email</FormLabel>
        <FormInput
          placeholder='helio023@gmail.com'
          type='email'
          {...register('email', {
            required: 'Required field',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email',
            },
          })}
        />
        {errors.email && <FormError>* {errors.email.message}</FormError>}
      </FormGroup>
      <FormGroup>
        <FormLabel>Password</FormLabel>
        <FormInput
          placeholder='********'
          type='password'
          {...register('password', {
            required: 'Required field',
          })}
        />
        {errors.password && <FormError>* {errors.password.message}</FormError>}
      </FormGroup>

      {isLoading ? <Button>Loging...</Button> : <Button>Login</Button>}
      <LoginLink>
        Don't have an account? <Link to='/register'>Register</Link>
      </LoginLink>
    </Form>
  );
};

export default Register;
