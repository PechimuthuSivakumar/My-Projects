import React, { useContext, useEffect } from 'react'
import Widget from '../../Helpers/Widget'
import styled from 'styled-components'
import { Button, Input, Switch, Select, Spin } from 'antd'
import deleteImg from '../../Assets/Images/delete.png'
import addImg from '../../Assets/Images/add.png'
import ReactQuill from 'react-quill'
import PlansProvider from '../../Provider/PlansProvider'
import { useNavigate,useParams } from 'react-router-dom'
const ColorStyle = ReactQuill.Quill.import("attributors/style/color");
ReactQuill.Quill.register(ColorStyle, true);
const EditPlans = () => {
  const {
    planLoader,
    planCategoryList, 
    planError, 
    setPlanError,
    planEditForm, 
    setPlanEditForm,
    singleId, 
    getSinglePLan,
    updatePlans,
    planSingle,
  } = useContext(PlansProvider);
  const {pid} = useParams();
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        [{ align: [] }],
        [{ font: [] }],
        [{ color: [] }],
        [{ formula: '' }],

      ],
    },
  };
  const navigate = useNavigate();
  
  
  useEffect(() => {
    setPlanEditForm({
      task:"",
      duration:"",
      discription:"",
    })
    getSinglePLan(pid);
  },[]);
  const addPlanHandler = async () => {
    let failed = false;
    if(planEditForm.task==="") {
      setPlanError('plan_name');
      Widget.showMessage("error", "Please enter plan name");
      setTimeout(() => {
        setPlanError(null)
      }, 3000);
      return;
    }
    if(planEditForm.duration.length===0) {
      Widget.showMessage("error", "Please add duration");
      return;
    }
    if(planEditForm.discription==="") {
      Widget.showMessage("error", "Please enter description");
      return;
    }
    const addPlan = await updatePlans(planEditForm,singleId);
    if(addPlan.data?.success===true) {
      navigate('/tasks')
    }
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
          <div className='d_f a_i_c'><label>Task Name :</label><Input status={planError === 'plan_name' ? 'error' : ''} value={planEditForm.task} label="Plan Name" placeholder="Plan Name" size='large' onChange={(e) => setPlanEditForm({ ...planEditForm, task: e.target.value })} className='plan_name' /></div>
          <div className='d_f a_i_c'><label>Duration :</label><Select maxTagCount={1} status={planError === 'product' ? 'error' : ''} label="Product" placeholder="Select Product" size='large' className='w_100' mode="single" options={[
              {
                value: '2:00',
                label: '2 Hours',
              },
              {
                value: '4:00',
                label: '4 Hours',
              },
              {
                value: '6:00',
                label: '6 Hours',
              }
          ]} onChange={(e) => setPlanEditForm({ ...planEditForm, duration: e })} value={planEditForm.duration} /></div>
        </div>
        <div className='divider'></div>
        <div className='description '>
          <label className='m_b_10 d_i_b'>Description :</label>
          <ReactQuill
            placeholder="Enter Description"
            theme="snow"
            modules={modules}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "list",
              "bullet",
              "link",
              "color",
            ]}
            value={planEditForm.discription}
            onChange={(value) => setPlanEditForm({ ...planEditForm, discription: value })}
          />
        </div>
        {
          planSingle.remarks && 
          <div className='d_f a_i_c' style={{margin:"20px 0px"}}>
            <label>Remarks :</label>
            <div className='w_100'>{planSingle.remarks}</div>
          </div>
        }
        <Button type="primary" htmlType="button" className='m_t_20' onClick={() => addPlanHandler(planEditForm)} size='large' loading={planLoader.update}>Update</Button>
      </div>
    </AddPlansSection>
  )
}

export default EditPlans;


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