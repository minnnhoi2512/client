import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react'

export const URL_API = 'http://localhost:8080' ;
var shiftArray =[];
export const shift = ["06:00:00-07:00:00","07:00:00-08:00:00","17:00:00-18:00:00","18:00:00-19:00:00"];

export default function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
export const notification = 'dab31fb0-0078-490b-a76f-e4142948ca8a'
// export default function ConstDefine() {
//     const [shiftpost,setShiftPost] = useState([]);
//     useEffect(()=>{
//         axios.get('https://localhost:7096/api/Shift').then(r => setShiftPost(r.data)).catch(err => console.log(err));
        
//         shiftpost.forEach(item =>{
//             if(shift.length < shiftpost.length)
//             shift.push(`${filterTime(item.timeStart)}-${filterTime(item.timeEnd)}`)
//            }
//            )
//     },[])
   
//     console.log(shift);
//     function filterTime(time){
//         const split = time.split("T");
//         let value = split[1];
//         return value;
//       }
//   return (
//     <div>
      
//     </div>
//   )
// }

