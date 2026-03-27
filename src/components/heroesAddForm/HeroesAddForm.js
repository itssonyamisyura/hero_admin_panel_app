import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {useHttp} from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilters } from '../heroesList/filtersSlice';
import { useCreateHeroMutation } from '../../api/apiSlice';

const HeroesAddForm = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');

    const [createHero, {isLoading}] = useCreateHeroMutation();

    const dispatch = useDispatch();
    const { request } = useHttp();
    const filters = useSelector(state => state.filters.filters);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const newHero = {
            name,
            description,
            element
        }
        try {
            await createHero(newHero).unwrap();
            setName('');
            setDescription('');
            setElement('');
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        dispatch(fetchFilters())
    }, [dispatch])


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
                    name="name" 
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