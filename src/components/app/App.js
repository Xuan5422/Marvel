import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';


class App extends Component {

        state = {
            currentChar: null,
        }
    

    currCharId = (id) => {
        this.setState({
                currentChar: id            
        });

        console.log('App::currCharId::currentChar' + id);
    }

    render() {
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <RandomChar />
                    <div className="char__content">
                        <CharList currCharId={this.currCharId}/>
                        <CharInfo currChar={this.state.currentChar} />
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }

}

export default App;