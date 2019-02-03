import { formattedDateRange } from './date-utils';
import styles from "./styles.module.css";

function generateDateScale() {
    return formattedDateRange.map(m=>`<span>${m.date}</span>`).join('')
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
  
  createCalendar();