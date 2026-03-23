import { useDispatch, useSelector } from 'react-redux';
import { activeFilterChanged } from '../../actions';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const filters = useSelector(state => state.filters.filters);

    const activeFilter = useSelector(state => state.filters.activeFilter);
    const dispatch = useDispatch();

    const renderFilters = (arr) => {
        if (!arr || arr.length === 0) {
            return null;
        }    

        return arr.map((filter) => {
            let className = 'btn btn-outline-dark';
            if (filter === 'fire') {
                className = "btn btn-danger";
            } else if (filter === 'water') {
                className="btn btn-primary";
            } else if (filter === 'wind') {
                className="btn btn-success"
            } else if (filter === 'earth') {
                className="btn btn-secondary"
            }
            
            const isActive = filter === activeFilter;

            return (
                <button
                    type='button'
                    key={filter}
                    className={`${className} ${isActive ? 'active' : ''}`}
                    onClick={() => dispatch(activeFilterChanged(filter))}>
                        {filter}
                </button>
            )
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;