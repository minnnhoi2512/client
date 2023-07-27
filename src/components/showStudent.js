import React, { useState, useEffect } from 'react';
import { getAllGrades } from "../helper/gradeHelper";
import { getStudentInGrade, kickStudent } from "../helper/helper";


// Code 3: Trang showStudent.jsx


import { useNavigate, useParams } from 'react-router-dom';


function ShowStudent() {

  const { gradeId } = useParams();
  const [students, setStudents] = useState([]);
  const [grade, setGrade] = useState([]);
  const navigate = useNavigate();
  const getStudentData = async () => {
    try {
      const studentData = await getStudentInGrade(gradeId);
      setStudents(studentData); // Cập nhật danh sách sinh viên
    } catch (error) {
      console.error(error);
    }
  };
  const getGradeData = async () => {
    try {
      const gradeData = await getAllGrades();
      const selectedGrade = gradeData.find((grade) => grade._id === gradeId);
      setGrade(selectedGrade);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // Gọi API để lấy danh sách sinh viên dựa trên gradeId
    getStudentData();
    getGradeData();
  }, []);
  const getGradeName = (gradeId) => {
    const gradeName = grade.find((gradeName) => gradeName._id === gradeId);
    return gradeName ? gradeName.gradeName : "";
  };
  const handleDelete = async (event, id) => {
    event.currentTarget.disabled = true;
    try {
      await kickStudent(id);
      getStudentData();
      getGradeData();
      navigate(`/showStudent/${gradeId}`)
    } catch (error) {
      console.error(error)
    }
  }
  return (


    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Student List</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Actions</th>

            </tr>
          </thead>
          <tbody>
            {students.map((student,index) => (
              <tr key={student._id}>
                <td className="border px-4 py-2">{index+1}</td>
                <td className="border px-4 py-2">{student.fullName}</td>
                <td className="border px-4 py-2">{student.email}</td>
                <td className="border px-4 py-2">{student.address}</td>
                <td className="border px-4 py-2">{student.phone}</td>
                <td className="border px-4 py-2"> <button
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                  onClick={(event) => handleDelete(event, student._id)}
                >
                  Kick
                </button></td>
                {/* <td className="border px-4 py-2">{student.roleId}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShowStudent;