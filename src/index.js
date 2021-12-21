import { MyLocalStorage } from './MyLocalStorage';
import { v4 as uuidv4 } from 'uuid';


function restdays(date = new Date()) {

    let monthNames = ['Jan.', 'Feb.', 'Mär.', 'Apr.', 'Mai', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Okt.', 'Nov', 'Dez.']
    let thisMonth = date.getMonth();
    let thisDay = date.getDate();

    let fistDayThisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDayThisMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    let timestampStart = date.getTime();
    let timestampEnd = date.getTime();

    let daysLeftThisMonth = lastDayThisMonth - thisDay;

    return {
        daysLeftThisMonth,
        thisMonth,
        nameOfMonth: monthNames[thisMonth],
        thisDay
    };
}

console.log(restdays())

function getDate() {

    let today = new Date();
    let mindate = new Date();
    mindate.setDate(mindate.getDate() - 14);

    let todayToString = today.toISOString().split("T")[0];
    let minDateToString = mindate.toISOString().split("T")[0];

    let datePicker = document.querySelector('input[type="date"]');

    datePicker.value = todayToString;
    datePicker.max = todayToString;
    datePicker.min = minDateToString;

}

getDate();



const form = document.querySelector('#new-spend');
const spendName = document.querySelector('input[name="spend-name"]');
const selectBudget = document.querySelector('select[name="select-budget"]');
const spendAmount = document.querySelector('input[name="spend-amount"]');
form.addEventListener('submit', addNewSpend);


function addNewSpend(e){
    e.preventDefault();
    const obj = {
        description: spendName.value,
        time: new Date().getTime(),
        budget: selectBudget.value,
        amount: spendAmount
    }

    console.log(obj);
    
}