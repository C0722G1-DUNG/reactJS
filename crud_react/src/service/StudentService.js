import axios from "axios";
export const getAll = async() =>{
    const sutudentList = await axios.get("http://localhost:3000/student");
    return sutudentList.data;
}
export const createStudent = async(Student) =>{
     await axios.post("http://localhost:3000/student", Student);
}
export const deleteStudent = async(id) =>{
    await axios.delete("http://localhost:3000/student/"+id);
}
export const updateStudent = async(Student) =>{
    await axios.put("http://localhost:3000/student/"+ Student.id,Student);
}
export const findByIdStudent = async(id) =>{
  const sutudent =  await axios.get("http://localhost:3000/student/"+id);
  return sutudent
}
