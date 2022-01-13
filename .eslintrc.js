module.exports = {
    root: true,
    env: {
      browser: true
    },
    globals: {
      process: true
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', 'elemefe'],
    parserOptions: {
      parser: 'babel-eslint'
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 2 : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 'off',
      'indent': [2, 4, { 'SwitchCase': 1 }],
      'block-spacing': [2, 'always'],                                           // 在代码块的花括号间要有空格
      'func-call-spacing': [2, 'never'],                                        // 在函数标识符和其调用之间不能有空格
      'keyword-spacing': [2, { after: true, before: true }],                    // 在if/else这些关键字前后要有空格
      'no-mixed-spaces-and-tabs': 2,                                            // 禁止空格和tab混用
      'no-trailing-spaces': 2,                                                  // 禁止行尾空格
      'object-curly-spacing': [2, 'always', { 'objectsInObjects': true}],       // 在object的花括号间要有空格
      'space-before-blocks': 2,                                                 // 在块之前要有空格
      'space-before-function-paren': [2, 'always'],                             // 在函数左括号前要有空格
      'space-infix-ops': 2,                                                     // 操作符周围要有空格
      'space-unary-ops': 2,                                                     // 在一元操作符后面要有空格
      'spaced-comment': [2, 'always'],                                          // 注释后面要有空格
      'switch-colon-spacing': 2,                                                // switch的冒号后面要有空格
      'arrow-spacing': 2,                                                       // 箭头函数的箭头前后要有空格
      'semi': [2, 'never'],                                                     // 句末不要分号
      'radix': 0,                                                               // parseInt解析的进制
      'eqeqeq': 'off'
    },
    overrides: [
      {
        files: [
          '**/__tests__/*.{j,t}s?(x)',
          '**/tests/unit/**/*.spec.{j,t}s?(x)'
        ],
        env: {
          mocha: true
        }
      }
    ]
  };
  