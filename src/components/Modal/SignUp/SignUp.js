import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link, Navigate } from 'react-router-dom'
import { Input, Typography, Button } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { usePostNewUserMutation } from '../../../services/api'
import { AppRoute, INPUT_INVALID_CLASS, errorToastConfig, successToastConfig } from '../../../constants'
import Spinner from '../../Spinner'
import { isFetchBaseQueryError, isErrorWithMessage, processServerError } from '../../../utils'
import '../style.css'
import { addUserAction } from '../../../state/userReducer'
import { withRedirect } from '../../../hocs/withRedirect'

const { Title } = Typography

const SignUpForm = {
  Username: 'username',
  Email: 'email',
  Password: 'password',
  RepeatedPassword: 'repeatedPassword',
  Agreement: 'agreement',
}

function SignUp(props) {
  const { className = '' } = props
  const [postNewUser, { error, isError, isSuccess, isLoading, data }] = usePostNewUserMutation()
  const serverError = processServerError(error)
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      repeatedPassword: '',
      agreement: 'yes',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  useEffect(() => {
    if (isSuccess && data) {
      toast('Your registration was successful!', successToastConfig)
      dispatch(addUserAction(data.user))
    }
  }, [isSuccess])

  if (isLoading) return <Spinner />
  if (isSuccess) return <Navigate to={AppRoute.Root} />

  if (isError) {
    if (isFetchBaseQueryError(error) && error.status !== 422) {
      const serverErrorObj = error.data
      const errorMessage = `Status: ${error.status}. ${serverErrorObj.errors.message}.`
      toast(errorMessage, errorToastConfig)
    } else if (isErrorWithMessage(error)) {
      toast(error.message, errorToastConfig)
    }
  }

  const formSubmitHandler = (data) => {
    if (data.password !== data.repeatedPassword) {
      setError(SignUpForm.RepeatedPassword, {
        type: 'manual',
        message: 'Password must match.',
      })
      return
    }

    const newUser = { user: { username: data.username, email: data.email, password: data.password } }

    postNewUser(newUser)
  }

  console.log(postNewUser, error, isError, isSuccess, isLoading, data, 'postNewUser')
  console.log(props, '======', className)
  console.log(isFetchBaseQueryError, isErrorWithMessage, processServerError, 'isFetchBaseQueryError')
  console.log(serverError, 'serverError')
  console.log(dispatch, 'dispatch')
  console.log(control, handleSubmit, setError, errors, 'errors')
  console.log(Controller, 'Controller')
  console.log(AppRoute, INPUT_INVALID_CLASS, errorToastConfig, 'errorToastConfig')
  console.log(formSubmitHandler, 'formSubmitHandler')

  return (
    <section className={`${className} modal`}>
      <Title level={4} className="modal__title">
        Create new account
      </Title>
      <form className="modal__form" onSubmit={handleSubmit(formSubmitHandler)}>
        <label className="modal__label">
          Username
          <Controller
            name={SignUpForm.Username}
            control={control}
            rules={{
              required: 'Please, write your name.',
              minLength: { value: 3, message: 'Minimum length 3 characters.' },
              maxLength: { value: 20, message: 'Maximum length 20 characters.' },
            }}
            render={({ field }) => (
              <Input
                className={`modal__input ${errors.username || serverError.username ? INPUT_INVALID_CLASS : ''}`}
                placeholder="Username"
                type="text"
                {...field}
              />
            )}
          />
          <span className="modal__invalid-message">
            {errors.username && (errors.username.message || 'Username needs to be from 3 to 20 characters. ')}
            {!errors.username && serverError.username && `Username ${serverError.username}.`}
          </span>
        </label>

        <label className="modal__label">
          Email address
          <Controller
            name={SignUpForm.Email}
            control={control}
            rules={{ required: 'Please, write your email.' }}
            render={({ field }) => (
              <Input
                className={`modal__input ${errors.email || serverError.email ? INPUT_INVALID_CLASS : ''}`}
                placeholder="Email address"
                type="email"
                {...field}
              />
            )}
          />
          <span className="modal__invalid-message">
            {errors.email && (errors.email.message || 'Email needs to be correct. ')}
            {!errors.email && serverError.email && `Email ${serverError.email}`}
          </span>
        </label>

        <label className="modal__label">
          Password
          <Controller
            name={SignUpForm.Password}
            control={control}
            rules={{
              required: 'Please, write your password.',
              minLength: { value: 6, message: 'Minimum length 6 characters.' },
              maxLength: { value: 40, message: 'Maximum length 40 characters.' },
            }}
            render={({ field }) => (
              <Input
                data-testid="password"
                className={`modal__input ${errors.password || serverError.password ? INPUT_INVALID_CLASS : ''}`}
                placeholder="Password"
                type="password"
                {...field}
              />
            )}
          />
          <span className="modal__invalid-message">
            {errors.password && (errors.password.message || 'Password needs to be from 6 to 40 characters. ')}
            {!errors.password && serverError.password && `Password ${serverError.password}.`}
          </span>
        </label>

        <label className="modal__label">
          Repeat Password
          <Controller
            name={SignUpForm.RepeatedPassword}
            control={control}
            rules={{
              required: 'Please, write your password.',
              minLength: { value: 6, message: 'Minimum length 6 characters.' },
              maxLength: { value: 40, message: 'Maximum length 40 characters.' },
            }}
            render={({ field }) => (
              <Input
                data-testid="repeat-password"
                className={`modal__input ${errors.repeatedPassword || serverError.password ? INPUT_INVALID_CLASS : ''}`}
                placeholder="Password"
                type="password"
                {...field}
              />
            )}
          />
          <span className="modal__invalid-message">
            {errors.repeatedPassword && (errors.repeatedPassword.message || 'Passwords must match.')}
          </span>
        </label>
        <label className="modal__checkbox-label">
          <Controller
            name={SignUpForm.Agreement}
            control={control}
            render={({ field }) => (
              <Input className="modal__checkbox" type="checkbox" defaultChecked required {...field} />
            )}
          />
          <span>I agree to the processing of my personal information</span>
        </label>
        <Button className="modal__submit" type="primary" htmlType="submit" name="create" data-testid="create">
          Create
        </Button>
      </form>
      <div className="modal__message">
        <span className="modal__message-text">
          Already have an account?
          <Link to={AppRoute.Login} className="modal__message-link">
            Sign In
          </Link>
          .
        </span>
      </div>
    </section>
  )
}

export default withRedirect(SignUp)
