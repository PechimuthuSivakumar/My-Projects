import { DashboardOutlined, UserOutlined, AppstoreOutlined, FileTextOutlined, DollarOutlined, PercentageOutlined, QuestionCircleOutlined, ReconciliationOutlined, FileDoneOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";





export const MenusDynamic = [
  {
    key: "1",
    icon: <DashboardOutlined />,
    label: <Link to="/">Dashboard</Link>,
    path: "/",
  },
  {
    key: "5",
    icon: <DollarOutlined />,
    label: <Link to="/Tasks">Tasks</Link>,
    path: "/plans",
  },
];

const userObject = {};
if(localStorage.getItem('api_var_role') != undefined && localStorage.getItem('api_var_role')==='hr') {
  userObject.key = '2';
  userObject.icon = <UserOutlined />;
  userObject.label = <Link to="/users">Users</Link>;
  userObject.path = "/users";
  MenusDynamic.push(userObject);
}
