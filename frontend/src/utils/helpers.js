export function capitalize (str = '') {
    return typeof str !== 'string'
        ? ''
        : str[0].toUpperCase() + str.slice(1)
}

export const CONST = {
    ORDER_BY_VOTE_SCORE: 'voteScore',
    ORDER_BY_TIMESTAMP: 'timestamp'
}