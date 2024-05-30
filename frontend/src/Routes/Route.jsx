import React from "react";
import Dashboard from "../Component/Dashboard/Dashboard";
import Tasks from "../Component/tasks/Tasks";
import AddTasks from "../Component/tasks/AddTasks";
import EditTask from "../Component/tasks/EditTasks";
import Users from "../Component/users/user";
import AddUsers from "../Component/users/adduser";
import EditUser from "../Component/users/edituser";
export const authRoutes = [
  {
    path: "/",
    exact: true,
    element: <Dashboard />,
  },
  {
    path:"/Tasks",
    exact: true,
    element: <Tasks/>
  },
  {
    path:"/addtasks",
    exact: true,
    element: <AddTasks />
  },
  {
    path:"/edit-task/:pid",
    exact: true,
    element: <EditTask />
  },
  {
    path:"/users",
    exact: true,
    element: <Users/>
  },
  {
    path:"/AddUsers",
    exact: true,
    element: <AddUsers />
  },
  {
    path:"/edit-user/:pid",
    exact: true,
    element: <EditUser />
  },
];

