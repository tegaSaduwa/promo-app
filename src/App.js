import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import ProtectedRouteAdmin from "./components/auth/authorizationAdmin";
import ProtectedRouteAudit from "./components/auth/authorizationAudit";
import ProtectedRouteUser from "./components/auth/authorizationUser";
import store from "./store";
import NavMenu from "./components/common/navbar/Navbar";
import ViewCampaigns from "./components/admin/campaigns/view-campaigns/ViewCampaigns";
import EditCampaign from "./components/admin/campaigns/edit-campaign/EditCampaign";
import AddCategory from "./components/admin/campaigns/add-category/AddCategory";
import AddEvent from "./components/admin/campaigns/add-event/AddEvent";
import ViewCampaignDetails from "./components/admin/campaigns/view-campaign-details/ViewCampaignDetails";
import ViewCategorySummary from "./components/admin/category/view-category-summary/ViewCategorySummary";
import ViewCategoryDetails from "./components/admin/category/view-category-details/ViewCategoryDetails";
import EditCategory from "./components/admin/category/edit-category/EditCategory";
import ViewEventSummary from "./components/admin/events/view-event-summary/ViewEventSummary";
import ViewEventDetails from "./components/admin/events/view-event-details/ViewEventDetails";
import EditEvent from "./components/admin/events/edit-event/EditEvent";
import Login from "./components/auth/Login";
import Draws from "./components/draws/Draws";
import AddCampaigns from "./components/admin/campaigns/add-campaigns/AddCampaigns";
import Homepage from "./components/common/Home/Homepage";
import DrawsDetails from "./components/draws/DrawsDetails";
import "react-toastify/dist/ReactToastify.css";
import PerformDraw from "./components/draws/PerformDraw";
import GetWinners from "./components/draws/GetWinners";
import ShortlistedCustomerDetails from "./components/draws/ShortlistedCustomerDetails";
import GetProfile from "./components/admin/userprofile/GetProfile";
import CreateProfile from "./components/admin/userprofile/CreateProfile";
import CurrentCampaigns from "./components/draws/CurrentCampaigns";
//import ShortlistedAdminCustomerDetails from "./components/admin/events/shortlistedCustomer/ShortlistedCustomerDetails";
import AuditTrail from "./components/admin/audit/AuditTrail";
const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <NavMenu />
        <Router basename="/promoportal">
          <Switch>
            <Route exact path="/login" component={Login} />

            {/* user profile */}

            <ProtectedRouteAdmin
              path="/admin/user-profile"
              component={GetProfile}
              exact
            />

            <ProtectedRouteAdmin
              path="/admin/user-profile/add"
              component={CreateProfile}
              exact
            />

            {/* end of user Profile */}

            {/* campaigns route */}
            <ProtectedRouteUser
              path="/admin/campaigns"
              component={ViewCampaigns}
              exact
            />

            <ProtectedRouteUser
              path="/admin/campaigns/add"
              component={AddCampaigns}
              exact
            />

            <ProtectedRouteUser
              path="/admin/campaigns/view-camapign-details/:id"
              component={ViewCampaignDetails}
              exact
            />
            <ProtectedRouteUser
              path="/admin/campaigns/add-category/:id"
              component={AddCategory}
              exact
            />
            <ProtectedRouteUser
              path="/admin/campaigns/add-event/:id"
              component={AddEvent}
              exact
            />
            <ProtectedRouteUser
              path="/admin/campaigns/edit/:id"
              component={EditCampaign}
              exact
            />
            {/* end of campaigns route */}

            <ProtectedRouteUser
              path="/admin/campaigns/event-summary/:id"
              component={ViewEventSummary}
              exact
            />
            <ProtectedRouteUser
              path="/admin/campaigns/event-details/:id"
              component={ViewEventDetails}
              exact
            />
            <ProtectedRouteUser
              path="/admin/campaigns/edit-event/:id"
              component={EditEvent}
              exact
            />
            {/* end of event Routes */}
            {/* Draws Route */}
            <ProtectedRouteUser
              path="/active-campaigns"
              component={CurrentCampaigns}
              exact
            />
            <ProtectedRouteUser path="/draws" component={Draws} exact />
            <ProtectedRouteUser
              path="/draws-details/:id"
              component={DrawsDetails}
              exact
            />

            <ProtectedRouteUser
              path="/perform-draw/:id"
              component={PerformDraw}
              exact
            />
            <ProtectedRouteUser
              path="/get-winners/:id"
              component={GetWinners}
              exact
            />
            <ProtectedRouteUser
              path="/shortlistedCustomer-details/:id"
              component={ShortlistedCustomerDetails}
              exact
            />

            <ProtectedRouteAudit
              path="/audit-trail"
              component={AuditTrail}
              exact
            />

            {/* End of draws route */}
            
            {/* <Route component={NotFound} /> */}
            <ProtectedRouteUser path="/" component={Homepage} exact />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
