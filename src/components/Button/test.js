import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from '../App';
import Button from './index';

describe('Button', ( ) => {
  it('renders', ( ) => {
    const div = document.createElement('div');
    ReactDOM.render(<Button> Give me some </Button>, div);
  });

  test('snapshot', ( ) => {
    const component = renderer.create(
      <Button> Give me some </Button>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
