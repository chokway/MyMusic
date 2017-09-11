<template>
  <div id="app">
    <v-header ></v-header>
    <router-view></router-view>
    <v-footer></v-footer>

    <v-personal></v-personal>
    <transition name="foldIn">
      <v-play v-show="showPlay"></v-play>
    </transition>
  </div>
</template>

<script>
import header from '@/components/header/header'
import personal from '@/components/personal/personal'
import footer from '@/components/footerbar/footerbar'
import play from '@/components/play/play'

import { mapGetters } from 'vuex'

import api from './api/api'
export default {
  name: 'app',
  components: {
    'v-header': header,
    'v-personal': personal,
    'v-footer': footer,
    'v-play': play,
  },
  created() {
    if(! this.audioUrl) {
      api.MusicUrl(this.audio[0].id)
        .then(res => {
          this.$store.dispatch('setAudioUrl', res.data[0].url)
        })
    }
    this.$store.dispatch('getMusicInfo', this.audio[0].id)
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'showPersonal',
      'showPlay',
      'audio',
      'audioUrl',
      'showPlayLoading'
    ])
  },
}
</script>

<style>
@font-face {
  font-family: 'iconfont';  /* project id 324940 */
  src: url('//at.alicdn.com/t/font_324940_865o9211nz22csor.eot');
  src: url('//at.alicdn.com/t/font_324940_865o9211nz22csor.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_324940_865o9211nz22csor.woff') format('woff'),
  url('//at.alicdn.com/t/font_324940_865o9211nz22csor.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_324940_865o9211nz22csor.svg#iconfont') format('svg');
}
.iconfont{
  font-family: iconfont;
  font-style: normal;
  font-size: 20px;
  color: #fff;
}
/**
 * Eric Meyer's Reset CSS v2.0 (http://meyerweb.com/eric/tools/css/reset/)
 * http://cssreset.com
 */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header,
menu, nav, output, ruby, section, summary,
time, mark, audio, video, input {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-weight: normal;
    font-style: normal;
    vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, menu, nav, section {
    display: block;
}

body {
    line-height: 1;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

/* custom */
a {
    color: #bbb;
    text-decoration: none;
    -webkit-backface-visibility: hidden;
}

li {
    list-style: none;
}

input,botton {
  outline: none;
}

html, body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #000;
    font-family: "楷体","楷体_GB2312","Microsoft YaHei",微软雅黑,sans-serif;
}

body {
    -webkit-text-size-adjust: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.foldIn-enter-active, .foldIn-leave-active {
  transition: all .5s ease-in;
}

.foldIn-enter, .foldIn-leave-active {
  transform: translateY(90%);
}
</style>
