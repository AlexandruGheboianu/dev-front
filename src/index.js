import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const client = require('./client');
const api = 'http://localhost:8080';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {employees: []};
        this.totalElements = 0;
        this.totalPages = 0;
    }

    componentDidMount() {
        let self = this;
        client({method: 'GET', path: api + '/employees'}).then(
            function (response) {
                self.setState(
                    {
                        employees: response.entity.content,
                        totalElements: response.entity.totalElements,
                        totalPages: response.entity.totalPages
                    }
                );
            },
            function (response) {
                alert(response.status.code);
            }
        );
    }

    render() {
        return (
            <EmployeeList employees={this.state.employees} pages={this.state.totalPages}
                          size={this.state.totalElements}/>
        )
    }
}


class EmployeeList extends React.Component {
    render() {
        return (
            <div>
                <table className="table table-striped table-bordered">
                    <thead className="thead-inverse">
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.employees.map(employee =>
                        <Employee key={employee.id} employee={employee}/>
                    )}
                    </tbody>
                </table>
                <Pagination pageCount={this.props.pages} size={this.props.size}/>
            </div>
        )
    }
}

class Employee extends React.Component {

    render() {
        return (
            <tr>
                <td>{this.props.employee.id}</td>
                <td>{this.props.employee.firstName}</td>
                <td>{this.props.employee.lastName}</td>
                <td>{this.props.employee.email}</td>
            </tr>
        )
    }
}

class Pagination extends React.Component {
    render() {
        var pages = [];
        for (var i = 1; i <= this.props.pageCount; i++) {
            pages.push(<a href="#" key={i}>{i}</a>);
        }
        return (
            <div className="pagination">
                <a href="#">&laquo;</a>
                {pages}
                <a href="#">&raquo;</a>
            </div>
        );
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('react')
)