import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {Formik} from 'formik';
import * as Yup from 'yup';

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
    const history = useHistory();

    //προσθήκη νέου προϊόντος
    async function addProduct(){
        try {
            const result = await axios.post(`/products`,rows)
            snackBarOpen();
            setSnackbarMessage('Προστέθηκε ένα προϊόν');
        }catch (error) {
            console.log(error);
        };
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

    const ErrorMessagesSchema = Yup.object().shape({
        name_product: Yup.string()
            .min(2, 'Πολύ μικρό όνομα προϊόντος')
            .max(150, 'Πολύ μεγάλο όνομα προϊόντος')
            .required('Απαραίτητο πεδίο.'),
        price: Yup.number()
            .required('Απαραίτητο πεδίο.'),
        availability_count: Yup.number()
            .required('Απαραίτητο πεδίο.'),
        product_link: Yup.string()
            .trim()
            .matches(/^(?:http|https):\/\/((?:[\w-]+)(?:\.[\w-]+)+)(?:[\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-]*)?$/g,'Μη έγκυρο url προϊόντος')
            .required('Απαραίτητο πεδίο.'),
    });

    return (
        <>
            <Formik
                initialValues={{
                    name_product: '',
                    descr: '',
                    price: '',
                    availability_count: '',
                    product_link: ''
                }}
                validationSchema={ErrorMessagesSchema}
                onSubmit={values => {
                    addProduct();
                    console.log(values);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                  }) => (
                    <Box p={1} bgcolor="grey.300">
                        <form onSubmit={handleSubmit} display="flex" justifyContent="center" m={1} p={1} bgcolor="white">
                            <TextField
                                name="name_product"
                                id="name_product"
                                label="Τίτλος Προϊόντος"
                                fullWidth
                                placeholder="Παξιμάδια λαδιού με πιπεριά"
                                margin="normal"
                                onChange={e => {
                                            const {name, value} = e.target;
                                            setRows({...rows, [name]: value});
                                        }}
                                helperText={errors.name_product && touched.name_product && errors.name_product}
                            />
                            <TextField
                                name="descr"
                                id="descr"
                                label="Περιγραφή Προϊόντος"
                                multiline
                                fullWidth
                                placeholder="Περιέχει: Αλεύρι, λάδι, πιπεριά, σκόρδο"
                                margin="normal"
                                onChange={e => {
                                    const {name, value} = e.target;
                                    setRows({...rows, [name]: value});
                                }}
                                helperText={errors.descr && touched.descr && errors.descr}
                            />
                            <TextField
                                name="price"
                                id="price"
                                label="Τιμή προϊόντος"
                                fullWidth
                                placeholder="19,99"
                                type="number"
                                margin="normal"
                                onChange={e => {
                                    const {name, value} = e.target;
                                    setRows({...rows, [name]: value});
                                }}
                                helperText={errors.price && touched.price && errors.price}
                            />
                            <TextField
                                name="availability_count"
                                id="availability_count"
                                label="Διαθέσιμη ποσότητα προϊόντος"
                                fullWidth
                                placeholder="250"
                                type="number"
                                margin="normal"
                                onChange={e => {
                                    const {name, value} = e.target;
                                    setRows({...rows, [name]: value});
                                }}
                                helperText={errors.availability_count && touched.availability_count && errors.availability_count}
                            />
                            <TextField
                                name="product_link"
                                id="product_link"
                                label="Link Προϊόντος"
                                fullWidth
                                placeholder="www.directmarket.gr/product.jsp?orgid=68615&productid=13586"
                                margin="normal"
                                onChange={e => {
                                    const {name, value} = e.target;
                                    setRows({...rows, [name]: value});
                                }}
                                helperText={errors.product_link && touched.product_link && errors.product_link}
                            />

                            <Button type="submit" className={classes.button} disabled={isSubmitting}>
                                Προσθηκη νεου προϊοντος
                            </Button>
                        </form>
                    </Box>
                )}
            </Formik>
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
