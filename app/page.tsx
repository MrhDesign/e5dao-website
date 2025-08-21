'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Button from './components/Button';
import useContent from '../lib/useContent';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [canAutoplay, setCanAutoplay] = useState(true);
  const { getContent } = useContent();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 尝试自动播放，如果失败则显示播放按钮
    const attemptAutoplay = async () => {
      try {
        await video.play();
        setCanAutoplay(true);
      } catch (error) {
        console.log('Autoplay failed:', error);
        setCanAutoplay(false);
      }
    };

    // 移动设备优化：监听视口变化
    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        attemptAutoplay();
      }
    };

    // Intersection Observer 用于检测视频是否在视口中
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video.paused) {
            attemptAutoplay();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 确保视频加载后尝试播放
    if (video.readyState >= 2) {
      attemptAutoplay();
    } else {
      video.addEventListener('canplay', attemptAutoplay);
      video.addEventListener('loadedmetadata', attemptAutoplay);
    }

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      video.removeEventListener('canplay', attemptAutoplay);
      video.removeEventListener('loadedmetadata', attemptAutoplay);
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const playVideo = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setCanAutoplay(true);
      } catch (error) {
        console.log('Manual play failed:', error);
      }
    }
  };

  return (
    <>
    <section className="relative">
      <video 
        ref={videoRef}
        src="/hero.mp4" 
        autoPlay 
        loop 
        muted
        playsInline
        preload="metadata"
        webkit-playsinline="true"
        x-webkit-airplay="allow"
        className="w-full object-cover"
      />
      
      {/* 播放按钮 - 当自动播放失败时显示 */}
      {!canAutoplay && (
        <button
          onClick={playVideo}
          className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-opacity duration-300"
        >
          <div className="bg-white/90 hover:bg-white text-black p-4 rounded-full transition-all duration-200 shadow-lg">
            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </button>
      )}
      
      {/* 声音控制按钮 */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
        title={isMuted ? '开启声音' : '关闭声音'}
      >
        {isMuted ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.54-.77 2.2-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7z"/>
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.33-1.71-.7L7 9H4c-.55 0-1-.45-1-1zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z"/>
          </svg>
        )}
      </button>
      
      <div className='absolute bottom-10 left-1/2 -translate-x-1/2'>
        <Button className='relative'>{getContent('home.hero.button')}</Button>
      </div>
    </section>
    <section className="lg:px-30 px-5">
      <div className="w-full flex justify-between py-10 gap-30">
          <Image 
            src="/images/about-title.png" 
            alt="About Title" 
            width={526}
            height={181}
            className=""
            priority
          />


        <div>
          <p className='text-display'>{getContent('home.about.description')}</p>
        </div>
      </div>
    </section>
    </>
  );
}
