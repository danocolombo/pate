import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { compose } from "redux";
import { withRouter } from "react-router";
import Header from "../../components/header/header.component";
import { Link } from "react-router-dom";
import { setSpinner, clearSpinner } from "../../redux/pate/pate.actions";
import AdminOptions from "../../components/admin/admin-menu-items.component";
import { MainFooter } from "../../components/footers/main-footer";
import "./admin-page.styles.scss";

const AdminPage = ({ setSpinner, clearSpinner, currentUser }) => {
  const history = useHistory();
  useEffect(() => {
    if (!currentUser?.authSession?.idToken?.jwtToken) history.push("/");
  }, []);
  return (
    <>
      <Header />
      <AdminOptions />
      <MainFooter />
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setSpinner: () => dispatch(setSpinner()),
  clearSpinner: () => dispatch(clearSpinner()),
});
const mapStateToProps = (state) => ({
  pateSystem: state.pate,
  currentUser: state.user.currentUser,
});
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AdminPage);
