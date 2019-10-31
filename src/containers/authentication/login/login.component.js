import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { auth, setAuthRedirectPath } from 'store/actions/auth.actions'
// New implementation
import { Formik } from 'formik'
import * as Yup from 'yup'
import theme from 'config/theme'
import TextFieldMaterial from 'components/TextFieldMaterial'
import ButtonMaterial from 'components/ButtonMaterial'
import loginImage from 'assets/images/login-background.jpg'
import {
  Container,
  ContentLabel,
  FormContainer,
  FormWrapper,
  ImageWrapper,
  StyledImg,
  SubTitle,
  Title,
  ButtonWrapper,
  ErrorLabel
} from './styled'

class Login extends Component {
  renderForm = () => {
    const SignUpSchema = Yup.object().shape({
      user: Yup.string().required('Usuario requerido'),
      password: Yup.string().required('Contraseña requerida')
    })

    return (
      <Formik
        initialValues={{
          user: '',
          password: ''
        }}
        validateOnChange={false}
        validationSchema={SignUpSchema}
        onSubmit={this.handleSubmit}
        render={e => this.getFormContent(e)}
      />
    )
  }

  handleSubmit = async formData => await this.props.auth(formData.user, formData.password)

  getFormContent = ({ handleSubmit, values, setFieldValue, errors }) => (
    <FormContainer onSubmit={handleSubmit}>
      <FormWrapper>
        <Title>{'Mi Barrio'}</Title>
        <SubTitle>{'Bienvenido'}</SubTitle>
        <ContentLabel>{'Ingresá a tu cuenta'}</ContentLabel>
        <TextFieldMaterial
          name={'user'}
          label={'Nombre de usuario'}
          helperText={errors.user}
          value={values.user}
          error={errors.user}
          onChange={({ target: value }) => setFieldValue('user', value.value)}
          margin="normal"
        />
        <TextFieldMaterial
          name={'password'}
          label={'Contraseña'}
          type="password"
          helperText={errors.password}
          value={values.password}
          onChange={({ target: value }) => setFieldValue('password', value.value)}
          error={errors.password}
          margin="normal"
        />
        <ButtonWrapper margin={30}>
          <ButtonMaterial
            type={'submit'}
            background={theme.colors.blueRibbon}
            color={theme.colors.white}
            fontSize={'18'}
            loading={this.props.loading}
          >
            {'Ingresar'}
          </ButtonMaterial>
        </ButtonWrapper>
        {this.props.error && <ErrorLabel>{this.props.error}</ErrorLabel>}
      </FormWrapper>
    </FormContainer>
  )

  render() {
    return (
      <Container>
        <ImageWrapper>
          <StyledImg src={loginImage} />
        </ImageWrapper>
        {this.renderForm()}
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    authReducer: state.auth,
    user: state.auth.user,
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      auth,
      setAuthRedirectPath
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
