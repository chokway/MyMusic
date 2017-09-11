<template lang="html">
  <div class="recommend">
    <v-banner :image="image"></v-banner>
    <v-popular></v-popular>
  </div>
</template>

<script>
import banner from '@/components/banner/banner'
import popular from '@/components/popular/popular'
export default {
  components: {
    'v-banner': banner,
    'v-popular': popular
  },
  data() {
    return {
        image: [
            'http://p1.music.126.net/mbRxUqCs_6EeFeKkyw0Z8A==/19151293532940624.jpg',
            'http://p1.music.126.net/U0sEPM5E1D0Q0ZQxrhh65g==/18532268488212334.jpg',
            'http://p1.music.126.net/wVVVi0-fXuSkwh-W0ypUNA==/19116109160858845.jpg',
            'http://p1.music.126.net/QQfToiIhH10VDisFIrH-vA==/19065531625970905.jpg',
            'http://p1.music.126.net/FIF6LFp39gap8-QFGQkShg==/18800549325378652.jpg'
        ],
        fixed: false
    }
},
mounted() {
    let audioDOM = document.querySelector('audio')
        audioDOM.addEventListener('loadedmetadata', () => {
            this.$store.dispatch('setPlaying', true)
            this.$store.dispatch('getMusicTime', audioDOM.duration)
        })
}
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>