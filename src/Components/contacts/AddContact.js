import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';
class AddContact extends Component {

    state= {
        name: '',
        email: '',
        phone: '',
        errors: {}
    };

    onSubmit= async (dispatch , e) =>{
        e.preventDefault();
        const { name, email, phone} =this.state;
//check for errors

        if(name === ''){
            this.setState({errors: { name: 'name is required'
            }})
            return;
        }

        if(email === ''){
            this.setState({errors: { email: 'email is required'
            }})
            return;
        }

        if(phone === ''){
            this.setState({errors: { phone: 'phone no is required'
            }})
            return;
        }
        const newContact = {            
            name,
            email,
            phone
        };

      const res = await axios.post('http://jsonplaceholder.typicode.com/users' , newContact)
         dispatch({type: 'ADD_CONTACT', payload: res.data})
        //clear state
        this.setState({
            name:'',
            email:'',
            phone:'',
            errors:{},
        });
        this.props.history.push('/');
    };

    onChange= (e)=> this.setState({[e.target.name] : e.target.value});
    render() {
        const {name, email, phone,errors} =this.state;

return(

    <Consumer>
    {value => {
        const {dispatch} = value;

        return(
            <div className= "card mb-3">
                <div className="card-header">Add Contact</div>
                <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
              <TextInputGroup 
              label="Name"
              name="name"
              placeholder="enter name"
              value={name}
              onChange={this.onChange}
              error={errors.name}
              /> 
              
              <TextInputGroup 
              label="Email"
              name="email"
              placeholder="enter email"
              type= "email"
              value={email}
              onChange={this.onChange}
              error={errors.email}
              />

              <TextInputGroup 
              label="Phone"
              name="phone"
              placeholder="enter phone no"
              value={phone}
              onChange={this.onChange}
              error={errors.phone}
              />
                <input type="submit" value="Add Contact" className="btn btn-light btn-block"/>
                </form>

                </div>
            
                </div>

        )
    }}

    </Consumer>
)


    }
}
export default AddContact;