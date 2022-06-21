import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom'

function CardList({ cards }) {
    const [currentCard, setCurrentCard] = useState(0)
    const [frontSide, setFrontSide] = useState(true)
    const {deckId} = useParams()
    const history = useHistory()
    

    const nextHandler = () => {
        if (currentCard === (cards.length-1)) {
            window.confirm("Click 'cancel' to return to the homepage.")
            ? setCurrentCard(() => 0) 
            : history.push("/")

        
        } else {
            setCurrentCard((currentCard) => currentCard+1)
            setFrontSide(() => !frontSide)
        }
    }

    
    const flipHandler = () => {
        setFrontSide(() => !frontSide)
    }
 
    
    
    if (cards.length > 2) { 
        return (
            <div className="row p-3">
                <div className="card w-100">

                    <div className="card-body">
                        <h5 className="card-title">
                            Card {currentCard+1} of {cards.length}
                        </h5>
                    
                        <p className="card-text">
                            {frontSide ? cards[currentCard].front : cards[currentCard].back}
                        </p>

                        
                        <button onClick={flipHandler} className="btn btn-secondary mr-3">
                            Flip
                        </button>

                        
                        {frontSide ? null : 
                        <button onClick={nextHandler} className="btn btn-primary">
                            Next
                        </button>}                 
                    </div>

                </div>
            </div>
        )
    } else {
        return (
            <div className="row p-3 w-100">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            Not enough cards.
                        </h5>
                        <p className="card-text">
                            You need at least 3 cards to study. There are {cards.length} cards in this deck.
                        </p>

                        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary ml-3">
                                <i className="fa fa-plus" aria-hidden="true">
                                </i> 
                            Add Cards
                        </Link>
                    </div>
                </div>
            </div>
        )    
    }
}

export default CardList;