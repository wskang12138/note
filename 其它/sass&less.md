## Less

### 与 sass 的对比

https://www.cnblogs.com/pink-chen/p/10727915.html



### 添加的功能

#### 变量

```plain
1. 以 @ 开头
2. 不能以特殊字符或数字开头，大小写敏感
@变量名：值
```



#### 混合

混合是将一组属性从一个规则集包含（或混入）到另一个规则集的方法。

使用：在混合名称后面加小括号（类选择器加函数写法）

[详细使用](https://www.jianshu.com/p/c65dab9d4524)



#### 嵌套

```less
body {
  background-color: @bodyColor;
  header {
    background-color: @headColor;
    color: red;
  }
}
```



#### @规则嵌套和冒泡

@ 规则（例如 @media 或 @supports）可以与选择器以相同的方式进行嵌套。@ 规则会被放在前面，同一规则集中的其它元素的相对顺序保持不变。这叫做冒泡（bubbling）

```css
.component {
  width: 300px;
  @media (min-width: 768px) {
    width: 600px;
    @media  (min-resolution: 192dpi) {
      background-image: url(/img/retina2x.png);
    }
  }
  @media (min-width: 1280px) {
    width: 800px;
  }
}

=> 编译为 =>

.component {
  width: 300px;
}
@media (min-width: 768px) {
  .component {
    width: 600px;
  }
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
  .component {
    background-image: url(/img/retina2x.png);
  }
}
@media (min-width: 1280px) {
  .component {
    width: 800px;
  }
}
```

##### 

#### less 运算

less 变量和属性可以直接进行加、减、乘、除运算。运算符中间有空格进行隔离，不同单位的属性进行运算，取第一个值。