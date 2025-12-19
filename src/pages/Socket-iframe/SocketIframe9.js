import { useParams } from "react-router-dom";
import styles from "./SocketIframe9.module.css";

import useMatchScoreVoice from "../../middleware/useMatchScoreVoice";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { useMatchDetails } from "../../middleware/useMatchDetails";

const SocketIframe9 = () => {
  const { marketId, eventId } = useParams();
  const { matchScoreDetails , errorMessage } = useMatchDetails(marketId, eventId);
  const { isMuted, handleVolumeToggle, isSmallScreen } = useMatchScoreVoice( matchScoreDetails?.score?.cb );
  const dummyData = {
    spnnation1:
      matchScoreDetails &&
      matchScoreDetails?.score &&
      matchScoreDetails?.score?.team1_name
        ? matchScoreDetails?.score?.team1_name
        : "Team A",
    spnnation2:
      matchScoreDetails &&
      matchScoreDetails?.score &&
      matchScoreDetails?.score?.team2_name
        ? matchScoreDetails?.score?.team2_name
        : "Team B",
    score1: `${
      matchScoreDetails?.score?.team1_score
        ? matchScoreDetails?.score?.team1_score
        : "0"
    }  (${
      matchScoreDetails?.score?.team1_over
        ? matchScoreDetails?.score?.team1_over
        : "0"
    })`,
    score2: `${
      matchScoreDetails?.score?.team2_score
        ? matchScoreDetails?.score?.team2_score
        : "0"
    }  (${
      matchScoreDetails?.score?.team2_over
        ? matchScoreDetails?.score?.team2_over
        : "0"
    })`,
    crr: matchScoreDetails?.score?.run_rate
      ? matchScoreDetails?.score?.run_rate
      : "",
    balls: matchScoreDetails?.score?.balls_array
      ? matchScoreDetails?.score?.balls_array
      : [],
    spnmessage: matchScoreDetails?.score?.cb,
    msg: matchScoreDetails?.score?.toss,
  };

  return (
 errorMessage ? <div>{errorMessage}</div>  :    <div className={styles?.scorecard}>
      <div className={`${styles?.row} ${styles?.noGutters} w-100`}>
        <div className="col-12">
          <div className={styles?.teamResult}>
            <ul>
              <li className={styles?.team45}>
                <div className={styles?.inplyTeam}>
                  {dummyData?.spnnation1}
                  {dummyData?.score1 ? (
                    <span className={styles?.sSpan}>{dummyData?.score1}</span>
                  ) : (
                    <span className={styles?.lSpan}>{dummyData?.score1}</span>
                  )}
                </div>
              </li>
              <li className={styles?.team55}>
                <div className={styles?.inplyTeam}>
                  {dummyData?.spnnation2}
                  {dummyData?.score2 ? (
                    <span className={styles?.sSpan}>{dummyData?.score2}</span>
                  ) : (
                    <span className={styles?.lSpan}>{dummyData?.score2}</span>
                  )}
                </div>
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
              </li>
            </ul>
          </div>

          <div className={styles?.runRate}>
            <div className={styles?.runLeft}>
              <span className={styles?.teamNameS}>
                <span className="d-inline-block">CRR {dummyData?.crr}</span>
              </span>
            </div>
            <div className={styles?.runRight}>
              <div className={styles?.row}>
                <div className="col-md-12">
                  <div className={styles?.ballByBall}>
                    {dummyData?.balls?.map((ball, index) => (
                      <span
                        key={index}
                        className={`${styles?.ballRuns} ${
                          // ball === '6' ? styles?.six :
                          // ball === '4' ? styles?.four :
                          // ball === 'Wd' ? styles?.wide :
                          // ball === '0' ? styles?.dot :
                          styles?.wicket
                        }`}
                      >
                        {ball}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles?.row}>
        <div className={styles?.col}>
          <div>
            {dummyData?.spnmessage && (
              <span className={styles?.matchResult}>
                {dummyData?.spnmessage}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles?.row}>
        <div className={styles?.col}>
          <div className={`${styles?.badgeDanger} ${styles?.alertMessage}`}>
            {dummyData?.msg && (
              <p className={styles?.marquee}>
                <span>{dummyData?.msg}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocketIframe9;
