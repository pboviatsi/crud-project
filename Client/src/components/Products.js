import React, {useEffect, useState} from "react";
import axios from "axios";

import {makeStyles} from "@material-ui/core";
import Table from "@material-ui/core/Table/Table";
import TableContainer from "@material-ui/core/TableContainer/TableContainer";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    table: {
        //minWidth: 650,
    },
});

export default function Products(props) {
    const classes = useStyles();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:3000/products',
            );
            setRows(result.data);
        };

        fetchData();
    }, []);

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Κωδικός</TableCell>
                            <TableCell align="center">Τίτλος</TableCell>
                            <TableCell align="center">Περιγραφή</TableCell>
                            <TableCell align="center">Τιμή</TableCell>
                            <TableCell align="center">Διαθεσιμότητα</TableCell>
                            <TableCell align="center">Url προϊόντος</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.product_id}>
                                <TableCell component="th" scope="row">
                                    {row.product_id}
                                </TableCell>
                                <TableCell align="left">{row.name_product}</TableCell>
                                <TableCell align="left">{row.descr}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.availability_count}</TableCell>
                                <TableCell align="left">{row.product_link}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" component={Link}>
                Νέο προϊόν
            </Button>
        </>
    );
}
