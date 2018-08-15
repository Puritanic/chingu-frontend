import React from "react";
import { Link } from "react-router-dom";
import GetUser from "../utilities/GetUser"
import headerQuery from "../../queries/headerQuery"
// import Store from '../../AppGlobalStore';

const Header = ({ loading, user }) => {
  console.log("header", {loading, user})
  
  // let teams = [];
  // let user = null;

  // if (Store.state.user && localStorage.getItem('token')) {
  //   let StoreUser = Store.getUserState();
  //   user = StoreUser;
  //   teams = StoreUser.teams;
  // }
  // if (Store.state.user) {
  //   user = Store.state.user;
  //   teams = Store.state.user.teams;
  // }
  
  const logout = e => {
    e.preventDefault();
    console.log("Clearing localStorage");
    
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("store");

    // console.log("Resetting store");
    // client.resetStore() // refetches all queries!!
    
    window.location = "/"; // TODO reset store and redirect without reload
  };

  const renderPortalDropDown = teams => {
    let teamsDOM = null;
    if (teams && teams.length) {
      teamsDOM = (
        <React.Fragment>
          <div className="label">Team Portal</div>
          {teams.map((team, index) => {
            return (<Link key={index} to={"/team/" + team.id}>{team.title}</Link>)
          })}
          <hr />
        </React.Fragment>
      )
    }
    return (
      <div className="header-dropdown portal">
        <button className="header-portal-btn" >
          <span>CHOOSE A PORTAL</span>
          <i className="fa fa-chevron-down" />
        </button>
        <div className="header-dropdown-content--centered portal">
          {teamsDOM}
          <Link to="/voyage">Voyage Portal</Link>
          <hr />
          <Link to="/profile">User Profile</Link>
        </div>
      </div>
    )
  }

  const renderAvatar = avatar => {
    return (
      <div className="header-dropdown">
        <img className="avatar" src={avatar ? avatar : require('../../assets/blank image.png')} alt="user avatar" />
        <div className="header-mask" />
        <div className="header-dropdown-content avatar">
          {/* <Link to="/settings">Settings</Link> */}
          <Link to="/" onClick={e => logout(e)}>Log out</Link>
          
        </div>
      </div>
    )
  }

  return (
    <div className="header header-dark">  
      <div className="header-container">
        <div className="header-left">
          <div className="nav-logo">
            <Link className="nav-light" to="/">CHINGU</Link>
          </div>
        </div>

        {user && renderPortalDropDown(user.teams)}

        <div className="header-right">
          {user && renderAvatar(user.avatar)}
          {!localStorage.token && !loading && <Link to="/login" className="header-btn">LOG IN</Link>} 
        </div>
      </div>
    </div>
  )
}

export default () => <GetUser query={headerQuery}><Header/></GetUser>
