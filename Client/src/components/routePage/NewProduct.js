import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {Formik, useField} from 'formik';
import * as Yup from 'yup';

import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import Box from '@material-ui/core/Box';
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import "../../style.css";

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

//μήνυμα λάθους-σωστής τιμής
const TextInputLiveFeedback = ({ label, helpText, ...props }) => {
    const [field, meta] = useField(props);
    const [didFocus, setDidFocus] = React.useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback = (!!didFocus && field.value.length > 2) || meta.touched;

    return (
        <div
            className={`form-control ${
                showFeedback ? (meta.error ? "invalid" : "valid") : ""
                }`}
        >
            <div className="flex items-center space-between">
                <label htmlFor={props.id}>{label}</label>{" "}
                {showFeedback ? (
                    <div
                        id={`${props.id}-feedback`}
                        aria-live="polite"
                        className="feedback text-sm"
                    >
                        {meta.error ? meta.error : "✓"}
                    </div>
                ) : null}
            </div>
            <TextField
                {...props}
                {...field}
                aria-describedby={`${props.id}-feedback ${props.id}-help`}
                onFocus={handleFocus}
            />
        </div>
    );
};

export default function NewProduct(props) {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);
    const [snackbarMessage, setSnackbarMessage] = useState();
    const history = useHistory();

    //προσθήκη νέου προϊόντος
    async function addProduct(rows){
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
        descr: Yup.string()
            .required('Απαραίτητο πεδίο.'),
        price: Yup.string()
            .matches(/^(\d+|[\.\d]+)*$/g,'Μη έγκυρη τιμή προϊόντος')
            .required('Απαραίτητο πεδίο.'),
        availability_count: Yup.string()
            .required('Απαραίτητο πεδίο.'),
        product_link: Yup.string()
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
                    addProduct(values);
                    //console.log(values);
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
                    <Box className="new-product-form" >
                        <h1 >Νέο προϊόν</h1>
                        <form onSubmit={handleSubmit} >
                            <TextInputLiveFeedback
                                name="name_product"
                                id="name_product"
                                label="Τίτλος Προϊόντος"
                                fullWidth
                                placeholder="Παξιμάδια λαδιού με πιπεριά"
                                type="text"
                                margin="normal"
                                onChange={handleChange}
                            />
                            <TextInputLiveFeedback
                                name="descr"
                                id="descr"
                                label="Περιγραφή Προϊόντος"
                                fullWidth
                                placeholder="Περιέχει: Αλεύρι, λάδι, πιπεριά, σκόρδο"
                                type="text"
                                margin="normal"
                                onChange={handleChange}
                            />
                            <TextInputLiveFeedback
                                name="price"
                                id="price"
                                label="Τιμή προϊόντος"
                                fullWidth
                                placeholder="19,99"
                                type="text"
                                margin="normal"
                                onChange={handleChange}
                            />
                            <TextInputLiveFeedback
                                name="availability_count"
                                id="availability_count"
                                label="Διαθέσιμη ποσότητα προϊόντος"
                                fullWidth
                                placeholder="250"
                                type="number"
                                margin="normal"
                                onChange={handleChange}
                            />
                            <TextInputLiveFeedback
                                name="product_link"
                                id="product_link"
                                label="Link Προϊόντος"
                                fullWidth
                                placeholder="www.directmarket.gr/product.jsp?orgid=68615&productid=13586"
                                type="text"
                                margin="normal"
                                onChange={handleChange}
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
