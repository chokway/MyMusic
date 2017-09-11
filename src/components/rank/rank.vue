<template>
    <div class="search">
        <div class="head">
            <div class="h-icon" @click="back">
                <i class="iconfont">&#xe61c;</i> 
                <span class="title">{{title}}</span>
            </div>
            <div class="h-icon right-c" v-show="rankLists.length>0" @click="addAll">
                <i class="iconfont">&#xe629;</i>播放全部
            </div>
        </div>
        <div class="search-list">
            <v-music-list :music-lists="rankLists"></v-music-list>
            <div class="more"></div>
        </div>
    </div>
</template>

<script>
import musicList from '@/components/musicList/musiclist'
import { mapGetters } from 'vuex'
import api from '../../api/api'
export default {
    components: {
        'v-music-list': musicList,
    },
    data() {
        return {
            idx: 0,
            rankLists: []
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.idx = to.params.idx
        })
    },
    mounted() {
        api.MusicRank(this.idx)
            .then((res) => {
                this.rankLists = res.result.tracks
            })
    },
    computed: {
        ...mapGetters([
            'audio'
        ]),
        title() {
            switch(this.idx) {
                case 0:
                    return '云音乐新歌榜'
                case 1:
                    return '云音乐热歌榜'
                case 2:
                    return '网易原创歌曲榜'
                case 3:
                    return '云音乐飙升榜'
            }
        }
    },
    methods: {
        back() {
            window.history.back()
        },
        addAll() {
            this.$store.dispatch('addAllToListenLists', this.rankLists)
            // this.$store.dispatch('setAudioUrl', this.audio[0].mp3Url)

        },
    }
}
</script>

<style lang="scss" scoped>
.search {
    display: flex;
    flex-direction: column;
    height: 100%;
    top: 0;
    bottom: 0;
    position: fixed;
    width: 100%;
    .head {
        height: 4rem;
        line-height: 4rem;
        text-align: center;
        background: #555;
        display: flex;
        justify-content: space-between; // box-shadow: 0 10px 20px rgba(0, 0, 0, .8);
        border-bottom: 1px solid rgba(255, 255, 255, .3);
        .h-icon {
            // width: px2rem(100px);
            cursor: pointer;
            font-size: 1rem;
            color: #fff;
            .iconfont {
                display: inline-block;
                width: 3rem;
                font-size: 20px;
            }
            .title {
                display: inline-block;
                font-size: 1.3rem;
            }
        }
        .right-c {
            margin-right: 1.1rem;
            .iconfont {
                width: 2.6rem;
                font-size: 1.5rem;
                vertical-align: middle;
            }
        }
    }
    .search-list {
        flex: 1;
        overflow: auto;
        overflow-x: hidden;
        background: #000;
        .more {
            height: 4rem;
            line-height: 4rem;
            text-align: center;
            color: rgba(255,255,255,.6);
            position: relative;
            &::before {
                content: '';
                position: absolute;
                top: 2rem;
                left: 2rem;
                width: 33%;
                border-bottom: 1px solid #000;
            }
            &::after {
                content: '';
                position: absolute;
                top: 2rem;
                right: 2rem;
                width: 33%;
                border-bottom: 1px solid #000000;
            }
        }
    }
}
</style>
