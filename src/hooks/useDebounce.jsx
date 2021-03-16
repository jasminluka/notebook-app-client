import { useRef, useEffect } from 'react'

import { debounce } from '../utils/debounce'

const useDebounce = (callback, selectedCategory, delay = 250) => {
  const delayedFn = useRef(debounce(callback, delay))

  useEffect(() => {
		delayedFn.current = debounce(callback, delay)
	}, [callback, selectedCategory, delay])

  return delayedFn.current
}

export default useDebounce