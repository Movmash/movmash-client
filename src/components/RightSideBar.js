import React, { useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "./stylesheets/RightSideBar.css";
import {connect} from "react-redux";
import {
  getPeople,
} from "../redux/actions/searchAction";
import { useHistory } from "react-router-dom";
function RightSideBar({ getPeople, peopleList, authenticated, loadingPeople }) {
  const history = useHistory()
  useEffect(() => {
    if (authenticated) {
      getPeople();
    }
  }, [getPeople, authenticated]);
  return (
    <div className="rightSideBar">
      <div className="rightSideBar__container">
        <div className="leftSideBar__container__upmargin"></div>
        {!loadingPeople ? (
          <div className="rightSideBar__container__iconList">
            {peopleList.slice(0,10).map((people) => (
                <div
                  onClick={() => history.push(`/@${people.userName}`)}
                  key={people._id}
                  className="rightSideBar__container__icon"
                >
                  <Avatar src={people.profileImageUrl}>
                    <div className="loading_avatar"></div>
                  </Avatar>
                </div>
            ))}
          </div>
        ) : (
          <div className="leftSideBar__container__iconList">
            <div className="rightSideBar__container__icon">
              <Avatar src="https://scontent.fpat3-1.fna.fbcdn.net/v/t1.0-9/119888019_2142082595936461_2747031401023743310_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=ItlVljbaaugAX-_LLzl&_nc_ht=scontent.fpat3-1.fna&oh=fbf15e76898631d47711bc0a81f60b01&oe=5F99422C">
                <div className="loading_avatar"></div>
              </Avatar>
            </div>
            <div className="rightSideBar__container__icon">
              <Avatar src="https://scontent.fpat3-1.fna.fbcdn.net/v/t1.0-9/119888019_2142082595936461_2747031401023743310_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=ItlVljbaaugAX-_LLzl&_nc_ht=scontent.fpat3-1.fna&oh=fbf15e76898631d47711bc0a81f60b01&oe=5F99422C">
                <div className="loading_avatar"></div>
              </Avatar>
            </div>
            <div className="rightSideBar__container__icon">
              <Avatar src="https://scontent.fpat3-1.fna.fbcdn.net/v/t1.0-9/119888019_2142082595936461_2747031401023743310_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=ItlVljbaaugAX-_LLzl&_nc_ht=scontent.fpat3-1.fna&oh=fbf15e76898631d47711bc0a81f60b01&oe=5F99422C">
                <div className="loading_avatar"></div>
              </Avatar>
            </div>
            <div className="rightSideBar__container__icon">
              <Avatar src="https://scontent.fpat3-1.fna.fbcdn.net/v/t1.0-9/119888019_2142082595936461_2747031401023743310_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=ItlVljbaaugAX-_LLzl&_nc_ht=scontent.fpat3-1.fna&oh=fbf15e76898631d47711bc0a81f60b01&oe=5F99422C">
                <div className="loading_avatar"></div>
              </Avatar>
            </div>
            <div className="rightSideBar__container__icon">
              <Avatar src="https://scontent.fpat3-1.fna.fbcdn.net/v/t1.0-9/119888019_2142082595936461_2747031401023743310_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=ItlVljbaaugAX-_LLzl&_nc_ht=scontent.fpat3-1.fna&oh=fbf15e76898631d47711bc0a81f60b01&oe=5F99422C">
                <div className="loading_avatar"></div>
              </Avatar>
            </div>
            <div className="rightSideBar__container__icon">
              <Avatar src="https://scontent.fpat3-1.fna.fbcdn.net/v/t1.0-9/119888019_2142082595936461_2747031401023743310_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=ItlVljbaaugAX-_LLzl&_nc_ht=scontent.fpat3-1.fna&oh=fbf15e76898631d47711bc0a81f60b01&oe=5F99422C">
                <div className="loading_avatar"></div>
              </Avatar>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
    peopleList: state.search.people,
    loadingPeople: state.search.loadingPeople,
  };
}
export default connect(mapStateToProps,{getPeople})(RightSideBar);
