import React from 'react';
import './App.css';
import Products from "./components/Products";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";

function App() {
    return (
         <Container maxWidth="xl" >
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="h1" gutterBottom>
                        Διαχείριση προϊόντων
                    </Typography>
                </Toolbar><div>

            </div>
            </AppBar>
             <Router>
                 <Switch>
                     <Route path="/" component={Products} exact />
                 </Switch>
             </Router>
        </Container>
    );
}

export default App;
