export const CalcRrr = (totalOver, parsedData) => {
    if (!parsedData || parsedData.innings !== 2 ) {
        return parsedData?.rrr || '';
    }
    const team2Over = parsedData.i2Over;
    const totalBalls = totalOver * 6;
    const totalBallsInTeam2Over = convertOverToBalls(team2Over);
    const totalrunsTeam1 = convertOverToruns(parsedData.score);
    const totalrunsTeam2 = convertOverToruns(parsedData.score1);
    const ballsNeeded = totalBalls - totalBallsInTeam2Over;

    const runsNeeded = totalrunsTeam1 - totalrunsTeam2 + 1 ;

    // If there's no valid data for runsNeeded or ballsNeeded, return the "need" or a default message
    if (runsNeeded === undefined || ballsNeeded === undefined || isNaN(runsNeeded) || isNaN(ballsNeeded)) {
        return parsedData?.need || 'Welcome';
    }

    // Calculate Required Run Rate (RRR)
    const remainingOvers = ballsNeeded / 6;
    const requiredRunRate = (runsNeeded / remainingOvers).toFixed(2);  // We can round to 2 decimal places

    if (runsNeeded > 0) {
        return requiredRunRate;
    }
};

// Convert overs (e.g., "3.4") to total balls
function convertOverToBalls(overStr) {
    const parts = overStr.split('.');
    const overs = parseInt(parts[0], 10);  
    const balls = parts.length > 1 ? parseInt(parts[1], 10) : 0;  
    return (overs * 6) + balls;  
}

// Extract the runs from the score string (e.g., "45/2" becomes 45)
function convertOverToruns(runs) {
    const parts = runs.split('/');
    return parseInt(parts[0], 10);  
}
