import React, { Component } from 'react'
import Modal from 'components/Modal'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { bindActionCreators } from 'redux'
import Select from 'react-select'
import Input from 'components/Input'
import {
  FormContainer,
  Row,
  RowLeft,
  InputWrapper,
  InputLabel,
  ErrorLabel,
  ErrorMessage,
  ButtonWrapper,
  StyledButton,
  CrossImage,
  InputWrapperMargin
} from './styled'
import { connect } from 'react-redux'
import { newProprietary } from 'store/actions/padron.actions'
import CircularProgress from '@material-ui/core/CircularProgress'
import CrossIcon from 'assets/icons/cross.png'
import { fetchLotsByNeighbourhood } from 'store/actions/lotes.actions'

class ProprietaryCreator extends Component {
  state = {}

  getFormContent = ({ handleSubmit, values, setFieldValue, errors }) => (
    <FormContainer onSubmit={handleSubmit}>
      <CrossImage onClick={() => this.props.onClose(false)} src={CrossIcon} />
      <Row error={errors.user || errors.type}>
        <InputWrapper width={49}>
          <InputLabel>{'Nombre'}</InputLabel>
          <Input
            value={values.name}
            onChange={({ target: { value } }) => setFieldValue('name', value)}
            placeholder={''}
            type={'text'}
            rows={1}
            error={errors.name ? true : false}
          />
          {errors.name && <ErrorLabel>{errors.name}</ErrorLabel>}
        </InputWrapper>
        <InputWrapper width={49}>
          <InputLabel>{'Apellido'}</InputLabel>
          <Input
            value={values.surname}
            onChange={({ target: { value } }) => setFieldValue('surname', value)}
            placeholder={''}
            type={'text'}
            rows={1}
            error={errors.surname ? true : false}
          />
          {errors.surname && <ErrorLabel>{errors.surname}</ErrorLabel>}
        </InputWrapper>
      </Row>
      <Row error={errors.user || errors.type}>
        <InputWrapper width={49}>
          <InputLabel>{'DNI'}</InputLabel>
          <Input
            value={values.dni}
            onChange={({ target: { value } }) => setFieldValue('dni', value)}
            placeholder={''}
            type={'text'}
            rows={1}
            error={errors.dni ? true : false}
          />
          {errors.dni && <ErrorLabel>{errors.dni}</ErrorLabel>}
        </InputWrapper>
        <InputWrapper width={49}>
          <InputLabel>{'CUIL'}</InputLabel>
          <Input
            value={values.cuil}
            onChange={({ target: { value } }) => setFieldValue('cuil', value)}
            placeholder={''}
            type={'text'}
            rows={1}
            error={errors.cuil ? true : false}
          />
          {errors.cuil && <ErrorLabel>{errors.cuil}</ErrorLabel>}
        </InputWrapper>
      </Row>
      <RowLeft>
        <InputWrapperMargin width={24}>
          <InputLabel>{'Barrio'}</InputLabel>
          <Select
            value={values.neighbourhood}
            onChange={option => this.fetchLotsByNeighbourhood(setFieldValue, option)}
            options={this.getNeighbourhoodOptions()}
            placeholder="Buscar..."
            error={errors.neighbourhood ? true : false}
          />
          {errors.neighbourhood && <ErrorLabel>{errors.neighbourhood}</ErrorLabel>}
        </InputWrapperMargin>
        <InputWrapper width={25}>
          <InputLabel>{'Lote'}</InputLabel>
          <Select
            value={values.lot}
            onChange={option => {
              setFieldValue('lot', option)
            }}
            isLoading={this.props.loadingLots}
            isDisabled={this.props.loadingLots}
            options={this.getLotsOptions()}
            placeholder="Buscar..."
            error={errors.lot ? true : false}
          />
          {errors.lot && <ErrorLabel>{errors.lot}</ErrorLabel>}
        </InputWrapper>
      </RowLeft>
      <Row error={errors.user || errors.type}>
        <InputWrapper width={49}>
          <InputLabel>{'Email'}</InputLabel>
          <Input
            value={values.email}
            onChange={({ target: { value } }) => setFieldValue('email', value)}
            placeholder={''}
            type={'text'}
            rows={1}
            error={errors.email ? true : false}
          />
          {errors.email && <ErrorLabel>{errors.email}</ErrorLabel>}
        </InputWrapper>
        <InputWrapper width={49}>
          <InputLabel>{'Teléfono'}</InputLabel>
          <Input
            value={values.phone}
            onChange={({ target: { value } }) => setFieldValue('phone', value)}
            placeholder={'54 911 ********'}
            type={'text'}
            rows={1}
            error={errors.phone ? true : false}
          />
          {errors.phone && <ErrorLabel>{errors.phone}</ErrorLabel>}
        </InputWrapper>
      </Row>
      <ButtonWrapper>
        {this.props.errorNewProprietary ? <ErrorMessage>Hubo un Problema</ErrorMessage> : ''}
        <StyledButton type={'submit'}>
          {this.props.loadingNewProprietary ? <CircularProgress size={18} /> : 'Crear propietario'}
        </StyledButton>
      </ButtonWrapper>
    </FormContainer>
  )

  handleSubmit = async data => {
    const newProprietaryData = {
      picture_base64: null,
      picture_extension: null,
      name: data.name,
      gender: 2,
      surname: data.surname,
      dni: data.dni,
      cuil: data.cuil,
      email: data.email,
      phone_number: `+${data.phone}`,
      property_id: data.lot.value
    }

    await this.props.newProprietary(newProprietaryData, data.neighbourhood.value)
    if (this.props.createdNewProprietary) this.props.onClose(true)
  }

  getSignUpSchema = () =>
    Yup.object().shape({
      name: Yup.string()
        .min(3, 'El nombre debe tener un mínimo de 3(tres) caracteres')
        .required('Ingrese Nombre'),
      surname: Yup.string()
        .min(2, 'El apellido debe tener un mínimo de 2(dos) caracteres')
        .required('Ingrese Apellido'),
      dni: Yup.string()
        .matches(/^\+?[1-9]\d{6,14}$/, 'DNI invalido')
        .min(8, 'El DNI debe tener un mínimo de 8(ocho) caracteres')
        .max(9, 'El DNI debe tener un máximo de 9(nueve) caracteres')
        .required('Ingrese DNI'),
      cuil: Yup.string()
        .matches(/^\+?[1-9]\d{6,14}$/, 'CUIL invalido')
        .min(11, 'El CUIL debe tener un mínimo de 11(once) caracteres')
        .max(12, 'El CUIL debe tener un máximo de 12(doce) caracteres')
        .required('Ingrese CUIL'),
      email: Yup.string()
        .email('El Email es inválido')
        .required('Ingrese Email'),
      phone: Yup.string()
        .matches(/^\+?[1-9]\d{6,14}$/, 'Teléfono invalido')
        .length(13, 'El teléfono debe tener 13(trece) caracteres')
        .required('Ingrese Teléfono'),
      neighbourhood: Yup.string().required('Ingrese un barrio'),
      lot: Yup.string().required('Ingrese un Lote')
    })

  fetchLotsByNeighbourhood = (setFieldValue, option) => {
    {
      setFieldValue('neighbourhood', option)
    }
    this.props.fetchLotsByNeighbourhood(option.value)
  }

  getLotsOptions = () => this.props.lotsList.map(l => ({ label: l.address, value: l.id }))

  getNeighbourhoodOptions = () =>
    this.props.neighbourhoods.map(n => ({ label: n.name, value: n.guid }))

  formattedSelectedNeighbourhood = () => ({
    value: this.props.selectedNeighbourhood.guid,
    label: this.props.selectedNeighbourhood.name
  })

  getInitialValues = () => ({
    neighbourhood: ''
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
  userInfo: { neighbourhoods, selectedNeighbourhood },
  padron,
  lotes
}) => ({
  loadingNewProprietary: padron.loadingNewProprietary,
  createdNewProprietary: padron.createdNewProprietary,
  errorNewProprietary: padron.errorNewProprietary,
  neighbourhoods,
  selectedNeighbourhood,
  lotsList: lotes.lotsList,
  loadingLots: lotes.loadingLots
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      newProprietary,
      fetchLotsByNeighbourhood
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProprietaryCreator)
