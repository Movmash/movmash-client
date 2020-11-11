import React from "react";
import "./stylesheets/PeopleMatchCard.css";
function PeopleMatchCard() {
  return (
    <div className="peopleMatchCard">
      <div className="peopleMatchCard__image">
        <img
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt=""
        />
      </div>
      <div className="peopleMatchCard__content">
        <div className="peopleMatchCard__content__headers">
          <h3>Alex tyson</h3>
          <h6>@_allexxx_tyson</h6>
        </div>
        <div className="peopleMatchCard__content__similarity">
          <span>70%</span>
          <p>Similiar taste</p>
        </div>
        <div className="peopleMatchCard__content__buttons">
          <div className="peopleMatchCard__content__button__suggestMe">
            <button>Suggest Movie</button>
          </div>
          <div className="peopleMatchCard__content__button">
            {" "}
            <button>Follow</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PeopleMatchCard;
