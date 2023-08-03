import React from "react";
import { ResponsiveLine } from '@nivo/line'
// import { DataLineChart } from "../../../data/DataLineChar";
// import { useEffect } from 'react';
// import axios from 'axios';
// import { URL_API } from "../../staff/components/ConstDefine";
import { useState,useEffect } from 'react';
import {getBookings} from "../../../helper/bookingHelper"
import {getAllCourses} from "../../../helper/courseHelper"
const LineChart = () => {
  const [revernue, setRevernue] = useState(0);
  // const [data, setData] = useState([]);
  useEffect(() => {
    fetchData()
  }

    , [])
  async function fetchData() {
    let query = { 'isAccepted': 1 }
    const response = await getBookings(query);
    // console.log(response.data)
    const course = await getAllCourses()
    //    console.log(course.data[0]._id)

    var revernue = 0;
    for (let i = 0; i < response.data.length; i++) {
      for (let k = 0; k < course.data.length; k++) {
        if (course.data[k]._id == response.data[i].grade.course) {
          revernue += course.data[k].price;
        }
      }
    }
    setRevernue(revernue)
  }
  function filterDay(day) {
    const split = day.split("T");
    let value = split[0];
    const split1 = value.split("-")
    let month = (new Date(value)).getMonth() + 1;
    return month;
  }
  var T1 = 0;
  var T2 = 5;
  var T3 = 7;
  var T4 = 2;
  var T5 = 6;
  var T6 = 10;
  var T7 = 3;
  var T8 = 4;
  var T9 = 10;
  var T10 = 15;
  var T11 = 13;
  var T12 = 12;
  Object.keys(revernue).forEach(revenue=>{
  if(filterDay(revenue.datePay) === 1){
      T1 += revenue.totalPay
  }
  else 
  if(filterDay(revenue.datePay) === 2){
      T2 += revenue.totalPay
  } 
  else 
  if(filterDay(revenue.datePay) === 3){
      T3 += revenue.totalPay
  }
  else 
  if(filterDay(revenue.datePay) === 4){
      T4 += revenue.totalPay
  } 
  else 
  if(filterDay(revenue.datePay) === 5){
      T5 += revenue.totalPay
  } 
  else 
  if(filterDay(revenue.datePay) === 6){
      T6 += revenue.totalPay
  } 
  else 
  if(filterDay(revenue.datePay) === 7){
      T7 += revenue.totalPay
  } 
  else 
  if(filterDay(revenue.datePay) === 8){
      T8 += revenue.totalPay
  } 
  else 
  if(filterDay(revenue.datePay) === 9){
      T9 += revenue.totalPay
  } 
  else 
  if(filterDay(revenue.datePay) === 10){
      T10 += revenue.totalPay
  }  
  else 
  if(filterDay(revenue.datePay) === 11){
      T11 += revenue.totalPay
  }
  else 
  if(filterDay(revenue.datePay) === 12){
      T12 += revenue.totalPay
  }
  })
  console.log(T8);
  const DataLineChart = [
    {
      "id": "revenue",
      "color": "hsl(296, 70%, 50%)",
      "data": [
        {
          "x": "Jan",
          "y": T1
        },
        {
          "x": "Fer",
          "y": T2
        },
        {
          "x": "Mar",
          "y": T3
        },
        {
          "x": "Apr",
          "y": T4
        },
        {
          "x": "May",
          "y": T5
        },
        {
          "x": "Jun",
          "y": T6
        },
        {
          "x": "Jul",
          "y": T7
        },
        {
          "x": "Aug",
          "y": T8
        },
        {
          "x": "Sep",
          "y": T9
        },
        {
          "x": "Oct",
          "y": T10
        },
        {
          "x": "Nov",
          "y": T11
        },
        {
          "x": "Dec",
          "y": T12
        }
      ]
    },
  ]
  //     const theme = useTheme()
  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <h2 style={{ textAlign: 'center', padding: '8px', color: 'white' }}>Monthly revenue</h2>
      <div style={{ position: "absolute", top: 0, height: "100%", width: "100%" }}>
        <ResponsiveLine
          data={DataLineChart}
          margin={{ top: 50, right: 110, bottom: 50, left: 90 }}
          theme={{
            legends: {
              text: {

                fill: "white"
              }
            },

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
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
          }}
          yFormat=" >-.2f"
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Month',
            legendOffset: 36,
            legendPosition: 'middle'
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Million Dong',
            legendOffset: -60,
            legendPosition: 'middle'
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={2}
          colors="#9ba9e5"
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}

          pointLabelYOffset={-12}
          areaOpacity={0.65}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
      </div>
    </div>
  )
}
export default LineChart