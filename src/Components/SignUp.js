import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const SignUp = (props) => {
  const navigate=useNavigate();
  const [credenintal, setcredenintal] = useState({ name:"",email:"",password:"",cpassword:""})
  const onChange = (e)=>{
    setcredenintal({...credenintal, [e.target.name]: e.target.value})
  }

   const handleSubmit=async(event)=>{
  const{name,email,password}=credenintal
  
  event.preventDefault();
  const response = await fetch("http://localhost:5000/api/auth/createuser",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
       body: JSON.stringify({name,email,password})
   
  })
  const json =  await response.json();
  console.log(json)

  if(json.sucess)
  {
    // save the auth token and redirect
    localStorage.setItem('token',json.authtoken)
    navigate("/")
    props.showAlert("Account Created Succesfully","success")
  }
  else{
    //alert("invalid id and password")
    props.showAlert("invalid id and password","danger")
  }
}
  



  
    return (
   
     <div className="container">
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="name" onChange={onChange}
              name="name"
              required
            
            
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp" onChange={onChange}
              name="email"
              required
            
            
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" onChange={onChange} name="password" required
              minLength={5} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Confirm Password
            </label>
            <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" required
              minLength={5} />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      
    );
  };
export default SignUp;
