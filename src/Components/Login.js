import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  let navigate = useNavigate();
  const onChange = (e)=>{
    setcredenintal({...credenintal, [e.target.name]: e.target.value})
}
  const [credenintal, setcredenintal] = useState({email:"",password:""})
  
  const handleSubmit=async(event)=>{
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
         body: JSON.stringify({email:credenintal.email,password:credenintal.password})
     
    });
    
    const json =  await response.json();
    console.log(json)

    if(json.sucess)
    {
      // save the auth token and redirect
      localStorage.setItem('token',json.authtoken)
      props.showAlert("Logged in Succesfully","success")
      navigate("/")
      
    }
    else{
     
      props.showAlert("invalid id and password","danger")
    }

  }
  return (
    <>
    <h2>Login form </h2>
    <form className='container' onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control" id="email" value={credenintal.email} onChange={onChange} name='email' aria-describedby="emailHelp"/>
     </div>
    <div className="mb-3">
      <label htmlFor="password1" className="form-label">Password</label>
      <input type="password" className="form-control" value={credenintal.password} onChange={onChange} name='password' id="password"/>
    </div>
    
    <button type="submit" className="btn btn-primary" >Submit</button>
  </form>
  </>
  )
}

export default Login 