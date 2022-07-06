export function formatZero(num, len) {
    let length = len || 2; 
    if (String(num).length > length) return num;
    return (Array(length).join(0) + num).slice(-length);
}