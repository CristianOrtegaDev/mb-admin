import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Modal from 'components/Modal'
import CrossIcon from 'assets/icons/cross.png'
import CircularProgress from '@material-ui/core/CircularProgress'
import { submitActivity } from 'store/actions/activities.actions'
import Input from 'components/Input'
import DetailTitle from 'components/DetailTitle'
import {
  FormContainer,
  Row,
  InputWrapper,
  ErrorLabel,
  ButtonWrapper,
  StyledButton,
  CrossImage,
  Separator
} from './styled'

class NewActivity extends React.Component {
  getInitialValues = () => ({
    description: ''
  })

  getSignUpSchema = () =>
    Yup.object().shape({
      description: Yup.string().required('El campo nombre es requerido')
    })

  getFormContent = ({ handleSubmit, values, setFieldValue, errors }) => (
    <FormContainer onSubmit={handleSubmit}>
      <CrossImage onClick={() => this.props.onClose(false)} src={CrossIcon} />
      <Row>
        <InputWrapper>
          <DetailTitle>{'Nueva Actividad'}</DetailTitle>
          <Separator />
          <Input
            name={'description'}
            label={'Nombre'}
            placeholder={'Nombre de la actividad'}
            value={values.description}
            error={errors.description}
            onChange={({ target: value }) => setFieldValue('description', value.value)}
            margin="normal"
          />
          {errors.description && <ErrorLabel>{errors.description}</ErrorLabel>}
        </InputWrapper>
      </Row>
      <ButtonWrapper>
        <StyledButton type={'submit'}>
          {this.props.activities.isSubmitting ? <CircularProgress size={18} /> : 'Crear'}
        </StyledButton>
      </ButtonWrapper>
    </FormContainer>
  )

  handleSubmit = async data => {
    await this.props.submitActivity(data)
    if (!this.props.activities.error) this.props.onClose(true)
  }

  render() {
    return (
      <Modal>
        <Formik
          initialValues={this.getInitialValues()}
          validateOnChange={false}
          validationSchema={this.getSignUpSchema()}
          onSubmit={this.handleSubmit}
          render={e => this.getFormContent(e)}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({ activities }) => ({
  activities
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitActivity
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewActivity)
