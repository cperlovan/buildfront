import React, { useEffect, useState} from 'react'
import Home from '../Home'
import './stylejobquery.css'
import { getJobs, getPo, getBills } from '../../actions'
import { useDispatch, useSelector } from "react-redux";
import DataTable from 'react-data-table-component';
import Card from './Card';



export default function JobQuery() {
  const dispatch = useDispatch();

  let allJob = useSelector((state) => state.allJobs);
   allJob = allJob?.map ((j)=>j)
  let allPo = useSelector((state)=>state.allPos);
   allPo = allPo?.map((p)=>p)
   let allBill = useSelector((state)=>state.allBills);
   allBill = allBill?.map((p)=>p)
  

  useEffect(() => {
    dispatch(getJobs())
    dispatch(getPo())
    dispatch(getBills)
  }, [dispatch])
   
  const [record, setrecord] = useState(allJob)
  const [pending, setPending] = useState(true);

    const [rows, setRows] = useState([]);
    useEffect(() => {
      const timeout = setTimeout(() => {
        setRows(allJob);
        setPending(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }, []);
  
      const handleChangeFilter = (e) => {
          const filteredRecords = allJob && allJob.filter(record => {
              return record.Name.toLowerCase().includes(e.target.value.toLowerCase()) 
                  
          })
          setrecord(filteredRecords)
      }
      const customStyles = {
        title: {
          style: {
            fontColor: 'red',
            fontWeight: '900',
          }
        },
        rows: {
          style: {
            minHeight: '30px', // override the row height
          }
        },
        headCells: {
          style: {
            fontSize: '12px',
            fontWeight: '500',
            textTransform: 'uppercase',
            paddingLeft: '0 8px'
          },
        },
        cells: {
          style: {
            fontSize: '11px',
            paddingLeft: '0 8px',
          },
        },
      };
  const columns = [
    {
      name: 'Jobs',
      selector: row => row.Name,
      sortable: true,
      
    }
  ];

   const [selectedRows, setSelectedRows] = useState([]);
   const [toggledClearRows, setToggleClearRows] = useState(false);
   
  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows)
  }
  
  const handleClearRows  = () => {
    setToggleClearRows(!toggledClearRows);
  }

  const [filteredpo,setFilteredpo]= useState([])
       useEffect(() => {
          const results = allPo && allPo.filter((po) =>
            po.job.includes(selectedRows.Name)
          );
          
          setFilteredpo(results);
        }, [selectedRows]);

        
        

  return (
    <div className='query'>
      <Home />
      <div className='container'>

      
        
        <div className='aside'>
           
          <div>

            <div className='spacefilter'>
              <label htmlFor="search" className='labelfilter'> Search </label>
              <input className='search' type="text" id='search' name='search'
                onChange={handleChangeFilter}
              />

            </div>
            <DataTable
              fixedHeader
              columns={columns}
              data={record}
              progressPending={pending}
              pagination
              paginationPerPage={8}
              selectableRows
              onSelectedRowsChange={handleChange}
              clearSelectedRows={toggledClearRows}
              customStyles={customStyles}
            />

          </div>
        </div>
        <div className='info'>

          <Card jobselect={selectedRows} po={allPo} bills={allBill} />
        </div>
      </div>
    </div>
  )
}
