import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import {getBookings} from "../../../helper/bookingHelper"
import {getAllCourses} from "../../../helper/courseHelper"
import { getAllUser } from "../../../helper/helper";
import { getAllGrades} from "../../../helper/gradeHelper"

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SchoolIcon from '@mui/icons-material/School';

import StatBox from "./StatBox"

import '../css/Dashboard.css'
import BarChart from "./BarChart.js";
import PieChart from "./PieChart.js";
import RoleChart from "./RoleChart";
import LineChart from "./LineChart";

import axios from "axios";
import { DesktopDatePicker } from "@mui/x-date-pickers";

var month = (new Date).getMonth()+1;
export default function Dashboard(){
    const[revernue,setRevernue]=useState(0);
    // const[user,setUser]=useState();
    const[total,setTotal] = useState();
    const[totalgrade,setTotalgrades] = useState();

    useEffect(()=>{
        fetchData()
    }
     
   ,[] )
   async function fetchData(){
    let query = { 'isAccepted': 1}
        const response = await getBookings(query);
// console.log(response.data)
    const course = await getAllCourses()
//    console.log(course.data[0]._id)
   
    var revernue = 0;
    for (let i=0; i < response.data.length; i++) {
       for (let k =0; k < course.data.length; k++) {
        if (course.data[k]._id == response.data[i].grade.course) {
           revernue += course.data[k].price;
        }
       }
    }
    
    const users = await getAllUser({ 'fullName': '', 'active': 1 })  
    let total = users.data.length;

    const grade = await getAllGrades({ 'active': 1, 'fullName': '' })
    let totalgrade = grade.data.length;

setTotalgrades(totalgrade)
    console.log(totalgrade)
    setTotal(total)
    console.log(total)
   setRevernue(revernue)

    
   }
      ///TotalStudent Box
    //   var totalUser = 0;
    //   user.forEach(student=>{
    //       totalUser += 1;
    //   })
  ///Filter
  function filterDay(day){
    const split = day.split("T");
    let value = split[0];
    const split1 = value.split("-")
    let month = (new Date(value)).getMonth()+1;
    return month;
}

    return(
        <div className="dashboard">
        {/* <BarChart/> */}

            <div className="box-dashboard">
                <h1 style={{color:'white',marginBottom:'15px',letterSpacing:'1px',fontSize:'3rem'}}>Dashboard</h1>
                <Box display="grid" gridTemplateColumns="repeat(12,1fr)" gridAutoRows="140px" gap="30px">

                
                    <Box
                    gridColumn="span 3"
                    backgroundColor="#3534346e"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    >
                    <StatBox
                        title={revernue+" USD"}
                        subtitle="Revenue"

                        progress={"0.23"}
                        increase={"+23%"}


                        icon={
                        <AttachMoneyIcon
                            sx={{ fontSize: "26px",color:"#9ba9e5" }}
                        />
                        }
                    />
                    </Box>
                    <Box
                    gridColumn="span 3"
                    backgroundColor="#3534346e"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    >
                    <StatBox
                        title={total}
                        subtitle="Total User"
                        progress="0.29"
                        increase="+21%"
                        icon={
                        <PointOfSaleIcon
                        sx={{ fontSize: "26px",color:"#9ba9e5" }}
                        />
                        }
                    />
                    </Box>
                    <Box
                    gridColumn="span 3"
                    backgroundColor="#3534346e"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    >
                    <StatBox
                        title={totalgrade}
                        subtitle="Total Class"
                        progress={"0.12"}
                        increase={"+"+"10%"}
                        icon={
                        <SchoolIcon
                        sx={{ fontSize: "26px",color:"#9ba9e5" }}
                        />
                        }
                    />
                    </Box>
                    <Box
                        gridColumn="span 3"
                        backgroundColor="#3534346e"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        >
                    <StatBox
                        title={5}
                        subtitle="Total Instuctor"
                        progress={"0.34"}
                        increase={"+"+"20%"}
                        icon={
                        <PersonSearchIcon
                        sx={{ fontSize: "26px",color:"#9ba9e5" }}
                        />
                        }
                    /> 
                     </Box>

                     <Box gridColumn="span 8" gridRow="span 2" backgroundColor="#3534346e">
                        <BarChart/> 
                     </Box> 
                    <Box gridColumn="span 4" gridRow="span 2" backgroundColor="#3534346e" >
                        <PieChart/>
                    </Box>
                     <Box gridColumn="span 8"  gridRow="span 2"  backgroundColor="#3534346e" >
                        <LineChart/>
                    </Box>
                    <Box gridColumn="span 4"  gridRow="span 2"  backgroundColor="#3534346e" >
                       <RoleChart/>
                    </Box> 


                </Box>
            </div>
        </div>
    )
}