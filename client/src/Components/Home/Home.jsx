import React from "react";
import { useNavigate } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import Accordion from 'react-bootstrap/Accordion'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import { GetMatchups, GetUser, UpdateUser, GetLeaderboard, GetMatchupVotes } from '../../ApiRequests'
import { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import ProgressBar from 'react-bootstrap/ProgressBar'
import { userContext } from '../userContext';


function Home() {
    const { userLogin } = useContext(userContext)
    const { setUserLogin } = useContext(userContext)

    const navigate = useNavigate()
    const [matchups, setMatchups] = useState([])
    const [matchupID, setMatchupID] = useState('')
    const [selectedWinner, setSelectedWinner] = useState('')
    const [expand, setExpand] = useState(false)
    const [user, setUser] = useState({})
    const [updatedUser, setUpdatedUser] = useState(false)
    const [leaderboard, setLeaderboard] = useState([])
    const [rounds, setRounds] = useState([])
    const [matchupVotes, setMatchupVotes] = useState([])

    useEffect(() => {
        getMatchups()
        getUser()
        getLeaderboard()
        getVotes()
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

    const getVotes = async () => {
        const response = await GetMatchupVotes()
        setMatchupVotes(response.data)
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

    useEffect(() => {
        if (localStorage.getItem('userName') && localStorage.getItem('userID') != '') {
            return
        } else {
            navigate('/login')
            setUserLogin(false)
        }

    })

    const renderProgressBar = (matchup) => {
        // console.log(matchupVotes)
        const matchupTally = matchupVotes.find(obj => obj.matchupId == matchup._id)
        // console.log(matchupTally, matchup)
        if (!matchupTally){
            return 
        }
        const team1 = Number(matchupTally.team1)
        const team2 = Number(matchupTally.team2)

        return (
            <ProgressBar>
                <ProgressBar striped variant="success" now={(team1/(team1 + team2)*100)} key={1} />
                <ProgressBar variant="warning" now={(team2/(team1 + team2))*(100)} key={2} />
                {/* <ProgressBar striped variant="danger" now={10} key={3} /> */}
            </ProgressBar>
        )
    }

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
        let gamePast = false;

        if ('winner' in matchup) {
            gamePast = true
        }

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
                    {(item) && <>
                        <Alert variant={`${style}`}>
                            {item.winner}
                        </Alert>

                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row justify-content-between">
                                <div className="">{matchup.team1}</div>
                                <div className="">{matchup.team2}</div>
                            </div>
                        </div>
                        {renderProgressBar(matchup)}

                        {/* Diplay matchup Votes */}

                    </>}
                    {(gamePast && !item) && <>
                        <Alert variant={`secondary`}>
                            Voting for game has already closed
                        </Alert>
                    </>}
                    {!item && !gamePast && <>
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
            <div className="container" style={{ paddingTop: '2rem', backgroundColor: 'white' }}>
                <Accordion defaultActiveKey="0" className="" style={{ width: 'fit-content', minWidth: '250px' }}>
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