const DAY_IN_MS = 86400000;
export const getWeekdayNames = (locale = navigator.language) => {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
    const baseDate = new Date(2021, 5, 6);
    return [...Array(7)].map((_, i) => formatter.format(new Date(baseDate.getTime() + i * DAY_IN_MS)).slice(0, 2));
};
export const getMonthNames = (locale = navigator.language) => {
    const formatter = new Intl.DateTimeFormat(locale, { month: "long" });
    return [...Array(12)].map((_, i) => {
        const date = new Date(2021, i, 1);
        return formatter.format(date);
    });
};
export const getYearOptions = () => {
    return Array.from({ length: 3000 }, (_, year) => ({
        label: (3000 - year).toString().padStart(4, "0"),
        value: 3000 - year,
    }));
};
export const getMonthRange = (month, year) => {
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    return { start, end };
};
export const getDatesToShowInCalendar = (month, year) => {
    const days = [];
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    const startDate = new Date(startOfMonth);
    startDate.setDate(startOfMonth.getDate() - startOfMonth.getDay());
    const endDate = new Date(endOfMonth);
    endDate.setDate(endOfMonth.getDate() + (6 - endOfMonth.getDay()));
    const current = new Date(startDate);
    while (current <= endDate) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }
    return days;
};
export const formatDate = (dateToFormat, formatOptions = {}) => {
    if (!dateToFormat)
        return "";
    const { timeZone, locale } = Intl.DateTimeFormat().resolvedOptions();
    const date = new Date(dateToFormat);
    return date.toLocaleDateString(locale, Object.assign(Object.assign({ timeZone }, (JSON.stringify(formatOptions) === "{}" && {
        year: "numeric",
        month: "short",
        day: "2-digit",
    })), formatOptions));
};
