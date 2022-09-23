import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper} from '@mui/material';

const UserTable = ({ headers, userData }) => {

    return (
        <div className='table-fixed'>
            <Paper  style={{'display': 'block'}}>
                <TableContainer overflow="scroll">
                    <Table stickyHeader aria-label="sticky table" overflow="scroll">
                        <TableHead>
                            <TableRow>
                                {headers.map(row => {
                                    return (
                                        <TableCell style={{ "fontWeight": "bold" }}>{row.label}</TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {userData.map(row => (
                                <TableRow
                                    key={row.id}
                                >
                                    <TableCell>{row.order_created_at}</TableCell>
                                    <TableCell>{row.product_title}</TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                    <TableCell>{row.product_image}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default UserTable;