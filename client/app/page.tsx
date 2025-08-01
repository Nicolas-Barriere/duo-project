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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      joinRoom()
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%),
        linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)
      `,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
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
      
      <div style={{ 
        textAlign: 'center',
        maxWidth: '700px',
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Hero Section */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            marginBottom: '16px',
            animation: 'fadeInUp 1s ease-out'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '6px 16px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: '500',
              marginBottom: '20px'
            }}>
              ✨ Now with HD video quality
            </div>
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 54px)',
            fontWeight: '800',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            animation: 'fadeInUp 1s ease-out 0.2s both'
          }}>
            Meet
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '32px',
            lineHeight: '1.4',
            fontWeight: '400',
            animation: 'fadeInUp 1s ease-out 0.4s both'
          }}>
            Connect instantly with crystal-clear video calls
          </p>
        </div>

        {/* Action Cards */}
        <div style={{
          animation: 'fadeInUp 1s ease-out 0.6s both',
          marginBottom: '32px'
        }}>
          {/* Combined Create and Join Card */}
          <div 
            className="glass-effect" 
            style={{
              padding: '48px',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: '40px',
              alignItems: 'start',
              minHeight: '220px'
            }}
            className="combined-card"
            >
              {/* Create Room Section */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
                }}>
                  🎥
                </div>
                <h2 style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: '#ffffff',
                  letterSpacing: '-0.01em'
                }}>
                  Start a new meeting
                </h2>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '24px',
                  fontSize: '15px',
                  lineHeight: '1.5'
                }}>
                  Create a room instantly
                </p>
                <button 
                  className="button button-primary"
                  onClick={createRoom}
                  style={{
                    fontSize: '16px',
                    padding: '16px 32px',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '50px',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                  }}
                >
                  Create Room
                </button>
              </div>

              {/* Divider */}
              <div 
                className="divider"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  minHeight: '180px'
                }}>
                <div style={{
                  width: '1px',
                  height: '140px',
                  background: 'rgba(255, 255, 255, 0.2)'
                }} />
              </div>

              {/* Join Room Section */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
                }}>
                  🔗
                </div>
                <h2 style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: '#ffffff',
                  letterSpacing: '-0.01em'
                }}>
                  Join a meeting
                </h2>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '24px',
                  fontSize: '15px',
                  lineHeight: '1.5'
                }}>
                  Enter a room ID
                </p>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  flexDirection: 'column'
                }}>
                  <input
                    type="text"
                    placeholder="Enter room ID"
                    value={roomIdInput}
                    onChange={(e) => setRoomIdInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      fontSize: '16px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      backdropFilter: 'blur(10px)',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit',
                      fontWeight: '500',
                      width: '100%'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.6)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                  <button 
                    className="button button-secondary"
                    onClick={joinRoom}
                    disabled={!roomIdInput.trim()}
                    style={{
                      fontSize: '16px',
                      padding: '16px 32px',
                      fontWeight: '600',
                      background: roomIdInput.trim() 
                        ? 'rgba(255, 255, 255, 0.15)' 
                        : 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '50px',
                      color: roomIdInput.trim() ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                      cursor: roomIdInput.trim() ? 'pointer' : 'not-allowed',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(10px)',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      if (roomIdInput.trim()) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = roomIdInput.trim() 
                        ? 'rgba(255, 255, 255, 0.15)' 
                        : 'rgba(255, 255, 255, 0.05)';
                    }}
                  >
                    Join Room
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          animation: 'fadeInUp 1s ease-out 0.8s both'
        }}>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.6)',
            fontWeight: '500',
            letterSpacing: '0.5px'
          }}>
            🔒 Secure • ⚡ Fast • 🌐 No Install • 📱 Any Device
          </p>
        </div>
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
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @media (max-width: 768px) {
          .glass-effect {
            padding: 32px 24px !important;
          }
          
          .combined-card {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          
          .divider {
            display: none !important;
          }
        }
        
        @media (max-width: 640px) {
          .main-container {
            max-width: 100% !important;
            padding: 16px !important;
          }
        }
      `}</style>
    </div>
  )
}
