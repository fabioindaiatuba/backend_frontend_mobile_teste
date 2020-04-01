import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiArrowRight } from 'react-icons/fi';
import QrCode from 'qrcode.react';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.png';


export default function Home() {
  const [ products, setProducts ] = useState([]); 

  useEffect(() => {
    api.get('products').then( response => {
      setProducts(response.data);
    })
  },[]);

  async function handleDeleteProduct(id) {
    try {
      await api.delete(`products/${id}`);
      setProducts(products.filter(product => product.id !== id)); 
    } catch(err) {
      alert("Erro ao deletar produto, tente novamente.");
    }
  }

  return (
    <div className="home-container">
      <header>
        <img src={logoImg} alt="Logo" />
        <h1>Lista de Produtos</h1>

        <Link className="button" to="/product/new">Novo produto</Link>
      </header>

      <ul>  
        { products.map( product => (
          <li key={product.id }>
            <div className="content-product">
              <strong>DESCRIÇÃO: </strong>
              <p>{product.description}</p>
              <Link 
                className="back-link" 
                to={{
                  pathname: `/readings`, 
                  description: product.description,
                  product_id: product.id,
                }}
              
              >
                Consultas
                <FiArrowRight size={16} color="#00D1B2"/>
              </Link>
            </div>
            <ul>
              { product.barcodes.map( barcode => (
                <li key={barcode.id}>
                  <QrCode value={barcode.value} size={80} fgColor="#4a4a4a" />
                  <p>{barcode.value}</p>
                </li>
              ))}
            </ul>

            <button type="button" onClick={() => handleDeleteProduct(product.id)}>
              <FiTrash2 size={20} color="#666" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}