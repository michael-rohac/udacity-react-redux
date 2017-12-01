export function capitalize (str = '') {
    return typeof str !== 'string'
        ? ''
        : str[0].toUpperCase() + str.slice(1)
}

export function dateCompare(d1, d2) {
    if (!d1) return -1;
    if (!d2) return 1;
    return new Date(d1).getTime() - new Date(d2).getTime()
}

export function parseRelativePathSegments(urlRelativePath) {
    const path = urlRelativePath.startsWith('/') ? urlRelativePath.substring(1) : urlRelativePath;
    return path.split('/');
}

export const CONST = {
    ORDER_BY_VOTE_SCORE: 'voteScore',
    ORDER_BY_TIMESTAMP: 'timestamp'
}