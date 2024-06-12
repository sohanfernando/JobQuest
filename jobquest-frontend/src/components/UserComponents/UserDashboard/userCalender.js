import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const UserCalendar = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/user/notes', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const noteEvents = response.data.map(note => ({
                    id: note._id,
                    title: note.content,
                    start: new Date(note.date),
                    end: new Date(note.date),
                }));
                setEvents(noteEvents);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch notes');
            }
        };
        fetchNotes();
    }, []);

    const handleSelectSlot = async ({ start, end }) => {
        const noteContent = prompt('Enter note:');
        if (noteContent) {
            try {
                const response = await axios.post('http://localhost:8070/api/user/notes', {
                    date: start,
                    content: noteContent
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const newNote = {
                    id: response.data.note._id,
                    title: response.data.note.content,
                    start: new Date(response.data.note.date),
                    end: new Date(response.data.note.date),
                };
                setEvents([...events, newNote]);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to add note');
            }
        }
    };

    const handleUpdateNote = async (eventId) => {
        const newContent = prompt('Enter new note content:');
        if (newContent) {
            try {
                await axios.put(`http://localhost:8070/api/user/notes/${eventId}`, { content: newContent }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setEvents(events.map(event =>
                    event.id === eventId ? { ...event, title: newContent } : event
                ));
            } catch (error) {
                console.error('Update Note Error:', error);
                setError(error.response?.data?.message || 'Failed to update note');
            }
        }
    };

    const handleDeleteNote = async (eventId) => {
        try {
            await axios.delete(`http://localhost:8070/api/user/notes/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setEvents(events.filter(event => event.id !== eventId));
        } catch (error) {
            console.error('Delete Note Error:', error);
            setError(error.response?.data?.message || 'Failed to delete note');
        }
    };

    const EventComponent = ({ event }) => {
        return (
            <div>
                <strong>{event.title}</strong>
                <button className="btn-update mx-2 rounded-5 btn-dark" onClick={() => handleUpdateNote(event.id)}>Update</button>
                <button className="btn-delete mx-2 rounded-5 btn-dark" onClick={() => handleDeleteNote(event.id)}>Delete</button>
            </div>
        );
    };


    return (
        <div>
            <center>
            <div style={{ height: '500px' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectSlot={handleSelectSlot}
                    onSelecting={() => false}
                    selectable
                    defaultView="month"
                    views={['month', 'week', 'day']}
                    defaultDate={new Date()}
                    components={{
                        event: EventComponent
                    }}
                />
            </div>
            </center>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default UserCalendar;
