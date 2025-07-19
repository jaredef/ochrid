'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import audioFilesData from '../assets/prologue-audio-files.json';

const ProloguePlayer = ({ overrideRoute = null }) => {
  const pathname = usePathname();
  const audioRef = useRef(null);
  
  // Use override route if provided, otherwise use current pathname
  const effectiveRoute = overrideRoute || pathname;

  // Don't render on /prologue or /homilies routes (no audio content available)
  if (pathname === '/prologue' || pathname === '/homilies') {
    return null;
  }

  // Find the audio file that matches the effective route - memoized to prevent recalculation
  const currentAudioFile = useMemo(() => 
    audioFilesData.audioFiles.find(file => file.route === effectiveRoute),
    [effectiveRoute]
  );
  
  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isIntentionallyLoading, setIsIntentionallyLoading] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [error, setError] = useState(null);
  const [isComponentLoading, setIsComponentLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // On mount, read open/closed state from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('prologuePlayerOpen');
      setIsOpen(saved === 'true');
    }
  }, []);

  // Save open/closed state to localStorage when changed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('prologuePlayerOpen', isOpen ? 'true' : 'false');
    }
  }, [isOpen]);

  // Add loading effect - ensure component always exits loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComponentLoading(false);
    }, 100);

    // Also ensure it exits loading state after a maximum time
    const maxTimer = setTimeout(() => {
      setIsComponentLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(maxTimer);
    };
  }, []);

  // Initialize audio settings on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = playbackRate;
    }
  }, [volume, playbackRate]); // Only update when volume or playback rate changes

  // Update audio source when route changes - but don't load automatically
  useEffect(() => {
    if (audioRef.current && currentAudioFile) {
      console.log('Setting audio source:', currentAudioFile.uri);
      
      // Reset states when route changes
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setError(null);
      setIsLoading(false);
      setIsIntentionallyLoading(false);
      
      // Set the audio source but don't load it yet
      audioRef.current.src = currentAudioFile.uri;
      // Don't call audioRef.current.load() here - wait for play button
    }
  }, [currentAudioFile?.uri]); // Only depend on the URI, not the entire object

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadStart = () => {
      // Only set loading to true if we're intentionally loading
      if (isIntentionallyLoading) {
        setIsLoading(true);
        setError(null);
      }
    };
    
    const handleCanPlay = () => {
      setIsLoading(false);
      setIsIntentionallyLoading(false);
      setError(null);
    };
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
      setIsIntentionallyLoading(false);
    };
    
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    
    const handleError = (e) => {
      console.error('Audio error:', e);
      setError('Failed to load audio');
      setIsLoading(false);
      setIsIntentionallyLoading(false);
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [isIntentionallyLoading]); // Include isIntentionallyLoading in dependencies

  // Media Session API setup for mobile background playback
  useEffect(() => {
    if (!audioRef.current || !currentAudioFile || !navigator.mediaSession) return;

    // Set up media session metadata
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentAudioFile.title,
      artist: 'Orthodox Hagiography',
      album: 'The Prologue',
      artwork: [
        {
          src: '/purchase-prologue.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/purchase-prologue.png', 
          sizes: '256x256',
          type: 'image/png',
        },
        {
          src: '/purchase-prologue.png',
          sizes: '128x128', 
          type: 'image/png',
        }
      ]
    });

    // Set up media session action handlers
    navigator.mediaSession.setActionHandler('play', () => {
      audioRef.current?.play();
    });

    navigator.mediaSession.setActionHandler('pause', () => {
      audioRef.current?.pause();
    });

    navigator.mediaSession.setActionHandler('stop', () => {
      audioRef.current?.pause();
      audioRef.current.currentTime = 0;
    });

    navigator.mediaSession.setActionHandler('seekbackward', (details) => {
      const skipTime = details.seekOffset || 10;
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - skipTime, 0);
    });

    navigator.mediaSession.setActionHandler('seekforward', (details) => {
      const skipTime = details.seekOffset || 10;
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + skipTime, audioRef.current.duration);
    });

    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (details.fastSeek && 'fastSeek' in audioRef.current) {
        audioRef.current.fastSeek(details.seekTime);
        return;
      }
      audioRef.current.currentTime = details.seekTime;
    });

    // Update playback state when audio state changes
    const updatePlaybackState = () => {
      if (navigator.mediaSession) {
        navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
      }
    };

    // Update position state
    const updatePositionState = () => {
      if (navigator.mediaSession && audioRef.current) {
        navigator.mediaSession.setPositionState({
          duration: audioRef.current.duration || 0,
          playbackRate: audioRef.current.playbackRate || 1,
          position: audioRef.current.currentTime || 0,
        });
      }
    };

    // Set up event listeners for media session updates
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('play', updatePlaybackState);
      audio.addEventListener('pause', updatePlaybackState);
      audio.addEventListener('timeupdate', updatePositionState);
      audio.addEventListener('loadedmetadata', updatePositionState);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('play', updatePlaybackState);
        audio.removeEventListener('pause', updatePlaybackState);
        audio.removeEventListener('timeupdate', updatePositionState);
        audio.removeEventListener('loadedmetadata', updatePositionState);
      }
    };
  }, [currentAudioFile, isPlaying]);

  // Control handlers
  const togglePlayPause = useCallback(async () => {
    if (!audioRef.current || !currentAudioFile) {
      console.error('Audio ref or current audio file not available');
      return;
    }

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Clear any previous errors
        setError(null);
        
        // Load the audio if it hasn't been loaded yet
        if (audioRef.current.readyState === 0) { // HAVE_NOTHING
          console.log('Loading audio for the first time...');
          setIsIntentionallyLoading(true);
          setIsLoading(true);
          audioRef.current.load();
          
          // Wait for the audio to be ready
          await new Promise((resolve, reject) => {
            const handleCanPlay = () => {
              audioRef.current.removeEventListener('canplay', handleCanPlay);
              audioRef.current.removeEventListener('error', handleError);
              resolve();
            };
            
            const handleError = (e) => {
              audioRef.current.removeEventListener('canplay', handleCanPlay);
              audioRef.current.removeEventListener('error', handleError);
              reject(e);
            };
            
            audioRef.current.addEventListener('canplay', handleCanPlay);
            audioRef.current.addEventListener('error', handleError);
            
            // Add a timeout
            setTimeout(() => {
              audioRef.current.removeEventListener('canplay', handleCanPlay);
              audioRef.current.removeEventListener('error', handleError);
              reject(new Error('Audio loading timeout'));
            }, 10000);
          });
        }
        
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          await playPromise;
        }
      }
    } catch (error) {
      console.error('Playback error:', error);
      
      // Handle specific error types
      if (error.name === 'NotAllowedError') {
        setError('Please allow audio playback in your browser');
      } else if (error.name === 'NotSupportedError') {
        setError('Audio format not supported');
      } else if (error.message === 'Audio loading timeout') {
        setError('Audio loading timeout - please try again');
      } else {
        setError('Failed to play audio - please try again');
      }
      
      setIsLoading(false);
      setIsIntentionallyLoading(false);
      setIsPlaying(false);
    }
  }, [isPlaying, currentAudioFile?.uri]); // Depend on isPlaying and currentAudioFile.uri

  // Service Worker registration for background audio
  useEffect(() => {
    if ('serviceWorker' in navigator && 'MediaSession' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'audio-control') {
          switch (event.data.action) {
            case 'play':
              if (audioRef.current && !isPlaying) {
                togglePlayPause();
              }
              break;
            case 'pause':
              if (audioRef.current && isPlaying) {
                togglePlayPause();
              }
              break;
            case 'stop':
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setIsPlaying(false);
              }
              break;
          }
        }
      });
    }
  }, [isPlaying, togglePlayPause]);

  // Mobile-specific audio handling
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // Set audio attributes for mobile background playback
    audio.setAttribute('playsinline', 'true');
    audio.setAttribute('webkit-playsinline', 'true');
    audio.setAttribute('x-webkit-airplay', 'allow');

    // Handle page visibility changes for mobile
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying) {
        // Page is hidden but audio should continue playing
        console.log('Page hidden, audio continues in background');
      }
    };

    // Handle audio focus for mobile
    const handleAudioFocus = () => {
      if (audio.paused && isPlaying) {
        // Resume audio when focus is regained
        audio.play().catch(console.error);
      }
    };

    // Handle audio interruption (phone calls, etc.)
    const handleAudioInterruption = () => {
      if (isPlaying) {
        console.log('Audio interrupted, will resume when possible');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleAudioFocus);
    audio.addEventListener('suspend', handleAudioInterruption);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleAudioFocus);
      audio.removeEventListener('suspend', handleAudioInterruption);
    };
  }, [isPlaying]);

  const handleSeek = useCallback((e) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration]);

  const handleVolumeChange = useCallback((e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  const handlePlaybackRateChange = useCallback((rate) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  }, []);

  // Format time helper
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Only log state changes in development, not on every render
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Audio player state:', {
        isPlaying,
        isLoading,
        isComponentLoading,
        currentTime,
        duration,
        error,
        audioFile: currentAudioFile?.uri
      });
    }
  }, [isPlaying, isLoading, isComponentLoading, currentTime, duration, error, currentAudioFile?.uri]);

  // Pull-down bar UI
  const PullBar = (
    <div className={`prologue-player-pullbar${isOpen ? ' open' : ''}`} onClick={() => setIsOpen(v => !v)} tabIndex={0} role="button" aria-label={isOpen ? 'Collapse player' : 'Expand player'}>
      <span className="pullbar-label">{isOpen ? 'Let us attend' : 'Listen'}</span>
      <span className={`chevron${isOpen ? ' up' : ''}`}>{/* SVG chevron */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 12l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
      <style jsx>{`
        .prologue-player-pullbar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          background: var(--nx-bg-primary);
          border-radius: 8px 8px 0 0;
          border: 1px solid var(--nx-colors-border-primary);
          border-bottom: none;
          font-size: 1rem;
          font-weight: 500;
          color: var(--nx-colors-text-primary);
          min-height: 32px;
          transition: background 0.2s;
          margin: 0 auto;
          width: 100%;
          max-width: 500px;
          min-height: 50px;
          user-select: none;
        }
        .chevron {
          display: flex;
          align-items: center;
          transition: transform 0.2s;
        }
        .chevron.up {
          transform: rotate(180deg);
        }
        .pullbar-label {
          font-size: 0.95rem;
        }
        @media (max-width: 768px) {
          .prologue-player-pullbar {
            max-width: 100%;
            font-size: 0.95rem;
          }
        }
        :is(html[class~=dark]) .prologue-player-pullbar {
          background: var(--nx-colors-gray-900);
          color: var(--nx-colors-gray-200);
          border-color: var(--nx-colors-gray-700);
        }
      `}</style>
    </div>
  );

  return (
    <div className={`prologue-player${isOpen ? ' open' : ' minimized'}`}> 
      {PullBar}
      <div className="prologue-player-content" style={{maxHeight: isOpen ? 1000 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(.4,0,.2,1)'}} aria-hidden={!isOpen}>
        {/* Always render audio element to ensure it's available */}
        <audio ref={audioRef} preload="none" style={{ display: 'none' }} />
      
        {isComponentLoading ? (
          <div className="player-container skeleton-player">
            {/* Skeleton controls */}
            <div className="player-controls">
              {/* Left controls skeleton */}
              <div className="left-controls">
                <div className="skeleton-time"></div>
                <div className="skeleton-volume">
                  <div className="skeleton-icon"></div>
                  <div className="skeleton-slider"></div>
                </div>
              </div>

              {/* Center play button skeleton */}
              <div className="skeleton-play-btn"></div>

              {/* Right controls skeleton */}
              <div className="right-controls">
                <div className="skeleton-playback-rate">
                  <div className="skeleton-label"></div>
                  <div className="skeleton-select"></div>
                </div>
                <div className="skeleton-time"></div>
              </div>
            </div>

            {/* Progress bar skeleton */}
            <div className="progress-container">
              <div className="skeleton-progress-bar">
                <div className="skeleton-progress-fill"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="player-container">
            {/* Error display */}
            {error && <div className="error-message">{error}</div>}

            {/* Debug info (only in development) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="debug-info" style={{fontSize: '10px', color: '#666', marginBottom: '8px'}}>
                <div>Ready State: {audioRef.current?.readyState || 'N/A'}</div>
                <div>Network State: {audioRef.current?.networkState || 'N/A'}</div>
                <div>Current Time: {currentTime.toFixed(2)}s</div>
                <div>Duration: {duration.toFixed(2)}s</div>
                <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
                <div>Playing: {isPlaying ? 'Yes' : 'No'}</div>
              </div>
            )}

            {/* Single-line controls */}
            <div className="player-controls">
              {/* Left controls */}
              <div className="left-controls">
                <div className="time-display">{formatTime(currentTime)}</div>
                <div className="volume-control">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                    aria-label="Volume"
                  />
                </div>
              </div>

              {/* Center play button */}
              <button 
                onClick={togglePlayPause}
                disabled={error}
                className="play-pause-btn"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isLoading ? (
                  <div className="loading-spinner"></div>
                ) : isPlaying ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>

              {/* Right controls */}
              <div className="right-controls">
                <div className="playback-rate">
                  <label htmlFor="playback-rate">Speed:</label>
                  <select 
                    id="playback-rate"
                    value={playbackRate} 
                    onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
                    className="rate-select"
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>
                </div>
                <div className="time-display">{formatTime(duration)}</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="progress-container">
              <div 
                className="progress-bar" 
                onClick={handleSeek}
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax={duration}
                aria-valuenow={currentTime}
              >
                <div 
                  className="progress-fill"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            {/* Attribution */}
            {currentAudioFile?.youtubeUrl && (
              <div className="prologue-attribution">
                <a
                  href={currentAudioFile.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="yt-link"
                  title="Watch on YouTube"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{verticalAlign: 'middle', marginRight: 4}}>
                    <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.204 3.5 12 3.5 12 3.5s-7.204 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.373 0 12 0 12s0 3.627.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.796 20.5 12 20.5 12 20.5s7.204 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.627 24 12 24 12s0-3.627-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Orthodox Hagiography
                </a>
              </div>
            )}
          </div>
        )}
      </div>

        <style jsx>{`
          .skeleton-player {
            background: var(--nx-bg-primary);
            border: 1px solid var(--nx-colors-border-primary);
            border-radius: 8px;
            padding: 16px;
            margin: 1rem auto;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }

          .skeleton-player .player-controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
            gap: 8px;
            min-width: 0;
          }

          .skeleton-player .left-controls,
          .skeleton-player .right-controls {
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 1;
            min-width: 0;
            overflow: hidden;
          }

          .skeleton-player .right-controls {
            justify-content: flex-end;
          }

          .skeleton-time {
            width: 32px;
            height: 12px;
            background: var(--nx-colors-gray-200);
            border-radius: 4px;
            flex-shrink: 0;
            position: relative;
            overflow: hidden;
          }

          .skeleton-volume {
            display: flex;
            align-items: center;
            gap: 4px;
            flex-shrink: 1;
            min-width: 0;
          }

          .skeleton-icon {
            width: 16px;
            height: 16px;
            background: var(--nx-colors-gray-200);
            border-radius: 2px;
            flex-shrink: 0;
            position: relative;
            overflow: hidden;
          }

          .skeleton-slider {
            width: 60px;
            height: 8px;
            background: var(--nx-colors-gray-200);
            border-radius: 4px;
            flex-shrink: 1;
            position: relative;
            overflow: hidden;
          }

          .skeleton-play-btn {
            width: 56px;
            height: 56px;
            background: var(--nx-colors-gray-200);
            border-radius: 50%;
            flex-shrink: 0;
            position: relative;
            overflow: hidden;
          }

          .skeleton-playback-rate {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
            flex-shrink: 1;
            min-width: 0;
          }

          .skeleton-label {
            width: 40px;
            height: 12px;
            background: var(--nx-colors-gray-200);
            border-radius: 4px;
            flex-shrink: 0;
            position: relative;
            overflow: hidden;
          }

          .skeleton-select {
            width: 50px;
            height: 20px;
            background: var(--nx-colors-gray-200);
            border-radius: 4px;
            flex-shrink: 1;
            position: relative;
            overflow: hidden;
          }

          .skeleton-progress-bar {
            width: 100%;
            height: 8px;
            background: var(--nx-colors-gray-200);
            border-radius: 4px;
            position: relative;
            overflow: hidden;
          }

          .skeleton-progress-fill {
            width: 30%;
            height: 100%;
            background: var(--nx-colors-gray-300);
            border-radius: 4px;
            position: relative;
            overflow: hidden;
          }

          /* Shimmer effect */
          .skeleton-time::before,
          .skeleton-icon::before,
          .skeleton-slider::before,
          .skeleton-play-btn::before,
          .skeleton-label::before,
          .skeleton-select::before,
          .skeleton-progress-bar::before,
          .skeleton-progress-fill::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.4),
              transparent
            );
            animation: shimmer 1.5s infinite;
          }

          @keyframes shimmer {
            0% {
              left: -100%;
            }
            100% {
              left: 100%;
            }
          }

          /* Dark mode adjustments */
          :is(html[class~=dark]) .skeleton-player {
            background: var(--nx-colors-gray-900);
            border-color: var(--nx-colors-gray-700);
          }

          :is(html[class~=dark]) .skeleton-time,
          :is(html[class~=dark]) .skeleton-icon,
          :is(html[class~=dark]) .skeleton-slider,
          :is(html[class~=dark]) .skeleton-play-btn,
          :is(html[class~=dark]) .skeleton-label,
          :is(html[class~=dark]) .skeleton-select,
          :is(html[class~=dark]) .skeleton-progress-bar {
            background: var(--nx-colors-gray-700);
          }

          :is(html[class~=dark]) .skeleton-progress-fill {
            background: var(--nx-colors-gray-600);
          }

          :is(html[class~=dark]) .skeleton-time::before,
          :is(html[class~=dark]) .skeleton-icon::before,
          :is(html[class~=dark]) .skeleton-slider::before,
          :is(html[class~=dark]) .skeleton-play-btn::before,
          :is(html[class~=dark]) .skeleton-label::before,
          :is(html[class~=dark]) .skeleton-select::before,
          :is(html[class~=dark]) .skeleton-progress-bar::before,
          :is(html[class~=dark]) .skeleton-progress-fill::before {
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.1),
              transparent
            );
          }

          /* Responsive breakpoints for skeleton */
          @media (max-width: 768px) {
            .skeleton-player {
              max-width: 100%;
              margin: 0 0 2rem auto;
            }
            
            .skeleton-player .player-controls {
              gap: 6px;
            }
            
            .skeleton-player .left-controls,
            .skeleton-player .right-controls {
              gap: 6px;
            }
            
            .skeleton-slider {
              width: 50px;
            }
          }

          @media (max-width: 768px) {
            .skeleton-player {
              padding: 12px;
              margin: 0 0 2rem auto;
            }

            .skeleton-player .player-controls {
              gap: 8px;
            }

            .skeleton-player .left-controls,
            .skeleton-player .right-controls {
              gap: 6px;
            }

            .skeleton-play-btn {
              width: 44px;
              height: 44px;
            }

            .skeleton-time {
              font-size: 11px;
              min-width: 32px;
            }

            .skeleton-slider {
              width: 50px;
            }

            .skeleton-progress-bar {
              height: 6px;
            }
          }

          @media (max-width: 480px) {
            .skeleton-player {
              padding: 8px;
            }

            .skeleton-player .player-controls {
              gap: 6px;
            }

            .skeleton-player .left-controls,
            .skeleton-player .right-controls {
              gap: 4px;
            }

            .skeleton-play-btn {
              width: 40px;
              height: 40px;
            }

            .skeleton-time {
              font-size: 10px;
              min-width: 28px;
            }

            .skeleton-slider {
              width: 40px;
            }
          }
        `}</style>

             <style jsx>{`
         .prologue-player {
           background: var(--nx-bg-primary);
           border: 1px solid var(--nx-colors-border-primary);
           border-radius: 8px;
           padding: 16px;
           margin: 1rem auto;
           width: 100%;
           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
           overflow: hidden;
         }

         .prologue-player.minimized {
           max-height: 0;
           overflow: hidden;
           transition: max-height 0.4s cubic-bezier(.4,0,.2,1);
           border-bottom: none;
           min-height: 4rem;
           box-shadow: none;
         }

         .prologue-player.open {
           max-height: 1000px; /* Adjust as needed for max height */
           overflow: visible;
           transition: max-height 0.4s cubic-bezier(.4,0,.2,1);
           border-bottom: 1px solid var(--nx-colors-border-primary);
           box-shadow: 0 2px 9px rgb(255 255 255 / 8%);
         }

         .prologue-player-content {
           max-height: 1000px; /* Adjust as needed for max height */
           overflow: visible;
           transition: max-height 0.4s cubic-bezier(.4,0,.2,1);
           border-bottom: 1px solid var(--nx-colors-border-primary);
         }

         .player-container {
           max-width: 100%;
         }

         .error-message {
           color: #dc2626;
           font-size: 14px;
           margin-bottom: 12px;
           text-align: center;
         }

         .debug-info {
           background: #f3f4f6;
           border: 1px solid #d1d5db;
           border-radius: 4px;
           padding: 8px;
           font-family: monospace;
           font-size: 10px;
           color: #374151;
           margin-bottom: 8px;
         }

         .debug-info div {
           margin-bottom: 2px;
         }

         :is(html[class~=dark]) .debug-info {
           background: #374151;
           border-color: #4b5563;
           color: #d1d5db;
         }

         .player-controls {
           display: flex;
           align-items: center;
           justify-content: space-between;
           margin-bottom: 12px;
           gap: 8px;
           min-width: 0;
         }

         .left-controls,
         .right-controls {
           display: flex;
           align-items: center;
           gap: 8px;
           flex: 1;
           min-width: 0;
           overflow: hidden;
         }

         .right-controls {
           justify-content: flex-end;
         }

         .play-pause-btn {
           display: flex;
           align-items: center;
           justify-content: center;
           width: 56px;
           height: 56px;
           border: none;
           border-radius: 50%;
           background: var(--nx-colors-primary-600);
           cursor: pointer;
           transition: all 0.2s;
           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
           flex-shrink: 0;
         }

         .play-pause-btn:hover:not(:disabled) {
           background: var(--nx-colors-primary-700);
           transform: scale(1.05);
           box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
         }

         .play-pause-btn:disabled {
           opacity: 0.6;
           cursor: not-allowed;
           transform: none;
         }

         .loading-spinner {
           width: 20px;
           height: 20px;
           border: 2px solid transparent;
           border-top: 2px solid currentColor;
           border-radius: 50%;
           animation: spin 1s linear infinite;
         }

         @keyframes spin {
           to { transform: rotate(360deg); }
         }

         .progress-container {
           width: 100%;
           margin-top: 4px;
         }

         .progress-bar {
           width: 100%;
           height: 8px;
           background: var(--nx-colors-gray-200);
           border-radius: 4px;
           cursor: pointer;
           position: relative;
         }

         .progress-fill {
           height: 100%;
           background: var(--nx-colors-primary-600);
           border-radius: 4px;
           transition: width 0.1s;
         }

         .time-display {
           font-size: 12px;
           color: var(--nx-colors-gray-600);
           min-width: 32px;
           text-align: center;
           flex-shrink: 0;
         }

         .volume-control {
           display: flex;
           align-items: center;
           gap: 4px;
           flex-shrink: 1;
           min-width: 0;
         }

         .volume-slider {
           width: 60px;
           min-width: 40px;
           flex-shrink: 1;
         }

         .playback-rate {
           display: flex;
           align-items: center;
           gap: 4px;
           font-size: 12px;
           flex-shrink: 1;
           min-width: 0;
         }

         .rate-select {
           padding: 2px 4px;
           border: 1px solid var(--nx-colors-border-primary);
           border-radius: 4px;
           background: var(--nx-bg-primary);
           color: var(--nx-colors-text-primary);
           font-size: 10px;
           min-width: 0;
           flex-shrink: 1;
         }

         .prologue-attribution {
           margin-top: 0.5rem;
           font-size: 0.85rem;
           color: var(--nx-colors-gray-500);
           text-align: right;
         }

         .yt-link {
           color: #bbbbbb;
           text-decoration: none;
           display: inline-flex;
           align-items: center;
           gap: 0.25em;
           font-weight: 400;
           transition: color 0.2s;
         }

         .yt-link:hover {
           color: #ff0000;
         }

         /* Dark mode adjustments */
         :is(html[class~=dark]) .prologue-player {
           background: var(--nx-colors-gray-900);
           border-color: var(--nx-colors-gray-700);
           box-shadow: 0 2px 9px rgb(255 255 255 / 8%);
         }

         :is(html[class~=dark]) .prologue-player.minimized {
           background: var(--nx-colors-gray-900);
           border-color: var(--nx-colors-gray-700);
           box-shadow: none;
           padding: 0;
         }

         :is(html[class~=dark]) .prologue-player.open {
           background: var(--nx-colors-gray-900);
           border-color: var(--nx-colors-gray-700);
           box-shadow: 0 2px 9px rgb(255 255 255 / 8%);
           padding: 16px;
         }

         :is(html[class~=dark]) .progress-bar {
           background: var(--nx-colors-gray-700);
         }

         :is(html[class~=dark]) .time-display {
           color: var(--nx-colors-gray-400);
         }

         :is(html[class~=dark]) .prologue-attribution {
           color: var(--nx-colors-gray-400);
         }

         /* Responsive breakpoints for different screen sizes */
         @media (max-width: 768px) {
           .prologue-player {
             max-width: 100%;
             margin: 0 0 2rem auto;
           }
           
           .prologue-player.minimized {
             max-height: 0;
             overflow: hidden;
             transition: max-height 0.4s cubic-bezier(.4,0,.2,1);
             border-bottom: none;
           }

           .prologue-player.open {
             max-height: 1000px; /* Adjust as needed for max height */
             overflow: visible;
             transition: max-height 0.4s cubic-bezier(.4,0,.2,1);
             border-bottom: 1px solid var(--nx-colors-border-primary);
           }

           .prologue-player-content {
             max-height: 1000px; /* Adjust as needed for max height */
             overflow: visible;
             transition: max-height 0.4s cubic-bezier(.4,0,.2,1);
             border-bottom: 1px solid var(--nx-colors-border-primary);
           }

           .player-controls {
             gap: 6px;
           }
           
           .left-controls,
           .right-controls {
             gap: 6px;
           }
           
           .volume-slider {
             width: 50px;
           }
           
           .playback-rate {
             font-size: 11px;
           }
           
           .rate-select {
             font-size: 9px;
             padding: 1px 3px;
           }
         }

         /* Mobile responsive */
         @media (max-width: 768px) {
           .prologue-player {
             padding: 12px;
             margin: 0 0 2rem auto;
           }

           .prologue-player.minimized {
             max-height: 0;
             overflow: hidden;
             transition: max-height 0.4s cubic-bezier(.4,0,.2,1);
             border-bottom: none;
           }

           .prologue-player.open {
             max-height: 1000px; /* Adjust as needed for max height */
             overflow: visible;
             transition: max-height 0.4s cubic-bezier(.4,0,.2,1);
             border-bottom: 1px solid var(--nx-colors-border-primary);
           }

           .prologue-player-content {
             max-height: 1000px; /* Adjust as needed for max height */
             overflow: visible;
             transition: max-height 0.4s cubic-bezier(.4,0,.2,1);
             border-bottom: 1px solid var(--nx-colors-border-primary);
           }

           .player-controls {
             flex-direction: row;
             gap: 8px;
             align-items: center;
           }

           .left-controls,
           .right-controls {
             flex: 1;
             gap: 6px;
           }

           .play-pause-btn {
             width: 44px;
             height: 44px;
             flex-shrink: 0;
           }

           .play-pause-btn svg {
             width: 20px;
             height: 20px;
           }

           .time-display {
             font-size: 11px;
             min-width: 32px;
           }

           .volume-control {
             gap: 4px;
           }

           .volume-slider {
             width: 50px;
           }

           .playback-rate {
             gap: 4px;
             font-size: 11px;
           }

           .rate-select {
             padding: 2px 4px;
             font-size: 10px;
           }

           .progress-container {
             margin-top: 6px;
           }

           .progress-bar {
             height: 6px;
           }
         }

         /* Smaller mobile screens */
         @media (max-width: 480px) {
           .prologue-player {
             padding: 8px;
             margin: 0 0 2rem auto;
           }

           .prologue-player.minimized {
             max-height: 0;
             overflow: hidden;
             transition: max-height 0.4s cubic-bezier(.4,0,.2,1);
             border-bottom: none;
           }

           .prologue-player.open {
             max-height: 1000px; /* Adjust as needed for max height */
             overflow: visible;
             transition: max-height 0.4s cubic-bezier(.4,0,.2,1);
             border-bottom: 1px solid var(--nx-colors-border-primary);
           }

           .prologue-player-content {
             max-height: 1000px; /* Adjust as needed for max height */
             overflow: visible;
             transition: max-height 0.4s cubic-bezier(.4,0,.2,1);
             border-bottom: 1px solid var(--nx-colors-border-primary);
           }

           .player-controls {
             gap: 6px;
           }

           .left-controls,
           .right-controls {
             gap: 4px;
           }

           .play-pause-btn {
             width: 40px;
             height: 40px;
           }

           .play-pause-btn svg {
             width: 18px;
             height: 18px;
           }

           .time-display {
             font-size: 10px;
             min-width: 28px;
           }

           .volume-slider {
             width: 40px;
           }

           .playback-rate {
             font-size: 10px;
           }

           .rate-select {
             font-size: 9px;
             padding: 1px 3px;
           }

           .prologue-attribution {
             font-size: 0.75rem;
             text-align: left;
             margin-top: 0.75rem;
           }
         }
       `}</style>
    </div>
  );

  // Log when no audio file is found, but don't return early to avoid hook order issues
  if (!currentAudioFile) {
    console.log('No audio file found for route:', effectiveRoute);
  }

  // Return null if no audio file, after all hooks have been called
  if (!currentAudioFile) {
    return null;
  }
};

export default ProloguePlayer;