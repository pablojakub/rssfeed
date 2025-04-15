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
    const hue = Math.floor(Math.random() * 10) + 210; // 210–220
    const saturation = Math.floor(Math.random() * 10) + 45; // 45–55%
    const lightness = Math.floor(Math.random() * 20) + 55; // 55–75%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

