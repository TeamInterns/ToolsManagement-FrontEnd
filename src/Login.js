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
    const [error, setError]=useState('');

 
      const handleLogin=async (e)=>{
        e.preventDefault();
        
        console.log(password);
        console.log(email);
        signInWithEmailAndPassword(auth,email,password).then((credentials)=>{
        console.log("login successful");  
        
        setEmail('');
        setPassword('');
        callFetch();
       
    }).catch(error => console.error(error));
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
    
    <div className='container'>
      <Row className="landing">
        <Col >
        <br></br>
            <br></br>
            <h1>Login</h1>
            <hr></hr>
             {error&&<>
                <div className='success-msg'>{error}</div>
                <br></br>
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
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
            {/* {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>                
            </>} */}
        </Col>
        
        <Col >
        <div style={{width:"80%", marginRight:"10%", marginTop:"20%"}}>
           <Image style={{width:"100%"}} src="https://img.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg?w=996&t=st=1677682708~exp=1677683308~hmac=723981cd2fa17a8357b560e4526fc1fcade77dabd945a4273570fbfcebfab9f5"  /> 
        </div>
        </Col>
      </Row>
            
        </div>
  )
}

export default Login