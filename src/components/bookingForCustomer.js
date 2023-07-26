import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookingOfUser } from '../helper/bookingHelper';
import { getUser } from '../helper/helper';

import { getAllCourses } from '../helper/courseHelper';
import { getAllGrades, getGradeById } from '../helper/gradeHelper';
// import useFetch from '../hooks/fetch.hook';


export default function BookingForCustomer() {
    let roleId = localStorage.getItem('roleId');
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('id');
    let username = localStorage.getItem('username');
    let navigate = useNavigate();
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const [course, setCourse] = useState([]);
    const [grade, setGrade] = useState([]);
    // const [{ apiData  }] = useFetch();
    async function fetchData(id) {
        let query = { 'username': username }
        let booking = await getBookingOfUser(id);
        let user = await getUser(query);
        let course = await getAllCourses();
        setData(booking.data);
        let grade = await getGradeById(booking.data[0].grade);
        // console.log(grade.data[0]);
        setUser(user.data);
        setCourse(course.data);
        setGrade(grade.data[0]);
        
        // console.log(booking.data[0]);
        console.log(course);
        

    }
    function showPayment(payment){
        if(!payment) return 'Cash'
        else return 'Online'
    }
    function showStatus(status) {
        if (status == -1) return 'Rejected'
        else if (status == 0) return 'Waiting'
        else if (status == 1) return 'Accepted'
    }
    useEffect(() => {
        // useFetch();

        if (roleId > 2) {
            navigate('*');
        } else if (token == null) {
            navigate('*');
        } else {
            let dataPromise = fetchData(id);

            dataPromise.then(function () { navigate('/bookingForCustomer') }).catch(error => {
                console.error(error);
            });
        }
    }, []);
    return (
        <div class="">
            <table className='w-full whitespace-nowrap bg-white overflow-hidden rounded-lg shadow-sm mb-8'>
                <thead>
                    <tr className='text-left font-bold'>
                        <th className='px-6 pt-5 pb-4'>Name</th>
                        <th className='px-6 pt-5 pb-4'>Grade</th>
                        <th className='px-6 pt-5 pb-4'>Course</th>
                        <th className='px-6 pt-5 pb-4'>Price</th>
                        <th className='px-6 pt-5 pb-4'>Payment</th>
                        <th className='px-6 pt-5 pb-4'>Created At</th>
                        <th className='px-6 pt-5 pb-4'>Status</th>
                        <th className='px-6 pt-5 pb-4'>Actions</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                    {data.map((booking) => (
                        <tr key={booking._id}>
                            <td className='px-6 py-4'>{user.fullName}</td>
                            <td className='px-6 py-4'>{grade.gradeName}</td>
                            <td className='px-6 py-4'>{course.map((c)=>{
                                if (c._id == grade.course) return c.courseName;
                            })}</td>
                             <td className='px-6 py-4'>{course.map((c)=>{
                                if (c._id == grade.course) return c.price;
                            })}</td>
                            <td className='px-6 py-4'>{showPayment(booking.payment)}</td>
                            <td className='px-6 py-4'>{booking.createdAt}</td>
                            <td className='px-6 py-4'>{showStatus(booking.isAccepted)}</td>
                            <td>
                                <p>Pay</p>
                                <p>Cancel</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}