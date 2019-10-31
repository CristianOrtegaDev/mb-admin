import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import ArrowBottom from 'assets/icons/arrow-bottom.png'
import CrossIcon from 'assets/icons/cross.png'
import Modal from 'components/Modal'
import { setNeighbourhood } from 'store/actions/userInfo.actions'
import CheckedImg from 'assets/icons/checked.png'
import { logout } from 'store/actions/auth.actions'
import { saveCacheUserInfo } from 'utils/session'
import {
  NeighbourhoodContainer,
  CheckedElement,
  NeighbourhoodElement,
  NeighbourhoodName,
  ElementWrapper,
  Container,
  StyledImg,
  ContentContainer,
  Wrapper,
  UserImg,
  UserWrapper,
  CrossImage,
  UserLabel,
  NeighbourhoodsLabel,
  LogoutLabel
} from './styled'

class UserLogged extends React.Component {
  state = {
    isOpen: false
  }

  componentDidUpdate = prevProps => {
    if (
      prevProps.userInfo.selectedNeighbourhood.guid !==
      this.props.userInfo.selectedNeighbourhood.guid
    ) {
      saveCacheUserInfo(this.props.userInfo)
    }
  }

  renderNeighbourhood = (neighbourhood, index) => (
    <NeighbourhoodContainer
      key={index}
      onClick={() => this.handleNeighbourhoodClick(neighbourhood)}
    >
      <NeighbourhoodElement selected={this.isNeighbourhoodSelected(neighbourhood)}>
        {this.isNeighbourhoodSelected(neighbourhood) && <CheckedElement src={CheckedImg} />}
        {neighbourhood.name[0]}
      </NeighbourhoodElement>
      <NeighbourhoodName selected={this.isNeighbourhoodSelected(neighbourhood)}>
        {neighbourhood.name}
      </NeighbourhoodName>
    </NeighbourhoodContainer>
  )

  handleNeighbourhoodClick = async neighbourhood => {
    this.props.setNeighbourhood(neighbourhood)
    window.location.reload()
  }

  isNeighbourhoodSelected = neighbourhood => {
    if (this.props.userInfo.selectedNeighbourhood) {
      return this.props.userInfo.selectedNeighbourhood.guid === neighbourhood.guid
    }
    return false
  }

  renderNeighbourhoodsList = () => (
    <ElementWrapper>
      {this.props.userInfo.neighbourhoods.map((neighbourhood, index) =>
        this.renderNeighbourhood(neighbourhood, index)
      )}
    </ElementWrapper>
  )

  logout = () => {
    localStorage.clear()
    this.props.logout()
  }

  render() {
    return (
      <Container>
        <UserWrapper onClick={() => this.setState({ isOpen: true })} clickable>
          <UserImg src={this.props.userInfo.profile_picture} small />
          <UserLabel small clickable>{`Hola ${this.props.userInfo.name}`}</UserLabel>
          <StyledImg src={ArrowBottom} />
        </UserWrapper>
        {this.state.isOpen && (
          <Modal withOutPage>
            <ContentContainer>
              <Wrapper>
                <CrossImage src={CrossIcon} onClick={() => this.setState({ isOpen: false })} />
                <UserWrapper>
                  <UserImg src={this.props.userInfo.profile_picture} />
                  <UserLabel>{`${this.props.userInfo.name} ${
                    this.props.userInfo.family_name
                  }`}</UserLabel>
                </UserWrapper>
                <ElementWrapper>
                  <NeighbourhoodsLabel>{'Mis Barrios'}</NeighbourhoodsLabel>
                </ElementWrapper>
                {this.renderNeighbourhoodsList()}
                <ElementWrapper>
                  <LogoutLabel onClick={this.logout}>{'Desconectarse'}</LogoutLabel>
                </ElementWrapper>
              </Wrapper>
            </ContentContainer>
          </Modal>
        )}
      </Container>
    )
  }
}

const mapStateToProps = ({ userInfo }) => ({
  userInfo
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setNeighbourhood,
      logout
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserLogged))
