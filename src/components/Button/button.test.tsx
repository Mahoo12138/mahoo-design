import {render, screen} from '@testing-library/react'
import Button from './button';

test('our react component button test',()=>{
  render(<Button>Nice</Button>)
  const element = screen.getByText('Nice');
  expect(element).toBeTruthy()
})