import { Link, useParams } from "react-router-dom";
import "./SocketIframe15.css";
import { useMatchDetails } from "../../middleware/useMatchDetails";
import { useEffect, useState } from "react";
import { GiClick } from "react-icons/gi";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import useMatchScoreVoice from "../../middleware/useMatchScoreVoice";

function SocketIframe15() {
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
        : <div className={`i_frame_1 sc_15_bg `}>

          <div className="row justify-content-space-between w-100 m-auto sc__15_header">
            <div className="col-4 px-0 sc_15_teamBox">
              <div className="row gap-2 align-items-center mx-0">
                <div className="col-auto px-0">
                  {matchScoreDetails?.score?.team1_img ? (
                      <img className="sc_15_teamImg"
                        src={matchScoreDetails?.score?.team1_img}
                        alt="team1"
                      />
                    ) : null}
                </div>
                <div className="col px-0">
                  <div className="team-name sc_15_teamName">
                    {matchScoreDetails?.score?.team1_name}
                  </div>

                <div className="score sc_15_teamScore">
                  {matchScoreDetails?.score?.team1_score
                    ? matchScoreDetails?.score?.team1_score
                    : "0-0"}{" "}
                    <span>
                        (
                        {matchScoreDetails?.score?.team1_over
                          ? matchScoreDetails?.score?.team1_over
                          : "0"}
                        )
                    </span>
                </div>
                </div>
              </div>
            </div>
            <div className="col-4 d-flex justify-content-center px-0">
              <div className="welTxt sc_15_weltext d-flex justify-content-center ">
              {console.log(matchScoreDetails, "ssss")
              }
                <div>
                  {matchScoreDetails?.score?.cb
                    ? matchScoreDetails?.score?.cb
                    : "Welcome"}{" "}
                </div>
                {/* <div>
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
                </div> */}
              </div>
            </div>
            <div className="col-4 px-0">
              <div className="row gap-2 align-items-center mx-0">
                <div className="col px-0">
                  <div className="team-name sc_15_teamName d-flex justify-content-end">
                    {matchScoreDetails?.score?.team2_name}
                  </div>
                  <div className="score sc_15_teamScore d-flex justify-content-end">
                      {matchScoreDetails?.score?.team2_score
                        ? matchScoreDetails?.score?.team2_score
                        : "0-0"}{" "}
                          <span>
                          (
                          {matchScoreDetails?.score?.team2_over
                            ? matchScoreDetails?.score?.team2_over
                            : "0"}
                          )
                      </span>
                  </div>
                </div>
                <div className="col-auto px-0">
                    {matchScoreDetails?.score?.team2_img ? (
                    <img className="sc_15_teamImg" src={matchScoreDetails?.score?.team2_img} alt="team2" />
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 sc_15_ballWrapper">
            <div className="overText" >Over</div>
              <div className="over px-1 sc_15_over">
                  {Array.from({ length: displayBalls }).map((_, i) => (
                    <div
                      key={i}
                      className={`overBall sc_15_overBall text-light ${getBackgroundColorClass(
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
            </div>
            <div className="col-12">
              <div class="match-stats">
                <input type="checkbox" id="statsToggle" class="stats-toggle" />
                <label for="statsToggle" className="stats-header">
                  Match Statistics
                  <span className="arrow">▲</span>
                </label>

                <div className="stats-body">
                  <table className="sc_15_table">
                    <thead>
                      <tr className="text-white">
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

                  <table className="sc_15_table">
                    <thead>
                      <tr className="text-white">
                        <th>Bowler</th>
                        <th>Over</th>
                        <th>Run</th>
                        <th>Wicket</th>
                        <th>Economy</th>
                      </tr>
                    </thead>
                    <tbody>
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
            </div>
        </div>}
    </>
  );
}

export default SocketIframe15;
