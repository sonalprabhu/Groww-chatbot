/**
 * AddCategoryForm component is used for adding a new category to database
 */
import React, { useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import { lightGreen } from "@material-ui/core/colors";
import Snackbar from "@material-ui/core/Snackbar";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import MuiAlert from "@material-ui/lab/Alert";
import { getAllNodes,addCategory } from "../queries/queries";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
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
        thickness={5}
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

export default function AddCategoryForm() {
  const [subCategoryList, setSubCategoryList] = useState([""]);
  const [allNodes, setAllNodes] = useState([]);
  const [isLeafNode, setIsLeafNode] = useState(true);
  const [categoryData, setCategoryData] = useState({
    categoryParent: "",
    categoryName: "",
    subCategories: [],
  });
  const [isSubmitting,setSubmitting] = useState(false);
  const [snackSuccessOpen, setSnackSuccess] = useState(false);
  const [snackFailOpen, setSnackFail] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    getAllNodes()
      .then((data) => setAllNodes(data.nodes))
      .catch((err) => {
        const auth = err.response.data.auth;
        if(auth === false){
          history.push("/admin_login");
        }
        else{
          setAllNodes([]);
        }
      });
  }, [allNodes.length,history]);

  const addSubCategory = () => {
    let newSubCategoryList = subCategoryList;
    newSubCategoryList = newSubCategoryList.concat([""]);
    setSubCategoryList(newSubCategoryList);
  };

  const removeSubCategory = (e) => {
    if (subCategoryList.length === 1) {
      alert("There should be at least a single subcategory");
    } else {
      const idx = parseInt(e.currentTarget.value);
      let newSubCategoryList = subCategoryList;
      newSubCategoryList = [
        ...subCategoryList.slice(0, idx),
        ...subCategoryList.slice(idx + 1),
      ];
      setSubCategoryList(newSubCategoryList);
      let newCategoryData = categoryData;
      newCategoryData.subCategories = newSubCategoryList;
      setCategoryData(newCategoryData);
    }
  };

  const handleChange = (e) => {
    let newCategoryData = categoryData;
    newCategoryData[e.target.name] = e.target.value;
    setCategoryData(newCategoryData);
  };

  const handleSubCategoryChange = (e) => {
    setSubCategoryList([
          ...subCategoryList.slice(0,parseInt(e.target.name))
      ].concat([e.target.value])
      .concat([...subCategoryList.slice(parseInt(e.target.name)+1,subCategoryList.length)
    ]));
    setCategoryData({
        ...categoryData,
        subCategories:[
                        ...subCategoryList.slice(0,parseInt(e.target.name))
                    ].concat([e.target.value])
                    .concat([...subCategoryList.slice(parseInt(e.target.name)+1,subCategoryList.length)
                  ]) 
      });
  };

  const handleLeafNodeChange = (_) => {
    setIsLeafNode(!isLeafNode);
  };

  const handleSnackSuccessClose = () => {
    setSnackSuccess(false);
  };

  const handleSnackFailClose = () => {
    setSnackFail(false);
  };

  const submitForm = (e) => {
    e.preventDefault();
    let isCategoryDataCorrect = true;
    let newCategoryData = categoryData;
    if (isLeafNode) {
      newCategoryData.subCategories = [];
    } else {
      newCategoryData.subCategories = subCategoryList.filter(
        (s) => s !== ""
      );
    }
    setCategoryData(newCategoryData);
    const commonNodes = allNodes.filter(
      (n) => n === categoryData.categoryName
    );
    if (commonNodes.length > 0) {
        isCategoryDataCorrect = false;
        setSnackFail(true);
        setErrMessage("Parent node value already present in existing categories");
    } else {
      const matchingParentNodes = categoryData.subCategories.filter(
        (c) => (c === categoryData.categoryName || allNodes.indexOf(c) !== -1)
      );
      if (matchingParentNodes.length > 0) {
        isCategoryDataCorrect = false;
        setSnackFail(true);
        setErrMessage("Child nodes should not be same as parent node");
      } else {
        if (categoryData.subCategories.length>0 && [...new Set(categoryData.subCategories)].length !== categoryData.subCategories.length) {
            isCategoryDataCorrect = false;
            setSnackFail(true);
            setErrMessage("Child nodes should be unique");
        }
      }
    }
    if (isCategoryDataCorrect === true) {
      //add the category
      let data = categoryData;
      if(isLeafNode){
        data.subCategories = [];
      }
      else{
        data.subCategories = subCategoryList.filter(
          (s) => s !== ""
        );
      }
      setSubmitting(true);
      addCategory(data)
      .then((data)=>{
          if(Object.keys(data).length === 2){
              setSnackSuccess(true);
              setSubmitting(false);
              setAllNodes([...allNodes,categoryData.categoryParent].concat([...categoryData.subCategories]));
          }
          else{
              setSubmitting(false);
              alert('Category cannot be added.Try again after sometime');
          }
      }).catch((err)=>{
          if(err.response.data['auth'] !== undefined && err.response.data['auth']!==null && err.response.data['auth'] === false){
            setSubmitting(false);  
            alert('You are not logged in');
              window.location.reload();
          }
          else if(err.response.data['error'] !== undefined && err.response.data['error']){
              setSubmitting(false);
              setSnackFail(true);
              setErrMessage(err.response.data['error']);
          }
          else{
              setSubmitting(false);
              alert('Some unknown error occured');
          }
      });
    }
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
          Category successfully added
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
      <div className="categoryform container">
        <div className="container category-form-header">
          <span className="h4">
            <img
              src="groww_logo.png"
              alt=""
              style={{ marginRight: "10px", padding: "0.5%" }}
            />
            Add a new category
          </span>
        </div>
        <form className="form add-category-form" onSubmit={submitForm}>
          <div className="form-group">
            <label htmlFor="categoryParent" className="h6">
              Parent Node<span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="form-control"
              id="categoryParent"
              name="categoryParent"
              onChange={handleChange}
              required={true}
            >
              <option value="">--Select--</option>
              {allNodes.map((node, idx) => {
                return (
                  <option value={node} key={idx}>
                    {node}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="categoryName" className="h6">
              Category Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="isLeafNode" className="h6">
              Is leaf node<span style={{ color: "red" }}>*</span>
            </label>
            <Switch
              checked={isLeafNode}
              onChange={handleLeafNodeChange}
              color="primary"
              name="isLeafChecked"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
          {!isLeafNode ? (
            <>
              <div className="form-group">
                {subCategoryList.map((c, idx) => {
                  return (
                    <React.Fragment key={idx}>
                      <label htmlFor={idx} className="h6">
                        Sub Category {idx + 1}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        key={idx}
                        name={idx}
                        value={c}
                        className="form-control"
                        style={{ display: "inline-block", width: "92%" }}
                        onChange={handleSubCategoryChange}
                        required
                      />
                      <IconButton
                        value={idx}
                        onClick={removeSubCategory}
                        style={{ display: "inline-block" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </React.Fragment>
                  );
                })}
              </div>
              <ColorButton
                variant="contained"
                onClick={addSubCategory}
                startIcon={<AddIcon />}
              >
                Add Subcategory
              </ColorButton>
            </>
          ) : (
            <></>
          )}
          <ColorButton
            type="submit"
            variant="contained"
            startIcon={
              isSubmitting === true ? <CircularIndeterminate /> : <></>
            }
            disabled={isSubmitting}
            style={{ float: "right" }}
          >
            Submit
          </ColorButton>
        </form>
      </div>
    </React.Fragment>
  );
}
