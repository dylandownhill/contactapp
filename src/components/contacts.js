/**
 * 
 */

import React, { Component } from 'react';
import Contact from './contact.js';

import PropTypes from 'prop-types'; 

class Contacts extends Component {
	state={	contacts:[],
			currentlySelected: false ,
			};
	
	constructor(props) {
	    super(props);
	    this.state = {contacts:[],
						currentlySelected: false ,};

	    // This binding is necessary to make `this` work in the callback
	    this.handleSave = this.handleSave.bind(this);
	    this.handleDelete = this.handleDelete.bind(this);
	    this.handleOpen = this.handleOpen.bind(this);
	}
	
	handleOpen = ( id ) => {
		// Index doesn't exist
		if(typeof this.state.contacts[id] === 'undefined') {
			this.setState({ currentlySelected: false});
		}
		else {
			this.setState({ currentlySelected: id});
		}
	}
	
	handleDelete = ( id ) => {
		const newcontacts = this.state.contacts.filter(function(value, index ){
		    return index !== id ;
		});
		this.setState({ contacts: newcontacts});
	}
	handleSave = ( id, info ) => {
		const newcontacts = this.state.contacts;
		if ( id === false ) {
			newcontacts.push( info );
		}
		else if(typeof this.state.contacts[id] !== 'undefined') {
			newcontacts[ id ] = info ;
			this.setState({ currentlySelected: false});
		}
		
		this.setState({ contacts: newcontacts});
	}
	
	
  render() {
	  const contactDisplay = this.state.contacts.map( (item,id) =>
		  <Contact key={id}  info={item} rowindex={id} 
		  			selected={id===this.state.currentlySelected} 
	  				handleDelete={this.handleDelete}
		  			handleSave={this.handleSave}
		  			handleOpen={this.handleOpen} />
	  );
    return ( 
    		<div><h1>Contacts</h1>
				{this.state.contacts.length > 0 &&
	    			<Contact key={9999999} header={true} />
					}
    			{contactDisplay}
    			<h2>Add New</h2>
    			<Contact key={9999998} displayAdd={true}  
						rowindex={false}
  						handleSave={this.handleSave}/>
    		</div>
    		);
  }
}


Contacts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Contacts;
