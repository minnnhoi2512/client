import React, { useState, useEffect } from "react";
import { getCustomers, deleteUser, updateUser_1 } from "../helper/helper";
import { getAllGrades } from "../helper/gradeHelper";
import { useNavigate, Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
export default function ShowCustomers() {
  const [data, setData] = useState([]);
  const [updatedUserData, setUpdatedUserData] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [grades, setGrades] = useState([]);
  const navigate = useNavigate();
  const handleChange = (event) => {
    setUpdatedUserData({
      ...updatedUserData,
      [event.target.name]: event.target.value,
    });
  };
  let roleId = localStorage.getItem('roleId');
  let token = localStorage.getItem('token');

  const fetchData = async () => {
    const response = await getCustomers();
    const grades = await getAllGrades();
    setGrades(grades.data);
    setData(response.data);
  };
  useEffect(() => {
    if (roleId < 3) {
      navigate('*');
    } else if (token == null) {
      navigate('*');
    } else {
      let dataPromise = fetchData();
      toast.promise(dataPromise, {
        loading: 'Loading...',
        success: <b>Successfully...!</b>,
        error: <b>Failed !!!</b>
      })
      dataPromise.then(function () { navigate('/showCustomers') }).catch(error => {
        console.error(error);
      });
    }

  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      let dataPromise = fetchData();
      toast.promise(dataPromise, {
        loading: 'Loading...',
        success: <b>Successfully...!</b>,
        error: <b>Failed !!!</b>
      })
      dataPromise.then(function () { navigate('/showCustomers') }).catch(error => {
        console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (user) => {
    setUpdatedUserData(user);
    setShowModal(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await updateUser_1(updatedUserData._id, updatedUserData); // Call your update function to update the user data
      setShowModal(false);
      let dataPromise = fetchData();
      toast.promise(dataPromise, {
        loading: 'Loading...',
        success: <b>Successfully...!</b>,
        error: <b>Failed !!!</b>
      })
      dataPromise.then(function () { navigate('/showCustomers') }).catch(error => {
        console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (<div className='max-w-4x2' style={{marginLeft: '15rem'}}>
    
      <div className="container mx-10 px-5 py-10">
       
        
          <table className="mb-8 w-full overflow-hidden whitespace-nowrap rounded-lg bg-white shadow-sm">
            <thead>
              <tr className="text-left font-bold">
                <th className="px-6 pb-4 pt-5">Name</th>
                <th className="px-6 pb-4 pt-5">Email</th>
                <th className="px-6 pb-4 pt-5">Grade</th>
                <th className="px-6 pb-4 pt-5">Role</th>

                <th className="px-6 pb-4 pt-5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {grades.map((grade) => {
                      if (user.grade == grade._id) return grade.gradeName;
                    })}
                  </td>
                  <td className="px-6 py-4">{user.roleId}</td>
                  <td className="px-6 py-4">
                    <button
                      className="mr-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showModal ? (
            <>
              <div className="fixed inset-1  z-50 items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                <div className="relative mx-auto my-6 w-auto max-w-3xl">
                  {/*content*/}
                  <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                      <h3 className="text-3xl font-semibold">Update User</h3>
                      <button
                        className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <form>
                      <div className="mb-4">
                        <label className="mb-2 block font-bold text-gray-700">
                          Name:
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={updatedUserData.username}
                          onChange={handleChange}
                          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="mb-2 block font-bold text-gray-700">
                          Email:
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={updatedUserData.email}
                          onChange={handleChange}
                          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="mb-2 block font-bold text-gray-700">
                          Role:
                        </label>
                        <input
                          type="text"
                          name="role"
                          value={updatedUserData.roleId}
                          onChange={handleChange}
                          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                        <button
                          className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                          onClick={(event) => handleUpdate(event)}
                        >
                          Save Changes
                        </button>
                      </div>
                      {/* <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Update
                                    </button> */}
                    </form>
                    {/*footer*/}
                  </div>
                </div>
              </div>
              <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
            </>
          ) : null}
        </div>{" "}
      </div>
   
  );
}
