<template>
	<div class="singer" ref="singer">
		<list-view @select="selectSinger" :data="singers" ref="list"></list-view>
		<router-view></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer'
  import Singer from 'common/js/singer'
  import ListView from 'base/listview/listview'
  import {mapMutations} from 'vuex'
  import {playlistMixin} from 'common/js/mixin'

  const HOT_NAME = '热门'
  const HOT_SINGRE_LEN = 10

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer) // 提交到vuex中
      },
      _getSingerList() {
        getSingerList().then((res) => {
          this.singers = this._normalizeSinger(res)
        })
      },
      _normalizeSinger(list) {
        let result = []

        for (let index1 in list) {
          if (index1 === '-100') {
            let hot = {
              title: HOT_NAME,
              items: []
            }
            result.push(hot)
            list[index1].forEach((item, index2) => {
              if (index2 < HOT_SINGRE_LEN) {
                hot.items.push(new Singer({
                  name: item.singer_name,
                  id: item.singer_mid,
                  avatar: item.singer_pic
                }))
              }
            })
          } else {
            let temp = {
              title: index1,
              items: []
            }
            result.push(temp)
            list[index1].forEach((item, index2) => {
              temp.items.push(new Singer({
                name: item.singer_name,
                id: item.singer_mid,
                avatar: item.singer_pic
              }))
            })
          }
        }

        return result
      },
      // 将setSinger映射为this.$store.commit('SET_SINGER')
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.singer
	    position: fixed
	    top: 88px
	    bottom: 0
	    width: 100%
</style>
