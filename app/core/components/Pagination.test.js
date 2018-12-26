import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Pagination from './Pagination';
import Immutable from 'immutable';
Enzyme.configure({ adapter: new Adapter() });
describe('Pagination', () => {
  const buildItems = (number) => {
    const items = [];
    for (let i = 0; i < number; i++) {
      items[i] ={
        id: `itemId${i}`,
        name: `itemName${i}`,
      };
    }
    return Immutable.fromJS(items);
  };

  it('renders pagination', async() => {
    const items = buildItems(50);
    const onChangePage = jest.fn();
    const wrapper = await mount(<Pagination items={items} onChangePage={onChangePage} />);
    console.log(wrapper.html());
  });
});
