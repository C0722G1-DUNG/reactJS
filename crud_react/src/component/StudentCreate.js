import React from "react";
import {Field, useFormik} from 'formik';
import * as Yup from 'yup';
import * as StudentService from "./../service/StudentService"
import * as ClassService from "./../service/ClassService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
const StudentCreate =() =>{
  const [classList,setClassList] = useState([]);
  const getClassList = async () => {
    const classServiceList = await ClassService.getAllClassList();
    setClassList(classServiceList);
}
useEffect(()=>{
  getClassList();
},[]);
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      class: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().min(5,"nhập ít nhất 5 ký tự").required("không được để trống"),
      age: Yup.number().required("không được để trống").min(18,"phải lớn hơn 18 tuổi"),
      class: Yup.string().required("không được để trống")
    }),
    onSubmit: (values) =>{
      values.class = JSON.parse(values.class)
     const save = async () =>{
      await StudentService.createStudent(values).then(
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'thêm mới thành công ',
          showConfirmButton: false,
          timer: 2000
      })
      )
      navigate("/");
     }
     save();
    }
  })
    return(
        <>
        <h1>thêm mới học sinh</h1>
        <form  onSubmit={formik.handleSubmit}>
  <div className="form-group" style={{height:'100px'}}>
    <input hidden   type="number" name="id" value={formik.values.id} onChange={formik.handleChange}></input>
    <label >Name</label>
    <input type="text" className="form-control" style={{width:'200px',marginLeft:'670px'}} placeholder="tên" name="name" value={formik.values.name} onChange={formik.handleChange}/>
    {formik.errors.name && formik.touched.name && (<p>{formik.errors.name}</p>)}
  </div>
  <div className="form-group" style={{height:'100px'}}>
    <label >Tuổi</label>
    <input type="number" className="form-control" style={{width:'200px',marginLeft:'670px'}} placeholder="tuổi" name="age" value={formik.values.age} onChange={formik.handleChange}/>
    {formik.errors.age && formik.touched.age && (<p>{formik.errors.age}</p>)}
  </div>
  <div className="form-group" style={{height:'100px'}}>
    <select name="class" value={formik.values.class} onChange={formik.handleChange}>
    <option value="">Không được để trống</option>
    {classList.map((iteam,index)=>(
        <option key={index} value={JSON.stringify(iteam)}>{iteam.className}</option>
      ))}
    </select>
    {formik.errors.class && formik.touched.class && (<p>{formik.errors.class}</p>)}
  </div>
  <input type="submit" value="Thêm mới"></input>
</form>
        </>
    )
}
export default StudentCreate;