import { useParams } from "react-router-dom";
import { useMatchDetails } from "../../middleware/useMatchDetails";

const SocketIframe14 = () => {
  const { marketId, eventId } = useParams();
  const { matchScoreDetails } = useMatchDetails(marketId, eventId);




  return (

    <div className="row w-100 mx-2 d-flex flex-row justify-content-between p-2">
      <div
        className="col-4 col-xl-5 d-flex flex-sm-row flex-column justify-content-between align-items-center text-center text-sm-start mb-2 mb-sm-0"
      >
        <div className="d-flex flex-column justify-content-center align-items-center">
          <span style={{ fontWeight: 600, fontSize: 14 }}>{matchScoreDetails?.score?.team1_name
            ? matchScoreDetails?.score?.team1_name
            : "-"}</span>
          <span style={{ fontSize: 14, color: "#6c757d" }}>Overs: {matchScoreDetails?.score?.team1_over
            ? matchScoreDetails?.score?.team1_over
            : "0"}</span>
        </div>
        <span style={{ fontWeight: 700, fontSize: 20 }}>{matchScoreDetails?.score?.team1_score
          ? matchScoreDetails?.score?.team1_score
          : "0-0"}</span>
      </div>
      <div
        className="col-4 col-xl-5 d-flex flex-sm-row flex-column justify-content-between align-items-center text-center text-sm-end"
      >

        <div className="d-flex flex-column justify-content-center align-items-center ">
          <span style={{ fontWeight: 600, fontSize: 14 }}>{matchScoreDetails?.score?.team2_name
            ? matchScoreDetails?.score?.team2_name
            : "-"}</span>
          <span style={{ fontSize: 14, color: "#6c757d" }}>Overs: {matchScoreDetails?.score?.team2_over
            ? matchScoreDetails?.score?.team2_over
            : "0"}</span>
        </div>
        <span style={{ fontWeight: 700, fontSize: 20 }}>
          {matchScoreDetails?.score?.team2_score
            ? matchScoreDetails?.score?.team2_score
            : "0-0"}
        </span>
      </div>

    </div>

  );
};

export default SocketIframe14;
