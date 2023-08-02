import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { getAllGrades, getGradeById, getSlotOfUser } from '../helper/gradeHelper';
import { getAllCourses, getCourseById } from '../helper/courseHelper';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { getMentors, getUser } from '../helper/helper';
const Calendar = () => {
    const calendarRef = useRef(null);
    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();
    const [day, setDay] = useState([])
    const [evenDay, setEvenDay] = useState('Monday,Wednesday,Friday')
    const [grades, setGrades] = useState([]);
    const [courses, setCourses] = useState([]);
    const [mentors, setMentors] = useState([])
    function getTime(time) {
        var timeStr = time;
        var currentDate = new Date();

        // Extract the year, month, and day from the current date
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
        var day = currentDate.getDate();

        // Construct the date string in YYYY-MM-DD format
        var dateString = year + '-' + month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0');

        // Concatenate the date string and time string
        var dateTimeString = dateString + ' ' + timeStr;

        // Create a new Date object using the combined date and time string
        var dateTimeObj = new Date(dateTimeString);
        return dateTimeObj;
    }
    const userId = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    function checkTime(time) {
        if (time === '07:00') return 1
        else if (time === '09:00') return 2
        else if (time === '13:00') return 3
        else if (time === '15:00') return 4
        else if (time === '17:00') return 5
    }
    function getMentorName(mentors, id) {
        for (let i = 0; i < mentors.length; i++) {
            // console.log(mentors[i].fullName)
            if (mentors[i]._id == id) return mentors[i].fullName;
        }
    }
    function getAttendanceStatus(isAttended) {
        if (isAttended == 1) return 'ATTENDED'
        else if (isAttended == 0) return 'ABSENT'
        else return 'Not yet'
    }
    function getAttended(date, slot,grade) {

        
        let compareDay_2 = getTimeStamp(date.toString());
       
        for (let i = 0; i < slot.length; i++) {
            if (slot[i].grade == grade){
                let compareDay = new Date(slot[0].date);
                compareDay.setHours(0)
                let compareDay_1 = getTimeStamp(compareDay.toString())
                console.log(compareDay_1)
                // console.log(compareDay === date)
                if (compareDay_1 == compareDay_2) {
                    return getAttendanceStatus(slot[i].isAttended)
                } else return 'Not yet'
            }
        }
    }
    function getTimeStamp(dateString) {
        const strippedDateString = dateString.replace(" GMT", "").replace(" (Indochina Time)", "");
        const dateObj = new Date(strippedDateString);
        const timestamp = Math.floor(dateObj.getTime() / 1000);

        return timestamp;
    }
    function getEvenSlot(start, end, grade, mentorName, slot) {
        const events = [];
        let startDay = new Date(start);
        let endDay = new Date(end);

        // console.log(slot);
        for (let loop = startDay.getTime(); loop <= endDay.getTime(); loop += 24 * 60 * 60 * 1000) {
            const testDate = new Date(loop);
            testDate.setHours(0, 0, 0, 0)
            let time = getTime(grade.startTimeGrade + loop)
            if (testDate.getDay() === 1) {
                events.push({
                    class: `Class : ${grade.gradeName}`,
                    room: `Room : ${grade.room}`,
                    mentor: `Mentor : ${mentorName}`,
                    time: `From : ${grade.startTimeGrade} To : ${grade.endTimeGrade}`,
                    isAttended: `${getAttended(testDate, slot, grade._id) || 'Not yet'}`,
                    title: `${grade.startTimeGrade}`,
                    start: testDate,

                });
            }
            if (testDate.getDay() === 3) {
                events.push({
                    class: `Class : ${grade.gradeName}`,
                    room: `Room : ${grade.room}`,
                    mentor: `Mentor : ${mentorName}`,
                    time: `From : ${grade.startTimeGrade} To : ${grade.endTimeGrade}`,
                    isAttended: `${getAttended(testDate, slot, grade._id) || 'Not yet'}`,
                    title: `${grade.startTimeGrade}`,
                    start: testDate,

                });
            }
            if (testDate.getDay() === 5) {
                events.push({
                    class: `Class : ${grade.gradeName}`,
                    room: `Room : ${grade.room}`,
                    mentor: `Mentor : ${mentorName}`,
                    time: `From : ${grade.startTimeGrade} To : ${grade.endTimeGrade}`,
                    isAttended: `${getAttended(testDate, slot, grade._id) || 'Not yet'}`,
                    title: `${grade.startTimeGrade}`,
                    start: testDate,

                });
            }
        }
        // console.log(events)
        return events
    }
    function getOddSlot(start, end, grade, mentorName, slot) {
        const events = [];
        let startDay = new Date(start);
        let endDay = new Date(end);
        let time = getTime(grade.startTimeGrade)
        for (let loop = startDay.getTime(); loop <= endDay.getTime(); loop += 24 * 60 * 60 * 1000) {
            const testDate = new Date(loop);
            testDate.setHours(0, 0, 0, 0)
            if (testDate.getDay() === 2) {
                events.push({
                    class: `Class : ${grade.gradeName}`,
                    room: `Room : ${grade.room}`,
                    mentor: `Mentor : ${mentorName}`,
                    time: `From : ${grade.startTimeGrade} To : ${grade.endTimeGrade}`,
                    isAttended: `${getAttended(testDate, slot, grade._id) || 'Not yet'}`,
                    title: `${grade.startTimeGrade}`,
                    start: testDate,

                });
            }
            if (testDate.getDay() === 4) {
                events.push({
                    class: `Class : ${grade.gradeName}`,
                    room: `Room : ${grade.room}`,
                    mentor: `Mentor : ${mentorName}`,
                    time: `From : ${grade.startTimeGrade} To : ${grade.endTimeGrade}`,
                    isAttended: `${getAttended(testDate, slot, grade._id) || 'Not yet'}`,
                    title: `${grade.startTimeGrade}`,
                    start: testDate,

                });
            }
            if (testDate.getDay() === 6) {
                events.push({
                    class: `Class : ${grade.gradeName}`,
                    room: `Room : ${grade.room}`,
                    mentor: `Mentor : ${mentorName}`,
                    time: `From : ${grade.startTimeGrade} To : ${grade.endTimeGrade}`,
                    isAttended: `${getAttended(testDate, slot, grade._id) || 'Not yet'}`,
                    title: `${grade.startTimeGrade}`,
                    start: testDate,

                });
            }
        }
        // console.log(events)
        return events
    }
    async function getSchedule(eventSource) {
        calendarRef.current.getApi().setOption('events', eventSource.sort());
        calendarRef.current.getApi().setOption('slotDuration', '02:00'); // Set slot duration to 2 hours
    }
    // const data = [
    //     // {
    //     //     _id: '64bb9ca59cd2a6f3f007f5d4' // user.grade.split 
    //     // },
    //     {
    //         _id: '64bb9b469cd2a6f3f007f5c2'
    //     },
    //     {
    //         _id: '64bb95879cd2a6f3f007f58a'
    //     },




    // ]
    const EventItem = ({ info }) => {
        const { event } = info;
        // console.log(event)
        return (
            <div>
                <p>{event.extendedProps.class}</p>
                <p>{event.extendedProps.room}</p>
                <p>{event.extendedProps.mentor}</p>
                <p>{event.extendedProps.time}</p>
                <p>({event.extendedProps.isAttended})</p>
            </div>
        );
    };
    const [events, setEvents] = useState([])
    const [allClass, setAllClass] = useState([]);

    const fetchDataForAllEvents = async () => {
        let query = { 'fullName': '', 'active': 1 }
        let mentors = await getMentors(query)
        let user = await getUser({ username });
        let data = []
        // let allClass = await getAllGrades();
        const eventSources = [];
        let string = user.data.grade;
        let elements = string.split(',');

        for (let i = 0; i < elements.length; i++) {
            let element = elements[i].trim();
            data.push(element);
        }
        let slots = await getSlotOfUser(userId);
        // console.log(slots.data)
        try {
            for (const e of data) {

                const grades = await getGradeById(e);
                const courses = await getCourseById(grades.data.course);
                let mentorName = getMentorName(mentors.data, grades.data.instructor)
                let eventSource = [];
                if (calendarRef.current) {
                    if (grades.data.weekDay === evenDay) {
                        eventSource = eventSource.concat(getEvenSlot(courses.data[0].startTime, courses.data[0].endTime, grades.data, mentorName, slots.data));
                    } else {
                        eventSource = eventSource.concat(getOddSlot(courses.data[0].startTime, courses.data[0].endTime, grades.data, mentorName, slots.data));
                    }

                    eventSources.push(...eventSource);
                    eventSources.sort();
                }
            }
            setEvents(eventSources);
            getSchedule(eventSources);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchDataForAllEvents();
    }, []);
    return (
        <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek,dayGridDay'
            }}
            eventContent={(info) => <EventItem info={info} />}
            editable={true}

        />
    );
};

export default Calendar;