/**
 * JP BEHRENS <hallo@jpbehrens.de>
 * MyCalender
 */

export class MyCalendar {

    constructor({ target, date, lang } = {}) {
        this.target = target || '.my-calendar';
        this.date = date || new Date();
        this.lang = lang || 'de';
    }
    _month = {
        de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
    }

    uiContent() {
        const content = document.createElement('div');
        content.innerHTML = 'ich bin der Content';
        return content;
    }


    calculateNewDate({ day = 0, month = 0, year = 0 } = {}) {
        return new Date(this.date.getFullYear() + year, this.date.getMonth() + month, this.date.getDate() + day);
    }

    changeDate(newDate) {
        this.date = newDate;
        this.create();
    }

    uiChangeButton({ classname, txt, date } = {}) {
        const button = document.createElement('button');
        button.className = classname ?? 'btn';
        button.innerHTML = txt ?? 'unKnowed';
        button.onclick = () => this.changeDate(date);
        return button;
    }

    uiDisplayMonth() {
        const month = document.createElement('div');
        const monthName = document.createElement('div');
        monthName.innerHTML = this._month[this.lang][this.date.getMonth()];
        const btnNextMonth = this.uiChangeButton({ txt: 'Next Month', date: this.calculateNewDate({ month: 1 }) });
        const btnLastMonth = this.uiChangeButton({ txt: 'Last Month', date: this.calculateNewDate({ month: -1 }) });

        month.appendChild(btnLastMonth)
        month.appendChild(monthName)
        month.appendChild(btnNextMonth)

        return month;
    }

    uiDisplayYear() {
        const month = document.createElement('div');
        const monthName = document.createElement('div');
        monthName.innerHTML = this.date.getFullYear();
        const btnNextMonth = this.uiChangeButton({ txt: 'Next Year', date: this.calculateNewDate({ year: 1 }) });
        const btnLastMonth = this.uiChangeButton({ txt: 'Last Year', date: this.calculateNewDate({ year: -1 }) });

        month.appendChild(btnLastMonth)
        month.appendChild(monthName)
        month.appendChild(btnNextMonth)

        return month;
    }


    uiHeader() {
        const header = document.createElement('div');
        header.classList.add('myc-header')
        const displayMonth = this.uiDisplayMonth();
        const displayYear = this.uiDisplayYear();

        header.appendChild(displayMonth);
        header.appendChild(displayYear);

        return header;
    }

    uiSelect() {
        const select = document.createElement('div');
        select.className = 'myc-selectbox'

        const date = this.calculateNewDate({ year: -2 });
        const startYear = date.getFullYear();

        const startDecade = (currentYear) => {
            return parseInt(currentYear / 10) * 10
        };

        //const year = this.calculateNewDate({year:-8});
        const start = startDecade(this.date.getFullYear());
        const end = start + 10;

        const tenBack = document.createElement('div');
        tenBack.innerHTML = '-10';
        tenBack.className = 'myc-subselect';
        tenBack.onclick = () => {
            this.changeDate(this.calculateNewDate({year: -10}));
        }
        select.appendChild(tenBack);

        for (let ii = start; ii < end; ii++) {

            const subSelect = document.createElement('div');
            const year = this.calculateNewDate({year: ii-this.date.getFullYear()})
            
            subSelect.className = this.date.getFullYear() === year.getFullYear()
            ? 'myc-subselect-active'
            : 'myc-subselect';

            subSelect.innerHTML = year.getFullYear();
            subSelect.onclick = () => {
                this.changeDate(year);
            }
            select.appendChild(subSelect);

        }

        const tenForward = document.createElement('div');
        tenForward.innerHTML = '+10';
        tenForward.className = 'myc-subselect';
        tenForward.onclick = () => {
            this.changeDate(this.calculateNewDate({year: 10}));
        }
        select.appendChild(tenForward);

        return select;
    }

    create() {
        const wrap = document.querySelector(this.target);
        wrap.innerHTML = null;

        // Header
        const header = this.uiHeader();

        const select = this.uiSelect();

        // Content
        const content = this.uiContent();



        // Build the calendar
        wrap.appendChild(header);
        wrap.appendChild(select);
        wrap.appendChild(content);


        // End of Creation
    }

}