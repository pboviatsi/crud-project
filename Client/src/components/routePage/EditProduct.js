import React, {useEffect, useState} from "react";
import {withRouter, useHistory} from "react-router-dom";
import axios from "axios";

import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import Box from '@material-ui/core/Box';
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import Alert from '@material-ui/lab/Alert';

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
        const {name, value} = e.target;
        setRows({...rows, [name]: value});
    }

    //ενημέρωση προϊόντος
    async function updateProduct(newData) {
        try {
            await axios.put(`/products/${product_id}`, newData);
            snackBarOpen();
            setSnackbarMessage(<><Alert severity="success">Ενημερώθηκε ένα προϊόν!</Alert></>);
        } catch (error) {
            console.log(error);
            snackBarOpen();
            setSnackbarMessage(<><Alert severity="error">Server error!</Alert></>);
        }
        ;
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

    const handleOnUpdate = (e) => updateProduct(rows);

    useEffect(() => {
        (async () => {
            try {
                const result = await axios.get(`/products/${product_id}`)
                setRows({...result.data[0]});
            } catch (error) {
                console.log(error);
                snackBarOpen();
                setSnackbarMessage(<><Alert severity="error">Server error!</Alert></>);
            }
            ;
        })();
    }, [product_id]);

    return (
        <>
            <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="white">
                <Box p={1} bgcolor="grey.300">
                    <TextField
                        name="name_product"
                        id="name_product"
                        label="Τίτλος Προϊόντος"
                        required
                        fullWidth
                        value={rows.name_product || ''}
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        name="descr"
                        id="descr"
                        label="Περιγραφή Προϊόντος"
                        multiline
                        fullWidth
                        value={rows.descr || ''}
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        name="price"
                        id="price"
                        label="Τιμή προϊόντος"
                        fullWidth
                        value={rows.price || ''}
                        type="number"
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        name="availability_count"
                        id="availability_count"
                        label="Διαθέσιμη ποσότητα προϊόντος"
                        fullWidth
                        value={rows.availability_count || ''}
                        type="number"
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        name="product_link"
                        id="product_link"
                        label="Link Προϊόντος"
                        fullWidth
                        value={rows.product_link || ''}
                        margin="normal"
                        onChange={handleChange}
                    />

                    <Button className={classes.button} onClick={handleOnUpdate}>
                        Ενημερωση προϊοντος
                    </Button>
                </Box>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={snackBarClose}
                TransitionComponent={transition}
                key={transition ? transition.name : ''}
            >
                {snackbarMessage}
            </Snackbar>
        </>
    );
}

export default withRouter(EditProduct);
