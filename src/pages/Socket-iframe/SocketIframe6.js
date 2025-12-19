import { Link, useParams } from "react-router-dom";
import { useMatchDetails } from "../../middleware/useMatchDetails";
import "./SocketIframe6.css";
import { useState } from "react";
import { GiClick } from "react-icons/gi";
import useMatchScoreVoice from "../../middleware/useMatchScoreVoice";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
function SocketIframe6() {
  const { marketId, eventId } = useParams();
  const { matchScoreDetails , errorMessage } = useMatchDetails(marketId, eventId);
  const { isMuted, handleVolumeToggle, isSmallScreen } = useMatchScoreVoice(
    matchScoreDetails?.score?.cb
  );
  const [matchscoreTab, setMatchScoreTab] = useState(false);
  const handleClick1 = () => {
    setMatchScoreTab(true);
  };
  const totalBalls = matchScoreDetails?.score?.balls_array?.length || 0;
  const displayBalls = totalBalls > 6 ? totalBalls : 6;

  const [modal , setModal] = useState(false)
  const handleClose = ()=>setModal(false)

  const handleOverlayClick = (e) => {
    // Close modal when clicking outside the modal content
    if (e.target === e.currentTarget) {
        handleClose();
    }
};


  return (
    <>

   {errorMessage ? <div>{errorMessage}</div>  : 
   <>
   <div class="vs-team row align-items-center justify-content-between">
        <div class="left-team-score col-4 d-flex flex-wrap align-items-center px-0 justify-content-between">
          <span class="vs-img">
            {matchScoreDetails?.score?.team1_img && (
              <img alt="team" src={matchScoreDetails?.score?.team1_img} />
            )}
          </span>
          <h5 className="team_name_6">
            {matchScoreDetails?.score?.team1_name
              ? matchScoreDetails?.score?.team1_name
              : "-"}
          </h5>
          <h5 className="team_score_6">
            <span>
              {matchScoreDetails?.score?.team1_score
                ? matchScoreDetails?.score?.team1_score
                : "0"}
            </span>
            <span>
              (
              {matchScoreDetails?.score?.team1_over
                ? matchScoreDetails?.score?.team1_over
                : ""}
              )
            </span>
          </h5>
        </div>

        <div className="middle-score  col-4">
          <p className="position-relative upperScore-box ">
            <div className="zoom-6">
              {matchScoreDetails?.score?.cb
                ? matchScoreDetails?.score?.cb
                : "WELCOME"}
            </div>
            <div style={{
                  position:"absolute",
                  top:"5%",
                  right:"8px"
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
                </div>
          </p>
        </div>

        <div class="right-team-score col-4 d-flex flex-wrap align-items-center px-0 justify-content-between">
          <h5 className="team_score_6">
            <span>
              {matchScoreDetails?.score?.team2_score
                ? matchScoreDetails?.score?.team2_score
                : "0"}
            </span>
            <span>
              (
              {matchScoreDetails?.score?.team2_over
                ? matchScoreDetails?.score?.team2_over
                : ""}
              )
            </span>
          </h5>
          <h5 className="team_name_6">
            {matchScoreDetails?.score?.team2_name
              ? matchScoreDetails?.score?.team2_name
              : "-"}
          </h5>
          <span class="vs-img">
            {matchScoreDetails?.score?.team2_img && (
              <img src={matchScoreDetails?.score?.team2_img} />
            )}
          </span>
        </div>
      </div>
      {!matchscoreTab && (
        <div>
          <div className="opentabbox d-flex position-relative flex-column ">
            <div className=" w-100 d-flex">
              <div className="current-over current-over-ext">
                <div className="balls over-container-2">
                  <ul style={{paddingLeft:"2px"}} className="ball-container6 over-container6 d-flex">
                    
                    {Array.from({ length: displayBalls }).map((_, i) => (
              
              <li key={i} className="ball  ">
                  {i < totalBalls
                    ? matchScoreDetails?.score.balls_array[i]
                    : "-"}
              </li>
             
            ))}
                    
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-100 d-flex justify-content-between px-2">
              <div className="w-20">
                <div className="run-rates w-100 pb-1">
                  <div className="run-rate team1CR hide">
                    CR :{" "}
                    {matchScoreDetails?.score.run_rate
                      ? matchScoreDetails?.score.run_rate
                      : "-"}
                  </div>
                </div>
              </div>
              <div className="runs-need text-center w-60">
                <span className="mobile-run-need">
                  {matchScoreDetails?.score?.cb
                    ? matchScoreDetails?.score?.cb
                    : "WELCOME"}
                </span>
              </div>
              <div className="w-20 text-end">
                <div className="run-rates w-100 pb-1">
                  <div className="run-rate hide">RRR : 0.00</div>
                </div>
              </div>
            </div>
            <div
              onClick={handleClick1}
              style={{ bottom: "-25px", left: "50%" }}
              className="  position-absolute"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="26"
                viewBox="0 0 190 26"
                style={{ height: "45px",translate:"-50%" }}
              >
                <path
                  d="M0.208334 0.899998C3.00833 1.4 9.20833 2.6 14.2083 3.4C28.1083 5.9 33.9083 7.6 51.1083 13.9C73.9083 22.5 79.5833 24.7999 93 25.5C107.692 25.4999 116.508 23.5 132.708 17.2C156.308 8 166.008 4.8 177.408 2.4L189.208 -1.90735e-06H92.2083C30.8083 -1.90735e-06 -2.99167 0.399998 0.208334 0.899998Z"
                  fill="#000"
                />
                <path
                  d="M94.4988 21C93.8378 21 93.1765 20.8465 92.6728 20.5396L79.7568 12.6825C78.7477 12.0686 78.7477 11.0742 79.7568 10.4604C80.7659 9.84654 82.4005 9.84654 83.4096 10.4604L94.4988 17.2089L105.59 10.4616C106.599 9.84777 108.234 9.84777 109.243 10.4616C110.252 11.0754 110.252 12.0699 109.243 12.6837L96.3272 20.5408C95.8227 20.8478 95.1607 21 94.4988 21Z"
                  fill="#fff"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
      {matchscoreTab && (
        <div className="scoretabMobile position-relative mobile-tab  flex-column down-content">
          <div
            style={{
              left: "50%",
              top: "-18px",
            }}
            className="upArrowSpace position-absolute"
          >
            <div style={{translate:"-50%"}} className="up-Arrow text-light">
              <div
                onClick={() => setMatchScoreTab(false)}
                className=""
                id="details_score"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="26"
                  viewBox="0 0 190 26"
                  fill="#000"
                >
                  <path
                    d="M188.999 24.6C186.199 24.1 179.999 22.9 174.999 22.1C161.099 19.6 155.299 17.9 138.099 11.6C115.299 3 109.624 0.700056 96.207 0C81.5154 5.59986e-05 72.6987 2 56.4987 8.3C32.8987 17.5 23.1987 20.7 11.7987 23.1L-0.00131226 25.5L96.9987 25.5C158.399 25.5 192.199 25.1 188.999 24.6Z"
                    fill="#000"
                  ></path>
                  <path
                    d="M94.7082 4.5C95.3692 4.5 96.0305 4.65346 96.5342 4.96038L109.45 12.8175C110.459 13.4314 110.459 14.4258 109.45 15.0396C108.441 15.6535 106.806 15.6535 105.797 15.0396L94.7082 8.29107L83.6166 15.0384C82.6076 15.6522 80.9729 15.6522 79.9638 15.0384C78.9548 14.4246 78.9548 13.4301 79.9638 12.8163L92.8798 4.95915C93.3844 4.65223 94.0463 4.5 94.7082 4.5Z"
                    fill="#fff"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="details-center w-100 d-flex">
            <div className="current-over current-over-ext">
              <div className="balls over-container-2">
                <ul style={{paddingLeft:"2px"}} className="ball-container6 over-container6-d py-2 d-flex">
                {Array.from({ length: displayBalls }).map((_, i) => (
              
              <li key={i} className="ball  ">
                  {i < totalBalls
                    ? matchScoreDetails?.score.balls_array[i]
                    : "-"}
              </li>
             
            ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="w-100 d-flex px-2">
            <div className="w-20">
              <div className="run-rates  w-100 pb-1">
                <div className="run-rate   team1CR hide">
                  CR :{" "}
                  {matchScoreDetails?.score.run_rate
                    ? matchScoreDetails?.score.run_rate
                    : "-"}
                </div>
              </div>
            </div>
            <div className="runs-need text-center text-nowrap overflow-auto w-60">
              <span className="mobile-run-need ">
                {matchScoreDetails?.score?.toss
                  ? matchScoreDetails?.score?.toss
                  : "WELCOME"}
              </span>
            </div>
            <div className="w-20">
              <div className="run-rates w-100 pb-1 text-end">
                <div className="run-rate hide">RRR : 0.00</div>
              </div>
            </div>
          </div>
          <div className="details-left overflow-scroll">
            <table className="table6">
              <tbody
                className="tbodybatter-bowler"
                id="tblBatsManScorecardlistbody"
              >
                <tr>
                  <td className="player align-left">Batter</td>
                  <td className="text-center">R</td>
                  <td className="text-center">B</td>
                  <td className="text-center">4s</td>
                  <td className="text-center">6s</td>
                  <td className="text-center">SR</td>
                </tr>
                <tr className="player-details">
                  <td className="player">
                    {matchScoreDetails?.score?.player1_array?.name
                      ? matchScoreDetails?.score?.player1_array?.name
                      : "-"}
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
                    {" "}
                    {matchScoreDetails?.score?.player1_array?.sixes
                      ? matchScoreDetails?.score?.player1_array?.sixes
                      : "-"}
                  </td>
                  <td className="text-center">
                    {" "}
                    {matchScoreDetails?.score?.player1_array?.strike_rate
                      ? matchScoreDetails?.score?.player1_array?.strike_rate
                      : "-"}
                  </td>
                </tr>
                <tr className="player-details">
                  <td className="player">
                    {matchScoreDetails?.score?.player2_array?.name
                      ? matchScoreDetails?.score?.player2_array?.name
                      : "-"}
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
                    {" "}
                    {matchScoreDetails?.score?.player2_array?.sixes
                      ? matchScoreDetails?.score?.player2_array?.sixes
                      : "-"}
                  </td>
                  <td className="text-center">
                    {" "}
                    {matchScoreDetails?.score?.player2_array?.strike_rate
                      ? matchScoreDetails?.score?.player2_array?.strike_rate
                      : "-"}
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ fontSize: "15px" }} className="text-light px-2 py-1">
              bowler :{" "}
              {matchScoreDetails?.score?.bowler
                ? matchScoreDetails?.score?.bowler
                : "-"}
            </div>
          </div>
        </div>
      )}
      {matchscoreTab && (
        <div className="scoretabDesktop ">
          <div style={{translate:"-50%"}} className="upArrowSpace">
            <div className="up-Arrow text-light">
              <div
                onClick={() => setMatchScoreTab(false)}
                className=""
                id="details_score"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="26"
                  viewBox="0 0 190 26"
                  fill="#000"
                >
                  <path
                    d="M188.999 24.6C186.199 24.1 179.999 22.9 174.999 22.1C161.099 19.6 155.299 17.9 138.099 11.6C115.299 3 109.624 0.700056 96.207 0C81.5154 5.59986e-05 72.6987 2 56.4987 8.3C32.8987 17.5 23.1987 20.7 11.7987 23.1L-0.00131226 25.5L96.9987 25.5C158.399 25.5 192.199 25.1 188.999 24.6Z"
                    fill="#000"
                  ></path>
                  <path
                    d="M94.7082 4.5C95.3692 4.5 96.0305 4.65346 96.5342 4.96038L109.45 12.8175C110.459 13.4314 110.459 14.4258 109.45 15.0396C108.441 15.6535 106.806 15.6535 105.797 15.0396L94.7082 8.29107L83.6166 15.0384C82.6076 15.6522 80.9729 15.6522 79.9638 15.0384C78.9548 14.4246 78.9548 13.4301 79.9638 12.8163L92.8798 4.95915C93.3844 4.65223 94.0463 4.5 94.7082 4.5Z"
                    fill="#fff"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="d-flex w-100 align-items-center ">
            <div style={{ width: "40%" }}>
              <table className="table6-d">
                <tbody
                  className="tbodybatter-bowler"
                  id="tblBatsManScorecardlistbody"
                >
                  <tr>
                    <td className="player align-left">Batter-1</td>
                    <td className="text-center">R</td>
                    <td className="text-center">B</td>
                    <td className="text-center">4s</td>
                    <td className="text-center">6s</td>
                    <td className="text-center">SR</td>
                  </tr>
                  <tr className="player-details">
                    <td className="player">
                      {matchScoreDetails?.score?.player1_array?.name
                        ? matchScoreDetails?.score?.player1_array?.name
                        : "-"}
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
                      {" "}
                      {matchScoreDetails?.score?.player1_array?.sixes
                        ? matchScoreDetails?.score?.player1_array?.sixes
                        : "-"}
                    </td>
                    <td className="text-center">
                      {" "}
                      {matchScoreDetails?.score?.player1_array?.strike_rate
                        ? matchScoreDetails?.score?.player1_array?.strike_rate
                        : "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ width: "20%" }}>
              <div style={{ minWidth: "100px" }} className="over-details6">
                <div className="current-over current-over-ext">
                  <div className="balls over-container-2 desktop-overs">
                    <ul style={{paddingLeft:"2px", flexWrap:"wrap"}} className="ball-container6 over-container6  d-flex">
                    {Array.from({ length: displayBalls }).map((_, i) => (
              
              <li key={i} className="ball  ">
                  {i < totalBalls
                    ? matchScoreDetails?.score.balls_array[i]
                    : "-"}
              </li>
             
            ))}
                    </ul>
                  </div>
                </div>
                <div className="run-rates d-flex justify-content-between px-2 w-100 pb-1">
                  <div className="run-rate text-dark fs-6   team1CR hide">
                    CR : 
                    {matchScoreDetails?.score.run_rate
                      ? matchScoreDetails?.score.run_rate
                      : "-"}
                  </div>
                  <div className="run-rate text-dark fs-6  hide">
                    RRR : 0.00
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "40%" }}>
              <table className="table6-d">
                <tbody
                  className="tbodybatter-bowler"
                  id="tblBatsManScorecardlistbody"
                >
                  <tr>
                    <td className="player align-left">Batter-2</td>
                    <td className="text-center">R</td>
                    <td className="text-center">B</td>
                    <td className="text-center">4s</td>
                    <td className="text-center">6s</td>
                    <td className="text-center">SR</td>
                  </tr>
                  <tr className="player-details">
                    <td className="player">
                      {matchScoreDetails?.score?.player2_array?.name
                        ? matchScoreDetails?.score?.player2_array?.name
                        : "-"}
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
                      {" "}
                      {matchScoreDetails?.score?.player2_array?.sixes
                        ? matchScoreDetails?.score?.player2_array?.sixes
                        : "-"}
                    </td>
                    <td className="text-center">
                      {" "}
                      {matchScoreDetails?.score?.player2_array?.strike_rate
                        ? matchScoreDetails?.score?.player2_array?.strike_rate
                        : "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="d-flex w-100">
            <div className="text-light  px-2" style={{ width: "40%", }}>
              bowler :{" "}
              {matchScoreDetails?.score?.bowler
                ? matchScoreDetails?.score?.bowler
                : "-"}
            </div>
            <div
              className="text-light d-flex justify-content-center"
              style={{ width: "20%",textWrap:"nowrap" }}
            >
               {matchScoreDetails?.score?.toss
                ? matchScoreDetails?.score?.toss
                : "WELCOME"}
            </div>
            <div style={{ width: "40%" }}></div>
          </div>

        </div>

      )}

      </>
             }
        

    </>
  );
}

export default SocketIframe6;
