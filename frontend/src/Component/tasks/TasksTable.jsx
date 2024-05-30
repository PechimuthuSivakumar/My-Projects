import React,{useContext,useEffect,useState} from 'react'
import Widget from '../../Helpers/Widget'
import { Button, Input, Switch, Tag, Select, Spin } from 'antd'
import okeyImg from '../../Assets/Images/okey.png'
import { useNavigate } from 'react-router-dom';
import PlansProvider from '../../Provider/PlansProvider'
import styled from 'styled-components'
import {EyeOutlined,EditOutlined} from '@ant-design/icons'
import {Styles} from '../../Helpers/ThemeCustomization'
const PlansTable = () => {
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
} = useContext(PlansProvider);
  const navigate = useNavigate();
  const handleSearch = (searchText) => {
    setTableFilter({ ...tableFilter, name: searchText, page: 1 });
  };
  useEffect(() => {
    setOpenViewPopup(false);
    fetchPlanMaster();
  },[tableFilter])

  const [status,setStatus] = useState("");
  const [review,setReview] = useState("");

  const chanegeStatus = (value) => {
    setStatus(value);
  }

  const setComment = (value) => {
    setReview(value);
  }

  const SaveReport = async () => {
      if(status === "") {
        Widget.showMessage("error", "Please enter select status");
        return;
      }
      // if(review === "") {
      //   Widget.showMessage("error", "Please enter review");
      //   return;
      // }
      const updateStatus = await statusUpdate(status,singleId,review);
      if(updateStatus.data?.success===true) {
        setOpenViewPopup(false);
        fetchPlanMaster();
      }
  }
 
  const columns = [
    {
      title: "S.no",
      dataIndex: "index",
    },
    
    {
      title: "Task Name",
      dataIndex: "tasks",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: Widget.statusTable("status"),
    },
    {
      title: "Actions",
      dataIndex: "action",
      fixed: "right",
      width: 85,
      render: (action,all) => (
        <div className="table_action">
          {(localStorage.getItem('api_var_role') == "rm" || localStorage.getItem('api_var_role') == "hr") && <EyeOutlined style={{color:Styles.colorPrimary,fontSize:"17px",cursor:"pointer"}} onClick={()=>{setOpenViewPopup(!openViewPopup);getSinglePLan(all?.action)}} />}
          {
            localStorage.getItem('api_var_role') == "em" && <EditOutlined style={{color:Styles.colorPrimary,fontSize:"17px",cursor:"pointer"}} onClick={() => navigate(`/edit-task/${all?.action}`)} />
          }
         </div>
      ),
    },
  ];
  {
    if(localStorage.getItem('api_var_role') == "rm" || localStorage.getItem('api_var_role') == "hr") {
      columns.splice(1,0,{
        title: "Name",
        dataIndex: "name",
      })
    }
  }
  const rowSelections = async (ids) => { };
  const data = []
  planList?.data?.map((item,index) => {
    data.push({
      index: planList?.paginator?.slNo + index,
      key: index,
      tasks: item?.task,
      name: item?.name,
      duration: item?.duration+' Hours',
      status: [item?.status],
      action: item?.id
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
      {
        localStorage.getItem('api_var_role')==='em' && <Button size={"large"} type='primary' htmlType='button' onClick={() => navigate('/addtasks')}>Add Tasks</Button>
      }      
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
      title={<div className='d_f a_i_c g_10'>{planSingle?.plan_name} {planSingle.status===1?<Tag color="green" size="small" style={{fontWeight:"normal"}}>Active</Tag>:<Tag color="red" size="small" style={{fontWeight:"normal"}}>In Active</Tag>}</div>||'View Plans'} 
      open={openViewPopup} 
      oncancel={() => setOpenViewPopup(false)} 
      footer={false} 
      width={800} 
      body={planLoader?.single?<div className='d_f a_i_c j_c_c w_100 m_t_40'>
      <Spin />
    </div>:<div className='col_1 g_20'>
        <div className='col_2 g_20'>
          <div className='view_items'><span>Task Name : </span><span>{planSingle?.task||'-'}</span></div>
          <div className='view_items'><span>Duration : </span><span>{planSingle?.duration||'-'}</span></div>
        </div>
        <div className='divider_tb'></div>
        <div className='col_1'>
          <label style={{fontWeight:"bold"}}>Description :</label>
          <div className='d_html_plan' dangerouslySetInnerHTML={{ __html: planSingle?.discription }}></div>
        </div>
        <div className='divider_tb'></div>
        <div className='col_1'>
          <label style={{fontWeight:"bold"}}>Status :</label>
          <Select maxTagCount={1} placeholder="Select Status" className='w_100' mode="single" options={[
             {
                value: '0',
                label: 'not approved',
              },
              {
                value: '1',
                label: 'returned for correction',
              },
              {
                value: '2',
                label: 'Assigned to HR',
              },
              {
                value: '3',
                label: 'under review',
              },{
                value: '4',
                label: 'postponed',
              },{
                value: '5',
                label: 'Apporved',
              }
          ]} onChange={(e) => chanegeStatus(e)} />
        </div>
        <div className='col_1'>
          <Input type='text' placeholder="Comment" className='w_100' onChange={(e) => setComment(e.target.value)} />
        </div>
        <div className='divider_tb'></div>
        <div className='d_f a_i_c w_100 j_c_s_b'>
          <Button type='primary' htmlType='button' onClick={() => {setOpenViewPopup(false);SaveReport()}} size='large'>Save</Button>
        </div>
      </div>}
    />
  </PlanTableSection>
  )
}

export default PlansTable;


const PlanTableSection = styled.section`






`