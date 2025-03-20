import styled from "styled-components";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <Wrapper>
    <Helmet htmlAttributes={{ lang: "en", dir: "ltr" }}>
        <title>koto home page</title>
        <meta name="koto home page" content="Welcome to koto home page! here you can see the latest prices of the grocery items. you can also see the last week and last months prices and price difference between the current prices and older prices. koto, SEO, grocery items, grocery items prices, vegetable s prices, grocery items price differents" />
        <meta property="og:title" content="this is koto home page." />
        <meta property="og:description" content="Welcome to koto home page! here you can see the latest prices of the grocery items. you can also see the last week and last months prices and price difference between the current prices and older prices. koto, SEO, grocery items, grocery items prices, vegetable s prices, grocery items price differents" />
        <meta name="keywords" content="koto, SEO, grocery items, grocery items prices, grocery items price differents" />
    </Helmet>

      <h1>About Our Company</h1>

      <p>
        Welcome to our website! We’re dedicated to providing exceptional
        products and services that bring value to our customers. Our team
        believes in innovation, collaboration, and delivering the highest
        quality in everything we do.
      </p>

      <div className="aboutContent">
        <img
          src="./R.jpeg"
          alt="Company Team"
        />
        <div className="textSection">
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower individuals and organizations with
            reliable solutions that make life easier and more efficient. We
            strive to exceed expectations by focusing on the needs of our
            clients and constantly evolving in a rapidly changing world.
          </p>
          <h2>Our Values</h2>
          <ul>
            <li>Customer First</li>
            <li>Integrity & Transparency</li>
            <li>Innovation & Growth</li>
            <li>Collaboration & Respect</li>
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
  color: #3d3b3b;
  line-height: 1.6;
  background-color: aliceblue;
  border-radius: 30px;
  margin-top: 40px;
  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #3d3b3b;
  }

  p {
    margin-bottom: 1.5rem;
  }

  .aboutContent {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: flex-start;
  }

  img {
    max-width: 350px;
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
  }

  .textSection {
    flex: 1;
  }

  h2 {
    margin-top: 1rem;
  }

  ul {
    list-style-type: disc;
    margin-left: 1.5rem;
  }
`;

export default About;
