import React, { useState, useEffect } from 'react';
import { checkAttendance, getAllGrades, getGradeById } from "../helper/gradeHelper";
import { getStudentInGrade, kickStudent } from "../helper/helper";


// Code 3: Trang showStudent.jsx
import avatar from '../assets/profile.png';

import { Link, useNavigate, useParams } from 'react-router-dom';


function Attendance() {

    const [attendanceDisabled, setAttendanceDisabled] = useState(false);
    const [absentDisabled, setAbsentDisabled] = useState(false);
    const { gradeId } = useParams();
    const [students, setStudents] = useState([]);
    const [grade, setGrade] = useState('');
    const navigate = useNavigate();
    const [clickedStatus, setClickedStatus] = useState({});
    const getStudentData = async () => {
        try {
            const studentData = await getStudentInGrade(gradeId);
            setStudents(studentData); // Cập nhật danh sách sinh viên
        } catch (error) {
            console.error(error);
        }
    };
    const [grades, setGrades] = useState([]);
    const getGradeData = async () => {
        try {
            const gradeData = await getAllGrades();
            const grade = await getGradeById(gradeId);
            setGrade(grade.data)
            setGrades(gradeData.data)
        } catch (error) {
            console.error(error);
        }
    };
    async function findGrade(grades, id) {
        for (let i = 0; i < grades.length; i++) {
            if (grades[i]._id == id) return await grades[i].gradeName;
        }
    }
    let roleId = localStorage.getItem('roleId');
    let token = localStorage.getItem('token');
    useEffect(() => {
        if (roleId < 2) {
            navigate('*');
        } else if (token == null) {
            navigate('*');
        } else {
            getStudentData().catch((error) => console.log(error));
            getGradeData().catch((error) => console.log(error));
            // console.log(await findGrade(grades,gradeId))
            // console.log(grades[4]._id == gradeId) 
            // console.log(gradeId)
        }
        // Gọi API để lấy danh sách sinh viên dựa trên gradeId

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
            navigate(`/attendance/${gradeId}`)
        } catch (error) {
            console.error(error)
        }
    }
    const handleAttendance = async (event, id) => {
        try {
            let query = { 'grade': gradeId, 'user': id, 'date': Date.now(), 'isAttended': 1 }
            console.log(query)
            await checkAttendance(query);
            document.querySelector('#absent').disabled = true;
            setClickedStatus((prevState) => ({
                ...prevState,
                [id]: true,
            }));
        } catch (error) {
            console.error(error)
        }
    }

    const handleAbsent = async (event, id) => {
        try {
            let query = { 'grade': gradeId, 'user': id, 'date': Date.now(), 'isAttended': 0 }
            // console.log(query)
            await checkAttendance(query);
            console.log(document.getElementById("absent").disabled = true)
            setClickedStatus((prevState) => ({
                ...prevState,
                [id]: true,
            }));
        } catch (error) {
            console.error(error)
        }
    }
    return (


        <div className="container grid grid-cols-6">
            <div className='col-span-1'></div>
            <div className='col-span-5'><h1 className="text-3xl font-bold mb-4 text-blue-700 mt-8">Student List - Class : {grade.gradeName}</h1>
                <div>{roleId >= 3 && <td className=' bg-blue-500 text-white ' ><Link to={`/grade`}>Back</Link></td>}</div>
                <div>{roleId == 2 && <td className=' bg-blue-500 text-white' ><Link to={`/scheduleMentor`}>Back</Link></td>}</div>

                <div className="overflow-x-auto mt-8">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">No</th>
                                <th className="px-4 py-2 border">Name</th>
                                <th className="px-4 py-2 border">Profile</th>

                                <th className="px-4 py-2 border">Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={student._id}>
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2 text-center">{student.fullName}</td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <img className="rounded-full w-32 h-32 border-2 border-gray-300 shadow-md hover:scale-105 transition-transform duration-300" src={student.profile || avatar} alt='profile' />
                                        </div>
                                    </td>
                                    <td className="border px-4 py-2" style={{ maxWidth: '100px' }}>
                                        {!clickedStatus[student._id] && roleId == 2 && (
                                            <div className="flex space-x-4">
                                                <button
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={(event) => handleAttendance(event, student._id)}
                                                    id="attendance"
                                                >
                                                    Attendance
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={(event) => handleAbsent(event, student._id)}
                                                    id="absent"
                                                >
                                                    Absent
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    {/* <td className="border px-4 py-2">{student.roleId}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={() => window.location.reload()}
                    >
                        Refresh
                    </button>
                </div></div>


        </div>
    );
}

export default Attendance;