import {
  getAllCategoriesPaths,
  getDynamicFuncs,
  addFaq,
} from "../queries/queries";
import {useState,useEffect} from 'react';

function AddFaqForm() {
  const [faqData, setFaqData] = useState({
    faqQuestionText: [""],
    faqCategoryPath: [""],
    faqAnswer: [
      {
        faqAnswerText: [],
        faqIsDynamic: true,
        faqDynamicKey: "",
      },
    ],
  });
  const [categoriesPaths, setCategoriesPaths] = useState([]);
  const [dynamicKeys, setDynamicKeys] = useState([]);

  useEffect(() => {
    getAllCategoriesPaths().then((data) =>
      setCategoriesPaths(data["allCategoriesPaths"])
    );
    getDynamicFuncs().then((data) => setDynamicKeys(data["dynamicFuncList"]));
  }, []);

  const [isDisabled, setIsDisabled] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    addFaq(faqData).then((data) => {
      if (Object.keys(data).length === 2) {
        alert("Faq successfully saved");
      } else {
        alert("Faq was not saved");
      }
    }).catch((err)=>{
      if(err.response.data.auth === false){
        alert('You are not logged in');
        window.location.reload();
      }
      else{
        console.log(err);
      }
    });
  };
  const handleChange = (e) => {
    let newFaqData = faqData;
    const targetName = e.target.name;
    const targetValue = e.target.value;
    if (targetName === "faqQuestionText") {
      newFaqData[targetName][0] = targetValue;
    } else if (targetName === "faqCategoryPath") {
      newFaqData[targetName] = targetValue.split(",");
    } else if (targetName === "faqAnswerText") {
      newFaqData["faqAnswer"][0][targetName][0] = targetValue;
    } else if (targetName === "faqIsDynamic") {
      newFaqData["faqAnswer"][0][targetName] =
        targetValue === "Yes" ? true : false;
      if (targetValue === "Yes") {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    } else {
      newFaqData["faqAnswer"][0][targetName] = targetValue;
    }
    setFaqData(newFaqData);
  };
  return (
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
          <label htmlFor="faqQuestionText" className="h6">
            Question Text<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="faqQuestionText"
            name="faqQuestionText"
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
          <select
            id="faqIsDynamic"
            name="faqIsDynamic"
            className="form-control"
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="faqAnswerText" className="h6">
            Answer Text<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className="form-control"
            type="text"
            id="faqAnswerText"
            name="faqAnswerText"
            disabled={isDisabled}
            onChange={handleChange}
            required={!isDisabled}
          />
        </div>
        <div className="form-group">
          <label htmlFor="faqDynamicKey" className="h6">
            Dynamic function<span style={{ color: "red" }}>*</span>
          </label>
          <select
            className="form-control"
            id="faqDynamicKey"
            name="faqDynamicKey"
            disabled={!isDisabled}
            onChange={handleChange}
            required={isDisabled}
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
        <button type="Submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default AddFaqForm;