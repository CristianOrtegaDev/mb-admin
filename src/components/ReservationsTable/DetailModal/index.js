import React from 'react'
import Input from 'components/Input'
import InputMask from 'react-input-mask'
import CloseImg from 'assets/icons/cross.png'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { isTimeRangeValid } from 'utils/timeFormatter'
import {
  DetailContainer,
  FormContainer,
  Title,
  Name,
  CancelButton,
  Row,
  Column,
  SaveButton,
  Close,
  ErrorLabel
} from './styled'

class DetailModal extends React.Component {
  state = {
    price: ''
  }

  renderDetail = () => (
    <DetailContainer leftPopUp={this.props.leftPopUp} bottomPopUp={this.props.bottomPopUp}>
      <Title>{'Reservado por:'}</Title>
      <Name>{this.props.booking.host_full_name}</Name>
    </DetailContainer>
  )

  getFormContent = ({ handleSubmit, values, setFieldValue, errors }) => (
    <DetailContainer leftPopUp={this.props.leftPopUp} bottomPopUp={this.props.bottomPopUp}>
      <FormContainer onSubmit={handleSubmit}>
        <Row>
          <Title>{'Rango inicio:'}</Title>
          <Close src={CloseImg} onClick={this.props.onClose} />
        </Row>
        <Column>
          <InputMask
            mask="99:99"
            value={values.from}
            placeholder={'Ingrese HH:MM'}
            onChange={({ target: { value } }) => setFieldValue('from', value)}
            maskChar={null}
            disabled={true}
          >
            {inputProps => <Input {...inputProps} disabled={true} />}
          </InputMask>
          {errors.from && <ErrorLabel>{errors.from}</ErrorLabel>}
        </Column>
        <Row>
          <Title>{'Rango finalizacion:'}</Title>
        </Row>
        <Column>
          <InputMask
            mask="99:99"
            value={values.to}
            placeholder={'Ingrese HH:MM'}
            onChange={({ target: { value } }) => setFieldValue('to', value)}
            maskChar={null}
            disabled={this.props.originalData}
          >
            {inputProps => <Input {...inputProps} disabled={this.props.originalData} />}
          </InputMask>
          {errors.to && <ErrorLabel>{errors.to}</ErrorLabel>}
        </Column>

        <Row>
          <Title>{'Valor de la reserva:'}</Title>
        </Row>
        <Column>
          <Input
            ref={el => (this.inputRef = el)}
            value={values.price}
            disabled={this.props.isBooked}
            onChange={({ target: { value } }) => setFieldValue('price', value)}
            placeholder={'Precio'}
            type="number"
          />
          {errors.price && <ErrorLabel>{errors.price}</ErrorLabel>}
        </Column>
        {!this.props.isBooked && (
          <Row>
            <CancelButton onClick={this.deleteRange}>
              {this.props.originalData ? 'Eliminar turno' : 'Cancelar'}
            </CancelButton>
            <SaveButton type={'submit'}>
              {this.props.originalData ? 'Actualizar' : 'Guardar'}
            </SaveButton>
          </Row>
        )}
        {this.props.isBooked && (
          <ErrorLabel>
            {'No puedes editar un rango que se encuentra reservado actualmente'}
          </ErrorLabel>
        )}
      </FormContainer>
    </DetailContainer>
  )

  handleSubmit = formData => {
    if (!this.props.originalData) {
      this.initializeRange(formData)
    } else if (this.props.originalData) {
      this.updateRange(formData)
    }
  }

  initializeRange = formData => {
    let rangeInitialized = {
      from: this.props.timeRange.from,
      to: formData.to,
      is_booked: false,
      is_cancelled: false,
      price: formData.price
    }
    this.props.onRangeCreation(rangeInitialized)
  }

  updateRange = formData => {
    let rangeUpdated = { ...this.props.originalData }
    rangeUpdated.price = formData.price
    this.props.onRangeChange(rangeUpdated)
  }

  deleteRange = () =>
    !this.props.originalData
      ? this.props.onClose()
      : this.props.onRangeDelete(this.props.originalData)

  render() {
    if (this.props.edit) {
      const rangeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0,3][0]$/
      const onlyNumberRegex = /^[0-9]*$/

      const SignUpSchema = Yup.object().shape({
        from: Yup.string()
          .matches(rangeRegex, 'Rango horario invalido')
          .required('Ingrese un rango horario'),
        to: Yup.string()
          .matches(rangeRegex, 'Rango horario invalido')
          .test(
            'to-validation',
            'el rango debe ser mayor a el inicio',
            value => value > this.props.timeRange.from
          )
          .test('range-validation', 'El rango ingresado se superpone', value => {
            let isDateValid = true
            if (!this.props.originalData) {
              const timeRange = {
                from: this.props.timeRange.from,
                to: value
              }
              isDateValid = isTimeRangeValid(timeRange, this.props.dayPos, this.props.data)
            }
            return isDateValid
          })
          .required('Ingrese un rango horario'),
        price: Yup.string()
          .matches(onlyNumberRegex, 'Precio invalido')
          .required('Ingrese un precio')
      })

      return (
        <Formik
          initialValues={{
            from: this.props.originalData
              ? this.props.originalData.from
              : this.props.timeRange.from,
            to: this.props.originalData ? this.props.originalData.to : '',
            price: this.props.price || '0'
          }}
          validateOnChange={false}
          validationSchema={SignUpSchema}
          onSubmit={this.handleSubmit}
          render={e => this.getFormContent(e)}
        />
      )
    }
    if (this.props.booking) {
      return this.renderDetail()
    }
    return null
  }
}

export default DetailModal
