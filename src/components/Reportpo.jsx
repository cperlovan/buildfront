import React, { useEffect, useState } from 'react'
//import * as ReactRedux from "react-redux";
import { getJobs, getPo, getBills } from '../actions'
import { useDispatch, useSelector } from "react-redux";
import Home from './Home';
import "./Navbar.css";
import DataTable from 'react-data-table-component';

export default function Reportpo() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPo())
        dispatch(getBills())
        dispatch(getJobs())
    }, [])




  let allPo = useSelector((state) => state.allPos);
    

  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(allPo);
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
            name: 'P.0.',
            selector: row => row.ponumber,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
      /*   {
            name: 'Variance code',
            selector: row => row.variancecode,
            sortable: true,
        }, */
        {
            name: 'Cost code',
            selector: row => row.costcode,
            sortable: true,
        },
        {
            name: 'Performed by',
            selector: row => row.performedby,
            sortable: true,
        },
        {
            name: 'Est complete',
            selector: row => row.estcomplete,
            sortable: true,
        },
        {
            name: 'P.O. Status',
            selector: row => row.postatus,
            sortable: true,
        },
        {
            name: 'Work status',
            selector: row => row.workstatus,
            sortable: true,
        },
        {
            name: 'Paid',
            selector: row => row.paid,
            sortable: true,
        },
        {
            name: 'Cost',
            selector: row => row.cost,
            sortable: true,
        },
    ];

 
    const [record, setrecord] = useState(allPo)

    const handleChangeFilter = (e) => {
        const filteredRecords = allPo && allPo.filter(record => {
            return record.job.toLowerCase().includes(e.target.value.toLowerCase()) ||
                 record.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
                 record.performedby.toLowerCase().includes(e.target.value.toLowerCase()) ||
                 record.postatus.toLowerCase().includes(e.target.value.toLowerCase())
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
                title="PURCHASE ORDER INFORMATION"
                fixedHeader
                columns={columns}
                data={record}
                progressPending={pending}
                pagination
                paginationPerPage={10}
                

            />

        </div>
    )
}
