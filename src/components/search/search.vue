<template>
    <div class="search">
        <div class="head">
            <div class="h-icon" @click="back" v-if="!show"><i class="iconfont">&#xe61c;</i></div>
            <div class="h-icon" @click="_show()" v-else><i class="iconfont">&#xe61c;</i></div>
            <div class="input">
                <input type="text" v-model="keywords" placeholder="搜索音乐、歌手">
            </div>
            <div class="h-icon" @click="search()"><i class="iconfont">&#xe660;</i></div>
        </div>
        <div class="search-list">
            <v-music-list :music-lists="searchLists" v-if="show"></v-music-list>
            <div class="hot-key" v-else>
                <div class="title">热门搜索</div>
                <div class="hot-list">
                    <ul>
                        <li v-for="item in hotList" @click="search(item)" :key="item.value">{{item}}</li>
                    </ul>
                </div>
                <div class="search-history">
                    <transition-group name="slide"
                                      tag="div"
                                      class="list-wrapper">
                        <div class="item" v-for="(item, index) in searchHistory" :key="'a'+index">
                            <p @click="search(item)">
                                <i class="iconfont">&#xe64f;</i>
                                <span>{{item}}</span>
                            </p>
                            <div class="delete" @click="_delete(index)"><i class="iconfont">&#xe621;</i></div>
                      </div>
                    </transition-group>
                </div>
            </div>
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
            show: false,
            keywords: '',
            searchLists: [],
            hotLists: ['爱在记忆中找你','吴哥窟','可乐','想对你说','故乡的原风景','成全','给你们','Fade','I Am You','倾城','林峯','毛不易','王嘉尔','林俊杰','周杰伦'],
            searchHistory: localStorage.searchHistory ? JSON.parse(localStorage.searchHistory) : ['梁朝伟', '女儿情', '阿楚姑娘']
        }
    },
    created() {
        if (!localStorage.searchHistory) {
            let searchHistory = ['梁朝伟', '女儿情', '阿楚姑娘']
            localStorage.searchHistory = JSON.stringify(searchHistory)
        }
    },
    computed: {
        hotList() {
            let s = new Set()
            for(let i = 0; i < 6; i++) {
                let arrIndex = Math.floor(Math.random()*this.hotLists.length)
                s.add(this.hotLists[arrIndex])
            }
            return [...s]
        },
        searchHistorys() {
            return localStorage.searchHistory ? JSON.parse(localStorage.searchHistory) : ['梁朝伟', '女儿情', '阿楚姑娘']
        }
    },
    methods: {
        back() {
            window.history.back()
        },
        _show() {
            this.show = false
        },
        search(keywords) {
            this.show = true
            if (this.keywords) {
                localStorage.searchHistory = JSON.stringify([this.keywords, ...JSON.parse(localStorage.searchHistory)])
            }
            let searchHistory = JSON.parse(localStorage.searchHistory)
            let find = searchHistory.findIndex((val) => {
                return val === keywords
            })
            find === -1 ? localStorage.searchHistory = JSON.stringify([keywords, ...searchHistory]) : ''
            this.searchLists = []
            let key = keywords ? keywords : this.keywords
            api.MusicSearch(key)
                .then(res => {
                    console.log(res)
                    this.searchLists = res.result.songs
                })
        },
        _delete(index) {
            let searchHistory = JSON.parse(localStorage.searchHistory)
            searchHistory.forEach((item, sindex) => {
                index === sindex ? searchHistory.splice(index, 1) : ''
            })
            localStorage.searchHistory = JSON.stringify(searchHistory)
            this.searchHistory.splice(index, 1)
        }
    }
}
</script>

<style lang="scss" scoped>
.search {
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 333;
    position: absolute;
    .head {
        height: 4rem;
        line-height: 4rem;
        text-align: center;
        background: #555555;
        display: flex;
        justify-content: space-between; // box-shadow: 0 10px 20px rgba(0, 0, 0, .8);
        border-bottom: 1px solid rgba(255, 255, 255, .3);
        .h-icon {
            width: 3rem;
            cursor: pointer;
            .iconfont {
                font-size: 1.4rem;
            }
        }
        .input {
            flex: 1;
            input {
                width: 100%;
                box-sizing: border-box;
                border: none;
                outline: none;
                height: 60%;
                margin-top: .27rem;
                background: rgba(0, 0, 0, .4);
                color: #fff;
                font-size: 1rem;
                padding: 0 .4rem;
                border-radius: .67rem;
            }
        }
    }
    .search-list {
        flex: 1;
        overflow: auto;
        overflow-x: hidden;
        background: #000;
        .hot-key {
            color: rgba(255, 255, 255, .7);
            padding: 1.3rem;
            .title {
                font-size: 1rem;
                line-height: 1rem;
                margin-bottom: 1rem;
            }
            .hot-list {
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    li {
                        padding: .13rem .35rem;
                        font-size: 1.3rem;
                        color: rgba(255, 255, 255, .9);
                        border: 1px solid rgba(255, 255, 255, .3);
                        margin-right: .8rem;
                        border-radius: .8rem;
                        margin-bottom: .8rem;
                        cursor: pointer;
                        &:first-child {
                            border-color: #eb234a;
                        }
                    }
                }
            }
            .search-history {
                flex: 1;
                overflow: auto;
                .item {
                    display: flex;
                    justify-content: space-between;
                    height: 3rem;
                    line-height: 3rem;
                    padding-left: .2rem;
                    border-bottom: 1px solid rgba(255, 255, 255, .1);
                    font-size: 1rem;
                    color: #fff;
                    cursor: pointer;
                    p {
                        flex: 1;
                        .iconfont {
                            font-size: 1rem;
                            vertical-align: middle;
                        }
                        span {
                            vertical-align: middle;
                        }
                    }
                    .delete {
                        width: 1.33rem;
                        text-align: right;
                        box-sizing: border-box;
                        padding-right: .27rem;
                        .iconfont {
                          font-size: 1rem;
                        }
                    }
                    // &.slide-move {
                    //     transition: all 1s ;
                    // }
                    // &.slide-enter {
                    //     transform: translate3d(-100%,0, 0);
                    //     opacity: 0;
                    // }
                    // &.slide-leave-active {
                    //     position: absolute;
                    //     transform: translate3d(-100%, 0, 0);
                    // }
                }
            }
        }
    }
}
</style>
