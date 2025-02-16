export function getDateTimeNow() {
    const d = new Date();

    const pad = (num) => num.toString().padStart(2, "0");

    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1); // Months are 0-indexed, so add 1
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    const seconds = pad(d.getSeconds());

    // return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return `${year}-${month}-${day}`;
}
