"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function Home() {
  const router = useRouter()
  const [roomIdInput, setRoomIdInput] = useState('')

  const createRoom = () => {
    const roomId = uuidv4()
    router.push(`/room/${roomId}`)
  }

  const joinRoom = () => {
    if (roomIdInput.trim()) {
      router.push(`/room/${roomIdInput.trim()}`)
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Meet MVP</h1>
      <button onClick={createRoom}>Create Room</button>
      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          placeholder="Enter room ID"
          value={roomIdInput}
          onChange={(e) => setRoomIdInput(e.target.value)}
        />
        <button onClick={joinRoom}>Join</button>
      </div>
    </div>
  )
}
