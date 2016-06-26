// var WebTorrent = require('webtorrent-hybrid')
var WebTorrent = require('../index')
var fs = require('fs')

var daemon = global.WRTC.electronDaemon;

daemon.once('ready', function() {
  var client = new WebTorrent({ dht: false })
  var torrentId = 'magnet:?xt=urn:btih:2ce4b0376268a00572a952cd70234a4c0eff4883'

  console.log('torrentId:\t', torrentId)

  client.add(torrentId, function (torrent) {
    var files = torrent.files
    var length = files.length
    // Stream each file to the disk
    files.forEach(function (file) {
      var source = file.createReadStream()
      var destination = fs.createWriteStream('bak_' + file.name)
      source.on('end', function () {
        console.log('file:\t\t', file.name)
        // close after all files are saved
        if (!--length) process.exit()
      }).pipe(destination)
    })
  })
})
