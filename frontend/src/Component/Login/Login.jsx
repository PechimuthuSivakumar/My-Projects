import React,{useState} from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form } from "antd";
import styled from "styled-components";
import logo from "../../Assets/Images/logo.png";
import { Styles } from "../../Helpers/ThemeCustomization";
import Widget from "../../Helpers/Widget";
import API from "../../ApiService/ApiService";
const Login = () => {
  const [loading,setLoading] = useState(false);
  const api = new API();
  const loginHandler = async (values) => {
    api.create('login',values,(err,res)=>{
      setLoading(false);
      if(err){
        Widget.showMessage('error', err?.response?.data?.message);
        localStorage.removeItem('api_var_token');
        localStorage.removeItem('api_var');
        localStorage.removeItem('api_var_role');
        localStorage.removeItem('api_var_email');
        localStorage.removeItem('api_var_sid');
        localStorage.removeItem('api_var_login','true');
      }else{
        if(res?.data?.logged_in===true) {
          localStorage.setItem('api_var_token',res?.data?.token);
          localStorage.setItem('api_var',res?.data?.user?.name);
          localStorage.setItem('api_var_role',res?.data?.user?.role);
          localStorage.setItem('api_var_email',res?.data?.user?.email);
          localStorage.setItem('api_var_sid',res?.data?.user?.sessionId);
          localStorage.setItem('api_var_login','true');
          window.location.href = '/';
        }
      }
    })
    
  }
  

  return (
    <LoginSection>
      <div className="login_section">
        <div className="login_form col_1 g_20">
        {/* <img src={logo} alt="Logo" className="login_logo" /> */}
          <h1 className="h1 t_a_c">Welcome back!</h1>
          <Form
            layout="vertical"
            onFinish={(e) => loginHandler(e)}
            className="col_1 g_20"
          >
            <Widget.InputText
              label="Phone Number"
              name="email"
              placeholder="Phone Number"
              required={true}
              validationmsg="Please enter valid phone number"
              icon={<UserOutlined />}
            />
            <Widget.InputPassword
              label="Password"
              name="password"
              placeholder="Password"
              required={true}
              validationmsg="Please enter password"
              icon={<LockOutlined />}
            />
            <Widget.Button
              btype="submit"
              text="Login"
              type="primary"
              loading={loading}
              // icon={<LoginOutlined /> }
            />
          </Form>
        </div>
      </div>
    </LoginSection>
  );
};

export default Login;


const LoginSection = styled.section`

  position: relative;
  display: flex;
  .login_logo {
    margin: auto auto 0px;
    display: block;
  }
  .login_header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 40;
    padding: 20px 25px;
    width: 100%;
  }
  .login_header_align {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
  }
  .login_header_left {
    width: fit-content;
  }
  .login_header_left img {
    height: 42px;
  }
  .login_header_right {
    display: flex;
    width: fit-content;
    align-items: center;
    gap: 15px;
  }
  .login_section {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .login_section::after {
    content: "";
    position: absolute;
    top: 25vh;
    width: calc(100%);
    height: calc(100% - 25vh);
    width: 100%;
    left: 0;
    background-size: 100%;
    z-index: 15;
    height: 100%;
    width: 100%;
  }
  .login_section::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    top: 25vh;
    height: 100%;
    /* background: ${Styles.colorPrimary}; */
    z-index: 10;
  }
  .login_form {
    position: relative;
    z-index: 30;
    width: 430px;
    padding: 30px 25px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 24px 64px #26214a1a;
    border: 1px solid ${Styles.borderColor};
  }

  @media screen and (max-width: 480px) {
    .login_form {
      width: 85%;
    }
    .login_section::after {
      top: 35%;
      height: calc(100% - 35vh);
    }
    .login_section::before {
      top: 35%;
    }
  }
`;
