/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import { useHistory } from "react-router-dom";
import * as request from "Until/request";
const Login = () => {
  const history = useHistory()
  const loginServices = async (fromLogin={}) => {
    try {
      let res = await request.postAPI("Login/CreateTokenTeacher",fromLogin)
      const data = res.data;
      console.log(data)
      localStorage.setItem('tokenICE', data.token)
      if(data.permission=="admin"){
        history.push("/admin/examination")
      }
      if(data.permission=="teacher"){
        history.push("/teacher/studentmanage")
      }
    } catch (e) {
      window.alert("Đăng nhập thất bại")
      console.log(e)
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    const {username, password} = e.target.elements
    console.log(username.value )
    console.log(password.value)
    const loginForm = {
      username : username.value,
      password : password.value
    }
    loginServices(loginForm)

  }




  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>sign in with username and password</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    type="text"
                    autoComplete="new-email"
                    id="username"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    id="password"
                  />
                </InputGroup>
              </FormGroup>
              
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          
        </Row>
      </Col>
    </>
  );
};

export default Login;
