<template>
  <transition name="slide">
    <music-list :songs='songs' :title='title' :bg-image='bgImage'></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import { getSongUrl } from 'api/song'
import MusicList from 'components/music-list/music-list'
export default {
  data () {
    return {
      songs: []
    }
  },
  computed: {
    title () {
      return this.singer.name
    },
    bgImage () {
      if (this.singer.avatar) {
        if (this.singer.avatar.indexOf('150x150') !== -1) {
          return this.singer.avatar.replace(/150x150/, '300x300')
        }
      }
    },
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    this._getDetail()
  },
  methods: {
    _getDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          let t = (new Date()).getUTCMilliseconds()
          let _guid = Math.round(2147483647 * Math.random()) * t % 1e10
          this.songs = this._normalizeSongs(res.data.list, _guid)
        }
      })
    },
    _normalizeSongs (list, _guid) {
      let ret = []
      list.forEach(s => {
        let { musicData } = s
        if (musicData.songid && musicData.albummid) {
          getSongUrl(musicData.songmid, _guid).then(res => {
            let _vkey = res.data.items[0].vkey
            ret.push(createSong(musicData, _vkey, _guid))
          })
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .singer-detail
    position fixed
    z-index 100
    top 0
    left  0
    right 0
    bottom 0
    background $color-background
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
