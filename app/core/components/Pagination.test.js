import React from 'react';
import { mount } from 'enzyme';
import Pagination from './Pagination';
import Immutable from 'immutable';

describe('Pagination', () => {
  const buildItems = (number) => {
    const items = [];
    for (let i = 0; i < number; i++) {
      items[i] = {
        id: `itemId${i}`,
        name: `itemName${i}`,
      };
    }
    return Immutable.fromJS(items);
  };

  it('renders pagination', async () => {
    const items = buildItems(50);
    const onChangePage = jest.fn();
    const wrapper = await mount(<Pagination items={items} onChangePage={onChangePage} />);
    expect(wrapper).toMatchSnapshot();
  });
});
