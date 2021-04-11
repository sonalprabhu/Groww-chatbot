/**
 * AddFaqForm component is used for adding a new faq to database
 */
import {
  getAllCategoriesPaths,
  getDynamicFuncs,
  addFaq,
} from "../queries/queries";
import {useHistory} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles,makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { lightGreen } from "@material-ui/core/colors";
import Switch from "@material-ui/core/Switch";
import React,{useState,useEffect} from 'react';
import MenuAppBar from "./MenuAppBar";

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

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(lightGreen[500]),
    backgroundColor: lightGreen[500],
    "&:hover": {
      backgroundColor: lightGreen[700],
    },
  },
}))(Button);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AddFaqForm() {
  const [snackSuccessOpen, setSnackSuccess] = useState(false);
  const [snackFailOpen, setSnackFail] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [faqData, setFaqData] = useState({
    faqQuestion: "",
    faqAnswer: [],
    faqDynamicKey: "",
    faqCategoryPath: [""],
    faqIsDynamic: false,
    faqSameCategory: false
  });
  const [faqAnswerList,setFaqAnswerList] = useState([{faqAnswerText: "",faqAnswerType: ""}]);
  const [categoriesPaths, setCategoriesPaths] = useState([]);
  const [dynamicKeys, setDynamicKeys] = useState([]);
  const [isFaqDynamic, setFaqDynamic] = useState(false);
  const [isSameCategory,setSameCategory] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getAllCategoriesPaths().then((data) =>
      setCategoriesPaths(data["allCategoriesPaths"])
    ).catch((err)=>history.push("/admin_login"));
    getDynamicFuncs().then((data) => setDynamicKeys(data["dynamicFuncList"])).catch((err)=>history.push("/admin_login"));
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let newFaqData = faqData;
    if(faqData.faqIsDynamic){
      newFaqData.faqAnswer = [];
    }
    setFaqData(newFaqData);
    addFaq(faqData).then((_) => {
        setIsSubmitting(false);
        setSnackSuccess(true);
    }).catch((err)=>{
      setIsSubmitting(false);
      if(err.response.data['auth'] !== undefined && err.response.data['auth']!==null && err.response.data['auth'] === false){
        alert('You are not logged in');
        window.location.reload();
      }
      else if(err.response.data['error'] !== undefined && err.response.data['error']){
          setSnackFail(true);
          setErrMessage(err.response.data['error']);
      }
      else{
          alert('Some unknown error occured');
      }
    });
  };
  const handleFaqDynamic = (e) => {
    setFaqDynamic(!isFaqDynamic);
    setFaqData({...faqData,faqIsDynamic: e.target.checked});
  };
  const handleFaqSameCategory = (e) => {
    setSameCategory(!isSameCategory);
    setFaqData({...faqData,faqSameCategory: e.target.checked});
  }
  const addFaqAnswer = () => {
    setFaqAnswerList(faqAnswerList.concat([{faqAnswerText: "",faqAnswerType: ""}]));
    setFaqData({...faqData,faqAnswer: faqAnswerList.concat([{faqAnswerText: "",faqAnswerType: ""}])});
  }
  const removefaqAnswer = (e) => {
    if(faqAnswerList.length === 1){
      alert("There should be at least one answer data");
    }
    else{
      const idx = parseInt(e.currentTarget.value);
      setFaqAnswerList([...faqAnswerList.slice(0,idx),...faqAnswerList.slice(idx+1,faqAnswerList.length)]);
      setFaqData({...faqData,faqAnswer: [...faqAnswerList.slice(0,idx),...faqAnswerList.slice(idx+1,faqAnswerList.length)]});
    }
  }
  const handleAnswerChange = (e) => {
    const keyAndIdx = e.target.name.split("_");
    const key=keyAndIdx[0];
    const idx = parseInt(keyAndIdx[1]);
    let modifiedAnswer = faqAnswerList[idx];
    modifiedAnswer[key] = e.target.value;
    setFaqAnswerList([...faqAnswerList.slice(0,idx)].concat([modifiedAnswer]).concat([...faqAnswerList.slice(idx+1,faqAnswerList.length)]));
    setFaqData({...faqData,faqAnswer: faqAnswerList});
  }

  const handleSnackSuccessClose = () => {
    setSnackSuccess(false);
  };
  const handleSnackFailClose = () => {
    setSnackFail(false);
  };

  const handleChange = (e) => {
    if(e.target.name !== 'faqCategoryPath')
      setFaqData({...faqData,[e.target.name]: e.target.value});
    else
      setFaqData({...faqData,[e.target.name]: e.target.value.split(",")});
  };

  return (
    <React.Fragment>
      <MenuAppBar/>
      <Snackbar
        open={snackSuccessOpen}
        autoHideDuration={5000}
        onClose={handleSnackSuccessClose}
      >
        <Alert onClose={handleSnackSuccessClose} severity="success">
          Faq successfully added
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackFailOpen}
        autoHideDuration={5000}
        onClose={handleSnackFailClose}
      >
        <Alert onClose={handleSnackFailClose} severity="error">
          {errMessage}
        </Alert>
      </Snackbar>
    <div className="faqform container">
      <div className="container chatbot-form-header">
        <span className="h4">
          <img
            src="groww_logo.png"
            alt=""
            style={{ marginRight: "10px", padding: "0.5%" }}
          />
          Add a new FAQ
        </span>
      </div>
      <form className="form add-faq-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="faqQuestion" className="h6">
            Question Text<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="faqQuestion"
            name="faqQuestion"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="faqCategoryPath" className="h6">
            Question Category<span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="faqCategoryPath"
            id="faqCategoryPath"
            className="form-control"
            onChange={handleChange}
            required
          >
            <option value="">--Select--</option>
            {categoriesPaths.map((category, idx) => {
              return (
                <option key={idx} value={category}>
                  {category.join("->")}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="faqIsDynamic" className="h6">
            Is answer dynamic<span style={{ color: "red" }}>*</span>
          </label>
          <Switch
              checked={isFaqDynamic}
              onChange={handleFaqDynamic}
              color="primary"
              name="faqIsDynamic"
              inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
        {!isFaqDynamic ? (
          <>
            <div className="form-group">
              <label htmlFor="faqAnswerText" className="h6">
                Answer Text<span style={{ color: "red" }}>*</span>
              </label>
              {faqAnswerList.map((answer,idx)=>{
                return (
                  <React.Fragment key={idx}>
                    <div className="form-row form-group" key={idx}>
                      <div className="col" style={{ display: "inline-block" }}>
                        <input type="text" name={`faqAnswerText_${idx}`} value={`${answer.faqAnswerText}`} onChange={handleAnswerChange} className="form-control form-control-sm" placeholder={`Answer text ${idx+1}`} required={true}/>
                      </div>
                      <div className="col" style={{ display: "inline-block" }}>
                        <select name={`faqAnswerType_${idx}`} value={`${answer.faqAnswerType}`} onChange={handleAnswerChange} className="form-control form-control-sm" required={true}>
                          <option value="">--Select answer type--</option>
                          <option value="text">text</option>
                          <option value="link">link</option>
                        </select>
                      </div>
                      <div style={{display: "inline-block"}}>
                        <IconButton
                            value={idx}
                            size="small"
                            onClick={addFaqAnswer}
                            style={{ display: "inline-block" }}
                          >
                            <AddIcon/>
                          </IconButton>
                          <IconButton
                            value={idx}
                            size="small"
                            onClick={removefaqAnswer}
                            style={{ display: "inline-block" }}
                          >
                            <DeleteIcon/>
                          </IconButton>
                      </div>
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
          </>
        ):(
          <>
            <div className="form-group">
              <label htmlFor="faqDynamicKey" className="h6">
                Dynamic function<span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="form-control"
                id="faqDynamicKey"
                name="faqDynamicKey"
                onChange={handleChange}
                required={true}
              >
                <option value="">--Select--</option>
                {dynamicKeys.map((dynamicKey, idx) => {
                  return (
                    <option key={idx} value={dynamicKey}>
                      {dynamicKey}
                    </option>
                  );
                })}
              </select>
            </div>
          </>
        )}
        <div className="form-group">
          <label htmlFor="faqSameCategory" className="h6">
            Do you want the faq to be added with existing faqs of the above selected category<span style={{ color: "red" }}>*</span>
          </label>
          <Switch
              checked={isSameCategory}
              onChange={handleFaqSameCategory}
              color="primary"
              name="faqSameCategory"
              inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
        <ColorButton
            type="submit"
            variant="contained"
            startIcon={
              isSubmitting === true ? <CircularIndeterminate /> : <></>
            }
            disabled={isSubmitting}
          >
            Submit
          </ColorButton>
        {/* <button type="Submit" className="btn btn-primary">
          Submit
        </button> */}
      </form>
    </div>
    </React.Fragment>
  );
}
export default AddFaqForm;