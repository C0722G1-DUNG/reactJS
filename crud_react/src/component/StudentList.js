import * as StudentService from "./../service/StudentService"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const StudentList =()=>{
    const [studentList,setStudentList] = useState([]);
    const [student, setStudent] = useState({});

    const deleteStudent = async () => {
      await StudentService.deleteStudent(student.id).then(
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'xóa thành công ',
          showConfirmButton: false,
          timer: 2000
      })
      );
      getStudentList();
    }
    const getStudentList = async () => {
      const studentServiceList = await StudentService.getAll();
      setStudentList(studentServiceList);
  }
    useEffect(()=>{
        getStudentList();
    },[]);
    return(
      <>
     <div>
      <Link to="student/create" className="btn btn-success">Thêm mới(+)</Link>
     </div>
<table class="table">
  <thead>
    <tr>
      <th scope="col">STT</th>
      <th scope="col">Họ và tên</th>
      <th scope="col">Tuổi</th>
      <th scope="col">Lớp</th>
      <th scope="col">Xóa</th>
      <th scope="col">Cập nhật</th>
    </tr>
  </thead>
  <tbody>
    {studentList.map((iteam,index)=>(
 <tr key={index}>
 <th scope="row">{index+1}</th>
 <td>{iteam.name}</td>
 <td>{iteam.age}</td>
 <td>{iteam.class.className}</td>
 <td>
 <button type="button" class="btn btn-danger" onClick={() => setStudent(iteam)} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Xóa
</button>
 </td>
 <td>
 <Link to={`/student/update/${iteam.id}`} className="btn btn-primary">Cập nhật</Link>
 </td>
</tr>
    ))}
  </tbody>
</table>
{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Ban co muon xoa {student.name}</p>  
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
        <button type="button" onClick={() => deleteStudent()} className="btn btn-primary" data-bs-dismiss="modal" >Xóa</button>
      </div>
    </div>
  </div>
</div>
</>
    );
}
export default StudentList;