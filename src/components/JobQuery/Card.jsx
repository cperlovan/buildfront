import React, { useEffect } from 'react'

import './stylejobquery.css'
import { getPo, getBills } from '../../actions'
import { useDispatch } from "react-redux";


export default function Card(props) {

    const formatNumber = (number)=>{
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number)
    }

    const dispatch = useDispatch();

    const carga = props.jobselect
    const PO = props.po
    const po = PO?.map((a) => a)
    const BILL = props.bills
    const bi = BILL?.map((b) => b)

     // paid

    const billxpaytoxjobPaid = bi?.reduce((result, bill) => {
        // Iteramos sobre los trabajos a analizar
        for (const jobName of carga) {
            if (bill.job === jobName.Name && bill.billstatus === "Paid") {
                const { payto, job, billamount } = bill;
                result[payto] = result[payto] || {};
                result[payto][job] = (result[payto][job] || 0) + billamount;

                // Acumulamos el total por proyecto
                // result.totalPorProyecto = result.totalPorProyecto || {};
                // result.totalPorProyecto[job] = (result.totalPorProyecto[job] || 0) + billamount;

                break; // Una vez encontrada una coincidencia, salimos del bucle
            }
        }
        return result;
    }, {});
     // ready for payment
    const billxpaytoxjobReady = bi?.reduce((result, bill) => {
        // Iteramos sobre los trabajos a analizar
        for (const jobName of carga) {
            if (bill.job === jobName.Name && bill.billstatus === "Ready For Payment") {
                const { payto, job, billamount } = bill;
                result[payto] = result[payto] || {};
                result[payto][job] = (result[payto][job] || 0) + billamount;

                // Acumulamos el total por proyecto
                // result.totalPorProyecto = result.totalPorProyecto || {};
                // result.totalPorProyecto[job] = (result.totalPorProyecto[job] || 0) + billamount;

                break; // Una vez encontrada una coincidencia, salimos del bucle
            }
        }
        return result;
    }, {});

    // Open - Requested
    const billxpaytoxjobOpen = bi?.reduce((result, bill) => {
        // Iteramos sobre los trabajos a analizar
        for (const jobName of carga) {
            if (bill.job === jobName.Name && bill.billstatus === 'Open - Requested') {
                const { payto, job, billamount } = bill;
                result[payto] = result[payto] || {};
                result[payto][job] = (result[payto][job] || 0) + billamount;

                // Acumulamos el total por proyect
                // result.totalPorProyecto = result.totalPorProyecto || {};
                // result.totalPorProyecto[job] = (result.totalPorProyecto[job] || 0) + billamount;

                break; // Una vez encontrada una coincidencia, salimos del bucle
            }
        }
        return result;
    }, {});

      // Purchase order not paid

    const poxPerformedbyxJobNotPaid = po?.reduce((result, pos) => {
        
        // Iteramos sobre los trabajos a analizar
        for (const jobName of carga) {
            if (pos.job === jobName.Name && pos.paid === 'Not Paid') {
                const { performedby, job, cost } = pos;
                result[performedby] = result[performedby] || {};
                result[performedby][job] = (result[performedby][job] || 0) + cost;
                
                // Acumulamos el total por proyecto
                //result.totalPorProyecto = result.totalPorProyecto || {};
                // result.totalPorProyecto[job] = (result.totalPorProyecto[job] || 0) + cost;

                break; // Una vez encontrada una coincidencia, salimos del bucle
            }
        }

        return result;
    }, {});

    // Purchase order Partially Paid

    const poxPerformedbyxJobNotPartially = po?.reduce((result, pos) => {
        
        // Iteramos sobre los trabajos a analizar
        for (const jobName of carga) {
            if (pos.job === jobName.Name && pos.paid === 'Partially Paid') {
                const { performedby, job, cost } = pos;
                result[performedby] = result[performedby] || {};
                result[performedby][job] = (result[performedby][job] || 0) + cost;
                
                // Acumulamos el total por proyecto
                //result.totalPorProyecto = result.totalPorProyecto || {};
                // result.totalPorProyecto[job] = (result.totalPorProyecto[job] || 0) + cost;

                break; // Una vez encontrada una coincidencia, salimos del bucle
            }
        }

        return result;
    }, {});

    // Purchase order Fully Paid

    const poxPerformedbyxJobNotFully = po?.reduce((result, pos) => {
        
        // Iteramos sobre los trabajos a analizar
        for (const jobName of carga) {
            if (pos.job === jobName.Name && pos.paid === 'Fully Paid') {
                const { performedby, job, cost } = pos;
                result[performedby] = result[performedby] || {};
                result[performedby][job] = (result[performedby][job] || 0) + cost;
                
                // Acumulamos el total por proyecto
                //result.totalPorProyecto = result.totalPorProyecto || {};
                // result.totalPorProyecto[job] = (result.totalPorProyecto[job] || 0) + cost;

                break; // Una vez encontrada una coincidencia, salimos del bucle
            }
        }

        return result;
    }, {});

    // Purchase order Voided

    const poxPerformedbyxJobNotVoided = po?.reduce((result, pos) => {
        
        // Iteramos sobre los trabajos a analizar
        for (const jobName of carga) {
            if (pos.job === jobName.Name && pos.paid === 'Voided') {
                const { performedby, job, cost } = pos;
                result[performedby] = result[performedby] || {};
                result[performedby][job] = (result[performedby][job] || 0) + cost;
                
                // Acumulamos el total por proyecto
                //result.totalPorProyecto = result.totalPorProyecto || {};
                // result.totalPorProyecto[job] = (result.totalPorProyecto[job] || 0) + cost;

                break; // Una vez encontrada una coincidencia, salimos del bucle
            }
        }

        return result;
    }, {});

    useEffect(() => {
        dispatch(getPo())
        dispatch(getBills())
    }, [dispatch])


    return (

        <>

            <div className="card">
                <div className="cardunidad" >
                    <div className="cardtexto">
                        {carga?.map(({ Name, StreetAddress, State, ActualCompletion, ActualStart, ContractPrice, CostsOutstanding, CostsPaid, JobRunningTotal, PaymentsReceived, ProjCompletion, ProjStart, TotalCosts }) => (
                            <div className='job'>
                                <div className="name" >Jobs:  {Name}</div>

                                <div className='infojob'>
                                    <p key={Name + StreetAddress}><strong>address: </strong>{StreetAddress}</p>
                                    <p key={Name + State}> <strong>State: </strong> {State}</p>
                                    <p key={Name + ActualCompletion}> <strong>Actual Completion: </strong> {ActualCompletion} </p>
                                    <p key={Name + ActualStart}> <strong>ActualStart: </strong> {ActualStart} </p>
                                </div>
                                <div className='infojob'>
                                    <p key={Name + ContractPrice}><strong>Contract Price: </strong>{formatNumber(ContractPrice)}</p>
                                    <p key={Name + CostsOutstanding}> <strong>Costs Outstanding: </strong> {formatNumber(CostsOutstanding)}</p>
                                    <p key={Name + CostsPaid}> <strong>Costs Paid: </strong> {formatNumber(CostsPaid)} </p>
                                    <p key={Name + JobRunningTotal}> <strong>Job Running Total: </strong> {formatNumber(JobRunningTotal)} </p>
                                </div>
                                <div className='infojob'>
                                    <p key={Name + PaymentsReceived}><strong>Payments Received: </strong>{formatNumber(PaymentsReceived)}</p>
                                    <p key={Name + ProjCompletion}> <strong>Proj Completion: </strong> {ProjCompletion}</p>
                                    <p key={Name + ProjStart}> <strong>Proj. Start: </strong> {ProjStart} </p>
                                    <p key={Name + TotalCosts}> <strong>Total Costs: </strong> {formatNumber(TotalCosts)} </p>
                                </div>
                            </div>
                        ))}
                        
                        <div className="detailjob">
                            <div className='bill'>
                            <div className="title">Bills:</div>
                                <table className='table table-hover table-striped mt-3 text-black-50'>
                                    <thead>
                                        <tr>
                                            <th>Vendor</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {billxpaytoxjobPaid && 
                                            Object.keys(billxpaytoxjobPaid).map(vendor => (
                                                <tr key={vendor}>
                                                    <td>{vendor}</td>
                                                    <td>{formatNumber(billxpaytoxjobPaid[vendor][Object.keys(billxpaytoxjobPaid[vendor])[0]])} </td>
                                                    <td>Paid</td>
                                                </tr>
                                            ))}
                                        <tr>
                                            <td className='bold'>Total</td>
                                            <td className='bold'>{billxpaytoxjobPaid &&
                                               formatNumber( Object.values(billxpaytoxjobPaid)
                                                    .map(obj => Object.values(obj)[0])
                                                    .reduce((total, amount) => total + amount, 0)
                                           ) }</td>
                                           <td className='bold'>Paid</td>
                                        </tr> 
                                    </tbody>
                                </table>
                                {/* Ready for paid */}
                                <hr />
                                <table className='table table-hover table-striped mt-3 text-black-50'>
                                    <thead>
                                        <tr>
                                            <th>Vendor</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {billxpaytoxjobReady && 
                                            Object.keys(billxpaytoxjobReady).map(vendor => (
                                                <tr key={vendor}>
                                                    <td>{vendor}</td>
                                                    <td>{formatNumber(billxpaytoxjobReady[vendor][Object.keys(billxpaytoxjobReady[vendor])[0]])} </td>
                                                    <td>Ready For Payment</td>
                                                </tr>
                                            ))}
                                        <tr>
                                            <td className='bold'>Total</td>
                                            <td className='bold'>{billxpaytoxjobReady &&
                                               formatNumber( Object.values(billxpaytoxjobReady)
                                                    .map(obj => Object.values(obj)[0])
                                                    .reduce((total, amount) => total + amount, 0)
                                           ) }</td>
                                           <td className='bold'>Ready For Payment</td>
                                        </tr> 
                                    </tbody>
                                </table>
                                {/* Open - Requested */}
                                <hr />
                                <table className='table table-hover table-striped mt-3 text-black-50'>
                                    <thead>
                                        <tr>
                                            <th>Vendor</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {billxpaytoxjobOpen && 
                                            Object.keys(billxpaytoxjobOpen).map(vendor => (
                                                <tr key={vendor}>
                                                    <td>{vendor}</td>
                                                    <td>{formatNumber(billxpaytoxjobOpen[vendor][Object.keys(billxpaytoxjobOpen[vendor])[0]])} </td>
                                                    <td>Open - Requested</td>
                                                </tr>
                                            ))}
                                        <tr>
                                            <td className='bold'>Total</td>
                                            <td className='bold'>{billxpaytoxjobOpen &&
                                               formatNumber( Object.values(billxpaytoxjobOpen)
                                                    .map(obj => Object.values(obj)[0])
                                                    .reduce((total, amount) => total + amount, 0)
                                           ) }</td>
                                           <td className='bold'>Open - Requested</td>
                                        </tr> 
                                    </tbody>
                                </table>
                            </div>
                            <div className='bill'>
                            <div className="title">Purchase order:</div>
                                <table className='table table-hover table-striped mt-3 text-black-50'>
                                    <thead>
                                        <tr>
                                            <th>Perfomed by </th>
                                            <th>Cost</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {poxPerformedbyxJobNotPaid &&
                                            Object.keys(poxPerformedbyxJobNotPaid).map(vendor => (
                                                <tr key={vendor}>
                                                    <td>{vendor}</td>
                                                    <td>{formatNumber(poxPerformedbyxJobNotPaid[vendor][Object.keys(poxPerformedbyxJobNotPaid[vendor])[0]])} </td>
                                                    <td>Not Paid</td>
                                                </tr>
                                            ))}
                                        <tr>
                                            <td className='bold'>Total</td>
                                            <td className='bold'>{poxPerformedbyxJobNotPaid &&
                                               formatNumber( Object.values(poxPerformedbyxJobNotPaid)
                                                    .map(obj => Object.values(obj)[0])
                                                    .reduce((total, amount) => total + amount, 0)
                                           ) }</td>
                                           <td className='bold'>Not Paid</td>
                                        </tr> 
                                    </tbody>
                                </table>
                                {/* partially paid */}
                                <hr />
                                <table className='table table-hover table-striped mt-3 text-black-50'>
                                    <thead>
                                        <tr>
                                            <th>Perfomed by </th>
                                            <th>Cost</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {poxPerformedbyxJobNotPartially &&
                                            Object.keys(poxPerformedbyxJobNotPartially).map(vendor => (
                                                <tr key={vendor}>
                                                    <td>{vendor}</td>
                                                    <td>{formatNumber(poxPerformedbyxJobNotPartially[vendor][Object.keys(poxPerformedbyxJobNotPartially[vendor])[0]])} </td>
                                                    <td>Partially Paid</td>
                                                </tr>
                                            ))}
                                        <tr>
                                            <td className='bold'>Total</td>
                                            <td className='bold'>{poxPerformedbyxJobNotPartially &&
                                               formatNumber( Object.values(poxPerformedbyxJobNotPartially)
                                                    .map(obj => Object.values(obj)[0])
                                                    .reduce((total, amount) => total + amount, 0)
                                           ) }</td>
                                           <td className='bold'>Partially Paid</td>
                                        </tr> 
                                    </tbody>
                                </table>
                                {/* Fully paid */}
                                <hr />
                                <table className='table table-hover table-striped mt-3 text-black-50'>
                                    <thead>
                                        <tr>
                                            <th>Perfomed by </th>
                                            <th>Cost</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {poxPerformedbyxJobNotFully &&
                                            Object.keys(poxPerformedbyxJobNotFully).map(vendor => (
                                                <tr key={vendor}>
                                                    <td>{vendor}</td>
                                                    <td>{formatNumber(poxPerformedbyxJobNotFully[vendor][Object.keys(poxPerformedbyxJobNotFully[vendor])[0]])} </td>
                                                    <td>Fully Paid</td>
                                                </tr>
                                            ))}
                                        <tr>
                                            <td className='bold'>Total</td>
                                            <td className='bold'>{poxPerformedbyxJobNotFully &&
                                               formatNumber( Object.values(poxPerformedbyxJobNotFully)
                                                    .map(obj => Object.values(obj)[0])
                                                    .reduce((total, amount) => total + amount, 0)
                                           ) }</td>
                                           <td className='bold'>Fully Paid</td>
                                        </tr> 
                                    </tbody>
                                </table>
                                {/* Voided */}
                                <hr />
                                <table className='table table-hover table-striped mt-3 text-black-50'>
                                    <thead>
                                        <tr>
                                            <th>Perfomed by </th>
                                            <th>Cost</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {poxPerformedbyxJobNotVoided &&
                                            Object.keys(poxPerformedbyxJobNotVoided).map(vendor => (
                                                <tr key={vendor}>
                                                    <td>{vendor}</td>
                                                    <td>{formatNumber(poxPerformedbyxJobNotVoided[vendor][Object.keys(poxPerformedbyxJobNotVoided[vendor])[0]])} </td>
                                                    <td>Voided</td>
                                                </tr>
                                            ))}
                                        <tr>
                                            <td className='bold'>Total</td>
                                            <td className='bold'>{poxPerformedbyxJobNotVoided &&
                                               formatNumber( Object.values(poxPerformedbyxJobNotVoided)
                                                    .map(obj => Object.values(obj)[0])
                                                    .reduce((total, amount) => total + amount, 0)
                                           ) }</td>
                                           <td className='bold'>Voided</td>
                                        </tr> 
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

            </div>


        </>
    )
}
