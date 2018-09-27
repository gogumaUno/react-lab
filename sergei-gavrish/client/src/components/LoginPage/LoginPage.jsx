import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, Button } from '@material-ui/core';

let LoginPage = ({ handleSubmit }) => (
    <form onSubmit={handleSubmit} style={{
      display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
    }}>
      <Field name='login' component='input' label='Login' type='text' />
      <Field name='password' component='input' label='Password' type='password' />
      <Button type="submit">Submit</Button>
    </form>
);

LoginPage = reduxForm({
  form: 'loginForm',
})(LoginPage);

export default LoginPage;
