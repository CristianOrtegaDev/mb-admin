import React from 'react'
import { DataWrapper, Row, Column, DataLabel, DataContent } from './styled'

const isResourceAvaiable = resource => resource || 'No disponible'

const UserInfoElement = ({ user: { name, username, dni, phone_number }, isEmpty, type }) => (
  <DataWrapper>
    {isEmpty !== 0 ? (
      <Row>
        <Column>
          <DataLabel noMargin>{'Nombre'}</DataLabel>
          <DataContent noMargin>{isResourceAvaiable(name)}</DataContent>
        </Column>
        <Column>
          <DataLabel noMargin>{'Usuario'}</DataLabel>
          <DataContent noMargin>{isResourceAvaiable(username)}</DataContent>
        </Column>
        <Column>
          <DataLabel noMargin>{'DNI'}</DataLabel>
          <DataContent noMargin>{isResourceAvaiable(dni)}</DataContent>
        </Column>
        <Column>
          <DataLabel noMargin>{'Teléfono'}</DataLabel>
          <DataContent noMargin>{isResourceAvaiable(phone_number)}</DataContent>
        </Column>
      </Row>
    ) : (
      <Row>
        <Column>
          <DataLabel noMargin>No hay {type} disponibles </DataLabel>
        </Column>
      </Row>
    )}
  </DataWrapper>
)

{
  /* {guest.vehicle && <Separator noMargin />}
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
          )} */
}

export default UserInfoElement
