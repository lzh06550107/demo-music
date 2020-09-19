<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSongList} from 'api/recommend'
  import {RESULT_OK} from 'api/constant'
  import {createSong} from 'common/js/song'

  export default {
    computed: {
      title() {
        return this.disc.title
      },
      bgImage() {
        return this.disc.cover
      },
      ...mapGetters([ // 从存储中心取出专辑对象
        'disc'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    methods: {
      _getSongList() {
        if (!this.disc.content_id) { // 如果没有专辑id，则回到推荐页面
          this.$router.push('/recommend')
          return
        }
        // 通过专辑id来获取歌曲列表
        getSongList(this.disc.content_id).then((res) => {
          if (res.result === RESULT_OK) {
            this.songs = this._normalizeSongs(res.data.songlist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    created() {
      this._getSongList()
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
