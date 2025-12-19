import { Link, useParams } from "react-router-dom";
import { useMatchDetails } from "../../middleware/useMatchDetails";
import { useState, useEffect } from "react";
import { IoVolumeMuteOutline, IoVolumeHighOutline } from "react-icons/io5";
import "./SocketIframe6.css";
import useMatchScoreVoice from "../../middleware/useMatchScoreVoice";

function SocketIframe7() {
  const { marketId, eventId } = useParams();
  const { matchScoreDetails, errorMessage } = useMatchDetails(
    marketId,
    eventId
  );
  const [matchscoreTab, setMatchScoreTab] = useState(false);

  const { isMuted, handleVolumeToggle, isSmallScreen } = useMatchScoreVoice(
    matchScoreDetails?.score?.cb
  );

  const totalBalls = matchScoreDetails?.score?.balls_array?.length || 0;
  const displayBalls = totalBalls > 6 ? totalBalls : 6;

  const [modal, setModal] = useState(false);
  const handleClose = () => setModal(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };



  const fontSize = isSmallScreen ? "0.8rem" : "1rem";
  const sum = matchScoreDetails?.score?.balls_array.reduce((acc, val) => {
    const currentNum = Number(val);
    return !isNaN(currentNum) ? acc + currentNum : acc;
  }, 0);
  function calculateRunRates(matchData) {
    const team1 = {
      name: matchData.team1_name,
      runs: parseInt(matchData.team1_score.split('-')[0]),
      overs: parseFloat(matchData.team1_over),
    };

    const team2 = {
      name: matchData.team2_name,
      runs: parseInt(matchData.team2_score.split('-')[0]),
      overs: parseFloat(matchData.team2_over),
    };

    // Convert overs (e.g., 18.5 -> 18.833) for accurate calculations
    const convertOversToDecimal = (overs) => {
      const [whole, fraction = 0] = overs.toString().split('.').map(Number);
      return whole + fraction / 6;
    };

    // Calculate CRR (runs per over)
    const calculateCRR = (runs, overs) => {
      if (overs <= 0) return 0; // Avoid division by zero
      const decimalOvers = convertOversToDecimal(overs);
      const calculationOfCRR = runs / decimalOvers

      if (calculationOfCRR == NaN || calculationOfCRR == undefined) {
        return ''
      } else {
        (calculationOfCRR).toFixed(2);
      }

    };

    // Calculate CRR for both teams
    team1.crr = calculateCRR(team1.runs, team1.overs);
    team2.crr = calculateCRR(team2.runs, team2.overs);

    return {
      team1: {
        name: team1.name,
        runs: team1.runs,
        overs: team1.overs,
        crr: team1.crr ? team1.crr : "",
      },
      team2: {
        name: team2.name,
        runs: team2.runs,
        overs: team2.overs,
        crr: team2.crr ? team2.crr : "",
      },
    };
  }



  const runRates = calculateRunRates(matchScoreDetails?.score);
      
  return (
    <>
      {errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <div
          style={{
            backgroundColor: "#0c0b05",
            // backgroundColor: "#254465",
            color: "white",
            padding: "1px 10px",
            height: "80px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: "1 1 auto",
              textAlign: "left",
            }}
          >
            <div style={{ fontSize }}>
              <span style={{ marginLeft: isSmallScreen ? "8px" : "12px" }}>
                {" "}
                {matchScoreDetails?.score?.team1_name}{" "}
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {`${matchScoreDetails?.score?.team1_score ? matchScoreDetails?.score?.team1_score : '0'} (${matchScoreDetails?.score?.team1_over? matchScoreDetails?.score?.team1_over :"0"}) `}
                </span>
              </span>
              &nbsp;
            {runRates?.team1?.crr ?   <span
                style={{ fontSize, marginLeft: isSmallScreen ? "8px" : "25px" }}
              >
                CRR : {runRates?.team1?.crr ? runRates?.team1?.crr : "-"}
              </span> : ""}
              <span style={{ marginLeft: isSmallScreen ? "8px" : "12px" }}>
                {" "}
                {matchScoreDetails?.score?.team2_name}
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {`${matchScoreDetails?.score?.team2_score ? matchScoreDetails?.score?.team2_score :"0"} (${matchScoreDetails?.score?.team2_over ?matchScoreDetails?.score?.team2_over : "0"}) `}
                </span>
              </span>{" "}
              &nbsp;
            { runRates?.team2?.crr ?  <span
                style={{ fontSize, marginLeft: isSmallScreen ? "8px" : "25px" }}
              >
                CRR : {runRates?.team2?.crr ? runRates?.team2?.crr : "-"}
              </span> : ""}
              &nbsp;
              {matchScoreDetails?.score?.targetRun ?  (
                <span
                  style={{
                    fontSize,
                    marginLeft: isSmallScreen ? "8px" : "25px",
                  }}
                >
                  Target : {matchScoreDetails?.score?.targetRun}
                </span>
              ) : null}
            </div>

            <div
              style={{ fontSize: "14px", display: "flex", gap: "3px" }}
              className="w-100"
            >
              <div
                style={{ gap: "5px", width: isSmallScreen ? "65%" : "50%" }}
                className="d-flex "
              >
                <span>This Over :</span>
                {Array.from({ length: displayBalls }).map((_, i) => (
                  <div key={i}>
                    <span>
                      {i < totalBalls
                        ? matchScoreDetails?.score?.balls_array[i]
                        : ""}
                    </span>
                  </div>
                ))}{" "}
                &nbsp;
               {matchScoreDetails?.score?.balls_array?.length >= 6 &&  <span>This Over : {sum ? sum : "-"}</span>}
              </div>
              <div
                className="d-flex"
                style={{
                  width: isSmallScreen ? "35%" : "50%",
                  justifyContent: "end",
                }}
              >
                <div
                  variant="link"
                  style={{
                    color: "#00B181",
                    fontWeight: "bold",
                    textDecoration: "none",
                    padding: "0",
                    marginRight: "10px",
                    fontSize: isSmallScreen ? "14px" : "20px",
                  }}
                >
                  {matchScoreDetails?.score?.cb}
                </div>

                {isMuted ? (
                  <IoVolumeMuteOutline
                    style={{
                      fontSize: isSmallScreen ? "22px" : "27px",
                      cursor: "pointer",
                    }}
                    onClick={handleVolumeToggle}
                  />
                ) : (
                  <IoVolumeHighOutline
                    style={{
                      fontSize: isSmallScreen ? "22px" : "27px",
                      cursor: "pointer",
                    }}
                    onClick={handleVolumeToggle}
                  />
                )}
              </div>
            </div>
            {matchScoreDetails?.score?.toss ?

              <span style={{ fontSize: "14px" }} className="w-100">
                {`${matchScoreDetails?.score?.toss} `}
              </span> : null
            }
            &nbsp;
            {matchScoreDetails?.score?.run_rate ? <span
              style={{ fontSize, marginLeft: isSmallScreen ? "8px" : "25px" }}
            >
              RRR : {matchScoreDetails?.score?.run_rate}
            </span> : null}
          </div>
        </div>
      )}
    </>
  );
}

export default SocketIframe7;


