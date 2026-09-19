import React from 'react';
import  signupImg from "../../assets/Images/signup.webp";
import Template from '../../pages/Template';

const SignupPaga = ({setIsLoggedIn}) => {
  return (
    <div>
         <Template
            title="Join the millions learning to code with studyNotion for free"
            data1="build skills for today, tomorrow , and beyond"
            data2="Education to future-proof your career"
            image={signupImg}
            formtype="signup"
            setIsLoggedIn={setIsLoggedIn}
            />
    </div>
  )
}

export default SignupPaga
