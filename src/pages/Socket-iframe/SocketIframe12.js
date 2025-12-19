import styles from "./SocketIframe12.module.css";
import { useParams } from "react-router-dom";
import { useMatchDetails } from "../../middleware/useMatchDetails";

const SocketIframe12 = () => {
  const { marketId, eventId } = useParams();
  const { matchScoreDetails } = useMatchDetails(marketId, eventId);


  const ballByBall = matchScoreDetails?.score?.balls_array || [];
  const getBackgroundColorClass = (ele) => {
    if (ele === "W") {
      return "red";
    } else if (ele === "4") {
      return "green";
    } else if (ele === "6") {
      return "teal";
    } else if (ele === "WB") {
      return "#448568";
    }

    return "#448568";
  };
  const bowler =
  {
    name: `${matchScoreDetails?.score?.bowler}`,
    lwkt: `${matchScoreDetails?.score?.last_wicket?.player} ${(matchScoreDetails?.score?.last_wicket?.player && matchScoreDetails?.score?.last_wicket?.player !== "-") ? "-" : ''} ${matchScoreDetails?.score?.last_wicket?.run} (${matchScoreDetails?.score?.last_wicket?.ball})`,
    pship: matchScoreDetails?.score?.partnership,
  }
  const batsmen = [
    { name: matchScoreDetails?.score?.player1_array?.name, run: matchScoreDetails?.score?.player1_array?.run, ball: matchScoreDetails?.score?.player1_array?.ball, fours: matchScoreDetails?.score?.player1_array?.fours, sixes: matchScoreDetails?.score?.player1_array?.sixes, sr: matchScoreDetails?.score?.player1_array?.strike_rate, is_striker: false },
    { name: matchScoreDetails?.score?.player2_array?.name, run: matchScoreDetails?.score?.player2_array?.run, ball: matchScoreDetails?.score?.player2_array?.ball, fours: matchScoreDetails?.score?.player2_array?.fours, sixes: matchScoreDetails?.score?.player2_array?.sixes, sr: matchScoreDetails?.score?.player2_array?.strike_rate, is_striker: false },
  ];

  return (
    <div className={` text-white ${styles.scorecard}`}>
      <div className="d-flex justify-content-start gap-2 mb-2">
        {ballByBall.map((ball, i) => (
          <span key={i} style={{ backgroundColor: getBackgroundColorClass(ball) }} className={`${styles.ball} text-center`}>{ball}</span>
        ))}
      </div>
      <div className={` row ${styles.mainrow} `}>
        <div className="col-4" style={{ textAlign: "left" }}>
          <span className=" gap-1 d-flex justify-content-start align-items-md-center align-items-end  flex-md-row">
            {/* gap-1 d-flex justify-content-end align-items-md-center align-items-end  flex-md-row */}
            <span>
              {matchScoreDetails?.score?.team1_img && (
                <img
                  alt="team1"
                  style={{ borderRadius: "50px", width: "25px", height: '25px', background: "transparent" }}
                  src={matchScoreDetails?.score?.team1_img}
                />
              )}
            </span>
            <span className='d-flex justify-content-center align-items-center' style={{ fontSize: '15px', backgroundColor: "" }}>
              {matchScoreDetails?.score?.team1_name
                ? matchScoreDetails?.score?.team1_name
                : "-"}
            </span>
          </span>
          <span style={{ fontSize: '13px', fontWeight: 'bold' }}>
            ({matchScoreDetails?.score?.team1_over
              ? matchScoreDetails?.score?.team1_over
              : "0"}){" "}
          </span>
          <span className="" style={{ fontSize: '13px', fontWeight: 'bold' }}>
            {matchScoreDetails?.score?.team1_score
              ? matchScoreDetails?.score?.team1_score
              : "0"}{" "}
          </span>
        </div>
        <div className="col-4" style={{ paddingLeft: "0px", position: "relative" }}>
          <div style={{ fontSize: "11px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <span>
              <div style={{ fontSize: "15px", color: "white", fontWeight: "bold", fontdecoration: "capitalize" }}>
                {matchScoreDetails?.score?.cb
                  ? matchScoreDetails?.score?.cb
                  : "WELCOME"}
              </div>
            </span>
            <div style={{ display: "flex", fontSize: "10px" }}>
              <span>
                CRR:
              </span>
              <span>
                {matchScoreDetails?.score?.run_rate &&
                  matchScoreDetails?.score?.run_rate}
              </span>
            </div>
            <span style={{
              position: "absolute",
              top: "25%",
              right: "8px"
            }} >
            </span>
          </div>
        </div>

        <div className="col-4" style={{ textAlign: "right" }}>
          <span className=" gap-1 d-flex justify-content-end align-items-md-center align-items-end  flex-md-row">
            <span style={{ fontSize: '15px', backgroundColor: "" }} className='d-flex justify-content-center align-items-center'>
              {matchScoreDetails?.score?.team2_name
                ? matchScoreDetails?.score?.team2_name
                : "-"}
            </span>
            <span>
              {matchScoreDetails?.score?.team2_img && (
                <img
                  alt="team2"
                  style={{ borderRadius: "50px", width: "25px", height: '25px' }}
                  src={matchScoreDetails?.score?.team2_img}
                />
              )}
            </span>
          </span>
          <span className="" style={{ fontSize: '13px', fontWeight: 'bold' }}>
            {matchScoreDetails?.score?.team2_score
              ? matchScoreDetails?.score?.team2_score
              : "0"}{" "}
          </span>
          <span className="" style={{ fontSize: '13px', fontWeight: 'bold' }}>
            ({matchScoreDetails?.score?.team2_over
              ? matchScoreDetails?.score?.team2_over
              : "0"}){" "}
          </span>
        </div>
      </div>
      <div>
        <div className="text-center" style={{ fontSize: "12px", padding: "1px", maxWidth: "95vw", width: "95vw", textWrap: "nowrap", overflow: "auto", margin: "auto" }}>
          {matchScoreDetails?.score?.toss ? matchScoreDetails?.score?.toss : "WELCOME"}
        </div>
      </div>
      <div className="" style={{ paddingBottom: "1px", paddingTop: "0px" }}>
        <table className="text-white mb-0" style={{ border: "0.1px solid white" }}>
          <thead>
            <tr style={{ backgroundColor: '#448568', color: 'white', borderTop: "0.1px solid white" }}>
              <th className={`${styles.tabletext} `} style={{}}>Batter</th>
              <th className={`${styles.tabletext}`} style={{}}>Run</th>
              <th className={`${styles.tabletext}`} style={{}}>Ball</th>
              <th className={`${styles.tabletext}`} style={{}}>4s</th>
              <th className={`${styles.tabletext}`} style={{}}>6s</th>
              <th className={`${styles.tabletext}`} style={{}}>SR</th>
            </tr>
          </thead>
          <tbody>
            {batsmen?.map((batsman, index) => (
              <tr key={index}>
                <td className={`${styles.tabletextData}`}>{batsman.name || "-"}{batsman.is_striker ? '*' : ''}</td>
                <td className={`${styles.tabletextData}`}>{batsman.run || "0"}</td>
                <td className={`${styles.tabletextData}`}>{batsman.ball || "0"}</td>
                <td className={`${styles.tabletextData}`}>{batsman.fours || "0"}</td>
                <td className={`${styles.tabletextData}`}>{batsman.sixes || "0"}</td>
                <td className={`${styles.tabletextData}`}>{batsman.sr || "0"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="text-white mb-0" style={{ border: "0.1px solid white", marginTop: "10px" }}>
          <thead className={`${styles.tablehead}`}>
            <tr style={{ backgroundColor: '#448568', color: 'white', borderTop: "0.1px solid white" }}>
              <th className={`${styles.tabletext} ${styles.col1}`}>L'Wkt</th>
              <th className={`${styles.tabletext} ${styles.col2}`}>P'ship</th>
              <th className={`${styles.tabletext} ${styles.col3}`}>Bowler</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.tabletextData} >{bowler.lwkt || "0"}</td>
              <td className={styles.tabletextData} >{bowler.pship || "0"}</td>
              <td className={styles.tabletextData} >{bowler.name || "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SocketIframe12;
