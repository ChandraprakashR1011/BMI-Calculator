import { useState } from 'react';
import './App.css';

function App() {
  const[height, setHeight] = useState("")
  const[weight, setWeight] = useState("")
  const[bmi, setBmi] = useState(null)
  const[bmiStatus, setBmiStatus] = useState("");
  const[error, setError] = useState("");

  const calculateBmi=()=>{
    const isValidHeight = /^\d+$/.test(height) ;
    const isValidWeight = /^\d+$/.test(weight) ;
    if(isValidHeight && isValidWeight){
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));

      if(bmiValue < 18.5){
        setBmiStatus("Underweight");
      }else if(bmiValue >= 18.5 && bmiValue < 24.9){
        setBmiStatus("Normal weight");
      }else if(bmiValue >= 25 && bmiValue < 29.9){
        setBmiStatus("Overweight");
      }else{
        setBmiStatus("Obesity");
      } 
      setError("");
    }else{
      setBmi(null);
      setBmiStatus("");
      setError("Please enter valid height and weight in numbers.");
    }
  };
  
  return (
    <>
      <div className='bmi-calculator'>
        <div className='box'></div>
        <div className='data'>
            <h1>BMI Calculator</h1>
            {error && <p className='error'>{error}</p>}
            <div className='input-container'>
                <label htmlFor="height">Height (cm)</label>
                <input type="number" id='height'value={height} onChange={(e) => setHeight(e.target.value)} placeholder='Enter your height in cm' />
            </div>
            <div className='input-container'>
                <label htmlFor="weight">Weight (kg)</label>
                <input type="number" id='weight' value={weight} onChange={(e) => setWeight(e.target.value)} placeholder='Enter your weight in kg' />
            </div>
            <button onClick={calculateBmi}>Calculate BMI</button>
            <button onClick={() => {setHeight(""); setWeight(""); setBmi(null); setBmiStatus(""); setError("");}}>Reset</button>
            {bmi && (
              <div className='result'>
                <h2>Your BMI: {bmi}</h2>
                <p>Status: {bmiStatus}</p>
              </div>
            )}
        </div>
      </div>

    </>
  )
}

export default App
