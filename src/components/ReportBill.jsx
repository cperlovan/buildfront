import React, { useEffect, useState } from 'react'
//import * as ReactRedux from "react-redux";
import { getJobs, getPo, getBills } from '../actions'
import { useDispatch, useSelector } from "react-redux";
import Home from './Home';
import "./Navbar.css";
import DataTable from 'react-data-table-component';

export default function ReportBill() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPo())
        dispatch(getBills())
        dispatch(getJobs())
    }, [dispatch])



    let allBill = useSelector((state) => state.allBills);
    allBill = allBill?.map((b)=>b)
    
    
    
    const [pending, setPending] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(allBill);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);



    const columns = [
        /* {
            name: 'id',
            selector: row => row.id,
        }, */
        {
            name: 'Job',
            selector: row => row.job,
            sortable: true,
        },
        {
            name: 'Bill',
            selector: row => row.bill,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Pay To',
            selector: row => row.payto,
            sortable: true,
        },
        {
            name: 'Bill Amount',
            selector: row => row.billamount,
            sortable: true,
        },
        {
            name: 'Invoice Date',
            selector: row => row.invoicedate,
            sortable: true,
        },
        {
            name: 'Due Date',
            selector: row => row.duedate,
            sortable: true,
        },
        {
            name: 'Bill Status',
            selector: row => row.billstatus,
            sortable: true,
        },
        {
            name: 'Date Paid',
            selector: row => row.datepaid,
            sortable: true,
        },
        {
            name: 'Paid By',
            selector: row => row.paidby,
            sortable: true,
        },
        {
            name: 'Created Date',
            selector: row => row.createdate,
            sortable: true,
        },
        {
            name: 'Files',
            selector: row => row.files,
            sortable: true,
        },
        {
            name: 'Comments',
            selector: row => row.comments,
            sortable: true,
        },
        {
            name: 'Variance Codes',
            selector: row => row.variancecode,
            sortable: true,
        },
        {
            name: 'Cost Codes',
            selector: row => row.costCode,
            sortable: true,
        },
        {
            name: 'Related POs',
            selector: row => row.relatedpos,
            sortable: true,
        },
        /* {
            name: 'Lien Waivers',
            selector: row => row.lienwaivers,
            sortable:true,
        } */
    ];


    const [record, setrecord] = useState(allBill)

    const handleChangeFilter = (e) => {
        const filteredRecords = allBill && allBill?.filter(record => {
            return record.job.toLowerCase().includes(e.target.value.toLowerCase()) //||
            // record.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
            // record.payto.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setrecord(filteredRecords)
    }

    return (
        <div>
            <Home />
            <div className='spacefilter'>
                <label htmlFor="search" className='labelfilter'> Search </label>
                    <input className='search' type="text" id='search' name='search'
                        onChange={handleChangeFilter}
                    />
            </div>
            <DataTable
                title="BILLS INFORMATION"
                fixedHeader
                columns={columns}
                data={rows}
                progressPending={pending}
                pagination
                paginationPerPage={10}


            />

        </div>
    )
}
