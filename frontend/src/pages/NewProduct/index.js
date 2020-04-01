import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiTrash2, FiPlus } from 'react-icons/fi';
import QrCode from 'qrcode.react';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.png';

export default function NewProduct() {
  const [ description, setDescription ] = useState("");
  const [ value, setValue ] = useState("");
  const [ barcodes, setBarcodes ] = useState([]);

  console.log(barcodes.length);

  const history = useHistory();

  async function handleAddBarcode(){
    const response = await api.get(`barcodes?value=${value}`);

    if(response.data) {
      alert("Código de barras já cadastrado no sistema.");
    } else {
      setBarcodes([...barcodes, {value: value}])
      setValue("");
    } 
  }

  async function handleSalvarProduct(e){
    e.preventDefault();
    await api.post('products', { description, barcodes });
    history.push('/');
  }
  
  function handleDeleteBarcode(value){
    setBarcodes(barcodes.filter(barcode => barcode.value !== value));
  }

  return (
    <div className="new-product-container">
      <header>
        <img src={logoImg} alt="Logo" />
        <h1>Novo Produto</h1>

        <Link className="back-link" to="/">
          <FiArrowLeft size={16} color="#00D1B2"/>
          Voltar para Lista
        </Link>
      </header>

      <form onSubmit={handleSalvarProduct}>
        <input 
          placeholder="Descrição do produto"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <ul>
          { barcodes.map(barcode => (
            <li key={barcode.value} className="list-qrcode">
              <QrCode value={barcode.value} size={64} fgColor="#4a4a4a" />
              <p>{barcode.value}</p>
              <button type="button" onClick={() => handleDeleteBarcode(barcode.value) }> 
                <FiTrash2 size={18} color="#4a4a4a"/>
              </button>
            </li>
          ))}
          
          

          <div className="list-qrcode">
            <QrCode value={value} size={64} fgColor="#4a4a4a" />
            <input 
              placeholder="Valor QRCode"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <button type="button" onClick={handleAddBarcode}> 
              <FiPlus size={18} color="#00D1B2"/>
            </button>
          </div>
        </ul>
        <button className="button" type="submit" disabled={barcodes.length === 0 || value !== ""}>Salvar</button>
      </form>
    </div>
  )
}