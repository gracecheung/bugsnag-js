// minimal implementations of useful ES functionality

// all we really need for arrays is reduce – everything else is just sugar!

// Array#reduce
const reduce = (arr, fn, accum) => {
  let val = accum
  for (let i = 0, len = arr.length; i < len; i++) val = fn(val, arr[i], i, arr)
  return val
}

// Array#filter
const filter = (arr, fn) =>
  reduce(arr, (accum, item, i, arr) => !fn(item, i, arr) ? accum : accum.concat(item), [])

// Array#map
const map = (arr, fn) =>
  reduce(arr, (accum, item, i, arr) => accum.concat(fn(item, i, arr)), [])

// Array#includes
const includes = (arr, x) =>
  reduce(arr, (accum, item, i, arr) => accum === true || item === x, false)

const _hasOwnProperty = Object.prototype.hasOwnProperty
const _hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString')
const _dontEnums = [
  'toString', 'toLocaleString', 'valueOf', 'hasOwnProperty',
  'isPrototypeOf', 'propertyIsEnumerable', 'constructor'
]

// Object#keys
const keys = obj => {
  // stripped down version of
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/Keys
  const result = []
  let prop
  for (prop in obj) {
    if (_hasOwnProperty.call(obj, prop)) result.push(prop)
  }
  if (!_hasDontEnumBug) return result
  for (let i = 0, len = _dontEnums.length; i < len; i++) {
    if (_hasOwnProperty.call(obj, _dontEnums[i])) result.push(_dontEnums[i])
  }
  return result
}

// Array#isArray
const isArray = obj => Object.prototype.toString.call(obj) === '[object Array]'

module.exports = { map, reduce, filter, includes, keys, isArray }