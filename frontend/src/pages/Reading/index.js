import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {  FiArrowLeft } from 'react-icons/fi';
import moment from 'moment';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.png';


export default function Reading() {
  const [ readings, setReadings ] = useState([]);
  const [ description, setDescription] = useState("");

  const location = useLocation();

  useEffect(() => {
    async function findReadings(){
      await api.get(`readings/products/${location.product_id}`).then( response => {
        setReadings(response.data);
      });
    }
    
    console.log(location.description)
    setDescription(location.description);
    findReadings();
  },[location, location.description, location.product_id]);

  
  return (
    <div className="reading-container">
      <header>
        <img src={logoImg} alt="Logo" />
        <h1>Consultas do produto</h1>

        <Link className="back-link" to="/">
          <FiArrowLeft size={16} color="#00D1B2"/>
          Voltar para Lista
        </Link>
      </header>
       
      <div className="content">
        <div className="header-content">
          <strong>{description}</strong>
          <div className="group-text">
            <strong>Total consultas: </strong>
            <p>{readings.length}</p>
          </div>
        </div>
        <ul>  
          { readings.map(reading => (
            <li key={reading.id}>
              <div className="group-text">
                <strong>Device Id: </strong>
                <p>{reading.device}</p>
              </div>
              <div className="group-text">
                <strong>Data: </strong>
                <p>{moment(reading.date).format('DD/MM/YYYY hh:mm:ss')}</p>
              </div>
              <div className="group-text">
                <strong>QR Code: </strong>
                <p>{reading.barcode.id}</p>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}