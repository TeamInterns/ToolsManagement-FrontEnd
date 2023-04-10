import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col, Image} from 'react-bootstrap';
import {auth} from './Config/Config'
import { createUserWithEmailAndPassword} from 'firebase/auth'
import logo from './Img/logo.png';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
 
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
    <div> <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">
      <img className="logo" src={logo} alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#features"></Nav.Link>
         
        </Nav>
        <Nav>
          <Nav.Link href="/login"><b>Login</b></Nav.Link>
          <Nav.Link eventKey={2} href="/signup">
            <b>SignUp</b>
           
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  <div style={{marginLeft:'600px',marginTop:'20px'}}>
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
        <Form.Label><b>User Name</b></Form.Label>
        <Form.Control type="text" placeholder="Full Name" required
                onChange={(e)=>setFullname(e.target.value)} value={fullName}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label><b>Email address</b></Form.Label>
        <Form.Control type="email" placeholder="Enter email" required
                 onChange={(e)=>setEmail(e.target.value)} value={email}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label><b>Password</b></Form.Label>
        <Form.Control type="password" placeholder="Password" required
                 onChange={(e)=>setPassword(e.target.value)} value={password}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label><b>Role</b></Form.Label>
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
        <b>Submit</b>
      </button>
      </span>
    </Form>
            {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>                
            </>}

      </Row>     
        </div>
  </div>
    
    )
}


export default Signup