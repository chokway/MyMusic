<template>
    <div class="music-list">
        <div class="list-item" v-for="(item, index) in musicLists" :key="item.value">
            <div class="avatar" @click="_play(item)">
                <img :src="item.al.picUrl" alt="">
            </div>
            <div class="info" @click="_play(item)">
                <div class="music-name">{{item.name}}</div>
                <div class="singer">{{item.ar[0].name}}</div>
            </div>
            <div class="operation" @click="showOperation(index)"><i class="iconfont">&#xe6a2;</i></div>
            <animation-menu :item="item" :index="index"></animation-menu>
        </div>
    </div>
</template>

<script>
import animationMenu from '@/components/animationMenu/animationMenu'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import api from '../../api/api'
export default {
    components: {
        animationMenu,
    },
    props: {
        musicLists: Array
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'listenLists',
        ])
    },
    methods: {
        _play(music) {
            this.$store.dispatch('setPlaying', false)
            this.$store.dispatch('setAudio', music)
            //查找试听列表中有没有点击中的歌
            let x = this.listenLists.findIndex((item) => {
                //判断是否是搜索列表里的(搜索结果字段不一样)
                if(item.ar && music.ar) {
                    return item.name == music.name && item.ar[0].name == music.ar[0].name
                } else if(item.artists && music.artists) {
                    return item.name == music.name && item.artists[0].name == music.artists[0].name
                }
            })
            if(x === -1) {
                this.$store.dispatch('addListenLists', music)
            }
            if (music.mp3Url) {
                this.$store.dispatch('setAudioUrl', music.mp3Url)
            } else {
                api.MusicUrl(music.id)
                    .then(res => {
                        this.$store.dispatch('setAudioUrl', res.data[0].url)
                    })
            }
        },
        showOperation(index) {
            for (let i = 0; i < this.musicLists.length; i++) {
                if (i !== index) {
                    this.musicLists[i].menuShow = false
                }
            }
            this.musicLists[index].menuShow = !this.musicLists[index].menuShow
        },
    },
    watch: {
        musicLists() {
            for (let item of this.musicLists) {
                Vue.set(item, 'menuShow', false)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.music-list {
    background: #28224e;
    position: relative;
    .list-item {
        position: relative;
        height: 1.93rem;
        border-bottom: 1px solid #3c3662;
        display: flex;
        align-items: center;
        cursor: pointer;
        color: #fff;
        &:last-child {
            border-bottom: none;
        }
        .avatar {
            width: 1.33rem;
            height: 1.33rem;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 .2rem 0 .33rem;
            img {
                width: 100%;
            }
        }
        .info {
            flex: 1;
            white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
            .music-name {
                font-size: .43rem;
                font-weight: bold;
                vertical-align: middle;
            }
            .singer {
                font-size: .32rem;
                color: #777686;
                line-height: .53rem;
            }
        }
        .operation {
            width: 1.33rem;
            height: 100%;
            line-height: 1.93rem;
            text-align: center;
        }
    }
}
@media screen and(min-width: 769px) {
    .list-item {
        .info {
            .music-hot {
                .icon {
                    font-size: 14px !important;
                }
            }
        }
    }
}
</style>
