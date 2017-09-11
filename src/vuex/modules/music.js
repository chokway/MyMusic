import api from '../../api/api'
import * as types from '../types'

const state = {
    popularLists: [],
    classicalLists: [],
    lightLists: [],
    radioLists: [],
    listenLists: localStorage.musiclists ? JSON.parse(localStorage.musiclists) : [
      {
        name: "可乐",
        id: 29759733,
        url: "http://m10.music.126.net/20170911103412/489017ed2da9661543066ef9e933fdbd/ymusic/a530/f2cc/c82e/b8b5b240d9fce9ac549b3649464926a9.mp3",
        ar: [
          {
            id: 1038040,
            name: "赵紫骅",
          }
        ],
        al: {
          id: 3056891,
          name: "赵浴辰原创demo精选",
          picUrl: "http://p1.music.126.net/qOfVT6izV4mBe4IyQn489Q==/18190320370401891.jpg",
        }
      },
      {
        name: "爱的故事(上)",
        id: 147030,
        url: "http://m10.music.126.net/20170908173621/548ef8ea443b86f588ae7dc3a57f980e/ymusic/9b2e/6082/d139/3e5b1e9d57c61a5ed494dce0ad069cd4.mp3",
        ar: [
          {
          id: 4947,
          name: "孙耀威",
          }
        ],
        al: {
          id: 14707,
          name: "爱的故事(上集)",
          picUrl: "http://p1.music.126.net/xKKcN1WJZwqKk1VBZhtMvA==/67070209310501.jpg",
        }
      },
      {
        name: "阿楚姑娘",
        id: 407759451,
        url: "http://m10.music.126.net/20170908173655/e6a1158bdf6a8e8ff93a3b13d0cefd7c/ymusic/02ed/0616/a292/dfeece1ca78cc375e37fe9c1fc95c36a.mp3",
        ar: [
          {
          id: 4213,
          name: "梁凡",
          }
        ],
        al: {
          id: 34594188,
          name: "阿楚姑娘",
          picUrl: "http://p1.music.126.net/XxKhyage6x5cOvYAT30nKQ==/17680146974797288.jpg",
        },
      },
      {
        name: "想对你说",
        id: 26075534,
        url: "http://m10.music.126.net/20170908173736/eb5061a302eea0db47fd1958a1a6cb65/ymusic/3cae/2d94/5d00/1595b4e7846a1631374ff848dba82bc3.mp3",
        ar: [
          {
            id: 6066,
            name: "杨宗纬",
          }
        ],
        al: {
          id: 2321001,
          name: "初·爱",
          picUrl: "http://p1.music.126.net/LvDBXsBEuGK-ZNVs3XmRVg==/7926379325753599.jpg",
        },
      },
      {
        name: "再见二丁目",
        id: 316938,
        url: "http://m10.music.126.net/20170908173753/43236451d00e69db89e9018b275dbab7/ymusic/1dff/aea7/bfef/83cd887ff1f38b99c2a2253b139e8d8c.mp3",
        ar: [
          {
            id: 10204,
            name: "杨千嬅",
          }
        ],
        al: {
          id: 31386,
          name: "Miriam's Melodies",
          picUrl: "http://p1.music.126.net/afjQwekhKMBiLOOQz56TLA==/7836219371362214.jpg",
        },
      }
    ],
    audio: localStorage.musiclists ? JSON.parse(localStorage.musiclists).slice(0, 1) : [{
      name: "再见二丁目",
      id: 316938,
      url: "http://m10.music.126.net/20170908173753/43236451d00e69db89e9018b275dbab7/ymusic/1dff/aea7/bfef/83cd887ff1f38b99c2a2253b139e8d8c.mp3",
      ar: [
        {
          id: 10204,
          name: "杨千嬅",
        }
      ],
      al: {
        id: 31386,
        name: "Miriam's Melodies",
        picUrl: "http://p1.music.126.net/afjQwekhKMBiLOOQz56TLA==/7836219371362214.jpg",
      },
    }],
    audioUrl: '',
    lyric: '',
    size: '',
    playing: false, // 是否正在播放
}

const actions = {
    //添加到试听列表
    addListenLists({ commit }, music) {
        commit(types.ADD_LISTEN_LISTS, music)
    },
    removeListenLists({ commit }) {
        commit(types.REMOVE_LISTEN_LISTS)
    },
    addAllToListenLists({ commit }, musiclists) {
        commit(types.ADD_ALL_TO_LISTEN_LISTS, musiclists)
        // commit(types.SET_AUDIO, musiclists[0])
    },
    getPopularLists({ commit }) {
        if (localStorage.popularmusics !== '[]' && localStorage.popularmusics) {
            setTimeout(() => {
                commit(types.GET_POPULAR_LISTS, JSON.parse(localStorage.popularmusics))
            }, 500)
            return;
        }
        api.PopularList()
            .then(res => {
                commit(types.GET_POPULAR_LISTS, res.playlist.tracks)
                localStorage.popularmusics = JSON.stringify(res.playlist.tracks.slice(0, 30))
            })
    },
    //设置此时播放的音乐
    setAudio({ commit }, music) {
        commit(types.SET_AUDIO, music)
    },
    //设置播放的音乐url
    setAudioUrl({ commit }, url) {
        commit(types.SET_AUDIO_URL, url)
    },
    //上一曲
    setNextAudio({ commit }, index) {
        commit(types.SET_NEXT_AUDIO, index)
    },
    //下一曲
    setPreAudio({ commit }, index) {
        commit(types.SET_PREV_AUDIO, index)
    },
    //播放、暂停
    setPlaying({ commit }, status) {
        commit(types.SET_PLAYING, status)
    },
    //删除试听列表的歌曲
    deleteMusic({ commit }, index) {
        commit(types.DELETE_MUSIC, index)
    },
    //获取歌词
    getMusicInfo({ commit }, id) {
        api.MusicLyric({ id })
            .then((res) => {
                res.lrc ? commit(types.GET_MUSIC_LYRIC, res.lrc.lyric) : commit(types.GET_MUSIC_LYRIC, '')
            })
    },
    //歌曲总时间
    getMusicTime({ commit }, size) {
        commit(types.GET_MUSIC_TIME, size)
    }
}

const getters = {
    listenLists: state => state.listenLists,
    audio: state => state.audio,
    audioUrl: state => state.audioUrl,
    playing: state => state.playing,
    lyric: state => state.lyric,
    size: state => state.size
}

const mutations = {
    [types.ADD_LISTEN_LISTS](state, music) {
        state.listenLists.push(music)
        localStorage.musiclists = JSON.stringify(state.listenLists)
    },
    [types.REMOVE_LISTEN_LISTS](state) {
        state.listenLists = []
        localStorage.musiclists = []
    },
    [types.ADD_ALL_TO_LISTEN_LISTS](state, musiclists) {
        state.listenLists = [...state.listenLists, ...musiclists]
        localStorage.musiclists = JSON.stringify(state.listenLists)
    },
    [types.SET_AUDIO](state, music) {
        state.audio = [music]
    },
    [types.SET_AUDIO_URL](state, url) {
        state.audioUrl = url
    },
    [types.SET_NEXT_AUDIO](state, index) {
        let i = index === state.listenLists.length - 1 ? 0 : (++index)
        state.audio = [state.listenLists[i]]
    },
    [types.SET_PREV_AUDIO](state, index) {
        let i = index === 0 ? state.listenLists.length - 1 : (--index)
        state.audio = [state.listenLists[i]]
    },
    [types.SET_PLAYING](state, status) {
        state.playing = status
    },
    [types.DELETE_MUSIC](state, index) {
        state.listenLists.splice(index, 1)
    },
    [types.GET_MUSIC_LYRIC](state, playload) {
        state.lyric = playload
    },
    [types.GET_MUSIC_TIME](state, playload) {
        state.size = playload
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
