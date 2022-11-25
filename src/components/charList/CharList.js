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
                        charLst: resp,
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

        for (let i = 0; i <= 8; i++) this.arrClass[i] = "char__item";
        if(activCharItem !== null) this.arrClass[activCharItem] = `${this.arrClass[activCharItem]} char__item_selected`;

       return (
            <div className="char__list">
                <ul className="char__grid">
                    <li tabindex ="0" id={"0"} className={this.arrClass[0]} onFocus={this.onCharClick}>
                        <img src={{...charLst[0]}.thumbnail} alt="abyss" />
                        <div className="char__name">{{...charLst[0]}.name}</div>
                    </li>
                    <li tabindex ="0" id="1" className={this.arrClass[1]} onFocus={this.onCharClick}>
                        <img src={{...charLst[1]}.thumbnail} alt="abyss" />
                        <div className="char__name">{{...charLst[1]}.name}</div>
                    </li>
                    <li tabindex ="0" id="2" className={this.arrClass[2]} onFocus={this.onCharClick}>
                        <img src={{...charLst[2]}.thumbnail} alt="abyss" />
                        <div className="char__name">{{...charLst[2]}.name}</div>
                    </li>
                    <li tabindex ="0" id="3" className={this.arrClass[3]} onFocus={this.onCharClick}>
                        <img src={{...charLst[3]}.thumbnail} alt="abyss" />
                        <div className="char__name">{{...charLst[3]}.name}</div>
                    </li>
                    <li tabindex ="0" id="4" className={this.arrClass[4]} onFocus={this.onCharClick}>
                        <img src={{...charLst[4]}.thumbnail} alt="abyss" />
                        <div className="char__name">{{...charLst[4]}.name}</div>
                    </li>
                    <li tabindex ="0" id="5" className={this.arrClass[5]} onFocus={this.onCharClick}>
                        <img src={{...charLst[5]}.thumbnail} alt="abyss" />
                        <div className="char__name">{{...charLst[5]}.name}</div>
                    </li>
                    <li tabindex ="0" id="6" className={this.arrClass[6]} onFocus={this.onCharClick}>
                        <img src={{...charLst[6]}.thumbnail} alt="abyss" />
                        <div className="char__name">{{...charLst[6]}.name}</div>
                    </li>
                    <li tabindex ="0" id="7" className={this.arrClass[7]} onFocus={this.onCharClick}>
                        <img src={{...charLst[7]}.thumbnail} alt="abyss" />
                        <div className="char__name">{{...charLst[7]}.name}</div>
                    </li>
                    <li tabindex ="0" id="8" className={this.arrClass[8]} onFocus={this.onCharClick}>
                        <img src={{...charLst[8]}.thumbnail} alt="abyss" />
                        <div className="char__name">{{...charLst[8]}.name}</div>
                    </li>
                </ul>
                <button className="button button__main button__long" onClick={this.updateCharList} >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


export default CharList;