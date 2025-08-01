"use client"
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000'); // Remplace par ton URL VPS plus tard

export default function Room() {
  const params = useParams();
  const roomId = params.roomId;

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const init = async () => {
      const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }

      socket.emit('join-room', roomId);

      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' }
        ]
      });

      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
      });

      pc.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('ice-candidate', { candidate: event.candidate, roomId });
        }
      };

      socket.on('user-connected', async () => {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('offer', { offer, roomId });
      });

      socket.on('offer', async ({ offer }) => {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit('answer', { answer, roomId });
      });

      socket.on('answer', async ({ answer }) => {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      });

      socket.on('ice-candidate', async ({ candidate }) => {
        if (candidate) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (e) {
            console.error('Error adding ICE candidate', e);
          }
        }
      });

      setPeerConnection(pc);
    };

    init();

    return () => {
      socket.disconnect();
      peerConnection?.close();
    };
  }, [roomId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
      <h2>Room ID: {roomId}</h2>
      <video ref={localVideoRef} autoPlay muted playsInline style={{ width: 400, border: '1px solid gray' }} />
      <video ref={remoteVideoRef} autoPlay playsInline style={{ width: 400, border: '1px solid gray', marginTop: 20 }} />
    </div>
  );
}
