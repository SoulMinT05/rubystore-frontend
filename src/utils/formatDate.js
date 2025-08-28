export function formatDate(date) {
    if (!(date instanceof Date)) {
        date = new Date(date); // nếu truyền string hoặc timestamp thì convert sang Date
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}
