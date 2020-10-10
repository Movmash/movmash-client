import React, { useState, useEffect } from "react";
import "./stylesheets/PostTicketPost.css";
import SearchMovieCard from "./SearchMovieCard";
import {
  CircularProgress,
  TextField,
  ClickAwayListener,
  Radio,
  Button,
} from "@material-ui/core";
//........................................picker
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
//................................................
import axios from "axios";
import { genreConverter } from "../util/genreConverter";
import stringLimiter from "../util/stringLimiter";
import getTimeDetails from "../util/getTimeDetails";
// let eventName = { target: { value: "exact" } };
let date = new Date();
let day = date.getDate() + 5;
let month = date.getMonth();
let year = date.getFullYear();
function PostTicketPost({ closeTicket }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRangeValue, setTimeRangeValue] = useState(new Date());
  const [postMovie, setPostMovie] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeRange, setTimeRange] = useState("exact");
  const handleTimeRange = (event) => {
    setTimeRange(event.target.value);
    if (event.target.value === "next2days") {
      // eventName.target.value = "next2days";
      setTimeRangeValue((prev) => {
        let dateRange = new Date(selectedDate);
        dateRange.setDate(dateRange.getDate() + 2);
        // eventName.target.value = "exact";
        return dateRange;
      });
    } else if (event.target.value === "next4Days") {
      // eventName.target.value = "next4Days";
      setTimeRangeValue((prev) => {
        let dateRange = new Date(selectedDate);
        dateRange.setDate(dateRange.getDate() + 4);
        // eventName.target.value = "exact";
        return dateRange;
      });
    }

    console.log(timeRangeValue);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchSearchResult = () => {
      if (query !== "") {
        axios
          .get(`http://localhost:8000/api/v1/movie/search-movie?query=${query}`)
          .then((res) => {
            setLoading(false);
            setSearchResult([...res.data.results]);
          })
          .catch((e) => {
            setSearchResult([]);
            console.log(e);
          });
      }
    };
    setLoading(true);
    fetchSearchResult();
    return;
  }, [query]);
  // useEffect(() => {
  //   const callback = () => {
  //     handleTimeRange(eventName);
  //   };
  //   callback();
  //   return;
  // }, [handleTimeRange, selectedDate]);
  useEffect(() => {
    setTimeRange("exact");
  }, [selectedDate]);
  const handleClickAway = () => {
    setOpen(false);
  };

  const handleOnChange = (event) => {
    if (event.target.value === "") {
      console.log("heelloo");
      setOpen((prev) => (prev = false));
    } else setOpen(true);
  };

  const handleOnClickSearchCard = (result) => {
    setOpen((prev) => (prev = false));
    console.log(result);
    setPostMovie(result);
    console.log(genreConverter(result.genre_ids));
  };

  return (
    <div className="postTicketPost">
      <div className="postTicketPost__searchMovie">
        <div className="postTicketPost__header">
          <ClickAwayListener onClickAway={handleClickAway}>
            <div>
              <TextField
                onChange={(event) => {
                  handleOnChange(event);
                  setQuery(event.target.value);
                }}
                id="standard-basic"
                label="Search Your Movie"
              />
              {open &&
                (loading ? (
                  <div className="postTicket-clickAwayListener--content searchInput__Loading">
                    <CircularProgress />
                  </div>
                ) : searchResult.length === 0 && query !== "" ? (
                  <div className="postTicket-clickAwayListener--content searchInput__NotFound">
                    <h3>0 results are found</h3>
                  </div>
                ) : (
                  <div className="postTicket-clickAwayListener--content">
                    {searchResult.map((result) => (
                      <SearchMovieCard
                        select={() => handleOnClickSearchCard(result)}
                        key={result.id}
                        id={result.id}
                        poster={result.poster_path}
                        releaseDate={result.release_date}
                        title={result.title ? result.title : result.name}
                      />
                    ))}
                  </div>
                ))}
            </div>
          </ClickAwayListener>
        </div>
      </div>
      <div className="postTicketPost__movieContent">
        <div className="postTicketPost__movieContent-subContainer">
          {Object.keys(postMovie).length !== 0 && (
            <div className="postTicketPost__contentPoster">
              <img
                alt={postMovie.title}
                src={
                  postMovie.poster_path !== null
                    ? `https://image.tmdb.org/t/p/w92${postMovie.poster_path}`
                    : "https://streaming.tvseries-movies.com/themes/vstripe/images/no-cover.png"
                }
              />
            </div>
          )}
          <div className="postTicketPost__contentInfo">
            {Object.keys(postMovie).length !== 0 && (
              <>
                <div className="postTicketPost__contentInfo--heading">
                  <div className="postTicketPost__contentInfo--heading--movieName">
                    <h2>
                      {postMovie.title ? postMovie.title : postMovie.name}
                    </h2>
                  </div>
                </div>
                <div className="postTicketPost__contentInfo--durationGenre">
                  <div className="postTicketPost__contentInfo--durationGenre--duration">
                    <h4>{postMovie.release_date.split("-")[0]}</h4>
                  </div>
                  <div className="postTicketPost__contentInfo--durationGenre--genre">
                    <h4>{genreConverter(postMovie.genre_ids)}</h4>
                  </div>
                </div>
                <div className="postTicketPost__contentInfo--overview">
                  <p>{stringLimiter(postMovie.overview, 100)}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className={`postTicketPost__schedule ${
          Object.keys(postMovie).length === 0 && "margin"
        }`}
      >
        <div className="postTicketPost__schedule__heading">
          <h4>Make your schedule</h4>
        </div>
        <div className="postTicketPost__scheduleContent-uppercontainer">
          <div className="postTicketPost__scheduleContent-container">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className="postTicketPost__scheduleContent">
                <div className="postTicketPost__scheduleContent__picker">
                  <KeyboardDatePicker
                    variant="inline"
                    margin="normal"
                    id="date-picker-dialog"
                    label="Select your date"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    minDate={new Date()}
                    maxDate={new Date(year, month, day)}
                  />
                </div>
                <div className="postTicketPost__scheduleContent__picker">
                  <KeyboardTimePicker
                    variant="inline"
                    margin="normal"
                    id="time-picker"
                    label="Select your time"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </div>
              </div>
            </MuiPickersUtilsProvider>
          </div>
          <div className="postTicket__container__showDetails--showTiming">
            <div className="postTicket__container__showDetails--time-range">
              <h2>
                {getTimeDetails(selectedDate, "h")}:
                {getTimeDetails(selectedDate, "min")}
                {timeRange !== "exact" &&
                  ` to ${getTimeDetails(selectedDate, "h")}`}
                {timeRange !== "exact" &&
                  `:${getTimeDetails(selectedDate, "min")}`}
              </h2>
            </div>
            <div className="postTicket__container__showDetails--dateRange">
              <div className="postTicket__container__showDetails--dateRange--from">
                <div className="postTicket__container__showDetails--dateRange-from--date">
                  <h1>{getTimeDetails(selectedDate, "d")}</h1>
                </div>
                <div className="postTicket__container__showDetails--dateRange-from--month">
                  <h2>{getTimeDetails(selectedDate, "m")}</h2>
                </div>
              </div>
              {timeRange !== "exact" && (
                <>
                  <h1> - </h1>
                  <div className="postTicket__container__showDetails--dateRange--to">
                    <div className="postTicket__container__showDetails--dateRange-from--date">
                      <h1>{getTimeDetails(timeRangeValue, "d")}</h1>
                    </div>
                    <div className="postTicket__container__showDetails--dateRange-from--month">
                      <h2>{getTimeDetails(timeRangeValue, "m")}</h2>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="postTicketPost__radioInput">
        <div className="postTicket__runtimeRange__content__input">
          <div className="postTicket__ratingStep__content__input--radioInput_material">
            <Radio
              checked={timeRange === "exact"}
              onChange={handleTimeRange}
              value="exact"
              name="radio-button-demo"
              inputProps={{ "aria-label": "A" }}
            />
            <h4>Exact</h4>
          </div>
          <div className="postTicket__ratingStep__content__input--radioInput_material">
            <Radio
              checked={timeRange === "next2days"}
              onChange={handleTimeRange}
              value="next2days"
              name="radio-button-demo"
              inputProps={{ "aria-label": "A" }}
            />
            <h4>Next 2 Days</h4>
          </div>
          <div className="postTicket__ratingStep__content__input--radioInput_material">
            <Radio
              checked={timeRange === "next4Days"}
              onChange={handleTimeRange}
              value="next4Days"
              name="radio-button-demo"
              inputProps={{ "aria-label": "A" }}
            />
            <h4>Next 4 Days</h4>
          </div>
        </div>
      </div>
      <div className="postTicketPost__caption">
        <div className="postTicketPost__caption--container">
          <TextField
            id="standard-full-width"
            label="Caption"
            style={{ margin: 8 }}
            placeholder="write something about your show"
            // helperText="Full width!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ maxLength: 200 }}
          />
        </div>
      </div>
      <div className="postTicketPost__buttons">
        <div className="postReviewPost__bottomIcon">
          <Button onClick={closeTicket} variant="outlined" color="secondary">
            Cancel
          </Button>
        </div>
        <div className="postReviewPost__bottomIcon">
          <Button
            disabled={Object.keys(postMovie).length === 0 ? true : false}
            variant="contained"
            color="primary"
          >
            Create Ticket
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PostTicketPost;
