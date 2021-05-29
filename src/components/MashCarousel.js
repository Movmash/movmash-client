import React ,{useState} from 'react'
import "./stylesheets/MashCarousel.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
function MashCarousel({children,compenentSize, componentRightMargin, backButtonMarginleft, forwardButtonMarginRight, buttonTopMargin, transparentHeight, totalItemInAFrame }) {
    const totalSize = compenentSize + componentRightMargin;
    const [xPixel, setXPixel] = useState(0)
    const [ticker, setTicker] = useState(0);
    const goBack = () => {

        setTicker((prev) => --prev);
        if(xPixel === 0){
            setXPixel(
              -1 * totalSize * Math.abs(children.length - totalItemInAFrame)
            );
        }else {
            setXPixel(prev => prev + totalSize)
        }
    }
    const goForward = () => {
        console.log(children)
        setTicker((prev) => ++prev);
        if (
          xPixel ===
          -1 * totalSize * Math.abs(children.length - totalItemInAFrame)
        ) {
          setXPixel(0);
        } else {
          setXPixel((prev) => prev - totalSize * 1);
        }
    }
    return (
      <div className="mashCarousel">
        {children.length - totalItemInAFrame - ticker !== 0  &&
          totalItemInAFrame < children.length &&
          (<div
            style={{
              height: `${transparentHeight}ch`,
            }}
            className="mashCarousel__rightBackground"
          ></div>
        )}
        {xPixel !== 0 && (
          <div
            style={{
              height: `${transparentHeight}ch`,
            }}
            className="mashCarousel__leftBackground"
          ></div>
        )}

        <div className="mashCarousel__contentList">
          {children.map((item, index) => (
            <div
              className="mashCarousel__ContentItem"
              key={index}
              style={{
                transform: `translateX(${xPixel}px)`,
                marginRight: `${componentRightMargin}px`,
              }}
            >
              {item}
            </div>
          ))}
        </div>
        {xPixel !== 0 && (
          <div className="mashCarousel__button Back">
            <div
              style={{
                top: `${buttonTopMargin}%`,
                right: `${backButtonMarginleft}px`,
              }}
              onClick={goBack}
            >
              <ArrowBackIosIcon />
            </div>
          </div>
        )}

        {children.length - totalItemInAFrame - ticker !== 0 &&
          totalItemInAFrame < children.length && (
            <div className="mashCarousel__button Forward">
              <div
                style={{
                  top: `${buttonTopMargin}%`,
                  right: `${forwardButtonMarginRight}px`,
                }}
                onClick={goForward}
              >
                <ArrowForwardIosIcon />
              </div>
            </div>
          )}
      </div>
    );
}

export default MashCarousel
