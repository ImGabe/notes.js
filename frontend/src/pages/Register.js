import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
  username: yup
    .string()
    .min(4, 'username deve ser maior que 4')
    .max(15, 'username deve ser menor que 15')
    .required(),

  email: yup
    .string()
    .email()
    .required(),

  password: yup
    .string()
    .min(8, 'password deve ser maior que 8')
    .required()
}).required()

const Register = () => {
  const [redirect, setRedirect] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    const { username, email, password } = data

    await fetch('http://localhost:3030/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })

    setRedirect(true)
  }

  if (redirect) {
    return <Redirect to="/login"/>
  }

  return (
    <div>
      <h3>Register</h3>

      <form onSubmit={handleSubmit(onSubmit)}>

        username <br />
        <input {...register('username')} /> <br />
        {errors.username?.message} <br />

        email <br />
        <input type="email" {...register('email')} /> <br />
        {errors.email?.message} <br />

        password <br />
        <input type="password" {...register('password')} /> <br />
        {errors.password?.message} <br />

        password <br />
        <input type="password" {...register('password')} /> <br />
        {errors.password?.message} <br />

        <input type="submit" />
      </form>
    </div>
  )
}

export default Register
