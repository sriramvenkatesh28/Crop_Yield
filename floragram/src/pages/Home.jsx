import React, { useState, useEffect } from 'react'
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"
import Dropdown from "../components/Dropdown"
import axios from '../axios';
import '../App.css';
import { Button } from '@mui/material';

const Home = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCityData, setSelectedCityData] = useState([]);
  const [results, setResults] = useState([]);

  const getSoilData = async () => {
    const docs = collection(db, "soil_data");

    const citiesQuerySnapshot = await getDocs(docs);
    const citiesArray = citiesQuerySnapshot.docs.map(doc => doc.id);
    setCities(citiesArray);
  }

  const getSelectedCitySoilData = async (city) => {
    const docRef = doc(db, "soil_data", city);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setSelectedCityData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getSoilData();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      getSelectedCitySoilData(selectedCity);
    }
  }, [selectedCity]);

  const handleCitySelection = (event) => {
    setSelectedCity(event.target.value);
  };

  const sendToServer = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("/api", selectedCityData);
      console.log(response.data);
      setResults(response.data)
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="content">
      <div className='form__container'>
      <h1 className='form__title'>Crop Prediction</h1>
        <form onSubmit={sendToServer}>
          <div className='dropdown__container'>
            <Dropdown label="City" options={cities} id="nm" value={selectedCity} onChange={handleCitySelection} />
            <Button variant="contained" type='submit'>Send to Server</Button>
          </div>
        </form>
        <div>
          <div className='content__container'>
            <p>Nitrogen: <span>{selectedCityData.N}</span></p>
            <p>Phosphorus: <span>{selectedCityData.P}</span></p>
            <p>Humidity: <span>{selectedCityData.humidity}</span></p>
            <p>Potassium: <span>{selectedCityData.K}</span></p>
            <p>Temperature: <span>{selectedCityData.temperature}</span></p>
            <p>pH: <span>{selectedCityData.ph}</span></p>
            <p>Rainfall: <span>{selectedCityData.rainfall}</span></p>
          </div>
        </div>
        <div className='content__container'>
          <p>Result: {JSON.stringify(results, undefined, 2)}</p>
        </div>
      </div>
    </div>
  )
}

export default Home
