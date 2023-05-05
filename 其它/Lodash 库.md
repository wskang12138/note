# Lodash 库

### 官方文档 

https://www.lodashjs.com/

### 特点 

●Immutable 非易变的，即不会改变原对象

●Compose 所有方法都是柯里化的

●Lazy Evaluation 高性能的

### 常用API  

 **字符串** 

 **capitalize** 

将字符串转换为首字母大写，剩余小写

 **escapeRegExp** 

转义 RegExp 字符串中特殊的字符 "^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", ", ", 和 "|" in .

 **pad，padEnd，padStart** 

以特定内容填充字符串直到达到指定长度

 **trim，trimEnd，trimStart** 

移除字符串前后空格或指定的字符串

### 数组 

 **chunk** 

将数组拆分成多个指定size长度的区块，并将其组合成新的数组。

 **difference，differenceBy，differenceWith** 

返回目标数组不包含在指定数组外的值

 **drop，dropRight，dropRightWhilt，dropWhile** 

去除数组的前（尾部）n个元素，特定位置到最后（前面到特定位置）

 **intersection，intersectionBy，intersectionWith** 

获取给定数组中的公共元素

 **pull，pullAll，pullAllBy，pullAllWith，pullAt，without** 

移除数组中所有指定值的元素，该方法会改变数组。

 **union，unionBy，unionWith** 

创建联合数组并去重

 **uniq，uniqBy，uniqWith** 

数组去重

 函数**** 

 **after** 

在函数调用n次后执行

 **debounce** 

为函数添加防抖设置

 **delay** 

延迟调用函数

 **throttle** 

为函数设置节流模式

 **cloneDeep，cloneDeepWith** 

创建深拷贝

 **isEmpty** 

检查目标是否为空对象

 **isEqual，isEqualWith** 

进行深比较来确定两者值是否相等