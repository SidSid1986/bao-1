import moment from 'moment'

export const timeParser = time => moment(time).format('YYYY-MM-DD hh:mm:ss') || '-'

export const timeStamp = time => time ? +(moment(time).valueOf() + '').slice(0, -3) : 0