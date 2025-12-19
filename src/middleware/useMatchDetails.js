// useMatchDetails.js
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { getSocketData } from "./vendor";
import { CalcNeed } from "./NeedCalculation";
import { CalcRrr } from "./RequiredRunRate";
import CryptoJS from "crypto-js"
import { useParams } from "react-router-dom";


const useMatchDetails = (marketId, eventId) => {
  const escapedHtmlCode = `
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>No Data Found</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f8f9fa;
        }
        .no-data-container {
            text-align: center;
        }
        .no-data-message {
            font-size: 24px;
            color: #6c757d;
        }
        .no-data-icon {
            font-size: 50px;
            color: #6c757d;
        }
    </style>
</head>
<body>
    <div class="no-data-container">
        <div class="no-data-icon">📭</div>
        <div class="no-data-message">No Data Found</div>
    </div>
</body>
</html>


  `;
  const socket = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { crex } = useParams()
  const iscrex = crex === "crex" ? true : false;
  const [matchScoreDetails, setMatchScoreDetails] = useState({
    score: {
      last_6_balls: "",
      balls_array: [],
      last_boll_result: "",
      p1_dtl: "- (0)",
      player1_array: {
        name: "Player-1",
        strike_rate: "-",
        sixes: "-",
        fours: "-",
        ball: "-",
        run: "-",
        out_by: "-",
      },
      player2_array: {
        name: "Player-2",
        strike_rate: "-",
        sixes: "-",
        fours: "-",
        ball: "-",
        run: "-",
        out_by: "-",
      },
      p2_dtl: "0(0)",
      b_dtl: "-",
      t1_dtl: "-",
      t2_dtl: "-",
      img_path: "",
      score_msg: "",
      converted_cb: "",
      cb: "",
      run_rate: "0.00",
      bowler: "-",
      Status: "Welcome",
      team1_name: "Team-1",
      team2_name: "Team-2",
      team1_score: "0",
      team2_score: "0",
      team2_over: "0",
      toss: "",
      partnership: `0(${0})`,
      team1_img: "",
      team2_img: "",
      team1_over: "0",
      session: escapedHtmlCode,
      last_wicket: {
        player: "-",
        run: "-",
        ball: "-",
      },
    },
  });
  function convertOverToruns(runs) {
    const parts = runs.split('/');
    return parts[0]
  }
  const intervalIdRef = useRef(null);
  let socketUrl = iscrex ? `${process.env.REACT_APP_CREX_SOCKET_URL}` : `${process.env.REACT_APP_CRICKEXPO_URL}/`;

  useEffect(() => {
    const referrer = document.referrer
    const url = referrer ? new URL(referrer) : null
    const domain = url ? url.hostname : null;
    const checkDomainAndProceed = async () => {
      try {
        if (process.env.REACT_APP_DOMAIN_CHECK === "true") {
          const res = await axios.get(`https://centerpanelapi.${process.env.REACT_APP_CRICKEXPO_URL}/v1/apiCalls/checkDomain?apiType=scoreStream&domain=${domain}`);
          const { error, message } = res?.data;
          if (error) {
            setErrorMessage(message || 'Unknown error occurred');
            return;
          } else {
            setErrorMessage(false)
          }
        }
        connectSocket(socketUrl, eventId)

        !iscrex && getMarketEventUrl(`${process.env.REACT_APP_CRICKEXPO_URL}/v2/api/getScoreByEventId?eventId=${eventId}`);
        const handleVisibilityChange = () => {
          !iscrex && getMarketEventUrl(`${process.env.REACT_APP_CRICKEXPO_URL}/v2/api/getScoreByEventId?eventId=${eventId}`);
          if (document.visibilityState === "visible") {
            connectSocket(socketUrl, eventId)
          } else if (document.visibilityState === "hidden") {
            cleanupWebSocket();
          }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
          document.removeEventListener("visibilitychange", handleVisibilityChange);
          cleanupWebSocket();
          clearInterval(intervalIdRef.current);
        };
      } catch (err) {
        setErrorMessage(err?.response?.data?.message || 'Failed to verify domain.');
      }
    };
    checkDomainAndProceed();
  }, [eventId, marketId, isConnected, socketUrl]);


  const cleanupWebSocket = () => {
    if (socket) {
      socket.current.disconnect();
    }
  };


  const getMarketEventUrl = async (eventurl) => {
    try {
      const response = await axios.get(eventurl);

      if (!response || !response?.data || response?.data.data === undefined || response?.data.data === null) {
        return;
      }
      if (response && response.data && response.data.dataEncrupt && response.data.dataEncrupt == true) {
        if (response.data) {
          let encruptedData = response.data.data
          const bytes = CryptoJS.AES.decrypt(encruptedData, process.env.REACT_APP_SECRET_KEY
          );
          const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
          if (decryptedData && decryptedData != null && decryptedData != "") {
            response.data.data = JSON.parse(decryptedData)
          }
        }
      }
      const parsedData = response?.data?.data



      const setData = {
        score: {
          last_6_balls: "",
          balls_array: parsedData?.lastBalls ? parsedData?.lastBalls : [],
          last_boll_result: "",
          p1_dtl: "- (0)",
          player1_array: {
            name: parsedData?.batsman?.[0]?.name ?? "-",
            strike_rate: parsedData?.batsman?.[0]?.strike_rate ?? "-",
            sixes: parsedData?.batsman?.[0]?.sixes ?? "-",
            fours: parsedData?.batsman?.[0]?.fours ?? "-",
            ball: parsedData?.batsman?.[0]?.ball ?? "-",
            run: parsedData?.batsman?.[0]?.run ?? "-",
            out_by: "",
          },
          player2_array: {
            name: parsedData?.batsman?.[1]?.name ?? "-",
            strike_rate: parsedData?.batsman?.[1]?.strike_rate ?? "-",
            sixes: parsedData?.batsman?.[1]?.sixes ?? "-",
            fours: parsedData?.batsman?.[1]?.fours ?? "-",
            ball: parsedData?.batsman?.[1]?.ball ?? "-",
            run: parsedData?.batsman?.[1]?.run ?? "-",
            out_by: "",
          },
          bowlerArray: {
            "player_id": parsedData?.bowler?.player_id || "",
            "name": parsedData?.bowler?.name || "",
            "img": parsedData?.bowler?.img || "",
            "run": parsedData?.bowler?.run || "",
            "maiden": parsedData?.bowler?.maiden || "",
            "over": parsedData?.bowler?.over || "",
            "wicket": parsedData?.bowler?.wicket || "",
            "economy": parsedData?.bowler?.economy || "",
          },
          p2_dtl: "- (0)",
          b_dtl: "-",
          t1_dtl: "-",
          t2_dtl: "-",
          img_path: "",
          score_msg: "",
          converted_cb: "",
          cb: parsedData?.currentBall ?? "-",
          run_rate: parsedData?.runRate ?? "-",
          bowler: parsedData?.bowler?.name ?? "-",
          Status: parsedData?.currentBall ?? "-",
          team1_name: parsedData?.team1?.shortName ?? "Team-1",
          team2_name: parsedData?.team2?.shortName ?? "Team-2",
          team1_score: parsedData?.team1?.score ?? "-",
          team2_score: parsedData?.team2?.score ?? "-",
          team2_over: parsedData?.team2?.overs ?? "-",
          toss: parsedData?.needByBall ?? "-",
          partnership: `${parsedData?.partnership?.run ?? "-"} (${parsedData?.partnership?.ball ?? "-"
            })`,
          team1_img: parsedData?.team1?.flag ?? "-",
          team2_img: parsedData?.team2?.flag ?? "-",
          team1_over: parsedData?.team1?.overs ?? "-",
          targetRun: parsedData?.targetRun ?? 0,
          matchType: parsedData?.matchType ?? '',
          session: parsedData?.session,
          last_wicket: {
            "player": parsedData?.lastWicket?.player ?? "-",
            "run": parsedData?.lastWicket?.run ?? "-",
            "ball": parsedData?.lastWicket?.ball ?? "-"
          }
        },
      };
      setMatchScoreDetails(setData);

    } catch (error) {
      setMatchScoreDetails(null);
      console.error("Error fetching market cache URL:", error);
    }
  };

  const connectSocket = (socketUrl, eventId) => {
    if (socket.current && socket.current.connected) {
      return;
    }

    socket.current = io(socketUrl, {
      transports: ["websocket"],
      reconnection: false,
    });

    if (eventId && iscrex) {
      socket.current.emit("score", eventId);
      socket.current.io.on("connect", function () {
        socket.current.emit("score", eventId);
      });

      socket.current.on("score/" + eventId, function (data) {
        const jsondata = data.response;
        const TotalOvers = data?.response?.totalOvers;
        if (jsondata?.type == "auto") {
          const parsedData = getSocketData(data);


          if (parsedData.innings === 2) {
            parsedData.need = CalcNeed(TotalOvers, parsedData);
            parsedData.rrr = CalcRrr(TotalOvers, parsedData);
          } else {
            parsedData.need = "Welcome";
          }
          const setData = {
            score: {
              last_6_balls: "",
              balls_array: parsedData?.over ? parsedData?.over : [],
              last_boll_result: "",
              p1_dtl: "- (0)",
              player1_array: {
                name: parsedData?.p1 ?? "-",
                strike_rate: parsedData?.batsman?.[0]?.strike_rate ?? "-",
                sixes: parsedData?.p1Sixes ?? "-",
                fours: parsedData?.p1Fours ?? "-",
                ball: parsedData?.p1balls ?? "-",
                run: parsedData?.p1S ?? "-",
                out_by: "",
              },
              player2_array: {
                name: parsedData?.p2 ?? "-",
                strike_rate: parsedData?.batsman?.[0]?.strike_rate ?? "-",
                sixes: parsedData?.p2Sixes ?? "-",
                fours: parsedData?.p2Fours ?? "-",
                ball: parsedData?.p2balls ?? "-",
                run: parsedData?.p2S ?? "-",
                out_by: "",
              },
              bowlerArray: {
                "player_id": parsedData?.bowler?.player_id || "",
                "name": parsedData?.bowler?.name || "",
                "img": parsedData?.bowler?.img || "",
                "run": parsedData?.bowler?.run || "",
                "maiden": parsedData?.bowler?.maiden || "",
                "over": parsedData?.bowler?.over || "",
                "wicket": parsedData?.bowler?.wicket || "",
                "economy": parsedData?.bowler?.economy || "",
              },
              innings: parsedData?.innings,
              p2_dtl: "- (0)",
              totalrun1stinning: parsedData?.innings === 2 ? convertOverToruns(parsedData.score) : null,
              rrr: parsedData?.rrr ?? '',
              b_dtl: "-",
              t1_dtl: "-",
              t2_dtl: "-",
              img_path: "",
              score_msg: "",
              converted_cb: "",
              cb: parsedData?.ballStatus ?? "-",
              run_rate: parsedData?.crr ?? "-",
              bowler: parsedData?.bowlerName ?? "-",
              Status: parsedData?.ballStatus ?? "-",
              team1_name: parsedData?.team1short ?? "",
              team2_name: parsedData?.team2short ?? "",
              team1_score: parsedData?.score ?? "-",
              team2_score: parsedData?.score1 ?? "-",
              team2_over: parsedData?.i2Over ?? "-",
              toss: parsedData?.need ?? "-",
              partnership: `${parsedData?.partnership?.run ?? "-"} (${parsedData?.partnership?.ball ?? "-"
                })`,
              team1_img: parsedData?.teamFlagObj1 ?? "-",
              team2_img: parsedData?.teamFlagObj2 ?? "-",
              team1_over: parsedData?.i1Over ?? "-",
              session: parsedData?.session,
              last_wicket: {
                player: parsedData?.lastWicket?.player ?? "-",
                run: parsedData?.lastWicket?.run ?? "-",
                ball: parsedData?.lastWicket?.ball ?? "-",
              },
            },
          };

          setMatchScoreDetails(setData);
        } else if (jsondata?.type == "adda") {
          const homeData = JSON.parse(jsondata?.home);
          const p1Data = JSON.parse(jsondata?.p1);
          let teamData = homeData?.participants;
        }
      });
    } else if (eventId && !iscrex) {
      socket.current.emit("scoreByEvent", eventId);
      // socket.current.emit("scoreByEvent2_", eventId);
      socket.current.on(eventId, (data) => {
        let parsedData = {};
        const newData = JSON.parse(data);

        if (typeof (newData) == "string") {
          parsedData = JSON.parse(newData)
        } else {
          parsedData = newData
        }
        const setData = {
          score: {
            last_6_balls: "",
            balls_array: parsedData?.lastBalls ? parsedData?.lastBalls : [],
            last_boll_result: "",
            p1_dtl: "- (0)",
            player1_array: {
              name: parsedData?.batsman?.[0]?.name ?? "-",
              strike_rate: parsedData?.batsman?.[0]?.strike_rate ?? "-",
              sixes: parsedData?.batsman?.[0]?.sixes ?? "-",
              fours: parsedData?.batsman?.[0]?.fours ?? "-",
              ball: parsedData?.batsman?.[0]?.ball ?? "-",
              run: parsedData?.batsman?.[0]?.run ?? "-",
              out_by: "",
              img: parsedData?.batsman?.[0]?.img ?? ''
            },
            player2_array: {
              name: parsedData?.batsman?.[1]?.name ?? "-",
              strike_rate: parsedData?.batsman?.[1]?.strike_rate ?? "-",
              sixes: parsedData?.batsman?.[1]?.sixes ?? "-",
              fours: parsedData?.batsman?.[1]?.fours ?? "-",
              ball: parsedData?.batsman?.[1]?.ball ?? "-",
              run: parsedData?.batsman?.[1]?.run ?? "-",
              out_by: "",
              img: parsedData?.batsman?.[1]?.img ?? ''
            },
            bowlerArray: {
              "player_id": parsedData?.bowler?.player_id || "",
              "name": parsedData?.bowler?.name || "",
              "img": parsedData?.bowler?.img || "",
              "run": parsedData?.bowler?.run || "",
              "maiden": parsedData?.bowler?.maiden || "",
              "over": parsedData?.bowler?.over || "",
              "wicket": parsedData?.bowler?.wicket || "",
              "economy": parsedData?.bowler?.economy || "",
            },
            p2_dtl: "- (0)",
            b_dtl: "-",
            t1_dtl: "-",
            t2_dtl: "-",
            img_path: "",
            score_msg: "",
            converted_cb: "",
            cb: parsedData?.currentBall ?? "-",
            run_rate: parsedData?.runRate ?? "-",
            bowler: parsedData?.bowler?.name ?? "-",
            Status: parsedData?.currentBall ?? "-",
            team1_name: parsedData?.team1?.shortName ?? "",
            team2_name: parsedData?.team2?.shortName ?? "",
            team1_score: parsedData?.team1?.score ?? "-",
            team2_score: parsedData?.team2?.score ?? "-",
            team2_over: parsedData?.team2?.overs ?? "-",
            toss: parsedData?.needByBall ?? "-",
            partnership: `${parsedData?.partnership?.run ?? "-"} (${parsedData?.partnership?.ball ?? "-"
              })`,
            team1_img: parsedData?.team1?.flag ?? "-",
            team2_img: parsedData?.team2?.flag ?? "-",
            team1_over: parsedData?.team1?.overs ?? "-",
            targetRun: parsedData?.targetRun ?? 0,
            matchType: parsedData?.matchType ?? '',
            session: parsedData?.session,
            last_wicket: {
              "player": parsedData?.lastWicket?.player ?? "-",
              "run": parsedData?.lastWicket?.run ?? "-",
              "ball": parsedData?.lastWicket?.ball ?? "-"
            }
          },
        };
        setMatchScoreDetails(setData);
      });
    }
    socket.current.on("disconnect", () => {
      setIsConnected(false);
    });
  };

  return {
    matchScoreDetails,
    isConnected,
    errorMessage
  };
};

export { useMatchDetails };
