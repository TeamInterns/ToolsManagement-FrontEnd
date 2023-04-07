import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col, Image} from 'react-bootstrap';
import {auth} from './Config/Config'
import { createUserWithEmailAndPassword} from 'firebase/auth'
 
const options = ["user", "toolManager", "admin"];

const Signup = () => {
  const navigate = useNavigate()

    const [fullName, setFullname]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [role, setRole]=useState(options[0]);
    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');

  const handleSignup=(e)=>{
    e.preventDefault();
    console.log('Signup Successfull. You will now automatically get redirected to Login');
    console.log(fullName)
    console.log(email)
    console.log(password)
    console.log(role)
    createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
      // User signed up successfully
      console.log(userCredential);
    })
    .catch(error=>setErrorMsg(error.message));

    const data={
      "name":fullName,
      "email":email,
      "password":password,
      "role":role, 
  }

  fetch("http://localhost:8585/user/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
    });
    setSuccessMsg('Signup Successfull');
    setErrorMsg('');
    setFullname('');
    setEmail('');
    setPassword('');
    setTimeout(()=>{
      setSuccessMsg('');
      navigate('/login');
  },2000)
  }

  return (
    <div className='container signup'>
      <Row className="landing size">
       
            <br></br>
            <br></br>
            <h2>SIGN UP</h2>
            <hr></hr>
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                
            </>}
           <Form style={{width:"80%", marginLeft:"10%", marginTop:"10%"}} onSubmit={handleSignup}>
           <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" placeholder="Full Name" required
                onChange={(e)=>setFullname(e.target.value)} value={fullName}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required
                 onChange={(e)=>setEmail(e.target.value)} value={email}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required
                 onChange={(e)=>setPassword(e.target.value)} value={password}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Role</Form.Label>
      <Form.Select aria-label="Default select example" value={role} 
       onChange={e => setRole(e.target.value)}>
      {options.map((value) => (
          <option className='option' value={value} key={value}>
            {value}
          </option>
        ))}
    </Form.Select>
    </Form.Group>
    <span className="buttons">
      <button type="submit" className="button">
        Submit
      </button>
      </span>
    </Form>
            {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>                
            </>}

      </Row>     
        </div>
    )
}


export default Signup