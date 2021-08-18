import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import MoviePoster from '../components/MoviePoster';
import { getBrowseGenre } from "../redux/actions/browseAction";
import "./stylesheets/GenreBrowse.css";
function GenreBrowse({
  genreBrowse,
  loading,
  getBrowseGenre,
  authLoading,
  authenticated,
  validGenre,
}) {
  const { genreName } = useParams();
  const history = useHistory();
  useEffect(() => {
    if (!authLoading) {
      if (authenticated) {
        getBrowseGenre(genreName, 1);
      } else {
        history.push("/login");
      }
    }
  }, [authLoading, authenticated, getBrowseGenre, history, genreName]);
  return (
    <div className="genreBrowse">
    <div className="genreBrowse__container">
        <div className="genreBrowse__heading">
          <span>{genreName}</span>
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
        ) : (validGenre?
          <div className="genreBrowse__movieList">
            {genreBrowse.map((movie) => (
              <MoviePoster
                detail={movie}
                id={movie.id}
                posterUrl={movie.poster_path}
              />
            ))}
          </div>: <div>INVALID_GENRE</div>
        )}
      </div>
       </div>
  );
}
const mapStateToProps = (state) => {
  return {
    genreBrowse: state.browse.genreBrowse,
    loading: state.browse.loading,
    authLoading: state.user.authLoading,
    authenticated: state.user.authenticated,
    validGenre: state.browse.validGenre,
  };
};

export default connect(mapStateToProps, { getBrowseGenre })(GenreBrowse);