import { formattedDateRange } from './date-utils';
import { Record } from './record';
import { PADDING } from './config';
import styles from "./styles.module.css";

function generateDateScale() {
    return formattedDateRange.map(m => {
        let formatted = `<span>${m.date}</span>`;
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
    return (a.start >= b.start && a.start <= b.end) || (a.end >= b.start && a.end <= b.end)
}

function range(N) {
    const range = [];
    for (let i=0; i<=N; i++) {
        range.push(i);
    }
    return range;
}

function getEventIntersections(event, events) {
    return events.filter((i) => {
        return i !== event && eventsIntersect(event, i)
    });
}

function getSimultaneousIntersections(event, events) {
    // get count of events intersecting with event
    let intersecting = getEventIntersections(event, events);
    if (intersecting.length <= 1) {
        return intersecting;
    }
    // reduce it to the max count of simultaneous intersections
    return intersecting.filter(el=>{
        return getEventIntersections(el, intersecting).length > 0
    });
}

function getMaxSimultaneousIntersectionsCount(event, events) {
    // get count of events intersecting with event
    let intersecting = getEventIntersections(event, events);
    if (intersecting.length <= 1) {
        return intersecting.length;
    }
    // reduce it to the max count of simultaneous intersections
    const simultaneous = intersecting.map( item => getEventIntersections(item, intersecting).length );
    return Math.max( 
        ...simultaneous
    ) + 1;
}

function layOutDay(events) {
    // clear 
    const content = document.querySelector('section:last-child');
    content.innerHTML = "";

    let rendered = [];
    events.forEach((e) => {
        const maxSimultaneous = getMaxSimultaneousIntersectionsCount(
            e, events
        );
        const rec = new Record(e, maxSimultaneous);
        const el = rec.el;

        const otherRecordPositions = getSimultaneousIntersections(
            e, rendered
        ).map(item=>item.position);
        // trying to fill-in place in left first
        e.position = maxSimultaneous > 0 ?  Math.min(
            ...range(maxSimultaneous).filter(
                (pos)=>!otherRecordPositions.includes(pos)
            )
        ) : 0;
        el.style.left = (PADDING + e.position * rec.width) + 'px';        
        content.appendChild(el);
        rendered.push(e);
    });
}

createCalendar();

export {
    layOutDay
}