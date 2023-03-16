import { renderHook } from '@testing-library/react'
import useCounter from '../Counter';
import '@testing-library/jest-dom';

test('should use counter', () => {
  const { result } = renderHook(() => useCounter())
  console.log('jag',result);
  expect(result.current.count).toBe(0)
  expect(typeof result.current.increment).toBe('function')
})