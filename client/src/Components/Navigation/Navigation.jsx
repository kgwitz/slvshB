import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import { Navbar } from 'react-bootstrap';


const Navigation = (props) => {

    const [userName, setUserName] = useState('')
    const navigate = useNavigate()

    const handleUserLogout = () => {
        localStorage.setItem('userName', '')
        localStorage.setItem('userID', '')

        props.handleLogout()
        navigate('/')
    }

    useEffect(() => {
        const userName = localStorage.getItem('userName')
        console.log('userName')
        setUserName(userName)
    }, [props.userLogin])


    return (
        <div className="navigation">
            <nav className="navbar navbar-expand navbar-dark bg-light">
                <div className="w-100 d-flex flex-row align-items-center justify-content-between pe-5">
                    <Navbar bg="light" expand="lg" style={{ paddingLeft: '4rem', backgroundColor: 'blue' }}>

                        <Container className='d-flex flex-row'>
                            <Navbar.Brand href="#home">SLVSH BRACKET</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        </Container>
                    </Navbar>
                    {userName != '' &&
                        <div className='d-flex flex-row align-items-center'>
                            <div className="pe-4">{userName}</div>
                            <Button variant='outline-secondary' onClick={() => { handleUserLogout() }}>Logout</Button>
                        </div>}
                </div>
            </nav >
        </div >
    )
}

export default Navigation;