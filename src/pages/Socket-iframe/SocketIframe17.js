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
console.log(matchScoreDetails,'matchScoreDetails')
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
                <div className="sc_cw-header-primary-comment-desktop">day stump</div>
                <div className="sc_cs-header-target-desktop"> WI trail by 194 runs</div>
              </div>
              <div className="sc_cw-header-container-desktop justify-content-end sc_cw-header-grid-row-desktop">
                <span className="sc_cw-header-team-name-desktop">
                {matchScoreDetails?.score?.team2_name}</span>
              </div>
              <div className="sc_cw-header-score-container-left-desktop">
                <div className="sc_cw-header-score-bg-desktop">
                  <span className="sc_cw-header-score-big-desktop">575/8
                  {/* {" "}
                  {matchScoreDetails?.score?.team1_score
                    ? matchScoreDetails?.score?.team1_score
                    : "0"}{" "}
                  (
                  {matchScoreDetails?.score?.team1_over
                    ? matchScoreDetails?.score?.team1_over
                    : "0"}
                  ) */}
                  </span>
                  <span className="sc_cw-header-score-small-desktop">575/8</span>
                </div>
                <div>
                  <span className="sc_cw-header-score-small-desktop">crrr
                    <span>ssss</span>
                  </span>
                </div>
              </div>
              <div className="sc_cw-header-score-container-right-desktop">
              <div>
                  <span className="sc_cw-header-score-small-desktop">crrr
                    <span>ssss</span>
                  </span>
                </div>
                <div className="sc_cw-header-score-bg-desktop">
                  <span className="sc_cw-header-score-big-desktop">575/8</span>
                  <span className="sc_cw-header-score-small-desktop">575/8</span>
                </div>
              </div>
            </div>
          </div>
          <div class="sc_cw-info-section-desktop">
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
          </div>
            <div class="sc_cw-over-desktop">
          <div class="sc_cw-over-container-desktop">
    
            <div class="sc_cw-current-over-desktop" style={{marginRight:'20px'}}>
              <div class="sc_cw-over-part-name-desktop">Over 113</div>
              <div class="sc_cw-over-part-balls-container-desktop">
                <span class="sc_cw-over-part-balls">0</span><span class="sc_cw-over-part-balls">2</span><span class="sc_cw-over-part-balls">0</span><span class="sc_cw-over-part-balls">0</span><span class="sc_cw-over-part-balls">4</span><span class="sc_cw-over-part-balls">0</span>
              </div>
            </div>
    
            <div class="sc_cw-current-over-desktop">
              <div class="sc_cw-over-part-name-desktop">Over 112</div>
              <div class="sc_cw-over-part-balls-container-desktop">
                <span class="sc_cw-over-part-balls">0</span><span class="sc_cw-over-part-balls">0</span><span class="sc_cw-over-part-balls">0</span><span class="sc_cw-over-part-balls">0</span><span class="sc_cw-over-part-balls">0</span><span class="sc_cw-over-part-balls">0</span>
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
                      <td className="d-flex align-items-center">
                          <MdSportsCricket />
                        <span>{matchScoreDetails?.score?.player1_array?.name
                          ? matchScoreDetails?.score?.player1_array?.name
                          : "-"}</span>
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
                      </td>
                        <td class="sc_cw-table-structure-desktop-align">{matchScoreDetails?.score?.player1_array?.run}</td>
                        <td class="sc_cw-table-structure-desktop-align">{matchScoreDetails?.score?.player1_array?.ball}</td>
                        <td class="sc_cw-table-structure-desktop-align">{matchScoreDetails?.score?.player1_array?.fours}</td>
                        <td class="sc_cw-table-structure-desktop-align">{matchScoreDetails?.score?.player1_array?.sixes}</td>
                        <td class="sc_cw-table-structure-desktop-align">{matchScoreDetails?.score?.player1_array?.strike_rate}</td>
                    </tr>
                    <tr>
                      <td className="d-flex">
                      {/* <div style={{width:'20px', height:'20px', fontSize:'20px'}}
                        dangerouslySetInnerHTML={{ __html: cricketSvg }}
                      /> */}
                        <MdSportsCricket />
                        <span>{matchScoreDetails?.score?.player2_array?.name
                    ? matchScoreDetails?.score?.player2_array?.name
                    : "Player-2"}</span>
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
                      <th class="sc_cw-table-structure-desktop-align">M</th>
                      <th class="sc_cw-table-structure-desktop-align">W</th>
                      <th class="sc_cw-table-structure-desktop-align">Eco</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="d-flex">
                          <BiSolidCricketBall style={{color:'#c54031', width:'15px', height:'15px'}} className="redBall" />
                        <span>ssssssssssss</span>
                      </td>
                      <td class="sc_cw-table-structure-desktop-align">0.0</td>
                      <td class="sc_cw-table-structure-desktop-align">0</td>
                      <td class="sc_cw-table-structure-desktop-align">0</td>
                      <td class="sc_cw-table-structure-desktop-align">0</td>
                      <td class="sc_cw-table-structure-desktop-align">0</td>
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
                <span class="sc_cw-header-team-name-mobile">NZ</span>
              </div>
    
              <div class="sc_cw-header-mid-section-mobile">
                <div class="sc_cw-header-primary-comment-mobile">DAY STUMP
                </div>
                <div class="sc_cw-header-rates-mobile">
                  <span class="sc_cw-header-rates-mobile">CRR: <span>3.37</span></span>
                  
                </div>
                <div class="sc_cs-header-target-mobile">
                  WI trail by 194 runs
                </div>
                <div class="sc_cs-header-target-mobile">
                </div>
              </div>
              <div class="sc_cw-header-container-mobile sc_cw-header-grid-row-mobile" style={{justifyContent: 'end'}}>
                <span class="sc_cw-header-team-name-mobile">WI</span>
              </div>
    
              <div class="sc_cw-header-score-container-left-mobile">
                <div class="sc_cw-header-score-bg-mobile">
                  <span class="sc_cw-header-score-big-mobile">575/8</span>
                  <span class="sc_cw-header-score-small-mobile">(155.0)</span>
                </div>
              </div>
    
    
              
              <div class="sc_cw-header-score-container-right-mobile">
                <div class="sc_cw-header-score-bg-mobile">
                  <span class="sc_cw-header-score-big-mobile">381/6</span>
                  <span class="sc_cw-header-score-small-mobile">(113.0)</span>
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
        <div class="sc_cw-info-section-mobile">
            <div class="sc_cw-info-container-mobile">
      
              <div class="sc_cw-info-part-mobile">
                <span>Partnership:</span>
                <span>29(95)</span>
              </div>
      
              <div class="sc_cw-info-part-mobile">
                <span>Last Wicket:</span>
                <span>Roston Chase 2 (7) </span>
              </div>
      
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
                <div class="sc_cw-current-over-mobile" style={{marginRight:'20px'}}>
                  <div class="sc_cw-over-part-name-mobile">Over 113</div>
                  <div class="sc_cw-over-part-balls-container-mobile">
                    <span class="sc_cw-over-part-balls">0</span><span class="sc_cw-over-part-balls">2</span><span class="sc_cw-over-part-balls">0</span><span class="sc_cw-over-part-balls">0</span><span class="sc_cw-over-part-balls">4</span><span class="sc_cw-over-part-balls">0</span>
                  </div>
                </div>
              </div>
    
              <div class="sc_cw-over-part-mobile">
                <div class="sc_cw-current-over-mobile">
                  <div class="sc_cw-over-part-name-mobile">Over 112</div>
                  <div class="sc_cw-over-part-balls-container-mobile">
                    <span class="sc_cw-over-part-balls">0</span><span class="sc_cw-over-part-balls">0</span><span class="sc_cw-over-part-balls">0</span><span class="sc_cw-over-part-balls">0</span><span class="sc_cw-over-part-balls">0</span><span class="sc_cw-over-part-balls">0</span>
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
              <tr style={{borderBottom:'0.5px solid #fff'}}>
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
                <td className='d-flex' >
                <MdSportsCricket />
  
                  <span>{matchScoreDetails?.score?.player1_array?.name
                    ? matchScoreDetails?.score?.player1_array?.name
                    : "Player-2"}</span>
  
                  {/* <svg xmlns="http://www.w3.org/2000/svg" id="Layer_2" data-name="Layer 2" height="12px" width="12px" viewBox="0 0 10.07 10.07">
                     <defs>
                     <style>
                        .cls-1b {
                           fill: #c54031;
                        }
                  
                        .cls-2b {
                           fill: none;
                        }
                  
                        .cls-3b {
                           fill: #00a9e4;
                        }
                  
                        .cls-4b {
                           fill: #00eacf;
                        }
                     </style>
                     </defs>
                     <g id="Layer_1-2" data-name="Layer 1">
                     <g>
                        <g>
                           <path class="cls-1b" d="M7.38,4.2l-5.3,5.3c-.3.3-.78.3-1.08,0l-.44-.44c-.3-.3-.3-.78,0-1.08L5.86,2.68l1.52,1.52Z"></path>
                           <g>
                           <path d="M7.72,4.06l-1.71-1.71c-.08-.08-.21-.08-.29,0L.32,7.74c-.43.43-.43,1.13,0,1.56l.44.44c.43.43,1.13.43,1.56,0l5.39-5.39c.08-.08.08-.21,0-.29ZM2.08,9.5c-.3.3-.78.3-1.08,0l-.44-.44c-.3-.3-.3-.78,0-1.08L5.86,2.68l1.52,1.52-5.3,5.3Z"></path>
                           <path d="M9.23,0l-3.04,3.04-1.5,2.29s.02.07.05.05l2.29-1.5,3.04-3.04-.83-.83Z"></path>
                           </g>
                           <g>
                           <rect class="cls-4b" x="9" y=".57" width=".64" height=".42" transform="translate(3.28 -6.36) rotate(45)"></rect>
                           <rect class="cls-3b" x="8.46" y="1.1" width=".64" height=".42" transform="translate(3.5 -5.82) rotate(45)"></rect>
                           <rect class="cls-4b" x="7.92" y="1.64" width=".64" height=".42" transform="translate(3.72 -5.29) rotate(45)"></rect>
                           <rect class="cls-3b" x="7.39" y="2.17" width=".64" height=".42" transform="translate(3.94 -4.75) rotate(45)"></rect>
                           <rect class="cls-4b" x="6.85" y="2.71" width=".64" height=".42" transform="translate(4.17 -4.22) rotate(45)"></rect>
                           </g>
                           <polygon class="cls-3b" points="6.86 3.68 5.48 4.58 6.38 3.21 6.86 3.68"></polygon>
                        </g>
                        <rect class="cls-2b" y="0" width="10.07" height="10.07"></rect>
                     </g>
                     </g>
                  </svg> */}
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
                </td>
                <td className="sc_cw-table-structure-mobile-align">{matchScoreDetails?.score?.player1_array?.run}</td>
                <td className="sc_cw-table-structure-mobile-align">{matchScoreDetails?.score?.player1_array?.ball}</td>
                <td className="sc_cw-table-structure-mobile-align">{matchScoreDetails?.score?.player1_array?.fours}</td>
                <td className="sc_cw-table-structure-mobile-align">{matchScoreDetails?.score?.player1_array?.sixes}</td>
                <td className="sc_cw-table-structure-mobile-align">{matchScoreDetails?.score?.player1_array?.strike_rate}</td>
              </tr>
              <tr>
                <td  className='d-flex'>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" id="Layer_2" data-name="Layer 2" height="12px" width="12px" viewBox="0 0 12 10.18">
                     <defs>
                     <style>
                        .cls-11 {
                           fill: none;
                        }
                  
                        .cls-21 {
                           fill: #00eacf;
                        }
                     </style>
                     </defs>
                     <g id="Layer_1-2" data-name="Layer 1">
                     <g>
                        <g>
                           <path class="cls-21" d="M9.88.32h0c.38.38.38,1.01,0,1.39L1.76,9.83h-.01c-.34-.35-.62-.72-.84-1.11C-.2,6.77.08,4.24,1.75,2.57c1.42-1.42,3.46-1.83,5.24-1.24.63.21,1.33.11,1.87-.28l1.03-.73Z"></path>
                           <g>
                           <circle cx="7.14" cy="4.43" r=".23"></circle>
                           <path d="M10.05,1.89l-1.99,1.99c-.1.1-.25.1-.35,0s-.1-.25,0-.35l1.99-1.99c.24-.24.28-.6.12-.88l-.84.59c-.6.43-1.39.55-2.09.31-1.76-.58-3.67-.13-4.98,1.18C.38,4.29.05,6.7,1.12,8.6c.18.32.39.61.64.88l4.45-4.45c.1-.1.25-.1.35,0s.1.25,0,.35L1.76,10.18l-.19-.19c-.35-.35-.64-.73-.88-1.15C-.49,6.75-.13,4.1,1.57,2.4c.72-.72,1.62-1.21,2.6-1.44.96-.22,1.96-.17,2.89.14.56.18,1.17.09,1.65-.25l1.2-.85.15.15c.48.48.48,1.26,0,1.74Z"></path>
                           <path d="M3.6,5.25c.11-.11.28-.11.39,0s.11.28,0,.39l-1.28,1.28c-.11.11-.28.11-.39,0s-.11-.28,0-.39l1.28-1.28M3.25,4.9l-1.28,1.28c-.3.3-.3.79,0,1.09h0c.3.3.79.3,1.09,0l1.28-1.28c.3-.3.3-.79,0-1.09h0c-.3-.3-.79-.3-1.09,0h0Z"></path>
                           <path d="M11.91,9.74l-4.85.18c-.74.03-1.47-.15-2.11-.52l-1.7-.97c-.12-.07-.16-.22-.09-.34s.22-.16.34-.09l1.7.97c.56.32,1.2.48,1.85.46l4.42-.16c.15-1.87-.06-3.5-.65-4.95l-4.02,3.73c-.1.09-.26.09-.35-.01-.09-.1-.09-.25,0-.34,0,0,0,0,0,0l4.53-4.2.14.31c.76,1.66,1.02,3.54.81,5.73l-.02.22Z"></path>
                           <path d="M7.88,9.83s-.03.02-.04.03c-.11.07-.27.04-.34-.07l-2.22-3.44c-.07-.11-.04-.27.07-.34.11-.07.27-.04.34.07l2.22,3.44c.06.1.05.23-.03.31Z"></path>
                           <path d="M5.37,9.44c-.08.08-.19.1-.29.04-.12-.06-.17-.21-.1-.33l1.02-1.91c.06-.12.21-.17.33-.1.12.06.17.21.1.33l-1.02,1.91s-.03.04-.04.06Z"></path>
                           <path d="M11.48,7s-.04.04-.07.05l-4.19,1.9c-.12.06-.27,0-.33-.12-.06-.12,0-.27.12-.33l4.19-1.9c.12-.06.27,0,.33.12.04.1.02.21-.05.28Z"></path>
                           </g>
                        </g>
                        <rect class="cls-11" x="0" width="12" height="10.18"></rect>
                     </g>
                     </g>
                  </svg> */}
                  
                <MdSportsCricket />
                  <span>{matchScoreDetails?.score?.player2_array?.name
                    ? matchScoreDetails?.score?.player2_array?.name
                    : "Player-2"}</span>
                </td>
                {/* <td class="sc_cw-table-structure-mobile-align">109</td>
                <td class="sc_cw-table-structure-mobile-align">264</td>
                <td class="sc_cw-table-structure-mobile-align">14</td>
                <td class="sc_cw-table-structure-mobile-align">0</td>
                <td class="sc_cw-table-structure-mobile-align">41.29</td> */}


                {/* <td>
                  {matchScoreDetails?.score?.player1_array?.name
                    ? matchScoreDetails?.score?.player1_array?.name
                    : "-"}
                </td> */}
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
      <div class="sc_cw-table-mobile" style={{marginTop:'3px'}}>
        <div class="sc_cw-table-container-mobile">
          <table class="sc_cw-table-structure-mobile">
            <thead>
              <tr style={{borderBottom:'0.5 solid white'}}>
                <th>Bowler</th>
                <th class="sc_cw-table-structure-mobile-align">O</th>
                <th class="sc_cw-table-structure-mobile-align">R</th>
                <th class="sc_cw-table-structure-mobile-align">M</th>
                <th class="sc_cw-table-structure-mobile-align">W</th>
                <th class="sc_cw-table-structure-mobile-align sc_cs-table-structure-last-column">Eco</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="d-flex align-items-center">
                  <BiSolidCricketBall style={{color:'#c54031', width:'12px', height:'12px'}} className="redBall" />
                  <span>sssssssssssss</span>
                </td>
                <td class="sc_cw-table-structure-mobile-align">0.0</td>
                <td class="sc_cw-table-structure-mobile-align">0</td>
                <td class="sc_cw-table-structure-mobile-align">0</td>
                <td class="sc_cw-table-structure-mobile-align">0</td>
                <td class="sc_cw-table-structure-mobile-align sc_cs-table-structure-last-column">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>












      {/* data */}
      {/* <div className=" d-flex justify-content-center iframe2_Head w-100 heading_iframe2 ">
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
        </div> */}
      </>
      }
    </>
  );
}

export default SocketIframe17;
