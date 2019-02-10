import styles from "./styles.module.css";
import { TOTAL_WIDTH_PX, MINUTE_TO_PX } from './config';

function ITEM_CONTENT() {
    return  `
<span class="${styles.chevron}"></span>
<h3>Sample item</h3>
<p>Sample location</p>
`};

export class Record {

    constructor(e, count) {
        this.el = document.createElement('div');
        const widthPx = (TOTAL_WIDTH_PX / (count + 1));
        this.width = widthPx;
        this.el.innerHTML = ITEM_CONTENT(count);
        this.el.className = styles.calendarItem;
        this.el.style.height = ((e.end - e.start) * MINUTE_TO_PX) + 'px';
        this.el.style.width = widthPx + 'px';
        this.el.style.top = (e.start * MINUTE_TO_PX) + 'px';

    }

}