import moment from 'moment'

export const timeParser = time => +time ? moment(time * 1000).format('YYYY-MM-DD HH:mm:ss') : '-'

export const timeStamp = time => time ? +(time.valueOf() + '').slice(0, -3) : 0