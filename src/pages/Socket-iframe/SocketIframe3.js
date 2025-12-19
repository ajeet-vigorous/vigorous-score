
import { Link, useParams } from "react-router-dom";
import "./SocketIframe3.css"
import { useMatchDetails } from "../../middleware/useMatchDetails";
import { useState } from "react";
import { GiClick } from "react-icons/gi";
import useMatchScoreVoice from "../../middleware/useMatchScoreVoice";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";

function SocketIframe3() {
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
      return "bg-dark";
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
      {errorMessage ? <div>{errorMessage}</div> : <div className={` `}>
        <div id="score">
          <div className="bg-main">
            <div className="row scoremain" style={{ color: "#fff" }}>
              <div className="col-lg-12 col-12 batsmanscorecard">
                <div className="padding-zero teams-area row">
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
                  <div className="ballstatus d-flex justify-content-end align-items-center col-6 text-end pr-4 gap-2"><div>{matchScoreDetails?.score?.cb ? matchScoreDetails?.score?.cb : "WELCOME"}</div><div>
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
                    )}</div></div>
                </div>
                <div className="row score-footer col-lg-12 col-12">
                  <div className="">
                    <div className="batsman-area">
                      <table className="batsmanul">
                        <thead>
                          <tr>
                        
                            <th>Name</th>
                            <th className="bat1name">R(B)</th>
                            <th className="bat1name">4's</th>
                            <th className="bat1name">6's</th>
                            <th className="bat1name">SR</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                         
                            <td className="bat1name">
                               <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                {matchScoreDetails?.score?.player1_array?.img ? (
                                <img
                                  src={matchScoreDetails?.score?.player1_array?.img}
                                  alt="team1"
                                  style={{ width: "25px", height: "25px", borderRadius: "1000px" }}
                                />
                              ) : null}
                              {matchScoreDetails?.score?.player1_array?.name
                                ? matchScoreDetails?.score?.player1_array?.name
                                : "-"}
                                </div>
                            </td>
                            <td className="bat1name">
                              {matchScoreDetails?.score?.player1_array?.run} (
                              {matchScoreDetails?.score?.player1_array?.ball})
                            </td>
                            <td className="bat1name">
                              {matchScoreDetails?.score?.player1_array?.fours}
                            </td>
                            <td className="bat1name">
                              {matchScoreDetails?.score?.player1_array?.sixes}
                            </td>
                            <td className="bat1name">
                              {
                                matchScoreDetails?.score?.player1_array
                                  ?.strike_rate
                              }
                            </td>
                          </tr>
                          <tr>
                            <td className="bat1name">
                               <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
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
                                </div>
                            </td>
                            <td className="bat1name">
                              {matchScoreDetails?.score?.player2_array?.run} (
                              {matchScoreDetails?.score?.player2_array?.ball})
                            </td>
                            <td className="bat1name">
                              {matchScoreDetails?.score?.player2_array?.fours}
                            </td>
                            <td className="bat1name">
                              {matchScoreDetails?.score?.player2_array?.sixes}
                            </td>
                            <td className="bat1name">
                              {
                                matchScoreDetails?.score?.player2_array
                                  ?.strike_rate
                              }
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="item-score score-over-fter col-lg-12 col-12">
                      <div className="score-over">
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
                            <li key={i} className={`batsman-name ball2 ${getBackgroundColorClass(matchScoreDetails?.score?.balls_array[i])}`}>
                              <span style={{ textAlign: "center", margin: "auto" }}>
                                {i < totalBalls
                                  ? matchScoreDetails?.score?.balls_array[i]
                                  : "-"}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>



                </div>
                <div style={{padding:"3px"}} className="row score-footer col-lg-12 col-12">
                  <table className="batsmanul">
                    <thead>
                      <tr>
                        <th className="bat1name">Bowler</th>
                        <th className="bat1name">Over</th>
                        <th className="bat1name">run</th>
                        <th className="bat1name">Wicket</th>
                        <th className="bat1name">Economy</th>

                      </tr>
                    </thead>
                    <tbody >
                      <tr>
                        <td className="bat1name">
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
                        <td className="bat1name">
                          {matchScoreDetails?.score?.bowlerArray?.over
                            ? matchScoreDetails?.score?.bowlerArray?.over
                            : "-"}
                        </td>
                        <td className="bat1name">
                          {matchScoreDetails?.score?.bowlerArray?.run
                            ? matchScoreDetails?.score?.bowlerArray?.run
                            : "-"}
                        </td>
                        <td className="bat1name">
                          {matchScoreDetails?.score?.bowlerArray?.wicket
                            ? matchScoreDetails?.score?.bowlerArray?.wicket
                            : "-"}
                        </td>
                        <td className="bat1name">
                          {matchScoreDetails?.score?.bowlerArray?.economy
                            ? matchScoreDetails?.score?.bowlerArray?.economy
                            : "-"}
                        </td>

                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-12 col-12  col comment-box">
                  <span>{matchScoreDetails?.score?.toss ? matchScoreDetails?.score?.toss : "WELCOME"}</span>
                  <div className="footer  d-flex w-100 justify-content-between align-items-center  px-2">
                    {/* <button  onClick={()=>setModal(true)}>session</button> */}
                    <div style={{ width: "70%" }} className=" text-start">
                      CRR : {(matchScoreDetails?.score?.run_rate && matchScoreDetails?.score?.run_rate)}
                    </div>
                    {/* <div style={{width:"30%"}} className=" text-end"> 
    P'ship : {matchScoreDetails?.score?.partnership ? matchScoreDetails?.score?.partnership : `0(0)`} 
  </div> */}
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

export default SocketIframe3;
