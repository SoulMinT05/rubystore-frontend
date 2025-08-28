export function formatPrice(value) {
    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toString().replace(/\.0$/, '')}tr VND`;
    } else if (value >= 1000) {
        return `${(value / 1000).toString().replace(/\.0$/, '')}k VND`;
    }
    return `${value} VND`;
}
