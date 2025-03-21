import { NavLink, useLocation } from "react-router";
import styled from "styled-components";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import {Helmet} from "react-helmet-async";

const SingleProduct = () => {
    const location = useLocation();
    const {_id, productName, productType, porductAvater, price } = location.state;
    //console.log(price)

    return (
        <Wrapper>

        <Helmet htmlAttributes={{ lang: "en", dir: "ltr" }}>
            <title>price of {productName}</title>
            <meta name="koto app - grocery items prices" content="Welcome to koto home page! here you can see the latest prices of the grocery items. you can also see the last week and last months prices and price difference between the current prices and older prices. koto, SEO, grocery items, grocery items prices, vegetable s prices, grocery items price differents" />
            <meta property="og:title" content={`price of ${productName}`} />
            <meta property="og:description" content="Welcome to koto home page! here you can see the latest prices of the grocery items. you can also see the last week and last months prices and price difference between the current prices and older prices. koto, SEO, grocery items, grocery items prices, vegetable s prices, grocery items price differents" />
            <meta name="keywords" content={`koto, SEO, grocery items, grocery items prices, vegetable s prices, grocery items price differents, price of ${productName}`} />
        </Helmet>

        <NavLink to="/"><button className="goback">← go back</button></NavLink> 
        <ProductCard>
            <ProductImage src={porductAvater} alt={productName} />
            <ProductDetails>
                <h1>{productName}</h1>
                <h3>Type: {productType}</h3>
                
                {/* Display prices for all divisions */}
                {Object.entries(price).map(([divisionKey, divisionPrice]) => {
                    // Convert key like "dhaka_division_price" to "Dhaka"
                    const divisionName = divisionKey
                        .replace(/_division_price$/, '')
                        
                    return (
                        <div key={divisionKey} className="price-section">
                            <h4>{divisionName}</h4>
                            <p>
                                <strong>Current Price Range:</strong> 
                                ৳{divisionPrice.currentMinPrice} - ৳{divisionPrice.currentMaxPrice}
                                {divisionPrice.currentMaxPrice>divisionPrice.lastWeekMaxPrice ? <><FaLongArrowAltUp style={{color:"red"}}/></> : <><FaLongArrowAltDown style={{color:"green"}}/></>}
                            </p>
                            
                            <p>Last Week Price Range: ৳{divisionPrice.lastWeekMinPrice} - ৳{divisionPrice.lastWeekMaxPrice}</p>
                            <p>Last Month Price Range: ৳{divisionPrice.lastMonthMinPrice} - ৳{divisionPrice.lastMonthMaxPrice}</p>
                            <p> price difference between current price and last Week : ৳{divisionPrice.price_Difference_current_lastWeek}</p>
                            <p> price difference between current price and last Month : ৳{divisionPrice.price_Difference_current_lastMonth}</p>
                            
                            {/* Add more price fields as needed */}
                        </div>
                    );
                })}
            </ProductDetails>
        </ProductCard>
    </Wrapper>
    );
};

const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    padding: 10px;
    min-height: 500px;
    button{
        margin: 5px;
    }
    @media only screen and (max-width: 600px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 310px;
    }
`;

const ProductCard = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 40px;
    width: 100%;
    max-width: 1300px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    @media only screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 300px;
    }
`;

const ProductImage = styled.img`
    width: 100%;
    max-width: 600px;
    height: auto;
    border-radius: 10px;
    margin-bottom: 20px;
    
    @media only screen and (max-width: 768px) {
        margin-right: 30px;
        margin-bottom: 0;
    }
`;

const ProductDetails = styled.div`
    text-align: start;
    padding: 30px;

    h1 {
        font-size: 2.5rem;
        margin-bottom: 15px;
        color: #333;
    }

    h3 {
        font-size: 1.25rem;
        margin-bottom: 10px;
        color: #555;
    }

    p {
        font-size: 1.4rem;
        margin-top: 10px;
        color: #666;
    }
    @media only screen and (max-width: 768px) {
        text-align: start;
        padding: 10px;
        h1 {
            font-size: 2rem;
        }
        h2{
            font-size: 1.5rem;
        }
        p{
            font-size: 1.2rem;
        }

    }
`;

export default SingleProduct;