import React from 'react';
import { shallow } from 'enzyme';
import Contacts from './contacts';
import TestRenderer from 'react-test-renderer'; // ES6

const testContact = {firstName:"MyFirst", lastName:"MyLast", phone:"555-123-4567",addressLine1:"Line 1",state:"AZ",}
const testContact2 = {firstName:"22222", lastName:"sssss", phone:"aaaaa",};

describe('Contacts', () => {
	

	it('renders without crashing', () => {
		  shallow(<Contacts />);
	});

	it('Contacts.handleSave', () => {

		const wrapper = shallow(<Contacts />);
		// manually trigger the callback
		wrapper.instance().handleSave( false, testContact ) ;
		wrapper.instance().handleSave( false, testContact ) ;
		wrapper.instance().handleSave( false, testContact ) ;
		expect(wrapper.instance().state.contacts.length).toEqual(3);
		wrapper.instance().handleSave( 0, testContact ) ;
		wrapper.instance().handleSave( 1, testContact ) ;
		wrapper.instance().handleSave( 2, testContact ) ;
		// This one doesn't exist so shouldn't update
		wrapper.instance().handleSave( 3, testContact ) ;
		expect(wrapper.instance().state.contacts.length).toEqual(3);
	});
	

	it('Contacts.handleOpen', () => {
		const wrapper = shallow(<Contacts />);
		wrapper.instance().handleSave( false, testContact ) ;
		wrapper.instance().handleSave( false, testContact ) ;
		wrapper.instance().handleSave( false, testContact ) ;
		
		wrapper.instance().handleOpen( 1 ) ;
		expect(wrapper.instance().state.currentlySelected).toEqual(1);
		wrapper.instance().handleOpen( 2 ) ;
		expect(wrapper.instance().state.currentlySelected).toEqual(2);
		wrapper.instance().handleOpen( 23 ) ;
		expect(wrapper.instance().state.currentlySelected).toEqual( false );
	});
	
	it('Contacts.handleDelete', () => {
		const wrapper = shallow(<Contacts />);
		wrapper.instance().handleSave( false, testContact ) ;
		wrapper.instance().handleSave( false, testContact ) ;
		wrapper.instance().handleSave( false, testContact ) ;
		
		wrapper.instance().handleDelete( 1 ) ;
		expect(wrapper.instance().state.contacts.length).toEqual(2);
		wrapper.instance().handleDelete( 1 ) ;
		expect(wrapper.instance().state.contacts.length).toEqual(1);
		wrapper.instance().handleDelete( 23 ) ;
		expect(wrapper.instance().state.contacts.length).toEqual( 1 );
		wrapper.instance().handleDelete( 0 ) ;
		expect(wrapper.instance().state.contacts.length).toEqual(0);
		wrapper.instance().handleDelete( 0 ) ;
		expect(wrapper.instance().state.contacts.length).toEqual(0);
	});
});

test('app runs', () => {
	  const testRenderer = TestRenderer.create(
			    <Contacts />,
			  );
	  let tree = testRenderer.toJSON();
	  expect(tree).toMatchSnapshot();

	  const testInstance = testRenderer.getInstance();
	  testInstance.handleSave( false, testContact ) ;
	  expect( testRenderer.toJSON() ).toMatchSnapshot();
	  testInstance.handleSave( false, testContact2 ) ;
	  expect( testRenderer.toJSON() ).toMatchSnapshot();
	  
	});