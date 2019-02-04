const startDate = '2019-02-03 09:00:00';

function formatDate(date) {
    const minutes = date.getMinutes().toString().padStart(2,'0');
    const hours = (date.getHours() > 12 ? date.getHours() % 12 : date.getHours()).toString().padStart(2,'0'); 
    const amPm = date.getHours() >= 12 ? 'PM' : 'AM';
    return {date: `${hours}:${minutes}`, amPm: amPm};
}

const formattedDateRange = (()=>{
    const res = [];
    const date = new Date(startDate);
    res.push(formatDate(date));
    for (let i=0; i<=23; i++) {
        date.setTime( date.getTime() + 1000 * 60 * 30 );
        res.push(formatDate(date));
    }
    return res;
})();

export {
    formattedDateRange
}