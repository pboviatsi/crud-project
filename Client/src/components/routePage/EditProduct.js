import React, {useEffect, useState} from "react";
import {withRouter, useHistory} from "react-router-dom";
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

function EditProduct(props) {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);
    const [snackbarMessage, setSnackbarMessage] = useState();
    const history = useHistory();
    let product_id = props.location.pathname.substring(13);

    function handleChange(e) {
        const { name, value } = e.target;
        setRows({ ...rows, [name]: value });
    }

    //ενημέρωση προϊόντος
    function updateProduct(newData){
        axios.put(`/products/${product_id}`,newData)
            .then((result)=>{
                snackBarOpen();
                setSnackbarMessage('Ενημερώθηκε ένα προϊόν');
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
        history.push("/");
    };

    useEffect(() => {
        axios.get(`/products/${product_id}`)
            .then(function (result) {
                setRows({ ...result.data[0]});
            })
            .catch((error)=>{
                alert(error);
            });
    }, [product_id]);

    return (
        <>
            <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="white">
                <Box p={1} bgcolor="grey.300">
                    <TextField
                        name="name_product"
                        label="Τίτλος Προϊόντος"
                        required
                        id="standard-helperText"
                        fullWidth
                        value={rows.name_product ||''}
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        name="descr"
                        id="standard-helperText"
                        label="Περιγραφή Προϊόντος"
                        multiline
                        fullWidth
                        value={rows.descr ||''}
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        name="price"
                        id="standard-helperText"
                        label="Τιμή προϊόντος"
                        fullWidth
                        value={rows.price ||''}
                        type="number"
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        name="availability_count"
                        id="standard-helperText"
                        label="Διαθέσιμη ποσότητα προϊόντος"
                        fullWidth
                        value={rows.availability_count ||''}
                        type="number"
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        name="product_link"
                        label="Link Προϊόντος"
                        id="standard-helperText"
                        fullWidth
                        value={rows.product_link ||''}
                        margin="normal"
                        onChange={handleChange}
                    />

                    <Button className={classes.button} onClick={(e) => updateProduct(rows)}>
                        Ενημερωση προϊοντος
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

export default withRouter(EditProduct);