/**
 * JP BEHRENS <hallo@jpbehrens.de>
 * MyCalender
 */

export class MyCalender {

    constructor(date) {
        this.date = date ?? new Date();
    }

    setDate(date) {
        this.date = date ?? new Date();
    }

    weekNumber(date = this.date) {
        let currentThursday = new Date(date.getTime() + (3 - ((date.getDay() + 6) % 7)) * 86400000);
        let yearOfThursday = currentThursday.getFullYear();
        let firstThursday = new Date(new Date(yearOfThursday, 0, 4).getTime() + (3 - ((new Date(yearOfThursday, 0, 4).getDay() + 6) % 7)) * 86400000);
        return Math.floor(1 + 0.5 + (currentThursday.getTime() - firstThursday.getTime()) / 86400000 / 7);
    }

    isLeapYear() {
        let date = this.date;
        let currentYear = date.getFullYear();
        if ((currentYear % 4 === 0 || currentYear % 400 === 0) && currentYear % 100 !== 0) return true;
        return false;
    }

    create(date = this.date) {
        let target = document.querySelector('#calender');
        let fistDayThisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        let fistDayWeekDay = fistDayThisMonth.getDay();
        let lastDayThisMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        let lastDayWeekDay = lastDayThisMonth.getDay();

        fistDayWeekDay =  fistDayWeekDay === 0 ? 6 : (fistDayWeekDay-1);
        lastDayWeekDay =  lastDayWeekDay === 0 ? 6 : (lastDayWeekDay-1);

        let monthName = ['Januar', 'Februar', 'März',
        'April', 'Mai', 'Juni',
        'Juli', 'August', 'September',
        'Oktober', 'November', 'Dezember']

        const headline = document.createElement('h2');
        headline.classList.add('calender-headline')
        headline.innerHTML = `${monthName[date.getMonth()]} ${date.getFullYear()}`;
        target.appendChild(headline);

        const calenderHead = ["KW","Mo.","Di.","Mi.","Do.","Fr.","Sa.","So."]

        calenderHead.forEach((head)=>{
            const headElement = document.createElement('div');
            headElement.innerHTML = head;
            headElement.classList.add('calender-head');
            target.appendChild(headElement);

        })

        console.log('////PRV MONTH');
        for(let i = fistDayWeekDay; i>= 1; i--){
            const today = this.subDaysToDate(fistDayThisMonth,  i);
            //this.dateFormat(today); 
            const el = document.createElement('div');
            el.innerHTML = this.dateFormat(today); 
            el.classList.add('prev-days');
            el.classList.add('calender-day');


            if(today.getDay() === 1){
                const kw = document.createElement('div'); 
                kw.classList.add('calender-kw');
                kw.innerHTML = this.weekNumber(today);  
                target.appendChild(kw);
            }
            target.appendChild(el);
        }

        console.log('////CURRENT MONTH');
        for (let i = 1; i <= lastDayThisMonth.getDate(); i++) {
            const today = new Date(date.getFullYear(), date.getMonth(), i);
            const el = document.createElement('div');
            el.innerHTML = this.dateFormat(today); 
            el.classList.add('calender-day');
            if(today.getDate() === new Date().getDate()){
                el.classList.add('calender-day-today');
            }

 
            if(today.getDay() === 1){
                const kw = document.createElement('div'); 
                kw.classList.add('calender-kw');
                kw.innerHTML = this.weekNumber(today);  
                target.appendChild(kw);
            }
            target.appendChild(el); 
                   
        }

        // Last days of the Last Week in the new Month        
        console.log('////NEXT MONTH');
        for(let i = 1; i<= (6-lastDayWeekDay); i++){
            const today = this.addDaysToDate(lastDayThisMonth, i);
            const el = document.createElement('div');
            el.innerHTML = this.dateFormat(today); 
            el.classList.add('next-days');
            el.classList.add('calender-day');

            if(today.getDay() === 1){
                const kw = document.createElement('div'); 
                kw.classList.add('calender-kw');
                kw.innerHTML = this.weekNumber(today);  
                target.appendChild(kw);
            }
            target.appendChild(el);  

        }

       // console.log(fistDayWeekDay, 6-lastDayWeekDay)

    }

    addDaysToDate(date, days){
        var res = new Date(date);
        res.setDate(res.getDate() + days);
        return res;
    }

    subDaysToDate(date, days){
        var res = new Date(date);
        res.setDate(res.getDate() - days);
        return res;
    }

    dateFormat(today){
        let weekdays = ['Mo','Di','Mi','Do','Fr.','Sa.','So.'];
        let weekDay = today.getDay();
        // Deutsches anzeige format
        weekDay = weekDay === 0 ? 6 : (weekDay-1);
        if(weekDay === 0){
            console.log('Neue KW'+this.weekNumber(today));
        }

        let i = today.getDate();
        let day = i < 10 ? '0' + i : i;

        return i;

        return `${weekdays[weekDay]})${day}.${today.getMonth() + 1}.${today.getFullYear()}`
       
    }


}