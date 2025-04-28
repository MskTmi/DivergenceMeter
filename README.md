# 命运石之门 自定义 "世界线变动率计量器"

> 本项目灵感来源于 命运石之门（Steins;Gate）中的世界线变动率计量器（Divergence Meter），可在网页中以数字翻动动画的形式展示指定的数字或动态获取的数字

## Demo

**https://dmeter.msktmi.com**

![PixPin_2025-04-28_21-42-52](https://github.com/user-attachments/assets/6143777a-1136-4b39-b0c5-6230569ebcdd)


## 配置项说明
| 参数                      | 类型        | 默认值                   | 说明                                                                           |
| ------------------------- | ----------- | ------------------------ | ------------------------------------------------------------------------------ |
| `divergenceMeterElement`  | jQuery 对象 | `$('.divergence-meter')` | 目标容器的 jQuery 对象，容器内应包含若干 `.frame` 元素                         |
| `minimalUpdateDelay`      | Number      | `10000`                  | 循环模式下，每次动画完成后下一次开始的最小延迟（毫秒）                         |
| `maximalUpdateDelay`      | Number      | `20000`                  | 循环模式下，每次动画完成后下一次开始的最大延迟（毫秒）                         |
| `minimalTransitionNumber` | Number      | `8`                      | 每个数字在确定前至少闪烁的次数                                                 |
| `maximalTransitionNumber` | Number      | `20`                     | 每个数字在确定前最多闪烁的次数                                                 |
| `transitionDelay`         | Number      | `60`                     | 每次闪烁之间的时间间隔（毫秒），控制动画速度                                   |
| `singleRun`               | Boolean     | `true`                   | 是否只运行一次，设为 `false` 可进入循环模式持续刷新数字                        |
| `Number`                  | String      | `'1.048596'`             | 如需一次性展示静态数字，可填写字符串（支持小数点 `.`），否则留空通过 AJAX 获取 |

### 示例：
```js
// 单次运行：显示静态数字
initializeDivergenceMeter({
	divergenceMeterElement: $('.divergence-meter'),
	minimalUpdateDelay: 0,
	maximalUpdateDelay: 0,
	minimalTransitionNumber: 8,
	maximalTransitionNumber: 20,
	transitionDelay: 60,
	singleRun: true,
	Number: '1.048596'
});
```
```js
//循环运行，通过 getToken() 获取显示内容：
initializeDivergenceMeter({
    divergenceMeterElement: $('.divergence-meter'),
    minimalUpdateDelay: 10000,           // 动态模式下，最小刷新间隔（ms）
    maximalUpdateDelay: 20000,           // 动态模式下，最大刷新间隔（ms）
    minimalTransitionNumber: 8,          // 每帧最少闪烁次数
    maximalTransitionNumber: 20,         // 每帧最多闪烁次数
    transitionDelay: 60,                 // 每次闪烁间隔（ms）
    singleRun: false,                    // 循环运行（每隔10-20s获取一次数字）
    Number: ''                           // 静态数字字符串，留空则通过 AJAX 获取
});
```

## 注意事项
- AJAX 获取动态数字时，`singleRun` 需设置为 `false` ，否则不会动态刷新

## 其他

- 都看到最后了点个 stars⭐ 再走吧~
- El Psy Kongroo
