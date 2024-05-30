import React, { useState } from 'react';
import API from '../../ApiService/ApiService';
import Context from './index';
import Widget from '../../Helpers/Widget';


const UserProvider = (props) => {
  const api = new API();
  const [tableFilter, setTableFilter] = useState({
    name: '',
    page: 1,
    limit: 10,
    sessionId: localStorage.getItem("api_var_sid")
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
      name:"",
      email:"",
      role:"",
      phone:"",
      password:"",
  });
  const [planEditForm, setPlanEditForm] = useState({
    name:"",
    email:"",
    role:"",
    phone:"",
  });

  const fetchPlanMaster = async () => {
    setPlanLoader((prev)=>({
      ...prev,
      list: true
    }))
    localStorage.getItem("api_var_login") &&
      api.getAll("users",{...tableFilter},(err, res) => {
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
    form_data.append("name", data?.name || "");
    form_data.append("email", data?.email || "");
    form_data.append("phone", data?.phone || "");    
    form_data.append("role", data?.role || "");    
    form_data.append("password", data?.password || "");  
    form_data.append("sessionId", localStorage.getItem("api_var_sid"));
    const res = localStorage.getItem("api_var_login") &&
      api.create("users/adduser", form_data, (err, res) => {
        if(res) {
          Widget.showMessage("success", res?.data?.message);
          setPlanAddForm({
            ...planAddForm,
            name:"",
            email:"",
            role:"",
            phone:"",
            password:"",
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
      api.getSingle("users", id, (err, res) => {
        if(res?.data?.status===200) {
          setPlanSingle(res?.data?.data);
          setPlanEditForm(res?.data?.data);
          setSingleId(res?.data?.data?.uid);
          setOnActivePlan(res?.data?.data?.status===1?true:false);
        } else {
          // setPlanSingle({});
          // setPlanEditForm({
          //   plan_name:"",
          //   category:[],
          //   product:[],
          //   plan_type:"",
          //   duration:[{
          //     amount:null,
          //     special_offer:null,
          //     recommended:false,
          //     year:null,
          //     month:null,
          //     day:null,
          //   }],
          //   description:"",
          // });
          setSingleId(null);
          Widget.showMessage("error", err?.response?.data?.message);
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
    form_data.append("name", data?.name || "");
    form_data.append("email", data?.email || "");
    form_data.append("phone", data?.phone || "");
    form_data.append("role", data?.role || "");
    form_data.append("sessionId", localStorage.getItem("api_var_sid"));

    const res = localStorage.getItem("api_var_login") &&
      api.update("users/update/", id, form_data, (err, res) => {
        if(res) {
          Widget.showMessage("success", res?.data?.message);
          setPlanEditForm({
            ...planEditForm,
            name:"",
            email:"",
            role:"",
            phone:"",
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

  const statusUpdate = async (status=null,id=null) => {
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
      api.update("plans/status", id, {status:status}, (err, res) => {
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

export default UserProvider;