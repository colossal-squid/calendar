import { formattedDateRange } from './date-utils';
import styles from "./styles.module.css";

const ITEM_CONTENT = `
<span class="${styles.chevron}"></span>
<h3>Sample item</h3>
<p>Sample location</p>
`;

// 720 is 60 minutes * 12 hours, what a coincidence.
// 1px is 1 minute then
const PADDING = 10;
const TOTAL_HEIGHT_PX = 720;
const TOTAL_WIDTH_PX = 600;
// so we can scale sometime
const MINUTE_TO_PX = TOTAL_HEIGHT_PX / (60 * 12);

function generateDateScale() {
    return formattedDateRange.map(m=>{
        let formatted =`<span>${m.date}</span>`;
        if (/.{2}:00/.test(m.date)) {
            formatted += (' ' + m.amPm);
        }
        return `<li>${formatted}</li>`;
    }).join('')
}

function createCalendar() {
    let element = document.querySelector('#root');
    let dateScale = document.createElement('section');
    let content = document.createElement('section');
    element.appendChild(dateScale);
    element.appendChild(content);
    content.className = styles.content;
    dateScale.className = styles.dateScale;
    dateScale.innerHTML = generateDateScale();
  }
  
  function eventsIntersect(a, b) {
    return (a.start > b.start && a.start < b.end) || (a.end > b.start && a.end < b.end)
  }

  function getIntersectingEventsCount(event, events) {
    let intersecting = events.filter((i)=>{
        return i !== event && eventsIntersect(event, i)
    });
    if (intersecting.length > 1) {
        // if intersections of event do not intersect between each other 
        // - they're not SIMULTANEOUS intersections
        var filtered = [];
        intersecting.forEach( a => {
            if (filtered.length && !filtered.find( b => eventsIntersect(a, b) )) {
                return;
            }
            filtered.push(a);
        } );
        intersecting = filtered;
    }
    return intersecting.length;
  }

  function layOutDay (events) {
    // clear 
    const content = document.querySelector('section:last-child');
    content.innerHTML = "";

    let rendered = [];
    events.forEach( (e) => {
        const el = document.createElement('div');
        const count = getIntersectingEventsCount(e, events);
        const widthPx = (TOTAL_WIDTH_PX / (count + 1));
        el.innerHTML = ITEM_CONTENT;
        el.className = styles.calendarItem;
        el.style.height = ((e.end - e.start) * MINUTE_TO_PX) + 'px';
        el.style.width = widthPx + 'px';

        el.style.top = (e.start * MINUTE_TO_PX) + 'px';
        const count2 = getIntersectingEventsCount(e, rendered.filter(e=>!e.intersections));
        if ( count2 > 0 ) {
            el.style.left = (PADDING + widthPx * count2) + 'px';
            e.intersections = count2;
        } else {
            el.style.left = `${PADDING}px`;
        }
        content.appendChild(el);
        rendered.push(e);
    });
  }

  createCalendar();
  const test = [ 
      {start: 30, end: 150}, 
      {start: 540, end: 600}, 
      {start: 560, end: 620}, 
      {start: 610, end: 670} 
  ];

  layOutDay(test);