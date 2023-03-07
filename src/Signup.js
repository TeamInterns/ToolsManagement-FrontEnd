import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col, Image} from 'react-bootstrap';

const options = ["User", "Manager", "Admin"];

const Signup = () => {
  const navigate = useNavigate()

    const [fullName, setFullname]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [role, setRole]=useState(options[0]);

  const handleSignup=(e)=>{
    e.preventDefault();
    console.log('Signup Successfull. You will now automatically get redirected to Login');
    console.log(fullName)
    console.log(email)
    console.log(password)
    console.log(role)
    setFullname('');
    setEmail('');
    setPassword('');
    setTimeout(()=>{
      navigate('/login');
  },3000)
  }

  return (
    <div className='container'>
      <Row className="landing">
        <Col >
            <br></br>
            <br></br>
            <h1>Sign Up</h1>
            <hr></hr>
            {/* {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>} */}
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
          <option value={value} key={value}>
            {value}
          </option>
        ))}
    </Form.Select>
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


export default Signup