import { Avatar } from '@material-ui/core';
import React, {useEffect} from 'react'
import "./stylesheets/PeopleBrowse.css";
import {connect} from "react-redux";
import { useHistory } from 'react-router-dom';
import { getBrowsePeople } from '../redux/actions/browseAction';
import { MoonLoader } from 'react-spinners';
function PeopleBrowse({
  peopleBrowse,
  loading,
  getBrowsePeople,
  authLoading,
  authenticated,
}) {
  const history = useHistory();
  useEffect(() => {
    if (!authLoading) {
      if (authenticated) {
        getBrowsePeople();
      } else {
        history.push("/login");
      }
    }
  },[authLoading, authenticated, getBrowsePeople,history]);
  return (
    <div className="peopleBrowse">
      <div className="peopleBrowse__container">
        <div className="peopleBrowse__heading">
          <span>People</span>
        </div>
        {
            loading ? 
        <div className="home__bounceloader">
          <MoonLoader
            // css={override}
            size={40}
            color={"#2aa44f"}
            loading
          />
        </div> : <div className="peopleBrowse__peopleList">
        {peopleBrowse.map(people => (

          <div key={people._id} className="peopleBrowse__peopleCard">
            <div className="peopleBrowse__avatarInfo">
              <Avatar src={people.profileImageUrl} alt={people.fullName}></Avatar>
              <span>{people.fullName}</span>
            </div>
            <button>Follow</button>
          </div>
          
        ))} </div>
     
        }
         </div>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        peopleBrowse: state.browse.peopleBrowse,
        loading: state.browse.loading,
        authLoading: state.user.authLoading,
        authenticated: state.user.authenticated
    }
}

export default connect(mapStateToProps, { getBrowsePeople })(PeopleBrowse);
