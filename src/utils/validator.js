/**
 * 断言类工具函数
 * @author zjy<zhaojangyu@gmail.com>
 * @date 2023-09-09
 */

function is (type) {
  return (val) => Object.prototype.toString.call(val) === `[object ${type}]`;
}
/**
 * @type {(val) => val is string}
 */
export const isString = is('String');

/**
 * @type {(val) => val is Array<any>}
 */
export const isArray = is('Array');

/**
 * @type {(val) => val is Array<any>}
 */
export const isObject = is('Object');

/**
 * @type {(val) => val is Function}
 */
export const isFunction = is('Function');
