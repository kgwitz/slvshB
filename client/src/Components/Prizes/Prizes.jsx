import React from "react";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import "../main.css"
import { useNavigate } from "react-router-dom";


function Prizes(props) {
    const navigate = useNavigate()

    return (
        <div className="" style={{ paddingTop: '4rem' }}>
            <Card className="w-100 mb-3">
                <Card.Body>
                    <Card.Title>All Expenses Paid 10 Day Disney Land Cruise</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">1st Place</Card.Subtitle>
                    <Card.Text>
                    Embark on a magical 10-day cruise to Disneyland, where every moment is filled with enchantment and adventure. From the moment you step on board the ship, you'll be transported to a world of excitement and wonder. Enjoy all the amenities of the ship, including luxurious accommodations, delectable dining options, and world-class entertainment. But the real excitement begins when the ship docks at Disneyland, where you'll spend five unforgettable days exploring the parks and all their attractions. Meet your favorite Disney characters, ride thrilling roller coasters, and enjoy the spectacular shows and parades. With so much to see and do, you'll create memories that will last a lifetime on this dream cruise to the happiest place on earth.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="w-100 mb-3">
                <Card.Body>
                    <Card.Title>1 year subscription to Cracked Magazine</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">2nd Place</Card.Subtitle>
                    <Card.Text>
                    Embark on a magical year long expedition, where each monthly issue is filled with enchantment and adventure. From the moment you open the first page, you'll be transported to a world of excitement and wonder. Enjoy all of the amenities the ladies and gents have to offer, Crack On! 
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="w-100 my-2">
                <Card.Body>
                    <Card.Title>Dan's Car</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">3rd Place</Card.Subtitle>
                    <Card.Text>
                    Cruising around in Dan's Subaru Outback is an exhilarating experience. The car's tinted windows give a sense of privacy and exclusivity, while the rumbling sound of the loud exhaust is sure to turn heads as you zoom by. The sleek design of the car and its smooth handling make driving it a joy. With its spacious interior, it's the perfect car for a long road trip or a leisurely drive around town. Whether you're going on an adventure or just cruising around, driving Dan's Subaru Outback is a ride you won't soon forget.
                    </Card.Text>
                </Card.Body>
            </Card>
            <div className="my-5 mx-5">For real though...</div>
            <Card className="w-100 mb-3">
                <Card.Body>
                    <Card.Title>Mons Royale Prize Pack </Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">1st Place</Card.Subtitle>
                    <Card.Text>
                    Sophia said she would donate a bunch of Mons Royale samples to the winner. 
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="w-100 mb-3">
                <Card.Body>
                    <Card.Title>Instagram Life Hacks </Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">Last Place</Card.Subtitle>
                    <Card.Text>
                    Loser has to create a karaoke video of a song chosen by the winner, and share post it on youtube. 
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Prizes;