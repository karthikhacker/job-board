import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../constants';
import JobCard from './JobCard';

const JobBoard = () => {
    const [jobs, setJobs] = useState([]);
    const [jobIds, setJobIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const JOB_PER_PAGE = 6;

    const fetchJobs = async (curPage) => {
        setLoading(true);
        setCurrentPage(curPage);
        setFetching(true);
        const res = await fetch(`${BASE_URL}/jobstories.json`);
        const jsonData = await res.json();
        setLoading(false);
        setJobIds(jsonData);

        const itemIds = jsonData;
        const idPerPage = itemIds.slice(curPage * JOB_PER_PAGE, curPage * JOB_PER_PAGE + JOB_PER_PAGE)
        const jobsList = await Promise.all(
            idPerPage.map(async (id) => {
                setLoading(true)
                const data = await fetch(`${BASE_URL}/item/${id}.json`)
                setLoading(false);
                return data.json()
            })
        );
        setJobs([...jobs, ...jobsList]);
        setFetching(false)
    }

    useEffect(() => {
        if (currentPage === 0) fetchJobs(currentPage)
    }, [currentPage])
    return (
        <div className='job-section'>
            {
                jobs.map(job => <JobCard key={job.id} job={job} />)
            }
            {jobs.length > 1 && currentPage * JOB_PER_PAGE + JOB_PER_PAGE < jobIds.length && <button onClick={() => fetchJobs(currentPage + 1)} className='btn'>{fetching ? 'LOADING...' : "LOAD MORE JOBS"}</button>
            }
        </div >
    )
}

export default JobBoard