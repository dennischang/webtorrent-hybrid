// var WebTorrent = require('webtorrent-hybrid')
var WebTorrent = require('../index')

var daemon = global.WRTC.electronDaemon;

daemon.once('ready', function() {
  var client = new WebTorrent({ dht: false })

  var filePath = './2015FrozenFever.mp4'

  console.log('filePath:', filePath)

  client.seed(filePath, function (torrent) {
    console.log('torrentId (info hash):', torrent.infoHash)
    console.log('torrentId (magnet link):', torrent.magnetURI)
  })
})
