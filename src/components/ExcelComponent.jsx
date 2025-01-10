import * as XLSX from 'xlsx';
import React, { useState } from 'react';

const ExcelComponent = () => {
    const [file, setFile] = useState(null);
    const [jobs, setJobs] = useState([]);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleFileUpload = (e) => {
        e.preventDefault();
        if (file) {
            try {
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    const data = e.target.result;
                    const excel = XLSX.read(data, { type: 'binary' });
                    const sheetName = excel.SheetNames[0];
                    const sheet = excel.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 0 });
                    setJobs(jsonData);
                };
                fileReader.readAsBinaryString(file);
            } catch (error) {
                console.error("Error leyendo el archivo");
            }
        } else {
            alert('No has seleccionado un archivo');
        }
    };

    return (
        <div className='container mt-5'>
            <form className='form mx-auto w-50' onSubmit={handleFileUpload}>
                <input type="file" onChange={handleFileChange} className='form-control' accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                <button className='btn btn-success mt-3'>Subir archivo</button>
            </form>
           
            {(jobs.length > 0) && (
                <div>
                    <table className='table  table-hover table-striped mt-3'>
                        <thead>
                            <tr>
                                {Object.keys(jobs[0]).map((key, index) => (
                                    <th key={index}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((fila, filaIndex) => (
                                <tr key={filaIndex}>
                                    {Object.values(fila).map((value, colIndex) => (
                                        <td key={colIndex}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
            }
        </div>
    );
};

export default ExcelComponent;
