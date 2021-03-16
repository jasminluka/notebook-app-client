export const debounce = function(fn, delay) {
  let timeoutId

  return function() {
    const args = arguments

    clearTimeout(timeoutId)
    
    timeoutId = setTimeout(() => {
      // timeoutId = null
      fn.apply(this, args)
    }, delay)
  }
}