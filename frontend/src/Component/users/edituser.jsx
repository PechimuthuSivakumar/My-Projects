import React, { useContext, useEffect } from 'react'
import Widget from '../../Helpers/Widget'
import styled from 'styled-components'
import { Button, Input, Switch, Select, Spin } from 'antd'
import deleteImg from '../../Assets/Images/delete.png'
import addImg from '../../Assets/Images/add.png'
import ReactQuill from 'react-quill'
import UserProvider from '../../Provider/UserProvider'
import { useNavigate,useParams } from 'react-router-dom'
const ColorStyle = ReactQuill.Quill.import("attributors/style/color");
ReactQuill.Quill.register(ColorStyle, true);
const EditUser = () => {
  const {
    planLoader,
    planCategoryList, 
    planError, 
    setPlanError,
    planEditForm, 
    setPlanEditForm,
    singleId, 
    getSinglePLan,
    updatePlans
  } = useContext(UserProvider);
  const {pid} = useParams();
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["image"],
        [{ align: [] }],
        [{ font: [] }],
        [{ color: [] }],
        [{ formula: '' }],

      ],
    },
  };
  const navigate = useNavigate();
  const addNewRow = () => {
    setPlanEditForm({
      ...planEditForm,
      name:"",
      email:"",
      role:"",
      phone:"",
    })
  }
  
  
  useEffect(() => {
    setPlanEditForm({
      name:"",
      email:"",
      role:"",
      phone:"",
    })
    getSinglePLan(pid);
  },[]);
  const addPlanHandler = async () => {
    let failed = false;
    if(planEditForm.name==="") {
      setPlanError('plan_name');
      Widget.showMessage("error", "Please enter user name");
      setTimeout(() => {
        setPlanError(null)
      }, 3000);
      return;
    }
    if(planEditForm.email==="") {
      setPlanError('category');
      Widget.showMessage("error", "Please enter user email");
      setTimeout(() => {
        setPlanError(null)
      }, 3000);
      return;
    }
    if(planEditForm.phone === ""){
      setPlanError('plan_type');
      Widget.showMessage("error", "Please enter user phone number");
      setTimeout(() => {
        setPlanError(null)
      }, 3000);
      return;
    }
    if(planEditForm.role.length===0) {
      setPlanError('product');
      Widget.showMessage("error", "Please select role");
      setTimeout(() => {
        setPlanError(null)
      }, 3000);
      return;
    }
    
    const addPlan = await updatePlans(planEditForm,singleId);
    // if(addPlan.data?.success===true) {
      navigate('/users');
    // }
  }
  if(planLoader.single || planLoader.category) {
    return (
      <div className='d_f a_i_c j_c_c w_100 m_t_40'>
        <Spin />
      </div>
    )
  }

  
  return (
    <AddPlansSection>
      <Widget.BreadcrumbDynamic title="Edit Plans" />
      <div className="table_view p_25">
        <div className='col_2 g_30 m_t_15 m_b_15'>
          <div className='d_f a_i_c'><label>Name :</label><Input status={planError === 'plan_name' ? 'error' : ''} value={planEditForm.name} label="Plan Name" placeholder="Plan Name" size='large' onChange={(e) => setPlanEditForm({ ...planEditForm, name: e.target.value })} className='plan_name' /></div>
          <div className='d_f a_i_c'><label>Email :</label><Input status={planError === 'category' ? 'error' : ''} placeholder="Email" size='large' loading={planLoader.category} onChange={(e) => setPlanEditForm({ ...planEditForm, email: e.target.value })} value={planEditForm.email} /></div>
          <div className='d_f a_i_c'><label>Role :</label><Select maxTagCount={1} status={planError === 'product' ? 'error' : ''} label="Product" placeholder="Select Product" size='large' className='w_100' mode="single" options={[
            {
              value: 'hr',
              label: 'HR',
            },
            {
              value: 'rm',
              label: 'Reporting Manager',
            },
            {
              value: 'em',
              label: 'Employee',
            }
          ]} onChange={(e) => setPlanEditForm({ ...planEditForm, role: e })} value={planEditForm.role} /></div>
          <div className='d_f a_i_c'><label>Phone :</label><Input value={planEditForm.phone} label="Type" placeholder="Type" size='large' onChange={(e) => setPlanEditForm({ ...planEditForm, phone: e.target.value })} /></div>
        </div>
        <div className='divider'></div>
      
        <div className='description'>
        </div>
        <Button type="primary" htmlType="button" className='m_t_20' onClick={() => addPlanHandler(planEditForm)} size='large' loading={planLoader.update}>Update</Button>
      </div>
    </AddPlansSection>
  )
}

export default EditUser;


const AddPlansSection = styled.section`
.delete_img {
  width: 15px;
}
.divider {
  width: 100%;
  border-bottom: 1px solid #EAEAEA;
  margin: 45px 0 25px 0;
}

label {
  width: 120px !important;
}
.add_img {
  height: 19px;
  width: 19px;
  border-radius: 100%;
}
.w_100 {
  width: 100% !important;
}
.cur_p {
  cursor: pointer;
}
table {
  width: 100%;
}
th {
  padding: 20px 15px;
}
td {
  padding: 20px 15px;
  text-align: center;
}
table input {
  width: 100% !important;
  min-width: auto;
  max-width: inherit;
  text-align: center;
}
th {
  border-bottom: 1px solid #EAEAEA;
}
.description {
  width: 100%;
  display: inline-block;
}
tbody tr td {
  border-bottom: 1px solid #EAEAEA;
}

`