import {useEffect, useState} from 'react';
import './App.css';
import SingleCard from "./components/SingleCard";

const cardImages = [
    {"src": "/img/helmet-1.png", matched: true},
    {"src": "/img/potion-1.png", matched: true},
    {"src": "/img/ring-1.png", matched: true},
    {"src": "/img/scroll-1.png", matched: true},
    {"src": "/img/shield-1.png", matched: true},
    {"src": "/img/sword-1.png", matched: true},
]
function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random()}))

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTurns(0);

        setTimeout(() => {
            setCards(prevCards => {
                return prevCards.map((card) => ({...card, matched: false}))
            })
        }, 1000)
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);

            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map((card) => {
                        if (card.src === choiceOne.src) return {...card, matched: true};

                        return card
                    })
                })
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000)
            }
            
        }
    }, [choiceOne, choiceTwo]);

    useEffect(() => {
        shuffleCards();
    }, [])

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
    }
    return (
        <div className="App">
            <h1>Magic Match</h1>
            <button onClick={shuffleCards}>New Game</button>
            <div className="card-grid">
                {cards.map(card => (
                    <SingleCard flipped={card === choiceOne || card === choiceTwo || card.matched}
                                disabled={disabled}
                                handleChoice={handleChoice} key={card.id} card={card}/>
                ))}
            </div>

            <p>Turns: {turns}</p>
        </div>
    );
}

export default App;
