import { Component } from 'react';

import './charInfo.scss';
//import thor from '../../resources/img/thor.jpeg';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import ErroeMessage from '../errorMessage/errorMesage.js';
import Spiner from '../spiner/Spiner';

class CharInfo extends Component {
    constructor(props) {
        super(props);
        this.char = {};
        this.state = {
            
            loading: false,
            error: false,
        }

    }

    marvelService = new MarvelService()

    componentDidUpdate(prevProps, prevState) {
        if (this.props.currChar !== prevProps.currChar) this.updateChar(this.props.currChar)
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    offError = () => {
        this.setState({
            error: false
        })
    }

    turnONspiner() {
        this.setState({
            loading: true,
            error: false
        })
    }

    updateChar = (id) => {
        console.log(id);
        if(!id) return;
        this.turnONspiner();
        this.offError();
        
        this.marvelService
            .getCharacter(id)
            .then(resp => {
                this.char = {...resp};
                this.setState({loading: false, error: false});
            })
            .catch(this.onError);
    }

    render() {

        const {loading, error} = this.state;
        const {currChar} = this.props;

      //  const content = !(loading || error || !currChar) ? <View char={this.char}/> : null;
        const content = !(loading || error) && currChar ? <View char={this.char}/> : null;
        const spiner = loading ? <Spiner /> : null;
        const errorMesage = error ? <ErroeMessage /> : null;
        const skeleton = currChar ? null : <Skeleton />

        return (
            <div className="char__info">
                {errorMesage}
                {spiner}
                {skeleton}
                {content}
            </div>
        )
    }
}


const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics } = char;
    const descr = description ? description : "There is no description for this character.";
    let imgStyle = {'objectFit': 'cover'};
    let comicsList;

    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') imgStyle = {'objectFit': 'cover'};

    if({...comics}.available) {
           comicsList = {...comics}.items.map( (item, i) => {
                return (
                    <a key={i} className="char__comics-item" href={item.resourceURI}> {item.name}</a>
                )
                })
        } else comicsList = "There are no comisc for this character.";
    
 
    return (
        <>
            <div className="char__basics">
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {descr}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comicsList}
                    {/* <li className="char__comics-item">
                        All-Winners Squad: Band of Heroes (2011) #3
                    </li>
                    <li className="char__comics-item">
                        Alpha Flight (1983) #50
                    </li>
                    <li className="char__comics-item">
                        Amazing Spider-Man (1999) #503
                    </li>
                    <li className="char__comics-item">
                        Amazing Spider-Man (1999) #504
                    </li>
                    <li className="char__comics-item">
                        AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Vengeance (2011) #4
                    </li>
                    <li className="char__comics-item">
                        Avengers (1963) #1
                    </li>
                    <li className="char__comics-item">
                        Avengers (1996) #1
                    </li> */}
                </ul>
        </>
        
    )
}

export default CharInfo;