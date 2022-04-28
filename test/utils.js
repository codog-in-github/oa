require = require('esm')(module)
const { passwordDecoding, passwordEncoding } = require('../src/utils')

const ciphertext = passwordEncoding('thisismypassword')
console.log('ciphertext：', ciphertext)

const password = passwordDecoding(ciphertext)
console.log('password：', password)
