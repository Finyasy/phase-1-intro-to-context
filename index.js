// Your code here
function createEmployeeRecord(array){
    return{
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents:[],
        timeOutEvents:[],
    }
}

const createEmployeeRecords = (employees) =>{
    let employeeRecord = employees.map(employee => createEmployeeRecord(employee));
    return employeeRecord;
}


const createTimeInEvent = (employeeRecord, timeStamp) =>{
    const[date,time] = timeStamp.split(' ');
    const timeInObj ={
        type: "TimeIn",
        date: date,
        hour: parseInt(time,10),
    }
    employeeRecord.timeInEvents.push(timeInObj);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeStamp){
    const[date,time] = timeStamp.split(' ');
    const timeOutObj ={
        type: "TimeOut",
        date: date,
        hour: parseInt(time),
    }
    employeeRecord.timeOutEvents.push(timeOutObj);
    return employeeRecord;
}

const hoursWorkedOnDate = (employeeObject,dateStamp) => {
    let timeInEvents = employeeObject.timeInEvents.filter(event => event.date === dateStamp);
    let timeOutEvents = employeeObject.timeOutEvents.filter(event => event.date === dateStamp);
    let timeIn = timeInEvents.length > 0 ? timeInEvents[0].hour : 0;
    let timeOut = timeOutEvents.length > 0 ? timeOutEvents[0].hour : 0;
    return (timeOut - timeIn) / 100;
}

const wagesEarnedOnDate = (employeeObject,dateStamp) => {
    let hoursWorked = hoursWorkedOnDate(employeeObject,dateStamp);
    return hoursWorked * employeeObject.payPerHour;
}

const allWagesFor = (employeeObject) => {
    let hoursWorked = [];
    let totalHours;
    for(let i = 0; i < employeeObject.timeInEvents.length; i++){
        let date = employeeObject.timeInEvents[i].date;
        hoursWorked.push(hoursWorkedOnDate(employeeObject,date));
    }
    totalHours = hoursWorked.reduce((a,b) => a + b);
    return totalHours * employeeObject.payPerHour;
}

const calculatePayroll = (employeeRecords) => {
    let totalWages = 0;
    for(let i = 0; i < employeeRecords.length; i++){
        totalWages += allWagesFor(employeeRecords[i]);
    }
    return totalWages;
}