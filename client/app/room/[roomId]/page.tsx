"use client"
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { MicIcon, VideoIcon, CallEndIcon } from './MaterialIcons';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || 'http://localhost:8000', {
    path: "/api/socket.io",
});

export default function Room() {
  const params = useParams();
  const roomId = params.roomId;

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

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
        setIsConnected(true);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('offer', { offer, roomId });
      });

      socket.on('offer', async ({ offer }) => {
        setIsConnected(true);
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit('answer', { answer, roomId });
      });

      socket.on('answer', async ({ answer }) => {
        setIsConnected(true);
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

      peerConnectionRef.current = pc;
    };

    init();

    return () => {
      socket.disconnect();
      peerConnectionRef.current?.close();
    };
  }, [roomId]);

  const toggleMute = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: `
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%),
        linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)
      `,
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating elements background */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'rgba(120, 119, 198, 0.1)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '70%',
        right: '15%',
        width: '150px',
        height: '150px',
        background: 'rgba(255, 119, 198, 0.1)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite reverse'
      }} />

      {/* Video Container - Remote Video Full Screen */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#000',
        zIndex: 1
      }}>
        <video 
          ref={remoteVideoRef} 
          autoPlay 
          playsInline 
          style={{ 
            width: '100%', 
            height: '100%',
            objectFit: 'cover'
          }} 
        />
        {!isConnected && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
            zIndex: 2
          }}>
            <div style={{ fontSize: '64px', marginBottom: '24px', opacity: 0.5 }}>
              ⏳
            </div>
            <div style={{ fontSize: '24px', fontWeight: '600' }}>
              Waiting for others to join...
            </div>
          </div>
        )}
      </div>

      {/* Local Video - Picture in Picture */}
      <div style={{
        position: 'fixed',
        bottom: '140px',
        right: '20px',
        width: '240px',
        height: '180px',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        background: '#000',
        zIndex: 10,
        transition: 'all 0.3s ease',
        animation: 'fadeInUp 1s ease-out 0.2s both'
      }}>
        <video 
          ref={localVideoRef} 
          autoPlay 
          muted 
          playsInline 
          style={{ 
            width: '100%', 
            height: '100%',
            objectFit: 'cover'
          }} 
        />
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '8px',
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          padding: '4px 8px',
          borderRadius: '6px',
          color: 'white',
          fontSize: '12px',
          fontWeight: '600',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          You {isMuted && '🔇'} {isVideoOff && '📹'}
        </div>
        {isVideoOff && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '48px',
            opacity: 0.7
          }}>
            👤
          </div>
        )}
      </div>

      {/* Controls - Sous la vidéo locale à droite */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        zIndex: 10,
        animation: 'fadeInUp 1s ease-out 0.4s both'
      }}>
        <button 
          onClick={toggleMute}
          style={{
            padding: '16px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: isMuted 
              ? 'rgba(255,59,48,0.15)' 
              : 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            boxShadow: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = isMuted ? 'rgba(255,59,48,0.25)' : 'rgba(255,255,255,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isMuted ? 'rgba(255,59,48,0.15)' : 'rgba(255,255,255,0.15)';
          }}
        >
          <MicIcon off={isMuted} />
        </button>
        
        <button 
          onClick={toggleVideo}
          style={{
            padding: '16px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: isVideoOff 
              ? 'rgba(255,59,48,0.15)' 
              : 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            boxShadow: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = isVideoOff ? 'rgba(255,59,48,0.25)' : 'rgba(255,255,255,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isVideoOff ? 'rgba(255,59,48,0.15)' : 'rgba(255,255,255,0.15)';
          }}
        >
          <VideoIcon off={isVideoOff} />
        </button>
        
        <button 
          onClick={() => window.location.href = '/'}
          style={{
            padding: '16px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,59,48,0.15)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            boxShadow: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,59,48,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,59,48,0.15)';
          }}
        >
          <CallEndIcon />
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @media (max-width: 768px) {
          .pip-video {
            width: 180px !important;
            height: 135px !important;
            bottom: 120px !important;
            right: 15px !important;
          }
          
          .controls {
            bottom: 15px !important;
            gap: 10px !important;
          }
          
          .controls button {
            width: 56px !important;
            height: 56px !important;
            padding: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
