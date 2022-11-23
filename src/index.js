/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "assets/scss/argon-dashboard-react.scss";
import 'bootstrap/dist/js/bootstrap.bundle.min';


import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

import Teacher from "layouts/Teacher";
import Teacher1 from "layouts/Teacher1";
import StoreProvider from "./Until/StoreProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <StoreProvider>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/teacher" render={(props) => <Teacher {...props} />} />
        <Route path="/teacher1" render={(props) => <Teacher1 {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Redirect from="/" to="/admin/examination" />
      </Switch>
    </StoreProvider>
  </BrowserRouter>
);
