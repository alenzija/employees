import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            data: [
                {name: 'John S.', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Alex M.', salary: 3000, increase: true, rise: false, id: 2},
                {name: 'Cris W.', salary: 1500, increase: false, rise: false, id: 3},
            ],
            term: '',
            filter: 'all',
            idMax: 4
        }
    }

    deleteItem = (id) =>{
        this.setState(({data})=>{
            return {
                data: data.filter(item => item.id !== id )
            }
        })
    }

    addItem = (name,salary) =>{
        this.setState(({data,idMax})=>{      
            return {
                data: [...data, {
                    name:name,
                    salary:salary,
                    id:this.state.idMax
                }],
                idMax: idMax + 1
            }
        })
    }

    onToggleProps = (id, prop) => {
        this.setState(({data})=>({
            data: data.map(item=> item.id === id ? {...item, [prop]: !item[prop]} : item)
        }))
    }

    searchEmployees = (data, term) => {
        if (term === '') return data;
        return data.filter(item=>item.name.toLowerCase().indexOf(term.toLowerCase())>-1)
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    filterPost = (data, filterType) => {
        switch(filterType){
            case 'rise':{
                return data.filter(item=>item.rise) 
            }
            case 'moreThen1000':{
                return data.filter(item=>item.salary>1000)
            }
            default : return data
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    render() {
        const {data,term,filter} = this.state;
        const visibleData = this.filterPost(this.searchEmployees(data, term),filter) 
        return(
            <div className="app">
                <AppInfo 
                    countEmployees={data.length}
                    countIncreaseEmployees = {data.filter(item=>item.increase).length}  />
                <div className="search-panel">
                    <SearchPanel 
                        onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
                    
                </div>
                <EmployeesList 
                    data={visibleData} 
                    onDelete={this.deleteItem} 
                    onToggleProps={this.onToggleProps} />
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>         
        )
    }
}

export default App;