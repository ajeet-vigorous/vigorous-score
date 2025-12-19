import { useParams } from "react-router-dom";
import useMatchScoreVoice from "../../middleware/useMatchScoreVoice";
import { useMatchDetails } from "../../middleware/useMatchDetails";
import styles from "./SocketIframe10.module.css";
const SocketIframe10 = () => {
    const { marketId, eventId } = useParams();
    const { matchScoreDetails, errorMessage } = useMatchDetails(marketId, eventId);
    const { isMuted, handleVolumeToggle, isSmallScreen } = useMatchScoreVoice(matchScoreDetails?.score?.cb);
    const getBallClass = (ball) => {
        if (ball == "W" || ball == "ww" || ball == "w") return styles.ballWicket;
        if (ball == 6) return styles.ballSix;
        if (ball == 4) return styles.ballFour;
        return "";
    };
// const data = {
//     runner_first: {
//         flag: "https://example.com/flags/teamA.png",
//         name: "Super Strikers",
//         score: "145-3",
//         over: "17.2"
//     },
//     runner_second: {
//         flag: "https://example.com/flags/teamB.png",
//         name: "Power Hitters",
//         score: "120-5",
//         over: "16.4"
//     },
//     current_over: ["1", "4", "W", "0", "6", "2"],
//     ball_status: "4 runs",
//     comment: "Super Strikers won the toss and elected to bat first. sdc c c d ds sd sd  ",
//     player_first: {
//         name: "John Smith",
//         run: "58",
//         ball: "32",
//         four: "6",
//         six: "2",
//         sr: "181.25"
//     },
//     player_second: {
//         name: "Alex Brown",
//         run: "35",
//         ball: "24",
//         four: "3",
//         six: "1",
//         sr: "145.83"
//     }
// };

    
    

    const data = {
        runner_first: {
            flag: matchScoreDetails?.score?.team1_img ? matchScoreDetails?.score?.team1_img : '',
            name: matchScoreDetails &&
                matchScoreDetails?.score &&
                matchScoreDetails?.score?.team1_name
                ? matchScoreDetails?.score?.team1_name
                : "Team A",
            score: matchScoreDetails?.score?.team1_score
                ? matchScoreDetails?.score?.team1_score
                : "0-0",
            over: matchScoreDetails?.score?.team1_over
                ? matchScoreDetails?.score?.team1_over
                : "0"
        },
        runner_second: {
            flag: matchScoreDetails?.score?.team2_img ? matchScoreDetails?.score?.team2_img : '',
            name: matchScoreDetails &&
                matchScoreDetails?.score &&
                matchScoreDetails?.score?.team2_name
                ? matchScoreDetails?.score?.team2_name
                : "Team B",
            score: matchScoreDetails?.score?.team2_score
                ? matchScoreDetails?.score?.team2_score
                : "0-0",
            over: matchScoreDetails?.score?.team2_over
                ? matchScoreDetails?.score?.team2_over
                : "0"
        },
        current_over: matchScoreDetails?.score?.balls_array ? matchScoreDetails?.score?.balls_array : [],
        ball_status: matchScoreDetails?.score?.cb ? matchScoreDetails?.score?.cb : '',
        comment: matchScoreDetails?.score?.toss
            ? matchScoreDetails?.score?.toss
            : "WELCOME",
        player_first: {
            name: matchScoreDetails?.score?.player1_array?.name
                ? matchScoreDetails?.score?.player1_array?.name
                : "-",
            run: matchScoreDetails?.score?.player1_array?.run
                ? matchScoreDetails?.score?.player1_array?.run
                : "-",
            ball: matchScoreDetails?.score?.player1_array?.ball
                ? matchScoreDetails?.score?.player1_array?.ball
                : "-",
            four: matchScoreDetails?.score?.player1_array?.fours
                ? matchScoreDetails?.score?.player1_array?.fours
                : "-",
            six: matchScoreDetails?.score?.player1_array?.sixes
                ? matchScoreDetails?.score?.player1_array?.sixes
                : "-",
            sr: matchScoreDetails?.score?.player1_array?.strike_rate
                ? matchScoreDetails?.score?.player1_array?.strike_rate
                : "-"
        },
        player_second: {
            name: matchScoreDetails?.score?.player2_array?.name
                ? matchScoreDetails?.score?.player2_array?.name
                : "-",
            run: matchScoreDetails?.score?.player2_array?.run
                ? matchScoreDetails?.score?.player2_array?.run
                : "-",
            ball: matchScoreDetails?.score?.player2_array?.ball
                ? matchScoreDetails?.score?.player2_array?.ball
                : "-",
            four: matchScoreDetails?.score?.player2_array?.fours
                ? matchScoreDetails?.score?.player2_array?.fours
                : "-",
            six: matchScoreDetails?.score?.player2_array?.sixes
                ? matchScoreDetails?.score?.player2_array?.sixes
                : "-",
            sr: matchScoreDetails?.score?.player2_array?.strike_rate
                ? matchScoreDetails?.score?.player2_array?.strike_rate
                : "-"
        }
    };
    
    return (
        errorMessage ? <div>{errorMessage}</div> :
            <div>
                <div className={styles.container}>
                    <div className={styles.scorecard}>
                        {data?.current_over && data?.current_over?.length > 0 && (
                           <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}} className={styles.overContainer}>
                             <div style={{width:'50%'}} className={styles.ballsContainer}>
                                {data?.current_over?.map((ball, index) => (
                                    <div key={index} className={`${styles.ball} ${getBallClass(ball)}`}>
                                        {ball !== undefined ? ball : "-"}
                                    </div>
                                ))}
                            </div>
                            <div style={{width:'50%'}} className={styles.liveComment}>
                                {data?.ball_status}
                            </div>
                           </div>
                        )}
                        <div className={styles.commentary}>
                            {data?.comment}
                        </div>
                        <div className={styles.mainBox}>
                            <div >
                                <div className={styles.teamsContainer}>
                                    <div className={styles.team}>
                                        {/* {data?.runner_first?.flag && (
                                            <img src={data?.runner_first?.flag} className={styles.teamFlag} alt={data?.runner_first?.name} />
                                        )}   */}
                                        <span className={styles.teamName}>{data?.runner_first?.name}</span>
                                        <span className={styles.teamScore}>{data?.runner_first?.score}</span>
                                        <span className={styles.teamOver}>{data?.runner_first?.over}</span>
                                    </div>
                                </div>

                                <div className={styles.teamsContainer}>
                                    <div className={styles.team}>
                                        {/* {data?.runner_second?.flag && (
                                            <img src={data?.runner_second?.flag} className={styles.teamFlag} alt={data?.runner_second?.name} />
                                        )} */}
                                        <span className={styles.teamName}>{data?.runner_second?.name}</span>
                                        <span className={styles.teamScore}>{data?.runner_second?.score}</span>
                                        <span className={styles.teamOver}>{data?.runner_second?.over}</span>
                                    </div>
                                </div>
                            </div>

                            
                        </div>
                        {data?.player_first && (
                            <table className={`${styles.batsmenTable} curved`}>
                                <thead>
                                    <tr>
                                        <th>Batsman</th>
                                        <th>R</th>
                                        <th>B</th>
                                        <th>4s</th>
                                        <th>6s</th>
                                        <th>SR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className={styles.playerName}>{data?.player_first?.name}</td>
                                        <td className={styles.highlight}>{data?.player_first?.run}</td>
                                        <td>{data?.player_first?.ball}</td>
                                        <td>{data?.player_first?.four}</td>
                                        <td>{data?.player_first?.six}</td>
                                        <td><span className={styles.highlight}>{data?.player_first?.sr}</span></td>
                                    </tr>
                                    {data?.player_second && (
                                        <tr>
                                            <td className={styles.playerName}>{data?.player_second?.name}</td>
                                            <td className={styles.highlight}>{data?.player_second?.run}</td>
                                            <td>{data?.player_second?.ball}</td>
                                            <td>{data?.player_second?.four}</td>
                                            <td>{data?.player_second?.six}</td>
                                            <td><span className={styles.highlight}>{data?.player_second?.sr}</span></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
    );
};

export default SocketIframe10;
