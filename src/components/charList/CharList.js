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
        this.marvelService
            .getAllCharacters(this.state.offset)
                .then((resp) => {
                    this.setState({
                        charLst: resp,
                        offset: this.state.offset + 9
                    });            
                })

    }

    onCharClick = (e) => {
        const {charLst} = this.state;
        const {currCharId} = this.props;

        console.log('onCharClick-e.currentTarget.id:' + e.currentTarget.id);

        this.setState({

                activCharItem: e.currentTarget.id
            
        });

        console.log('onCharClick-activCharItem: ' + this.state.activCharItem); 
        console.log('{...charLst[e.currentTarget.id]}.id :' + {...charLst[e.currentTarget.id]}.id );
        
        currCharId({...charLst[e.currentTarget.id]}.id);
    }

    render() {
        const {charLst, activCharItem } = this.state;
        console.log('CharList-render-activCharItem: ' + activCharItem);

        for (let i = 0; i <= 8; i++) this.arrClass[i] = "char__item";
        if(activCharItem !== null) this.arrClass[activCharItem] = `${this.arrClass[activCharItem]} char__item_selected`;


        return (
            <div className="char__list">
                <ul className="char__grid">
                    <li id={"0"} className={this.arrClass[0]} onClick={this.onCharClick}>
                        <img src={{...charLst[0]}.thumbnail} alt="abyss" />
                        <div className="char__name">{{...charLst[0]}.name}</div>
                    </li>
                    <li id="1" className={this.arrClass[1]} onClick={this.onCharClick}>
                        <img src={{...charLst[1]}.thumbnail} alt="abyss" />
                        <div className="char__name">{{...charLst[1]}.name}</div>
                    </li>
                    <li id="2" className={this.arrClass[2]} onClick={this.onCharClick}>
                        <img src={{...charLst[2]}.thumbnail} alt="abyss" />
                        <div className="char__name">{{...charLst[2]}.name}</div>
                    </li>
                    <li id="3" className={this.arrClass[3]} onClick={this.onCharClick}>
                        <img src={{...charLst[3]}.thumbnail} alt="abyss" />
                        <div className="char__name">{{...charLst[3]}.name}</div>
                    </li>
                    <li id="4" className={this.arrClass[4]} onClick={this.onCharClick}>
                        <img src={{...charLst[4]}.thumbnail} alt="abyss" />
                        <div className="char__name">{{...charLst[4]}.name}</div>
                    </li>
                    <li id="5" className={this.arrClass[5]} onClick={this.onCharClick}>
                        <img src={{...charLst[5]}.thumbnail} alt="abyss" />
                        <div className="char__name">{{...charLst[5]}.name}</div>
                    </li>
                    <li id="6" className={this.arrClass[6]} onClick={this.onCharClick}>
                        <img src={{...charLst[6]}.thumbnail} alt="abyss" />
                        <div className="char__name">{{...charLst[6]}.name}</div>
                    </li>
                    <li id="7" className={this.arrClass[7]} onClick={this.onCharClick}>
                        <img src={{...charLst[7]}.thumbnail} alt="abyss" />
                        <div className="char__name">{{...charLst[7]}.name}</div>
                    </li>
                    <li id="8" className={this.arrClass[8]} onClick={this.onCharClick}>
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