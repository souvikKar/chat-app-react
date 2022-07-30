import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Contacts from './../components/Contacts';
import { allUsersRoute } from '../utils/APIRoutes';

function Chat() {

    const navigate = useNavigate();

    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const fetchStorage = async () => {
            if (!localStorage.getItem("chat-app-user")) {
                navigate("/login");
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
            }

        }
        fetchStorage();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            if (currentUser) {
                if (currentUser.isAvatarImage) {
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    setContacts(data.data);
                } else {
                    navigate("/setAvatar");
                }
            }
        }
        fetchUsers();
    }, [currentUser]);

    return (
        <Container>
            <div className="container">
                <Contacts contacts={contacts} currentUser={currentUser} />

            </div>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100wh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap:1rem;
    align-items: center;
    background-color: #131324;
    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (man-width: 720px) and (max-width: 1080px)
          grid-template-columns: 35% 65%;
    }
`;

export default Chat