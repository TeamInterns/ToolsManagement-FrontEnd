import React,{useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col, Image} from 'react-bootstrap';
import {auth} from './Config/Config'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail]=useState('');

    const [password, setPassword]=useState('');
    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');

 
      const handleLogin=async (e)=>{
        e.preventDefault();
        
        console.log(password);
        console.log(email);
        signInWithEmailAndPassword(auth,email,password).then((credentials)=>{
        console.log("login successful");  
        setSuccessMsg('Login Successfull');
        setEmail('');
        setPassword('');
        setErrorMsg('');
        setTimeout(()=>{
          setSuccessMsg('');
          callFetch();
      },1000)
       
       
    }).catch(error=>setErrorMsg(error.message));
  }    
    

  function callFetch(){
    
      const response = fetch('http://localhost:8585/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userName: email,
      password: password
    })
  })
    .then(response => response.json())
    .then(data => {console.log(data);
      navigate("/dash", { state: { data: data } });}
  )
    .catch(error => console.error(error))     

    
  }

  return (
    
    <div className='container login'>

      <Row className="landing size">
     
        <br></br>
            <br></br>
            <h2>LOGIN</h2>
            <hr></hr>

            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                
            </>}
           
      <Form style={{width:"80%", marginLeft:"10%", marginTop:"10%"}} onSubmit={handleLogin}>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required onChange={(e)=>setEmail(e.target.value)} value={email}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)} value={password}/>
      </Form.Group>
      <span className='buttons'><button type="submit" className="button">SUBMIT</button></span>
    </Form>
    {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>                
            </>}
  
      </Row>

        </div>
  )
}

export default Login