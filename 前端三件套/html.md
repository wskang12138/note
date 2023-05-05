#  html

### 基本知识

#### 1.1 定义

标志性语言，通过标签将网络上的文档进行统一，将分散网络资源链接成一个整体。



#### 1.2 浏览器内核

**Trident**--ie、**Gecko**--火狐、**Webkit**--Safafi、Presto-- Opera(弃用）、**Blink**--排版引擎--Chrome|Opera



#### 1.3 meta 元素

charset: 字符解析格式

viewport: 作为移动端开发适配视图



#### 1.4 icon 图标



#### 1.6 <!doctype html>

以下文档标签以**html5** 的规范进行解析



#### 1.7 常用html 标签

br: 换行；

hr: 分隔线，单标签；

a: 超链接，target 设置跳转属性--*blank 新窗口，*self 默认方式，title 提示文字，分内部链接和外部链接；

​	空链接：#；

​	下载链接：链接地址是一个压缩包，如果文件为txt.png.jpg 等浏览器支持直接打开的格式，则需要加上dowload 关键字，前提需要下载的资源文件必须与网页在同一域名下。

```html
<a href="demo.txt" dowload="demo.txt">点击下载</a>
```

网页元素链接，即超链接

​	锚点链接：快速定位到页面中的某个位置，给拥有id 属性的标签通过#id； 

span: 与div 一样都是用来设置布局，但span 不会单独占一行，常用于行内布局。

ul/ol**: 前者无序，后者有序（li 标签有序号），列表内容都是li 标签**

q: 文本引号

address: 网页加入地址信息

caption: 为表格添加标题或摘要



#### 1.8 文本格式化标签

用于美化文本

b/strong: 都是行级标签，都有加粗的效果，而strong 还有强调的作用--用于SEO提取关键字。

i/em: 行级标签，使文字倾斜，em 有强调的作用

s/del: 添加删除线，del 强调

u/ins: 下划线，ins 强调

pre: 块级标签，预格式化文本，保留换行和空格，文字会小一号

small/big: 分别放文字小/大一号，big 已淘汰。浏览器支持的最小显示字体为12px。

sub/sup: 设置文本的下标和上标，调整文本显示是基线，文字会小一号



#### 1.9 实体转义（HTML 字符实体）

以& 标签开头，分号结尾，转义中间的内容，常见：

**&lt ; 小于号**

**>  大于号** 

**&** &号

&nbsp; 一个空格

**©** 版权符

&times; 乘号

&divide; 除号



#### 2 行级元素和块级元素

行级元素：宽高不可控，内部不能接块级元素 （display: inline)

块级元素：宽高可控 （display：block)



#### 2.1 w3c 标准

文档由**结构html 、表现css 和行为js** 三部分组成。



#### 2.2 标签嵌套规则

内联元素不能包含块元素；

块级元素不能放在p 标签里面；

hx 、p 、dt 等标签不能包含块级元素；

块级元素同等并列，内嵌元素同等并列。



#### 2.3 语义化标签

即理解好每个标签的具体含义，使用。



#### 2.5 表格标签

表格标签主要用于展示数据，不应用于布局页面。

th： 表头单元格，里头文字会居中和加粗显示

属性：align,设置表格相对于周围元素的对齐方式

border: 边框线

cellpadding: 单元格边缘与内容之间的空白，默认1像素

cellspacing: 单元格之间的空白，默认2像素



##### 2.5.1表格结构标签

thead: 表头

tbody: 表体

tfoot: 表尾

单元合并：rowspan --跨行合并（最上合并）；colspan --跨列合并（最左）

拓展： dl dt dd 组合标签，定义列表

```html
<dl> 
    <dt>标题1</dt> 
    <dd>列表1</dd> 
    <dd>列表2</dd> 
</dl>
```



#### 2.6 列表的使用

表格用来展示数据，列表用来布局。分为无序列表、有序列表和自定义列表

##### 自定义列表

常用于有分类形式的列表展示，即列表展示时有列表头和其列表内容。

格式：dl>dt>dd。dt:自定义名字，dd: 每一个名字的具体牵引



#### 2.7 表单

##### 表单控件

**input**

input--type--根据type 元素的不同实现不同的input 的属性值，常见的type 属性有：text	password	radio	checkbox	button	submit	reset	file	hidden	image--以图像形式提价按钮

input-name --控件名称

input-value --控件的值

input-checked -- 设置控件首次加载时选择的元素

**select**

select>option

selected: 设置默认选定状态

**textarea**

文本域

**cols**: 每行可以写的字数长度；rows: 高度

**label** 标签

通常结合表单控件一起使用，用于绑定一个表单元素，当点击元素里的内容时，自动设置光标与表单控件绑定



# Html5

## 新增语义化标签

section 定义文档的某个区域

>section用作一段有专题性的内容，一般在它里面会带有标题。 section典型的应用场景应该是文章的章节、标签对话框中的标签页、或者论文中有编号的部分。section元素用于对网站或应用程序中页面上的内容进行分块，section元素的作用是对页面上的内容进行分块，或者说对文章进行分段；一个section元素通常由内容及其标题组成，通常不推荐为那些没有标题的内容使用section元素。

header 头部标签

nav 导航栏标签

main 文档主体



>main 中的内容对于文档来说是唯一的，一个文档中只能有一个 main 标签，main 标签不能是 header、nav、article、aside、footer 的后代



article 内容标签



>**定义独立的内容，其内容****本身有意义且独立于文档的其余部分**。一般用来定义论坛帖子、博客贴吧、新闻故事、评论等。



aside 侧边栏标签



>定义article 标签外相邻的内容。常用作文章的侧栏。



footer 尾部标签



## 多媒体标签

1. audio 音频标签 
2. video 视频标签

使用 `controls` 开启播放控制面板。

<video controls src='http://xxx' />

## input 类型

日历(data)、邮箱(email)、搜索(search)、滑条（range)

## canvas 绘图、svg 绘图、地理定位



## 本地储存

1. localstorage
2. sessionstorage
3. cookies

## HTML 不常用标签集合

```html
<!DOCTYPE> 告知浏览器当前页面所用的html 版本
<abbr></abbr> 设置缩写词
<address></address> 设置文档作者/所有者的联系方式
<map><area></area></map>
<audio>中间的文本用来设置不支持该标签的浏览器显示</audio>
<base> 设置页面上所有链接的默认URL，必须位于head 内部。
<dbi></dbi> 使一段文本脱离父元素的文本方向
<bdo>设置文本的显示方向</bdo>
<canvas>一个图形容器，需要通过脚本绘制图形</canvas>
<caption>放在table 之后，定义表格的标题</caption>
<cite>定义作品的标题</cite>
<datalist>设置input 输入框中可能的值，需要input 控件通过list 进行绑定	</datalist>
<del>中间的内容会被添加删除线</del>
<ins>中间的内容会被添加下划线</ins>
<i>文本显示为斜体，没有其他合适的语义时使用该标签设置文本</i>
<label>通过for 对input 控件进行绑定，实现内容上的聚焦关联</label>

<object>
    嵌入一个对象，比如flash、PDF
</object>
<option>作为下拉列表select 或 datalist 中的某一元素</option>

<pre>里面的文本的r空格和换行会被保留，块级元素会被鉴别其换行符。</pre>
<q>里面的文本是一个引用，会被加上双引号</q>
<s>用来定义不正确、没有用的内容</s>
<table>
    html5 里只能使用border 属性，并且只能设置1 或""
</table>
```

