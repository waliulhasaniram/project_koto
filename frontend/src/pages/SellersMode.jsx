import styled from 'styled-components';

const SellersMode =()=>{
    return <Wraper>
    <div className="container">
            <h3>seller mode</h3>
        <label className="switch">
        <input className="togglesw" type="checkbox" />
        <div className="indicator left"></div>
        <div className="indicator right"></div>
        <div className="button"></div>
        </label>
    </div>
    </Wraper>
}

const Wraper = styled.section`
    /* From Uiverse.io by csemszepp */ 
.container {
    margin-top: auto;
    margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  --hue: 220deg;
  --width: 10rem;
  --accent-hue: 22deg;
  --duration: 0.6s;
  --easing: cubic-bezier(1, 0, 1, 1);
  h3{
    color: #548aee;
    margin-right: 9px;
  }
}

.togglesw {
  display: none;
}

.switch {
  --shadow-offset: calc(var(--width) / 20);
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: var(--width);
  height: calc(var(--width) / 2.5);
  border-radius: var(--width);
  box-shadow: inset 10px 10px 10px hsl(var(--hue) 20% 80%),
    inset -10px -10px 10px hsl(var(--hue) 20% 93%);
}

.indicator {
  content: '';
  position: absolute;
  width: 40%;
  height: 60%;
  transition: all var(--duration) var(--easing);
  box-shadow: inset 0 0 2px hsl(var(--hue) 20% 15% / 60%),
    inset 0 0 3px 2px hsl(var(--hue) 20% 15% / 60%),
    inset 0 0 5px 2px hsl(var(--hue) 20% 45% / 60%);
}

.indicator.left {
  --hue: 197deg; /* Updated hue for sky blue */
  overflow: hidden;
  left: 10%;
  border-radius: 100px 0 0 100px;
  background: linear-gradient(
    180deg,
    hsl(calc(var(--hue) + 20deg) 95% 80%) 10%,
    hsl(calc(var(--hue) + 20deg) 100% 60%) 30%,
    hsl(var(--hue) 90% 50%) 60%,
    hsl(var(--hue) 90% 60%) 75%,
    hsl(var(--hue) 90% 50%)
  );
}

.indicator.left::after {
  content: '';
  position: absolute;
  opacity: 0.6;
  width: 100%;
  height: 100%;
}
.indicator.right {
  right: 10%;
  border-radius: 0 100px 100px 0;
  background-image: linear-gradient(180deg, hsl(var(--hue) 20% 95%), hsl(var(--hue) 20% 65%) 60%, hsl(var(--hue) 20% 70%) 70%, hsl(var(--hue) 20% 65%));
}

.button {
  position: absolute;
  z-index: 1;
  width: 55%;
  height: 80%;
  left: 5%;
  border-radius: 100px;
  background-image: linear-gradient(160deg, hsl(var(--hue) 20% 95%) 40%, hsl(var(--hue) 20% 65%) 70%);
  transition: all var(--duration) var(--easing);
  box-shadow: 2px 2px 3px hsl(var(--hue) 18% 50% / 80%),
    2px 2px 6px hsl(var(--hue) 18% 50% / 40%),
    10px 20px 10px hsl(var(--hue) 18% 50% / 40%),
    20px 30px 30px hsl(var(--hue) 18% 50% / 60%);
}

.button::before, 
.button::after {
  content: '';
  position: absolute;
  top: 10%;
  width: 41%;
  height: 80%;
  border-radius: 100%;
}

.button::before {
  left: 5%;
  box-shadow: inset 1px 1px 2px hsl(var(--hue) 20% 85%);
  background-image: linear-gradient(-50deg, hsl(var(--hue) 20% 95%) 20%, hsl(var(--hue) 20% 85%) 80%);
}

.button::after {
  right: 5%;
  box-shadow: inset 1px 1px 3px hsl(var(--hue) 20% 70%);
  background-image: linear-gradient(-50deg, hsl(var(--hue) 20% 95%) 20%, hsl(var(--hue) 20% 75%) 80%);
}

.togglesw:checked ~ .button {
  left: 40%;
}

.togglesw:not(:checked) ~ .indicator.left,
.togglesw:checked ~ .indicator.right {
  box-shadow: inset 0 0 5px hsl(var(--hue) 20% 15% / 100%),
    inset 20px 20px 10px hsl(var(--hue) 20% 15% / 100%),
    inset 20px 20px 15px hsl(var(--hue) 20% 45% / 100%);
}

@media only screen and (max-width: 600px) {
  margin-top: 30px;
  width: 200px;
  font-size: small;
}
`;

export default SellersMode