module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/fantasy-football-power-rankings/'
        : '/'
}