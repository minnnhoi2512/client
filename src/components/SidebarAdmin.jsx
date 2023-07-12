import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";

import "../styles/Sidebar.css"
import { NavLink,useNavigate } from 'react-router-dom';

const Sidebar = ({children}) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();

    const roleId = localStorage.getItem('roleId');
    const isAdmin = roleId === '4';
    const isStaff = roleId === '3';
    const isMentor = roleId === '2';
  
    const menuItem=[
      {
        path: "/showAdmins",
        name: "Admin",
        icon: <FaUserAlt/>,
        visible: isAdmin
      },
      {
        path: "/showUser",
        name: "User",
        icon: <FaRegChartBar/>,
        visible: isAdmin
      },
      {
        path: "/showCustomers",
        name: "Customer",
        icon: <FaCommentAlt/>,
        visible: isAdmin || isStaff
      },
      {
        path: "/showMentors",
        name: "Mentor",
        icon: <FaShoppingBag/>,
        visible:  isAdmin || isStaff
      },
      {
        path: "/showStaffs",
        name: "Staff",
        icon: <FaThList/>,
        visible: isAdmin|| isStaff
      },
      {
        path: "/Booking",
        name: "Booking",
        icon: <FaThList/>,
        visible: isAdmin || isStaff
      },
      {
        path: "/blog",
        name: "Blog",
        icon: <FaThList/>,
        visible: isAdmin|| isStaff
      },
      {
        path: "/Course",
        name: "Course",
        icon: <FaThList/>,
        visible: isAdmin
      },
      {
        path: "/grade",
        name: "Grade",
        icon: <FaThList/>,
        visible: isMentor || isAdmin || isStaff
      },
    ];
    function userLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('roleId');
        navigate('/');
    }

    return (
        <div className="container">
            <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
                <div className="top_section">
                    <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Yoga Center</h1>
                    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                        <FaBars onClick={toggle}/>
                    </div>
                </div>
                {
                    menuItem.map((item, index) => {
                        if (!item.visible) {
                            return null;
                        }
                        return (
                            <NavLink to={item.path} key={index} className="link" activeclassName="active">
                                <div className="icon">{item.icon}</div>
                                <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                            </NavLink>
                        );
                    })
                }
                <div className="text-center py-4">
                    <span className='text-gray-500'> <button onClick={userLogout} className='text-red-500' to="/">Log out</button></span>
                </div>
            </div>
            <main>{children}</main>
        </div>
    );
};


export default Sidebar