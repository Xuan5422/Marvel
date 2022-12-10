import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import './charList.scss';
//import abyss from '../../resources/img/abyss.jpg';



class CharList extends Component {

    constructor(props) {
        super(props);
        this.arrClass = [];
        
        this.state = {
            offset: 0,
            activCharItem: null,
            charLst: [],
        
    }
        
        }

    marvelService = new MarvelService()

    componentDidMount() {
        this.updateCharList();
    }

    updateCharList = () => {
        const {currCharId} = this.props;
        this.marvelService
            .getAllCharacters(this.state.offset)
                .then((resp) => {
                    this.setState({
                        charLst: [...this.state.charLst, ...resp],
                        offset: this.state.offset + 9
                    });
                    currCharId(null);          
                })

    }

    onCharClick = (e) => {
        const {charLst} = this.state;
        const {currCharId} = this.props;

        this.setState({
            activCharItem: e.currentTarget.id
        }, () => currCharId({...charLst[this.state.activCharItem]}.id))

    }

    render() {
        const {charLst, activCharItem} = this.state;

        for (let i = 0; i <= charLst.length; i++) this.arrClass[i] = "char__item";
        if(activCharItem !== null) this.arrClass[activCharItem] = `${this.arrClass[activCharItem]} char__item_selected`;

        const visCharList = charLst.map( (item, i) => {
            return (
                <li tabIndex ="0" key={i} id={i} className={this.arrClass[i]} onFocus={this.onCharClick}>
                <img src={{...item}.thumbnail} alt={{...item}.name} />
                <div className="char__name">{{...item}.name}</div>
            </li>
            )
            
        })

       return (
            <div className="char__list">
                <ul className="char__grid">

                    {visCharList}

                </ul>
                <button className="button button__main button__long" onClick={this.updateCharList} >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


export default CharList;