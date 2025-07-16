// import { useEffect, useRef, useState } from 'react';

// import useMediaQuery from '@mui/material/useMediaQuery';
// import Box from '@mui/material/Box';
// import Dialog from '@mui/material/Dialog';
// import Tooltip from '@mui/material/Tooltip';
// import SpeedDial from '@mui/material/SpeedDial';

// // third-party
// import FullCalendar from '@fullcalendar/react';
// import interactionPlugin from '@fullcalendar/interaction';
// import listPlugin from '@fullcalendar/list';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import timelinePlugin from '@fullcalendar/timeline';

// // project imports
// import { PopupTransition } from 'components/@extended/Transitions';
// import CalendarStyled from 'sections/apps/calendar/CalendarStyled';
// import Toolbar from 'sections/apps/calendar/Toolbar';
// import AddEventForm from 'sections/apps/calendar/AddEventForm';

// import { useGetEvents, updateEvent } from 'api/calender';

// // assets
// import { Add } from 'iconsax-react';

// // ==============================|| CALENDAR - MAIN ||============================== //

// export default function Calendar() {
//   const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState();
//   const [calendarView, setCalendarView] = useState();
//   const [date, setDate] = useState(new Date());
//   const [selectedRange, setSelectedRange] = useState(null);
//   const calendarRef = useRef(null);
//   const { events } = useGetEvents();

//   useEffect(() => {
//     const calendarEl = calendarRef.current;
//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();
//       const newView = matchDownSM ? 'listWeek' : 'dayGridMonth';
//       calendarApi.changeView(newView);
//       setCalendarView(newView);
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [matchDownSM]);

//   // calendar toolbar events
//   const handleDateToday = () => {
//     const calendarEl = calendarRef.current;

//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();

//       calendarApi.today();
//       setDate(calendarApi.getDate());
//     }
//   };

//   const handleViewChange = (newView) => {
//     const calendarEl = calendarRef.current;

//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();

//       calendarApi.changeView(newView);
//       setCalendarView(newView);
//     }
//   };

//   const handleDatePrev = () => {
//     const calendarEl = calendarRef.current;

//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();

//       calendarApi.prev();
//       setDate(calendarApi.getDate());
//     }
//   };

//   const handleDateNext = () => {
//     const calendarEl = calendarRef.current;

//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();

//       calendarApi.next();
//       setDate(calendarApi.getDate());
//     }
//   };

//   // calendar events
//   const handleRangeSelect = (arg) => {
//     const calendarEl = calendarRef.current;
//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();
//       calendarApi.unselect();
//     }

//     setSelectedRange({ start: arg.start, end: arg.end });
//     setModalOpen(true);
//   };

//   const handleEventSelect = (arg) => {
//     if (arg?.event?.id) {
//       const event = events.find((event) => event.id === arg.event.id);
//       setSelectedEvent(event);
//     }

//     setModalOpen(true);
//   };

//   const handleEventUpdate = async ({ event }) => {
//     await updateEvent(event.id, {
//       allDay: event.allDay,
//       start: event.start,
//       end: event.end
//     });
//     setModalOpen(true);
//   };

//   const modalCallback = (openModal) => {
//     // open/close modal based on dialog state
//     if (isModalOpen) {
//       setSelectedEvent(undefined);
//     }
//     setModalOpen(openModal);
//   };

//   const handleModal = () => {
//     if (isModalOpen) {
//       setSelectedEvent(undefined);
//     }
//     setModalOpen(!isModalOpen);
//   };

//   return (
//     <Box sx={{ position: 'relative' }}>
//       <CalendarStyled>
//         <Toolbar
//           date={date}
//           view={calendarView}
//           onClickNext={handleDateNext}
//           onClickPrev={handleDatePrev}
//           onClickToday={handleDateToday}
//           onChangeView={handleViewChange}
//         />

//         <FullCalendar
//           weekends
//           editable
//           droppable
//           selectable
//           events={events}
//           ref={calendarRef}
//           rerenderDelay={10}
//           initialDate={date}
//           initialView={calendarView}
//           dayMaxEventRows={3}
//           eventDisplay="block"
//           headerToolbar={false}
//           allDayMaintainDuration
//           eventResizableFromStart
//           select={handleRangeSelect}
//           eventDrop={handleEventUpdate}
//           eventClick={handleEventSelect}
//           eventResize={handleEventUpdate}
//           height={matchDownSM ? 'auto' : 720}
//           plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
//         />
//       </CalendarStyled>

//       {/* Dialog renders its body even if not open */}
//       <Dialog
//         maxWidth="sm"
//         TransitionComponent={PopupTransition}
//         fullWidth
//         onClose={handleModal}
//         open={isModalOpen}
//         sx={{ '& .MuiDialog-paper': { p: 0, bgcolor: 'secondary.lighter' } }}
//       >
//         <AddEventForm modalCallback={modalCallback} event={selectedEvent} range={selectedRange} onCancel={handleModal} />
//       </Dialog>
//       <Tooltip title="Add New Event">
//         <SpeedDial
//           ariaLabel="add-event-fab"
//           sx={{ display: 'inline-flex', position: 'sticky', bottom: 24, left: '100%', transform: 'translate(-50%, -50% )' }}
//           icon={<Add />}
//           onClick={handleModal}
//         />
//       </Tooltip>
//     </Box>
//   );
// }











// import { useEffect, useRef, useState } from 'react';

// import useMediaQuery from '@mui/material/useMediaQuery';
// import Box from '@mui/material/Box';
// import Dialog from '@mui/material/Dialog';
// import Tooltip from '@mui/material/Tooltip';
// import SpeedDial from '@mui/material/SpeedDial';

// import FullCalendar from '@fullcalendar/react';
// import interactionPlugin from '@fullcalendar/interaction';
// import listPlugin from '@fullcalendar/list';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import timelinePlugin from '@fullcalendar/timeline';

// import { PopupTransition } from 'components/@extended/Transitions';
// import CalendarStyled from 'sections/apps/calendar/CalendarStyled';
// import Toolbar from 'sections/apps/calendar/Toolbar';
// import AddEventForm from 'sections/apps/calendar/AddEventForm';

// import { updateEvent } from 'api/calender';

// import { Add } from 'iconsax-react';

// const getRandomStatus = () => {
//   const statuses = [
//     { title: 'Present', color: '#ccf2e2', type: 'present' },
//     { title: 'Absent', color: '#f8c7c7', type: 'absent' },
//     { title: 'Leave', color: '#ffeac2', type: 'leave' },
//     { title: 'Holiday', color: '#b3ccf2', type: 'holiday' }
//   ];
//   return statuses[Math.floor(Math.random() * statuses.length)];
// };

// const sampleEvents = [];
// const month = 4; // May (0-indexed, so January = 0)
// const year = 2025;

// for (let day = 1; day <= 31; day++) {
//   const date = new Date(year, month, day);
//   if (date.getMonth() !== month) continue;

//   const status = getRandomStatus();

//   sampleEvents.push({
//     id: `${day}`,
//     title: status.title,
//     start: `${year}-05-${String(day).padStart(2, '0')}`,
//     end: `${year}-05-${String(day).padStart(2, '0')}`,
//     display: 'background',
//     color: status.color,
//     type: status.type
//   });
// }

// console.log(sampleEvents);



// export default function Calendar() {
//   const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState();
//   const [calendarView, setCalendarView] = useState();
//   const [date, setDate] = useState(new Date());
//   const [selectedRange, setSelectedRange] = useState(null);
//   const calendarRef = useRef(null);
//   const events = sampleEvents; 

//   useEffect(() => {
//     const calendarEl = calendarRef.current;
//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();
//       const newView = matchDownSM ? 'listWeek' : 'dayGridMonth';
//       calendarApi.changeView(newView);
//       setCalendarView(newView);
//     }
//   }, [matchDownSM]);

//   const handleDateToday = () => {
//     const calendarApi = calendarRef.current?.getApi();
//     if (calendarApi) {
//       calendarApi.today();
//       setDate(calendarApi.getDate());
//     }
//   };

//   const handleViewChange = (newView) => {
//     const calendarApi = calendarRef.current?.getApi();
//     if (calendarApi) {
//       calendarApi.changeView(newView);
//       setCalendarView(newView);
//     }
//   };

//   const handleDatePrev = () => {
//     const calendarApi = calendarRef.current?.getApi();
//     if (calendarApi) {
//       calendarApi.prev();
//       setDate(calendarApi.getDate());
//     }
//   };

//   const handleDateNext = () => {
//     const calendarApi = calendarRef.current?.getApi();
//     if (calendarApi) {
//       calendarApi.next();
//       setDate(calendarApi.getDate());
//     }
//   };

//   const handleRangeSelect = (arg) => {
//     calendarRef.current?.getApi().unselect();
//     setSelectedRange({ start: arg.start, end: arg.end });
//     setModalOpen(true);
//   };

//   const handleEventSelect = (arg) => {
//     const event = events.find((e) => e.id === arg.event.id);
//     setSelectedEvent(event);
//     setModalOpen(true);
//   };

//   const handleEventUpdate = async ({ event }) => {
//     await updateEvent(event.id, {
//       allDay: event.allDay,
//       start: event.start,
//       end: event.end
//     });
//     setModalOpen(true);
//   };

//   const modalCallback = (openModal) => {
//     if (isModalOpen) setSelectedEvent(undefined);
//     setModalOpen(openModal);
//   };

//   const handleModal = () => {
//     if (isModalOpen) setSelectedEvent(undefined);
//     setModalOpen(!isModalOpen);
//   };

//   return (
//     <Box sx={{ position: 'relative' }}>
//       <CalendarStyled>
//         <Toolbar
//           date={date}
//           view={calendarView}
//           onClickNext={handleDateNext}
//           onClickPrev={handleDatePrev}
//           onClickToday={handleDateToday}
//           onChangeView={handleViewChange}
//         />

//         <FullCalendar
//           weekends
//           editable
//           droppable
//           selectable
//           events={events}
//           ref={calendarRef}
//           rerenderDelay={10}
//           initialDate={date}
//           initialView={calendarView}
//           dayMaxEventRows={3}
//           eventDisplay="block"
//           headerToolbar={false}
//           allDayMaintainDuration
//           eventResizableFromStart
//           select={handleRangeSelect}
//           eventDrop={handleEventUpdate}
//           eventClick={handleEventSelect}
//           eventResize={handleEventUpdate}
//           height={matchDownSM ? 'auto' : 720}
//           plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
//           eventContent={(arg) => {
//             const type = arg.event.extendedProps.type;
//             if (type === 'leave') return <div style={{ color: '#e07b00', fontSize: '0.75rem' }}>Leave</div>;
//             if (type === 'holiday') return <div style={{ color: '#3f51b5', fontSize: '0.75rem' }}>Holiday</div>;
//             if (type === 'absent') return <div style={{ color: '#c62828', fontSize: '0.75rem' }}>Absent</div>;
//             if (type === 'present') return null;
//             return null;
//           }}
//         />
//       </CalendarStyled>

//       <Dialog
//         maxWidth="sm"
//         TransitionComponent={PopupTransition}
//         fullWidth
//         onClose={handleModal}
//         open={isModalOpen}
//         sx={{ '& .MuiDialog-paper': { p: 0, bgcolor: 'secondary.lighter' } }}
//       >
//         <AddEventForm modalCallback={modalCallback} event={selectedEvent} range={selectedRange} onCancel={handleModal} />
//       </Dialog>

//       <Tooltip title="Add New Event">
//         <SpeedDial
//           ariaLabel="add-event-fab"
//           sx={{
//             display: 'inline-flex',
//             position: 'sticky',
//             bottom: 24,
//             left: '100%',
//             transform: 'translate(-50%, -50%)'
//           }}
//           icon={<Add />}
//           onClick={handleModal}
//         />
//       </Tooltip>
//     </Box>
//   );
// }









// import { useEffect, useRef, useState } from 'react';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import Box from '@mui/material/Box';
// import Dialog from '@mui/material/Dialog';
// import Tooltip from '@mui/material/Tooltip';
// import SpeedDial from '@mui/material/SpeedDial';
// import FullCalendar from '@fullcalendar/react';
// import interactionPlugin from '@fullcalendar/interaction';
// import listPlugin from '@fullcalendar/list';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import timelinePlugin from '@fullcalendar/timeline';
// import { PopupTransition } from 'components/@extended/Transitions';
// import CalendarStyled from 'sections/apps/calendar/CalendarStyled';
// import Toolbar from 'sections/apps/calendar/Toolbar';
// import AddEventForm from 'sections/apps/calendar/AddEventForm';
// import { updateEvent } from 'api/calender';
// import { Add } from 'iconsax-react';

// const getRandomStatus = () => {
//   const random = Math.random();
//   if (random < 0.7) {
//     return { title: 'Present', color: '#ccf2e2', type: 'present' };
//   } else if (random < 0.8) {
//     return { title: 'Absent', color: '#f8c7c7', type: 'absent' };
//   } else if (random < 0.9) {
//     return { title: 'Leave', color: '#ffeac2', type: 'leave' };
//   } else {
//     return { title: 'Holiday', color: '#b3ccf2', type: 'holiday' };
//   }
// };

// const sampleEvents = [];
// const month = 4; // May (0-indexed, so January = 0)
// const year = 2025;

// for (let day = 1; day <= 31; day++) {
//   const date = new Date(year, month, day);
//   if (date.getMonth() !== month) continue;
  
//   // If it's Sunday, mark as disabled
//   if (date.getDay() === 0) {
//     sampleEvents.push({
//       id: `${day}-off`,
//       title: '',
//       start: `${year}-05-${String(day).padStart(2, '0')}`,
//       end: `${year}-05-${String(day).padStart(2, '0')}`,
//       display: 'background',
//       color: '#f5f5f5', // Light gray for disabled
//       textColor: '#bdbdbd', // Gray text
//       type: 'off',
//       editable: false,
//       className: 'disabled-day'
//     });
//     continue;
//   }

//   const status = getRandomStatus();
//   sampleEvents.push({
//     id: `${day}`,
//     title: status.title,
//     start: `${year}-05-${String(day).padStart(2, '0')}`,
//     end: `${year}-05-${String(day).padStart(2, '0')}`,
//     display: 'background',
//     color: status.color,
//     type: status.type,
//     className: 'enabled-day'
//   });
// }

// export default function Calendar() {
//   const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState();
//   const [calendarView, setCalendarView] = useState();
//   const [date, setDate] = useState(new Date());
//   const [selectedRange, setSelectedRange] = useState(null);
//   const calendarRef = useRef(null);
//   const events = sampleEvents; 

//   useEffect(() => {
//     const calendarEl = calendarRef.current;
//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();
//       const newView = matchDownSM ? 'listWeek' : 'dayGridMonth';
//       calendarApi.changeView(newView);
//       setCalendarView(newView);
//     }
//   }, [matchDownSM]);

//   const handleDateToday = () => {
//     const calendarApi = calendarRef.current?.getApi();
//     if (calendarApi) {
//       calendarApi.today();
//       setDate(calendarApi.getDate());
//     }
//   };

//   const handleViewChange = (newView) => {
//     const calendarApi = calendarRef.current?.getApi();
//     if (calendarApi) {
//       calendarApi.changeView(newView);
//       setCalendarView(newView);
//     }
//   };

//   const handleDatePrev = () => {
//     const calendarApi = calendarRef.current?.getApi();
//     if (calendarApi) {
//       calendarApi.prev();
//       setDate(calendarApi.getDate());
//     }
//   };

//   const handleDateNext = () => {
//     const calendarApi = calendarRef.current?.getApi();
//     if (calendarApi) {
//       calendarApi.next();
//       setDate(calendarApi.getDate());
//     }
//   };

//   const handleRangeSelect = (arg) => {
//     calendarRef.current?.getApi().unselect();
//     setSelectedRange({ start: arg.start, end: arg.end });
//     setModalOpen(true);
//   };

//   const handleEventSelect = (arg) => {
//     const event = events.find((e) => e.id === arg.event.id);
//     setSelectedEvent(event);
//     setModalOpen(true);
//   };

//   const handleEventUpdate = async ({ event }) => {
//     await updateEvent(event.id, {
//       allDay: event.allDay,
//       start: event.start,
//       end: event.end
//     });
//     setModalOpen(true);
//   };

//   const modalCallback = (openModal) => {
//     if (isModalOpen) setSelectedEvent(undefined);
//     setModalOpen(openModal);
//   };

//   const handleModal = () => {
//     if (isModalOpen) setSelectedEvent(undefined);
//     setModalOpen(!isModalOpen);
//   };

//   return (
//     <Box sx={{ position: 'relative' }}>
//       <CalendarStyled>
//         <Toolbar
//           date={date}
//           view={calendarView}
//           onClickNext={handleDateNext}
//           onClickPrev={handleDatePrev}
//           onClickToday={handleDateToday}
//           onChangeView={handleViewChange}
//         />

//         <FullCalendar
//           weekends
//           editable
//           droppable
//           selectable
//           events={events}
//           ref={calendarRef}
//           rerenderDelay={10}
//           initialDate={date}
//           initialView={calendarView}
//           dayMaxEventRows={3}
//           eventDisplay="block"
//           headerToolbar={false}
//           allDayMaintainDuration
//           eventResizableFromStart
//           select={handleRangeSelect}
//           eventDrop={handleEventUpdate}
//           eventClick={handleEventSelect}
//           eventResize={handleEventUpdate}
//           height={matchDownSM ? 'auto' : 720}
//           plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
//           eventContent={(arg) => {
//             const type = arg.event.extendedProps.type;
//             if (type === 'leave') return <div style={{ color: '#e07b00', fontSize: '0.75rem' }}>Leave</div>;
//             if (type === 'holiday') return <div style={{ color: '#3f51b5', fontSize: '0.75rem' }}>Holiday</div>;
//             if (type === 'absent') return <div style={{ color: '#c62828', fontSize: '0.75rem' }}>Absent</div>;
//             if (type === 'present') return <div style={{ color: '#2e7d32', fontSize: '0.75rem' }}>Present</div>;
//             if (type === 'off') return null; // Don't show anything for Sundays
//             return null;
//           }}
//         />
//       </CalendarStyled>

//       <Dialog
//         maxWidth="sm"
//         TransitionComponent={PopupTransition}
//         fullWidth
//         onClose={handleModal}
//         open={isModalOpen}
//         sx={{ '& .MuiDialog-paper': { p: 0, bgcolor: 'secondary.lighter' } }}
//       >
//         <AddEventForm modalCallback={modalCallback} event={selectedEvent} range={selectedRange} onCancel={handleModal} />
//       </Dialog>

//       <Tooltip title="Add New Event">
//         <SpeedDial
//           ariaLabel="add-event-fab"
//           sx={{
//             display: 'inline-flex',
//             position: 'sticky',
//             bottom: 24,
//             left: '100%',
//             transform: 'translate(-50%, -50%)'
//           }}
//           icon={<Add />}
//           onClick={handleModal}
//         />
//       </Tooltip>

    
//     </Box>
//   );
// }




import React, { useEffect, useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import CalendarStyled from 'sections/apps/calendar/CalendarStyled';
import Toolbar from 'sections/apps/calendar/Toolbar';
import { fetchMyAttendance } from 'api/myDetails'; 
import LogoImageLoader from 'components/PupilLoader';

const AttendanceCalendar = () => {
  // Calendar state
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [calendarView, setCalendarView] = useState(matchDownSM ? 'listWeek' : 'dayGridMonth');
  const [date, setDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState(null);
  const calendarRef = useRef(null);

  // Attendance state
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());

 // Calendar initialization
 useEffect(() => {
  const calendarEl = calendarRef.current;
  if (calendarEl) {
    const calendarApi = calendarEl.getApi();
    const newView = matchDownSM ? 'listWeek' : 'dayGridMonth';
    calendarApi.changeView(newView);
    setCalendarView(newView);
  }
}, [matchDownSM]);

  // Format date as YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  // Transform attendance data to calendar events
  const transformAttendanceToEvents = (attendanceMap) => {
    return Object.entries(attendanceMap).reduce((events, [date, entry]) => {
      const { status, clockInTime, clockOutTime } = entry;
      const dateObj = new Date(date);

      // Skip Sundays and entries without status
      if (dateObj.getDay() === 0 || !status) return events;

      // Default times
      let start = new Date(date);
      let end = new Date(date);

      // If times exist, parse them
      if (clockInTime && clockOutTime) {
        const parseTime = (dateStr, timeStr) => {
          const [time, modifier] = timeStr.split(' ');
          let [hours, minutes] = time.split(':').map(Number);

          if (modifier === 'PM' && hours < 12) hours += 12;
          if (modifier === 'AM' && hours === 12) hours = 0;

          const d = new Date(dateStr);
          d.setHours(hours, minutes, 0, 0);
          return d;
        };

        start = parseTime(date, clockInTime);
        end = parseTime(date, clockOutTime);
      } else {
        // If no clock-in/clock-out, still assign full-day event range
        start = new Date(`${date}T00:00:00`);
        end = new Date(`${date}T23:59:00`);
      }

      // Color coding
      let backgroundColor = '#4285F4'; // default for PRESENT
      if (status.toUpperCase() === 'ABSENT') backgroundColor = '#ff4d4f';
      else if (status.toUpperCase() === 'LEAVE') backgroundColor = '#fa8c16';

      events.push({
        title: status.toUpperCase(),
        start,
        end,
        allDay: false,
        backgroundColor,
        borderColor: backgroundColor,
        extendedProps: {
          time: clockInTime || clockOutTime ? `(${clockInTime} - ${clockOutTime})`: ''
        }
      });

      return events;
    }, []);
  };

  // Fetch attendance data for the current month
  const fetchAttendanceData = async (monthDate) => {
    try {
      const startDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
      const endDate = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);

      const response = await fetchMyAttendance({
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        status: '',
        subjectId: ''
      });
      const eventData = transformAttendanceToEvents(response);
      setCalendarEvents(eventData);
    } catch (error) {
      console.error('Failed to load attendance records:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when month changes
  useEffect(() => {
    fetchAttendanceData(currentMonth);
  }, [currentMonth]);

  // Handle month change from calendar interactions
  const handleMonthChange = (newDate) => {
    const newMonthKey = `${newDate.getFullYear()}-${newDate.getMonth()}`;
    const currentMonthKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;

    if (newMonthKey !== currentMonthKey) {
      setLoading(true);
      setCurrentMonth(newDate);
    }
  };

  // Calendar toolbar events
  const handleDateToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
      handleMonthChange(new Date());
    }
  };

  const handleViewChange = (newView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setCalendarView(newView);
    }
  };

  const handleDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
      handleMonthChange(calendarApi.getDate());
    }
  };

  const handleDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
      handleMonthChange(calendarApi.getDate());
    }
  };

  // Calendar events
  const handleRangeSelect = (arg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    setSelectedRange({ start: arg.start, end: arg.end });
  };

  const renderEventContent = (arg, view) => {
    const title = arg.event.title;
    const time = arg.event.extendedProps.time;
    const isDayView = view === 'timeGridDay';
  

    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: isDayView ? 'row' : 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: isDayView ? 'left' : 'center',
          gap: '4px',
          padding: '4px',
          boxSizing: 'border-box',
          whiteSpace: 'normal',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>{title}</Box>
        {time && <Box sx={{ fontSize: '0.7rem' }}>{time}</Box>}
      </Box>
    );
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <LogoImageLoader />
      </Box>
    );
  }


  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '700px',
        height: '100%',
        // Gray out Sundays
        '& .fc-day-sun, & .fc-col-header-cell-sun': {
          backgroundColor: '#f5f5f5',
          color: '#999'
        },
        // Hide events on Sundays
        '& .fc-day-sun .fc-daygrid-event': {
          display: 'none !important'
        },
        // Make all dayGrid views center events
        '& .fc-daygrid-event-harness': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%'
        },
        '& .fc-daygrid-event': {
          display: 'flex !important',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          textAlign: 'center'
        },
        ...(calendarView === 'dayGridDay'
          ? {
              '& .fc-daygrid-day-frame': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                height: '100%',
                minHeight: '250px'
              },
              '& .fc-daygrid-day': {
                height: '300px'
              }
            }
          : calendarView === 'dayGridWeek'
            ? {
                '& .fc-daygrid-day-frame': {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '100%',
                  minHeight: '150px'
                },
                '& .fc-daygrid-day': {
                  height: '200px'
                }
              }
            : {})
      }}
    >
      <CalendarStyled>
        <Toolbar
          date={date}
          view={calendarView || 'dayGridMonth'}
          onClickNext={handleDateNext}
          onClickPrev={handleDatePrev}
          onClickToday={handleDateToday}
          onChangeView={handleViewChange}
        />

        <FullCalendar
          weekends
          editable
          droppable
          selectable
          events={calendarEvents}
          ref={calendarRef}
          rerenderDelay={10}
          initialDate={date}
          initialView={calendarView}
          dayMaxEventRows={3}
          eventDisplay="block"
          headerToolbar={false}
          allDayMaintainDuration
          eventResizableFromStart
          select={handleRangeSelect}
          datesSet={({ view }) => {
            const visibleDate = view.currentStart;
            const visibleMonthStart = new Date(visibleDate.getFullYear(), visibleDate.getMonth(), 1);
            handleMonthChange(visibleMonthStart);
          }}
          slotDuration="03:00:00"
          slotLabelInterval="03:00:00"
          height="auto"
          plugins={[listPlugin, dayGridPlugin, timeGridPlugin, timelinePlugin, interactionPlugin]}
          selectAllow={({ start, end }) => {
            return start.getDay() !== 0 && end.getDay() !== 0;
          }}
          eventContent={(arg) => renderEventContent(arg, calendarView)}
        />
      </CalendarStyled>
    </Box>
  );
};

export default AttendanceCalendar;
