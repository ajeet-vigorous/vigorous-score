import { Link, useParams } from "react-router-dom";
import "./SocketIframe1.css";
import { useMatchDetails } from "../../middleware/useMatchDetails";
import { useEffect, useState } from "react";
import { GiClick } from "react-icons/gi";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import useMatchScoreVoice from "../../middleware/useMatchScoreVoice";

function SocketIframe1() {
  const { marketId, eventId } = useParams();
  const { matchScoreDetails, errorMessage } = useMatchDetails(marketId, eventId);
  // const matchScoreDetails = ""
  const getBackgroundColorClass = (ele) => {
    if (ele === "W") {
      return "bg-red";
    } else if (ele === "4") {
      return "bg-green";
    } else if (ele === "6") {
      return "bg-yellow text-dark";
    } else if (ele === "WB") {
      return "bg-WB";
    }

    return "bg-Primary text-dark";
  };

  const totalBalls = matchScoreDetails?.score?.balls_array?.length || 0;
  const displayBalls = totalBalls > 6 ? totalBalls : 6;

  const { isMuted, handleVolumeToggle, isSmallScreen } = useMatchScoreVoice(
    matchScoreDetails?.score?.cb
  );

  return (
    <>
      {errorMessage ? <div>{errorMessage}</div>
        : <div className={`i_frame_1 `}>
          <div className="text-center">
            <div className="header d-flex">
              <div className="over px-1">
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
              <div className="welTxt d-flex justify-content-between ">
            
                <div>
                  {matchScoreDetails?.score?.cb
                    ? matchScoreDetails?.score?.cb
                    : "Welcome"}{" "}
                </div>
                <div>
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
            <div className="subheader">
              {matchScoreDetails?.score?.toss
                ? matchScoreDetails?.score?.toss
                : "WELCOME"}
            </div>
          </div>
          <div className="d-flex justify-content-space-between w-100 m-auto">
            <div className="col-sm-6 col-6 px-1">
              <div className="teamNameBox">
                <div className="teamBox">
                  <div className="flagimg">
                    {matchScoreDetails?.score?.team1_img ? (
                      <img
                        src={matchScoreDetails?.score?.team1_img}
                        alt="team1"
                      />
                    ) : null}
                  </div>

                  <div className="team-name">
                    {matchScoreDetails?.score?.team1_name}
                  </div>
                </div>
                <div className="score">
                  {matchScoreDetails?.score?.team1_score
                    ? matchScoreDetails?.score?.team1_score
                    : "0-0"}{" "}
                  (
                  {matchScoreDetails?.score?.team1_over
                    ? matchScoreDetails?.score?.team1_over
                    : "0"}
                  )
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-6  px-1 text-right">
              <div className="teamNameBox">
                <div className="teamBox">
                  {matchScoreDetails?.score?.team2_img ? (
                    <img src={matchScoreDetails?.score?.team2_img} alt="team2" />
                  ) : null}
                  <div className="team-name">
                    {matchScoreDetails?.score?.team2_name
                      ? matchScoreDetails?.score?.team2_name
                      : "-"}
                  </div>
                </div>
                <div className="score">
                  {matchScoreDetails?.score?.team2_score
                    ? matchScoreDetails?.score?.team2_score
                    : "0-0"}{" "}
                  (
                  {matchScoreDetails?.score?.team2_over
                    ? matchScoreDetails?.score?.team2_over
                    : "0"}
                  )
                </div>
              </div>
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Runs</th>
                  <th>Ball</th>
                  <th>4s</th>
                  <th>6s</th>
                  <th>SR</th>
                </tr>
              </thead>
              <tbody className="tData">
                <tr>
                  <td>
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
                  <td>
                    {matchScoreDetails?.score?.player1_array?.run
                      ? matchScoreDetails?.score?.player1_array?.run
                      : "-"}
                  </td>
                  <td>
                    {matchScoreDetails?.score?.player1_array?.ball
                      ? matchScoreDetails?.score?.player1_array?.ball
                      : "-"}
                  </td>
                  <td>
                    {matchScoreDetails?.score?.player1_array?.fours
                      ? matchScoreDetails?.score?.player1_array?.fours
                      : "-"}
                  </td>
                  <td>
                    {matchScoreDetails?.score?.player1_array?.sixes
                      ? matchScoreDetails?.score?.player1_array?.sixes
                      : "-"}
                  </td>
                  <td>
                    {matchScoreDetails?.score?.player1_array?.strike_rate
                      ? matchScoreDetails?.score?.player1_array?.strike_rate
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td>
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
                  <td>
                    {matchScoreDetails?.score?.player2_array?.run
                      ? matchScoreDetails?.score?.player2_array?.run
                      : "-"}
                  </td>
                  <td>
                    {matchScoreDetails?.score?.player2_array?.ball
                      ? matchScoreDetails?.score?.player2_array?.ball
                      : "-"}
                  </td>
                  <td>
                    {matchScoreDetails?.score?.player2_array?.fours
                      ? matchScoreDetails?.score?.player2_array?.fours
                      : "-"}
                  </td>
                  <td>
                    {matchScoreDetails?.score?.player2_array?.sixes
                      ? matchScoreDetails?.score?.player2_array?.sixes
                      : "-"}
                  </td>
                  <td>
                    {matchScoreDetails?.score?.player2_array?.strike_rate
                      ? matchScoreDetails?.score?.player2_array?.strike_rate
                      : "-"}
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Bowler</th>
                  <th>Over</th>
                  <th>run</th>
                  <th>Wicket</th>
                  <th>Economy</th>

                </tr>
              </thead>
              <tbody className="tData">
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
          <div className="footer d-flex w-100 justify-content-between px-2">
            {/* <button  onClick={()=>setModal(true)}>session</button> */}
            <div style={{ width: "70%" }} className=" text-start">
              CRR :{" "}
              {matchScoreDetails?.score?.run_rate &&
                matchScoreDetails?.score?.run_rate}
            </div>
            {/* <div style={{width:"30%"}} className=" text-end"> 
    P'ship : {matchScoreDetails?.score?.partnership ? matchScoreDetails?.score?.partnership : `0(0)`} 
  </div> */}
          </div>
        </div>}
    </>
  );
}

export default SocketIframe1;
