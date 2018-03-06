export function shuffle (arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 节流函数
export function debounce (func, delay) {
  let timer
  // 函数柯里化
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, arguments)
    }, delay)
  }
}
