## 说明
用于判断对象中的属性是否符合json中的条件
## 问题背景
一般来说，产品都是逻辑放在前端写，通过接口获取具体的数据，从而完成相应的功能

但是，当产品的种类变多时就会有许多需要特殊处理的情况，如果全部都在前端写特殊逻辑，这样会大大地降低代码的扩展性

一个好的思路是把特殊的逻辑抽象出来，简化为true/false的问题，具体来说就是给每个产品配置一个条件（放在json中），用前端的数据对象去匹配，从而达到逻辑配置化的目的
## API
#### resolveLogic(requirement, object, defaultValue)
返回true/false
- requirement 条件
- object 需要判断的对象
- defaultValue默认返回值（不包含条件对应的key或者格式错误）

### json的格式说明
原理是基于二叉树的遍历来解析一个复杂条件，所以json的结构也是一个二叉树

二叉树上的节点的类型分为两种，统一用operator表示
- 逻辑节点（&&， ||）
对子节点做逻辑运算
- 条件节点（bool，match，in，[]，>，>=，<，<=，=）
包含具体的条件

##### 条件类型
目前支持的条件判断类型（requireType）有9种
- 布尔 bool
- 正则 match
- 枚举 in
- 范围（两个数值之间） []
- 大于 >
- 大于等于 >=
- 小于 <
- 小于等于 <=
- 等于 =

### 配置说明与示例
例如有下面这么一个对象
```
var date = {
    text: "fdafdffdafdffdafdffdafds",
    year: 10,
    month: 45,
    day: 3,
    hour: 6
};
```
我们想知道里面的一些值是否满足以下条件
- month为1或12           （a）
- 有一个布尔值为false      （b）
- text在1～30字符之间      （c）
- 0 < hour < 10         （d）

然后对这几个条件做如下的的逻辑运算

(a && b && (c || d))

按照二叉树的结构我们可以修改逻辑运算表达式

((a && b) && (c || d))

即
```
 {
    left: {
        left: a,
        right: b
    },
    right: {
        left: c,
        right: d
    }
}
```
然后按照函数的规则配置即可
```
var requirement = {
    operator: "&&",
    left: {
        operator: "&&",
        left: {
            operator: "in",
            key: "month",
            range: [1, 12]
        },
        right: {
            operator: "bool",
            value: "false"
        }
    },
    right: {
        operator: "||",
        left: {
            operator: "match",
            regExp: "^\\S{1,30}$",
            key: "text"
        },
        right: {
            operator: "[]",
            key: "hour",
            range: [0, 10]
        }
    }
};

// 结果应该为true
var result  = resolveLogic(requirement, date, false);
```
更多示例查看/test/index.js
