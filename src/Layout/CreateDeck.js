import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import { createDeck} from "../utils/api/index";


function CreateDeck(){
    const history = useHistory();
    const [newDeck, setNewDeck] = useState({name:"", description:""})




   async function handleSubmit(event){
        event.preventDefault()
        const response = await createDeck(newDeck);
        history.push(`/decks/${response.id}`);
    }
    const handleChange=(event)=>{
        setNewDeck({...newDeck,[event.target.name]:event.target.value})
    }
    return (
   
        <div className="col-9 mx-auto">
            
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        
                        <Link to="/">Home</Link>
                    </li>
                    
                    <li className="breadcrumb-item"> Create Deck
                    </li>
                </ol>
            </nav>
            
            <form onSubmit= {handleSubmit}>
                <div>
                <label>Name:</label> <br />
                <input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={newDeck.name}
                style={{ width: "100%" }}
                />
                </div>
                <br />
                <div>
                <label>Description:</label> 
                <br />
                <textarea
                id="description"
                type="textarea"
                name="description"
                rows="3"
                onChange={handleChange}
                value={newDeck.description}
                style={{ width: "100%" }}
                />
            </div>
            <Link to="/" className="btn btn-secondary mr-3">Cancel</Link>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreateDeck;