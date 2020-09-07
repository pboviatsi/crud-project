import React, {useEffect, useState} from "react";
import MaterialTable from 'material-table'
import axios from "axios";
import {forwardRef} from 'react';
import {Link, useHistory} from "react-router-dom";

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import AddIcon from '@material-ui/icons/Add';
import NewProductDialog from "./NewProductDialog";
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Alert from "@material-ui/lab/Alert/Alert";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddIcon {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>),
    EditInNewPage: forwardRef((props, ref) => <ListAltOutlinedIcon {...props} ref={ref}/>),
};

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

export default function Product(props) {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState();
    const [transition, setTransition] = React.useState(undefined);
    const history = useHistory();

    //άνοιγμα pop-up φόρμας νέου πρϊόντος
    const handleOpen = () => {
        setOpenModal(true);
    };

    //εμφάνιση όλων των προϊόντων
    async function getAllProducts() {
        try {
            const result = await axios.get(`/products`);
            setProducts(result.data);
        } catch (error) {
            console.log(error);
            snackBarOpen();
            setSnackbarMessage(<><Alert severity="error">Server error!</Alert></>);
        }
        ;
    }

    //διαγραφή προϊόντος με συγκεκριμένο id
    async function deleteProduct(productId) {
        try {
            await axios.delete(`/products/${productId}`);
            snackBarOpen();
            setSnackbarMessage(<><Alert severity="success">Έγινε διαγραφή ενός προϊόντος!</Alert></>);
        } catch (error) {
            console.log(error);
            snackBarOpen();
            setSnackbarMessage(<><Alert severity="error">Server error!</Alert></>);
        }
        ;
    }

    //ενημέρωση προϊόντος
    async function updateProduct(newData) {
        try {
            await axios.put(`/products/${newData.product_id}`, newData);
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
    };

    const [columns, setColumns] = useState([
        {
            title: 'Κωδικός',
            field: 'product_id',
            editable: 'never',
            headerStyle: {
                textAlign: "center"
            }
        },
        {
            title: 'Τίτλος',
            field: 'name_product',
            cellStyle: {
                textAlign: "left"
            },
            headerStyle: {
                textAlign: "center"
            }
        },
        {
            title: 'Περιγραφή',
            field: 'descr',
            cellStyle: {
                textAlign: "left"
            },
            headerStyle: {
                textAlign: "center"
            }
        },
        {
            title: 'Τιμή',
            field: 'price',
            type: 'numeric',
            cellStyle: {
                textAlign: "center"
            },
            headerStyle: {
                textAlign: "center"
            }
        },
        {
            title: 'Διαθεσιμότητα',
            field: 'availability_count',
            type: 'numeric',
            cellStyle: {
                textAlign: "center"
            },
            headerStyle: {
                textAlign: "center"
            }
        },
        {
            title: 'Url προϊόντος',
            field: 'product_link',
            cellStyle: {
                textAlign: "left"
            },
            headerStyle: {
                textAlign: "center"
            }
        },
    ]);

    function updateInNewPage(product_id) {
        history.push("/editProduct/" + product_id);
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    const handleOnClickAdd = (event) => handleOpen();

    const handleOnClickEdit = (event, rowData) => updateInNewPage(rowData.product_id);

    return (
        <React.Fragment>
            <MaterialTable
                icons={tableIcons}
                title="Λίστα προϊόντων"
                actions={[
                    {
                        icon: AddIcon,
                        tooltip: 'Προσθήκη πρϊόντος',
                        isFreeAction: true,
                        onClick: handleOnClickAdd
                    },
                    {
                        icon: tableIcons.EditInNewPage,
                        tooltip: 'Επεξεργασία πρϊόντος σε νέα σελίδα',
                        isFreeAction: false,
                        onClick: handleOnClickEdit
                    }]}
                components={{
                    OverlayLoading: props => (
                        <div>
                            <Box display="flex" justifyContent="center" p={50}>
                                <Box>
                                    <CircularProgress color="secondary"/>
                                </Box>
                            </Box>
                        </div>
                    )
                }}
                columns={columns}
                data={products}
                localization={{
                    body: {
                        deleteTooltip: 'Διαγραφή',
                        editTooltip: 'Επεξεργασία',
                        editRow: {
                            deleteText: 'Είστε βέβαιοι ότι θέλετε να διαγράψετε αυτήν την εγγραφή;',
                            cancelTooltip: 'Ακύρωση',
                            saveTooltip: 'Αποθήκευση'
                        }
                    },
                    header: {
                        actions: 'Ενέργειες'
                    },
                    pagination: {
                        labelDisplayedRows: '{from} - {to} από τις {count}',
                        labelRowsSelect: 'γραμμές',
                        labelRowsPerPage: 'γραμμές ανά σελίδα:',
                        firstAriaLabel: 'Πρώτη σελίδα',
                        firstTooltip: 'Πρώτη σελίδα',
                        previousAriaLabel: 'Προηγούμενη σελίδα',
                        previousTooltip: 'Προηγούμενη σελίδα',
                        nextAriaLabel: 'Επόμενη σελίδα',
                        nextTooltip: 'Επόμενη σελίδα',
                        lastAriaLabel: 'Τελευταία σελίδα',
                        lastTooltip: 'Τελευταία σελίδα'
                    },
                    toolbar: {
                        searchTooltip: 'Αναζήτηση',
                        searchPlaceholder: 'Αναζήτηση'
                    },
                }}
                options={{
                    rowStyle: {
                        backgroundColor: '#f0fcff',
                    },
                    actionsColumnIndex: -1
                }}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                updateProduct(newData);
                                getAllProducts();
                                resolve();
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                deleteProduct(products[oldData.tableData.id].product_id);
                                getAllProducts();
                                resolve();
                            }, 1000)
                        }),
                }}
                detailPanel={[
                    {
                        tooltip: 'Δείτε περισσότερα',
                        render: rowData => {
                            return (
                                <div
                                    style={{
                                        fontSize: 15,
                                        textAlign: 'left',
                                        backgroundColor: '#eef6ff',
                                        padding: '40px',
                                    }}
                                >
                                    <b> Περιγραφή προϊόντος:</b> {rowData.descr}
                                </div>
                            )
                        },
                    },
                ]}
            />
            <Button className={classes.button} component={Link} to="/newProduct">
                Προσθηκη νεου προϊοντος σε νεα σελιδα
            </Button>
            <NewProductDialog open={openModal} setOpen={setOpenModal} getAllProducts={getAllProducts}/>
            <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={snackBarClose}
                TransitionComponent={transition}
                key={transition ? transition.name : ''}
            >
                {snackbarMessage}
            </Snackbar>
        </React.Fragment>
    )
}
