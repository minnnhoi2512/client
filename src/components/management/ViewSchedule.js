import React,{useState,useEffect} from "react";
import { getUser } from "../../helper/helper";
import { useNavigate } from "react-router-dom";
const Schedule = () => {
  let username = localStorage.getItem('username');
  let token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [user,setUser] = useState([])
  async function fetchData(){
    let query = { 'username': username }
    let user = await getUser(query);
    setUser(user.data);
  }
  useEffect(() => {
   if (token == null) {
        navigate('*');
    } else {
        let dataPromise = fetchData();
        dataPromise.then(function () { navigate('/schedule') }).catch(error => {
            console.error(error);
        });
    }
}, []);
  return (<h1 className="text-center"><div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">Schedule</h1>
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-gray-200 p-4">
        <h2 class="text-lg font-bold mb-2">Monday</h2>
        <ul>
          <li class="mb-1">9:00 AM - Meeting</li>
          <li class="mb-1">11:00 AM - Presentation</li>
          <li class="mb-1">2:00 PM - Workshop</li>
        </ul>
      </div>
      <div class="bg-gray-200 p-4">
        <h2 class="text-lg font-bold mb-2">Tuesday</h2>
        <ul>
          <li class="mb-1">10:00 AM - Training</li>
          <li class="mb-1">1:00 PM - Lunch</li>
          <li class="mb-1">3:00 PM - Project Review</li>
        </ul>
      </div>
      <div class="bg-gray-200 p-4">
        <h2 class="text-lg font-bold mb-2">Wednesday</h2>
        <ul>
          <li class="mb-1">9:00 AM - Team Meeting</li>
          <li class="mb-1">11:00 AM - Client Call</li>
          <li class="mb-1">2:00 PM - Design Review</li>
        </ul>
      </div>
      <p>Class in the past : {user.ex_grade}</p>
    </div>
  </div></h1>)
}
export default Schedule;