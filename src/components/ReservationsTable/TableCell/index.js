import React from 'react'
import DetailModal from '../DetailModal'
import Icon, { IconNames } from 'components/Icons'
import theme from 'config/theme'
import { Container, TableCellContainer, ReservedLine } from './styled'

class TableCell extends React.Component {
  state = { isDetailOpen: false }

  toggleDetail = () => {
    this.setState({ isDetailOpen: !this.state.isDetailOpen })
  }

  openDetail = () => {
    if (this.props.booking) this.setState({ isDetailOpen: true })
  }

  closeDetail = () => {
    if (this.props.booking) setTimeout(this.setState({ isDetailOpen: false }), 500)
  }

  handleCellClick = () => {
    if (
      this.props.isBooked ||
      (this.props.isBooked === false && this.props.isCancelled === false) ||
      this.props.edit
    ) {
      this.toggleDetail()
    }
  }

  renderPrice = () =>
    this.props.price ? (
      <label>{`$${this.props.price}`}</label>
    ) : (
      <Icon size={20} name={IconNames['Plus']} color={theme.colors.blueRibbon} />
    )

  render() {
    return (
      <Container>
        <TableCellContainer
          ref={el => (this.inputRef = el)}
          onClick={this.handleCellClick}
          onBlur={() => {
            !this.props.edit && this.closeDetail()
          }}
          isBooked={this.props.isBooked}
          isEnabled={
            this.props.isBooked ||
            (this.props.isBooked === false && this.props.isCancelled === false)
          }
          initial={this.props.initial}
          final={this.props.final}
        >
          {!this.props.edit && this.props.booking && <ReservedLine />}
          {this.props.edit &&
            (this.props.isBooked ||
              (this.props.isBooked === false && this.props.isCancelled === false)) &&
            this.renderPrice()}
          {this.props.children}
        </TableCellContainer>
        {this.state.isDetailOpen && (
          <DetailModal
            onRangeChange={rangeUpdated => {
              this.props.onRangeChange(rangeUpdated)
              this.closeDetail()
            }}
            onRangeCreation={newRange => {
              this.props.onRangeCreation(newRange)
              this.closeDetail()
            }}
            onRangeDelete={rangeToDelete => {
              this.props.onRangeDelete(rangeToDelete)
              this.closeDetail()
            }}
            dayPos={this.props.dayPos}
            data={this.props.data}
            onClose={() => this.setState({ isDetailOpen: false })}
            timeRange={this.props.timeRange}
            leftPopUp={this.props.leftPopUp}
            bottomPopUp={this.props.timeRange.from > '18:30'}
            booking={this.props.booking}
            isBooked={this.props.isBooked}
            originalData={this.props.originalData}
            price={this.props.price}
            edit={this.props.edit}
          />
        )}
      </Container>
    )
  }
}

export default TableCell
