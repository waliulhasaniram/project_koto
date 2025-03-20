import styled from "styled-components"; 

const Footer =()=>{
    const date = new Date()
    return <>
        <div className="footer">
            <p>Copyright goes to KoTo Team. {date.getFullYear()}</p>
        </div>
    </>
}

export default Footer