import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Container from "@material-ui/core/Container/Container";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import Products from "./components/Products";


function App() {
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
                    <Route path="/" component={Products} exact/>
                </Switch>
            </Router>
        </Container>
    )
}

export default App;
