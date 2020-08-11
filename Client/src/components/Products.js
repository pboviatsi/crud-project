import React, {useEffect, useState} from "react";
import MaterialTable from 'material-table'
import axios from "axios";
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
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

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function Product(props) {

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
    const [columns, setColumns] = useState([
        {   title: 'Κωδικός',
            field: 'product_id',
            headerStyle: {
                backgroundColor: '#d3dfe5',
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
                backgroundColor: '#d3dfe5',
                textAlign: "center"
            }
        },
        {   title: 'Τιμή',
            field: 'price',
            type: 'numeric',
            cellStyle: {
                textAlign: "center"
            },
            headerStyle: {
                backgroundColor: '#d3dfe5',
                textAlign: "center"
            }
        },
        {   title: 'Διαθεσιμότητα',
            field: 'availability_count',
            type: 'numeric',
            cellStyle: {
                textAlign: "center"
            },
            headerStyle: {
                backgroundColor: '#d3dfe5',
                textAlign: "center"
            }
        },
        {   title: 'Url προϊόντος',
            field: 'product_link',
            cellStyle: {
                textAlign: "left"
            },
            headerStyle: {
                backgroundColor: '#d3dfe5',
                textAlign: "center"
            }
        },
    ]);

    return (
        <MaterialTable
            icons={tableIcons}
            title="Διαχείριση προϊόντων"
            columns={columns}
            data={rows}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            setRows([...rows, newData]);

                            resolve();
                        }, 1000)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataUpdate = [...rows];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setRows([...dataUpdate]);

                            resolve();
                        }, 1000)
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...rows];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setRows([...dataDelete]);

                            resolve()
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
                                    backgroundColor: '#dee2ff',
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
    )
}
