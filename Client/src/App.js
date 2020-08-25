import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Container from "@material-ui/core/Container/Container";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";

import Products from "./components/Products";
import ProductWithId from "./components/routePage/ProductWithId";
import EditProduct from "./components/routePage/EditProduct";
import NewProduct from "./components/routePage/NewProduct";

function App() {
    const [products, setProducts] = useState([]);

    //εμφάνιση όλων των προϊόντων
    const getProducts = () => {
        axios.get(`/products/`)
            .then((result)=>{
                setProducts(result.data);
            })
            .catch((error)=>{
                alert(error);
            });
    };

    useEffect(() => {
       getProducts()
    }, []);

    return(
        <Container maxWidth="xl">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="h1" gutterBottom>
                        Διαχείριση προϊόντων
                    </Typography>
                </Toolbar>
            </AppBar>

            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Products getAllProduct={getProducts} product={products}/>
                    </Route>
                    <Route path="/products/:product_id" component={ProductWithId}/>
                    <Route path="/editProduct/:product_id">
                        <EditProduct getAllProduct={getProducts} product={products}/>
                    </Route>
                    <Route path="/newProduct">
                        <NewProduct getAllProduct={getProducts} product={products}/>
                    </Route>
                </Switch>
            </Router>
        </Container>
    )
}

export default App;
