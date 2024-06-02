function calculatePercentageChange(
    current: number,
    previous: number,
) {
    if (previous === 0) {
        return previous === current ? 0 : 100;
    }
    return ((current - previous) / previous) * 100;
}

export default calculatePercentageChange;