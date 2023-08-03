// import React from "react";
// import { ResponsiveBar } from "@nivo/bar";
// import { useState } from "react";
// import { API } from "../../../api/ConstDefine";
// import { useEffect } from "react";
// import axios from "axios";
// import { useTheme } from "@mui/material";
// import { getAdmins, getAllUser, getCustomers, getMentors, getStaffs } from "../../../helper/helper";

// // import {gender} from '../../../data/DataGender'
// const RoleChart = () => {

//   const [sum, setSum] = useState(0);
//   const [data, setData] = useState([]);
//   const roleColors = {
//     Customer: "#3498db", // Xanh lam đậm
//     Mentor: "#f1c40f", // Vàng
//     Staff: "#2ecc71", // Xanh lá
//     Admin: "#e74c3c", // Đỏ
//     Sum: "#95a5a6" // Xám nhạt
//   };
//   const [admin, setAdmin] = useState(['']);
//   const [staff, setStaff] = useState(0);
//   const [customer, setCustomer] = useState(0);
//   const [mentor, setMentor] = useState(0);
//   const [roleId,setRoleId] = useState();
//   // let data=[0];

//   async function fetchData() {
//     let query = { 'fullName': '', 'active': 1 }
//     let customer = await getCustomers(query)
//     let mentor = await getMentors(query)
//     let staff = await getStaffs(query)
//     let admin = await getAdmins(query)
//     let user = await getAllUser(query)
//      roleId.push({roleId:'Admin',number: admin.data.length})
//      roleId.push({roleId:'Staff',number: staff.data.length})
//      roleId.push({roleId:'Customer',number: customer.data.length})
//      roleId.push({roleId:'Mentor',number: mentor.data.length})
//      roleId.push({roleId:'User',number: user.data.length})
//   }

//   useEffect(() => {

//     fetchData();
//     console.log(admin)
//   }, []);
//   // const [userRole, setUserRole] = useState([]);
//   // let userAPI = API + ?fullName=&active=1;
//   // useEffect(()=>{
//   //     axios.get(userAPI).then(r => setUserRole(r.data)).catch(err => console.log(err));
//   // },[]);

//   // var male = 0;
//   // var role1 = 0;
//   // var role2 = 0;
//   // var role3 = 0;
//   // var role4 = 0;
//   // admin.forEach(us =>{
//   //     if(us.userRole === '1'){
//   //         role1 +=1;
//   //     }
//   //     if(us.userRole === '2'){
//   //         role2 +=1;
//   //     }
//   // })


//   // const roleId = [
//   //   { roleId: 'Admin', number:1 },
//   //   { roleId: 'Customer', number: 32 },
//   //   { roleId: 'Mentor', number: 5 },
//   //   { roleId: 'Staff', number: 9 },
//   //   { roleId: 'Sum', number: 47 },
//   // ]
//   // setRoleId(roleId);
//   return (
//     <div style={{ position: "relative", height: "100%", width: "100%" }}>
//       <h2 style={{ textAlign: 'center', padding: '8px', color: 'white' }}>
//         Gender ratio</h2>
//       <div className="gender-chart" style={{ position: "absolute", top: 0, height: "100%", width: "100%" }}>

//         <ResponsiveBar
//           data={roleId}
//           keys={["number"]}
//           indexBy="roleId"
//           margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
//           padding={0.25}
//           valueScale={{ type: 'linear' }}
//           indexScale={{ type: 'band', round: true }}
//           valueFormat=" <-0,~"
//           colors={({ id, data }) => roleColors[data.roleId]}
//           theme={{

//             axis: {
//               legend: {
//                 text: {
//                   fill: "white",
//                 }
//               },
//               ticks: {
//                 line: {
//                   stroke: "white",
//                   strokeWidth: 1
//                 },
//                 text: {
//                   fontSize: 11,
//                   fill: "white",
//                   outlineWidth: 0,
//                   outlineColor: "transparent"
//                 }
//               }
//             }
//           }}
//           defs={[
//             {
//               id: 'dots',
//               type: 'patternDots',
//               background: 'inherit',
//               color: '#38bcb2',
//               size: 4,
//               padding: 1,
//               stagger: true
//             },
//             {
//               id: 'lines',
//               type: 'patternLines',
//               background: 'inherit',
//               color: '#eed312',
//               rotation: -45,
//               lineWidth: 6,
//               spacing: 10
//             }
//           ]}

//           borderColor={{
//             from: 'color',
//             modifiers: [
//               [
//                 'darker',
//                 '1.8'
//               ]
//             ]
//           }}
//           axisTop={null}
//           axisRight={null}

//           axisLeft={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: 'Number',
//             legendPosition: 'middle',
//             legendOffset: -40
//           }}
//           enableGridY={false}
//           labelSkipWidth={8}
//           labelSkipHeight={12}
//           labelTextColor={{
//             from: 'color',
//             modifiers: [
//               [
//                 'brighter',
//                 '3'
//               ]
//             ]
//           }}


//         />
//       </div>
//     </div>

//   )
// }
// export default RoleChart

import { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { getAdmins, getAllUser, getCustomers, getMentors, getStaffs } from "../../../helper/helper";

const RoleChart = () => {

  const roleColors = {
        Customer: "#3498db", // Xanh lam đậm
        Mentor: "#f1c40f", // Vàng
        Staff: "#2ecc71", // Xanh lá
        Admin: "#e74c3c", // Đỏ
        Sum: "#95a5a6" // Xám nhạt
      };
  // const fetchData = async () => {
  //   const admin = await getAdmins();
  //   const staff = await getStaffs(); 
  //   const customer = await getCustomers();   
  //   const mentor = await getMentors();  
    
  //   setRoleId([
  //     {
  //       roleId: "Admin",  
  //       number: admin.data.length
  //     },
  //     { 
  //       roleId: "Staff", 
  //       number: staff.data.length 
  //     },   
  //     {
  //       roleId: "Customer",      
  //       number: customer.data.length 
  //     },
  //     {
  //       roleId: "Mentor",      
  //       number: mentor.data.length       
  //     }  
  //   ]);   
  // };
const roleId=[
  { roleId: 'Admin', number: 1 },
  { roleId: 'Staff', number: 2 },
  { roleId: 'Customer', number: 57},
  { roleId: 'Mentor', number: 5 },
  { roleId: 'Sum', number: 65 },
]

  // useEffect(() => {
  //   fetchData();
  // }, []);
  // const refreshData = () => {
  //   fetchData();  
  // };
  return (
        <div style={{ position: "relative", height: "100%", width: "100%" }}>
          <h2 style={{ textAlign: 'center', padding: '8px', color: 'white' }}>
            Role ratio</h2>
          <div className="gender-chart" style={{ position: "absolute", top: 0, height: "100%", width: "100%" }}>
    
            <ResponsiveBar
              data={roleId}
              keys={["number"]}
              indexBy="roleId"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.25}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              valueFormat=" <-0,~"
              colors={({ id, data }) => roleColors[data.roleId]}
              theme={{
    
                axis: {
                  legend: {
                    text: {
                      fill: "white",
                    }
                  },
                  ticks: {
                    line: {
                      stroke: "white",
                      strokeWidth: 1
                    },
                    text: {
                      fontSize: 11,
                      fill: "white",
                      outlineWidth: 0,
                      outlineColor: "transparent"
                    }
                  }
                }
              }}
              defs={[
                {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: '#38bcb2',
                  size: 4,
                  padding: 1,
                  stagger: true
                },
                {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: '#eed312',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
                }
              ]}
    
              borderColor={{
                from: 'color',
                modifiers: [
                  [
                    'darker',
                    '1.8'
                  ]
                ]
              }}
              axisTop={null}
              axisRight={null}
    
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Number',
                legendPosition: 'middle',
                legendOffset: -40
              }}
              enableGridY={false}
              labelSkipWidth={8}
              labelSkipHeight={12}
              labelTextColor={{
                from: 'color',
                modifiers: [
                  [
                    'brighter',
                    '3'
                  ]
                ]
              }}
    
    
            />
          </div>
        </div>
    
      )
    }
    export default RoleChart






// export default RoleChart