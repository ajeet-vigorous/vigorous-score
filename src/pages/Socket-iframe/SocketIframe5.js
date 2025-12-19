import { Link, useParams } from "react-router-dom";
import "./SocketIframe5.css";
import { useMatchDetails } from "../../middleware/useMatchDetails";
import { useState } from "react";
import { GiClick } from "react-icons/gi";
import useMatchScoreVoice from "../../middleware/useMatchScoreVoice";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";

function SocketIframe5() {
  const { marketId, eventId } = useParams();
  const { matchScoreDetails, errorMessage } = useMatchDetails(marketId, eventId);
  const { isMuted, handleVolumeToggle, isSmallScreen } = useMatchScoreVoice(
    matchScoreDetails?.score?.cb
  );
  const getBackgroundColorClass = (ele) => {
    if (ele === "W") {
      return "bg-red";
    } else if (ele === "4") {
      return "bg-green";
    } else if (ele === "6") {
      return "bg-yellow";
    } else if (ele === "WB") {
      return "bg-WB";
    }
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
      {errorMessage ? <div>{errorMessage}</div> : <div className="bg-main5">
        <div className="row scoremain py-1" style={{ color: "#fff" }}>
          <div className="row  mid-section-5">
            <div className="col-2  mid-section-5" style={{ textAlign: "left" }}>
              {/* <span className="team-name5 gap-1  mid-section-5 d-flex flex-column justify-content-start align-items-md-center align-items-start  flex-md-row"> */}

              {matchScoreDetails?.score?.team1_img && (
                <img
                  alt="team1"
                  className="teaminmg5  mid-section-5"
                  style={{ borderRadius: "50px" }}
                  src={matchScoreDetails?.score?.team1_img}
                />
              )}
              {/* </span> */}
            </div>
            <div className="col-8 mid-section-5 ">
              <span className="toss_message w-full text-center text-uppercase  text-wrap mb-3">
                {matchScoreDetails?.score?.toss
                  ? matchScoreDetails?.score?.toss
                  : "WELCOME"}
              </span>
            </div>
            <div
              className="col-2  mid-section-5"
              style={{ textAlign: "right" }}
            >
              {matchScoreDetails?.score?.team2_img && (
                <img
                  alt="team2"
                  style={{ borderRadius: "50px" }}
                  className="teaminmg5"
                  src={matchScoreDetails?.score?.team2_img}
                />
              )}
            </div>
          </div>
          <div className="row mid-section2-5">
            <div className="col-4 mid-section-5 " style={{ textAlign: "left" }}>
              <span className="team-name5 gap-1 d-flex flex-column justify-content-start align-items-md-center align-items-start  flex-md-row">
                <span>
                  {matchScoreDetails?.score?.team1_name
                    ? matchScoreDetails?.score?.team1_name
                    : "-"}
                </span>
              </span>

              <span className="team-score5">
                {matchScoreDetails?.score?.team1_score
                  ? matchScoreDetails?.score?.team1_score
                  : "0"}{" "}
              </span>

              <span className="team-over5">

                {matchScoreDetails?.score?.team1_over
                  ? matchScoreDetails?.score?.team1_over
                  : "-"}

              </span>

              <span className="team-crr"> </span>
            </div>
            <div className="col-4 mid-section-5 ">
              <div style={{ position: "relative" }} className="team-message-block ">
                <span className="team-message">
                  <div>
                    {matchScoreDetails?.score?.cb
                      ? matchScoreDetails?.score?.cb
                      : "WELCOME"}
                  </div>
                </span>
                <span style={{
                  position: "absolute",
                  top: "25%",
                  right: "8px"
                }} >
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
                  )}
                </span>
              </div>
            </div>

            <div className="col-4 mid-section-5" style={{ textAlign: "right" }}>
              <span className="team-name5 gap-1 d-flex flex-column justify-content-end align-items-md-center align-items-end  flex-md-row">
                <span className="pr-3">
                  {matchScoreDetails?.score?.team2_name
                    ? matchScoreDetails?.score?.team2_name
                    : "-"}
                </span>
              </span>
              <span className="team-over5">

                {matchScoreDetails?.score?.team2_over
                  ? matchScoreDetails?.score?.team2_over
                  : "-"}{" "}

              </span>
              <span className="team-score5">
                {matchScoreDetails?.score?.team2_score
                  ? matchScoreDetails?.score?.team2_score
                  : "0"}{" "}
              </span>



              <div className="team-crr">CRR :{" "}
                {matchScoreDetails?.score?.run_rate &&
                  matchScoreDetails?.score?.run_rate} </div>
            </div>
          </div>
          <div style={{ gap: "5px" }} className="d-flex justify-content-center align-items-center mt-1">
            <span style={{ fontSize: "13px" }} className="px-1 ">
              This Over :{" "}
            </span>
            {Array.from({ length: displayBalls }).map((_, i) => (
              <div
                key={i}
                className={`overBall2  ${getBackgroundColorClass(
                  matchScoreDetails?.score.balls_array[i]
                )}`}
              >
                <span>
                  {i < totalBalls
                    ? matchScoreDetails?.score.balls_array[i]
                    : "0"}
                </span>
              </div>
            ))}
          </div>

          <div className="mid-section-5 ">
            <table className="iframe_5_table ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="">R(B)</th>
                  <th className="">4's</th>
                  <th className="">6's</th>
                  <th className="">SR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="">
                    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                      <div className="">
                        {matchScoreDetails?.score?.player1_array?.img ? (
                          <img
                            src={matchScoreDetails?.score?.player1_array?.img}
                            alt="team1"
                            style={{ width: "25px", height: "25px", borderRadius: "1000px" }}
                          />
                        ) : null}
                      </div>
                      {matchScoreDetails?.score?.player1_array?.name
                        ? matchScoreDetails?.score?.player1_array?.name
                        : "-"}
                    </div>
                  </td>
                  <td className="">
                    {matchScoreDetails?.score?.player1_array?.run} (
                    {matchScoreDetails?.score?.player1_array?.ball})
                  </td>
                  <td className="">
                    {matchScoreDetails?.score?.player1_array?.fours}
                  </td>
                  <td className="">
                    {matchScoreDetails?.score?.player1_array?.sixes}
                  </td>
                  <td className="">
                    {matchScoreDetails?.score?.player1_array?.strike_rate}
                  </td>
                </tr>
                <tr>
                  <td className="">
                    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                      <div className="">
                        {matchScoreDetails?.score?.player2_array?.img ? (
                          <img
                            src={matchScoreDetails?.score?.player2_array?.img}
                            alt="team1"
                            style={{ width: "25px", height: "25px", borderRadius: "1000px" }}
                          />
                        ) : null}
                      </div>
                      {matchScoreDetails?.score?.player2_array?.name
                        ? matchScoreDetails?.score?.player2_array?.name
                        : "-"}
                    </div>
                  </td>
                  <td className="">
                    {matchScoreDetails?.score?.player2_array?.run} (
                    {matchScoreDetails?.score?.player2_array?.ball})
                  </td>
                  <td className="">
                    {matchScoreDetails?.score?.player2_array?.fours}
                  </td>
                  <td className="">
                    {matchScoreDetails?.score?.player2_array?.sixes}
                  </td>
                  <td className="">
                    {matchScoreDetails?.score?.player2_array?.strike_rate}
                  </td>
                </tr>
              </tbody>
            </table>
           
          </div>
         <div className="mid-section-5 ">
           <table className="iframe_5_table ">
              <thead>
                <tr>
                  <th>Bowler</th>
                  <th>Over</th>
                  <th>run</th>
                  <th>Wicket</th>
                  <th>Economy</th>

                </tr>
              </thead>
              <tbody >
                <tr>
                  <td>
                    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                      <div className="">
                        {matchScoreDetails?.score?.bowlerArray?.img ? (
                          <img
                            src={matchScoreDetails?.score?.bowlerArray?.img}
                            alt="team1"
                            style={{ width: "25px", height: "25px", borderRadius: "1000px" }}
                          />
                        ) : null}
                      </div>
                      {matchScoreDetails?.score?.bowlerArray?.name
                        ? matchScoreDetails?.score?.bowlerArray?.name
                        : "-"}
                    </div>
                  </td>
                  <td>
                    {matchScoreDetails?.score?.bowlerArray?.over
                      ? matchScoreDetails?.score?.bowlerArray?.over
                      : "-"}
                  </td>
                  <td>
                    {matchScoreDetails?.score?.bowlerArray?.run
                      ? matchScoreDetails?.score?.bowlerArray?.run
                      : "-"}
                  </td>
                  <td>
                    {matchScoreDetails?.score?.bowlerArray?.wicket
                      ? matchScoreDetails?.score?.bowlerArray?.wicket
                      : "-"}
                  </td>
                  <td>
                    {matchScoreDetails?.score?.bowlerArray?.economy
                      ? matchScoreDetails?.score?.bowlerArray?.economy
                      : "-"}
                  </td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>}
    </>
  );
}

export default SocketIframe5;
