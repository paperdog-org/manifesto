'use client'
import React, { useState, useEffect } from 'react';
import Typewriter from "./Typewriter";
import { Monitor, Clock, ChevronRight, ChevronDown, X, Menu } from 'lucide-react';
import { transmissionsData } from '../lib/data/transmissions';
import { type Chapter, type Transmission, type TransmissionContent } from '../lib/types/transmissions'

interface TransmissionsProps {
    onClose?: () => void;
}

const getAllTransmissions = (chapters: Chapter[], showChapter8: boolean): Transmission[] => {
  return chapters
    .filter(chapter => chapter.number !== 8 || showChapter8)
    .flatMap(chapter => chapter.transmissions);
};

const getCurrentIndex = (allTransmissions: Transmission[], currentTransmission: Transmission): number => {
  return allTransmissions.findIndex(t => t.path === currentTransmission.path);
};

const TransmissionViewer = ({ 
  content, 
  onClose,
  onNavigate,
  currentTransmission,
  chapters,
  showChapter8
}: { 
  content: TransmissionContent | null;
  onClose?: () => void;
  onNavigate?: (transmission: Transmission) => void;
  currentTransmission: Transmission;
  chapters: Chapter[];
  showChapter8: boolean;
}) => {
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const allTransmissions = getAllTransmissions(chapters, showChapter8);
  const currentIndex = getCurrentIndex(allTransmissions, currentTransmission);

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (!onNavigate) return;
    
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < allTransmissions.length) {
      onNavigate(allTransmissions[newIndex]);
    }
  };

  useEffect(() => {
    if (!content) return;
    setDisplayedLines(0);
    
    const timer = setInterval(() => {
      setDisplayedLines(prev => 
        prev < content.content.length ? prev + 1 : prev
      );
    }, 100);

    return () => clearInterval(timer);
  }, [content]);

  if (!content) return null;

  return (
    <div className="relative min-h-full w-full bg-black bg-opacity-90 text-green-400 p-4 md:p-6 rounded-lg flex flex-col">
      <div className="sticky top-0 left-0 right-0 z-10">
        <div className="h-8 bg-gray-800 flex items-center justify-between px-4">
          <div className="flex items-center">
            <Monitor size={16} className="mr-2" />
            <span className="text-xs font-mono">
              TRANSMISSION_VIEWER::v2.32 | {content.metadata.date} {content.metadata.time}
            </span>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="md:hidden p-1 hover:bg-gray-700 rounded-full"
            >
              <X size={16} className="text-gray-400 hover:text-white" />
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation Arrows */}
      <div className="md:hidden flex justify-between items-center mt-4 mb-2">
        <button
          onClick={() => handleNavigation('prev')}
          disabled={currentIndex === 0}
          className={`p-2 rounded-full ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
          }`}
        >
          <ChevronRight className="w-6 h-6 transform rotate-180 text-green-400" />
        </button>
        
        <span className="text-xs font-mono text-gray-400">
          Transmission {currentIndex + 1} of {allTransmissions.length}
        </span>
        
        <button
          onClick={() => handleNavigation('next')}
          disabled={currentIndex === allTransmissions.length - 1}
          className={`p-2 rounded-full ${
            currentIndex === allTransmissions.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
          }`}
        >
          <ChevronRight className="w-6 h-6 text-green-400" />
        </button>
      </div>
      
      <div className="mt-8 font-mono flex-1">
        <div className="animate-pulse mb-4">
          DECODING TRANSMISSION...
        </div>
        
        <div className="whitespace-pre-wrap">
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

const MobileTransmissionSelect = ({
  chapters,
  selectedTransmission,
  onSelectTransmission,
  showChapter8
}: {
  chapters: typeof transmissionsData,
  selectedTransmission: Transmission | null,
  onSelectTransmission: (t: Transmission) => void,
  showChapter8: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 bg-gray-800 text-green-400 rounded-lg flex items-center justify-between"
      >
        <span className="font-mono">
          {selectedTransmission ? 
            `Chapter ${selectedTransmission.chapter}: ${selectedTransmission.preview.substring(0, 30)}...` : 
            'Select Transmission'}
        </span>
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-xl z-50 max-h-[60vh] overflow-y-auto">
          {chapters.map((chapter) => (
            (chapter.number !== 8 || showChapter8) && (
              <div key={chapter.number}>
                <div
                  className="px-4 py-2 bg-gray-700 text-green-400 font-mono cursor-pointer hover:bg-gray-600"
                  onClick={() => setSelectedChapter(selectedChapter?.number === chapter.number ? null : chapter)}
                >
                  Chapter {chapter.number}: {chapter.title}
                </div>
                
                {selectedChapter?.number === chapter.number && (
                  <div className="bg-gray-800">
                    {chapter.transmissions.map((transmission, idx) => (
                      <div
                        key={idx}
                        className={`px-6 py-2 cursor-pointer ${
                          selectedTransmission === transmission ? 'bg-gray-600 text-green-400' : 'hover:bg-gray-700'
                        }`}
                        onClick={() => {
                          onSelectTransmission(transmission);
                          setIsOpen(false);
                        }}
                      >
                        <div className="text-sm font-mono">
                          {transmission.preview.substring(0, 40)}...
                          <div className="text-xs text-gray-400 mt-1">
                            {transmission.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

const DesktopNavigation = ({
  chapters,
  selectedTransmission,
  onSelectTransmission,
  showChapter8,
  collapsedChapters,
  toggleChapter
}: {
  chapters: typeof transmissionsData,
  selectedTransmission: Transmission | null,
  onSelectTransmission: (t: Transmission) => void,
  showChapter8: boolean,
  collapsedChapters: number[],
  toggleChapter: (num: number) => void
}) => (
  <div className="space-y-6">
    {chapters.map((chapter) => (
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
              <div 
                key={idx}
                onClick={() => onSelectTransmission(transmission)}
                className={`
                  cursor-pointer p-4 border-l-4 
                  ${selectedTransmission === transmission ? 'border-green-400 bg-black bg-opacity-20' : 'border-gray-600 hover:border-green-200'}
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
            ))}
          </div>
        </div>
      )
    ))}
  </div>
);

const Transmissions: React.FC<TransmissionsProps> = ({ onClose }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showChapter8, setShowChapter8] = useState(false);
  const [selectedTransmission, setSelectedTransmission] = useState<Transmission | null>(null);
  const [transmissionContent, setTransmissionContent] = useState<TransmissionContent | null>(null);
  const [collapsedChapters, setCollapsedChapters] = useState<number[]>([]);
  const [showMobileNav, setShowMobileNav] = useState(false);

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
    <div className="flex flex-col h-screen md:min-h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-800">
        <h1 className="text-lg font-bold">
          ⊕PAPERDOG⊕{currentTime.toLocaleTimeString()}⊕
        </h1>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg"
          >
            <X size={24} className="text-green-400" />
          </button>
        )}
      </div>

      {/* Mobile Navigation Dropdown */}
      <div className="md:hidden p-4">
        <MobileTransmissionSelect
          chapters={transmissionsData}
          selectedTransmission={selectedTransmission}
          onSelectTransmission={setSelectedTransmission}
          showChapter8={showChapter8}
        />
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block md:w-96 border-r border-gray-800 overflow-y-auto p-6">
          <h1 className="text-xl font-bold mb-4">
            ⊕PAPERDOG⊕{currentTime.toLocaleTimeString()}⊕
          </h1>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full"
            >
              <X size={20} className="text-gray-400 hover:text-white" />
            </button>
          )}
          <div className="mt-2">
            <Typewriter text="Transmissions" delay={111} />
          </div>
          <div className="mt-8">
            <DesktopNavigation
              chapters={transmissionsData}
              selectedTransmission={selectedTransmission}
              onSelectTransmission={setSelectedTransmission}
              showChapter8={showChapter8}
              collapsedChapters={collapsedChapters}
              toggleChapter={toggleChapter}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="h-full p-4 md:p-6">
            {selectedTransmission ? (
              <TransmissionViewer 
              content={transmissionContent} 
              onClose={() => setSelectedTransmission(null)}
              onNavigate={setSelectedTransmission}
              currentTransmission={selectedTransmission}
              chapters={transmissionsData}
              showChapter8={showChapter8}
            />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 font-mono">
                Select a transmission to begin...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transmissions;