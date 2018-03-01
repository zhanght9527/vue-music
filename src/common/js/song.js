import { getLyric } from 'api/song'
import { ERR_OK, commonParams } from 'api/config'
import { Base64 } from 'js-base64'
import jsonp from 'common/js/jsonp'

export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then(res => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}

export function createSong (musicData) {
  let t = (new Date()).getUTCMilliseconds()
  let _guid = Math.round(2147483647 * Math.random()) * t % 1e10
  let SongUrl = new Promise((resolve, reject) => {
    getSongUrl(musicData.songmid, _guid).then(res => {
      resolve(res.data.items[0].vkey)
    })
  })
  return SongUrl.then(_vkey => {
    return new Song({
      id: musicData.songid,
      mid: musicData.songmid,
      singer: filterSinger(musicData.singer),
      name: musicData.songname,
      album: musicData.albumname,
      duration: musicData.interval,
      image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
      url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=${_vkey}&guid=${_guid}&uin=0&fromtag=66`
    })
  })
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach(s => {
    ret.push(s.name)
  })
  return ret.join('/')
}

function getSongUrl (songMid, _guid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    cid: 205361747,
    needNewCode: 0,
    songmid: songMid,
    filename: `C400${songMid}.m4a`,
    platform: 'yqq',
    format: 'json',
    g_tk: 673815377,
    guid: _guid
  })

  return jsonp(url, data, {
    params: 'MusicJsonCallback'
  })
}
