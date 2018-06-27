# devProject

gulp + browser-sync + sass 便捷开发环境，用来开发简单的页面。<br>

gulp.watch监听文件变化实时刷新页面，使用gulp-ruby-sass编译sass为css文件。<br>

sass支持第二个参数用来控制压缩后的效果，其中style有以下4种选择：
*   nested：嵌套缩进，是默认值
*   expanded：每个属性占一行
*   compact：每条样式占一行
*   compressed：整个压缩成一行

命令行运行gulp或npm run dev即可。