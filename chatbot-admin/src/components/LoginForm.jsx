import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import MuiAlert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { loginAdmin } from "../queries/queries";
import { lightGreen } from "@material-ui/core/colors";
import {useAuthDispatch} from '../Context/context';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    float: "right",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  progress: {
    color: "black",
  },
}));

function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        className={classes.progress}
        size="1em"
        thickness={3}
      />
    </div>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(lightGreen[500]),
    backgroundColor: lightGreen[500],
    "&:hover": {
      backgroundColor: lightGreen[700],
    },
  },
}))(Button);

function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");
  const [snackSuccessOpen,setSnackSuccess] = useState(false);
  const [snackFailOpen,setSnackFail] = useState(false);
  let history = useHistory();
  const dispatch = useAuthDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    dispatch({ type: 'REQUEST_LOGIN' })
    loginAdmin({ userName, userPass })
      .then((_) => {
        setSnackSuccess(true);
        setIsSubmitting(false);
        dispatch({ type: 'LOGIN_SUCCESS', payload: Cookies.get('userName') })
        history.push("/add_faq");
      })
      .catch((err) => {
        setSnackFail(true);
        dispatch({ type: 'LOGIN_ERROR', error: err });
        setIsSubmitting(false);
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "userName") {
      setUserName(e.target.value);
    } else {
      setUserPass(e.target.value);
    }
  };

  const handleSnackSuccessClose = () => {
    setSnackSuccess(false);
  };

  const handleSnackFailClose = () => {
    setSnackFail(false);
  };

  return (
    <React.Fragment>
      <Snackbar
        open={snackSuccessOpen}
        autoHideDuration={1000}
        onClose={handleSnackSuccessClose}
      >
        <Alert onClose={handleSnackSuccessClose} severity="success">
          Login successful
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackFailOpen}
        autoHideDuration={1000}
        onClose={handleSnackFailClose}
      >
        <Alert onClose={handleSnackFailClose} severity="error">
          Invalid username or password
        </Alert>
      </Snackbar>
      <div className="loginform container">
        <div className="container login-form-header">
          <span className="h4">
            <img
              src="groww_logo.png"
              alt=""
              style={{ marginRight: "10px", padding: "0.5%" }}
            />
            Groww Admin Login
          </span>
        </div>
        <form className="form login-form" onSubmit={submitForm}>
          <div className="form-group">
            <label htmlFor="userName" className="h6">
              Admin User Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userPass" className="h6">
              Admin User Password<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="password"
              id="userPass"
              name="userPass"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <ColorButton
            type="submit"
            variant="contained"
            startIcon={
              isSubmitting === true ? <CircularIndeterminate /> : <VpnKeyIcon />
            }
            disabled={isSubmitting}
          >
            Login
          </ColorButton>
        </form>
      </div>
    </React.Fragment>
  );
}
export default LoginForm;
