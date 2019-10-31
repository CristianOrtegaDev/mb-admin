import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'

const StyledTextField = styled(TextField)`
  width: 100%;

  & label {
    color: ${({ theme }) => theme.colors.dustyGray};
  }

  & .MuiInput-underline-27:after {
    border-bottom: 2px solid ${({ theme }) => theme.colors.blueRibbon};
  }
`

const TextFieldMaterial = props => <StyledTextField {...props} />

export default TextFieldMaterial
