import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from 'react-router-dom'
import { updateCard, readDeck, readCard } from '../utils/api/index.js'
import CardForm from "./CardForm"


function EditCard() {
    const [deck, setDeck] = useState([])                                       
    const [card, setCard] = useState({front: "", back: "", deckId: ""})        
    const {deckId, cardId} = useParams()                                                  
    const history = useHistory()                                                

    useEffect(() => {                                                            
        const abortController = new AbortController()

        const cardInfo = async () => {                                          
            const response = await readCard(cardId, abortController.signal)     
            setCard(() => response)
        }
        cardInfo()
        return () => abortController.abort()
    }, [cardId])                                                               

    useEffect(() => {                                                        
        const abortController = new AbortController()

        const deckInfo = async () => {                                       
            const response = await readDeck(deckId, abortController.signal)
            setDeck(() => response)                                          
        }

        deckInfo()
        return () => abortController.abort()
    }, [deckId])                                                            



    const handleSubmit = async (event) => {
        event.preventDefault()
        await updateCard(card)
        history.push(`/decks/${deck.id}`)
    }

    
    function changeFront(e) {                           
        setCard({ ...card, front: e.target.value });
    }
    function changeBack(e) {                                        
        setCard({ ...card, back: e.target.value });
    }

    return (
        <div>
           <nav aria-label="breadcrumb">            
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to={'/'}>Home</Link>        
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>{deck.name}</Link>       
                    </li>
                    <li className="breadcrumb-item" aria-current="page">                
                        `Edit Card ${cardId}`
                    </li>
                </ol>
            </nav>
                <h4>Edit Deck</h4>
                <CardForm
                    submitHandler={handleSubmit}
                    card={card}
                    changeFront={changeFront}
                    changeBack={changeBack}
                />
        </div>
    )
}

export default EditCard;