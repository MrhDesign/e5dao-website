'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface MapComponentProps {
  latitude: number;
  longitude: number;
  companyName?: string;
  address?: string;
  className?: string;
}

declare global {
  interface Window {
    google?: {
      maps: {
        Map: new (element: HTMLElement, options: unknown) => unknown;
        Marker: new (options: unknown) => unknown;
        InfoWindow: new (options: unknown) => unknown;
      };
    };
    AMap?: {
      Map: new (element: HTMLElement, options: unknown) => unknown;
      Marker: new (options: unknown) => unknown;
      InfoWindow: new (options: unknown) => unknown;
    };
    initGoogleMap: () => void;
    initAMap: () => void;
  }
}

export default function MapComponent({
  latitude,
  longitude,
  companyName = "E5DAO",
  address = "",
  className = ""
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapType, setMapType] = useState<'loading' | 'google' | 'amap' | 'error'>('loading');
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [isAmapLoaded, setIsAmapLoaded] = useState(false);

  // 初始化Google地图
  const initGoogleMap = useCallback(() => {
    if (!mapRef.current || !window.google) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: latitude, lng: longitude },
      zoom: 15,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
    });

    // 添加标记
    new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
      title: companyName,
      icon: {
        url: 'data:image/svg+xml;base64,' + btoa(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C10.486 2 6 6.486 6 12c0 7.5 10 18 10 18s10-10.5 10-18c0-5.514-4.486-10-10-10z" fill="#FF4444"/>
            <circle cx="16" cy="12" r="4" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 32),
        anchor: new window.google.maps.Point(16, 32)
      }
    });

    // 添加信息窗口
    if (address) {
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; font-family: Arial, sans-serif;">
            <h3 style="margin: 0 0 5px 0; color: #333;">${companyName}</h3>
            <p style="margin: 0; color: #666; font-size: 14px;">${address}</p>
          </div>
        `
      });

      const marker = new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: companyName
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    }

    setMapType('google');
  }, [latitude, longitude, companyName, address]);

  // 初始化高德地图
  const initAMap = useCallback(() => {
    if (!mapRef.current || !window.AMap) return;

    const map = new window.AMap.Map(mapRef.current, {
      center: [longitude, latitude],
      zoom: 15,
      mapStyle: 'amap://styles/normal'
    });

    // 添加标记
    const marker = new window.AMap.Marker({
      position: [longitude, latitude],
      title: companyName,
      icon: new window.AMap.Icon({
        image: 'data:image/svg+xml;base64,' + btoa(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C10.486 2 6 6.486 6 12c0 7.5 10 18 10 18s10-10.5 10-18c0-5.514-4.486-10-10-10z" fill="#FF4444"/>
            <circle cx="16" cy="12" r="4" fill="white"/>
          </svg>
        `),
        size: new window.AMap.Size(32, 32),
        imageOffset: new window.AMap.Pixel(0, 0)
      })
    });

    map.add(marker);

    // 添加信息窗口
    if (address) {
      const infoWindow = new window.AMap.InfoWindow({
        content: `
          <div style="padding: 10px; font-family: Arial, sans-serif;">
            <h3 style="margin: 0 0 5px 0; color: #333;">${companyName}</h3>
            <p style="margin: 0; color: #666; font-size: 14px;">${address}</p>
          </div>
        `
      });

      marker.on('click', () => {
        infoWindow.open(map, marker.getPosition());
      });
    }

    setMapType('amap');
  }, [latitude, longitude, companyName, address]);

  // 加载Google Maps
  const loadGoogleMaps = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (window.google && window.google.maps) {
        setIsGoogleLoaded(true);
        resolve();
        return;
      }

      window.initGoogleMap = () => {
        setIsGoogleLoaded(true);
        resolve();
      };

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initGoogleMap&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onerror = () => reject(new Error('Google Maps failed to load'));
      
      document.head.appendChild(script);
      
      // 超时处理
      setTimeout(() => {
        if (!isGoogleLoaded) {
          reject(new Error('Google Maps loading timeout'));
        }
      }, 10000);
    });
  }, [isGoogleLoaded]);

  // 加载高德地图
  const loadAMap = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (window.AMap) {
        setIsAmapLoaded(true);
        resolve();
        return;
      }

      window.initAMap = () => {
        setIsAmapLoaded(true);
        resolve();
      };

      const script = document.createElement('script');
      script.src = `https://webapi.amap.com/maps?v=2.0&key=${process.env.NEXT_PUBLIC_AMAP_API_KEY}&callback=initAMap`;
      script.async = true;
      script.onerror = () => reject(new Error('AMap failed to load'));
      
      document.head.appendChild(script);
      
      // 超时处理
      setTimeout(() => {
        if (!isAmapLoaded) {
          reject(new Error('AMap loading timeout'));
        }
      }, 10000);
    });
  }, [isAmapLoaded]);

  useEffect(() => {
    const loadMaps = async () => {
      try {
        // 优先尝试加载Google地图
        await loadGoogleMaps();
        initGoogleMap();
      } catch (error) {
        console.warn('Google Maps loading failed, trying AMap...', error);
        try {
          // Google地图加载失败，尝试加载高德地图
          await loadAMap();
          initAMap();
        } catch (amapError) {
          console.error('Both Google Maps and AMap failed to load:', amapError);
          setMapType('error');
        }
      }
    };

    loadMaps();
  }, [latitude, longitude, initGoogleMap, initAMap, loadGoogleMaps, loadAMap]);

  // 重新初始化地图（当坐标变化时）
  useEffect(() => {
    if (mapType === 'google' && isGoogleLoaded) {
      initGoogleMap();
    } else if (mapType === 'amap' && isAmapLoaded) {
      initAMap();
    }
  }, [mapType, isGoogleLoaded, isAmapLoaded, initGoogleMap, initAMap]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {mapType === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      
      {mapType === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center p-6">
            <div className="text-red-500 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Map loading failed</h3>
            <p className="text-gray-600 text-sm">Unable to load map services</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>{companyName}</p>
              {address && <p>{address}</p>}
              <p>Coordinates: {latitude}, {longitude}</p>
            </div>
          </div>
        </div>
      )}
      
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg"
        style={{ minHeight: '400px' }}
      />
      
      {mapType !== 'loading' && mapType !== 'error' && (
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs text-gray-600 shadow">
          {mapType === 'google' ? 'Google Maps' : 'AMap'}
        </div>
      )}
    </div>
  );
}