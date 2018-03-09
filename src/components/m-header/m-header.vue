<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Panda Music</h1>
    <router-link to="/user" class="mine" tag="div">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 7px
      width: 34px
      height: 28px
      margin-right: 0.22rem
      bg-image('logo')
      background-size: 34px 28px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 18px
        color: $color-theme
</style>
