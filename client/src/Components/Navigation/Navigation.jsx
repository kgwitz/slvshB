import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { userContext } from '../userContext';


const Navigation = (props) => {

    const { userLogin } = useContext(userContext)
    const { user } = useContext(userContext)
    const { setUserLogin } = useContext(userContext)
    const { setUser } = useContext(userContext)

    const [userName, setUserName] = useState('')
    const navigate = useNavigate()

    const handleUserLogout = () => {
        localStorage.setItem('userName', '')
        localStorage.setItem('userID', '')

        setUserLogin(false)
        setUser({userName:'', userId:''})
        navigate('/login')
    }

    useEffect(() => {
        const userName = localStorage.getItem('userName')
        console.log('userName')
        setUserName(userName)
    }, [props.userLogin])


    return (
        <div className="navigation">
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="w-100 d-flex flex-row align-items-center justify-content-between pe-5">
                    <Navbar bg="dark" variant="dark" expand="lg" style={{ paddingLeft: '4rem', backgroundColor: 'blue' }}>

                        <Container className='d-flex flex-row'>
                            <Navbar.Brand href="/">SLVSH BRACKET</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            {userLogin && 
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/prizes">prizes</Nav.Link>
                            </Nav>}
                        </Container>
                    </Navbar>
                    {userLogin  &&
                        <div className='d-flex flex-row align-items-center'>
                            <div className="pe-4" style={{ color: 'white' }}>{user.userName}</div>
                            <Button variant='outline-secondary' onClick={() => { handleUserLogout() }}>Logout</Button>
                        </div>}
                </div>
            </nav >
        </div >
    )
}

export default Navigation;