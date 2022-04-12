require = require('esm')(module)
const { passwordDecoding, passwordEncoding } = require('../src/utils')

const ciphertext = passwordEncoding('1234567')

console.log('ciphertext：', ciphertext)

const password = passwordDecoding(ciphertext)
console.log('password：', password)
