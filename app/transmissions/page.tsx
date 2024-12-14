'use client'
import React, { useState, useEffect } from 'react';
import Typewriter from "../../components/Typewriter";
import { Monitor, Clock, ChevronRight } from 'lucide-react';
import { transmissionsData } from '../../lib/data/transmissions';
import { type Chapter, type Transmission, type TransmissionContent } from '../../lib/types/transmissions'

const TransmissionViewer = ({ content }: { content: TransmissionContent | null }) => {
  const [displayedLines, setDisplayedLines] = useState<number>(0);

  useEffect(() => {
    if (!content) return;
    setDisplayedLines(0); // Reset when content changes
    
    const timer = setInterval(() => {
      setDisplayedLines(prev => 
        prev < content.content.length ? prev + 1 : prev
      );
    }, 100);

    return () => clearInterval(timer);
  }, [content]);

  if (!content) return null;

  return (
    <div className="relative h-full w-full bg-black bg-opacity-90 text-green-400 p-6 rounded-lg overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 flex items-center px-4">
        <Monitor size={16} className="mr-2" />
        <span className="text-xs font-mono">
          TRANSMISSION_VIEWER::v2.32 | {content.metadata.date} {content.metadata.time}
        </span>
      </div>
      
      <div className="mt-8 font-mono">
        <div className="animate-pulse mb-4">
          DECODING TRANSMISSION...
        </div>
        
        <div className="whitespace-pre-wrap overflow-auto max-h-[calc(100vh-12rem)]">
          {content.content.slice(0, displayedLines).map((line, index) => (
            <p 
              key={index} 
              className="mb-4 transition-opacity duration-500"
              style={{
                opacity: 1,
                transform: `translateY(${Math.min(20, (displayedLines - index) * 2)}px)`,
                transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const TransmissionTab = ({ 
  transmission, 
  isActive, 
  onClick 
}: { 
  transmission: Transmission, 
  isActive: boolean,
  onClick: () => void 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        cursor-pointer p-4 border-l-4 
        ${isActive ? 'border-green-400 bg-black bg-opacity-20' : 'border-gray-600 hover:border-green-200'}
        transition-all duration-200
      `}
    >
      <div className="flex items-center text-sm">
        <Clock size={14} className="mr-2" />
        <span className="font-mono text-gray-400">{transmission.date}</span>
      </div>
      <div className="mt-1 font-mono text-sm">
        {transmission.preview.substring(0, 50)}...
      </div>
    </div>
  );
};

const TransmissionsRoute = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showChapter8, setShowChapter8] = useState(false);
  const [selectedTransmission, setSelectedTransmission] = useState<Transmission | null>(null);
  const [transmissionContent, setTransmissionContent] = useState<TransmissionContent | null>(null);
  const [collapsedChapters, setCollapsedChapters] = useState<number[]>([]);

  const toggleChapter = (chapterNumber: number) => {
    setCollapsedChapters(prev => 
      prev.includes(chapterNumber)
        ? prev.filter(num => num !== chapterNumber)
        : [...prev, chapterNumber]
    );
  };
  

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setShowChapter8(now.getHours() === 18 && now.getMinutes() === 51);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadTransmissionContent = async () => {
        if (selectedTransmission) {
          try {
            const response = await fetch(selectedTransmission.path);
            const data: TransmissionContent = await response.json();
            setTransmissionContent(data);
          } catch (error) {
            console.error('Failed to load transmission:', error);
            setTransmissionContent(null);
          }
        } else {
          setTransmissionContent(null);
        }
      };

    loadTransmissionContent();
  }, [selectedTransmission]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation Sidebar */}
      <div className="w-96 border-r border-gray-800 overflow-y-auto">
        <div className="p-6">
          <h1 className="text-xl font-bold mb-4">
            &oplus;
            <a href="/" className="hover:text-green-400 transition-colors">PAPERDOG</a>
            &oplus;
            <span>{currentTime.toLocaleTimeString()}</span>
            &oplus;
            <div className="mt-2">
              <Typewriter text="Transmissions" delay={111} />
            </div>
          </h1>
          

          <div className="space-y-6 mt-8">
            {transmissionsData.map((chapter) => (
              (chapter.number !== 8 || showChapter8) && (
                <div key={chapter.number} className="space-y-2">
                  <div 
                    onClick={() => toggleChapter(chapter.number)}
                    className="flex items-center text-green-400 mb-4 cursor-pointer hover:text-green-300"
                  >
                    <ChevronRight 
                      size={16} 
                      className={`transform transition-transform duration-200 ${
                        !collapsedChapters.includes(chapter.number) ? 'rotate-90' : ''
                      }`}
                    />
                    <h2 className="text-lg font-mono ml-2">
                      Chapter {chapter.number}: {chapter.title}
                    </h2>
                  </div>

                  <div className={`
                    space-y-2 transition-all duration-300
                    ${collapsedChapters.includes(chapter.number) ? 'h-0 opacity-0 overflow-hidden' : 'opacity-100'}
                  `}>
                    {chapter.transmissions.map((transmission, idx) => (
                      <TransmissionTab
                        key={idx}
                        transmission={transmission}
                        isActive={selectedTransmission === transmission}
                        onClick={() => setSelectedTransmission(transmission)}
                      />
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {selectedTransmission ? (
          <TransmissionViewer content={transmissionContent} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 font-mono">
            Select a transmission to begin...
          </div>
        )}
      </div>
    </div>
  );
};

export default TransmissionsRoute;