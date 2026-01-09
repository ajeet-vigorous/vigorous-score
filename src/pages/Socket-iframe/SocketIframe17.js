import { Link, useParams } from "react-router-dom";
import "./SocketIframe17.css";
import { useMatchDetails } from "../../middleware/useMatchDetails";
import { useState } from "react";
import { GiClick } from "react-icons/gi";
import useMatchScoreVoice from "../../middleware/useMatchScoreVoice";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { MdSportsCricket } from "react-icons/md";
import { BiSolidCricketBall } from "react-icons/bi";

function SocketIframe17() {
  const { marketId, eventId } = useParams();
  const { matchScoreDetails, errorMessage } = useMatchDetails(marketId, eventId);
  const { isMuted, handleVolumeToggle, isSmallScreen } = useMatchScoreVoice(
    matchScoreDetails?.score?.cb
  );
  console.log(matchScoreDetails, 'matchScoreDetails')
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
      {errorMessage ? <div>{errorMessage}</div> :
        <>
          <div className="desktopView iframe2_content sc_cw-main_container h-25 overflow-hidden py-2">
            <div className="sc_cw-header-desktop">
              <div className="sc_cw-header-grid-desktop">
                <div className="sc_cw-header-container-desktop sc_cw-header-grid-row-desktop">
                  <span className="sc_cw-header-team-name-desktop">
                    {matchScoreDetails?.score?.team1_name}</span>
                </div>
                <div className="sc_cw-header-mid-section-desktop">
                  <div className="sc_cw-header-primary-comment-desktop">{matchScoreDetails?.score?.cb
                    ? matchScoreDetails?.score?.cb
                    : "Welcome"}{" "}</div>
                  <div className="sc_cs-header-target-desktop"> {matchScoreDetails?.score?.toss
                    ? matchScoreDetails?.score?.toss
                    : "WELCOME"}</div>
                </div>
                <div className="sc_cw-header-container-desktop justify-content-end sc_cw-header-grid-row-desktop">
                  <span className="sc_cw-header-team-name-desktop">
                    {matchScoreDetails?.score?.team2_name}</span>
                </div>
                <div className="sc_cw-header-score-container-left-desktop">
                  <div className="sc_cw-header-score-bg-desktop">
                    <span className="sc_cw-header-score-big-desktop">
                      {" "}
                      {matchScoreDetails?.score?.team1_score
                        ? matchScoreDetails?.score?.team1_score
                        : "0"}/
                      {matchScoreDetails?.score?.team1_over
                        ? matchScoreDetails?.score?.team1_over
                        : "0"}
                    </span>
                  </div>
                </div>
                <div className="sc_cw-header-score-container-right-desktop">
                  <div className="sc_cw-header-score-bg-desktop">
                    <span className="sc_cw-header-score-big-desktop">
                      {matchScoreDetails?.score?.team2_score
                        ? matchScoreDetails?.score?.team2_score
                        : "0-0"}{" "}/
                      {matchScoreDetails?.score?.team2_over
                        ? matchScoreDetails?.score?.team2_over
                        : "0"}
                    </span>
                    {/* <span className="sc_cw-header-score-small-desktop">575/8</span> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <div class="sc_cw-info-section-desktop">
              <div class="sc_cw-info-container-desktop">

                <div class="sc_cw-info-part-desktop">
                  <span>Partnership:</span>
                  <span>29(95)</span>
                </div>

                <div class="sc_cw-info-part-desktop">
                  <span> </span>
                </div>

                <div class="sc_cw-info-part-desktop">
                  <span>Last Wicket:</span>
                  <span>Roston Chase 2 (7) </span>
                </div>

              </div>
            </div> */}
            <div class="sc_cw-over-desktop">
              <div class="sc_cw-over-container-desktop">

                <div class="sc_cw-current-over-desktop" style={{ marginRight: '20px' }}>
                  <div class="sc_cw-over-part-name-desktop">Over</div>
                  <div class="sc_cw-over-part-balls-container-desktop">
                    {Array.from({ length: displayBalls }).map((_, i) => (
                      <div
                        key={i}
                      // className={`overBall text-light ${getBackgroundColorClass(
                      //   matchScoreDetails?.score?.balls_array[i]
                      // )}`}
                      >
                        <span class="sc_cw-over-part-balls">
                          {i < totalBalls
                            ? matchScoreDetails?.score?.balls_array[i]
                            : "-"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
            <div class="sc_cw-table-desktop">
              <div class="sc_cw-table-container-desktop">
                <table class="sc_cw-table-structure-desktop">
                  <thead>
                    <tr>
                      <th>Batsmen</th>
                      <th class="sc_cw-table-structure-desktop-align">R</th>
                      <th class="sc_cw-table-structure-desktop-align">B</th>
                      <th class="sc_cw-table-structure-desktop-align">4s</th>
                      <th class="sc_cw-table-structure-desktop-align">6s</th>
                      <th class="sc_cw-table-structure-desktop-align">SR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="d-flex align-items-center gap-1">
                        <MdSportsCricket />
                        <span>{matchScoreDetails?.score?.player1_array?.name
                          ? matchScoreDetails?.score?.player1_array?.name
                          : "-"}</span>
                        {matchScoreDetails?.score?.player1_array?.img ? (
                          <img
                            src={matchScoreDetails?.score?.player1_array?.img}
                            alt="team1"
                            style={{ width: "18px", height: "18px", borderRadius: "1000px" }}
                          />
                        ) : null}
                      </td>
                      <td class="sc_cw-table-structure-desktop-align">{matchScoreDetails?.score?.player1_array?.run}</td>
                      <td class="sc_cw-table-structure-desktop-align">{matchScoreDetails?.score?.player1_array?.ball}</td>
                      <td class="sc_cw-table-structure-desktop-align">{matchScoreDetails?.score?.player1_array?.fours}</td>
                      <td class="sc_cw-table-structure-desktop-align">{matchScoreDetails?.score?.player1_array?.sixes}</td>
                      <td class="sc_cw-table-structure-desktop-align">{matchScoreDetails?.score?.player1_array?.strike_rate}</td>
                    </tr>
                    <tr>
                      <td className="d-flex gap-1">
                        {/* <div style={{width:'20px', height:'20px', fontSize:'20px'}}
                        dangerouslySetInnerHTML={{ __html: cricketSvg }}
                      /> */}
                        <MdSportsCricket />
                        <span>{matchScoreDetails?.score?.player2_array?.name
                          ? matchScoreDetails?.score?.player2_array?.name
                          : "Player-2"}</span>

                        {matchScoreDetails?.score?.player2_array?.img ? (
                          <img
                            src={matchScoreDetails?.score?.player2_array?.img}
                            alt="team1"
                            style={{ width: "18px", height: "18px", borderRadius: "1000px" }}
                          />
                        ) : null}
                      </td>
                      <td className="sc_cw-table-structure-desktop-align">{matchScoreDetails?.score?.player2_array?.run}</td>
                      <td className="sc_cw-table-structure-desktop-align">{matchScoreDetails?.score?.player2_array?.ball}</td>
                      <td className="sc_cw-table-structure-desktop-align">{matchScoreDetails?.score?.player2_array?.fours}</td>
                      <td className="sc_cw-table-structure-desktop-align">{matchScoreDetails?.score?.player2_array?.sixes}</td>
                      <td className="sc_cw-table-structure-desktop-align">{matchScoreDetails?.score?.player2_array?.strike_rate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="sc_cw-table-desktop">
              <div class="sc_cw-table-container-desktop">
                <table class="sc_cw-table-structure-desktop">
                  <thead>
                    <tr>
                      <th>Bowler</th>
                      <th class="sc_cw-table-structure-desktop-align">O</th>
                      <th class="sc_cw-table-structure-desktop-align">R</th>
                      {/* <th class="sc_cw-table-structure-desktop-align">M</th> */}
                      <th class="sc_cw-table-structure-desktop-align">W</th>
                      <th class="sc_cw-table-structure-desktop-align">Eco</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="d-flex align-items-center gap-1">
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
                      </td>
                      <td class="sc_cw-table-structure-desktop-align">{matchScoreDetails?.score?.bowlerArray?.over
                        ? matchScoreDetails?.score?.bowlerArray?.over
                        : "-"}</td>
                      <td class="sc_cw-table-structure-desktop-align">{matchScoreDetails?.score?.bowlerArray?.run
                        ? matchScoreDetails?.score?.bowlerArray?.run
                        : "-"}</td>
                      <td class="sc_cw-table-structure-desktop-align">  {matchScoreDetails?.score?.bowlerArray?.wicket
                        ? matchScoreDetails?.score?.bowlerArray?.wicket
                        : "-"}</td>
                      <td class="sc_cw-table-structure-desktop-align">{matchScoreDetails?.score?.bowlerArray?.economy
                        ? matchScoreDetails?.score?.bowlerArray?.economy
                        : "-"}</td>
                      {/* <td class="sc_cw-table-structure-desktop-align">0</td> */}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="scoreFormobile iframe2_content sc_cw-main_container h-25 overflow-hidden py-2">
            <div className="sc_cw-header">
              <div class="sc_cw-header-mobile">
                <div class="sc_cw-header-grid-mobile">

                  <div class="sc_cw-header-container-mobile sc_cw-header-grid-row-mobile">
                    <span class="sc_cw-header-team-name-mobile">{matchScoreDetails?.score?.team1_name}</span>
                  </div>

                  <div class="sc_cw-header-mid-section-mobile">
                    <div class="sc_cw-header-primary-comment-mobile">{matchScoreDetails?.score?.cb
                      ? matchScoreDetails?.score?.cb
                      : "Welcome"}{" "}
                    </div>
                    <div class="sc_cw-header-rates-mobile">
                      <span class="sc_cw-header-rates-mobile">CRR: <span>{matchScoreDetails?.score?.run_rate &&
                        matchScoreDetails?.score?.run_rate}</span></span>

                    </div>
                    <div class="sc_cs-header-target-mobile">
                      {matchScoreDetails?.score?.toss
                        ? matchScoreDetails?.score?.toss
                        : "WELCOME"}
                    </div>
                    <div class="sc_cs-header-target-mobile">
                    </div>
                  </div>
                  <div class="sc_cw-header-container-mobile sc_cw-header-grid-row-mobile" style={{ justifyContent: 'end' }}>
                    <span class="sc_cw-header-team-name-mobile">{matchScoreDetails?.score?.team2_name
                      ? matchScoreDetails?.score?.team2_name
                      : "-"}</span>
                  </div>

                  <div class="sc_cw-header-score-container-left-mobile">
                    <div class="sc_cw-header-score-bg-mobile">
                      <span class="sc_cw-header-score-small-mobile">
                        {matchScoreDetails?.score?.team1_score
                          ? matchScoreDetails?.score?.team1_score
                          : "0-0"}{" "}
                        (
                        {matchScoreDetails?.score?.team1_over
                          ? matchScoreDetails?.score?.team1_over
                          : "0"}
                        )
                      </span>
                      {/* <span class="sc_cw-header-score-small-mobile">(155.0)</span> */}
                    </div>
                  </div>



                  <div class="sc_cw-header-score-container-right-mobile">
                    <div class="sc_cw-header-score-bg-mobile">
                      <span class="sc_cw-header-score-small-mobile"> {matchScoreDetails?.score?.team2_score
                        ? matchScoreDetails?.score?.team2_score
                        : "0-0"}{" "}
                        (
                        {matchScoreDetails?.score?.team2_over
                          ? matchScoreDetails?.score?.team2_over
                          : "0"}
                        )</span>
                      {/* <span class="sc_cw-header-score-small-mobile">(113.0)</span> */}
                    </div>
                  </div>



                  <div></div>




                </div>
              </div>
            </div>

            <div class="sc_cw-custom-comments-mobile">
              <div class="sc_cw-custom-comments-container-mobile">
                <span> </span>
              </div>
            </div>
            <div class="sc_cw-over-mobile">
              <div class="sc_cw-over-container-mobile">

                <div class="sc_cw-over-arrows-left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path fill="#fff" fill-rule="evenodd" d="M14.03 7.47a.75.75 0 0 1 0 1.06L10.56 12l3.47 3.47a.75.75 0 1 1-1.06 1.06l-4-4a.75.75 0 0 1 0-1.06l4-4a.75.75 0 0 1 1.06 0" clip-rule="evenodd"></path>
                  </svg>
                </div>

                <div class="sc_cw-over-inner-container-mobile">
                  <div class="sc_cw-over-part-mobile">
                    <div class="sc_cw-current-over-mobile" style={{ marginRight: '20px' }}>
                      <div class="sc_cw-over-part-name-mobile">Over</div>
                      <div class="sc_cw-over-part-balls-container-mobile">
                        {Array.from({ length: displayBalls }).map((_, i) => (
                          <div
                            key={i}
                          // className={`overBall text-light ${getBackgroundColorClass(
                          //   matchScoreDetails?.score?.balls_array[i]
                          // )}`}
                          >
                            <span class="sc_cw-over-part-balls">
                              {i < totalBalls
                                ? matchScoreDetails?.score?.balls_array[i]
                                : "-"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="sc_cw-over-arrows-right">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path fill="#fff" fill-rule="evenodd" d="M9.97 7.47a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06L13.44 12L9.97 8.53a.75.75 0 0 1 0-1.06" clip-rule="evenodd"></path>
                  </svg>
                </div>

              </div>
            </div>
            <div class="sc_cw-table-mobile">
              <div class="sc_cw-table-container-mobile">
                <table class="sc_cw-table-structure-mobile">
                  <thead>
                    <tr style={{ borderBottom: '0.5px solid #fff' }}>
                      <th>Batsmen</th>
                      <th class="sc_cw-table-structure-mobile-align">R</th>
                      <th class="sc_cw-table-structure-mobile-align">B</th>
                      <th class="sc_cw-table-structure-mobile-align">4s</th>
                      <th class="sc_cw-table-structure-mobile-align">6s</th>
                      <th class="sc_cw-table-structure-mobile-align sc_cs-table-structure-last-column">SR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='d-flex gap-1' >
                        <MdSportsCricket />

                        <span>{matchScoreDetails?.score?.player1_array?.name
                          ? matchScoreDetails?.score?.player1_array?.name
                          : "Player-2"}</span>

                        {matchScoreDetails?.score?.player1_array?.img ? (
                          <img
                            src={matchScoreDetails?.score?.player1_array?.img}
                            alt="team1"
                            style={{ width: "18px", height: "18px", borderRadius: "1000px" }}
                          />
                        ) : null}


                      </td>
                      <td className="sc_cw-table-structure-mobile-align">{matchScoreDetails?.score?.player1_array?.run}</td>
                      <td className="sc_cw-table-structure-mobile-align">{matchScoreDetails?.score?.player1_array?.ball}</td>
                      <td className="sc_cw-table-structure-mobile-align">{matchScoreDetails?.score?.player1_array?.fours}</td>
                      <td className="sc_cw-table-structure-mobile-align">{matchScoreDetails?.score?.player1_array?.sixes}</td>
                      <td className="sc_cw-table-structure-mobile-align">{matchScoreDetails?.score?.player1_array?.strike_rate}</td>
                    </tr>
                    <tr>
                      <td className='d-flex gap-1'>


                        <MdSportsCricket />
                        <span>{matchScoreDetails?.score?.player2_array?.name
                          ? matchScoreDetails?.score?.player2_array?.name
                          : "Player-2"}</span>

                        {matchScoreDetails?.score?.player2_array?.img ? (
                          <img
                            src={matchScoreDetails?.score?.player2_array?.img}
                            alt="team1"
                            style={{ width: "18px", height: "18px", borderRadius: "1000px" }}
                          />
                        ) : null}
                      </td>

                      <td className="sc_cw-table-structure-mobile-align">{matchScoreDetails?.score?.player2_array?.run}</td>
                      <td className="sc_cw-table-structure-mobile-align">{matchScoreDetails?.score?.player2_array?.ball}</td>
                      <td className="sc_cw-table-structure-mobile-align">{matchScoreDetails?.score?.player2_array?.fours}</td>
                      <td className="sc_cw-table-structure-mobile-align">{matchScoreDetails?.score?.player2_array?.sixes}</td>
                      <td className="sc_cw-table-structure-mobile-align">{matchScoreDetails?.score?.player2_array?.strike_rate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="sc_cw-table-mobile" style={{ marginTop: '3px' }}>
              <div class="sc_cw-table-container-mobile">
                <table class="sc_cw-table-structure-mobile">
                  <thead>
                    <tr style={{ borderBottom: '0.5 solid white' }}>
                      <th>Bowler</th>
                      <th class="sc_cw-table-structure-mobile-align">O</th>
                      <th class="sc_cw-table-structure-mobile-align">R</th>
                      {/* <th class="sc_cw-table-structure-mobile-align">M</th> */}
                      <th class="sc_cw-table-structure-mobile-align">W</th>
                      <th class="sc_cw-table-structure-mobile-align sc_cs-table-structure-last-column">Eco</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="d-flex align-items-center">
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
                      <td class="sc_cw-table-structure-mobile-align">{matchScoreDetails?.score?.bowlerArray?.over
                        ? matchScoreDetails?.score?.bowlerArray?.over
                        : "-"}</td>
                      <td class="sc_cw-table-structure-mobile-align">{matchScoreDetails?.score?.bowlerArray?.run
                        ? matchScoreDetails?.score?.bowlerArray?.run
                        : "-"}</td>
                      <td class="sc_cw-table-structure-mobile-align">  {matchScoreDetails?.score?.bowlerArray?.wicket
                        ? matchScoreDetails?.score?.bowlerArray?.wicket
                        : "-"}</td>
                      <td class="sc_cw-table-structure-mobile-align">{matchScoreDetails?.score?.bowlerArray?.economy
                        ? matchScoreDetails?.score?.bowlerArray?.economy
                        : "-"}</td>
                      
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </>
      }
    </>
  );
}

export default SocketIframe17;
