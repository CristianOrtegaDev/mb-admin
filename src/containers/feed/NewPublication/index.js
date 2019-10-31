import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Modal from 'components/Modal'
import CrossIcon from 'assets/icons/cross.png'
import TrashIcon from 'assets/icons/trash-blue.png'
import CircularProgress from '@material-ui/core/CircularProgress'
import Input from 'components/Input'
import TextArea from 'components/TextArea'
import DatePickerStyled from 'components/DatePickerStyled'
import Select from 'react-select'
import { addMonths } from 'date-fns'
import FileInput from 'components/FileInput'
import FileInputGroup from 'components/FileInputGroup'
import { httpsOnly } from 'constants/regularExpresions.js'
import { createNewEvent } from 'store/actions/feed.actions'
import { createNewArticle } from 'store/actions/feed.actions'
import {
  FormContainer,
  Row,
  InputWrapper,
  InputLabel,
  ErrorLabel,
  ButtonWrapper,
  StyledButton,
  CrossImage,
  ResetIcon
} from './styled'
import { parseToISO } from 'utils/iso8601Parser'

class NewActivity extends React.Component {
  getInitialValues = () => ({
    title: '',
    date: new Date(),
    type: this.getTypeOptions()[0],
    boldparagraph: '',
    subtitle: '',
    body: '',
    externalurl: '',
    headerImage: null,
    images: []
  })

  getSignUpSchema = () =>
    Yup.lazy(values =>
      Yup.object().shape({
        title: Yup.string().required('Ingrese un titulo'),
        date: Yup.string().required('Ingrese una fecha'),
        type: Yup.object(),
        subtitle: Yup.string().required('Ingrese un subtitulo'),
        boldparagraph: this.isEventForm(values) ? Yup.string().required('Ingrese un copete') : null,
        body: Yup.string().required('Ingrese un mensaje'),
        externalurl: Yup.string()
          .required('Ingrese un link')
          .matches(httpsOnly, {
            message: 'El link no es valido',
            excludeEmptyString: true
          }),
        headerImage: Yup.object()
          .nullable()
          .required('Seleccione una portada'),
        images: this.isEventForm(values) ? Yup.array() : null
      })
    )

  getFormContent = ({ handleSubmit, values, setFieldValue, setValues, resetForm, errors }) => (
    <FormContainer onSubmit={handleSubmit}>
      <CrossImage onClick={() => this.props.onClose(false)} src={CrossIcon} />
      <Row>
        <InputWrapper width={38}>
          <InputLabel>{'Titulo'}</InputLabel>
          <Input
            name={'title'}
            label={'Nombre'}
            placeholder={'Ingrese un titulo...'}
            value={values.title}
            error={errors.title}
            onChange={({ target: value }) => setFieldValue('title', value.value)}
            margin="normal"
          />
          {errors.title && <ErrorLabel>{errors.title}</ErrorLabel>}
        </InputWrapper>
        <InputWrapper width={28}>
          <InputLabel>{'Fecha de publicación'}</InputLabel>
          <DatePickerStyled
            selected={values.date}
            onChange={date => setFieldValue('date', date)}
            minDate={new Date()}
            maxDate={addMonths(new Date(), 2)}
            placeholderText="Elija fecha de publicación"
          />
          {errors.date && <ErrorLabel>{errors.date}</ErrorLabel>}
        </InputWrapper>
        <InputWrapper width={28}>
          <InputLabel>{'Tipo de publicación'}</InputLabel>
          <Select
            name={'type'}
            value={values.type}
            isSearchable={false}
            onChange={option => {
              option.value === 'Event'
                ? setValues({ ...values, type: option, boldparagraph: '', images: [] })
                : setValues({ ...values, type: option })
            }}
            error={errors.type}
            options={this.getTypeOptions()}
            placeholder="Seleccione un tipo..."
            isDisabled={false}
          />
          {errors.type && <ErrorLabel>{errors.type}</ErrorLabel>}
        </InputWrapper>
      </Row>
      <Row>
        <InputWrapper>
          <InputLabel>{'Subtitulo'}</InputLabel>
          <Input
            name={'subtitle'}
            label={'Subtitulo'}
            placeholder={'Ingrese un subtitulo...'}
            value={values.subtitle}
            error={errors.subtitle}
            onChange={({ target: value }) => setFieldValue('subtitle', value.value)}
            margin="normal"
          />
          {errors.subtitle && <ErrorLabel>{errors.subtitle}</ErrorLabel>}
        </InputWrapper>
      </Row>
      {this.isEventForm(values) && (
        <Row>
          <InputWrapper>
            <InputLabel>{'Copete'}</InputLabel>
            <Input
              name={'boldparagraph'}
              label={'boldparagraph'}
              placeholder={'Ingrese un copete...'}
              value={values.boldparagraph}
              error={errors.boldparagraph}
              onChange={({ target: value }) => setFieldValue('boldparagraph', value.value)}
              margin="normal"
            />
            {errors.boldparagraph && <ErrorLabel>{errors.boldparagraph}</ErrorLabel>}
          </InputWrapper>
        </Row>
      )}
      <Row>
        <InputWrapper>
          <InputLabel>{'Mensaje'}</InputLabel>
          <TextArea
            name={'body'}
            value={values.body}
            placeholder={'Ingrese un mensaje...'}
            onChange={({ target: { value } }) => setFieldValue('body', value)}
            error={errors.body}
            minHeight={150}
            maxHeight={150}
            type={'text'}
            rows={3}
          />
          {errors.body && <ErrorLabel>{errors.body}</ErrorLabel>}
        </InputWrapper>
      </Row>
      <Row>
        <InputWrapper>
          <InputLabel>{'Link a compartir'}</InputLabel>
          <Input
            name={'externalurl'}
            label={'externalurl'}
            value={values.externalurl}
            placeholder={'https://...'}
            error={errors.externalurl}
            onChange={({ target: value }) => setFieldValue('externalurl', value.value)}
            margin="normal"
          />
          {errors.externalurl && <ErrorLabel>{errors.externalurl}</ErrorLabel>}
        </InputWrapper>
      </Row>
      <Row>
        <InputWrapper width={30}>
          <InputLabel>{'Portada'}</InputLabel>
          <FileInput onChange={file => setFieldValue('headerImage', file)} />
          {errors.headerImage && <ErrorLabel>{errors.headerImage}</ErrorLabel>}
        </InputWrapper>
        {this.isEventForm(values) && (
          <InputWrapper>
            <FileInputGroup
              imagesAmount={4}
              label={'Adjuntar imagenes'}
              error={errors.images}
              onChange={images => setFieldValue('images', images)}
            />
          </InputWrapper>
        )}
      </Row>
      <Row>
        <ButtonWrapper>
          <ResetIcon onClick={() => resetForm()} src={TrashIcon} />
          <StyledButton type={'submit'}>
            {this.props.isSubmittingEvent || this.props.isSubmittingArticle ? (
              <CircularProgress size={18} />
            ) : (
              'Publicar'
            )}
          </StyledButton>
        </ButtonWrapper>
      </Row>
    </FormContainer>
  )

  isEventForm = values => values.type.value !== 'Event'

  getTypeOptions = () => [
    {
      label: 'Evento',
      value: 'Event'
    },
    {
      label: 'Articulo',
      value: 'Article'
    }
  ]

  handleSubmit = data => {
    let formattedData = {
      title: data.title,
      subtitle: data.subtitle,
      body: data.body,
      externalurl: data.externalurl,
      headerimagebase64: data.headerImage.base64Value,
      publicationdate: parseToISO(data.date)
    }

    if (data.type.value === 'Event') {
      this.submitEvent(formattedData, data)
    } else {
      this.submitArticle(formattedData, data)
    }
  }

  submitEvent = async (formattedData, data) => {
    formattedData.imageextension = data.headerImage.extension
    await this.props.createNewEvent(formattedData)
    if (!this.props.submitErrorEvent) this.props.onClose(true)
  }

  submitArticle = async (formattedData, data) => {
    formattedData.headerimageextension = data.headerImage.extension
    formattedData.boldparagraph = data.boldparagraph
    formattedData.images = data.images.map(image => ({
      imagebase64: image.base64Value,
      extension: image.extension
    }))
    await this.props.createNewArticle(formattedData)
    if (!this.props.submitErrorArticle) this.props.onClose(true)
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

const mapStateToProps = ({ feed }) => ({
  isSubmittingEvent: feed.loadingNewEvent,
  submitErrorEvent: feed.errorNewEvent,
  isSubmittingArticle: feed.loadingNewArticle,
  submitErrorArticle: feed.errorNewArticle
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createNewEvent, createNewArticle }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewActivity)
