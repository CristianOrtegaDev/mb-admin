import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const StyledButton = styled(({ ...other }) => <Button classes={{ label: 'label' }} {...other} />)`
  width: 100%;
  background: ${({ background }) => background} !important;
  border: 0;
  height: ${({ small }) => (small ? 40 : 55)}px;
  border-radius: 10px !important;
  text-transform: inherit !important;
  border: 1px solid ${({ borderColor, background }) => borderColor || background} !important;

  & .label {
    color: ${({ color }) => color};
    font-size: ${({ fontSize }) => fontSize}px;
    text-transform: inherit;
    font-family: ${({ theme }) => theme.fonts.roboto};
    font-weight: 400;
    cursor: pointer;
    pointer-events: none;
  }

  b {
    margin-left: 5px;
  }
`

const ButtonMaterial = ({
  children,
  background,
  color,
  fontSize,
  borderColor,
  loading,
  small,
  disabled,
  ...otherProps
}) => (
  <StyledButton
    background={background}
    fontSize={fontSize}
    color={color}
    borderColor={borderColor}
    small={small}
    disabled={loading || disabled}
    {...otherProps}
  >
    {loading ? <CircularProgress color={'white'} size={small ? 20 : 30} /> : children}
  </StyledButton>
)

export default ButtonMaterial
