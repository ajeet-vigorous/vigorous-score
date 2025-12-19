import { Link, useParams } from "react-router-dom";
import "./SocketIframe8.css";
import { useMatchDetails } from "../../middleware/useMatchDetails";
import { useState } from "react";
import { GiClick } from "react-icons/gi";
import useMatchScoreVoice from "../../middleware/useMatchScoreVoice";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";

function SocketIframe8() {
  const { marketId, eventId } = useParams();
  const { matchScoreDetails , errorMessage } = useMatchDetails(marketId, eventId);
  const { isMuted, handleVolumeToggle, isSmallScreen } = useMatchScoreVoice(
    matchScoreDetails?.score?.cb
  );
  // Function to determine background color class
  const getBackgroundColorClass = (ele) => {
    if (ele === "W") {
      return "bg-red";
    } else if (ele == "4") {
      return "bg-green";
    } else if (ele == "6") {
      return "bg-dark";
    } else if (ele == "WB") {
      return "bg-WB";
    }

    return "bg-primary";
  };

  const totalBalls = matchScoreDetails?.score?.balls_array?.length || 0;
  const displayBalls = totalBalls > 6 ? totalBalls : 6;
  const [modal, setModal] = useState(false);
  const handleClose = () => setModal(false);

  const handleOverlayClick = (e) => {
    // Close modal when clicking outside the modal content
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
 {errorMessage ? <div>{errorMessage}</div>  :      <div className={` `}>
        <div id="score  ">
          <div className="bg-main">
            <div
              className="row  bg-score-8 scoremain"
              style={{ color: "#fff" }}
            >
              <div className="col-lg-12 col-12 batsmanscorecard-8 ">
                <div className="padding-zero teams-area row  position-relative">
                  <div className=" col-6 col ">
                    <div className="col-md-12 col-12 teamtype">
                      <p className="team-name3">
                        {matchScoreDetails?.score?.team1_name
                          ? matchScoreDetails?.score?.team1_name
                          : "-"}
                      </p>
                      <span>
                        &nbsp;:-{" "}
                        <span className="currunt_score3">
                          {" "}
                          {matchScoreDetails?.score?.team1_score
                            ? matchScoreDetails?.score?.team1_score
                            : "0"}{" "}
                          (
                          {matchScoreDetails?.score?.team1_over
                            ? matchScoreDetails?.score?.team1_over
                            : "0"}
                          )
                        </span>
                        <span className="team-crr"> </span>
                      </span>
                    </div>
                    <div className="col-md-12 col-12 teamtype">
                      <p className="team-name3">
                        {matchScoreDetails?.score?.team2_name
                          ? matchScoreDetails?.score?.team2_name
                          : "-"}
                      </p>
                      <span>
                        &nbsp;:-{" "}
                        <span className="currunt_score3">
                          {matchScoreDetails?.score?.team2_score
                            ? matchScoreDetails?.score?.team2_score
                            : "0"}{" "}
                          (
                          {matchScoreDetails?.score?.team2_over
                            ? matchScoreDetails?.score?.team2_over
                            : "0"}
                          )
                        </span>
                        <span className="team-crr"> </span>
                      </span>
                    </div>
                  </div>
                  <div className=" col-6 col ">
                  <span
                    style={{
                      position: "absolute",
                      top: "25%",
                      right: "8px",
                    }}
                  >
                    {isMuted ? (
                      <IoVolumeMuteOutline
                        style={{
                          fontSize: isSmallScreen ? "18px" : "27px",
                          cursor: "pointer",
                        }}
                        onClick={handleVolumeToggle}
                      />
                    ) : (
                      <IoVolumeHighOutline
                        style={{
                          fontSize: isSmallScreen ? "18px" : "27px",
                          cursor: "pointer",
                        }}
                        onClick={handleVolumeToggle}
                      />
                    )}
                  </span>
                  </div>
                
                </div>
                <div style={{ background: "transparent" }}>
                  <div className="score-footer row col-lg-12 col-xs-12">
                    <div
                      className="col-lg-9 col-9"
                      style={{ padding: 0, height: "50px" }}
                    >
                      <div
                        className="item-score batsman"
                        style={{
                          padding: "2px",
                          display: "table",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        <ul
                          style={{
                            margin: 0,
                            width: "100%",
                            padding: 0,
                          }}
                          className="row"
                        >
                          <li
                            id="l1score1"
                            className="active col-lg-5 col-xs-12 py-1 px-1"
                          >
                            <img
                              className="sportimg col-lg-1"
                              src="/cricket-icons.svg"
                              alt="cricket icon"
                            />
                            <span id="bat1name">
                              {matchScoreDetails?.score?.player1_array?.name
                                ? matchScoreDetails?.score?.player1_array?.name
                                : "-"}
                            </span>
                            <span id="bat1score" style={{ color: "#ffff00" }}>
                              {matchScoreDetails?.score?.player1_array?.run} (
                              {matchScoreDetails?.score?.player1_array?.ball})
                            </span>
                          </li>
                          <li
                            id="l1score2"
                            style={{ listStyle: "none" }}
                            className="col-lg-5  col-xs-12 py-1 px-1"
                          >
                            <img
                              className="sportimg col-lg-1"
                              src="/cricket-icons.svg"
                              alt="cricket icon"
                            />
                            <span id="bat2name">
                              {matchScoreDetails?.score?.player2_array?.name
                                ? matchScoreDetails?.score?.player2_array?.name
                                : "-"}
                            </span>
                            <span id="bat2score" style={{ color: "#ffff00" }}>
                              {matchScoreDetails?.score?.player2_array?.run} (
                              {matchScoreDetails?.score?.player2_array?.ball})
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="col-lg-3 col-3"
                      style={{
                        overflow: "hidden",
                        display: "flex",
                        height: "50px",
                        alignItems: "center",
                        placeContent: "center",
                        fontSize: "20px",
                      }}
                    >
                      <p
                        id="ballstatus"
                        style={{
                          margin: 0,

                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {matchScoreDetails?.score?.cb
                          ? matchScoreDetails?.score?.cb
                          : "WELCOME"}
                      </p>
                    </div>
                  </div>
                  <div className="item-score score-over-fter col-lg-12 col-12">
                    <div className="score-over py-2 px-1">
                      <ul>
                        <li
                          style={{
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img
                            className="sportimg"
                            src="/cricket-ball.svg"
                            alt="cricket ball"
                          />
                        </li>
                        {Array.from({ length: displayBalls }).map((_, i) => (
                          <li
                            key={i}
                            className={`batsman-name ball2 ${getBackgroundColorClass(
                              matchScoreDetails?.score?.balls_array[i]
                            )}`}
                          >
                            <span
                              style={{ textAlign: "center", margin: "auto" }}
                            >
                              {i < totalBalls
                                ? matchScoreDetails?.score?.balls_array[i]
                                : "-"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-12 col-12 py-1 col comment-box">
                    <span>
                      {matchScoreDetails?.score?.toss
                        ? matchScoreDetails?.score?.toss
                        : "WELCOME"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}

export default SocketIframe8;
