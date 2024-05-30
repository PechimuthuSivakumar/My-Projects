import React, { useContext, useEffect } from 'react'
import Widget from '../../Helpers/Widget'
import styled from 'styled-components'
import { Button, Input, Switch, Select } from 'antd'
import deleteImg from '../../Assets/Images/delete.png'
import addImg from '../../Assets/Images/add.png'
import ReactQuill from 'react-quill'
import UserProvider from '../../Provider/UserProvider'
import { useNavigate } from 'react-router-dom'
const ColorStyle = ReactQuill.Quill.import("attributors/style/color");
ReactQuill.Quill.register(ColorStyle, true);
const AddUsers = () => {
  const {
    planLoader,
    planAddForm,
    setPlanAddForm,
    planCategoryList, 
    planError, 
    setPlanError,
    addPlans
  } = useContext(UserProvider);
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
    setPlanAddForm({
      ...planAddForm,
    })
  }
  useEffect(() => {
    setPlanAddForm({
      name:"",
      email:"",
      role:"",
      phone:"",
      password:"",
    });
  },[]);
  const addPlanHandler = async () => {
    console.log(planAddForm);
    let failed = false;
    if(planAddForm.name==="") {
      setPlanError('plan_name');
      Widget.showMessage("error", "Please enter user name");
      setTimeout(() => {
        setPlanError(null)
      }, 3000);
      return;
    }
    if(planAddForm.email==="") {
      setPlanError('category');
      Widget.showMessage("error", "Please enter user email");
      setTimeout(() => {
        setPlanError(null)
      }, 3000);
      return;
    }
    if(planAddForm.phone === ""){
      setPlanError('plan_type');
      Widget.showMessage("error", "Please enter user phone number");
      setTimeout(() => {
        setPlanError(null)
      }, 3000);
      return;
    }
    if(planAddForm.password === ""){
      setPlanError('password');
      Widget.showMessage("error", "Please enter password");
      setTimeout(() => {
        setPlanError(null)
      }, 3000);
      return;
    }
    if(planAddForm.role.length===0) {
      setPlanError('product');
      Widget.showMessage("error", "Please select role");
      setTimeout(() => {
        setPlanError(null)
      }, 3000);
      return;
    }
    const addPlan = await addPlans(planAddForm);
    if(addPlan.data?.success===true) {
      window.location.replace('/users')
    }
  }
  
  return (
    <AddPlansSection>
      <Widget.BreadcrumbDynamic title="Add Plans" />
      <div className="table_view p_25">
        <div className='col_2 g_30 m_t_15 m_b_15'>
          <div className='d_f a_i_c'><label>Name :</label><Input status={planError === 'plan_name' ? 'error' : ''} value={planAddForm.name} label="Name" placeholder="Name" size='large' onChange={(e) => setPlanAddForm({ ...planAddForm, name: e.target.value })} className='plan_name' /></div>
          <div className='d_f a_i_c'><label>Email :</label><Input status={planError === 'category' ? 'error' : ''} value = {planAddForm.email} placeholder="Email" label="Email" size='large' onChange={(e) => setPlanAddForm({ ...planAddForm, email: e.target.value })} /></div>
          <div className='d_f a_i_c'><label>Role :</label><Select status={planError === 'product' ? 'error' : ''} label="Select Role" placeholder="Select Role" size='large' className='w_100' mode="single" options={[
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
          ]} onChange={(e) => setPlanAddForm({ ...planAddForm, role: e })} value={planAddForm.role} /></div>
          <div className='d_f a_i_c'><label>Phone :</label><Input value={planAddForm.phone} label="Phone" placeholder="Phone" size='large' onChange={(e) => setPlanAddForm({ ...planAddForm, phone: e.target.value })} /></div>
          <div className='d_f a_i_c'><label>Password :</label><Input value={planAddForm.password} label="Password" placeholder="Password" size='large' onChange={(e) => setPlanAddForm({ ...planAddForm, password: e.target.value })} /></div>
        </div>
        <div className='divider'></div>
        <div className='description '>

        </div>
        <Button type="primary" htmlType="button" className='m_t_20' onClick={() => addPlanHandler(planAddForm)} size='large' loading={planLoader.add}>Save</Button>
      </div>
    </AddPlansSection>
  )
}

export default AddUsers;


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