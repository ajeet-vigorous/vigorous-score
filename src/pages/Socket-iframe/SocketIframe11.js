import React from "react";
import styles from "./SocketIframe11.module.css"; // Import CSS Module
import { useParams } from "react-router-dom";
import { useMatchDetails } from "../../middleware/useMatchDetails";

const SocketIframe11 = () => {
        const { marketId, eventId } = useParams();
        const { matchScoreDetails, errorMessage } = useMatchDetails(marketId, eventId);
  const team1 = {
    name: matchScoreDetails &&
                matchScoreDetails?.score &&
                matchScoreDetails?.score?.team1_name
                ? matchScoreDetails?.score?.team1_name
                : "Team A",
    score:  matchScoreDetails?.score?.team1_score
                ? matchScoreDetails?.score?.team1_score
                : "0-0",
    overs:  matchScoreDetails?.score?.team1_over
                ? matchScoreDetails?.score?.team1_over
                : "0.0",
    crr: matchScoreDetails?.score?.run_rate ? matchScoreDetails?.score?.run_rate : "0.00",
  };

  const team2 = {
        name: matchScoreDetails &&
                matchScoreDetails?.score &&
                matchScoreDetails?.score?.team2_name
                ? matchScoreDetails?.score?.team2_name
                : "Team B",
    score:  matchScoreDetails?.score?.team2_score
                ? matchScoreDetails?.score?.team2_score
                : "0-0",
    overs:  matchScoreDetails?.score?.team2_over
                ? matchScoreDetails?.score?.team2_over
                : "0.0",
  };

  const ballByBall =  matchScoreDetails?.score?.balls_array ? matchScoreDetails?.score?.balls_array : [];
//  const team1 = {
//     name: "MR",
//     score: "112-4",
//     overs: "13.5",
//     crr: "8.10",
//   };

//   const team2 = {
//     name: "NK",
//     score: "0-0",
//     overs: "0.0",
//   };

//   const ballByBall = ["0", "4", "4", "0", "6", "1"];
  return (
    <div className={styles.scorecard}>
      <div className={'row'}>
        <div className={'col-12 col-md-6'}>
          <TeamScore
            team={team1.name}
            score={team1.score}
            overs={team1.overs}
            crr={team1.crr}
          />
          <TeamScore
            team={team2.name}
            score={team2.score}
            overs={team2.overs}
          />
        </div>

        <div className={'col-12 col-md-6'}>
          <BallByBall balls={ballByBall} />
        </div>
      </div>
    </div>
  );
};

const TeamScore = ({ team, score, overs, crr }) => (
  <div className={styles.teamScore}>
    <span className={styles.teamName}>{team}</span>
    <span className={styles.score}>
      {score} {overs && `(${overs})`}
    </span>
    <span className={styles.crr}> {crr && <>CRR : {crr}</>}</span>
  </div>
);

const BallByBall = ({ balls }) => (
  <div className={styles.ballByBall + ' ' + `text-xl-end  mt-2`}>
    {balls.map((run, index) => {
      let className = styles.ballRun;
      if (run === "4") className = `${styles.ballRun} ${styles.four}`;
      if (run === "6") className = `${styles.ballRun} ${styles.six}`;
      if (run === "w" || run === "W") className = `${styles.ballRun} ${styles.wicket}`;

      return (
        <span key={index} className={className}>
          {run}
        </span>
      );
    })}
  </div>
);

export default SocketIframe11;
