import React from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'

const TimeAgo = ({ timeStamp }: { timeStamp: string }) => {
  let timeAgo = ''

  if (timeStamp) {
    const date = parseISO(timeStamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }
  return (
    <time dateTime={timeStamp} title={timeStamp}>
      &nbsp; <i>{timeAgo}</i>
    </time>
  )
}

export default TimeAgo
