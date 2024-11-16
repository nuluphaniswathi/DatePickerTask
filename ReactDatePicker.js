import React ,{useState} from 'react';
import Calendar from 'react-calendar';
import DatePicker from "react-datepicker";
import 'react-calendar/dist/Calendar.css';
import "react-datepicker/dist/react-datepicker.css";

export const ReactDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [recurrance, setRecurrance] = useState("Daily");
  const [recurringDates, setRecurringDates] = useState([]);
 
    console.log(startDate,endDate,recurrance)
    const calculateRecurringDates = () => {
        const dates = [];
        let currentDate = new Date(startDate);
      
        // Safety mechanism to avoid infinite loops if no endDate is provided
        const maxIterations = 1000; 
        let iterations = 0;
      
        while (!endDate || currentDate <= endDate) {
          dates.push(new Date(currentDate)); // Push a new date object
      
          switch (recurrance) {
            case "Daily":
              currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
              break;
            case "Weekly":
              currentDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
              break;
            case "Monthly":
              currentDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
              break;
            case "Yearly":
              currentDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
              break;
            default:
              break;
          }
      
          iterations++;
          if (iterations > maxIterations) {
            console.warn("Max iterations reached. Check your endDate.");
            break;
          }
        }
      
        setRecurringDates(dates);
      };
  return (
    <div className='container d-flex flex-column justify-content-center align-items-center'>
    <h2>Recurring Date Picker</h2>
    <div className='m-4'>
    <label className='mb-2 font-semibold'>StartDate</label>
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='border p-2 w-full'/>
    </div>
    <div className='m-4'>
    <label className='mb-2 font-semibold'>EndDate</label>
    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className='border p-2 w-full'/>
    </div>
    <div className='m-4'>
    <label className='mb-2 font-semibold'>Recurrence</label>
    <select className="border p-2 w-full" value={recurrance} onChange={(e)=>setRecurrance(e.target.value)}>
    <option value="Daily">Daily</option>
    <option value="Weekly">Weekly</option>
    <option value="Monthly">Monthly</option>
    <option value="Yearly">Yearly</option>
    </select>
    <div className='mb-2'>
    <button onClick={calculateRecurringDates}
    className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
    >GenerateRecurringDates</button>
    </div>
    </div>
    <div className="mt-6">
    <h2 className="text-lg font-semibold mb-2">Recurring Dates Preview</h2>
    <Calendar value={recurringDates.length > 0 ? recurringDates : null}
    tileClassName={({ date }) =>
    recurringDates.some(
      (d) =>
        d.toDateString() === date.toDateString()
    )
      ? "bg-primary text-white rounded-full"
      : ""
  }/>
    </div>

    
    {/*<Calendar  />*/}
    </div>
  )
}
