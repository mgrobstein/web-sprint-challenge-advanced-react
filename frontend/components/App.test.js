// Write your tests here

import AppFunctional from './AppFunctional';
import {render } from'@testing-library/react';
import React from 'react'

test('Does it render', () => {
  render(<AppFunctional />);
});

// test('sanity', () => {
//   expect(true).toBe(false)
// })
