// 720 is 60 minutes * 12 hours, what a coincidence.
// 1px is 1 minute then
const PADDING = 10;
const TOTAL_HEIGHT_PX = 720;
const TOTAL_WIDTH_PX = 600;
// so we can scale sometime
const MINUTE_TO_PX = TOTAL_HEIGHT_PX / (60 * 12);

export {
    PADDING,    
    TOTAL_HEIGHT_PX,
    TOTAL_WIDTH_PX,
    MINUTE_TO_PX
}