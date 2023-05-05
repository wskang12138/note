# css

## 1. 定义

层叠样式表（cascading style sheets)，标记语言，有两部分组成：选择器和一条或多条声明。

**user agent stylesheet** 为浏览器的默认样式表，常见的一些标签都有其默认的样式表，可以通过开发者工具进行查看。通常在实际开发中会设置全局base.css 样式对网页进行初始化，如：

```css
blockquote, body, button, dd, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, hr, input, legend, li, ol, p, pre, td, textarea, th, ul {
    margin: 0;
}
```

## 2. 基础属性

### 2.1 css 选择器

###### 基础选择器

1. 标签选择器
   用 html 的标签名作为依据。

1. 类选择器
   以 class 为依据，公共部分可以进行抽取，从而实现多类进行调用，通过(.)进行定义。

1. id 选择器
   以 id 为依据，以#进行定义，只能调用一次。通常与 js 配合使用
2. 通配符选择器
   以*号定义，不需要调用，默认全局使用。一般在特定下使用

### 2.2 css 属性

###### 字体系列

font-family-- 设置字体样式，可设置多个字体，一次按顺序进行选择。

font-size--设置字体大小，谷歌浏览器默认16px，标题需要单独制定文字大小

font-weight--设定字体粗细，bold 400\normal 700\100~900

font-style--文字风格，normal\ italic

复合属性：font: font-style font-weight font-size/height font-family; 不能改变顺序；不用的属性可以省略，但font-size 和 font-family 不能省略



###### 文本属性

color: 设定文本颜色，使用十六进制或rgb（三原色）

text-align: 对齐文本，right left center

**text-decoration**: 装饰文本，underline(常用) overline line-through none(默认)

text-indent: 指定文本首行缩进，跟像素大小或em (相对单位)

line-height: 行高



###### 引入方式

根据位置可分为：内部式、内联式（行内式）、引入式（开发常用）



## 3.Emmet

一种快速生成html 或 css 的一种代码编写方式

1. 生成带标记的便签 ：标签+.id || #id

1. 自增符号 $



## 4.复合选择器

1. 后代选择器（包含选择器）body div1 { }

1. 子选择器（最近一级元素）body > div1 { }

1. 并集选择器 可以选择多组标签，并且统一为他们修改样式，常用于集体声明 eg: div , p { }

1. 伪类选择器 用于将某个选择器添加某些效果, 或选择第几个元素进行赋值 eg:   a:link { }, a: visited { } , a: hover { }, a: active { } ,
   : focus 常用于form 表单中选择焦点的元素 eg:  input:focus



## 5.元素显示模式

定义：即块元素和行内元素的区别，还有行内块元素

eg: 行内元素转换为块元素 display: block; 反过来的话： display: inline; 行内元素转换为行内块： display: inline-block

行内内容垂直居中：line-height 等于 元素盒子的高度。原理：行高等于文字高度加上文字上下的间隙高度。！！模型！！



## 6. CSS背景

background-color: 默认透明色（transparent);

background-image: url( )背景图片;

background-repeat: repeat（default） | no-repeat | repeat-x | repeat -y;

background-positon: x, y

eg: background-position: left  top --- 方位名词前后没有顺序

eg: background-position: 20px  30px || 20px top ---第一个参数必须是 x 轴

background-attachment: fixed (固定) scroll (默认滚动)

连写：background: color image repeat attachment position( 约定，实际上没有顺序) **position 和 size 只能2选一进行配置**，但可分开选择。

背景色半透明：background: rgba(0, 0, 0, .3) 看最后一个参数，0~1 透明度逐渐加强。

设置背景图片渲染位置：background-clip: content-box 、border-box(默认)、padding-box、text



## 7. CSS 三大特性

层叠性 

给同样的选择性设置同一特性的属性（样式冲突）：就近原则



继承性

子标签能继承父标签的某些样式（适合自身的）

特殊：行高可以跟单位或者不跟（font-size * 量）



优先级

当一个元素指定了多个选择器，则按权重进行选择

权重：!important(10000) >> 行内样式 (1000) >> ID 选择器(100) >> 类选择器，伪类选择器，属性选择器(10) >> 标签选择器、伪元素选择器(1) >> 继承或*或子，同胞 (0)

**继承的权重为零**，无论父类的样式权重有多大！eg: a 标签，浏览器默认指定一个蓝色颜色，待下划线的样式

复合选择器：权重会叠加

元素选择器可以进行同名叠加以增强其权重。



## 8. CSS 盒子模型

### 组成

border 边框、content 内容、padding 内边距、margin 外边距

### border

```css
border: 5px solid(实线) \ dashed(虚线) \ dotted(点线)  #ccc
```

border-collapse: collapse （合并盒子相邻边框）

不一定要是块元素才能添加边框，一些常用的行内元素如**span** 等也可以设置边框。

边框会改变盒子的大小（content-box)

其他：

```css
double: 双线边框，两条单线与其间隔和等于 border-width
groove: 3D 凹槽边框
ridge: 3D 垄状边框
inset: 凹边框
outset: 凸边框
```

### padding

padding: 5px 10px 15px 20px 顺时针授值

padding 同样也会影响盒子的大小（指定盒子大小的时候再设置padding 会撑大盒子）

如何盒子没有指定宽度和高度，则指定相应水平垂直的padding 不会撑开盒子，盒子会继承父亲的宽高



### margin

块级盒子水平居中：指定宽度，margin: auto

嵌套块元素垂直外边距会出现合并的情况，如果子元素的垂直外边距比父元素的垂直外边距大，则会带着父元素下垂

解决方案：父元素定义上边框(边框需要显示) | 父元素定义上内边距 | 父元素添加overflow:hidden (隐藏溢出)



### 盒子阴影

box-shadow: 水平位移 垂直位移 模糊距离（模糊程度） 阴影尺寸(可选，不设置则和模糊距离一样) 颜色（一般使用 rgba(）设置半透明） 顺序不能改变。

通过在水平位移前面添加inset可将阴影转变为内部阴影。也可以添加多个阴影，阴影通过逗号格外。
**盒子阴影不占用布局空间。**



文字阴影 text-shadow



## 9. CSS 浮动



网页端的布局方式：标准流、浮动、
浮动可以改变标签的默认排列形式
float：none | left | right ,盒子创建浮动属性后，会根据浮动位置选择另一块包含块或浮动块的边缘进行布局。
浮动特性：
浮动元素会脱离标准流：不再保留原先的位置
浮动元素会在一行内显示并且顶部对齐：


**具有行内块的特性**。

网页布局第一准则：父元素控制块上下位置，内部子元素采取浮动控制左右位置。

注意点：  浮动的盒子只会影响盒子后面的标准流，不会影响前面的标准流。（重点）



**清除浮动**

有时候浮动元素的父元素不需要设定高度，其高度由子元素的内容多少进行决定，但如果不设定高度，父元素会影响其后面的标准流的布局，所以要清除浮动。

```css
.clearfix:before, clearfix:after {
	content: "";
 	display: block;
}

.clearfix:after {
	clear: both;
}

.clearfix {
	*zoom: 1; //此为兼容低版本浏览器
}
```

清除浮动的方法：（策略：闭合浮动）

1. 额外标签法，构造一个空的标签，为其添加样式：clear: both;

2. 父元素设定高度

3. 父元素添加overflow 属性

4. 给父元素添加before 和 after 伪元素，伪元素内通过属性clear: both 进行清除浮动。

## 10. CSS 定位

why need use : 精确定位、固定位置——标准流和浮动都无法实现

定位组成：定位模式+位移偏量（top bottom left right)

定位分类：**（子绝父相）**

static: 默认使用的定位，相当于无定位，用标准流的方式摆放元素

**relative** 相对定位: 元素移动位置的时候是相当于原先自己的位置为参照，不脱标，原本的标准流位置依旧保存

**absolute** 绝对定位:  如果没有祖先元素或者祖先元素没有定位，那么会以浏览器为定位基准。当没有设定垂直定位（top、bottom）和水平定位（left、right），则与原文档流位置一致。

如果祖先元素有定位，则以最近的那个作为参考依据。

绝对定位会脱离标准流，不再占用原本的位置。

绝对定位不能通过margin: 0 auto 进行居中

fixed 固定定位: **固定在****浏览器可视区的某个位置**，不会随浏览器的滚动而改变。**和父元素没有关系**。固定定位不占用原本位置，脱标。



**粘性定位**：相对定位和固定定位的结合。以浏览器的可视区域作为参照点，不脱标，占有原本的位置。兼容性很差，IE 不支持



position: sticky ; top | bottom | left | right 相对位置必须添加其中的一个才有效。

注意，添加的唯一偏移量是指超过屏幕可视范围时的作用，如果在当前屏幕范围内时，



**z-index:** 用于具有相同定位属性的元素（针对**脱标的绝对定位和固定定位**来说），设定一个覆盖权重，是高权重的覆盖低权重的。默认值为auto ，按书写顺序进行叠加。数值可以为正负整数、0。



**行内元素添加了定位，便转换成块元素了**。



绝对定位和固定定位会完全压住标准流盒子，而浮动定位会压住标准流，但不会压住其中的文字。因为浮动创建的时候就是为了好让文字进行环绕其图片展示的。



## 11. 元素的显示和隐藏

1. display
   block-- 转为块元素并且显示元素、inline 、none隐藏元素 （**元素脱标**）

1. visibility :inherit继承父 **visible 可视 hidden隐藏 （没有脱标）**，继续占有原来位置

1. overflow 对溢出的部分进行显示和隐藏
   overflow：visible auto **hidden scroll**(如果有多出的部分，滚动查看）

1. :hover 伪代码的应用 后面可直接跟 其他div 的样式重新申明



## 12. CSS 高级编程

##### 精灵图

定义：将网页中的一些小图片请求整理到一张大的图片上去，从而解决过多请求服务器获取资源的压力。

使用：主要针对背景图片使用，通过background-position 将需要显示和图片移动到对应区域。需要精确确认图片的大小和位置。



##### 字体图标 iconfont

展示的是图标，本质上是文字。



##### CSS 描三角

将一个box 盒子不设定宽高，仅仅设定边框border 的值，便会呈现一个三角形。通常将需要显示三角尖的那一边设置成相应的颜色，其余三条边设置成**透明色 transparent** 便可实现，三角大小由边框粗细控制。



##### CSS 用户界面样式

1. 更改用户鼠标样式 **cursor**

2. input 轮廓线 **outline: none**

3. textarea 防止拖拽 **resize: none**

4. vertical-align: baseline top middle bottom
   常用于设置**图片或表单元素**与文字进行一个行内对齐，只针对行内或行内块元素起效。

5. 消除图片的底部空白：设置图片水平不是基线对齐；或者转换为块级元素

6. 溢出文字的省略号显示
   多行文本：有较大的兼容问题

```bash
overflow: hidden;	//隐藏溢出
white-space: nowrap; //强制一行显示，直到遇到<br> 换行符
text-overflow: ellipsis; //设置溢出文本以省略号显示，
生效的地方只能局限于单个标签，隔了父标签后不生效。如<li><p>
```

##### CSS 布局技巧

margin 负值抵消盒子边框重合问题。

通过设置相对定位relativei 进行对其他脱标定位的覆盖，或者同等定位下设置 z-index 进行层级提升



# CSS3

## transform

**translate**: 移动

transform：translate(x, y)

其移动效果不会影响其他元素的布局。用百分比作为移动距离，其参照对象为自身。

行内元素无法使用该属性。



**rotate**: 旋转

transform: rotate(度数 eg: 45deg)

**transfrom-origin**：x y 设置选择中心。可以跟方位名词或具体位置数值



**scale:** 放大或缩小

transform: scale(x, y) 参数不跟单位而是跟倍数 不影响其他元素布局。

x,y 分别指改变的宽度和高度



**skew**：倾斜

transform: skew(x, y) 将元素相对于x 轴和y 轴倾斜



## 动画

设定一个动画名词，分别写出初始和完成的元素状态。

在对应的元素里调用，animation-name: '动画名称'; animation-duration: '持续时间'

一般来说，在实现动画3D 效果的body上通过 **perspective: 800px** 实现一个透视效果。父层设置

**transform-style: preserve-3d**。



## 新增选择器

**属性选择器**

`nth-of-type` 和 `nth-child` 的区别是读取顺序，前者先确认 type 类型，再确定第几个；后面是将所有孩子进行排列后返回看类型是否匹配。

`ul li:first-child` 选择 ul 里 li 元素的第一个元素。

`ul li:nth-child(n)` 可选择 ul 里 li 元素的第 n 个元素。

n 可以为数字、关键字（odd 单 | even 偶)或公式。



伪元素选择器是通过 css 生成一个新的标签元素

常用伪元素插入一个 iconfont 标签，或一些页面上需要大量使用到的修饰性内容。伪元素的 css 编写需要紧挨非伪元素标签来写。



**类选择器、属性选择器、伪类选择器** **权重都为10**

## 渐变

线性渐变

```css
不指定方向，默认从上往下渐变，渐变颜色可以多种，不用角度表示方向的话需要用to 进行方向指示。拥有私有前缀的则不用。
linear-gradient(to 结束方向，...颜色)；
```

径性渐变

```css
radial-gradient(shape size at position, start-color, ..., last-color);
shape: ellipse 椭圆 circle 圆形
size: 渐变大小
position: 渐变起始位置，可以用百分比代表x y 轴起始点。
```

## 其他特性

filter 滤镜: 

blur(*) 页面模糊化

grayscale() 页面灰白化 

contrast 页面对比度

**calc 可以让 css 数值进行一个计算 eg: width：calc(80%-80px)**



CSS3 过渡

谁做过渡给谁加，运动曲线一般用默认(慢-块-慢）ease, 匀速 linear 和 cubic-bezier(*n*,*n*,*n*,*n*)

```css
transition: all .3s linear;
```

# CSS 随笔

 css 变量 

css 变量一定要以**双横杠**开头。用于避免冲突。

```css
:root {
  --b-padding: 5px;
  --b-color: #fff;
}

div {
  padding: var(--b-padding);
  color: var(--b-color);
}
```

## 盒子高度随方向延申

通过绝对定位设置！

```css
.a {
  position: relative;
}
.b {
  position: absolute;
  bottom: 0;
  width: 200px;
  height: 200px;
  background-color: antiquewhite;
}
<div class="a">
  <div class="b"></div>
</div>
```

## Point-event: none

元素添加该属性，不会阻挡事件的交互。常作用在蒙层。

## 隐藏滚动条

```css
// 火狐
scrollbar-width: none;

// webkit
# ::-webkit-scrollbar { width: 0;height: 0 } 
# ::-webkit-scrollbar { display: none } 
 
```

## 空格占位

- &nbsp；半角的不断性的空白格（推荐使用）
- ```&ensp```;半角的空格
- ```&emsp```;全角的空格

## fixed 定位不以窗口作为参考

https://blog.csdn.net/qdmoment/article/details/106772863

因为目标父元素产生了自身的上下文。

1. 当父元素存在 transform 位移时，transform 不为 none 则会产生新的上下文，导致子元素的 fixed 以父元素作为参考。
2. transform 不为 none
3. 设置了 transform-style: preserve-3d
4. perspective 值不为 none
5. will-change 赋予了 css 属性
6. contain: paint
7. filter 或 backdrop-filter 不为 none

## 有效 css 选择器

css中有效的类名需要满足以下条件：

- 有效名称应以下划线 (_)、连字符 (-) 或字母 (a-z)/(A-Z) 开头，后跟任何数字、连字符、下划线、字母。
- **不能以数字开头**
- 名称的长度至少应为两个字符
- 不能以两个连字符或连字符后跟数字开头

 问题背景：通过 js 生成内部样式以数字开头无法生效。

## flex 布局子元素长度超出

https://juejin.cn/post/6974356682574921765

总结：子元素设定 `flex: 1` 不能控制子元素总体长度多少，只是控制子元素如何分配父元素的剩余长度。所以，可以通过设定子元素的width(min-width)为 0，由其通过父元素的剩余长度控制。

## contenteditable

用于设置容器内容是否可编辑。

## 弹性布局和溢出隐藏冲突

场景：父级元素设置为 flex 布局目的为了实现文本垂直居中，另外再希望通过 overflow: hidden 实现溢出，发现无效

解决方案：父级元素使用 `display: table`，文本元素使用另一个包装容器并设置 `display: table-cell; verticle-align: middle`即可。

## defensive CSS

1. flex 布局的子元素默认不会换行，需要设置 `flex-wrap: wrap`
2. 长度内容不确定的时候考虑添加间距。
3. 所有 img 设定 object-fit 和 100% width 以应对图像被拉伸的情况。
4. 使用 `overscroll-behavior-y: contain`处理滚动链（多级页面都有滚动的情况下，上层页面滚动到边界时会触发下层页面的滚动）。
5. 使用 `min-width & min-height`
6. `justify-content: space-between` 会使子项间隔随着子项数量动态改变，使用 `gap` 可以设定其间距。
7. 给 img 添加背景色，当 img 无法加载时会展示该背景色。
8. 当内容过长时，弹出的滚动条会使原来的内容发生位置偏移，使用

`scrollbar-gutter: stable both-edges` 能预留滚动条的空间，并且两端预留了对齐空间。

1. 弹性项目中存在比项目本身还大的文本或图像时，不会自动缩小或换行。通过设置 `min-width: 0` 和 `min-height: 0`能解决。

## table 不支持通过 css 限制高度

这里泛指 display 为 table 的元素。

## padding 不会影响 background

设置 padding 值 不会影响 background 的布局。

## 字体加载前空白（FOIT)

参考文章：https://juejin.cn/post/6844903559318749197

font-display:

- `swap:`浏览器会直接使用font-family中最先匹配到的已经能够使用的字体，然后当font-family中更靠前的字体成功载入时，切换到更靠前的字体，相当于是FOUT。
- font-display: fallback: 浏览器会先等待最靠前的字体加载，如果没加载到就不显示任何东西，这个过程大约持续100ms，然后按照顺序显示已经成功载入的字体。在此之后有大约3s的时间来提供切换到加载完毕的更靠前的字体。
- `font-display: optional:` 浏览器会先等待最靠前的字体加载，如果没加载到就不显示任何东西，这个过程大约持续100ms，然后字体就不会再更改了（一般第一次打开某页面的时候都会使用fallabck字体，字体被下载但是没被使用，之后打开时会使用缓存中的字体）

## 设置文本竖排显示

`writing-mode: vertical-lr`垂直方向内容从上到下，水平方向从左到右

## 绝对定位指定方位

1. 对于绝对定位元素，指定上下左右任意组值，同时缺少相应的宽高的情况下，能达到填充内容区域的效果。

eg: 父容器宽高为 12 px 的矩形，子元素指定 `top: 2px; bottom: 2xp;`则在没有明确指明高度的情况下，子元素的高度为 8px。

1. `top bottom left right`四者共存的情况下不需要设定宽高也能填充容器内容。当与宽高同时存在的情况下，默认生效 `top left`。

## 根元素

css 中的根元素是指`:root`**选择器**匹配到的元素

## 模拟滚动条插件

1. react-custom-scrollbars   老版本
2. react-custom-scrollbars-2  新版本 nice

## input 输入框宽度自适应

背景：`<input>`输入框，如果不给宽度，其宽度是固定的

方案：在 input 外面套一层 div，设置 input 宽高为百分百。在 div 中塞进 span 标签，把 span 内容和 input 内容同步，把 span 标签隐藏在 input 下面，利用 span 宽高撑起 div 宽高，暗搓搓的操纵全局。

## 提高用户体验

1. 借助伪元素扩展小元素的点击 \ 聚焦区域。
2. 使用 `scroll-behavior: scroll`设置页面的平滑滚动（锚点定位）
3. `user-select`配合 `::selection`伪元素定义文本全选。
4. 

## ECharts 案例大全

https://www.isqqw.com

http://ppchart.com/

http://192.144.199.210/forum.php?mod=forumdisplay&fid=2

http://analysis.datains.cn/finance-admin/#/chartLib/all



## nth-of-child/type

当需要选中第四到第八的元素时：`:nth-of-child(n+4):nth-of-child(-n+8)`

## not 函数

用于将样式应用于没有特定类或 ID 的特定元素。

```css
// 该样式作用于没有名为 .pic 的类的 img 图像
img:not(.pic) {
  padding: 0;
  opacity: .5;
}
```

## input 输入框显示或禁止历史记录

如果 input 输入框没有设置 id，不会弹出历史记录。

如果设置了 id，不是 keyword 也不会出现历史记录。

设置 `autocomplete="off"`完成禁止弹出历史记录。

## 独立像素比

`device-pixel-radio` 常用于媒体查询以适配响应式布局

## 内联元素

内联元素及行内元素，行内元素不能使用边距的自动属性。eg: margin: auto;

margin-top 或 margin-bottom 使用 auto ，默认设置为0。

margin-left 或 margin-right 使用 auto，默认占据所有空间。



>https://www.cnblogs.com/leise/p/11923107.html auto 用法

## 文档流和文本流

文档流是对于文档的整个布局来说的，文本流对于文档中的文字元素来说的。float 元素和绝对定位、固定地位都脱离文档流，但float 没有脱离文本流。绝对定位和固定定位是脱离文本流的。

设置为 float 属性的元素在它的外边缘遇到包含框或者另一个浮动框是换行。

## 水平居中、垂直居中

```css
/* 水平居中 */
text-align: center;
margin: 0 auto;
position: absolute; top: 0; left: 50%; transform: translateX(-50%);
display:flex; justify-content: center;

/* 垂直居中 */
设置line-height 等于 height;
position: absolute; top: 50%; left: 0; transform: translateY(-50%);
display:flex; align-items: center;
display: table; vertical-align:middle;

/* 两行代码 */
dispaly: flex; -- 父元素设置
margin: auto; -- 子元素设置
```

## 属性单位

**rem（root em)：相对于根元素(html)的大小进行倍数增减**

**em: 相对于当前元素字体大小的倍率**

**vw、vh: 相对于视窗大小的百分比**

**px: 像素单位，只能是整数，是显示器的相对单位**

[逻辑像素和物理像素](https://blog.csdn.net/weixin_30602505/article/details/101091712)

## media query 媒体查询

即视口设置，用于设置不同设备的渲染效果

```css
<meta name="viewport" content="width=device-width, initial-scale=1.0">
引入资源，根据不同的设备，引入不同的css 样式
<link rel="stylesheet" media="screen and (max-width: 600px)" href="small.css" />
```

媒体查询条件

设备宽高、设备像素比、设备类型

其媒体类型有：

1. all

1. screen

1. print 打印机

1. speech 朗读页面的屏幕阅读器

## css 基线

字母x 的下端沿，而不是汉字的文字的下端沿。

用vertical-align 设置行内块（内联元素) 的对齐方式。

vertical-align：定义行内元素的基线相对于**该元素所在行的基线**的垂直对齐方式。可以使用负长度值和百分比值。

参数：top middle bottom text-bottom(文本底端对齐) text-top(文本顶部对齐) baseline(基线对齐，默认)

## inline-block 内容基线对齐问题

元素设置为inline-block 后，其内联内容呈现为块，本身呈现为inline 元素。



>https://www.cnblogs.com/jiangzilong/p/6145157.html

## 外边距合并

普通文档流中块元素的垂直外边距会产生合并，合并后的高度等于较大者的外边距。

## css 指定椭圆角

border-radius: 50px / 15px; (指代椭圆的x轴和y轴)



## 文本效果

text-overflow: 设置文本溢出的展示模式，通常为ellipsis;

word-wrap: 设置较长文本是否切断换行到另一行展示；

word-break: 文本切断换行展示的规则，与word-wrap 搭配使用。keep-all 和 break-all 选项。



**white-wrap、word-wrap、word-break 所表示的换行和不换行的区别**

使文本换行的方式有：

1. br 换行符，强制所在位置文本换行
2. p 元素，div 设定宽度，对文本内容实现自适应换行
3. 长单词或者链接，默认不会断开换行，方式 2 便不能使其文本内换行，这时便需要 word-wrap: break-word 或 word-break: break-all 实现强制换行。word-wrap 是针对单词长度超过一行的情况。

强制不换行：

1. white-space: nowrap。默认为 normal。pre( preserve 保留的缩写）保留空白符和换行符，但不会自动换行 。nowrap 强制在同一行内显示所有文本，直到文本结束或者遭遇 br 对象。pre-wrap 便是 pre 基础上添加自动换行。pre-line 在 pre-wrap 基础上合并空白符。
2. 强制文本换行。

1. 1. word-break: normal; 允许在字内换行
   2. word-break: break-all; 允许任意字内断开
   3. word-break: keep-all。不允许字内断开

1. 强制单词内或链接内断行

word-wrap: break-word

## 响应式图像

响应式图像会自动调整以适应屏幕尺寸

```css
img {
	max-width: 100%;
	height: auto;
}
```

**调整img 图像或video 适应容器**

object-fit 属性

1. fill 默认，自动将图片进行调整以适应容器

2. contain, 以保持纵横比的方式调整

3. cover, 以剪裁的方式调整

## css 变量

通过**:root** 声明全局变量，通过**var**(变量名) 使用

```css
:root {
--color: red;
--fontsize: 16px;
}
div {
  color: var(--color);
}
```

## 设置用户无法复制

user-select: none;



## 设置文本换行规则和溢出省略号表示

white-space: nowrap;

overflow: hidden;

text-overflow: ellipsis;

## 设置position 和float

都会自动为元素设置display: inline-block 的显示属性



## overflow

overflow: -webkit-overlay 与auto 方法类型，但滚动条的绘制覆盖内内容之上，不占用空间。存在较大兼容性，只能在chrome或safari浏览器使用。



## line-height

line-height：1 相当于line-height: 100%，根据当前字体大小设置line-height 值。当font-size为16px，则line-height 值为16px。



## client、offset 、scroll 和 layer

2022.4.20 补充：

1. clientX, clientY 相对于浏览器显示区域
2. offsetX, offsetY 指自身元素
3. scrollX, scrollY 为可滚动的距离
4. layerX, layerY 为从自身再往上找到具有定位属性的父元素到目标点的距离，都没有为 body。

client 和 offset 是包括不包括border的关系。

Width 和 Height:



>https://blog.csdn.net/qq_42089654/article/details/80515916

X 和 Y:

X 和 Y:

![img](https://cdn.nlark.com/yuque/0/2021/png/12905753/1632559025001-e4f743b1-13f0-4dd7-a1a8-b69d3d17d7d7.png)



## 页面布局之bfc

定义：BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。



>https://blog.csdn.net/sinat_36422236/article/details/88763187

其中有个重要的规则，属于同一个BFC 的两个相邻box margin 值会发生重叠。

创建BFC

- float 值不是none

- position 值不是static 或者relative

- display 值是inline-block、table-cell、flex、table-caption 或者inline-flex

- overflow 值不是visible

## grid 网络布局



>http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html

`终极无敌牛批之css 最强大布局`。

- grid 布局默认为块级元素

- 设为网格布局以后，容器子元素（项目）的`float`、`display: inline-block`、`display: table-cell`、`vertical-align`和`column-*`等设置都将失效。

- 设置行列属
  **grid-template-columns**: repeat(n, ele-width)
  **grid-template-rows**: repeat(n, ele-width)

- 确定每个单元格的宽度，数量自动填充
  grid-template-columns: repeat(fill-auto, 100px)

- fr 关键字（片段)

- minmax 接受长度范围，限制单元格宽度变化

- grid-rows-gap grid-columns-gap 设置行列单元格之间的间隔距离(最新标准删除了grid- 前缀)
  复写 grid-gap

- grid-template-areas 给单元格指定区域命名

- **grid-column/rows-start grid-column/rows-end** 给单元格指定占位多少个，设置单元格起始和终止在哪个单元格边框。

- grid-auto-flow 设置内容先填充 rows 还是先填充 columns.
  rows-dence 和 columns-dence 会让余下的元素再对应的行列上紧密排列

## b 标签的使用

根据 HTML5 规范，在没有其他合适标签使用时，才应该把  **标签作为最后的选项。HTML5 规范声明：应该使用** [ **h**](https://www.w3school.com.cn/tags/tag_hn.asp) **来表示标题，使用** [**strong**](https://www.w3school.com.cn/tags/tag_phrase_elements.asp) **标签来表示强调的文本，应该使用** [**em**](https://www.w3school.com.cn/tags/tag_phrase_elements.asp) **标签来表示重要文本，应该使用**  **标签来表示标注的/突出显示的文本。**

## css BEM 命名

block element modifier(修饰符)

- **B** - Block 一个独立的模块，一个本身就有意义的独立实体 比如：header、menu、container
- **E** - Element 元素,块的一部分但是自身没有独立的含义 比如：header title、container input
- **M** - Modifier 修饰符，块或者元素的一些状态或者属性标志 比如：small、checked



常用链符形式 bb__ee--mm



## CSS Modules



>http://www.ruanyifeng.com/blog/2016/06/css_modules.html

css modules 使每个css 选择器都经过哈希编码成一个独一无二的值，避免的局部和全局的样式污染。

**umi modules:** dev下生成以 **文件名_元素哈希** 编码的表示方式。打包后以**纯的元素哈希编码**表示。

**react** 使用多个css modules选择器，可借助classNames 第三方包或者使用ES6的字符串模板。

对于 `j|tsx` 文件，局部作用域只能在

特殊样式设置：

1. 全局作用域
   :global(.title)，声明后该样式不会被编译成哈希字符串。使用括号和不使用括号的区别：是否对其子代样式起作用。

1. 局部作用域
   :local(.title)，即 `:local(.title)` = `.title`，只是一种显式的写法，意义不大。

1. css 组合
   composes，选择使用嵌套的形式

```css
.body {
	font-size: 12px;
}

.main {
	composes: body; | body from './another.css' // 继承其他文件里的样式
	font-style: normal;
}
```

## cubic-bezier

用于定于动画的运动速度曲线。由四个值组成，分别是cubic-bezier(x1,y1,x2,y2)

## linear-gradient

创建一个颜色渐变的图像。repeating-linear-gradient 用于重复颜色。

```css
/* 不设定角度或指定方向的情况下，默认从上到下，蓝色渐变到红色 */
linear-gradient(blue, red);
 
/* 渐变轴为45度，从蓝色渐变到红色 */
linear-gradient(45deg, blue, red);
 
/* 从右下到左上、从蓝色渐变到红色 */
linear-gradient(to left top, blue, red);
 
/* 从下到上，从蓝色开始渐变、到高度40%位置是绿色渐变开始、最后以红色结束 */
linear-gradient(0deg, blue, green 40%, red);

/* 从下到上的红白条纹 */
repeating-linear-gradient(
    45deg,
    red,
    red 30px,
    white 30px,
    white 60px
  );
```

## radial-gradient

创建一个发散的渐变图像

## clip-path



>https://www.jb51.net/css/641182.html

polygon: 左上角原点，右下角100% 100%

```css
polygon(50% 0, 100% 100%, 0 100%) // 切割成一个三角形
```

circle: 一个坐标点(x at y)及半径

```css
circle(50% at 50% 50%)
```

ellipse:椭圆x半径，y半径以及圆心

```css
ellipse(50% 40% at 50% 50%)
```

inset: 值为(距离上 右 下 左边框的距离 round 左上角radius 右上角radius 右下角radius 左下角radius)

round前面的数值，表示的是距离，如果第一个值为25%，则表示图像在上面从25%开始绘制。

```css
inset(25% 0% 25% 0% round 0% 25% 0% 25%)
```

## 设置高度动态随宽度变化

方案一： 利用padding

一个元素的 `padding`，如果值是一个百分比，那这个百分比是相对于其**父元素的宽度**而言的



方案二：利用隐藏的图片

div容器如果不给定高度，它的高度会随着容器内部的元素变化而撑大，这个时候，我们在容器内部添加一张符合我们宽高比例的图片，给图片设置宽度100%；高度auto，我们知道图片只设置宽度的话，高度会随宽度来进行比例变化，自动缩放，这样我们内部的子容器的高度也就会按照比例缩放了。当然这个img你可以设置隐藏，也可以用别的盒子覆盖上。

## 自定义scrollbar

使用 webkit 内核的浏览器生效。

```css
  ::-webkit-scrollbar { // 滑动框
    width: 10px;
    background-color: #eff1f5;
  }
  ::-webkit-scrollbar-track { // 滑动轨道
    border-radius: 3px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb { // 滑动拇指
    border-radius: 5px;
    background-color: #a8a8a8;
    border: 2px solid #eff1f5;
  }
```

## attr

用于返回元素的属性值，常用于配合生成tooltip.

```css
//html,自定义属性需要在前面加上data-
<div class="tooltip" data-tooltip="提示信息"></div> 
//css
.tooltip::before {
	content: attr(data-tooltip);
}
```



## 自定义插入号颜色

```css
caret-color: red;
```

## drop-shadow

在图像的位置投下阴影，而非在盒子整个框后投下阴影。通常搭配filter 滤镜属性一起使用。注意它没有阴影距离。

```css
filter: drop-shadow(0 0 20px rgba(0 0 0 / 30%));
```

## min-content、max-content、fit-content

作用在width和height上，前者文字随同级图片大小宽度进行换行，后者不换行（white-space: nowrap)展示，fit-content自带margin:auo居中效果。

## 属性选择器的匹配

```css
[href*='http'] // 包含http的href属性
[href^='http'] // 以http开头的href属性
[href$='http'] // 以http结尾的href属性
```

## clamp 函数

用于把一个值限制在一个上限和下限之间，当这个值超过最小值和最大值的范围时，在最小值和最大值之间选择一个值使用。

接收三个参数，最小值，首选在，最大值。

一般首选值为一个**动态值**（百分比）。

## 可视化特异性

对比元素的选择器层级时，按照（id选择器）-（类、伪类、属性）-（元素、伪元素）拼接。

## 常用可继承样式

可总结为**与**文本相关**、**列表属性**相关。

- border-collapse 边界内边距

- border-space 边界外边距

- caption-side 字幕侧，用于设置表格标题位于表格方位

- color

- cursor 光标

- direction 方向，用于设置文本显示方向

- font-family

- font-size

- font-style

- font-variant 字体变体，常用于设置文本为小型大写字母的变体

- font-weight

- letter-spacing 每个中文单词及英文字母间距

- line-height

- list-style-image 列表样式图像

- list-style-position 列表样式位置

- list-style-style 列表样式

- text-align

- text-indent 文本缩进

- text-transform 文本转换

- visibility 能见度

- white-space 空白处理，常用属性：nowrap(同样合并，并且不换行)，pre(保留空格不换行)，pre-wrap(保留空格换行)，pre-line(合并空格换行)，normal(默认，合并空格)

  > https://blog.csdn.net/qq_33706382/article/details/78328188

- widows

- word-spacing 单词中间插入的空格数，间距

## ch 单位

为渲染字体“0”的宽度，常用于设置文本宽度。



## margin、padding、transform 设置为百分比

无论方向如何，margin和padding都以父元素宽度作为参考对照。transform以自身宽度作为参考对照。

## 角度单位 turn

1 turn = 360 deg，表示一圈。



## column-count 和 column-gap 设置多列布局

将显示内容分为column-count 列，列间距为column-gap。另外也可通过column-width设置动态列宽，随着父元素宽度的改变而改变column-count的列数。

## flex-direction和gird 项目顺序

改变的是元素的视觉顺序而不是逻辑属性（DOM渲染顺序），对于使用键盘操控元素来说，遵循的是逻辑顺序。



## space-evenly

flex 布局中 justify-content 设置均匀分布。



## 冷门伪元素

- `first-letter`，作用于具有文本属性的第一个字母，只能对块容器作用。并非所有属性都可用，只有一些对文字起效果的 css 样式会起作用。

- `first-line`，作用域块容器的第一行文本。同样只能使用一些对文字起效果的css样式。

- `backdrop`，作用于全屏元素的背景。常用于全屏播放的视频，移动端全屏浏览内容等。

- `placeholder`，作用于表单输入类元素的placeholder 内容样式。

- `marker`，用于给list-item自定义数字或项目符号。
- `selection`，自定义用户选中文本的样式。

## 冷门伪类

- `active`,元素活动时的样式

- `focus-within` 子元素获得焦点

- `focus-visibel` 通过键盘控制

- `empty` 没有子元素
- `has`表示包含。未列入样式表规范，只能通过 `document.querySelector`函数进行筛选
- `not`表示范围



## place-content

place-content 接收两个参数，第一个指代 align-content，第二个指代 justify-content。

align-items 和 align-content 的区别：前者针对每行元素进行排列，后者将多行 flex 看成一个整体处理。

## writing-mode

更改文本的书写布局方向

## filter&backdrop-filter

区别：**filter** 作用在整个元素，其所有后端都会受影响；**backdrop-filter** 作用在元素背后的所有元素。

- `blur` 模糊程度

- brightness 亮度

- contrast 对比度

- `drop-shadow` 给图像设置阴影效果

- `grayscale` 灰度滤镜，用于图像颜色设置

- hue-rotate 色相旋转

- `opacity` 透明度

- saturate 图像饱和度

- sepia 深褐色滤镜

- url svg文件滤镜

## 自定义属性

以两个英文破折号开始（--）并且区分大小写。使用属性时通过var（）来使用。



## animation 连写速记

animation: name duration(持续时间) time-function(运动曲线) delay(延迟) iteration-count(实现次数) direction(方向) fill-mode(最终状态) play-state(暂停控制)



## fill

用于设置svg形状的颜色。



## aspect-ratio

为元素设置宽高比。也常用于设置媒体查询条件。



## rel 标签

用于说明引用外部资源与文档的关系。

## picture

```css
<picture>
  <source srcset="a.jpg">
  <source srcset="b.jpg">
  <img src="c.jpg" >
</picture>
```

## 网页布局应尽可能使用相对单位进行布局

常用的相对单位：

- em 父元素字体大小

- ex 当前元素字体 X 的高度

- ch 一个字符"0"的高度

- ic 一个字符"水"的宽度

- rem 网页文档根字体大小

- vw 客户端视口宽度的百分一

- vh 客户端视口高度的百分一

- vmin 最小视口的百分一

- vmax 最大视口的百分一

## css 应该注意避免的写法

>https://juejin.cn/post/6963252241662738440

[@supports ](https://www.yuque.com/supports)
为浏览器兼容编写不同的css样式。

```css
@supports (display: grid) {
    .site-content {
        display: grid;
    }
}
```

## gap

用于设置flexbox布局的间隙。gap为row-gap 和 column-gap的合写。

## is 和 :where

用于设置具有相同 css 属性的选择器，is 比 where 具有更高的权重，where 的权重为 0。兼容性尚未很可。

```css
:is(.main, .sidebar, .site-footer) a:hover {
    /* 样式 */
}
:where(.main, .sidebar, .site-footer) a:hover {
    /* 样式 */
}

取代
.main a:hover {}
.sidebar a:hover {}
.site-footer a:hover {}
```

## resize

给 div 元素设置是否可以调整其宽高。

- none。宽高不可调整

- both。宽高都可调整

- vertical。可调整高度

- horizontal。可调整宽度

## 堆叠上下文和z-index

当一个元素创建了堆叠上下文后，它及其子元素会形成一个组，同层之间的组进行 z-index 值比较。

能创建堆叠上下文的方式：

- 设置 position 定位

- 设置 opacity 值小于1

- 使用不是 normal 的 mix-blend-mode 模式

- 在设置 display:flex 或 dispaly:grid 的孩子上使用 z-index

- 使用transform, filter, clip-path, perspective

- 设置will-change 的属性为opacity 或transform

- 显式设置isolation: isolate(设置堆叠上下文)。该方式创建的堆叠上下文无需规定z-index值，并不会以任何方式影响孩子的渲染

z-index 的比较只与父级堆叠上下文有关，比较的是同一堆叠上下文下**子元素**的堆叠顺序，其 z-index 值与父级堆叠上下文的 z-index 不相关。创建了堆叠上下文会影响自身及子元素的布局。

## transition

复合属性，依次是过渡属性（默认all），过渡时间（秒），运动速度曲线，延迟时间（秒）。

并不是所有的属性都可以过渡，具有中间形态的才可以。像display、position等属性就不可以。

需要初始属性便定义才能生效的属性：

```css
border-color
```

transition能生效的属性：

常用：平时设置高度为 auto 的元素不能触发 transition，可考虑通过 max-height 设置一个大于原本元素高度来实现。

```css
background-color color
background-image only gradients
background-position percentage, length
border-bottom-color color
border-bottom-width length
border-color color
border-left-color color
border-left-width length
border-right-color color
border-right-width length
border-spacing length
border-top-color color
border-top-width length
border-width length
bottom length, percentage
color color
crop rectangle
font-size length, percentage
font-weight number
grid-* various
height length, percentage
left length, percentage
letter-spacing length
line-height number, length, percentage
margin-bottom length
margin-left length
margin-right length
margin-top length
max-height length, percentage
max-width length, percentage
min-height length, percentage
min-width length, percentage
opacity number
outline-color color
outline-offset integer
outline-width length
padding-bottom length
padding-left length
padding-right length
padding-top length
right length, percentage
text-indent length, percentage
text-shadow shadow
top length, percentage
vertical-align keywords, length, percentage
visibility visibility
width length, percentage
word-spacing length, percentage
z-index integer
zoom number
```

## font-stretch

用于拉伸文本。常用属性有 wider，narrower(更窄)，ultra-condensed(窄得不能更窄)



## 翻转网页颜色

```css
filter: invert(1);
```



## 私有属性

- -webkit chrome、safari
- -moz firefox火狐
- -ms IE
- -o Opera

## 五种经典 CSS 布局

- 空间居中布局
- 并列式布局
- 两栏式布局
- 三明治布局
- 圣杯布局

## 冷门文字样式 css 设置

- text-rendering 设置浏览器渲染文字的模式，主要考虑速度和精度清晰度两方面

- - **auto 智能识别**
  - **optimizeSpeed 偏向速度，不能设置连字和字据调整**
  - **optimizeLegibility 侧重性能**
  - **geometricPrecision 侧重几何精度**

- font-feature-settings 控制 OpenType 字体中的高级印刷功能

- -  font-feature-settings: "tnum";  // 字体更宽
  -  font-feature-settings: "smcp", "zero";  // 产生0o 斜杆

- font-kerning 是否应用字体本身储存的间距
- font-variant 设置字母和数字变体，字母为小写显示为大写



## css 改变图片颜色



>https://github.com/chokcoco/iCSS/issues/31

使用混合模式。

- mix-blend-mode

改变 img 下的图片颜色，常用设置 difference。

- background-blend-mode

改变 background 背景颜色



## 单独设置 overflow-x 和 overflow-y

但分别设置 x 和 y 的值时，会受到对方的影响。eg: overflow-x 为 visible，设置 overflow-y 为 auto，则 overflow-x 也会为 auto。单独设置 overflow-x 或 overflow-y 相当于 overflow: auto。

解决方案：需要设置滚动的元素套两层父元素，

## 使 div 宽度由内容撑开

display: inline-block 或 float。



## use-select

用于设置页面内容能否被选中，常用属性为 none 和 atuo。在设置元素被拖拽移动时生效。

## html 和 body 的高度问题

首先了解到，如果 div 块元素没有主动为其设定宽度和高度，浏览器会为其分配可使用的最大宽度，但不会分配高度。块级元素的高度由子元素的内容堆砌起来，或者依赖父元素的定高起作用。如果中途有一个 height 为 auto 或是 height 没有设置，则高度百分比不起作用。给 html 设定高度 100% 会获得浏览器的定高。

当单单给 body 设置背景色，实际上不是其真正意义上的背景色起了作用，而是 body 作为根结点起作用（在 html 未被设置的情况下），其背景色被浏览器捕获，从而使浏览器的背景色为该设定的背景色。

当给 html 设定背景色后，body 设定的背景色才真正属于 body 的背景色。

总结：

1. **当 html 标签无背景样式时，body 的背景色其实不是 body 标签的背景色，而是浏览器的。**
2. **一旦 html 标签含有背景色，则 body 的背景色变成了正常的 body 标签自己的背景色，而此时的 html 标签最顶级，背景色被浏览器获取，成为浏览器的背景色。**



## 行内元素存在间隙

场景：如 span，li，img 等行内元素去除 padding，margin 值后仍存在间距。

原因： 两个 inline 元素之间如果有空格或换行等透明字符，会被渲染成一个空格  

解决方案：设置父元素的 font-size 为 0，再在自身设置字体大小。



## 纯 css 实现滚动进度条效果

关键点：linear-gradient 对角渐变加伪元素设置浮层。

>https://juejin.cn/post/6844903758074216462


