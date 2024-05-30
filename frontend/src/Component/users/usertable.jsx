import React,{useContext,useEffect} from 'react'
import Widget from '../../Helpers/Widget'
import { Button, Input, Switch, Tag,Spin } from 'antd'
import okeyImg from '../../Assets/Images/okey.png'
import { useNavigate } from 'react-router-dom';
import UserProvider from '../../Provider/UserProvider'
import styled from 'styled-components'
import {EyeOutlined,EditOutlined} from '@ant-design/icons'
import {Styles} from '../../Helpers/ThemeCustomization'
const UserTable = () => {
  const {
    planLoader, 
    planList, 
    fetchPlanMaster,
    tableFilter,
    setTableFilter,
    openViewPopup, 
    setOpenViewPopup,
    getSinglePLan,
    planSingle,
    statusUpdate,
    onActivePlan, 
    setOnActivePlan,
    singleId,
} = useContext(UserProvider);
  const navigate = useNavigate();
  const handleSearch = (searchText) => {
    setTableFilter({ ...tableFilter, name: searchText, page: 1 });
  };
  useEffect(() => {
    setOpenViewPopup(false);
    fetchPlanMaster();
  },[tableFilter])
  const onChangePlan = async (value) => {
    setOnActivePlan(value);
    await statusUpdate(value,singleId);
  }
 
  const columns = [
    {
      title: "S.no",
      dataIndex: "index",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Phone",
      dataIndex : "phone",
    },
    {
      title: "Actions",
      dataIndex: "action",
      fixed: "right",
      width: 85,
      render: (action,all) => (
        <div className="table_action">
          <EyeOutlined style={{color:Styles.colorPrimary,fontSize:"17px",cursor:"pointer"}} onClick={()=>{setOpenViewPopup(!openViewPopup);getSinglePLan(all?.action)}} />
          <EditOutlined style={{color:Styles.colorPrimary,fontSize:"17px",cursor:"pointer"}} onClick={() => navigate(`/edit-user/${all?.action}`)} />
         </div>
      ),
    },
  ];
  const rowSelections = async (ids) => { };
  const data = []
  planList?.data?.map((item,index) => {
    data.push({
      index: planList?.paginator?.slNo + index,
      key: index,
      name: item?.name,
      email: item?.email,
      role: item?.role||'-Nil-',
      phone: item?.phone,
      action: item?.uid
    })
  })
  return (
    <PlanTableSection>
    <div className="table_search">
      <Input
        size={"large"}
        placeholder="Search"
        className="width_230"
        onChange={(e) => handleSearch(e.target.value)}
      />
      
      <Button size={"large"} type='primary' htmlType='button' onClick={() => navigate('/AddUsers')}>Add User</Button>
    </div>
    <div className="table_responsive">
      <Widget.DataTables
        columns={columns}
        data={data}
        rowSelections={rowSelections}
        rowcheck={false}
        loading={planLoader.list}
        pagnation={planList?.paginator}
        onchange={(page, pageSize) => setTableFilter({ ...tableFilter, page, limit: pageSize })}
      />
    </div>
    <Widget.PopupModel 
      title={<div className='d_f a_i_c g_10'>{planSingle?.name} Details</div>} 
      open={openViewPopup} 
      oncancel={() => setOpenViewPopup(false)} 
      footer={false} 
      width={800} 
      body={planLoader?.single?<div className='d_f a_i_c j_c_c w_100 m_t_40'>
      <Spin />
    </div>:<div className='col_1 g_20'>
        <div className='col_2 g_20'>
          <div className='view_items'><span>Name : </span><span>{planSingle?.name||'-'}</span></div>
          <div className='view_items'><span>Email : </span><span>{planSingle?.email||'-'}</span></div>
          <div className='view_items'><span>Phone : </span><span>{planSingle?.phone||'-'}</span></div>
          <div className='view_items'><span>Role : </span><span>{planSingle?.role||'-'}</span></div>
        </div>
        <div className='divider_tb'></div>
        <div className='col_1'>
          <label style={{fontWeight:"bold"}}>Description :</label>
          <div className='d_html_plan' dangerouslySetInnerHTML={{ __html: planSingle?.description }}></div>
        </div>
        <div className='d_f a_i_c w_100 j_c_s_b'>
          <Button type='primary' htmlType='button' onClick={() => {setOpenViewPopup(false);navigate(`/edit-user/${planSingle?.uid}`)}} size='large'>Edit</Button>
        </div>
      </div>}
    />
  </PlanTableSection>
  )
}

export default UserTable;


const PlanTableSection = styled.section`






`