"use client"


import React, { useState, useEffect } from 'react';

import { ParticipantInfo, ParticipantPermission, Room } from 'livekit-server-sdk/dist/proto/livekit_models';


import {
   
    RoomServiceClient
  
  } from "livekit-server-sdk";

  

  
  export default function Rooms() {
   
    const [rooms, setRooms] = useState<Room[]>([]);
     
    
 
  
  
    useEffect(() => {


      const roomService = new RoomServiceClient(
          process.env.LIVEKIT_API_URL!,
          process.env.LIVEKIT_API_KEY!,
          process.env.LIVEKIT_API_SECRET!,
        );


      const fetchRooms = async () => {
        const fetchedRooms = await roomService.listRooms(["7d050171-2713-493f-ad8b-b982fc1c5edc"]);
        setRooms(fetchedRooms);
      };
  
      fetchRooms();
    }, []);
  
    return (
      <div className="h-full p-8 max-w-screen-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Rooms</h1>
        <ul>
          {rooms.map((room) => (
            <li key={room.sid} className="mb-4">
              <div>
                <strong>Name:</strong> {room.name}
              </div>
              <div>
                <strong>SID:</strong> {room.sid}
              </div>
              <div>
                <strong>Empty Timeout:</strong> {room.emptyTimeout}
              </div>
              <div>
                <strong>Max Participants:</strong> {room.maxParticipants}
              </div>
              <div>
                <strong>Creation Time:</strong> {new Date(room.creationTime).toLocaleString()}
              </div>
              <div>
                <strong>Metadata:</strong> {room.metadata}
              </div>
              <div>
                <strong>Number of Participants:</strong> {room.numParticipants}
              </div>
              <div>
                <strong>Number of Publishers:</strong> {room.numPublishers}
              </div>
              <div>
                <strong>Active Recording:</strong> {room.activeRecording ? 'Yes' : 'No'}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };