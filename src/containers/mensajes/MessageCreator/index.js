import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from 'components/Modal'
import { fetchUsers, createPrivateMsj, createPublicMsj } from 'store/actions/mensajes.actions'
import CircularProgress from '@material-ui/core/CircularProgress'
import Select from 'react-select'
import { Formik } from 'formik'
import * as Yup from 'yup'
import mapUsers from 'selectors/mapUsers'
import TextArea from 'components/TextArea'
import CrossIcon from 'assets/icons/cross.png'
import {
  FormContainer,
  Row,
  InputWrapper,
  InputLabel,
  ErrorLabel,
  ButtonWrapper,
  StyledButton,
  CrossImage
} from './styled'

class MessageCreator extends React.Component {
  componentWillMount = () => {
    if (!this.isUserDefined()) this.props.fetchUsers()
  }

  getTypeOptions = () => [
    { label: 'Público', value: 'public' },
    { label: 'Privado', value: 'private' }
  ]

  getNeighbourhoodOptions = () =>
    this.props.neighbourhoods.map(n => ({ label: n.name, value: n.guid }))

  getFormContent = ({ handleSubmit, values, setFieldValue, errors }) => (
    <FormContainer onSubmit={handleSubmit}>
      <CrossImage onClick={() => this.props.onClose(false)} src={CrossIcon} />
      <Row error={errors.user || errors.type}>
        <InputWrapper width={70}>
          <InputLabel>{'Para'}</InputLabel>
          <Select
            value={values.user}
            onChange={option => setFieldValue('user', option)}
            options={this.props.users}
            placeholder="Buscar..."
            isLoading={this.props.loadingUsers}
            isDisabled={
              this.props.loadingUsers || values.type.value === 'public' || this.isUserDefined()
            }
            autoFocus
          />
          {errors.user && <ErrorLabel>{errors.user}</ErrorLabel>}
        </InputWrapper>
        <InputWrapper width={25}>
          <InputLabel>{'Tipo de mensaje'}</InputLabel>
          <Select
            value={values.type}
            onChange={option => {
              if (option.value === 'public') {
                setFieldValue('type', option)
                setFieldValue('user', '')
              } else {
                setFieldValue('type', option)
                setFieldValue('neighbourhood', this.formattedSelectedNeighbourhood())
              }
            }}
            options={this.getTypeOptions()}
            placeholder="Buscar..."
            isDisabled={this.isUserDefined()}
          />
          {errors.type && <ErrorLabel>{errors.type}</ErrorLabel>}
        </InputWrapper>
      </Row>
      <Row>
        <InputWrapper width={100}>
          <InputLabel>{'Barrio'}</InputLabel>
          <Select
            value={values.neighbourhood}
            isMulti
            onChange={option => {
              setFieldValue('neighbourhood', option)
            }}
            options={this.getNeighbourhoodOptions()}
            placeholder="Buscar..."
            isDisabled={values.type.value === 'private' || this.isUserDefined()}
          />
          {errors.neighbourhood && <ErrorLabel>{errors.neighbourhood}</ErrorLabel>}
        </InputWrapper>
      </Row>
      <Row error={errors.message}>
        <InputWrapper>
          <InputLabel>{'Mensaje'}</InputLabel>
          <TextArea
            area
            value={values.message}
            onChange={({ target: { value } }) => setFieldValue('message', value)}
            placeholder={''}
            type={'text'}
            rows={5}
          />
          {errors.message && <ErrorLabel>{errors.message}</ErrorLabel>}
        </InputWrapper>
      </Row>
      <ButtonWrapper>
        <StyledButton type={'submit'}>
          {this.props.loading ? <CircularProgress size={18} /> : 'Enviar'}
        </StyledButton>
      </ButtonWrapper>
    </FormContainer>
  )

  getSignUpSchema = () =>
    Yup.lazy(values =>
      Yup.object().shape({
        user:
          values.type.value === 'private' ? Yup.object().required('Seleccione un usuario') : null,
        type: Yup.object().required('Seleccione un tipo'),
        message: Yup.string().required('Ingrese un mensaje'),
        neighbourhood: Yup.array().min(1, 'Ingrese un barrio')
      })
    )

  handleSubmit = async data => {
    const formData = {
      message: data.message,
      publicationdate: this.getDate()
    }
    if (data.type.value === 'private') {
      formData.destinationusername = data.user.value
      await this.props.createPrivateMsj(formData)
      this.props.onClose(true)
    } else {
      await data.neighbourhood.forEach(
        async ({ value }) => await this.props.createPublicMsj(formData, value)
      )
      this.props.onClose(true)
    }
  }

  getDate = () => {
    const tzoffset = new Date().getTimezoneOffset() * 60000
    return new Date(Date.now() - tzoffset).toISOString().slice(0, -1)
  }

  isUserDefined = () => this.props.user.label !== undefined

  formattedSelectedNeighbourhood = () => ({
    value: this.props.selectedNeighbourhood.guid,
    label: this.props.selectedNeighbourhood.name
  })

  getInitialValues = () => ({
    user: this.isUserDefined() ? this.props.user : '',
    type: { label: 'Privado', value: 'private' },
    message: '',
    neighbourhood: [this.formattedSelectedNeighbourhood()]
  })

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

const mapStateToProps = ({
  messages: { users, loadingUsers, loading },
  userInfo: { neighbourhoods, selectedNeighbourhood }
}) => ({
  users: mapUsers(users),
  loadingUsers,
  loading,
  neighbourhoods,
  selectedNeighbourhood
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUsers,
      createPrivateMsj,
      createPublicMsj
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageCreator)
