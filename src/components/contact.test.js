import React from 'react';
import { shallow, mount } from 'enzyme';
import Contact from './contact';
import TestRenderer from 'react-test-renderer'; // ES6

const testContact = {firstName:"MyFirst", lastName:"MyLast", phone:"555-123-4567",addressLine1:"Line 1",state:"AZ",}
const testContact2 = {firstName:"22222", lastName:"sssss", phone:"aaaaa",};


describe('Contact', () => {
	it('renders without crashing', () => {
		  shallow(<Contact />);
	});
});
	  
  test('app runs', () => {
	  const testRenderer = TestRenderer.create(
			  <Contact key={9999999} header={true} />,
			  );
	  let tree = testRenderer.toJSON();
	  expect(tree).toMatchSnapshot();
  });
  

  test('app renders non-selected result', () => {
	  const testRenderer = TestRenderer.create(
			  <Contact info={testContact} rowindex="2" selected={false} />,
	  		);
	  let tree = testRenderer.toJSON();
	  expect(tree).toMatchSnapshot();
  });
	  

  test('app renders selected result', () => {
	  const testRenderer = TestRenderer.create(
  				<Contact info={testContact} rowindex="2" selected={true} />,
	  			);
	  let tree = testRenderer.toJSON();
	  expect(tree).toMatchSnapshot();
  });