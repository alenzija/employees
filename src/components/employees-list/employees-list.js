import './employees-list.css';
import EmployeesListItem from '../employees-list-item/employees-list-item';

const EmployeesList = ({data, onDelete, onToggleProps,onChangeSalary}) =>{
    const elements = data.map(item => { 
        const {id, ...propsItem} = item;
        return <EmployeesListItem 
                    key = {id} 
                    {...propsItem} 
                    onDelete = {() => onDelete(id)}
                    onToggleProps = {(e) => onToggleProps(id, e.currentTarget.dataset.toggle)}
                    onChangeSalary = {(e) => {
                        const salary = +e.target.value.replace(/\$/,'');
                        if(salary) onChangeSalary(id, salary);
                    }} />
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;