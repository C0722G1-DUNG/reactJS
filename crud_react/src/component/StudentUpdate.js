import React from "react";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import * as StudentService from "./../service/StudentService"
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
const StudentUpdate =() =>{
    const [student, setStudent] = useState({});
    const{id} = useParams();
    const navigate = useNavigate()
    const FindById = async () => {
        const student = await StudentService.findByIdStudent(id);
        console.log(student.data);
        setStudent(student.data);
    }
    // const update = async() =>{
    //     await StudentService.updateStudent(student);
    // }
    useEffect(()=>{
     FindById()
    },[]);
    const formik = useFormik({
        initialValues: {
            id: student.id,
          name: student.name,
          age: student.age
        },
        validationSchema: Yup.object({
          name: Yup.string().min(5,"nhập ít nhất 5 ký tự").required("không được để trống"),
          age: Yup.number().required("không được để trống").min(18,"phải lớn hơn 18 tuổi")
        }),
    enableReinitialize: true,
        onSubmit: (values) =>{
         const save = async () =>{
          await StudentService.updateStudent(values).then(
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'cập nhật thành công ',
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
        <h1>cập nhật học sinh</h1>
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
  <input type="submit" value="Cập nhật"></input>
</form>
        </>
    )
}
export default StudentUpdate;