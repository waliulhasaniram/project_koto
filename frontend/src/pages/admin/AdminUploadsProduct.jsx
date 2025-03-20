import React, { useState, useRef } from 'react';
import styled from "styled-components";
import {useAuth} from "../../store/productContext"
import axios from "axios"
import {useNavigate} from "react-router-dom"

const divisions = ['dhaka_division_price', 'rajshahi_division_price', 'khulna_division_price', 'barishal_division_price', 'chottogram_division_price', 'sylhet_division_price', 'mymensingh_division_price', 'rangpur_division_price'];

const initialDivisionState = {
  currentMinPrice: '',
  currentMaxPrice: '',
  lastWeekMinPrice: '',
  lastWeekMaxPrice: '',
  lastMonthMinPrice: '',
  lastMonthMaxPrice: '',
  lastYearPrice: ''
};

const AdminUploadProduct = () => {
  const {URI, authorizationToken} = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    productName: '',
    productMeasurement: '',
    productType: '',
    price: divisions.reduce((acc, division) => ({
      ...acc,
      [division]: { ...initialDivisionState }
    }), {})
  });

  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e, division = null) => {
    const { name, value } = e.target;
    
    if (division) {
      setFormData(prev => ({ ...prev, price: {
          ...prev.price,
          [division]: {
            ...prev.price[division],
            [name]: value
          }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate basic fields
      if (!formData.productName || !formData.productMeasurement || !formData.productType) {
        throw new Error('All product fields are required');
      }

      // Process price data
      const processedPrice = {};
      let hasValidDivision = false;

      divisions.forEach(division => {
        const divisionData = formData.price[division];
        const currentMin = divisionData.currentMinPrice;
        const currentMax = divisionData.currentMaxPrice;

        // Only include division if both current prices are provided
        if (currentMin && currentMax) {
          hasValidDivision = true;
          processedPrice[division] = {
            currentMinPrice: Number(currentMin),
            currentMaxPrice: Number(currentMax),
            lastWeekMinPrice: divisionData.lastWeekMinPrice ? Number(divisionData.lastWeekMinPrice) : undefined,
            lastWeekMaxPrice: divisionData.lastWeekMaxPrice ? Number(divisionData.lastWeekMaxPrice) : undefined,
            lastMonthMinPrice: divisionData.lastMonthMinPrice ? Number(divisionData.lastMonthMinPrice) : undefined,
            lastMonthMaxPrice: divisionData.lastMonthMaxPrice ? Number(divisionData.lastMonthMaxPrice) : undefined,
            lastYearPrice: divisionData.lastYearPrice ? Number(divisionData.lastYearPrice) : undefined
          };
        }
      });

      if (!hasValidDivision) {
        throw new Error('At least one division must have valid current prices');
      }

      const formDataToSend = new FormData();
      formDataToSend.append('productName', formData.productName);
      formDataToSend.append('productMeasurement', formData.productMeasurement);
      formDataToSend.append('productType', formData.productType);
      formDataToSend.append('price', JSON.stringify(processedPrice));
      
      if (fileInputRef.current.files[0]) {
        formDataToSend.append('productAvatar', fileInputRef.current.files[0]);
      }

      const response = await axios.post(`${URI}/p/post-product`, formDataToSend, {
        headers: {
          Authorization: authorizationToken,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data) {
        // Reset form
        setFormData({
          productName: '',
          productMeasurement: '',
          productType: '',
          price: divisions.reduce((acc, division) => ({
            ...acc,
            [division]: { ...initialDivisionState }
          }), {})
        });
        fileInputRef.current.value = '';
        alert('Product created successfully!');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return <Wrapper>
    <div className="product-form">
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Basic Info */}
        <div className="input_div">
          <label>Product Name:</label>
          <input type="text" name="productName" value={formData.productName} onChange={handleInputChange} required />
        </div>

        <div className="input_div">
          <label>Measurement:</label>
          <input type="text" name="productMeasurement" value={formData.productMeasurement} onChange={handleInputChange} required />
        </div>

        <div className="input_div">
          <label>Product Type:</label>
          <input name="productType" value={formData.productType} onChange={handleInputChange} required />
        </div>

        <div className="input_div">
          <label>Product Image:</label>
          <input type="file" ref={fileInputRef} accept="image/*" required />
        </div>

        {/* Division Price Inputs */}
        {divisions.map((division) => (
          <div key={division} className="division-section">
            <h3>{division.charAt(0).toUpperCase() + division.slice(1)}</h3>
            
            <div className="input_div">
              <input type="number" placeholder="Current Min Price" name="currentMinPrice" value={formData.price[division].currentMinPrice} onChange={(e) => handleInputChange(e, division)} />
              <input type="number" placeholder="Current Max Price" name="currentMaxPrice" value={formData.price[division].currentMaxPrice} onChange={(e) => handleInputChange(e, division)} />
            </div>

            <div className="input_div">
              <input type="number" placeholder="Last Week Min Price" name="lastWeekMinPrice" value={formData.price[division].lastWeekMinPrice} onChange={(e) => handleInputChange(e, division)} />
              <input type="number" placeholder="Last Week Max Price" name="lastWeekMaxPrice" value={formData.price[division].lastWeekMaxPrice} onChange={(e) => handleInputChange(e, division)} />
            </div>

            <div className="input_div">
              <input type="number" placeholder="Last Month Min Price" name="lastMonthMinPrice" value={formData.price[division].lastMonthMinPrice} onChange={(e) => handleInputChange(e, division)} />
              <input type="number" placeholder="Last Month Max Price" name="lastMonthMaxPrice" value={formData.price[division].lastMonthMaxPrice} onChange={(e) => handleInputChange(e, division)} />
            </div>

            <div className="input_div">
              <input type="number" placeholder="Last Year Price" name="lastYearPrice" value={formData.price[division].lastYearPrice} onChange={(e) => handleInputChange(e, division)} />
            </div>
          </div>
        ))}

        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Create Product'}
        </button>
      </form>
    </div>
  </Wrapper>;
};

// Styled Components
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .form-section {
    margin: 20px;
  }
  input{
    width: 20rem;
    height: 35px;
    font-size: 17px;
    background-color: white ;
    border: 2px solid skyblue;
    border-radius: 8px;
    color: #3a3838;
    margin: 5px;
  }
  h1{
    text-align: center;
    color: #3a3838;
  }
`;

export default AdminUploadProduct;