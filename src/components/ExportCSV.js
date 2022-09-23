import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Button} from '@mui/material';
import UserTable from './UserTable';
import styled from 'styled-components';

const axios = require('axios');


const ExportCSV = () => {
    let url
    let pagenum
    let lastdata = []
    let sale_data=[]

    const [show,setshow] = useState(false)

    const fileName = "file-detail";

    const [userData, setUserData] = useState([]);

    const getInputValue = (event)=>{
        url = event.target.value;
    };

    const headers = [
        { label: "Time", key: "order_created_at" },
        { label: "Product", key: "product_title" },
        { label: "Amount", key: "amount" },
        { label: "Link Product", key: "product_image" },
    ];

    useEffect(() => {
        getUserData();
    }, []) 



    const getUserData = async () => {
        pagenum = 1
        let coi 
        if(url) {
          coi  = await axios.get(url+'?page='+pagenum)
        }

        while (coi && coi.data.sale_notifications.length !== 0)
        {
            pagenum++
            sale_data = sale_data.concat(coi.data.sale_notifications)

            coi = await axios.get(url+'?page='+pagenum)
            console.log(sale_data)
        }
        for (let i = 0 ;i < sale_data.length ; i++) {
            sale_data[i].order_created_at = new Date(sale_data[i].order_created_at*1000).toLocaleDateString()
        }

        while(sale_data.length !== 0) {
            let num = 1
            for (let i = 1; i<sale_data.length; i++) {
                if(sale_data[i].order_created_at === sale_data[0].order_created_at && sale_data[i].product_title === sale_data[0].product_title) {
                    num ++
                    console.log(num)
                    sale_data.splice(i,1)
                    console.log(sale_data)
                    //i--
                }
            }

            lastdata.push({
                order_created_at: sale_data[0].order_created_at || null,
                product_title: sale_data[0].product_title || null,
                amount : num || null,
                product_image: sale_data[0].product_image || null
            })
            sale_data.shift()
            console.log(lastdata)
        }
        
        setUserData(lastdata)
    }


    return (
        <div className='container'>
            {!show && <Label htmlFor="Url">Url</Label>}
            {!show && <Input type="text" id="Url" onChange={getInputValue} />}
            {!show && <Button  className='-btn' onClick={()=>{
                setshow(!show)
                getUserData()       
            }}>Get Json</Button>}
            {show && <Button  className='-btn' onClick={()=>{
                setshow(!show)
                getUserData()      
            }}>Back</Button>}
            <br></br>
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
          


            {show && <UserTable headers={headers} userData={userData} />}
        </div>
    );
}


const Label = styled.label`
`;


const Input = styled.input`
  width: 500px;
  height: 35px;
  margin-left: 15px;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
`;

export default ExportCSV;
