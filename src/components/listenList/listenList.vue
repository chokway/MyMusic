<template>
    <div class="listen-list">
        <div class="list">
            <div class="item" v-for="(item, index) in listenLists" :key="item.value">
                <div class="avatar" @click="_play(item)">
                    <img :src="item.al.picUrl" alt="">
                </div>
                <div :class="{'current': currentIndex == index}" class="info" @click="_play(item)">
                   <div class="music-name">{{item.name}}</div>
                   <div class="singer">{{item.ar[0].name}}</div>
                </div>
                <div class="delete" @click="_delete(index)">
                  <i class="iconfont">&#xe677;</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../../api/api'
export default {
    data() {
        return {
        }
    },
    methods: {
        _play(music) {
            this.$store.dispatch('setPlaying', true)
            this.$store.dispatch('setAudio', music)
            api.MusicUrl(music.id)
                .then(res => {
                    this.$store.dispatch('setAudioUrl', res.data[0].url)
                })
            let audioDOM = document.querySelector('audio')
            audioDOM.addEventListener('loadedmetadata', () => {
                this.$store.dispatch('getMusicInfo', music.id)
            })
        },
        _delete(index) {
            if(this.currentIndex === index) {
                return
            }
            this.$store.dispatch('deleteMusic', index)
        },
    },
    computed: {
        ...mapGetters([
            'listenLists',
            'audio',
            'showListenList'
        ]),
        currentIndex() {
            for (let i = 0; i < this.listenLists.length; i++) {
                if (this.listenLists[i].name === this.audio[0].name) {
                    return i
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.listen-list {
    background: rgba(51, 51, 51, .9);
    position: relative;
    width: 100%;
    .list{
        position: relative;
        width: 100%;
        .item {
            position: relative;
            height: 3.5rem;
            width: 100%;
            display: flex;
            align-items: center;
            &:after {
                position: absolute;
                content: '';
                border:1px solid #E8E8E8;
                left: 0;
                bottom: 0;
                width: 100%;
            }
            &:last-child {
                border: none;
            }
            .avatar {
                width: 3.5rem;
                flex: 1;
                display: flex;
                line-height: 3.5rem;
                align-items: center;
                justify-content: center;
                img {
                    width: 2rem;
                    height: 2rem;
                }
            }
            .info {
                flex: 6;
                color: #fff;
                .music-name {
                    font-size: 1.2rem;
                }
            }
            .delete {
            flex: 1;
            text-align: center;
            line-height: 3.5rem;
            }
        }
    }
}
@media screen and(min-width: 769px) {
    .listen-list {
        width: 460px;
        margin: 0 auto;
        .mask {
            width: 460px !important;
        }
    }
}
</style>
