import React, {useEffect, useState} from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function Products(props) {
    const classes = useStyles();
    const [rows, setRows] = useState([]);

    //παίρνω την εντολή ανοίγματος παραθύρου απο το Products.js
    const {open, setOpen} =props;
    const [values, setValues] = React.useState({
        amount: '',
    });

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

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
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle id="form-dialog-title">Νέο προϊόν</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Συμπληρώσε τα στοιχεία του νέου προϊόντος
                    </DialogContentText>
                    <TextField
                        className={classes.margin}
                        label="all filed"
                        required
                        variant="outlined"
                        id="validation-outlined-input"
                    />
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            value={values.amount}
                            onChange={handleChange('amount')}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            labelWidth={60}
                        />
                    </FormControl>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Multiline"
                        multiline
                        rowsMax={4}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
}
