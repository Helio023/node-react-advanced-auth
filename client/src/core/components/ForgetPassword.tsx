import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';


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

type UserData = {
  email: string;
  password: string;
};

const ResLink = styled.div`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border: 2px solid green;
  border-radius: 5px;
  background-color: #2c682c50;
  color: green;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const BASE_URL = 'http://localhost:3000/api/auth';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [resetPass, setResetPass] = useState('');
  const [hasResetLink, setHasResetLink] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();

  const onRegister = (data: UserData) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/forgetpassword`, data)
      .then((user) => {
        setResetPass(user.data.link);
        setHasResetLink(true);
      })
      .catch(() => {
        setHasError(true);
      })

      .finally(() => setIsLoading(false));
  };

  return (
    <Form onSubmit={handleSubmit(onRegister)}>
      <FormHeader>Recover password</FormHeader>
      {hasError && <Error>User not found!</Error>}
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

      {isLoading ? <Button>Sending...</Button> : <Button>Send</Button>}

      {hasResetLink && (
        <ResLink>
          This reset link is supposed to be sent to your email but I am facing problems with SENDGRID account!
          <Link style={{color: "#fff", marginTop: "25px"}} to={`/${resetPass}`}>Reset your password</Link>
        </ResLink>
      )}
    </Form>
  );
};

export default Register;
