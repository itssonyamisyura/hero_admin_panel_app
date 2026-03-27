import { useSelector } from 'react-redux';
import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';


const HeroesList = () => {
    const {
        data: heroes = [],
        // isFetching, next requests
        isLoading, // first request
        isError,
    } = useGetHeroesQuery();

    const activeFilter = useSelector(state => state.filters.activeFilter);
    
    const [deleteHero] = useDeleteHeroMutation();

    const onDelete = async (id) => {
        try {
            await deleteHero(id).unwrap();
        } catch (err) {
            console.log(err);
        }
    }

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} id={id} onDelete={onDelete} {...props}/>
        })
    }

    const filteredHeroes = 
        activeFilter === 'all' 
            ? heroes 
            : heroes.filter(hero => hero.element === activeFilter);

    const elements = renderHeroesList(filteredHeroes);

    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;