function formatPercentage(value: number, options: { addPrefix?: boolean } = { addPrefix: false }) {
    const result = new Intl.NumberFormat("en-US", {
        style: "percent",
    }).format(value / 100);

    if (options.addPrefix && value > 0) {
        return `+${result}`;
    }

    return result;
}

export default formatPercentage;
