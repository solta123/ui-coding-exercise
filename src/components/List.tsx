import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Reports from '../api/reports.json';
import { REPORTS } from '../constants/reports';
import './List.css';

const List = () => {
    const [reports, setReports] = useState(Reports.content);
    const [billingPeriod, setBillingPeriod] = useState('201708');
    const [sortBy, setSortBy] = useState('name');

    const handleBillingPeriodChange = (newBillingPeriod: string) => {
        setBillingPeriod(newBillingPeriod);
        const newReports = REPORTS.filter((report: string[]) => report[1] === newBillingPeriod);
        const newState = Reports.content.filter(report => newReports.find((rep: string[]) => rep[0] === report.id.toString()));
        setReports(newState);
    };

    const handleSortByChange = (newSortBy: string) => {
        setSortBy(newSortBy);
        if (newSortBy === 'name' || newSortBy === 'description') {
            const newReports = reports.sort((rep1: any, rep2: any) => rep1[newSortBy].localeCompare(rep2[newSortBy])); 
            setReports(newReports);
        }
    };
    
    return (
        <>
            <h1>Reports App</h1>
            <div className='list-header'>
                <div>
                    <label htmlFor='billing-period'>Billing period: </label>
                    <select id='billing-period' value={billingPeriod} onChange={(newValue) => handleBillingPeriodChange(newValue.target.value)}>
                        <option value={'201708'}>2017-08</option>
                        <option value={'201709'}>2017-09</option>
                        <option value={'201710'}>2017-10</option>
                    </select>
                </div>
                <div className='grid-item2'>
                    <label htmlFor="sort-by">Sort by: </label>
                    <select id='sort-by' value={sortBy} onChange={(newValue) => handleSortByChange(newValue.target.value)}>
                        <option value={'name'}>Name</option>
                        <option value={'description'}>Description</option>
                    </select>
                </div>
            </div>
            <ul>
                {
                    reports.map(report => (
                        <li key={report.id}>
                            <h2>{report.name}</h2>
                            <div>{report.description}</div>
                            <Link to={`/${report.id}/${billingPeriod}`}>View report</Link>
                        </li>
                    ))
                }
            </ul>
        </>
    );
};

export default List;
