
import { Link, useParams } from "react-router-dom";
import "./SocketIframe4.css"
import { useMatchDetails } from "../../middleware/useMatchDetails";
import { useState } from "react";
import { GiClick } from "react-icons/gi";
import useMatchScoreVoice from "../../middleware/useMatchScoreVoice";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";

function SocketIframe4() {
  const { marketId, eventId } = useParams();
  const { matchScoreDetails, errorMessage } = useMatchDetails(marketId, eventId);
  const { isMuted, handleVolumeToggle, isSmallScreen } = useMatchScoreVoice(
    matchScoreDetails?.score?.cb
  );
  // Function to determine background color class
  const getBackgroundColorClass = (ele) => {
    if (ele === "W") {
      return "bg-red";
    } else if (ele === "4") {
      return "bg-green";
    } else if (ele === "6") {
      return "bg-danger-subtle text-dark";
    } else if (ele === "WB") {
      return "bg-WB";
    }

    return "bg-primary";
  };

  const totalBalls = matchScoreDetails?.score?.balls_array?.length || 0;
  const displayBalls = totalBalls > 6 ? totalBalls : 6;

  const [modal, setModal] = useState(false)
  const handleClose = () => setModal(false)

  const handleOverlayClick = (e) => {
    // Close modal when clicking outside the modal content
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>

      {errorMessage ? <div>{errorMessage}</div> : <div id="i_frame_4">
        <div className="wbt99-scoremain">
          <div className="main-score-row-head">
            <div
              className="d-flex text-light"
              style={{ marginBottom: 0, padding: 0 }}
            >
              {Array.from({ length: displayBalls }).map((_, i) => (
                <div
                  key={i}
                  className={`overBall text-light ${getBackgroundColorClass(
                    matchScoreDetails?.score?.balls_array[i]
                  )}`}
                >
                  <span>
                    {i < totalBalls
                      ? matchScoreDetails?.score?.balls_array[i]
                      : "-"}
                  </span>
                </div>
              ))}
            </div>
            <span className="ball-message welTxt d-flex justify-content-between">
              <div>
                {matchScoreDetails?.score?.cb
                  ? matchScoreDetails?.score?.cb
                  : "WELCOME"}</div> <div>
                {isMuted ? (
                  <IoVolumeMuteOutline
                    style={{ fontSize: isSmallScreen ? "18px" : "27px", cursor: "pointer" }}
                    onClick={handleVolumeToggle}
                  />
                ) : (
                  <IoVolumeHighOutline
                    style={{ fontSize: isSmallScreen ? "18px" : "27px", cursor: "pointer" }}
                    onClick={handleVolumeToggle}
                  />
                )}</div>
            </span>
          </div>
          <div className="main-score-row-body">
            <span className="team-name4">
              {matchScoreDetails?.score?.team1_img && <img
                width="25px"
                height="25px"
                style={{ borderRadius: "50%", marginInline: "5px" }}
                src={matchScoreDetails?.score?.team1_img}
                alt="team1"
              />}
              {matchScoreDetails?.score?.team1_name
                ? matchScoreDetails?.score?.team1_name
                : "-"}
            </span>
            <span className="wbt99-runrate"> </span>
            <span className="team-score">
              {matchScoreDetails?.score?.team1_score
                ? matchScoreDetails?.score?.team1_score
                : "Yet To Bet"}{" "}
              (
              {matchScoreDetails?.score?.team1_over
                ? matchScoreDetails?.score?.team1_over
                : "()"}
              )
            </span>
          </div>

          <div className="main-score-row-body">
            <span className="team-name4">
              {matchScoreDetails?.score?.team2_img && <img
                alt="team2"
                style={{ borderRadius: "50%", marginInline: "5px" }}
                width="25px"
                height="25px"
                src={matchScoreDetails?.score?.team2_img}
              />}
              {matchScoreDetails?.score?.team2_name
                ? matchScoreDetails?.score?.team2_name
                : "-"}
            </span>
            <span className="wbt99-runrate"> </span>
            <span className="team-score">
              {matchScoreDetails?.score?.team2_score
                ? matchScoreDetails?.score?.team2_score
                : "Yet To Bet"}{" "}
              (
              {matchScoreDetails?.score?.team2_over
                ? matchScoreDetails?.score?.team2_over
                : "()"}
              )
            </span>
          </div>

          <div className="main-score-row-body" style={{ marginBottom: "10px" }}>
            <div className="text-nowrap overflow-auto" style={{ margin: "auto" }}>
              <span style={{ fontSize: "14px", color: "#fff" }}>
                {matchScoreDetails?.score?.toss
                  ? matchScoreDetails?.score?.toss
                  : "WELCOME"}
              </span>
            </div>
          </div>

          <div
            className="main-score-row-body"
            style={{ background: "#000000c7" }}
          >
            <div
              className="row"
              style={{
                fontSize: "16px",
                color: "#fff",
                display: "inline-grid",
                width: "100%",
                margin: "auto",
              }}
            >
              <div className="inner" style={{ background: "teal" }}>
                <span style={{ width: "50%" }}>Player</span>
                <span style={{ width: "20%" }}>Run(Ball)</span>
                <span style={{ width: "10%" }}>4s</span>
                <span style={{ width: "10%" }}>6s</span>
                <span style={{ width: "10%" }}>SR</span>
              </div>
              <span className="inner">
                <span style={{ width: "50%" }}>
                  <span style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                    {matchScoreDetails?.score?.player1_array?.img ? (
                      <img
                        src={matchScoreDetails?.score?.player1_array?.img}
                        alt="team2"
                        style={{ width: "25px", height: "25px", borderRadius: "1000px" }}
                      />
                    ) : null}
                    {matchScoreDetails?.score?.player1_array?.name
                      ? matchScoreDetails?.score?.player1_array?.name
                      : "-"}
                  </span>
                </span>
                <span style={{ width: "20%" }}>
                  {" "}
                  {matchScoreDetails?.score?.player1_array?.run
                    ? matchScoreDetails?.score?.player1_array?.run
                    : "-"}{" "}
                  (
                  {matchScoreDetails?.score?.player1_array?.ball
                    ? matchScoreDetails?.score?.player1_array?.ball
                    : "-"}
                  )
                </span>
                <span style={{ width: "10%" }}>
                  {matchScoreDetails?.score?.player1_array?.fours
                    ? matchScoreDetails?.score?.player1_array?.fours
                    : "-"}
                </span>
                <span style={{ width: "10%" }}>
                  {" "}
                  {matchScoreDetails?.score?.player1_array?.sixes
                    ? matchScoreDetails?.score?.player1_array?.sixes
                    : "-"}
                </span>
                <span style={{ width: "10%" }}>
                  {" "}
                  {matchScoreDetails?.score?.player1_array?.strike_rate
                    ? matchScoreDetails?.score?.player1_array?.strike_rate
                    : "-"}
                </span>
              </span>
              <span className="inner">
                <span style={{ width: "50%" }}>
                  <span style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                    {matchScoreDetails?.score?.player2_array?.img ? (
                      <img
                        src={matchScoreDetails?.score?.player2_array?.img}
                        alt="team2"
                        style={{ width: "25px", height: "25px", borderRadius: "1000px" }}
                      />
                    ) : null}
                    {matchScoreDetails?.score?.player2_array?.name
                      ? matchScoreDetails?.score?.player2_array?.name
                      : "-"}
                  </span>
                </span>
                <span style={{ width: "20%" }}>
                  {" "}
                  {matchScoreDetails?.score?.player2_array?.run
                    ? matchScoreDetails?.score?.player2_array?.run
                    : "-"}{" "}
                  (
                  {matchScoreDetails?.score?.player2_array?.ball
                    ? matchScoreDetails?.score?.player2_array?.ball
                    : "-"}
                  )
                </span>
                <span style={{ width: "10%" }}>
                  {matchScoreDetails?.score?.player2_array?.fours
                    ? matchScoreDetails?.score?.player2_array?.fours
                    : "-"}
                </span>
                <span style={{ width: "10%" }}>
                  {" "}
                  {matchScoreDetails?.score?.player2_array?.sixes
                    ? matchScoreDetails?.score?.player2_array?.sixes
                    : "-"}
                </span>
                <span style={{ width: "10%" }}>
                  {" "}
                  {matchScoreDetails?.score?.player2_array?.strike_rate
                    ? matchScoreDetails?.score?.player2_array?.strike_rate
                    : "-"}
                </span>
              </span>
            </div>
          </div>
             <div
            className="main-score-row-body"
            style={{ background: "#000000c7" }}
          >
            <div
              className="row"
              style={{
                fontSize: "16px",
                color: "#fff",
                display: "inline-grid",
                width: "100%",
                margin: "auto",
              }}
            >
              <div className="inner" style={{ background: "teal" }}>
                <span style={{ width: "50%" }}>Bowler</span>
                <span style={{ width: "20%" }}>Over</span>
                <span style={{ width: "10%" }}>run</span>
                <span style={{ width: "10%" }}>Wicket</span>
                <span style={{ width: "10%" }}>Economy</span>
              </div>
              <span className="inner">
                <span style={{ width: "50%" }}>
                  <span style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                    {matchScoreDetails?.score?.bowlerArray?.img ? (
                      <img
                        src={matchScoreDetails?.score?.bowlerArray?.img}
                        alt="team2"
                        style={{ width: "25px", height: "25px", borderRadius: "1000px" }}
                      />
                    ) : null}
                    {matchScoreDetails?.score?.bowlerArray?.name
                      ? matchScoreDetails?.score?.bowlerArray?.name
                      : "-"}
                  </span>
                </span>
                <span style={{ width: "20%" }}>
                  {" "}
                  {matchScoreDetails?.score?.bowlerArray?.run
                    ? matchScoreDetails?.score?.bowlerArray?.run
                    : "-"}{" "}
                  (
                  {matchScoreDetails?.score?.bowlerArray?.over
                    ? matchScoreDetails?.score?.bowlerArray?.over
                    : "-"}
                  )
                </span>
                <span style={{ width: "10%" }}>
                  {matchScoreDetails?.score?.bowlerArray?.run
                    ? matchScoreDetails?.score?.bowlerArray?.run
                    : "-"}
                </span>
                <span style={{ width: "10%" }}>
                  {" "}
                  {matchScoreDetails?.score?.bowlerArray?.wicket
                    ? matchScoreDetails?.score?.bowlerArray?.wicket
                    : "-"}
                </span>
                <span style={{ width: "10%" }}>
                  {" "}
                  {matchScoreDetails?.score?.bowlerArray?.economy
                    ? matchScoreDetails?.score?.bowlerArray?.economy
                    : "-"}
                </span>
              </span>
             
            </div>
          </div>

          <div style={{ background: "teal" }} className="footer d-flex w-100 justify-content-between align-items-center mt-1 px-2">
            {/* <button  onClick={()=>setModal(true)}>session</button> */}
            <div style={{ width: "70%" }} className=" text-start">
              CRR : {(matchScoreDetails?.score?.run_rate && matchScoreDetails?.score?.run_rate)}
            </div>
            {/* <div style={{width:"70%"}} className=" text-start"> 
    wkt : {(matchScoreDetails?.score?.last_wicket && matchScoreDetails?.score?.last_wicket?.player !== '-' ) ? `${matchScoreDetails?.score?.last_wicket?.player} : ${matchScoreDetails?.score?.last_wicket?.run}(${matchScoreDetails?.score?.last_wicket?.ball})` : `-`}
  </div> */}
            {/* <div style={{width:"30%"}} className=" text-end"> 
    P'ship : {matchScoreDetails?.score?.partnership ? matchScoreDetails?.score?.partnership : `0(0)`} 
  </div> */}
          </div>

        </div>

      </div>}


    </>
  );
}

export default SocketIframe4;
