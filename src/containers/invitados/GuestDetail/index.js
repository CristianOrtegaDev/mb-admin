import React from 'react'
import { getFormattedDate } from 'utils/dateParser'
import {
  DataContainer,
  DataWrapper,
  Row,
  Column,
  Title,
  DataLabel,
  DataContent,
  Separator
} from './styled'

const isResourceAvaiable = resource => resource || 'No disponible'

const GuestDetail = ({ guest }) => {
  return guest ? (
    <DataContainer>
      <DataWrapper>
        <Row justify={'space-between'}>
          <Title>{'Detalle de la invitación'}</Title>
        </Row>
        <Row align={'flex-start'}>
          <Column>
            <Title>{'Generada por:'}</Title>
            <Row>
              <DataLabel>{'Nombre: '}</DataLabel>
              <DataContent>{isResourceAvaiable(guest.host_full_name)}</DataContent>
            </Row>
            <Row>
              <DataLabel>{'Usuario: '}</DataLabel>
              <DataContent>{isResourceAvaiable(guest.host_username)}</DataContent>
            </Row>
          </Column>
          <Column>
            <Title>{'Fecha y lugar:'}</Title>
            <Row>
              <DataLabel>{'Entrada: '}</DataLabel>
              <DataContent>{getFormattedDate(guest.from)}</DataContent>
            </Row>
            <Row>
              <DataLabel>{'Salida: '}</DataLabel>
              <DataContent>{getFormattedDate(guest.to)}</DataContent>
            </Row>
          </Column>
        </Row>
        <Separator />
        <Row justify={'space-between'}>
          <Title>{'Invitado/s'}</Title>
        </Row>
        <DataWrapper>
          <Row>
            <Column>
              <DataLabel noMargin>{'Nombre'}</DataLabel>
              <DataContent noMargin>{isResourceAvaiable(guest.name)}</DataContent>
            </Column>
            <Column>
              <DataLabel noMargin>{'Usuario'}</DataLabel>
              <DataContent noMargin>{isResourceAvaiable(guest.userName)}</DataContent>
            </Column>
            <Column>
              <DataLabel noMargin>{'DNI'}</DataLabel>
              <DataContent noMargin>{isResourceAvaiable(guest.dni)}</DataContent>
            </Column>
            <Column>
              <DataLabel noMargin>{'Teléfono'}</DataLabel>
              <DataContent noMargin>{isResourceAvaiable(guest.phone_number)}</DataContent>
            </Column>
          </Row>
          {/* {guest.vehicle && <Separator noMargin />}
          {guest.vehicle && (
            <Row>
              <Column>
                <DataLabel noMargin>{'Marca'}</DataLabel>
                <DataContent noMargin>{isResourceAvaiable(guest.name)}</DataContent>
              </Column>
              <Column>
                <DataLabel noMargin>{'Modelo'}</DataLabel>
                <DataContent noMargin>{isResourceAvaiable(guest.userName)}</DataContent>
              </Column>
              <Column>
                <DataLabel noMargin>{'Patente'}</DataLabel>
                <DataContent noMargin>{isResourceAvaiable(guest.dni)}</DataContent>
              </Column>
              <Column>
                <DataLabel noMargin>{'Seguro'}</DataLabel>
                <DataContent noMargin>{isResourceAvaiable(guest.phone_number)}</DataContent>
              </Column>
            </Row>
          )} */}
        </DataWrapper>
      </DataWrapper>
    </DataContainer>
  ) : (
    <DataContainer>
      <DataWrapper>
        <label>{'Seleccione un invitado'}</label>
      </DataWrapper>
    </DataContainer>
  )
}

export default GuestDetail
