import React from 'react'
import { DataWrapper, Row, Column, DataLabel } from './styled'

const UserInfoElementEmpty = ({ message }) => (
  <DataWrapper>
    <Row>
      <Column>
        <DataLabel noMargin>No hay {message} disponibles </DataLabel>
      </Column>
    </Row>
  </DataWrapper>
)

export default UserInfoElementEmpty
