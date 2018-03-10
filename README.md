# 基于vue的移动端音乐 WebApp

👉 慕课网学习地址: [http://coding.imooc.com/class/107.html](http://coding.imooc.com/class/107.html)

基于 **Vue 全家桶 (2.x)**  制作的移动端音乐 WebApp ，项目完整、功能完备、UI美观、交互一流。

## 技术栈

【前端】

- `Vue`：用于构建用户界面的 MVVM 框架。它的核心是**响应的数据绑定**和**系统组件**
- `vue-router`：为单页面应用提供的路由系统，项目上线前使用了 `Lazy Loading Routes` 技术来实现异步加载优化性能
- `vuex`：Vue 集中状态管理，在多个组件共享某些状态时非常便捷
- `vue-lazyload`：第三方图片懒加载库，优化页面加载速度
- `better-scroll`：iscroll 的优化版，使移动端滑动体验更加流畅
- `Stylus`：css 预编译处理器
- `ES6`：ECMAScript 新一代语法，模块化、解构赋值、Promise、Class 等方法非常好用

【后端】

- `Node.js`：利用 Express 起一个本地测试服务器
- `jsonp`：服务端通讯。抓取 QQ音乐(移动端)数据
- `axios`：服务端通讯。结合 Node.js 代理后端请求，抓取 QQ音乐(PC端)数据

【自动化构建及其他工具】

- `vue-cli`：Vue 脚手架工具，快速初始化项目代码
- `eslint`：代码风格检查工具，规范代码书写

## 功能分析与设计

**路由结构**

- 推荐歌单页面
- 歌手列表页面
- 排行榜页面
- 歌曲搜索页面
- 播放器页面
- 个人中心页面

### 推荐歌单页面

![推荐页面](https://github.com/zhanght9527/vue-music/blob/master/src/common/image/recommend.jpg)
![推荐页面](https://github.com/zhanght9527/vue-music/blob/master/src/common/image/recommendDetail.jpg)

上面是一个轮播图组件，使用better-scroll第三方库辅助实现，图片和链接使用jsonp抓取qq音乐的数据

下面是歌单推荐列表，使用node.js反向代理伪造header实现，通过封装好的scroll组件进行滑动交互

### 歌手列表页面

![歌手页面](https://github.com/zhanght9527/vue-music/blob/master/src/common/image/singer.jpg)
![歌手页面](https://github.com/zhanght9527/vue-music/blob/master/src/common/image/singerDetail.jpg)

类似一个通讯录的UI设计，通过计算每个区块的高度，使用better-scroll的scrollToElement方法移动至对应的首字母所在区块,同时进行左右联动

使用 `jsonp` 抓取 qq音乐歌手数据并重组 JSON 数据结构

使用 `vuex` 进行集中管理歌手的状态

### 排行榜页面

![排行榜页面](https://github.com/zhanght9527/vue-music/blob/master/src/common/image/rank.jpg)
![排行榜页面](https://github.com/zhanght9527/vue-music/blob/master/src/common/image/rankDetail.jpg)

同样使用`jsonp`抓取qq音乐的线上排行榜数据

排行榜详情页面复用歌手详情页面

### 歌曲搜索页面

![搜索页面](https://github.com/zhanght9527/vue-music/blob/master/src/common/image/search.jpg)
![搜索页面](https://github.com/zhanght9527/vue-music/blob/master/src/common/image/searchDetail.jpg)

使用`vue`的`watch`实时监听输入框的变化，发送请求抓取qq音乐的搜索数据

可上拉刷新下一页搜索数据

考虑到移动端键盘占屏的问题，对滚动前的 `input` 做了 `blur()` 操作

搜索记录存在`localstorge`中，来做到刷新页面不会消失

### 播放器页面

![播放器页面](https://github.com/zhanght9527/vue-music/blob/master/src/common/image/player.jpg)
![播放器页面](https://github.com/zhanght9527/vue-music/blob/master/src/common/image/lyric.jpg)
![播放器页面](https://github.com/zhanght9527/vue-music/blob/master/src/common/image/bottom-player.jpg)

整个项目的核心组件，用 `vuex` 管理各种播放时状态，播放、暂停等功能调用 [audio标签api](http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp)

组件的动画效果使用第三方库`create-keyframe-animation`创建调用

歌词数据的获取利用 `axios` 代理后端请求，伪造 `headers` 来实现，先将歌词 jsonp 格式转换为 json 格式，再使用第三方库 [`js-base64`](https://github.com/dankogai/js-base64) 进行 Base64 解码操作，最后再使用第三方库 [`lyric-parser`](https://github.com/ustbhuangyi/lyric-parser)对歌词进行格式化

左右滑动可切换唱片封面和歌词

最小化后的播放器中的圆形进度条使用`svg`标签中的`stroke-dasharray`属性和`stroke-dashoffset`结合使用实现

可显示当前的歌曲播放列表，不同地方点进去可显示不同的歌曲列表，同时可添加/删除歌单中的歌曲，并可点击喜欢按钮将其添加到`我喜欢`的列表

### 个人中心页面

![个人中心页面](https://github.com/zhanght9527/vue-music/blob/master/src/common/image/mine.jpg)

将 `localstorage` 中 “我的收藏” 和 “最近播放” 显示到界面上

## 碰到的一些坑

#### iOS 微信里点击不能播放歌曲了，PC 可以

原因：vue升级到2.5之后，nextTick的核心实现改变导致对audio的播放的影响，参照黄轶老师的文章[Vue.js 升级踩坑小记](https://juejin.im/post/5a1af88f5188254a701ec230)

解决方法：将vue的版本固定在2.4.1，同时vue-template-compiler的版本也要和vue的版本保持一致。

#### 异步获得的数据还没有拿到就显示出来

原因：不同于老师的源码，歌曲播放url是通过songmid、vkey、guid拿到的，最后返回的是一个Promise对象，不能直接继续进行同步操作。

解决方法：使用`await`关键字

```
_normalizeSongs (list) {
  let p = new Promise(resolve => {
    let ret = []
    list.forEach(musicData => {
      (async () => {
        if (musicData.songid && musicData.albummid) {
          const p = await this.createSongP(musicData)
          ret.push(p)
        }
        if (ret.length === perpage) {
          resolve(ret)
        }
      })()
    })
  })
  return p
},
createSongP (musicData) {
  return createSong(musicData).then(res => {
    return Promise.resolve(res)
  })
}
```

## 收获

1. 总结了一套 Vue 通用组件，可以在其它项目中复用的 10+ 个基础组件、15+ 个业务组件
2. 总结了一套常用的 Stylus mixin 库
3. 总结了一套常用的 JS 工具函数库
4. 体会到组件化、模块化开发带来的便捷
5. 体会到将对象封装成类(ES6 class) 的便捷性，以及利用工厂方式初始化类实例
6. 学会利用 `js` 编写过渡效果及动画效果制作良好的用户交互体验


## Build Setup

``` bash
# clone the repo into your disk.
$ git clone https://github.com/bxm0927/music-app.git

# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ npm run dev

# build for production with minification
$ npm run build
```
