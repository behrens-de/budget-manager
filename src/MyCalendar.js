/**
 * JP BEHRENS <hallo@jpbehrens.de>
 * MyCalender
 */

export class MyCalendar {

    constructor({ target, date, lang} = {}) {
        this.target = target || '.my-calendar';
        this.date = date || new Date();
        this.lang = lang || 'de';
    }
    _month = {
        de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni','Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
    }

    uiContent() {
        const content = document.createElement('div');
        content.innerHTML = 'ich bin der Content';
        return content;
    }

    uiChangeButton(){
        const button = document.createElement('button');

    }

    uiHeader() {
        const header = document.createElement('div');
        const month = this._month[this.lang][this.date.getMonth()];
        const year = this.date.getFullYear();

        header.innerHTML = `${month} ${year}`;

        return header;
    }

    create() {
        const wrap = document.querySelector(this.target);

        // Header
        const header = this.uiHeader();
        // Content
        const content = this.uiContent();



        // Build the calendar
        wrap.appendChild(header);
        wrap.appendChild(content);


        // End of Creation
    }

}