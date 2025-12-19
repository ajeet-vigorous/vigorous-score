import { Link, useParams } from "react-router-dom";
import "./SocketIframe15.css";
import { useMatchDetails } from "../../middleware/useMatchDetails";
import { useEffect, useState } from "react";
import { GiClick } from "react-icons/gi";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import useMatchScoreVoice from "../../middleware/useMatchScoreVoice";
import { MdSportsCricket } from "react-icons/md";

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
                  <div className="score sc_15_teamScore d-flex justify-content-end align-items-center">
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
                        <th className="text-center">R</th>
                        <th className="text-center">B</th>
                        <th className="text-center">4s</th>
                        <th className="text-center">6s</th>
                        <th className="text-center">SR</th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr>
                  <td>
                    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                      <div className="">
                        {/* {matchScoreDetails?.score?.player1_array?.img ? (
                          <img
                            src={matchScoreDetails?.score?.player1_array?.img}
                            alt="team1"
                            style={{ width: "25px", height: "25px", borderRadius: "1000px" }}
                          />
                        ) : null} */}
                        {matchScoreDetails?.score?.player1_array?.img ? (
                          <img
                            src={matchScoreDetails.score.player1_array.img}
                            alt="team1"
                            style={{ width: "25px", height: "25px", borderRadius: "1000px" }}
                            className=""
                          />
                        ) : (
                          <svg
                          className="svgIcon"
                          viewBox="0 0 420 420"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginRight: 4 }}
                        >
                          <g>
                            <path
                              d="M391.227,20c-2.337,0-4.534,0.91-6.186,2.563L317.96,89.674l12.355,12.355l67.097-67.097c1.653-1.652,2.563-3.849,2.563-6.185c0-2.336-0.91-4.532-2.562-6.185C395.761,20.91,393.564,20,391.227,20z"
                              fill="rgb(232, 85, 18)"
                            />
                            <path
                              d="M323.236,167.203c12.119-12.118,12.122-31.839,0.007-43.961l-26.495-26.495c-5.875-5.875-13.687-9.11-21.997-9.11c-8.305,0-16.11,3.231-21.979,9.102L22.493,327.017c-8.427,8.426,5.999,30.528,22.969,47.497c15.48,15.481,31.611,25.484,41.094,25.486h0.001c2.685,0,4.659-0.776,6.4-2.519L323.236,167.203z"
                              fill="rgb(241, 156, 125)"
                            />
                            <path
                              d="M419.975,28.747c0-7.679-2.99-14.898-8.42-20.327C406.125,2.99,398.906,0,391.227,0c-7.679,0-14.898,2.99-20.329,8.422L303.13,76.221c-8.33-5.584-18.123-8.584-28.379-8.584c-13.647,0-26.475,5.313-36.122,14.959L8.351,312.874c-5.902,5.902-14.063,19.258-2.41,42.391c7.078,14.049,18.939,26.951,25.379,33.392C43.024,400.36,65.764,419.997,86.553,420h0.005c7.959,0,15.063-2.897,20.542-8.376l230.278-230.278c17.496-17.496,19.619-44.629,6.378-64.472l67.798-67.798C416.985,43.646,419.975,36.427,419.975,28.747z"
                              fill="rgb(232, 85, 18)"
                            />
                          </g>
                        </svg>
                          // <MdSportsCricket className="svgIcon text-gray-400" />
                        )}
                      </div>
                      {matchScoreDetails?.score?.player1_array?.name
                        ? matchScoreDetails?.score?.player1_array?.name
                        : "-"}
                    </div>
                  </td>
                  <td className="text-center">
                    {matchScoreDetails?.score?.player1_array?.run
                      ? matchScoreDetails?.score?.player1_array?.run
                      : "-"}
                  </td>
                  <td className="text-center">
                    {matchScoreDetails?.score?.player1_array?.ball
                      ? matchScoreDetails?.score?.player1_array?.ball
                      : "-"}
                  </td>
                  <td className="text-center">
                    {matchScoreDetails?.score?.player1_array?.fours
                      ? matchScoreDetails?.score?.player1_array?.fours
                      : "-"}
                  </td>
                  <td className="text-center">
                    {matchScoreDetails?.score?.player1_array?.sixes
                      ? matchScoreDetails?.score?.player1_array?.sixes
                      : "-"}
                  </td>
                  <td className="text-center">
                    {matchScoreDetails?.score?.player1_array?.strike_rate
                      ? matchScoreDetails?.score?.player1_array?.strike_rate
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                      <div className="">
                        {
                        matchScoreDetails?.score?.player2_array?.img ? (
                          <img
                            src={matchScoreDetails?.score?.player2_array?.img}
                            alt="team1"
                            style={{ width: "25px", height: "25px", borderRadius: "1000px" }}
                          />
                        ) : 
                        (
                          <svg
                          className="svgIcon"
                          viewBox="0 0 420 420"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginRight: 4 }}
                        >
                          <g>
                            <path
                              d="M391.227,20c-2.337,0-4.534,0.91-6.186,2.563L317.96,89.674l12.355,12.355l67.097-67.097c1.653-1.652,2.563-3.849,2.563-6.185c0-2.336-0.91-4.532-2.562-6.185C395.761,20.91,393.564,20,391.227,20z"
                              fill="rgb(232, 85, 18)"
                            />
                            <path
                              d="M323.236,167.203c12.119-12.118,12.122-31.839,0.007-43.961l-26.495-26.495c-5.875-5.875-13.687-9.11-21.997-9.11c-8.305,0-16.11,3.231-21.979,9.102L22.493,327.017c-8.427,8.426,5.999,30.528,22.969,47.497c15.48,15.481,31.611,25.484,41.094,25.486h0.001c2.685,0,4.659-0.776,6.4-2.519L323.236,167.203z"
                              fill="rgb(241, 156, 125)"
                            />
                            <path
                              d="M419.975,28.747c0-7.679-2.99-14.898-8.42-20.327C406.125,2.99,398.906,0,391.227,0c-7.679,0-14.898,2.99-20.329,8.422L303.13,76.221c-8.33-5.584-18.123-8.584-28.379-8.584c-13.647,0-26.475,5.313-36.122,14.959L8.351,312.874c-5.902,5.902-14.063,19.258-2.41,42.391c7.078,14.049,18.939,26.951,25.379,33.392C43.024,400.36,65.764,419.997,86.553,420h0.005c7.959,0,15.063-2.897,20.542-8.376l230.278-230.278c17.496-17.496,19.619-44.629,6.378-64.472l67.798-67.798C416.985,43.646,419.975,36.427,419.975,28.747z"
                              fill="rgb(232, 85, 18)"
                            />
                          </g>
                        </svg>
                          // <MdSportsCricket className="svgIcon text-gray-400" />
                        )
                        }
                      </div>
                      {matchScoreDetails?.score?.player2_array?.name
                        ? matchScoreDetails?.score?.player2_array?.name
                        : "-"}
                    </div>
                  </td>
                  <td className="text-center">
                    {matchScoreDetails?.score?.player2_array?.run
                      ? matchScoreDetails?.score?.player2_array?.run
                      : "-"}
                  </td>
                  <td className="text-center">
                    {matchScoreDetails?.score?.player2_array?.ball
                      ? matchScoreDetails?.score?.player2_array?.ball
                      : "-"}
                  </td>
                  <td className="text-center">
                    {matchScoreDetails?.score?.player2_array?.fours
                      ? matchScoreDetails?.score?.player2_array?.fours
                      : "-"}
                  </td>
                  <td className="text-center">
                    {matchScoreDetails?.score?.player2_array?.sixes
                      ? matchScoreDetails?.score?.player2_array?.sixes
                      : "-"}
                  </td>
                  <td className="text-center">
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
                        <th >Bowler</th>
                        <th className="minWid">O</th>
                        <th className="minWid">R</th>
                        <th className="minWid">W</th>
                        <th className="minWid">Eco</th>
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
                              ) : (
                                <svg
                                className="svgIcon"
                                viewBox="0 0 420 420"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ marginRight: 4 }}
                              >
                                <g>
                                  <path
                                    d="M391.227,20c-2.337,0-4.534,0.91-6.186,2.563L317.96,89.674l12.355,12.355l67.097-67.097c1.653-1.652,2.563-3.849,2.563-6.185c0-2.336-0.91-4.532-2.562-6.185C395.761,20.91,393.564,20,391.227,20z"
                                    fill="rgb(232, 85, 18)"
                                  />
                                  <path
                                    d="M323.236,167.203c12.119-12.118,12.122-31.839,0.007-43.961l-26.495-26.495c-5.875-5.875-13.687-9.11-21.997-9.11c-8.305,0-16.11,3.231-21.979,9.102L22.493,327.017c-8.427,8.426,5.999,30.528,22.969,47.497c15.48,15.481,31.611,25.484,41.094,25.486h0.001c2.685,0,4.659-0.776,6.4-2.519L323.236,167.203z"
                                    fill="rgb(241, 156, 125)"
                                  />
                                  <path
                                    d="M419.975,28.747c0-7.679-2.99-14.898-8.42-20.327C406.125,2.99,398.906,0,391.227,0c-7.679,0-14.898,2.99-20.329,8.422L303.13,76.221c-8.33-5.584-18.123-8.584-28.379-8.584c-13.647,0-26.475,5.313-36.122,14.959L8.351,312.874c-5.902,5.902-14.063,19.258-2.41,42.391c7.078,14.049,18.939,26.951,25.379,33.392C43.024,400.36,65.764,419.997,86.553,420h0.005c7.959,0,15.063-2.897,20.542-8.376l230.278-230.278c17.496-17.496,19.619-44.629,6.378-64.472l67.798-67.798C416.985,43.646,419.975,36.427,419.975,28.747z"
                                    fill="rgb(232, 85, 18)"
                                  />
                                </g>
                              </svg>
                                // <MdSportsCricket className="svgIcon text-gray-400" />
                              )}
                            </div>
                            {matchScoreDetails?.score?.bowlerArray?.name
                              ? matchScoreDetails?.score?.bowlerArray?.name
                              : "-"}
                          </div>
                        </td>
                        <td className="text-center">
                          {matchScoreDetails?.score?.bowlerArray?.over
                            ? matchScoreDetails?.score?.bowlerArray?.over
                            : "-"}
                        </td>
                        <td className="text-center">
                          {matchScoreDetails?.score?.bowlerArray?.run
                            ? matchScoreDetails?.score?.bowlerArray?.run
                            : "-"}
                        </td>
                        <td className="text-center">
                          {matchScoreDetails?.score?.bowlerArray?.wicket
                            ? matchScoreDetails?.score?.bowlerArray?.wicket
                            : "-"}
                        </td>
                        <td className="text-center">
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
