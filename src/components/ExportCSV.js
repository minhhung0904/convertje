import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Button} from '@mui/material';
import * as XLSX from 'xlsx';
import UserTable from './UserTable';
const axios = require('axios');

const ExportCSV = (props) => {
    let url ="https://www.amzgiftboutique.com/api/copt/sale-notifications.json"

    const fileName = "file-detail";

    const [userData, setUserData] = useState([]);

    const headers = [
        { label: "Id", key: "id" },
        { label: "Product", key: "product_title" },
        { label: "Order Created At", key: "order_created_at" },
    ];

    useEffect(() => {
        getUserData();
    }, []) 

    const downloadExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, "DataSheet.xlsx");
    };


    const getUserData = async () => {
        let pagenum = 1
        let coi 
        if(url) {
          coi  = await axios.get(url+'?page='+pagenum)
        }
        let sale_data=[]

        while (coi && coi.data.sale_notifications.length !== 0)
        {
            pagenum++
            console.log(coi.data)
            sale_data = sale_data.concat(coi.data.sale_notifications)

            coi = await axios.get(url+'?page='+pagenum)
        }
        for (let i = 0 ;i < sale_data.length ; i++) {
            sale_data[i].order_created_at = new Date(sale_data[i].order_created_at*1000).toLocaleDateString()
        }
        console.log(sale_data.sale_notifications)
        
        setUserData(sale_data)
    }


    return (
        <div className='container'>
            

            <Button
                variant="contained"
                color="primary"
                className='export-btn'
            >
                <CSVLink
                    headers={headers}
                    data={userData}
                    filename={fileName}
                    style={{ "textDecoration": "none", "color": "#fff" }}
                >
                    {'Export Data'}
                </CSVLink>

            </Button>

            <button onClick={downloadExcel(userData)}>
                Download As Excel
            </button>
            


            <UserTable headers={headers} userData={userData} />
        </div>
    );
}

export default ExportCSV;