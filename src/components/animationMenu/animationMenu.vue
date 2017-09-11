<template>
    <transition name="move">
        <div class="menu"
             v-show="item.menuShow">
            <div class="inner inner-1" @click.once="_add(index)"><i class="iconfont">&#xe605;</i></div>
            <div class="inner inner-2"><i class="iconfont">&#xe601;</i></div>
            <div class="inner inner-3"><i class="iconfont">&#xe674;</i></div>
        </div>
    </transition>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default {
    props: {
        item: Object,
        index: Number
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'listenLists'
        ])
    },
    methods: {
        _add(index) {
            let x = this.listenLists.findIndex((music) => {
                if(this.item.ar) {
                    return music.name == this.item.name && music.ar[0].name == this.item.ar[0].name
                } else {
                    if (music.ar) {
                        return music.name == this.item.name && music.ar[0].name == this.item.artists[0].name
                    } else {
                        return music.name == this.item.name && music.artists[0].name == this.item.artists[0].name
                    }
                }
            })
            if(x !== -1) {
                _.toast('试听列表中已存在')
                Vue.set(this.item, 'menuShow', false)
            } else {
                _.toast('已添加到试听列表')
                this.$store.dispatch('addListenLists', this.item)
                Vue.set(this.item, 'menuShow', false)
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.menu {
    position: absolute;
    right: 1.73rem;
    top: .59rem;
    transition: all .7s ease-in;
    &.move-enter-active {
        .inner {
            transform: translate3d(0, 0, 0);
            transition-timing-function: cubic-bezier(0, .57, .44, 1.97);
        }
        .inner-1 {
            transition-delay: .1s;
        }
        .inner-2 {
            transition-delay: .2s;
        }
        .inner-3 {
            transition-delay: .3s;
        }
    }
    &.move-enter,
    &.move-leave-active {
        .inner {
            transition-timing-function: ease-in-out;
            opacity: 0;
        }
        .inner-1 {
            transform: translate3d(.27rem, 0, 0);
            transition-delay: .3s;
        }
        .inner-2 {
            transform: translate3d(1.33rem, 0, 0);
            transition-delay: .2s;
        }
        .inner-3 {
            transform: translate3d(2.4rem, 0, 0);
            transition-delay: .1s;
        }
    }
    .inner {
        display: inline-block;
        position: absolute;
        width: .8rem;
        height: .8rem;
        line-height: .83rem;
        border-radius: 50%;
        background: rgba(255, 255, 255, .1);
        text-align: center;
        color: #fff;
        cursor: pointer;
        transition: all .4s;
    }
    .inner-1 {
        left: -.27rem;
    }
    .inner-2 {
        left: -1.33rem;
    }
    .inner-3 {
        left: -2.4rem;
    }
}
</style>
