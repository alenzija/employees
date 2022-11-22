import './employees-list.css';
import EmployeesListItem from '../employees-list-item/employees-list-item';

const EmployeesList = ({data, onDelete, onToggleProps}) =>{
    const elements = data.map(item => { 
        const {id, ...propsItem} = item;
        return <EmployeesListItem 
                    key = {id} 
                    {...propsItem} 
                    onDelete = {() => onDelete(id)}
                    onToggleProps = {(e) => onToggleProps(id, e.currentTarget.dataset.toggle)} />
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;