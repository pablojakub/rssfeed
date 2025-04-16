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
    const hue = Math.floor(Math.random() * 10) + 210;
    const saturation = Math.floor(Math.random() * 10) + 45;
    const lightness = Math.floor(Math.random() * 20) + 75;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

