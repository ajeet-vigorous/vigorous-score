import { Link, useParams } from "react-router-dom";
import "./SocketIframe2.css";
import { useMatchDetails } from "../../middleware/useMatchDetails";
import { useState } from "react";
import { GiClick } from "react-icons/gi";
import useMatchScoreVoice from "../../middleware/useMatchScoreVoice";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";

function SocketIframe2() {
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

    return "bg-default";
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
      {errorMessage ? <div>{errorMessage}</div> : <div className="iframe2_content h-25 overflow-hidden py-2">
        <div className=" d-flex justify-content-center iframe2_Head w-100 heading_iframe2 ">
          <div className=" w-50 d-flex flex-column ml-2 firstSection_frame2 align-items-center justify-content-around ">
            <div className=" w-100 ">
              <div className="d-flex custom-font-md justify-content-between align-items-center py-1">
                <span>
                  {" "}
                  <span className="flagimg">
                    {" "}
                    {matchScoreDetails?.score?.team2_img ? (
                      <img
                        className="frame-2-images"
                        src={matchScoreDetails?.score?.team1_img}
                        alt="team1"
                      />
                    ) : (
                      "-"
                    )}{" "}
                  </span>
                  {matchScoreDetails?.score?.team1_name}
                </span>
                <span>
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
              </div>
              <div className="d-flex custom-font-md align-items-center justify-content-between py-1">
                <span className="">
                  {" "}
                  <span className="flagimg ">
                    {" "}
                    {matchScoreDetails?.score?.team2_img ? (
                      <img
                        className="frame-2-images"
                        src={matchScoreDetails?.score?.team2_img}
                        alt="team2"
                      />
                    ) : (
                      "-"
                    )}{" "}
                  </span>
                  {matchScoreDetails?.score?.team2_name}
                </span>
                <span>
                  {matchScoreDetails?.score?.team2_score
                    ? matchScoreDetails?.score?.team2_score
                    : "0"}{" "}
                  (
                  {matchScoreDetails?.score?.team2_over
                    ? matchScoreDetails?.score?.team2_over
                    : "0"}
                  )
                </span>
              </div>
              {/* {/ <div className="polygon2 m-1 px-2"><h5>CRR ({matchScoreDetails?.score?.run_rate})</h5></div> /} */}
            </div>
            <div className=" scroeframe2 w-100 rounded">
              <h2 className="batting_state">Batting Stats</h2>
              <div>
                <span className="">
                  {matchScoreDetails?.score?.player1_array?.img ? (
                    <img
                      src={matchScoreDetails?.score?.player1_array?.img}
                      alt="team1"
                      style={{ width: "25px", height: "25px", borderRadius: "1000px" }}
                    />
                  ) : null}


                </span>{" "}
                <span>
                  {matchScoreDetails?.score?.player1_array?.name
                    ? matchScoreDetails?.score?.player1_array?.name
                    : "Player-1"}
                </span>{" "}
                <span className="text-success">
                  {matchScoreDetails?.score?.player1_array?.run
                    ? matchScoreDetails?.score?.player1_array?.run
                    : "0"}{" "}
                  (
                  {matchScoreDetails?.score?.player1_array?.ball
                    ? matchScoreDetails?.score?.player1_array?.ball
                    : "0"}{" "}
                  {matchScoreDetails?.score?.player1_array?.strike_status ==
                    1 ? (
                    <span>*</span>
                  ) : (
                    ""
                  )}
                  ){" "}
                </span>
              </div>
              <div>
                <span className="">         {matchScoreDetails?.score?.player2_array?.img ? (
                  <img
                    src={matchScoreDetails?.score?.player2_array?.img}
                    alt="team1"
                    style={{ width: "25px", height: "25px", borderRadius: "1000px" }}
                  />
                ) : null}</span>{" "}
                <span>
                  {matchScoreDetails?.score?.player2_array?.name
                    ? matchScoreDetails?.score?.player2_array?.name
                    : "Player-2"}
                </span>{" "}
                <span className="text-success px-2">
                  {matchScoreDetails?.score?.player2_array?.run
                    ? matchScoreDetails?.score?.player2_array?.run
                    : "0"}{" "}
                  (
                  {matchScoreDetails?.score?.player2_array?.ball
                    ? matchScoreDetails?.score?.player2_array?.ball
                    : "0"}{" "}
                  {matchScoreDetails?.score?.player2_array?.strike_status ==
                    1 ? (
                    <span>*</span>
                  ) : (
                    ""
                  )}
                  )
                </span>{" "}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center w-50 p-2">
            <div
              className="m-1 ball-container rounded  w-100 "
              style={{
                position: "relative",
                overflow: "hidden",
                height: "200px",
              }}
            >
              <h2 className="current_over d-flex gap-1  flex-column justify-content-center align-items-center">
                CURRENT OVER
              </h2>
              <div className="d-flex justify-content-center align-items-center gap-1  flex-wrap py-1">
                {Array.from({ length: displayBalls }).map((_, i) => (
                  <div key={i} className="image-container">
                    <img src="/ball2.png" alt="Ball" />
                    <span className="centered-text">
                      {i < totalBalls
                        ? matchScoreDetails.score.balls_array[i]
                        : "-"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="zoom-effect py-2 mt-2">
                <div></div>
                {matchScoreDetails?.score?.cb}
              </div>
              <div style={{
                position: "absolute",
                bottom: "5px",
                right: "5px"
              }}>
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
              </div>
            </div>
          </div>
        </div>
        <div className="polygon m-1 px-2">
          <h6>
            {matchScoreDetails?.score?.toss
              ? matchScoreDetails?.score?.toss
              : "Welcome"}
          </h6>
        </div>

        <div>
          <table className="frame2_table">
            <thead className="frame2_table_head curved bg-dark">
              <tr className="bg-dark">
                <th>Batsmen</th>
                <th>R</th>
                <th>B</th>
                <th>4s</th>
                <th>6s</th>
                <th>SR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {matchScoreDetails?.score?.player1_array?.name
                    ? matchScoreDetails?.score?.player1_array?.name
                    : "-"}
                </td>
                <td>{matchScoreDetails?.score?.player1_array?.run}</td>
                <td>{matchScoreDetails?.score?.player1_array?.ball}</td>
                <td>{matchScoreDetails?.score?.player1_array?.fours}</td>
                <td>{matchScoreDetails?.score?.player1_array?.sixes}</td>
                <td>{matchScoreDetails?.score?.player1_array?.strike_rate}</td>
              </tr>
              <tr>
                <td>
                  {matchScoreDetails?.score?.player2_array?.name
                    ? matchScoreDetails?.score?.player2_array?.name
                    : "-"}
                </td>
                <td>{matchScoreDetails?.score?.player2_array?.run}</td>
                <td>{matchScoreDetails?.score?.player2_array?.ball}</td>
                <td>{matchScoreDetails?.score?.player2_array?.fours}</td>
                <td>{matchScoreDetails?.score?.player2_array?.sixes}</td>
                <td>{matchScoreDetails?.score?.player2_array?.strike_rate}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="">
          <table className="frame2_table">
            <thead className="frame2_table_head curved bg-dark">
              <tr className="bg-dark">
                <th>Bowler</th>
                <th>Over</th>
                <th>Run</th>
                <th>Wicket</th>
                <th>Economy</th>

              </tr>
            </thead>
            <tbody className="">
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
      </div>}
    </>
  );
}

export default SocketIframe2;
