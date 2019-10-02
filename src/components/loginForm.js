import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux';
import { signIn } from '../actions/actions';

const useStyles = makeStyles(theme => ({
    Login: {
        textAlign: "center",
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

function LoginForm(props) {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(0);
  
    return(
        <div>
            <Typography
            component="h2"
            variant="h5"
            color="inherit"
            className={classes.Login}>
                Вход
            </Typography> 
            {/* <Box display="flex" justifyContent="space-between">
            <Typography
            component="h2"
            variant="h5"
            color="inherit"
            className={classes.Login}>
                Вход
            </Typography> 
            <Button
            color="primary"
            onClick={() => {
                window.location.href = "https://wondersourcing.ru/users/sign_in";
            }}
            >
            или регистрация
            </Button>
            </Box> */}
            <TextField
                margin="normal"
                required
                fullWidth
                label="Адрес электронной почты"
                autoComplete="email"
                autoFocus
                name="user[email]"
                id="user_email"
                type="email"
                value={email}
                onChange={e => {
                    setEmail(e.target.value)
                }}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="user[password]"
                label="Пароль"
                type="password"
                id="user_password"
                autoComplete="current-password"
                onChange={e => {
                    setPassword(e.target.value)
                }}
            />
            <FormControlLabel
            control={
                <Checkbox
                checked={rememberMe ? true : false}
                name="user[remember_me]"
                value="remember"
                color="primary"
                id="user_remember_me"
                onChange={() => {
                    setRememberMe(!rememberMe)
                }}
                />
            }
            label="Запомнить меня на этом компьютере"
            />
            <Button
            type="submit"
            name="commit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={props.isFetching}
            onClick={e => {
                e.preventDefault();
                console.log("Данные");
                console.table({email: email, password: password});
                props.signIn(email, password);
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
            <Box display="flex" justifyContent="center">
            <Button
                color="primary"
                onClick={() => {
                console.log("TODO forgot pass");
                }}
            >
                Восстановить пароль
            </Button>
            </Box>
    
        </div>
    )
}
const mapStateToProps = (state) => {
    const { userData, isFetching, error } = state.LoginReducer;
    return {
        userData,
        isFetching,
        error
    }
}
const mapDispatchToProps = (dispatch) => ({
    signIn: (email, password) => dispatch(signIn(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);