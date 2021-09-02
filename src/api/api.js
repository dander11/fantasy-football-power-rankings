import axios from 'axios';
import axiosCookieJarSupport from '@3846masa/axios-cookiejar-support';
import tough from 'tough-cookie';

axiosCookieJarSupport(axios);
const cookieJar = new tough.CookieJar(); 

axios.defaults.jar = cookieJar;
axios.defaults.withCredentials = true;

const getRankings = async (leagueId, seasonId, week) => {
    const { data } = await axios.get(
        `https://fantasy.espn.com/apis/v3/games/ffl/seasons/${seasonId}/segments/0/leagues/${leagueId}?scoringPeriodId=${week}&view=mMatchupScore&view=mStatus&view=mSettings&view=mTeam&view=modular&view=mNav`
    );
    //Grab all of the scores from each of the games play in the regular season
    const weeklyResults = data.schedule
        .filter(game => game.home.totalPoints > 0 && game.matchupPeriodId <= parseInt(week))
        .map(game => {
            if (game.away) {
                return {
                    scores: [
                        { teamId: game.away.teamId, score: game.away.totalPoints },
                        { teamId: game.home.teamId, score: game.home.totalPoints }
                    ],
                    week: game.matchupPeriodId
                };
            }
            return {
                scores: [{ teamId: game.home.teamId, score: game.home.totalPoints }],
                week: game.matchupPeriodId
            };
        })
        .reduce((acc, game) => {
            if (acc[game.week]) {
                acc[game.week].scores = acc[game.week].scores.concat(game.scores);
            } else {
                acc[game.week] = {
                    scores: [...game.scores]
                };
            }
            return acc;
        }, {});

    //Move scores into array of arrays
    var weeklyScores = [];
    for (let i = 1; i <= Object.keys(weeklyResults).length; i++) {
        weeklyScores.push(weeklyResults[i]);
    }

    const scoresCopy = JSON.parse(JSON.stringify(weeklyScores));

    //Sort the scores
    const sortedWeeklyScores = weeklyScores.map(week => {
        return week.scores.sort((a, b) => a.score - b.score);
    });

    //Map wins and scores onto team data
    const teams = data.teams.map(team => {
        const wins = sortedWeeklyScores.map(week => {
            return week.findIndex(teamScore => teamScore.teamId === team.id);
        });
        const scores = sortedWeeklyScores.map(week => {
            const matchingTeam = week.find(teamScore => teamScore.teamId === team.id);
            return matchingTeam ? matchingTeam.score : 0;
        });

        var teamWins = 0;
        scoresCopy.forEach(week => {
            var scoreIndex = week.scores.findIndex(teamScore => teamScore.teamId === team.id);
            var opponentIndex = scoreIndex % 2 === 0 || scoreIndex === 0 ? scoreIndex + 1 : scoreIndex - 1;
            var score = week.scores[scoreIndex].score;
            var opponentScore = week.scores[opponentIndex].score;
            if (score > opponentScore) {
                teamWins++;
            }
            return
        });
        var aTeam = {
            id: team.id,
            teamName: `${team.location} ${team.nickname}`,
            logoUrl: team.logo,
            wins: teamWins,
            scores,
            losses: week - teamWins,
            actualRecord: {
                wins: team.record.overall.wins,
                losses: team.record.overall.losses,
                ties: team.record.overall.ties
            },
            owner: getOwner(team.owners[0], data.members),
            totalWins: wins.reduce((acc, x) => acc + x, 0),
            totalLosses: Object.keys(weeklyResults).length * (data.teams.length - 1) - wins.reduce((acc, x) => acc + x, 0)
        };
        aTeam.powerRanking = getPowerRankingRating(aTeam);
        return aTeam;
    });

    teams.sort((a, b) => b.powerRanking - a.powerRanking);
    return {
        teams: teams,
        week: data.scoringPeriodId
    };
}

function getOwner(ownerId, allOwners) {
    if (ownerId == null) {
        return '';
    }
    var owner = allOwners.find(function (element) {
        return element.id == ownerId;
    });
    return owner.firstName + " " + owner.lastName;
}

/*
(Avg score x 6)+((high score + low score) x 1)+((winning % x 200) x 1)+((total win % x 200 x 2))
*/
function getPowerRankingRating(team) {
    var sum = 0;
    for (var i = 0; i < team.scores.length; i++) {
        sum += parseInt(team.scores[i], 10); //don't forget to add the base
    }
    var avgScore = sum / team.scores.length;
    var winPercentage = team.wins / (team.wins + team.losses);
    var totalWinPercentage = team.totalWins / (team.totalWins + team.totalLosses);
    return (avgScore * 6) + ((winPercentage * 200) * 2.5) + ((totalWinPercentage * 200) * 1.5)
}

export const getPowerRankings = async (leagueId, seasonId, week) => {
    const rankings = await getRankings(leagueId, seasonId, week);
    const prevRankings = await getRankings(leagueId, seasonId, week - 1);
    prevRankings.teams = prevRankings.teams.sort()
    rankings.teams.forEach(team => {
        team.prevRanking = prevRankings.teams.findIndex(aTeam => aTeam.id === team.id) + 1;

    });
    return {
        teams: rankings.teams,
        week: week
    };
};
