// useMatchDetails.js
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { getSocketData } from "./vendor";
import { CalcNeed } from "./NeedCalculation";

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
      cb: "Welcome",
      run_rate: "0.00",
      bowler: "-",
      Status: "Welcome",
      team1_name: "Team-1",
      team2_name: "Team-2",
      team1_score: "0",
      team2_score: "0",
      team2_over: "0",
      toss: "Welcome",
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
  let socketUrl = `wss://scoreapi.newbsf.com`;
  useEffect(() => {
    // getMarketEventUrl(`https://cache.crickexpo.in/v2/api/getScoreByEventId?eventId=${eventId}`)
    setupAsyncActions(eventId);

    const handleVisibilityChange = () => {
      // getMarketEventUrl(`https://cache.crickexpo.in/v2/api/getScoreByEventId?eventId=${eventId}`)
      if (document.visibilityState === "visible") {
        connectSocket(socketUrl, eventId);
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
  }, [eventId, marketId, isConnected]);
  // save

  const cleanupWebSocket = () => {
    if (socket) {
      socket.current.disconnect();
    }
  };

  const setupAsyncActions = async (eventId) => {
    await getDidMountData(eventId);
  };

  const getDidMountData = async (eventId) => {
    try {
      // let socketUrl = `https://onscache.winx777.com/`

      connectSocket(socketUrl, eventId);
    } catch (error) {
      console.error("Error fetching match details:", error);
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

    if (eventId) {
      socket.current.emit("score", eventId);
      socket.current.io.on("connect", function () {
        socket.current.emit("score", eventId);
      });

      socket.current.on("score/" + eventId, function (data) {
        const jsondata = data.response;


        const TotalOvers = data?.response.totalOvers;
        if (jsondata.type == "auto") {
          const parsedData = getSocketData(data);
     
          if (parsedData.innings === 2) {
            parsedData.need = CalcNeed(TotalOvers, parsedData);
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
              innings : parsedData?.innings,
              p2_dtl: "- (0)",
              totalrun1stinning : parsedData?.innings === 2 ? convertOverToruns(parsedData.score) : null,
              thisOverRun : parsedData?.over ?? 0,
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
              partnership: `${parsedData?.partnership?.run ?? "-"} (${
                parsedData?.partnership?.ball ?? "-"
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
        } else if (jsondata.type == "adda") {
          const homeData = JSON.parse(jsondata?.home);
          const p1Data = JSON.parse(jsondata?.p1);
          let teamData = homeData?.participants;
        }
      });
    }

    socket.current.on("disconnect", () => {
      setIsConnected(false);
    });
  };

  return {
    matchScoreDetails,
    isConnected,
  };
};

export { useMatchDetails };
