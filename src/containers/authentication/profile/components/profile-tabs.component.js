import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import FormHelperText from '@material-ui/core/FormHelperText'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Security from '@material-ui/icons/Security'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
}

const styles = () => ({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  tabLabel: {
    maxWidth: '100%',
    textTransform: 'capitalize'
  },
  toggleContainer: {
    flexDirection: 'row',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center'
  }
})

class ProfileTabs extends React.Component {
  state = {
    value: 0,
    name: 'Maira Daniela',
    lastname: 'Ferrari',
    email: 'mferrari@gmail.com',
    password: '',
    newpassword: '',
    confirmpassword: ''
  }

  validate(name, lastname, email) {
    // true means invalid, so our conditions got reversed
    return {
      name: name.length === 0,
      lastname: lastname.length === 0,
      email: email.length === 0
    }
  }
  validatePassword(password, newPassword, confirmPassword) {
    // true means invalid, so our conditions got reversed
    return {
      password: password.length === 0,
      newPassword: newPassword.length === 0,
      confirmPassword: confirmPassword.length === 0
    }
  }
  handleChange = name => event => {
    this.setState(
      {
        [name]: event.target.value
      },
      () => {
        // Using the callback to make sure that the child state has been updated
        //before updating the parent state
        this.props.isEnabled(this.state.name, this.state.lastname, this.state.email)
      }
    )
  }

  handleTabChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  render() {
    const { classes, theme } = this.props
    const { name, lastname, email, password, newpassword, confirmpassword } = this.state
    const errors = this.validate(name, lastname, email)
    const pwdErrors = this.validatePassword(password, newpassword, confirmpassword)

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="secondary"
            fullWidth
          >
            <Tab className={classes.tabLabel} label="Perfil" icon={<AccountCircle />} />
            <Tab className={classes.tabLabel} label="Actualizar Contraseña" icon={<Security />} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <form className={classes.container} autoComplete="off">
              <Grid container>
                <Grid item sm={6} xs={12}>
                  <TextField
                    id="name"
                    label="Ingrese su Nombre"
                    className={classes.textField}
                    error={errors.name}
                    value={name}
                    onChange={this.handleChange('name')}
                    fullWidth
                    required
                    margin="normal"
                  />
                  {errors.name && <FormHelperText error>Campo Obligatorio</FormHelperText>}
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    id="lastname"
                    label="Ingrese su Apellido"
                    className={classes.textField}
                    error={errors.lastname}
                    value={lastname}
                    onChange={this.handleChange('lastname')}
                    fullWidth
                    required
                    margin="normal"
                  />
                  {errors.lastname && <FormHelperText error>Campo Obligatorio</FormHelperText>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    label="Ingrese su dirección de correo electrónico"
                    className={classes.textField}
                    error={errors.email}
                    value={email}
                    onChange={this.handleChange('email')}
                    fullWidth
                    required
                    margin="normal"
                  />
                  {errors.email && <FormHelperText error>Campo Obligatorio</FormHelperText>}
                </Grid>
              </Grid>
            </form>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <form className={classes.container} autoComplete="off">
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    label="Contraseña Actual"
                    className={classes.textField}
                    error={pwdErrors.password}
                    value={password}
                    type="password"
                    onChange={this.handleChange('password')}
                    fullWidth
                    required
                    margin="normal"
                  />
                  {pwdErrors.password && <FormHelperText error>Campo Obligatorio</FormHelperText>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="newpassword"
                    label="Nueva Contraseña"
                    className={classes.textField}
                    error={pwdErrors.newPassword}
                    value={newpassword}
                    type="password"
                    onChange={this.handleChange('newpassword')}
                    fullWidth
                    required
                    margin="normal"
                  />
                  {pwdErrors.newPassword && (
                    <FormHelperText error>Campo Obligatorio</FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="confirmpassword"
                    label="Confirme Nueva Contraseña"
                    className={classes.textField}
                    error={pwdErrors.confirmPassword}
                    value={confirmpassword}
                    type="password"
                    onChange={this.handleChange('confirmpassword')}
                    fullWidth
                    required
                    margin="normal"
                  />
                  {pwdErrors.confirmPassword && (
                    <FormHelperText error>Campo Obligatorio</FormHelperText>
                  )}
                </Grid>
              </Grid>
            </form>
          </TabContainer>
        </SwipeableViews>
      </div>
    )
  }
}

ProfileTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(ProfileTabs)
