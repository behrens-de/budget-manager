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
        let fistDayThisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        let lastDayThisMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();


        let weekdays = ['Mo','Di','Mi','Do','Fr.','Sa.','So.'];


        for (let i = 1; i <= lastDayThisMonth; i++) {
            let day = i < 10 ? '0' + i : i;

            const today = new Date(date.getFullYear(), date.getMonth(), i);
            let weekDay = today.getDay();
            // Deutsches anzeige format
            weekDay = weekDay === 0 ? 6 : (weekDay-1);
            if(weekDay === 0){
                console.log('Neue KW'+this.weekNumber(today));
            }

            const format = `${weekdays[weekDay]})${day}.${today.getMonth() + 1}.${today.getFullYear()}`
            console.log(format);
        }

    }


}