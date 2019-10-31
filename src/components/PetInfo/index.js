import React from 'react'
import { getFormattedDate } from 'utils/dateParser'
import { DataWrapper, Row, Column, DataLabel, DataContent } from './styled'

const isResourceAvaiable = resource => resource || 'No disponible'

const PetInfo = ({
  name,
  type,
  age,
  size,
  color,
  typeCoat,
  gender,
  lastVaccination,
  sterilized
}) => (
  <DataWrapper>
    <Row>
      <Column>
        <DataLabel noMargin>{'Nombre'}</DataLabel>
        <DataContent noMargin>{isResourceAvaiable(name)}</DataContent>
      </Column>
      <Column>
        <DataLabel noMargin>{'Tipo Animal'}</DataLabel>
        <DataContent noMargin>{isResourceAvaiable(type)}</DataContent>
      </Column>
      <Column>
        <DataLabel noMargin>{'Edad'}</DataLabel>
        <DataContent noMargin>{isResourceAvaiable(age)}</DataContent>
      </Column>
      <Column>
        <DataLabel noMargin>{'Tamaño'}</DataLabel>
        <DataContent noMargin>{isResourceAvaiable(size)}</DataContent>
      </Column>
    </Row>
    <Row>
      <Column>
        <DataLabel noMargin>{'Color'}</DataLabel>
        <DataContent noMargin>{isResourceAvaiable(color)}</DataContent>
      </Column>
      <Column>
        <DataLabel noMargin>{'Tipo Pelaje'}</DataLabel>
        <DataContent noMargin>{isResourceAvaiable(typeCoat)}</DataContent>
      </Column>
      <Column>
        <DataLabel noMargin>{'Genero'}</DataLabel>
        <DataContent noMargin>{isResourceAvaiable(gender)}</DataContent>
      </Column>
      <Column>
        <DataLabel noMargin>{'Esterilizado'}</DataLabel>
        <DataContent noMargin>{sterilized ? 'Si' : 'No'}</DataContent>
      </Column>
    </Row>
    <Row>
      <Column>
        <DataLabel noMargin>{'última vacunación'}</DataLabel>
        <DataContent noMargin>{getFormattedDate(lastVaccination)}</DataContent>
      </Column>
    </Row>
  </DataWrapper>
)

export default PetInfo
