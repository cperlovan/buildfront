import React, { useEffect, useState } from 'react'
//import * as ReactRedux from "react-redux";
import { getJobs, getPo, getBills } from '../actions'
import { useDispatch, useSelector } from "react-redux";
import Home from './Home';
import "./Navbar.css";


export default function Reportpo() {
    const dispatch = useDispatch();
   const [temp, setTemp]= useState("")
    useEffect(() => {
        dispatch(getPo())
        dispatch(getBills())
        dispatch(getJobs())
    }, [dispatch])

    

    let alljob = [];
    alljob = useSelector((state) => state.allJobs) || [];
    alljob.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    });

    // Purchase  Order 

    let allPo = useSelector((state) => state.allPos) || [];
    // const allP = useSelector((state)=> state.allPos)
     const [sel, setSel] = useState([])
     
    const handleChange = (e)=>{
        const index = e.target.selectedIndex;
        setSel({
            "name": e.target.options[index].text
        });
    }

   

    const handleChangePaid = (e)=>{
       const index = e.target.value;
       setTemp({
        "val": e.target.options[index].text
    });
        // dispatch(poFilterByPaid(e.target.value));
        // setTemp(e.target.value)
        
    }
    
    //filtrado por JObs
    const [Jobs,setJobs]=useState([])
   useEffect(() => {
        const results = allPo.filter((po) =>
          po.job.includes(sel.name)
        );
        setJobs(results);
      }, [sel]);

    useEffect(() => {
        const results = allPo.filter((po) =>
          po.paid.includes(temp.val) &&  po.job.includes(sel.name)
        );
        setJobs(results);
      }, [temp]);
 

    
    return (
        <div>
            <Home />
            <div>
                <div className='filtro' >
                    <h5>Reports PURCHASE ORDER</h5>
                    <label htmlFor="job" className='label'> Filter by job 
                    <select name="job" id="job" className='custom-select' onChange={handleChange} >
                        <option value={0} className='option'></option>
                        {alljob && alljob.map((job) => (
                            <option key={job.id} value={job.id}>{job.name}</option>
                        ))
                        }
                    </select>
                    </label>
                    <label htmlFor="paid" className='label'> Filter by paid 
                        <select name="paid" id="paid" className='custom-select' onChange={handleChangePaid}>
                            <option value={0} className='option'></option>
                            <option key={1} value={1} >Voided</option>
                            <option key={2} value={2}>Fully Paid</option>
                            <option key={3}value={3}>Not Paid</option>
                            <option key={4} value={4}>Partially Paid</option>
                            {/* { unico && unico.map((pago)=>(
                                <option key={pago} value={pago} className='option'>{pago}</option>
                            ))} */}
                        </select> 
                    </label>
                </div>
                <div className='detail'>
                    {(Jobs && Jobs.length > 0) && (
                        <div>
                            <table id="Datatable" className='table  table-hover table-striped mt-3'>
                                <thead>
                                    <tr className='tr'>
                                        {Object.keys(Jobs[0]).map((key, index) => (
                                            <th key={index}>{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Jobs.map((fila, filaIndex) => (

                                        <tr key={filaIndex} className='tr'>
                                            {Object.values(fila).map((value, colIndex) => (
                                                <td key={colIndex}>{value} </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                    }
                </div>
            </div>

        </div>
    )
}
