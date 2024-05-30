import React, { useState } from 'react';
import API from '../../ApiService/ApiService';
import Context from './index';
import Widget from '../../Helpers/Widget';


const PlansProvider = (props) => {
  const api = new API();
  const [tableFilter, setTableFilter] = useState({
    name: '',
    page: 1,
    limit: 10
  })
  const [planLoader, setPlanLoader] = useState({
    list: false,
    add: false,
    edit: false,
    update: false,
    delete: false,
    single: false,
    category: false,
  });
  const [planCategoryList, setPlanCategoryList] = useState([]);
  const [planError, setPlanError] = useState(null);
  const [planList, setPlanList] = useState([]);
  const [planSingle, setPlanSingle] = useState({});
  const [singleId, setSingleId] = useState(null);
  const [openViewPopup, setOpenViewPopup] = useState(false);
  const [onActivePlan, setOnActivePlan] = useState(false);
  const [planAddForm, setPlanAddForm] = useState({
      task:"",
      duration:"",
      description:"",
  });
  const [planEditForm, setPlanEditForm] = useState({
    task:"",
    duration:"",
    discription:"",
  });

  const fetchPlanMaster = async () => {
    setPlanLoader((prev)=>({
      ...prev,
      list: true
    }))
    localStorage.getItem("api_var_login") &&
      api.getAll("tasks",{...tableFilter},(err, res) => {
        if (res) {
          setPlanList(res?.data?.data);
        } else {
          setPlanList([]);
        }
        setPlanLoader((prev)=>({
          ...prev,
          list: false
        }))
      })
      
  }

  const addPlans = async (data) => {
    setPlanLoader({
      ...planLoader,
      add: true
    })
    const form_data = new FormData();
    form_data.append("task", data?.task || "");
    form_data.append("duration", data?.duration || "");
    form_data.append("description", data?.description || "");
    form_data.append("sessionId", localStorage.getItem("api_var_sid"));
    
    const res = localStorage.getItem("api_var_login") &&
      api.create("tasks/addtask", form_data, (err, res) => {
        if(res) {
          Widget.showMessage("success", res?.data?.message);
          setPlanAddForm({
            ...planAddForm,
              task:"",
              duration:"",
              description:"",
          })
        } else {
          Widget.showMessage("error", err?.response?.data?.message);
        }
        setPlanLoader({
          ...planLoader,
          add: false
        })
      })
   
    return res
  }

  const getSinglePLan = async (id) => {
    setPlanLoader({
      ...planLoader,
      single: true
    })
    const res = localStorage.getItem("api_var_login") &&
      api.getSingle("tasks", id, (err, res) => {
        if(res) {
          setPlanSingle(res?.data?.data);
          setPlanEditForm({...res?.data?.data});
          setSingleId(res?.data?.data?.id);
          setOnActivePlan(res?.data?.data?.status===1?true:false);
        } else {
          // setPlanSingle({});
          // setPlanEditForm({
          //   task:"",
          //   duration:"",
          //   description:"",
          // });
          // setSingleId(null);
          // Widget.showMessage("error", err?.response?.data?.message);
        }
        setPlanLoader({
          ...planLoader,
          single: false
        })
      })
    
    return res
  }


  const updatePlans = async (data,id) => {
    setPlanLoader({
      ...planLoader,
      update: true
    })
    const form_data = new FormData();
    form_data.append("task", data?.task || "");
    form_data.append("duration", data?.duration || "");
    form_data.append("discription", data?.discription || "");
    form_data.append("sessionId", localStorage.getItem("api_var_sid"));
    const res = localStorage.getItem("api_var_login") &&
      api.update("tasks/update/", id, form_data, (err, res) => {
        if(res) {
          Widget.showMessage("success", res?.data?.message);
          setPlanEditForm({
            ...planEditForm,
            task:"",
            duration:"",
            discription:"",
          })
        } else {
          Widget.showMessage("error", err?.response?.data?.message);
        }
        setPlanLoader({
          ...planLoader,
          update: false
        })
      })
    
    return res
  }

  const statusUpdate = async (status=null,id=null,review="") => {
    console.log(status,id)
    if(!id) {
      Widget.showMessage("error", "ID is required");
      return;
    }
    if(status===null || status==="" || status===undefined) {
      Widget.showMessage("error", "Status is required");
      return;
    }
    const res =
    localStorage.getItem("api_var_login") &&
      api.update("tasks/status", id, {status:status,sessionId:localStorage.getItem("api_var_sid"),review:review}, (err, res) => {
        if(res) {
          setPlanSingle((prev) => ({
            ...prev,
            status: res?.data?.data?.status
          }));
          Widget.showMessage("success", res?.data?.message);
          fetchPlanMaster();
        } else {
          Widget.showMessage("error", err?.response?.data?.message);
        }
      })
    return res
  }


   return (
    <Context.Provider value={{
      ...props,
      planLoader, 
      setPlanLoader,
      planAddForm, 
      setPlanAddForm,
      planCategoryList,
      setPlanCategoryList,
      planError, 
      setPlanError,
      addPlans,
      planList, 
      setPlanList,
      fetchPlanMaster,
      tableFilter, 
      setTableFilter,
      planEditForm, 
      setPlanEditForm,
      planSingle, 
      setPlanSingle,
      singleId, 
      setSingleId,
      getSinglePLan,
      updatePlans,
      openViewPopup, 
      setOpenViewPopup,
      statusUpdate,
      onActivePlan, 
      setOnActivePlan
    }}>
      {props.children}
    </Context.Provider>
   ) 
};

export default PlansProvider;