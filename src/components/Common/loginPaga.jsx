import React from 'react';
import loginImg from "../../assets/Images/login.webp";
import Template from '../../pages/Template';
const LoginPaga = ({setIsLoggedIn}) => {
  return (
    <div>
        <Template
       title="Welcome Back"
       data1="build skills for today, tomorrow , and beyond."
       data2="Education to future-proof your career"
       image={loginImg}
       formtype="login"
       setIsLoggedIn={setIsLoggedIn}
       />
    </div>
  )
}

export default LoginPaga
