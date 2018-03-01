import jsonp from 'common/js/jsonp'
import {commonParams, options} from 'api/config'

export function getTopList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

export function getMusicList (topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    needNewCode: 1,
    platform: 'h5',
    page: 'detail',
    type: 'top',
    tpl: 3,
    topid
  })

  return jsonp(url, data, options)
}
