import React from 'react';
import { shallow } from 'enzyme';
import Home from './index';

describe('The Home page', () => {
  it('should render without failing', () => {
    shallow(<Home />);
  });
});
