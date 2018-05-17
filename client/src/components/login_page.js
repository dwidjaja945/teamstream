import React from "react";
import axios from 'axios';

class LogIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            userName:'',
            password:'',
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
    }
    handleChange(event){
        const {name,value} = event.target;

        this.setState({
            [name]:value,
        })
    }
    handleAddItem(event){
        event.preventDefault();
        // this.props.addItemCallback(this.state);
        console.log(this.state);
        const {userName, password} = this.state;
        this.performAxiosCall(userName, password);

        this.setState({
            userName:'',
            password:'',
        });
    }

    performAxiosCall(username, password){
        const dataToSend = {username, password};
        let path = '/api/login';
        axios.post(`http://localhost:9000${path}`, dataToSend)
            .then( (response) => {
                console.log(response);

      /*          const listElements = response.data.todos.map( (item, index) => {
                    const tr = document.createElement('tr');
                    const number = document.createElement('td');
                    const title = document.createElement('td');
                    const completed = document.createElement('td');

                    number.innerText = index + 1;
                    title.innerText = item.title;
                    completed.innerText = item.complete;

                    tr.appendChild(number);
                    tr.appendChild(title);
                    tr.appendChild(completed);
                    document.querySelector('.table tbody').appendChild(tr);
                })*/
            });

    }

    render(){
        const {userName, password} = this.state;
        return(
            <form onSubmit={this.handleAddItem}>
                <div className="row">
                    <div className="col s12 m8 offset-m" >
                        <label>username</label>
                        <input value={userName} onChange={this.handleChange} name='userName' type="text"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m8 offset-m" >
                        <label>password</label>
                        <input value={password} onChange={this.handleChange} name='password' type="text"/>
                    </div>
                </div>
                <div className="right-align">
                    <button className="btn purple darken-2">Submit</button>
                </div>
            </form>
        )
    }
}

export default LogIn;