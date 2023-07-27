import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookingOfUser, deleteBooking, setPaymentStatus } from '../helper/bookingHelper';
import { getUser } from '../helper/helper';

import { getAllCourses } from '../helper/courseHelper';
import { getAllGrades, getGradeById } from '../helper/gradeHelper';
// import useFetch from '../hooks/fetch.hook';


export default function BookingForCustomer() {
    let roleId = localStorage.getItem('roleId');
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('id');
    let username = localStorage.getItem('username');
    let navigate = useNavigate();
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const [course, setCourse] = useState([]);
    const [grade, setGrade] = useState([]);
    // const [{ apiData  }] = useFetch();
    async function fetchData(userId) {
        let query = { 'username': username }
        let booking = await getBookingOfUser(userId);
        let user = await getUser(query);
        let course = await getAllCourses();
        setData(booking.data);
        let grade = await getAllGrades();
        // console.log(grade.data[0]);
        setUser(user.data);
        setCourse(course.data);
        setGrade(grade.data);

        // console.log(booking.data[0]);
        console.log(data[0].grade);
        console.log(grade)

    }
    const handleDelete = async (event, id) => {
        event.currentTarget.disabled = true;
        try {
            await deleteBooking(id);
            let dataPromise = fetchData(userId);
            toast.promise(dataPromise, {
                loading: 'Loading...',
                success: <b>Successfully...!</b>,
                error: <b>Failed !!!</b>
            })
            dataPromise.then(function () { navigate('/bookingForCustomer') }).catch(error => {
                console.error(error);
            });
        } catch (error) {
            console.error(error)
        }
    }
    const setPayment = async (event, id) => {
        event.currentTarget.disabled = true;
        // event.preventDefault()
        try {
            await setPaymentStatus(id); // Call your update function to update the user data

            let dataPromise = fetchData(userId);
            toast.promise(dataPromise, {
                loading: 'Loading...',
                success: <b>Successfully...!</b>,
                error: <b>Failed !!!</b>
            })
            dataPromise.then(function () { navigate('/bookingForCustomer') }).catch(error => {
                console.error(error);
            });
        } catch (error) {
            console.error(error);
        }
    }
    function showPayment(payment) {
        if (!payment) return 'Cash'
        else return 'PayPal'
    }
    function showStatus(status) {
        if (status == -1) return 'Rejected'
        else if (status == 0) return 'Waiting'
        else if (status == 1) return 'Accepted'
    }
    function returnGrade(booking, grade) {
        for (var i = 0; i < grade.length; i++) {
            if (grade[i]._id == booking.grade) {
                let gradeName = grade[i].gradeName;
                return gradeName;
            }
        }
    }
    function returnCourseId(booking, grade) {
            for (let a = 0; a < grade.length; a++) {
                if (booking.grade == grade[a]._id) {
                    let courseId = grade[a].course;
                    return courseId;
                }
            }

        }
    
    function returnCourseName(booking, grade, course) {
        for (let i = 0; i < course.length; i++) {
            if (returnCourseId(booking, grade) == course[i]._id) return course[i].courseName;
        }

    }
    function returnCoursePrice(booking, grade, course) {
        for (let i = 0; i < course.length; i++) {
            if (returnCourseId(booking, grade) == course[i]._id) return course[i].price;
        }

    }

    useEffect(() => {
        // useFetch();

        if (roleId > 2) {
            navigate('*');
        } else if (token == null) {
            navigate('*');
        } else {
            let dataPromise = fetchData(userId);

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
                            <td className='px-6 py-4'>{returnGrade(booking, grade)}</td>
                            <td className='px-6 py-4'>{returnCourseName(booking, grade, course)}</td>
                            <td className='px-6 py-4'>{returnCoursePrice(booking, grade, course)}</td>
                            <td className='px-6 py-4'>{showPayment(booking.payment)}</td>
                            <td className='px-6 py-4'>{booking.createdAt}</td>
                            <td className='px-6 py-4'>{showStatus(booking.isAccepted)}</td>
                            <td className='px-6 py-4'>
                                {!booking.payment && booking.isAccepted == 0 &&
                                    <button
                                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2'
                                        onClick={(event) => setPayment(event, booking._id)}
                                    >
                                        PayPal
                                    </button>
                                }

                                {!booking.isAccepted == 1 &&
                                    <button
                                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                        onClick={(event) => handleDelete(event, booking._id)}
                                    >
                                        Cancel
                                    </button>}

                                {booking.isAccepted == -1 &&
                                    <button
                                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                        onClick={(event) => handleDelete(event, booking._id)}
                                    >
                                        Cancel
                                    </button>}

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}