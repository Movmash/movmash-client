import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import TicketPost from '../components/TicketPost';
import { getBrowseTicket } from '../redux/actions/browseAction';
import "./stylesheets/TicketBrowse.css";
function TicketBrowse({
  ticketsBrowse,
  getBrowseTicket,
  loading,
  authLoading,
  authenticated,
}) {
  const history = useHistory();
  useEffect(() => {
    if (!authLoading) {
      if (authenticated) {
        getBrowseTicket();
      } else {
        history.push("/login");
      }
    }
  }, [authLoading, authenticated, getBrowseTicket, history]);
  return (
    <div className="ticketBrowse">
      <div className="ticketBrowse__container">
        <div className="ticketBrowse__heading">
          <span>Tickets</span>
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
          <div className="ticketBrowse__ticketList">
            {ticketsBrowse.map((ticket) => (
              <TicketPost
                details={ticket}
                postId={ticket._id}
                type={ticket.type}
                likeCount={ticket.likeCount}
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
    ticketsBrowse: state.browse.ticketsBrowse,
    loading: state.browse.loading,
    authLoading: state.user.authLoading,
    authenticated: state.user.authenticated,
  };
};

export default connect(mapStateToProps, { getBrowseTicket })(TicketBrowse)
