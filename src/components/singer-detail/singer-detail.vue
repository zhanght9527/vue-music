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
          this.songs = this._normalizeSongs(res.data.list)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach(s => {
        let { musicData } = s
        if (musicData.songid && musicData.albummid) {
          createSong(musicData).then(res => {
            ret.push(res)
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
