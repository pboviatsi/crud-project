import 'date-fns';
import React, {useState} from "react";
import axios from "axios";

import {makeStyles} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formStep: {
        margin: theme.spacing(1),
        width: '100%',
    },
}));

//κείμενο για κάθε step
function getSteps() {
    return ['Τίτλος - περιγραφή', 'Τιμή - διαθεσιμότητα', 'Περισσότερες πληροφορίες'];
}

export default function NewProductDialog(props) {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    //παίρνω την εντολή ανοίγματος παραθύρου απο το Products.js
    const {open, setOpen} = props;
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    //παίρνω όλα τα προϊόντα απο το Products.js
    const {getAllProducts} = props;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleChange(e) {
        const {name, value} = e.target;
        setRows({...rows, [name]: value});
    }

    //προσθήκη νέου προϊόντος
    async function addProduct() {
        try {
            const result = await axios.post(`/products`, rows);
            setOpen(false);
            handleReset();
            getAllProducts();
        } catch (error) {
            console.log(error);
            alert('Server error!');
        }
        ;
    }

    //πεδία εισαγωγής ανάλογα το step
    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (<form className={classes.formStep}>
                        <div>
                            <TextField
                                name="name_product"
                                label="Τίτλος Προϊόντος"
                                required variant="outlined"
                                id="validation-outlined-input"
                                fullWidth
                                placeholder="Παξιμάδια λαδιού με πιπεριά"
                                margin="normal"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                name="descr"
                                id="outlined-textarea"
                                label="Περιγραφή Προϊόντος"
                                multiline
                                variant="outlined"
                                fullWidth
                                placeholder="Περιέχει: Αλεύρι, λάδι, πιπεριά, σκόρδο"
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                );
            case 1:
                return (<form>
                    <FormControl fullWidth className={classes.formStep} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Τιμή προϊόντος</InputLabel>
                        <OutlinedInput
                            name="price"
                            id="outlined-adornment-amount"
                            placeholder="19,99"
                            onChange={handleChange}
                            startAdornment={<InputAdornment position="start">€</InputAdornment>}
                            labelWidth={110}
                            type="number"
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.formStep} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Διαθέσιμη ποσότητα προϊόντος</InputLabel>
                        <OutlinedInput
                            name="availability_count"
                            id="outlined-adornment-amount"
                            onChange={handleChange}
                            startAdornment={<InputAdornment position="start"></InputAdornment>}
                            endAdornment={<InputAdornment position="end">Κομμάτια</InputAdornment>}
                            labelWidth={230}
                            placeholder="250"
                            type="number"
                        />
                    </FormControl>
                </form>);
            case 2:
                return (<form className={classes.formStep}>
                    <div>
                        <TextField
                            name="product_link"
                            label="Link Προϊόντος"
                            id="validation-outlined-input"
                            fullWidth
                            placeholder="www.directmarket.gr/product.jsp?orgid=68615&productid=13586"
                            margin="normal"
                            onChange={handleChange}
                        />
                    </div>
                </form>);
            default:
                return '';
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="form-dialog-title">Νέο προϊόν</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Συμπληρώσε τα στοιχεία του νέου προϊόντος
                </DialogContentText>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>

                <div className={classes.root}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        <div>
                            <div>
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.backButton}>
                                    Προηγουμενο
                                </Button>
                                {activeStep === steps.length - 1 ? (
                                    <Button variant="contained" color="primary" onClick={addProduct}>
                                        Ολοκληρωση
                                    </Button>
                                ) : (
                                    <Button variant="contained" color="primary" onClick={handleNext}>
                                        Επομενο
                                    </Button>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
