<template lang="html">
  <transition name="fade">
    <div class="footer">
      <div class="footer-play">
        <div class="music-image" @click="showPlay">
          <img :src="audio[0].al.picUrl" alt="">
        </div>
        <div class="music-info" @click="showPlay">
          <div class="music-name">{{audio[0].name}}</div>
          <div class="author">{{audio[0].ar[0].name}}</div>
        </div>
        <div class="music-play">
          <i class="iconfont" v-if="playing" @click="pause()">&#xe6d0;</i>
          <i class="iconfont" v-else @click="play()">&#xe6cf;</i>
        </div>
        <div class="music-list">
          <i class="iconfont">&#xe607;</i>
        </div>
      </div>
      <div class="progress-bar">
            <div class="play"
                 :style="{width: (now / duration).toFixed(3)*100 + '%'}"></div>
        </div>
        <audio preload
               ref="myAudio"
               :src="audio[0].url"
               @ended="next()"></audio>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../../api/api'
export default {
    data() {
        return {
            now: '',
            duration: '200.045714',
        }
    },
    computed: {
        ...mapGetters([
            'audio',
            'audioUrl',
            'playing',
            'size'
        ]),
    },
    mounted() {
        let timer;
        this.$refs.myAudio.addEventListener('play', () => {
            timer = setInterval(() => {
                this.duration = this.$refs.myAudio.duration
                this.now = this.$refs.myAudio.currentTime
            }, 1000)
        })
        this.$refs.myAudio.addEventListener('pause', () => {
            clearInterval(timer)
        })
    },
    methods: {
        play() {
            this.$store.dispatch('setPlaying', true)
        },
        pause() {
            this.$store.dispatch('setPlaying', false)
        },
        showPlay() {
            this.$store.dispatch('setShowPlay', true)
        },
        next() {
            this.$store.dispatch('setPlaying', false)
            for (let i = 0; i < this.listenLists.length; i++) {
                if (this.listenLists[i].name === this.audio[0].name) {
                    this.$store.dispatch('setNextAudio', i)
                    break
                }
            }
            if (this.audio[0].mp3Url) {
                this.$store.dispatch('setAudioUrl', this.audio[0].mp3Url)
            } else {
                api.MusicUrl(this.audio[0].id)
                    .then(res => {
                        this.$store.dispatch('setAudioUrl', res.data[0].url)
                    })
            }
        },
    },
    watch: {
        playing() {
            this.playing ? this.$refs.myAudio.play() : this.$refs.myAudio.pause()
        },
        audio() {
            this.$store.dispatch('getMusicInfo', this.audio[0].id)
            this.now = 0
        },
    }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .5s ease-in;
}
.fade-enter, .fade-leave-active {
  transform: translateY(3rem);
  opacity: 0;
}
.footer {
  position: fixed;
  background: #555555;
  bottom: 0;
  width: 100%;
  height: 3.5rem;
  .footer-play {
    display: -webkit-flex;
    display: flex;
    height: 100%;
    align-items: center;
    .music-image {
      display: -webkit-flex;
      display: flex;
      height: 3.5rem;
      width: 3.5rem;
      align-items: center;
      justify-content: center;
      img {
        width: 80%;
        height: 80%;
      }
    }
    .music-info {
      flex: 5;
      .music-name {
        font-size: 1rem;
        color: #fff;
      }
      .author {
        font-size: .9rem;
        color: rgba(255,255,255,.5);
        margin-top: 0.3rem;
      }
    }
    .music-play, .music-list {
      flex: 1;
      text-align: center;
      .iconfont {
        font-size: 2rem;
      }
    }
  }
}
</style>
