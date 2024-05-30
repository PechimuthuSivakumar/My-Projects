import React from 'react'
import Widget from '../../Helpers/Widget'
import UserTable from './usertable'
const Users = () => {
  if(localStorage.getItem('api_var_role') == undefined || localStorage.getItem('api_var_role')!='hr') {
      window.location.href = "/login";
  }
  return (
    <React.Fragment>
         <Widget.BreadcrumbDynamic title="Users" />
         <div className="table_view">
            <UserTable />
        </div>
      </React.Fragment>
  )
}

export default Users