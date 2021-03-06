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
原理是基于n叉树的遍历来完成复杂条件的逻辑运算，所以json的结构也是一个n叉树

n叉树上的节点的类型分为两种，统一用operator表示
- 逻辑节点（&&， ||）
对子节点做逻辑运算
- 条件节点（match，in，>，>=，<，<=，==）
包含具体的条件

##### 条件类型
目前支持的条件判断类型（requireType）有9种
- 正则 match
- 枚举 in
- 大于 >
- 大于等于 >=
- 小于 <
- 小于等于 <=
- 等于 ==

### 配置说明与示例
例如有下面这么一个对象
```
var date = {
    text: "fdafdffdafdffdafdffdafds",
    year: 2018,
    month: 11,
    day: 3,
    hour: 6
};
```
我们想知道里面的一些值是否满足以下条件
- const a = [2009, 2019].includes(year)
- const b = month > 6
- const c = month < 12
- const d = text.length >= 1 && text.length <= 30
- const e = day == 3

然后对这几个条件做如下的的逻辑运算

((a && b && c) && (d || e))

首先转换成前缀表达式

&& (&& a b c) (|| d e)

按照n叉树的结构我们可以修改成
``` js
 nodeTree = {
    operator: "||",
    operands: [
        {
            operator: "&&",
            operands: [
                a,
                b,
                c
            ]
        },
        {
            operator: "&&",
            nodes: [
                d,
                e
            ]
        }
    ]
}
```
然后替换其中的operands为实际判断节点即可:
``` js
var requirement = {
    operator: "&&",
    operands: [
        {
            operator: "&&",
            operands: [
                {
                    operator: "in",
                    key: "year",
                    range: [2009, 2019]
                },
                {
                    operator: ">",
                    key: "month",
                    value: 6
                },
                {
                    operator: "<",
                    key: "month",
                    value: 12
                }
            ]
        },
        {
            operator: "||",
            operands: [
                {
                    operator: "match",
                    regExp: "^\\S{1,30}$",
                    key: "text"
                },
                {
                    operator: "==",
                    key: "day",
                    value: 3
                }
            ]
        }
    ]
};

// 结果应该为true
var result  = resolveLogic(requirement, date, false);
```
更多示例查看/test/index.js
