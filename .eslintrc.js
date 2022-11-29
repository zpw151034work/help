module.exports = {
  root: true,
  env: {
      browser: true,
      node: true,
      es6: true,
  },
  extends: [
      'plugin:vue/essential',
      'eslint:recommended'
  ],
  // =: ['plugin:vue/strongly-recommended', 'eslint:recommended'],
  rules: {
      'indent': [2, 4, {
          'SwitchCase': 1
      }],
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      // quotes: [2, 'single'], //强制使用单引号
      // semi: ['error', 'never'], //强制不使用分号结尾
      // "no-empty-character-class": 2, //正则空
      "vue/require-prop-types": 2, //需要在props中定义类型
      "no-trailing-spaces": ["error", { "skipBlankLines": true }], //一行结束后面不要有空格
      "no-cond-assign": ["error", "except-parens"], //禁止在条件表达式中使用赋值语句
      "vue/no-side-effects-in-computed-properties": ["off"], //不允许在计算属性中出现副作用
      "key-spacing": [2, { "beforeColon": false, "afterColon": true }], //对象字面量中冒号的前后空格
      "space-before-function-paren": [0, "always"], //函数定义时括号前面要不要有空格
      "keyword-spacing": ["error", {
          "before": true,
          "after": true,
      }],
      'arrow-spacing': [2, { // 强制箭头函数的箭头前后使用一致的空格
          'before': true,
          'after': true
      }],
      "comma-dangle": [ //要求或不允许尾部逗号
          "error",
          {
              "arrays": "only-multiline",
              "objects": "only-multiline",
              "imports": "only-multiline",
              "exports": "only-multiline",
              "functions": "ignore",
          },
      ],
      "vue/script-indent": [
          "error",
          4,
          {
              "baseIndent": 1,
              "switchCase": 1,
              "ignores": [],
          },
      ],
      "vue/html-indent": [
          "error",
          4,
          {
              "attribute": 1,
              "closeBracket": 0,
              "alignAttributesVertically": true,
              "ignores": [],
          },
      ],
      "vue/html-closing-bracket-newline": [2, {
          "singleline": "never",
          "multiline": "never"
      }],
      // 'vue/attributes-order': 'error', 标签属性必须按规则排序

      // eqeqeq: 'off', // 必须使用三等
      // 'vue/eqeqeq': ['error', 'always'],

      // camelcase: 'off', 变量名必须是 camelCase 风格的 驼峰
      // 'vue/camelcase': [0, {
      //     'properties': 'always'
      // }],

      // 'vue/component-definition-name-casing': ['error', 'PascalCase'], //  组件的 name 属性必须符合驼峰命名
      
      // 'vue/component-name-in-template-casing':  ["error", "PascalCase", {
      //     "registeredComponentsOnly": false, 
      //     "ignores": []
      // }],  // 限制组件名的风格

      // 'vue/component-options-name-casing': ["error","PascalCase"], // 组件注册时 限制组件名称的命名规范

      // "vue/custom-event-name-casing": ["error",
      //     "camelCase" | "kebab-case",
      //     {
      //     "ignores": []
      //     }
      // ]  // 绑定的额自定义时间规范 vue2不建议使用

      // 'vue/html-comment-content-newline': [2, {"singleline":"never","multiline": "never"}], // HTML 注释的 <!-- 后必须有空格或换行符

      // 'vue/html-comment-content-spacing': ["error","always"], // HTML 注释中强制统一间距

      // 'vue/multi-word-component-names': ["error"], // 组件名称必须是两个以上的单词

      // 'vue/no-deprecated-scope-attribute': 'error', // 禁用已废弃的 scope 属性

      // 'vue/no-dupe-keys': 'error', //  禁止重复的键名

      // 'vue/no-dupe-v-else-if': 'error', // 禁止在 v-if 和 v-else-if 中出现重复的测试表达式

      // "vue/no-duplicate-attributes": ["error", {
      //     "allowCoexistClass": true,
      //     "allowCoexistStyle": true
      // }] // 禁止出现重复的属性

      // 'vue/no-empty-component-block': 'error', 禁止 <template> <script> <style> 为空
      // 'no-empty-pattern': 'off',

      // 'vue/no-empty-pattern': 'error', 禁止解构赋值中出现空 {} 或 []

      // 'vue/no-lone-template': 'error', // 禁止出现没必要的 <template>

      // 'no-loss-of-precision': 'off',
      // 'vue/no-loss-of-precision': 'error', // 禁止使用超出 js 精度范围的数字

      // 'vue/no-mutating-props': 'error', // 禁止修改组件的 props

      // 'vue/no-parsing-error': 'error', // 禁止出现语法错误

      // 'vue/no-reserved-component-names': 'error' 组件得name属性不能使用保留字

      // 'vue/no-reserved-props': ["error", {
          // "vueVersion": 2, // or 2 当前使用的vue版本
      // }], // 禁止props使用保留字

      // 'vue/no-shared-component-data': [2], // 组件的 data 属性的值必须是一个函数

      // 'no-sparse-arrays': 'off',
      // 'vue/no-sparse-arrays': 'error', // 禁止在数组中出现连续的逗号

      // 'vue/no-undef-components': [2], // 禁止使用未定义的组件

      // "vue/no-unsupported-features": ["error", {
      //     "version": "^2.6.10",
      //     "ignores": []
      // }] // 当你的 vue 版本较老时，禁用还未支持的语法

      // "vue/no-unused-properties": ["error", {
      //     "groups": ["props","data","computed","methods"],
      //     "deepData": true,
      //     "ignorePublicMembers": false
      // }] // 禁止属性定义了却未使用

      // 'vue/no-unused-refs': 'error', // 定义得ref未在refs中使用

      // "vue/no-unused-vars": ["error", {
      //     "ignorePattern": "^_"
      // }] // 禁止 v-for 指令或范围属性的未使用变量定义
      
      // 'no-multiple-empty-lines': [2, {
      //     'max': 1
      // }]

      // 'no-class-assign': 2, // 不允许修改类声明的变量
      
      // 'new-parens': 2, // 要求调用无参构造函数时带括号

      // 'array-bracket-spacing': [2, 'never']

      // 'object-curly-spacing': [2, 'always', {
      //     objectsInObjects: false
      //   }],

      // 'no-array-constructor': 2, // 禁止使用 Array 构造函数

      // 'no-caller': 2, // 禁用 caller 或 callee (no-caller)

      // 'no-const-assign': 2, // 不允许改变用const声明的变量

      // 'no-control-regex': 2, // 禁止在正则表达式中使用控制字符

      // 'no-delete-var': 2, // 禁止删除变量

      // 'no-dupe-args': 2, // 禁止在 function 定义中出现重复的参数

      // 'no-dupe-class-members': 2, // 不允许类成员中有重复的名称

      // 'no-dupe-keys': 2, // 禁止在对象字面量中出现重复的键

      // 'no-duplicate-case': 2, // 禁止重复 case 标签

      // 'no-empty-character-class': 2, // 禁止在正则表达式中出现空字符集
      // 'no-eval': 2,
      // 'no-extend-native': 2,
      // 'no-extra-bind': 2, // 禁止不必要的函数绑定
      // 'no-extra-boolean-cast': 2, // 禁止不必要的布尔类型转换
      // 'no-extra-parens': [2, 'functions'], // 只在 函数表达式周围禁止不必要的圆括号

      // 'no-fallthrough': 2, // 禁止 case 语句落空 
      // 'no-floating-decimal': 2, // 禁止无用得浮点小数
      // 'no-func-assign': 2, // 禁止对 function 声明重新赋值
      // 'no-implied-eval': 2, // 禁用隐式的eval()
      // 'no-inner-declarations': [2, 'functions'], // 禁止在嵌套的语句块中出现 function 声明
      // 'no-invalid-regexp': 2, // 禁止在 RegExp 构造函数中出现无效的正则表达式
      // 'no-irregular-whitespace': 2, // 禁止不规则的空白
      // 'no-iterator': 2, // 禁用迭代器
      // 'no-label-var': 2, // 禁用与变量同名的标签
      // 'no-labels': [2, {
      //   'allowLoop': false,
      //   'allowSwitch': false
      // }], // 禁用标签语句
      // 'no-lone-blocks': 2, // 禁用不必要的嵌套块
      // 'no-mixed-spaces-and-tabs': 2, // 禁止使用 空格 和 tab 混合缩进
      // 'no-multi-spaces': 2, // 禁止出现多个空格
      // 'no-multi-str': 2, // 禁止多行字符串
      // 'no-native-reassign': 2, // 禁止重新分配本机对象
      // 'no-unsafe-negation': 2, // 禁止对关系运算符的左操作数使用否定操作符
      // 'no-new-object': 2, // 禁止使用 Object 构造函数
      // 'no-new-require': 2, // 不允许 new require 
      // 'no-new-symbol': 2, // 禁止 Symbolnew 操作符和 new 一起使用
      // 'no-new-wrappers': 2, // 禁止原始类型包装实例 String、Number 和 Boolean
      // 'no-obj-calls': 2, // 禁止将全局对象当作函数进行调用
      // 'no-octal': 2, // 禁用八进制字面量 0开头得数字
      // 'no-octal-escape': 2, // 禁止在字符串字面量中使用八进制转义序列 
      // 'no-path-concat': 2, // 当使用 _dirname 和 _filename 时不允许字符串拼接
      // 'no-proto': 2, // 禁用__proto__
      // 'no-redeclare': 2, // 禁止重新声明变量 
      // 'no-regex-spaces': 2, // 禁止正则表达式字面量中出现多个空格 
      // 'no-return-assign': [2, 'except-parens'], // 禁止在返回语句中赋值 
      // 'no-self-assign': 2, // 禁止自身赋值
      // 'no-self-compare': 2, // 禁止自身比较
      // 'no-sequences': 2, // 不允许使用逗号操作符
      // 'no-shadow-restricted-names': 2, // 关键字不能被覆盖 重新定义
      // 'no-spaced-func': 2, // 不允许函数标识符和它们的应用程序之间有空格
      // 'no-this-before-super': 2, // 在构造函数中禁止在调用super()之前使用this或super
      // 'no-throw-literal': 2, // 限制可以被抛出的异常
      // 'no-trailing-spaces': 2, // 禁用行尾空白
      // 'no-undef': 2, // 禁用未声明的变量
      // 'no-undef-init': 2, // 不允许初始化变量值为
      // 'no-unexpected-multiline': 2, // 禁止使用令人困惑的多行表达式 (
      // 'no-unmodified-loop-condition': 2, // 禁用一成不变的循环条件
      // 'no-unneeded-ternary': [2, {
      //   'defaultAssignment': false
      // }], // 禁止可以表达为更简单结构的三元操作符 
      // 'no-unreachable': 2, // 该规则禁止在 return、throw、continue 和 break 语句后出现不可达代码。
      // 'no-unsafe-finally': 2, // 禁止在 finally 语句块中出现控制流语句
      // 'no-useless-call': 2, // 禁用不必要的 .call() 和 .apply()
      // 'no-useless-computed-key': 2, // 禁止在对象中使用不必要的计算属性
      // 'no-useless-constructor': 2, // 禁用不必要的构造函数
      // 'no-useless-escape': 0, // 禁用不必要的转义
      // 'no-whitespace-before-property': 2, // 禁止属性前有空白
      // 'one-var': [2, {
      //   'initialized': 'never'
      // }], // 强制函数中的变量在一起声明或分开声明
      // 'operator-linebreak': [2, 'after', {
      //   'overrides': { // 
      //     '?': 'before',
      //     ':': 'before'
      //   }
      // }], // 强制操作符使用一致的换行符风格,  要求把换行符放在操作符后面
      // 'padded-blocks': [2, 'never'],
      // 'semi-spacing': [2, {
      //   'before': false,
      //   'after': true
      // }], // 它强制分号之后有空格，禁止分号之前有空格。
      // 'space-before-blocks': [2, 'always'], // 块语句必须总是至少有一个前置空格
      // 'space-before-function-paren': [2, 'never'], // 禁止在参数的 ( 前面有空格。
      // 'space-in-parens': [2, 'never'], // 强制圆括号内没有空格
      // 'space-infix-ops': 2, // 要求中缀操作符周围有空格 
      // 'space-unary-ops': [2, {
      //   'words': true,
      //   'nonwords': false
      // }], // 在一元操作符之前或之后存在空格 
      // 'spaced-comment': [2, 'always', { // 或 /* 必须跟随至少一个空白。
      //   'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
      // }],
      // 'template-curly-spacing': [2, 'never'], //  禁止花括号内出现空格
      // 'use-isnan': 2, // 要求调用 isNaN()检查 NaN
      // 'valid-typeof': 2, // 强制 typeof 表达式与有效的字符串进行比较
      // 'wrap-iife': [2, 'any'], //需要把立即执行的函数包裹起来
      // 'prefer-const': 2 // 如果一个变量不会被重新赋值，最好使用const进行声明
      
  },
  overrides: [{
      "files": ["*.vue"],
      "rules": {
          "indent": "off",
          "eol-last": 0,
      },
  }, ],
  parserOptions: {
      parser: 'babel-eslint'
  }

}
