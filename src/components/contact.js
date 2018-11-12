/**
 * 
 */


import React, { Component } from 'react';
import classNames from 'classnames';
import injectSheet from 'react-jss'

const styles = {
		contact:{
			display:"flex",
		},
		contactfull:{
			flexFlow:"column",
		},
		contacttiny:{
			flexFlow:"row nowrap",
			"& div":{
				width:100,
			},
		},
		contacttinyheader:{
			fontWeight:"bold",
		},
		actionbuttons:{
			display:"flex",
			flexFlow:"row nowrap",
			"& div":{
				margin:"0 10px",
			},
		},
		labelInput:{
			width:100,
			display:"inline-block",
			textAlign:"right",
			paddingRight:10,
		},
		requiredFields:{
			fontSize:"smaller",
			paddingLeft:20,
		}
	}

class Contact extends Component {
	
	state={
		     firstName : '' ,
		     lastName : '' ,
		     addressLine1 : '',
		     state : '' ,
		     phone : '',} 
	
	
	constructor ( props ) {
	    super( props );
	    this.handleChange = this.handleChange.bind(this);
	    this.handleClear = this.handleClear.bind(this);
	    this.handleClose = this.handleClose.bind(this);
	    if ( typeof this.props.info !== 'undefined'){
	    	this.state = this.props.info ;
	    }
	  }
	
	handleClear = () => {
    	this.setState({
   		     firstName : '' ,
   		     lastName : '' ,
   		     addressLine1 : '',
   		     state : '' ,
   		     phone : '',}) ;
		
	}
	
	 handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}
	 
	 handleClose = () => {
		 // Reset state back to the values passed in.
		 this.setState( this.props.info ) ;
		 // Tell parent to close this entry.
		 this.props.handleOpen( false );
	 }
	
  render() {
		const { classes } = this.props;
		
		const SaveDisabled = this.state.firstName.length === 0 || this.state.lastName.length === 0 || this.state.phone.length === 0 ;
		
	if ( typeof this.props.header !== 'undefined' && this.props.header === true ){
    	return (
    			<div className={classNames(classes.contact, classes.contacttiny, classes.contacttinyheader)}>
    				<div className={classes.firstName}>First Name</div>
    				<div className={classes.lastName}>LastName</div>
    				<div className={classes.phone}>Phone</div>
					<div className={classes.actionbuttons}>
	    			</div>
    			</div>
    	);
	}
	else if ( ( typeof this.props.selected !== 'undefined' && this.props.selected === true ) || typeof this.props.displayAdd !== 'undefined' ){
    	return (
    			<div className={classNames(classes.contact, classes.contactfull)}>
					<div className={classes.firstname}>
							<label className={classes.labelInput} htmlFor={'firstName'+this.props.rowindex}>First Name: *</label> 
							<input type='text' id={'firstName'+this.props.rowindex} name='firstName' value={this.state.firstName} onChange={this.handleChange} required='required' />
					</div>
					<div className={classes.lastName}>
							<label className={classes.labelInput} htmlFor={'lastName'+this.props.rowindex}>Last Name: *</label> 
							<input type='text' id={'lastName'+this.props.rowindex} name='lastName' value={this.state.lastName} onChange={this.handleChange} required='required' />
					</div>
					<div className={classes.addressLine1}>
							<label className={classes.labelInput} htmlFor={'addressLine1'+this.props.rowindex}>Address:</label> 
							<input type='text' id={'addressLine1'+this.props.rowindex} name='addressLine1' value={this.state.addressLine1} onChange={this.handleChange} />
					</div>
					<div className={classes.state}>
							<label className={classes.labelInput} htmlFor={'state'+this.props.rowindex}>State:</label> 
							<input type='text' id={'state'+this.props.rowindex} name='state' value={this.state.state} maxLength='2' onChange={this.handleChange} />
					</div>
					<div className={classes.phone}>
							<label className={classes.labelInput} htmlFor={'phone'+this.props.rowindex}>Phone: *</label> 
							<input type='tel' id={'phone'+this.props.rowindex} name='phone' value={this.state.phone} onChange={this.handleChange} required='required' />
					</div>
					<div className={classes.requiredFields}>
							* - required fields.
					</div>
					<div className={classes.actionbuttons}>
						<div className={classes.clear}><input type='button' onClick={this.handleClear} value='Clear' /></div>
						{typeof this.props.displayAdd === 'undefined' &&
							<>
							<div className={classes.delete}><input type='button' onClick={() => this.props.handleDelete( this.props.rowindex)} value='Delete' /></div>
							<div className={classes.close}><input type='button' onClick={this.handleClose} value='Close' /></div>
							<div className={classes.save}><input type='button' onClick={() => this.props.handleSave( this.props.rowindex, this.state )} value='Save' disabled={SaveDisabled}/></div>
							</>
						}
						{typeof this.props.displayAdd !== 'undefined' &&
							<div className={classes.save}><input type='button' onClick={() => this.props.handleSave( this.props.rowindex, this.state )} value='Add' disabled={SaveDisabled}/></div>
						}
					</div>
    			</div>
    	);
    }
    else {
    	return (
    			<div className={classNames(classes.contact, classes.contacttiny)}>
    				<div className={classes.firstName} aria-label="First Name">{this.state.firstName}</div>
    				<div className={classes.lastName} aria-label="Last Name">{this.state.lastName}</div>
    				<div className={classes.phone} aria-label="Phone">{this.state.phone}</div>
					<div className={classes.actionbuttons}>
	    				<div className={classes.delete}><input type='button' onClick={() => this.props.handleDelete(this.props.rowindex)} value='Delete' /></div>
	    				<div className={classes.open}><input type='button' onClick={() => this.props.handleOpen(this.props.rowindex)} value='Open' /></div>
	    			</div>
    			</div>
    	);
    	
    }
  }
}
export default injectSheet(styles)(Contact);
