import React, { useState } from "react";
import axios from "axios";
import "./PredictionForm.css";

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    Age: "",
    SystolicBP: "",
    DiastolicBP: "",
    BloodSugar: "",
    BodyTemp: "",
    HeartRate: "",
    MaternityMonth: ""
  });

  const [result, setResult] = useState(null);
  const [model, setModel] = useState("logistic"); // default model

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `https://maternity-ml-backend-2.onrender.com/predict/${model}`; // replace with deployed backend
      const response = await axios.post(url, {
        ...formData,
        Age: parseFloat(formData.Age),
        SystolicBP: parseFloat(formData.SystolicBP),
        DiastolicBP: parseFloat(formData.DiastolicBP),
        BloodSugar: parseFloat(formData.BloodSugar),
        BodyTemp: parseFloat(formData.BodyTemp),
        HeartRate: parseFloat(formData.HeartRate),
        MaternityMonth: parseInt(formData.MaternityMonth)
      });
      setResult(response.data.RiskLevel);
    } catch (error) {
      console.error(error);
      alert("Error connecting to API.");
    }
  };

  return (
    <div className="form-container">
      <h2>Maternity Risk Prediction</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key}:</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
              step="any"
            />
          </div>
        ))}

        <div>
          <label>Select Model:</label>
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="logistic">Logistic Regression</option>
            <option value="tree">Decision Tree</option>
          </select>
        </div>

        <button type="submit">Predict Risk</button>
      </form>

      {result !== null && (
        <div className="result-card">
          Predicted Risk Level: <strong>{result === 0 ? "Low Risk" : result === 1 ? "Medium Risk" : "High Risk"}</strong>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
