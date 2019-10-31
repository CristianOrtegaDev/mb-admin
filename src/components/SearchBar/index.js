import React from 'react'
import Input from 'components/Input'
import Icon, { IconNames } from 'components/Icons'
import theme from 'config/theme'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.alto};
`

const SearchWrapper = styled.div`
  padding: 12px 10px 10px 35px;
`

const CloseWrapper = styled.div`
  padding: 12px 25px 6px 4px;
  cursor: pointer;
`

class SearchBar extends React.Component {
  componentDidUpdate = prevProps => {
    if (prevProps.value.length === 1 && this.props.value.length === 0) {
      this.props.onClear('')
    }
  }

  render() {
    const { placeholder, value, onChange, onClear, onKeyDown } = this.props
    return (
      <Container>
        <SearchWrapper>
          <Icon size={45} name={IconNames['Search']} color={theme.colors.blueRibbon} />
        </SearchWrapper>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={({ target: { value } }) => onChange(value)}
          onKeyDown={onKeyDown}
          size={20}
          withoutBorder
        />
        {value !== '' && (
          <CloseWrapper onClick={() => value !== '' && onClear('')}>
            <Icon
              onClick={onClear}
              size={30}
              name={IconNames['Close']}
              color={theme.colors.blueRibbon}
            />
          </CloseWrapper>
        )}
      </Container>
    )
  }
}

export default SearchBar
