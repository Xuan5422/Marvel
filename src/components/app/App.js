import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';


const App = () => {

    const [currentChar, setCurrentChar] = useState(null);

    const currCharId = (id) => {
        setCurrentChar(id)
    }


    return (
        <div className="app">
            <AppHeader />
            <main>
                <RandomChar />
                <div className="char__content">
                    <CharList currCharId={currCharId} />
                    <ErrorBoundary>
                        <CharInfo currChar={currentChar} />
                    </ErrorBoundary>

                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    )


}

export default App;