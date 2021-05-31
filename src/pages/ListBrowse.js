import React, { useEffect } from 'react'
import "./stylesheets/ListBrowse.css";
import {connect} from "react-redux";
import { useHistory } from 'react-router-dom';
import { getBrowseList } from '../redux/actions/browseAction';
import { MoonLoader } from 'react-spinners';
import ListCard from '../components/ListCard';

function ListBrowse({
  listsBrowse,
  loading,
  getBrowseList,
  authLoading,
  authenticated,
}) {
  const history = useHistory();
  useEffect(() => {
    if (!authLoading) {
      if (authenticated) {
        getBrowseList();
      } else {
        history.push("/login");
      }
    }
  }, [authLoading, authenticated, getBrowseList, history]);
  return (
    <div className="listBrowse">
      <div className="listBrowse__container">
        <div className="listBrowse__heading">
          <span>Lists</span>
        </div>
        {loading ? (
          <div className="home__bounceloader">
            <MoonLoader
              // css={override}
              size={40}
              color={"#2aa44f"}
              loading
            />
          </div>
        ) : (
          <div className="listBrowse__List">
            {listsBrowse.map((list) => (
              <ListCard
                id={list._id}
                createdBy={list.createdBy}
                listTitle={list.listTitle}
                description={list.description}
                movieList={list.movieList}
                privacyValue={list.privacy}
                tagArray={list.tags}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
      listsBrowse: state.browse.listsBrowse,
      loading: state.browse.loading,
      authLoading: state.user.authLoading,
      authenticated: state.user.authenticated,
    };
}

export default connect(mapStateToProps, { getBrowseList })(ListBrowse);
