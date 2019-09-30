import React from 'react';
import './App.css';
import Logo from './ws-logo-bw.png';
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles(theme => ({
  toolbar: {
    // borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitleWonder: {
    fontWeight: 500
  },
  toolbarLink: {
    padding: theme.spacing(1),
    textTransform: 'uppercase'
  },
  toolbarTitle: {
    borderRight: `2px solid ${theme.palette.grey[700]}`,
    paddingRight: theme.spacing(3)
  },
  logo: {
    marginRight: theme.spacing(1)
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  menuItemContainer: {
    marginLeft: theme.spacing(3),
    padding: theme.spacing(1)
  },
  menuItemContainerActive: {},
  menuItem: {
    textTransform: 'uppercase',
    borderBottom: '5px solid transparent',
    paddingBottom: theme.spacing(1)
  },
  menuItemActive: {
    fontWeight: 500,
    borderBottom: `5px solid ${theme.palette.grey[700]}`
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))


function App() {
  return (
    <div className="App">
      <Title />
      <Login />
    </div>
  );
}

function Title() {
  const classes = useStyles();

  return(
    <Box flexGrow={1} display="flex" alignItems="center">
      <Link>
        <Avatar className={classes.logo} src={Logo} />
      </Link>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        className={classes.toolbarTitleWonder}
        noWrap
      >
        Wonder
      </Typography>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        noWrap
        className={classes.toolbarTitle}
      >
        Sourcing
      </Typography>
    </Box>
  )
}

function Login() {
  const classes = useStyles();

  return(
    <div>
      <Button
        type="submit"
        name="commit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        // disabled={fetching}
        onClick={e => {
          e.preventDefault();
          console.log("Это кнопка входа")
          // requestBegin({
          //   route: Routes.new_user_session_path(),
          //   target: 'signin',
          //   method: 'POST',
          //   params: {
          //     authenticity_token: authToken,
          //     utf8: '✓',
          //     user: {
          //       email,
          //       password,
          //       remember_me: rememberMe
          //     },
          //     commit: 'Log in'
          //   }
          // })
        }}
      >
        Войти
      </Button>

    </div>
  )
}

export default App;
