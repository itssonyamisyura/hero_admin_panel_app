import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {useHttp} from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { heroCreated, filtersFetched} from '../../actions/index';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');

    const dispatch = useDispatch();
    const { request } = useHttp();
    const filters = useSelector(state => state.filters);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name,
            description,
            element
        }

        request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
            .then(() => {
                dispatch(heroCreated(newHero));
                setName('');
                setDescription('');
                setElement('');
            })
            .catch(err => console.log(err))    
    }

    useEffect(() => {
        request('http://localhost:3001/filters')
            .then(data => dispatch(filtersFetched(data)))
            .catch(err => console.log(err));
    }, [])


    const renderFilters = (arr) => {
        return arr
            .filter(item => item !== 'all')
            .map(item => (
                <option key={item} value={item}>
                    {item}
                </option>
        ))
    }

    return (
        <form onSubmit={onSubmitHandler} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text"
                    name="text" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={element}
                    onChange={(e) => setElement(e.target.value)}>
                    <option value=''>Я владею элементом...</option>
                    {renderFilters(filters)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;