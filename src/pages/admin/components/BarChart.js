import { ResponsiveBar } from '@nivo/bar';
import { useState } from 'react';
import { useTheme } from '@mui/material';
import { URL_API } from './ConstDefine';
// import { dataBarChart } from '../../../data/ListOfDashboard';
import { useEffect } from 'react';
import axios from 'axios';


const BarChart = () =>{
  const [data,setData] = useState([]);
  // const [revenue,setRevenue] = useState([]);
  // const invoiceAPI = URL_API +`Invoice`;
  // useEffect(()=>{
  //   axios.get(invoiceAPI).then(r=>setInvoice(r.data)).catch(err=>console.log(err));
  // },[]);
  // function filterDay(day){
  //   const split = day.split("T");
  //   let value = split[0];
  //   const split1 = value.split("-")
  //   let month = (new Date(value)).getMonth()+1;
  //   return month;
  // }
  // var revernueQ1 = 0;
  // var revernueQ2 = 0;
  // var revernueQ3 = 0;
  // var revernueQ4 = 0;
  // invoice.forEach(invoice=>{
  //   if(filterDay(invoice.datePay) === 1 || filterDay(invoice.datePay) === 2||filterDay(invoice.datePay) === 3){
  //     revernueQ1 += invoice.totalPay
  //   }
  //   else 
  //   if(filterDay(invoice.datePay) === 4 || filterDay(invoice.datePay) === 5||filterDay(invoice.datePay) === 6){
  //     revernueQ2 += invoice.totalPay
  //   } 
  //   else 
  //   if(filterDay(invoice.datePay) === 7 || filterDay(invoice.datePay) === 8||filterDay(invoice.datePay) === 9){
  //     revernueQ3 += invoice.totalPay
  //   } 
  //   else 
  //   if(filterDay(invoice.datePay) === 10 || filterDay(invoice.datePay) === 11||filterDay(invoice.datePay) === 12){
  //     revernueQ4 += invoice.totalPay
  //   }
  // })
  const dataBarChart =[
    {
        quarterly : "1",
        revenue: 60,
       
      },
      {
        quarterly : "2",
        revenue: 100,
      },
      {
        quarterly : "3",
        revenue: 30,
      },
      {
        quarterly : "4",
        revenue: 200,
      }
    
  ];
  // const theme = useTheme()
    return (
        <div style={{  position:"relative", height: "100%", width: "100%" }}>
          <h2 style={{ textAlign: 'center', padding: '8px',color:'white'}}>Quarterly revenue</h2>
          <div style={{ position: "absolute", top: 0, height: "100%", width: "100%" }}>
            <ResponsiveBar
             
              data={dataBarChart}
              theme={{
                legends:{
                  text:{
                
                  fill:"white"
                 }
                  },
                
                axis:{
                  legend:{
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
              
           
              keys={["revenue"]}
              indexBy="quarterly"
              margin={{ top: 60, right: 130, bottom: 50, left: 80 }}
              padding={0.5}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors="#9ba9e5"
              borderWidth={1}
           
              borderColor="#526d8299"
  
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Quarterly ",
                legendPosition: "middle",
                legendOffset: 36,
              }}
              axisLeft={{
                
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Revenue (Hundred million dong)",
                legendPosition: "middle",
                legendOffset: -60,
              
              }}
              enableGridY={false}
              labelSkipWidth={12}
              labelSkipHeight={12}
             
              labelTextColor="white"
            

              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 90,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                 
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                 text:{
                  fill:"white"
                 }
                
                },
              ]}
            />
          </div>
      </div>
      );
    };
export default BarChart

// import React from "react";
// import Course from "../../../components/Course1/Course";

// function Barchart() {
// return(
//   // <Course/>
//   <div>Muốn show j </div>
// )
// };
// export default Barchart;