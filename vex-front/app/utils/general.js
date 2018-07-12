export function dateFormat(string, format) {
    const newDate = new Date(string);
    if (format === 'dateString') {
        return newDate.toDateString();
    }
}

export function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
    return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
    return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
    return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
    return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
    return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

export function getInitials(str) {
    if (str) {
        const split = str.split(" ");
        return `${split[0].charAt(0).toUpperCase()}${split.length > 1 ? split[split.length - 1].charAt(0).toUpperCase() : ''}`
    }
    return ""
}

export function validateEmail(email) {
    const check = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return check.test(email);
}
