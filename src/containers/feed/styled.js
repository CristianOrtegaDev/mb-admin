import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 600px;
`

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 600px;
`

export const ListWrapper = styled.div`
  width: 30%;
  background-color: ${({ theme }) => theme.colors.ghost};
  padding-right: 13px;
  max-height: 600px;
  overflow-y: scroll;
  border-bottom-left-radius: 10px;
  border-right: 1px solid ${({ theme }) => theme.colors.ghost};

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
  }
`

export const DetailWrapper = styled.div`
  width: 70%;
  max-height: 600px;
  overflow: auto;
  min-height: 600px;
  box-sizing: border-box;
`
