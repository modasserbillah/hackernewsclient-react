import React from 'react';
import ReactDOM from 'react-dom';
import App from './index.js';
import renderer from 'react-test-renderer';


describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  test('snapshot', ()=>{
    const component = renderer.create(
      <App />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
