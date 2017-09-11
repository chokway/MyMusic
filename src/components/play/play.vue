<template lang="html">
  <div class="play">
    <div class="head">
      <div class="back" @click="hidePlay">
        <i class="iconfont">&#xe61c;</i>
      </div>
      <div class="music-info">
        <div class="music-name">{{audio[0].name}}</div>
        <div class="author">{{audio[0].ar[0].name}}</div>
      </div>
      <div class="share">
        <i class="iconfont">&#xe674;</i>
      </div>
    </div>
    <div class="lyrics">
      <div class="lyric">
        <div class="roll-lyric" v-html="lyrics" ref="lyric"></div>
      </div>
    </div>
    <div class="timing">
      <div class="now">{{nowTime}}</div>
      <div class="total">{{totalTime}}</div>
    </div>
    <div class="control">
      <div>
        <div class="loop">
          <i class="iconfont">&#xe620;</i>
        </div>
        <div class="prev" @click="prev()">
          <i class="iconfont">&#xe635;</i>
        </div>
        <div class="playing">
          <i class="iconfont" v-if="playing" @click="pause()">&#xe6d0;</i>
          <i class="iconfont" v-else @click="play()">&#xe6cf;</i>
        </div>
        <div class="next" @click="next()">
          <i class="iconfont">&#xe636;</i>
        </div>
        <div class="music-list">
          <i class="iconfont">&#xe607;</i>
        </div>
      </div>
    </div>
    <div class="background">
            <img :src="audio[0].al.picUrl" width="100%" height="100%" alt="">
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

import api from '../../api/api'

export default {
  data() {
        return {
            now: '',
            lyricArr: [],
            pDom: [],
            deg: '',
            translateX: ''
        }
    },
    computed: {
        ...mapGetters([
            'audio',
            'playing',
            'lyric',
            'size',
            'listenLists'
        ]),
        lyrics() {
            let lyrics = ''
            this.lyricArr = []
            if (this.lyric) {
                let arr = this.lyric.split('\n')
                for (let item of arr) {
                    if (item) {
                        let arr2 = item.split(']')
                        // console.log(arr2[0])
                        // console.log(arr2[0].substring(1,3)*60)
                        // console.log(arr2[0].substring(4))
                        this.lyricArr.push(arr2[0].substring(1,3)*60+arr2[0].substring(4)*1)
                        // console.log(this.lyricArr)
                        if (arr2) {
                            lyrics += `<p class='lyrichook' style='margin: 10px 0'>${arr2[1]}</p>`
                        }
                    }
                }
            } else {
                lyrics = '暂无歌词~'
            }
            return lyrics
        },
        totalTime() {
            let m, s
            m = Math.floor(this.size / 60)
            m = m.toString().length == 1 ? ('0' + m) : m
            s = Math.floor(this.size - 60 * m)
            s = s.toString().length == 1 ? ('0' + s) : s
            return m + ':' + s
        },
        nowTime() {
            let m, s
            m = Math.floor(this.now / 60)
            m = m.toString().length == 1 ? ('0' + m) : m
            s = Math.floor(this.now - 60 * m)
            s = s.toString().length == 1 ? ('0' + s) : s
            return m + ':' + s
        },
    },
    created() {
        this.resize()
    },
    mounted() {
        let timer,
            audioDOM = document.querySelector('audio')
        audioDOM.addEventListener('play', () => {
            this.pDOM = [...document.querySelectorAll('.lyrichook')]
            timer = setInterval(() => {
                this.now = audioDOM.currentTime
                this.lyricArr.forEach((item, index) => {
                    if (parseInt(item) == parseInt(this.now)) {
                        this.pDOM.forEach((p) => {
                            p.style.color = 'rgba(255,255,255,.8)'
                        });
                        this.pDOM[index].style.color = '#f12c61'
                        this.$refs.lyric.style.transform = `translateY(-${(index-7)*25}px)`

                    }
                });
            }, 1000)
        })
        audioDOM.addEventListener('pause', () => {
            clearInterval(timer)
        })
        window.addEventListener('resize', () => {
            this.resize()
        })
    },
    methods: {
        play() {
            this.$store.dispatch('setPlaying', true)
        },
        pause() {
            this.$store.dispatch('setPlaying', false)
        },
        prev() {
            this.$store.dispatch('setPlaying', true)
            for (let i = 0; i < this.listenLists.length; i++) {
                if (this.listenLists[i].name === this.audio[0].name) {
                    this.$store.dispatch('setPrevAudio', i)
                    break
                }
            }
            if (this.audio[0].url) {
                this.$store.dispatch('setAudioUrl', this.audio[0].url)
            } else {
                api.MusicUrl(this.audio[0].id)
                    .then(res => {
                        this.$store.dispatch('setAudioUrl', res.data[0].url)
                    })
            }
        },
        next() {
            this.$store.dispatch('setPlaying', true)
            for (let i = 0; i < this.listenLists.length; i++) {
                if (this.listenLists[i].name === this.audio[0].name) {
                    this.$store.dispatch('setNextAudio', i)
                    break
                }
            }
            if (this.audio[0].url) {
                this.$store.dispatch('setAudioUrl', this.audio[0].url)
            } else {
                api.MusicUrl(this.audio[0].id)
                    .then(res => {
                        this.$store.dispatch('setAudioUrl', res.data[0].url)
                    })
            }
        },
        hidePlay() {
            this.$store.dispatch('setShowPlay', false)
        },
        resize() {
            let cwidth = document.body.clientWidth
            if(cwidth === 460) {
                this.translateX = '-3.73333rem'
                this.deg = '-523'
            } else {
                this.translateX = '-2.98667rem'
                this.deg = '-527'
            }
        },
    },
    watch: {
        size() {
            this.$refs.lyric.style.transform = 'translateY(0px)'
        },
        lyrics() {
            this.$nextTick(() => {
                this.pDOM = [...document.querySelectorAll('.lyrichook')]
            })
        },
    }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/sass/base.scss";
  .play {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 666;
    background: #000;
    overflow: hidden;
    .head {
      position: relative;
      height: 4rem;
      width: 100%;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      /*border: border-1px(rgba(255,255,255,.5));*/
      .back {
        flex: 1;
        text-align: center;
      }
      .music-info {
        flex: 6;
        color: rgba(255,255,255,.6);
        .music-name {
          font-size: 1.1rem;
        }
        .author {
          font-size: 0.9rem;
        }
      }
      .share {
        flex: 1;
        text-align: center;
        .iconfont {
          font-size: 1.5rem;
        }
      }
    }
    .lyrics {
            width: 100%;
            height: 100%;
            .lyric {
                width: 19rem;
                height: 25rem;
                margin: .53rem auto;
                color: rgba(255, 255, 255, .8);
                text-align: center;
                font-size: .4rem;
                line-height: 25rem;
                overflow: auto;
                .roll-lyric {
                    transition: transform .5s;
                    // transform: translateY(200px);
                }
            }
        }
    .timing {
      width: 100%;
      height: .67rem;
      line-height: .67rem;
      text-align: center;
      position: absolute;
      bottom: 9rem;
      color: #fff;
      display: flex;
      justify-content: space-between;
      font-size: .37rem;
      >div {
          width: 1.33rem;
      }
    }
    .control {
        position: absolute;
        width: 100%;
        height: 5rem;
        border-bottom-color: transparent;
        z-index: 30;
        bottom: 2rem;
        >div {
            width: 100%;
            display: flex;
            height: 5rem;
            line-height: 4rem;
            >div {
                flex: 1;
                z-index: 35;
                text-align: center;
                cursor: pointer;
                .iconfont {
                    font-size: 2.5rem;
                }
                &:first-child,
                &:last-child {
                    padding-top: .11rem;
                    .iconfont {
                        font-size: 1.5rem;
                    }
                }
            }
        }
    }
    .background {
      position: absolute;
        top: 4rem;
        left: 0;
        right: 0;
        bottom: 9rem;
        width: 100%;
        height: 60%;
        z-index: -1;
        filter: blur(30px);
    }
  }
</style>
