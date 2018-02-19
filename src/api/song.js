import jsonp from 'common/js/jsonp'
import {commonParams} from './config'

export function getSongUrl (songMid, _guid) {
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
