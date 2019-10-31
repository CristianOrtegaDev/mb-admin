import React from 'react'
import { Container, UserImg, Column, Row, DataLabel, DataContent } from './styled'
import { Avatar } from '@material-ui/core'

const isResourceAvaiable = resource => resource || 'No disponible'

//TODO ---> change the styles for avatar

const UserInfo = ({
  user: { avatar, name, username, dni, phone_number, email, neighbourhood }
}) => (
  <Container>
    {avatar ? (
      <UserImg src={avatar} />
    ) : (
      <Avatar
        style={{
          width: '60px',
          height: '60px',
          fontSize: '30px',
          padding: '15px',
          background: '#1873f3',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        {name.charAt(0).toUpperCase()}
      </Avatar>
    )}
    <Row justify={'space-around'} noMargin>
      <Column width={35}>
        <Row widthAuto>
          <DataLabel>{'Nombre: '}</DataLabel>
          <DataContent>{isResourceAvaiable(name)}</DataContent>
        </Row>
        <Row widthAuto>
          <DataLabel>{'Usuario: '}</DataLabel>
          <DataContent>{isResourceAvaiable(username)}</DataContent>
        </Row>
        <Row widthAuto>
          <DataLabel>{'DNI: '}</DataLabel>
          <DataContent>{isResourceAvaiable(dni)}</DataContent>
        </Row>
      </Column>
      <Column widthAuto>
        <Row widthAuto>
          <DataLabel>{'Teléfono: '}</DataLabel>
          <DataContent>{isResourceAvaiable(phone_number)}</DataContent>
        </Row>
        <Row widthAuto>
          <DataLabel>{'Email: '}</DataLabel>
          <DataContent>{isResourceAvaiable(email)}</DataContent>
        </Row>
        <Row widthAuto>
          <DataLabel>{'Barrio: '}</DataLabel>
          <DataContent>{isResourceAvaiable(neighbourhood)}</DataContent>
        </Row>
      </Column>
    </Row>
  </Container>
)

export default UserInfo
