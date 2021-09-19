const fetch = require('node-fetch')
const cheerio = require('cheerio')

const getData = (html) => {
  const $ = cheerio.load(html)

  return $('div.single-score-card')
    .filter((i, e) => !$(e).attr('class').includes('sharethrough'))
    .map((i, e) => {
      const $container = $(e)
      const gameStatus = $container
        .find('.game-status')
        .text()
        .trim()
        .replace(/\n.*/g, '')

      const [team1Name, team2Name] = $container
        .find('a.team')
        .map((i, e) => $(e).text().trim())

      const [team1Img, team2Img] = $container
        .find('.TeamLogo-image')
        .map((i, e) => $(e).attr('data-lazy'))

      const [team1Record, team2Record] = $container
        .find('.record')
        .map((i, e) => $(e).text())

      const [team1Score, team2Score] = $container
        .find('.total-score')
        .map((i, e) => $(e).text())

      return {
        gameStatus,
        team1Name,
        team1Img,
        team1Record,
        team1Score,
        team2Name,
        team2Img,
        team2Record,
        team2Score,
      }
    })
    .get()
}

module.exports = async (req, res) => {
  const { week = '1' } = req.query

  const resp = await fetch(
    `https://www.cbssports.com/college-football/scoreboard/FBS/2021/regular/${week}`,
  )
  const html = await resp.text()
  const data = getData(html)

  res.status(200).send(data)
}
