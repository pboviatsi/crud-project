import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import Box from '@material-ui/core/Box';
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

const useStyles = makeStyles((theme) => ({
    button: {
        background: 'linear-gradient(2deg, #2196f338 30%, #21cbf370 90%)',
        boxShadow: '0 3px 5px 2px rgb(33 203 243 / 19%)',
        borderRadius: 100,
        height: 48,
        width: '100%',
        display: 'flex',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: theme.spacing(6),
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

export default function NewProduct(props) {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);
    const [snackbarMessage, setSnackbarMessage] = useState();
    const {getAllProduct, product} = props;
    const history = useHistory();

    function handleChange(e) {
        const { name, value } = e.target;
        setRows({ ...rows, [name]: value });
    }

    //προσθήκη νέου προϊόντος
    function addProduct(){
        axios.post(`/products`,rows)
            .then((result)=>{
                snackBarOpen();
                setSnackbarMessage('Προστέθηκε ένα προϊόν');
            })
            .catch((error)=>{
                alert(error);
            });
    }

    //άνοιγμα snackBar
    const snackBarOpen = () => {
        setOpen(true);
    };

    // κλείσιμο snackBar
    const snackBarClose = () => {
        setOpen(false);
        getAllProduct();
        history.push("/");
    };

    return (
        <>
            <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="white">
                <Box p={1} bgcolor="grey.300">
                    <TextField
                        name="name_product"
                        label="Τίτλος Προϊόντος"
                        required
                        id="validation-outlined-input"
                        fullWidth
                        placeholder="Παξιμάδια λαδιού με πιπεριά"
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        name="descr"
                        id="validation-outlined-input"
                        label="Περιγραφή Προϊόντος"
                        multiline
                        fullWidth
                        placeholder="Περιέχει: Αλεύρι, λάδι, πιπεριά, σκόρδο"
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        name="price"
                        id="outlined-textarea"
                        label="Τιμή προϊόντος"
                        fullWidth
                        placeholder="19,99"
                        type="number"
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        name="availability_count"
                        id="outlined-textarea"
                        label="Διαθέσιμη ποσότητα προϊόντος"
                        fullWidth
                        placeholder="250"
                        type="number"
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        name="product_link"
                        label="Link Προϊόντος"
                        id="validation-outlined-input"
                        fullWidth
                        placeholder="www.directmarket.gr/product.jsp?orgid=68615&productid=13586"
                        margin="normal"
                        onChange={handleChange}
                    />

                    <Button className={classes.button} onClick={addProduct}>
                        Προσθήκη νέου προϊόντος
                    </Button>
                </Box>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={snackBarClose}
                TransitionComponent={transition}
                message={snackbarMessage}
                key={transition ? transition.name : ''}
            />
        </>
    );
}
