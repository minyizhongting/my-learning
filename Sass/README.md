# Sass (Syntactically Awesome StyleSheets)

ps: 参考文档及阮一峰大神的blog，整理的笔记^_^。<br>
Sass是对CSS的扩展，让CSS语言更强大、优雅。它允许你使用变量、嵌套规则、 mixins、导入等众多功能，并且完全兼容CSS语法。

## 语法

Sass有两种后缀名文件。

* `.scss`：和平时写的css文件格式差不多，使用大括号和分号。SCSS理解大多数CSS hacks以及浏览器专属语法，例如IE古老的filter语法。本文使用的是.scss文件。

* `.sass`：以严格的缩进式语法规则来书写。它不使用大括号和分号，而是通过缩排的方式来表达选择符的嵌套层级，用换行符来分隔属性。 

## 安装
Sass是用Ruby写的，需先安装Ruby，再安装Sass。<br>

1. 先下载并安装ruby，安装时勾选Add Ruby executables to your PATH这个选项，添加环境变量，不然以后使用编译软件时会提示找不到Ruby环境。<br>

2. 安装完ruby后，在开始菜单找到ruby，打开Start Command Prompt with Ruby。

3. 直接在命令行输入：gem install sass。等一会儿就会提示Sass安装成功。

4. 由于国内网络原因，导致rubygems.org存放在Amazon S3上面的资源文件间歇性连接失败。可通过source命令来配置源，先移除默认的https://rubygems.org 源：
    ```
    gem source --remove https://rubygems.org/
    ```
  
    然后添加淘宝的源https://ruby.taobao.org/ ：
    ```
    gem source -a https://ruby.taobao.org/
    ```
    
    输入gem sources -l查看当前使用的源是哪个，然后输入Sass安装命令gem install sass即可。
    ```
    gem sources -l

    gem install sass
    ```
    
    最后使用版本查看命令确保安装成功。
    ```
    sass -v
    ```

## 使用

SASS文件就是普通的文本文件，里面可以直接使用CSS语法。文件后缀名是.scss。

如下命令，可以在cmd窗口上显示.scss文件转化的css代码。
```
sass test.scss
```

若要将显示结果保存成文件，后面再跟一个.css文件名。
```
sass test.scss test.css
```

SASS提供四个编译风格的选项。

* `nested`: 嵌套所进的css代码，它是默认值。<br>
* `expanded`：没有缩进的、扩展的css代码。<br>
* `compact`：简洁格式的css代码。<br>
* `compressed`：压缩后的css代码。<br>

生产环境中，一般使用最后一个选项。
```
sass test.sass test.css --style compressed
```

也可以让Sass监听某个文件或目录，一旦源文件有变动，就自动生成编译后的版本。
``` 
// watch a file

sass --watch input.scss:output.css

// watch a directory

sass --watch app/src:app/dist

```


## 基本用法

#### ** 变量

Sass允许使用变量，变量以$开头。
```
$yellow: #fabe00;

div {
    color: $yellow;
}
```

若变量需要嵌在字符串中，则需要写在#{}之中。
```
$side: left;
span {
    border-#{$side}-top-radius: 5px;
}
```

#### ** 计算功能

Sass允许在代码中使用算式。
```
$var: 20px;
div {
    margin: (30px/2);
    top: 50px + 100px;
    right: $var * 1.5;
}
```

#### ** 嵌套

Sass允许选择器嵌套。
```
div a {
    color: red;
}
```

可以写成如下：
```
div {
    a {
        color: red;
    }
}
```

属性也可以嵌套，例如border-width，注意border属性后面必须加上`冒号`。
```
a {
    border: {
        width: 1px;
        style: solid;
        color: red;
    }
}
```

一般情况下，Sass在解开一个嵌套规则时，会把父选择器(div)通过一个空格连接到子选择器(a)的前面形成(div a)。但有些情况，不希望使用这种后代选择器的方式生成这种连接。<br>

嵌套的代码块内，可以使用&引用父元素。例如a:hover伪类。<br>
&是一个特殊的sass选择器，即父选择器。当包含父选择器标识符的嵌套规则被打开时，它不会像后代选择器那样进行拼接，而是&被父选择器直接替换。<br>

```
a {
    &:hover { color: red; }
}
```

也可以在父选择器之前添加选择器。
```
a {
    body.ie &{ color: green; }
}
```

#### ** 注释
Sass有三种注释风格。
* 标准css注释 /\* comment \*/，其内容会保留到编译后的文件中。
* 单行注释 // comment，其内容不会出现在编译后的文件中。
* 重要注释 /! /，一般放置css文件版权说明等信息。

## 代码重用

#### ** 继承
Sass允许选择器继承，即一个选择器可以继承另一个选择器定义的所有样式。
```
.classA {
    background-color: red;
}

.classB {
    @extend .classA;
    color: #fff;
}

```

#### ** 混合器
混合器使用@mixin标识符定义，可以实现样式的重用。<br>
可以给参数指定默认值，参数默认值使用$name: default-value的形式。<br>
声明的@mixin通过@include来调用。<br>

判断一组属性是否应该组合成一个混合器，一条经验法则就是你能否为这个混合器想出一个好的名字。若不能，这时构造一个混合器可能并不适合。<br>

```
@mixin nav-tab() {
    font-size: 18px;
    line-height: 24px;
}

@mixin nav-tab($fs, $lh: 24px) {
    font-size: $fs;
    line-height: $lh;
}

@mixin nav-tab($fs, $lh) {
    font-size；$fs;
    line-height: $lh;
}
```

在样式表中通过@include来使用这个混合器，@include会把混合器中的所有样式提取出来放在@include被调用的地方。
```
@include nav-tab;
@include nav-tab(18px);
@include nav-tab(18px, 24px);
```

#### ** 颜色函数
Sass提供了一些内置的颜色函数，以便生成系列颜色。
```
lighten(#cc3, 10%)  // #d6d65c
darken(#cc3, 10%)   // #a3a329
grayscale(#cc3)     // #808080
complement(#cc3)    // #33c
```

#### ** 插入文件
@import命令，用来插入外部文件。
```
@import "path/a.scss";
@import "path/b.css";
```

若插入的是.css文件，等同于css的import命令。
```
@import "path/a.scss";
@import "path/b.css";
```

## 高级用法

#### ** 条件语句
@if可以用来判断，配套还有@else指令。
```
p {
    @if 1 < 2 {
        color: red;
    } @else {
        color: green;
    }
}
```

#### ** 循环语句
@for循环。
```
@for $i from 1 to 10 {
    .border-#{$i} {
        border: #{$i} solid blue;
    }
}
```

@while循环。
```
$i: 6;

@while $i > 0 {
    .item-#{$i} { width: 2px * $i; }
    $i: $i - 2;
}

```

#### ** 自定义函数
Sass允许用户编写自己的函数。
```
@function double($n) {
    @return $n * 2;
}

div {
    width: double(5px);
}
```