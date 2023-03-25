import React from "react";
import { useNavigate } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import Accordion from 'react-bootstrap/Accordion'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import { GetMatchups, GetUser, UpdateUser, GetLeaderboard } from '../../ApiRequests'
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";


function Home() {

    const navigate = useNavigate()
    const [matchups, setMatchups] = useState([])
    const [matchupID, setMatchupID] = useState('')
    const [selectedWinner, setSelectedWinner] = useState('')
    const [expand, setExpand] = useState(false)
    const [user, setUser] = useState({})
    const [updatedUser, setUpdatedUser] = useState(false)
    const [leaderboard, setLeaderboard] = useState([])
    const [rounds, setRounds] = useState([])

    useEffect(() => {
        getMatchups()
        getUser()
        getLeaderboard()
    }, [])

    const getLeaderboard = async () => {
        const response = await GetLeaderboard()
        setLeaderboard(response.data)
        console.log(response)
    }

    const getMatchups = async () => {
        const response = await GetMatchups()
        setMatchups(response.data)
    }

    const getUser = async () => {
        const userID = localStorage.getItem('userID')
        if (localStorage.getItem('userID') == null || !userID) {
            return
        }
        const response = await GetUser(userID)

        if (response.data != null) {
            setUser(response.data)
        }
    }

    const handleClickVote = (matchup) => {
        setSelectedWinner('')
        setMatchupID(matchup._id)
        setExpand(true)
    }

    const handleSubmit = () => {
        let hasObjectWithId = user.selection.some(obj => obj.id === matchupID)

        if (hasObjectWithId) {
            return
        }

        const data = {
            id: matchupID,
            winner: selectedWinner,
        }

        setUser(userObject => ({ ...userObject, selection: [...userObject.selection, data] }))
        setUpdatedUser(true)
    }

    const submitVote = async () => {
        const response = await UpdateUser(user)
        setUpdatedUser(false)
    }

    useEffect(() => {
        if (updatedUser == true) {
            submitVote()
        }
    }, [updatedUser])



    const renderLeaderboard = (user, index) => {
        return (
            <tr >
                <td>{user.userName}</td>
                <td>{user.score}</td>
            </tr >)
    }

    const sortMatchups = () => {
        const sortedMatchups = matchups.sort((a, b) => b.round - a.round)
        const tempRounds = [...new Set(matchups.map((obj) => obj.round))]
        // setRounds(tempRounds)

        return tempRounds.map(renderRounds)
    }

    const renderRounds = (round, index) => {
        const matchupsInRound = matchups.filter((obj) => obj.round === round)
        console.log(matchupsInRound)

        return (
            <>
                <hr></hr>
                <div className="row d-flex flex-row justify-content-start">
                    {matchupsInRound.map(renderMatchups)}
                </div>
            </>

        )
    }

    const renderMatchups = (matchup, index, array) => {
        let item;
        let style = 'info';
        let prevMatchup = array[index - 1]

        const hasDifferentRound = !prevMatchup || prevMatchup.round !== matchup.round;

        if (user.selection) {
            item = user.selection.find(obj => obj.id === matchup._id)
            if (matchup.winner) {
                let hasWinner = user.selection.some(selectionObj => { return (selectionObj.winner == matchup.winner && selectionObj.id == matchup._id) });
                style = hasWinner ? 'success' : 'danger'
            }
        }

        const hr = hasDifferentRound ? <hr></hr> : null


        return (
            <Card className='mx-3 my-4' style={{ width: '21rem', height: 'fit-content' }}>
                <Card.Body >
                    <Card.Title>{matchup.team1} <i>vs</i> </Card.Title>
                    <Card.Title>{matchup.team2}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Round {matchup.round}</Card.Subtitle>
                    {item && <>
                        <Alert variant={`${style}`}>
                            {item.winner}
                        </Alert>
                    </>}
                    {!item && <>
                        <Button variant='outline-primary' className="w-100 mt-3 mb-1" onClick={() => { handleClickVote(matchup) }}>Vote</Button>
                        {matchupID == matchup._id && expand &&
                            <>
                                <hr></hr>
                                <div className=""></div>
                                <Dropdown className="w-100">
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic" className="w-100 my-1">
                                        {selectedWinner}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setSelectedWinner(matchup.team1)}>{matchup.team1}</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setSelectedWinner(matchup.team2)}>{matchup.team2}</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setSelectedWinner('You are stupid')}>I dont know...</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {
                                    (selectedWinner == matchup.team1 || selectedWinner == matchup.team2) &&
                                    <>
                                        <Button className="my-1 w-100" variant='outline-primary' onClick={() => { handleSubmit() }}>Submit</Button>
                                    </>
                                }
                            </>
                        }
                    </>}
                </Card.Body>
            </Card>
        )

    }

    //display all matchups as a card

    //if you don't have that matchup yet as a selection, button to vote. Otherwise, can't vote. 


    return (
        <div className="" >
            <div className="container" style={{ paddingTop: '2rem', backgroundColor:'white'}}>
                <Accordion defaultActiveKey="0" className="" style={{ width: 'fit-content', minWidth: '250px'}}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>LeaderBoard</Accordion.Header>
                        <Accordion.Body>
                            <Table striped bordered hover className="px-5">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboard.map(renderLeaderboard)}
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                {sortMatchups(matchups)}
            </div>
        </div>
    );
}

export default Home;