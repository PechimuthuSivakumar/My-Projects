import React, { useState, useEffect } from "react";
import {
  UserOutlined,
  PoweroffOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Dropdown, Avatar, Input } from "antd";
import { Link, Outlet } from "react-router-dom";
import { styled } from "styled-components";
import { Styles } from "../Helpers/ThemeCustomization";
import logo from "../Assets/Images/logo.png";
import { BellOutlined, MailOutlined } from "@ant-design/icons";
import { MenusDynamic } from "../Routes/MenusDynamic";
import API from "../ApiService/ApiService";
import { useParams } from "react-router-dom";
import MobileMenu from "./MobileMenu";
const { Header, Content, Sider } = Layout;
const { Search } = Input;

const Layouts = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const api = new API();
  const logout = () => {
    api.getSingle("logout",localStorage.getItem('api_var_sid'), (err, res) => {
      if (err) {
        console.log(err);
      }else{
        localStorage.removeItem('api_var_token');
        localStorage.removeItem('api_var');
        localStorage.removeItem('api_var_role');
        localStorage.removeItem('api_var_email');
        localStorage.removeItem('api_var_sid');
        localStorage.removeItem('api_var_login','true');
        window.location.href = "/login";
      }
    })    
  };
 
  const params = useParams();
  const items = [
    {
      label: <div onClick={logout}>Logout</div>,
      key: "3",
      icon: <PoweroffOutlined />,
    },
  ];

  // useEffect(() => {
  //   api.getAll("verify-token", {}, (err, res) => {
  //     if (err) {
  //       localStorage.removeItem("api_var_token");
  //       localStorage.removeItem("api_var");
  //       localStorage.removeItem("api_var_login");
  //       window.location.href = "/login";
  //     }
  //   });
  // }, [params]);

  return (
    <LayoutSection>
      <Layout
        style={{
          minHeight: "100vh",
          background: "transparent",
        }}
        theme="light"
      >
        <Header
          style={{
            position: "fixed",
            zIndex: 1000,
            width: "100%",
            height: "70px",
            padding: 0,
            background: colorBgContainer,
            display: "flex",
          }}
        >
          <div className="header_align">
            <div className="header_left">
              <div className="mobile_menu">
                <MobileMenu menu={MenusDynamic} />
              </div>
              <div
                className="desktop_menu1"
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
              {/* <div className="header_search">
                <Search placeholder="Search.." style={{ width: "100%" }} />
              </div> */}
            </div>
            <div className="header_center">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="header_right">
              <div className="menu_list">
                {/* <div className="badge_align">
                  <div className="items_badges">
                    <BellOutlined />
                    <span className="badge_count blue">0</span>
                  </div>
                  <div className="items_badges">
                    <MailOutlined />
                    <span className="badge_count red">0</span>
                  </div>
                </div> */}
                <div className="my_details">
                  <Dropdown
                    menu={{
                      items,
                    }}
                  >
                    <a
                      onClick={(e) => e.preventDefault()}
                      href={void 0}
                      className="profile"
                    >
                      <span>{localStorage.getItem('api_var')}</span>
                      <Avatar size={35} icon={<UserOutlined />} />
                      {/* {" "} */}
                      {/* <MoreOutlined /> */}
                    </a>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </Header>

        <Layout style={{ marginTop: 70, background: "transparent" }}>
          <Sider
            collapsible={true}
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{
              backgroundColor: colorBgContainer,
              boxShadow:
                "0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04)",

            }}
            className="desktop_menu"
          >
            <div className="menu_sticky" style={collapsed ? null : { width: "200px " }}>
              <Menu
                items={MenusDynamic}
                mode="inline"
                defaultSelectedKeys={["1"]}
                theme="light"
                style={{ height: "100%", borderRight: 0 }}
                size="large"
              />
            </div>
          </Sider>
          <Content
            style={{
              padding: "25px 30px",
              minHeight: "calc(100vh - 70px)",
              background: "transparent",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </LayoutSection>
  );
};
export default Layouts;

const LayoutSection = styled.section`
  .ant-layout .ant-layout-sider-trigger {
    background: ${Styles.colorPrimary};
    line-height: 38px;
    height: 38px;
    display: none;
  }
  .bg_light {
    background: #f5f5f5;
  }
  .badge_align {
    display: flex;
    align-items: center;
    gap: 25px;
  }
  .header_align {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 25px;
    position: relative;
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
  }
  .profile {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${Styles.colorLight};
  }
  .header_left {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .header_center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .header_center img {
    height: 37px;
  }
  .desktop_menu1 {
    font-size: 23px;
    color: ${Styles.colorLight};
    cursor: pointer;
  }
  .header_search {
    display: flex;
    background: #f8f8f8;
    border-radius: 35px;
  }
  .header_search input,
  .header_search input:focus,
  .header_search button {
    border: 0 !important;
    outline: none;
    border-color: transparent !important;
    background: transparent;
    background-color: transparent !important;
    padding: 7px 16px;
  }
  .header_search input::placeholder {
    color: ${Styles.colorLight} !important;
    opacity: 1;
  }
  .header_search button {
    padding: 7px 0px;
    width: 45px;
    color: ${Styles.colorLight};
  }
  .header_search .ant-input:focus,
  .header_search .ant-input:focus-within {
    box-shadow: inherit !important;
  }
  .header_search .ant-input-group .ant-input-group-addon {
    background-color: transparent !important;
  }
  .header_search .ant-input-group .ant-input:hover {
    z-index: 1;
    border-inline-end-width: 0px;
  }
  .header_left img {
    height: 32px;
  }
  .header_right {
    width: fit-content;
    display: inline-block;
  }

  .menu_list {
    display: flex;
    align-items: center;
    gap: 25px;
  }

  .items_badges .anticon svg {
    color: ${Styles.gray};
    font-size: 21px;
    position: relative;
  }

  .items_badges {
    position: relative;
    display: flex;
  }

  .items_badges .badge_count {
    height: 15px;
    width: 15px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -5px;
    right: -6px;
    color: #fff;
    font-size: 11px;
    font-family: ${Styles.fontFamily};
  }

  .items_badges .badge_count.blue {
    background: ${Styles.colorError};
  }

  .items_badges .badge_count.red {
    background: ${Styles.colorSuccess};
  }
  .my_details {
    display: flex;
  }
  a.ant-dropdown-trigger {
    display: flex;
  }
  .ant-dropdown-menu-title-content {
    font-size: 15px;
    color: ${Styles.gray};
  }
  .mobile_menu {
    display: none;
  }
  .ant-dropdown-trigger span.anticon.anticon-more svg {
    color: ${Styles.gray};
  }
  .menu_sticky {
    position: fixed;
    top: 70;
    left: 0;
    width: 80px;
  }
  @media screen and (max-width: 1200px) {
    .desktop_menu {
      display: none;
    }
    .mobile_menu {
      display: block;
    }
    .header_align {
      padding: 10px 15px;
    }
    .desktop_menu1 {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    .header_align {
      padding: 10px 15px 50px 15px;
    }
    header {
      height: 110px !important;
    }
    .content {
      min-height: calc(100vh - 110px) !important;
    }
    .layout {
      margin-top: 110px !important;
    }
    .header_search {
      position: absolute;
      bottom: 10px;
      left: 10px;
      right: 10px;
    }
    .header_center {
      position: absolute;
      top: 20px;
      left: 48px;
      transform: translate(0, 0);
    }
    .menu_list {
      gap: 20px;
    }
    .badge_align {
      gap: 15px;
    }
    .items_badges .anticon svg {
      font-size: 18px;
    }
    .items_badges .badge_count {
      height: 13px;
      width: 13px;
      font-size: 10px;
      right: -5px;
    }
    .header_center img {
      height: 30px;
    }
    .my_details span.name {
      display: none;
    }
    .ant-layout.ant-layout-has-sider > .ant-layout-content {
      padding: 25px 15px !important;
      min-height: calc(100vh - 100px) !important;
    }
    .ant-layout.ant-layout-has-sider {
      margin-top: 110px !important;
    }
  }
  @media screen and (max-width: 380px) {
    .header_left {
      gap: 10px;
    }
    .menu_list {
      gap: 15px;
    }
  }
`;
