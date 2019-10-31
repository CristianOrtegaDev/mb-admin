import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import AppBar from '@material-ui/core/AppBar'
import ContentFooter from '../components/content-footer/content-footer.component'
import Header from 'components/Header'
import scss from './layout-toolbar.module.scss'
import styles from './layout-toolbar.style'

class ToolbarLayout extends React.Component {
  render() {
    const { children, classes } = this.props

    return (
      <div className={classNames(scss['layout-toolbar-wrapper'], classes.wrapper)}>
        <main className={scss['layout-toolbar-main']}>
          <AppBar color="default" position="static" className={scss['layout-toolbar-header']}>
            <Header />
          </AppBar>
          <div className={scss['layout-toolbar-content-wrapper']}>
            <div className={scss['layout-toolbar-content']}>{children}</div>
          </div>
          <ContentFooter />
        </main>
      </div>
    )
  }
}

ToolbarLayout.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.shape({}).isRequired
}

export default compose(
  withWidth(),
  withStyles(styles, { withTheme: true })
)(ToolbarLayout)
