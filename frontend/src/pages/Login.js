import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

const schema = yup.object({
  email: yup
    .string()
    .email()
    .required(),

  password: yup
    .string()
    .min(8, 'password deve ser maior que 8')
    .required()
}).required()

const Login = ({ setUser }) => {
  const [redirect, setRedirect] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    const { email, password } = data

    const response = await fetch('http://localhost:3030/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      })
    })

    const content = await response.json()

    setRedirect(true)
    setUser(content.name)
  }

  if (redirect) {
    return <Redirect to="/"/>
  }

  return (
    <div>
      <h3>Login</h3>

      <form onSubmit={handleSubmit(onSubmit)}>

        email <br />
        <input type="email" {...register('email')} /> <br />
        {errors.email?.message} <br />

        password <br />
        <input type="password" {...register('password')} /> <br />
        {errors.password?.message} <br />

        <input type="submit" />
      </form>
    </div>
  )
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired
}

export default Login
