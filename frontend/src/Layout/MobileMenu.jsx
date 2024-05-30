import React, { useState } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Menu, Drawer } from "antd";
import { styled } from "styled-components";
import { Styles } from "../Helpers/ThemeCustomization";
const MobileMenu = ({ menu }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MobileMenuSection>
        <div className="mobile_menu">
          <div onClick={showDrawer} className="menu_icon">
            {open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <Drawer
            title="Menubar"
            placement="left"
            onClose={onClose}
            open={open}
            style={{ padding: 0 }}
            width={210}
          >
            <Menu
              theme="light"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={menu}
              onClick={onClose}
            />
          </Drawer>
        </div>
      </MobileMenuSection>
    </>
  );
};

export default MobileMenu;

const MobileMenuSection = styled.section`
  .mobile_menu {
    display: flex;
  }
  .mobile_menu .anticon svg {
    color: ${Styles.gray};
    font-size: 21px;
    position: relative;
  }
  .menu_icon {
    display: flex;
    cursor: pointer;
  }
  .ant-drawer-body {
    padding: 0;
  }
`;
