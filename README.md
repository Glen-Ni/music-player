# 音乐播放器（未完工）
## 待完成
1. list
   1. list点击弹出动画
   2. 界面和点击交互
2. 歌词

## 要点
1. 自己设计了简单的界面
2. 首次体验html的audio相关api
   
## 遇到问题
1. audio.autoplay 似乎在新版的chrome中被禁用了
2. border-box如果设置padding或者border会对line-height居中方法造成影响。解决方法：加个盒子，padding、border设置在外盒子
3. audio duration要在audio.oncanplay之后才能获取，加载阶段都是NaN