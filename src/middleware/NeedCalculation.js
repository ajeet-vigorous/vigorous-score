export const CalcNeed = (totalOver, parsedData) => {
    if (!parsedData || parsedData.innings !== 2 ) {
        return parsedData?.need || 'Data is missing or invalid';
    }
    const team2Over = parsedData.i2Over;
    const totalBalls = totalOver * 6;
    const totalBallsInTeam2Over = convertOverToBalls(team2Over);
    const totalrunsTeam1 = convertOverToruns(parsedData.score);
    const totalrunsTeam2 = convertOverToruns(parsedData.score1);
    const ballsNeeded = totalBalls - totalBallsInTeam2Over;

    const runsNeeded = totalrunsTeam1 - totalrunsTeam2 + 1 ;
    if (runsNeeded === undefined || ballsNeeded === undefined || isNaN(runsNeeded) || isNaN(ballsNeeded)) {
        return parsedData?.need || 'Welcome';
    }
    return  runsNeeded > -5 ? `${parsedData?.team2 ? parsedData?.team2 : ""} needed ${runsNeeded} runs in ${ballsNeeded} balls.` : `${parsedData?.team2 ? parsedData?.team2 : ""} Lead by ${Math.abs(runsNeeded) + 1} runs `;
};


function convertOverToBalls(overStr) {
    const parts = overStr.split('.');
    const overs = parseInt(parts[0], 10);  
    const balls = parts.length > 1 ? parseInt(parts[1], 10) : 0;  
    return (overs * 6) + balls;  
}


function convertOverToruns(runs) {
    const parts = runs.split('/');
return parts[0]   
}



