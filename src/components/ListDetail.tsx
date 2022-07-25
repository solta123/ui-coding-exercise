import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Report } from '../types/report';
import './ListDetail.css';

const ListDetail = () => {
    const params = useParams();
    const [reports, setReports] = useState<Array<Array<string>>>([]);
    const [sortBy, setSortBy] = useState('');
    const [columns, setColumns] = useState<string[]>([]);
    const [loaded, setLoaded] = useState(false);
    const originalReport = useRef<Report>(undefined);

    useEffect(() => {
        try {
            const result = require(`../api/reports/${params.id}-${params.period}.json`);
            originalReport.current = { ...result };
            if (result) {
                setColumns(result.columns);
                setReports([...result.data]);
            }
        } catch (e) {
            console.log(e)
        }
        setLoaded(true);
    }, [params.id, params.period]);

    const handleSort = (newValue: string) => {
        if (originalReport.current) {
            if (newValue === sortBy) {
                setSortBy('');
                setReports(originalReport.current.data);
            } else {
                setSortBy(newValue);
                const column = columns.findIndex(column => column === newValue);
                const newReports = [...reports].sort(
                    (row1, row2) => row1[column].toString().localeCompare(row2[column].toString()));
                setReports([...newReports]);
            }
        }
    }

    if (!loaded) {
        return <div>Loading...</div>
    }

    if (!reports || !columns.length) {
        return (
            <>
                <div>Error happened while finding report data!</div>
                <Link to="/">Back to main page</Link>
            </>
        )
    }

    return (
        <>
            <Link to="/">Close</Link>
            <div>
                <table cellSpacing={5} cellPadding={3} className='detail-table'>
                    <thead id='table-header'>
                        <tr>
                            {
                                columns.map(column => (
                                    <td
                                        key={column}
                                        className={sortBy === column ? 'selected-column' : undefined}
                                        onClick={() => handleSort(column)}>
                                        {column}
                                    </td>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reports.map((rowData, i) => (
                                <tr key={`rowid-${i}`}>
                                    {
                                        rowData.map((cellData, j) => (
                                            <td key={`cellid-${i}-${j}`}>{cellData}</td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
};

export default ListDetail;
