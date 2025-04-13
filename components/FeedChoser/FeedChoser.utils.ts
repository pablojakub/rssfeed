export const extractChips = (url: string) => {
    try {
        const urlToAdd = new URL(url);
        const hostName = urlToAdd.hostname;
        const pathName = urlToAdd.pathname;
        return `${hostName}${pathName}`;
    } catch (e) {
        return null;
    }
};

export const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`;
};

