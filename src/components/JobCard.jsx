import moment from 'moment'
import React from 'react'

const JobCard = ({ job }) => {
    console.log(job)
    return (
        <div className='card'>
            {job.url ? <h3><a href={job.url} target='_blank'>{job.title}</a></h3> : <h3>{job.title}</h3>}
            <span className='by'> By - {job.by}</span>
            <span className='date'>{new Date(job.time * 1000).toLocaleString()}</span>

        </div>
    )
}

export default JobCard