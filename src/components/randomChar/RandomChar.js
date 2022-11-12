import { Component } from 'react';

import ErrorMessage from '../errorMessage/errorMesage';
import Spiner from '../spiner/Spiner';
import MarvelService from '../../services/MarvelService';
import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {

    state = {
        name: null,
        description: null,
        thumbnail: null,
        homepage: null,
        wiki: null,
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
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
            loading: true
        })
    }

    updateChar = () => {
        this.turnONspiner();
        this.offError();
        const id = Math.floor(Math.random() * (1011400 - 1009207) + 1009207);
        
        this.marvelService
            .getCharacter(id)
            .then(resp => {
                this.setState({...resp, loading: false, error: false})

            })
            .catch(this.onError);
    }



    render() {

        console.log('RandomChar-render');

        const { loading, error } = this.state;
        
        const errorMesage = error ? <ErrorMessage/> : null;
        const spiner = loading ? <Spiner/> : null;
        const content = !(loading || error) ? <View char={this.state}/> : null;
        
        return (
            <div className="randomchar">
                {errorMesage}
                {spiner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick ={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }

}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki } = char;
    const noImage = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    let classForImg = 'randomchar__img';
    

    if(thumbnail === noImage) classForImg = 'randomchar__noImg';

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={classForImg} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;

/* const RandomChar = () => {
    return (
        <div className="randomchar">
            <div className="randomchar__block">
                <img src={thor} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">Thor</p>
                    <p className="randomchar__descr">
                        As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...
                    </p>
                    <div className="randomchar__btns">
                        <a href="#" className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href="#" className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

export default RandomChar; */