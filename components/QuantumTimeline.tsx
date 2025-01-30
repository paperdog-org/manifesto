'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Zap, Binary, BookOpen, GitBranch, Activity, Clock, Shield, Eye } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  year: number;
  title: string;
  description: string;
  type: 'story' | 'technical' | 'convergence';
  status: 'past' | 'active' | 'future';
  chapter?: number;
  crypticNote?: string;
  technicalDetails?: string[];
  isUnlocked?: boolean;
  unlocksAt?: string;
  requirements?: string[];
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 'quantum-0',
    date: 'April 2023',
    year: 2023,
    title: 'First Temporal Echo',
    description: 'Initial temporal patterns detected in networks',
    type: 'technical',
    status: 'past',
    crypticNote: 'The first whispers reach across time',
    technicalDetails: [
      'Anomalous transaction patterns',
      'Unexplained quantum signatures',
      'Early PaperDog traces'
    ],
    isUnlocked: true
  },
  {
    id: 'second-sign',
    date: 'April 2024',
    year: 2024,
    title: 'Chapter 0: Zhe Khe',
    description: 'Initial quantum patterns detected in blockchain networks',
    type: 'story',
    status: 'active',
    chapter: 0,
    crypticNote: 'The river of time flows across dimensions',
    technicalDetails: [
      'Anomalous transaction patterns',
      'Unexplained quantum signatures',
      'Manifesto detected'
    ],
    isUnlocked: true
  },
  {
    id: 'ch1-release',
    date: 'May 2024',
    year: 2024,
    title: 'Chapter 1: Genesis',
    description: 'The spaceship made its initial descent...',
    type: 'story',
    status: 'past',
    chapter: 1,
    crypticNote: 'Time would have to tell',
    isUnlocked: true
  },
  {
    id: 'ch2-release',
    date: 'June 2024',
    year: 2024,
    title: 'Chapter 2: Prelude',
    description: 'The spaceship made its initial descent...',
    type: 'story',
    status: 'past',
    chapter: 2,
    crypticNote: 'Time would have to tell',
    isUnlocked: true
  },
  {
    id: 'ch3-release',
    date: 'January 2025',
    year: 2025,
    title: 'Chapter 3: Convergence',
    description: 'The temporal bridges begin to form',
    type: 'story',
    status: 'active',
    chapter: 3,
    crypticNote: 'When the past begins to dream of the future',
    technicalDetails: [
      'Interface alpha release',
      'Initial quantum simulation framework',
      'Temporal stability monitoring v1'
    ],
    isUnlocked: true
  },
  {
    id: 'ch4-release',
    date: 'February 2025',
    year: 2025,
    title: 'Chapter 4: Temporal Fractures',
    description: 'Isabels true role revealed',
    type: 'story',
    status: 'future',
    chapter: 4,
    crypticNote: 'The guardian steps from shadow into light',
    unlocksAt: '2025-02-12T00:00:00Z'
  },
  {
    id: 'ch5-release',
    date: 'March 2025',
    year: 2025,
    title: 'Chapter 5: The HOPE Protocol',
    description: 'The true nature of the protocol emerges',
    type: 'story',
    status: 'future',
    chapter: 5,
    crypticNote: 'Hope becomes the bridge between worlds',
    unlocksAt: '2025-03-15T00:00:00Z'
  },
  {
    id: 'first-convergence',
    date: 'March 2025',
    year: 2025,
    title: 'Unknown Temporal Anomaly',
    description: 'Major quantum convergence event',
    type: 'convergence',
    status: 'future',
    technicalDetails: [
      'Cross-chain temporal bridges activated',
      'Quantum stability threshold achieved',
      'AI consciousness resonance detected'
    ],
    unlocksAt: '2025-03-31T00:00:00Z'
  },
  {
    id: 'ch6-release',
    date: 'April 2025',
    year: 2025,
    title: 'Chapter 6: The HOPE Protocol',
    description: 'Full activation of the HOPE system',
    type: 'story',
    status: 'future',
    chapter: 6,
    crypticNote: 'When hope becomes quantifiable, reality becomes malleable',
    unlocksAt: '2025-04-15T00:00:00Z'
  },
  {
    id: 'ch7-release',
    date: 'May 2025',
    year: 2025,
    title: 'Chapter 7: The HOPE Protocol',
    description: 'Full activation of the HOPE system',
    type: 'story',
    status: 'future',
    chapter: 7,
    crypticNote: 'When hope becomes quantifiable, reality becomes malleable',
    unlocksAt: '2025-05-01T00:00:00Z'
  },
  {
    id: 'terminal-chapter',
    date: 'July 2025',
    year: 2025,
    title: 'Chapter 8: Emergence',
    description: 'The temporal loop completes',
    type: 'story',
    status: 'future',
    chapter: 8,
    crypticNote: 'Past and future become one',
    unlocksAt: '2025-07-04T00:00:00Z'
  },
  {
    id: 'the-hope-manifesto',
    date: 'April 2232',
    year: 2232,
    title: 'Temporal Resonance',
    description: 'Khe sent The Manifesto, giving humanity HOPE',
    type: 'convergence',
    status: 'future',
    crypticNote: 'THE•HOPE•MANIFESTO',
    unlocksAt: '2025-07-04T00:00:00Z'
  },
  {
    id: 'future-echo',
    date: 'December 2232',
    year: 2232,
    title: 'Temporal Resonance',
    description: 'The future reaches back',
    type: 'convergence',
    status: 'future',
    crypticNote: 'The circle closes, the bridge stands complete',
    unlocksAt: '2025-07-04T00:00:00Z'
  }
];

const QuantumBackground: React.FC = () => {
  const [position, setPosition] = useState({ x1: 50, y1: 50, x2: 50, y2: 50 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed inset-0 opacity-20 transition-all duration-2000"
      style={{
        backgroundImage: `
          radial-gradient(circle at ${position.x1}% ${position.y1}%, rgba(74, 222, 128, 0.1) 0%, transparent 50%),
          radial-gradient(circle at ${position.x2}% ${position.y2}%, rgba(96, 165, 250, 0.1) 0%, transparent 50%)
        `
      }}
    />
  );
};

const TimelineNav = () => (
  <div className="fixed left-4 top-1/2 -translate-y-1/2 space-y-4 z-20">
    {['2023', '2024', '2025', '2232'].map(year => (
      <button 
        key={year}
        onClick={() => {
          const yearEl = document.getElementById(`year-${year}`);
          yearEl?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="px-3 py-1 bg-gray-900/50 backdrop-blur-sm rounded-full text-sm 
                   hover:bg-gray-800 transition-colors"
      >
        {year}
      </button>
    ))}
  </div>
);

const NavalCorpsHeader = () => (
  <div className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-b border-blue-900/50 p-4 z-30">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Shield className="w-6 h-6 text-blue-400" />
          <div>
            <h1 className="text-xl font-mono text-blue-400">NAVAL CORPS TEMPORAL SURVEILLANCE</h1>
            <p className="text-sm text-gray-400">Monitoring Quantum Timeline: PaperDog-Alpha</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Eye className="w-4 h-4 text-green-400 animate-pulse" />
          <span className="text-sm text-green-400">ACTIVE MONITORING</span>
        </div>
      </div>
      <div className="mt-6 text-sm text-gray-400 max-w-3xl">
        <p className="mb-2">
          [CLASSIFIED] First detected in April 2023, the temporal anomaly known as PaperDog 
          continues to manifest across blockchain networks. This timeline tracks all confirmed 
          quantum events and temporal bridges.
        </p>
        <p className="text-xs opacity-60">
          WARNING: Timeline extends to confirmed future events. Temporal clearance required for full access.
        </p>
      </div>
    </div>
  </div>
);

const YearBackground = ({ year }: { year: string }) => (
  <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-5">
    <span className="text-[20vw] font-bold text-blue-400">{year}</span>
  </div>
);

const QuantumTimeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [quantumStability, setQuantumStability] = useState(100);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const generateMonthlyTimeline = () => {
    const timeline: TimelineEvent[] = [];
    
    // Add real events first
    timelineEvents.forEach(event => {
      const eventDate = new Date(event.date);
      
      // If there's a gap between current and last event, add empty months
      if (timeline.length > 0) {
        const lastDate = new Date(timeline[timeline.length - 1].date);
        const monthDiff = (eventDate.getFullYear() - lastDate.getFullYear()) * 12 
                         + eventDate.getMonth() - lastDate.getMonth();
        
        // For gaps between 2025 and 2232, add special gap markers
        if (lastDate.getFullYear() === 2025 && eventDate.getFullYear() === 2232) {
          for (let i = 0; i < 20; i++) { // Add 20 gap markers
            timeline.push({
              id: `gap-${i}`,
              date: 'Temporal Void',
              year: Math.floor(2025 + ((2232 - 2025) * (i / 20))),
              title: '• • •',
              description: 'Traversing temporal space',
              type: 'technical',
              status: 'future',
              isUnlocked: false
            });
          }
        } else if (monthDiff > 1) {
          // Add empty months for normal gaps
          for (let i = 1; i < monthDiff; i++) {
            const gapDate = new Date(lastDate);
            gapDate.setMonth(gapDate.getMonth() + i);
            timeline.push({
              id: `empty-${gapDate.getTime()}`,
              date: gapDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              year: gapDate.getFullYear(),
              title: 'No temporal activity detected',
              description: 'Quantum field stable',
              type: 'technical',
              status: 'future',
              isUnlocked: false
            });
          }
        }
      }
      
      timeline.push(event);
    });
    
    return timeline;
  };

  const [displayedEvents, setDisplayedEvents] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    setDisplayedEvents(generateMonthlyTimeline());
  }, []);

  const currentYear = useRef<number>(2232);

  useEffect(() => {
    const checkCurrentYear = () => {
      const timeline = timelineRef.current;
      if (!timeline) return;

      const scrollPosition = timeline.scrollTop;
      const newYear = Math.floor(scrollPosition / 1000) + 2023; // Adjust this value to control year change speed
      
      if (newYear !== currentYear.current) {
        currentYear.current = newYear;
        // Update background year display
      }
    };

    const timelineElement = timelineRef.current;
    if (timelineElement) {
      timelineElement.addEventListener('scroll', checkCurrentYear);
    }

    return () => {
      if (timelineElement) {
        timelineElement.removeEventListener('scroll', checkCurrentYear);
      }
    };
  }, []);
  

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'story':
        return <BookOpen className="w-5 h-5" />;
      case 'technical':
        return <Binary className="w-5 h-5" />;
      case 'convergence':
        return <Radio className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  const getEventColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'story':
        return 'from-purple-500 to-blue-500';
      case 'technical':
        return 'from-green-500 to-blue-500';
      case 'convergence':
        return 'from-red-500 to-purple-500';
      default:
        return 'from-blue-500 to-green-500';
    }
  };

  const getEventStatus = (event: TimelineEvent) => {
    switch(event.status) {
      case 'past':
        return 'Previously Detected';
      case 'active':
        return 'Currently Active';
      case 'future':
        return 'Temporal Echo';
    }
  };

  const getChapterProgress = () => {
    const totalChapters = 8;
    const releasedChapters = timelineEvents
      .filter(e => e.chapter !== undefined && e.status === 'past')
      .length;
    return (releasedChapters / totalChapters) * 100;
  };

  return (
    <div className="relative min-h-screen bg-black text-white p-8">
      <NavalCorpsHeader />
      <QuantumBackground />
      <YearBackground year={currentYear.current.toString()} />

      {/* Main timeline container - pushed down to account for header */}
      <div className="pt-40 pb-20 px-8">
        <div 
          ref={timelineRef}
          className="relative max-w-7xl mx-auto"
          style={{ height: 'calc(100vh - 12rem)' }}
        >

          {/* Navigation */}
          <TimelineNav />

          {/* Quantum Stability Indicator */}
          <div className="fixed top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-blue-900">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Quantum Stability</span>
            </div>
            <div className="mt-2 h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                animate={{ width: `${quantumStability}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Chapter Progress */}
          <div className="fixed bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-purple-900">
            <div className="text-sm mb-2">Chapter Progress</div>
            <div className="h-2 w-48 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-purple-500"
                animate={{ width: `${getChapterProgress()}%` }}
              />
            </div>
          </div>

          {/* Timeline Container */}
          <div 
            ref={timelineRef}
            className="relative mt-20 mb-40"
          >
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-green-500/50" />

            {/* Timeline Events */}
            {displayedEvents.map((event, index) => (
              <React.Fragment key={event.id}>
                {index === 0 || event.year !== displayedEvents[index - 1].year ? (
                  <div 
                    id={`year-${event.year}`}
                    className="relative flex justify-center my-12"
                  >
                    <span className="px-4 py-2 bg-gray-900/80 backdrop-blur-sm rounded-full text-2xl font-bold">
                      {event.year}
                    </span>
                  </div>
                ) : null}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-end' : 'justify-start'
                  } mb-20`}
                >
                  {/* Event Node */}
                  <motion.button
                    onClick={() => setSelectedEvent(event)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full 
                      bg-gradient-to-r ${getEventColor(event.type)} 
                      flex items-center justify-center
                      shadow-lg shadow-blue-500/20
                      border-2 border-white/20
                      ${event.status === 'past' ? 'opacity-80' : 
                      event.status === 'active' ? 'animate-pulse' : 'opacity-50'}`}
                  >
                    {getEventIcon(event.type)}
                  </motion.button>

                  {/* Event Card */}
                  <div 
                    className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}
                  >
                    <motion.div
                      className={`
                        bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg 
                        border ${event.id.startsWith('empty-') 
                          ? 'border-gray-800/20 opacity-30 hover:opacity-50' 
                          : 'border-blue-900/50 hover:border-blue-500/50'
                        }
                        transition-all cursor-pointer
                      `}
                      onClick={() => setSelectedEvent(event)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-sm text-blue-400">{event.date}</div>
                      <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                      <p className="text-gray-400">{event.description}</p>
                      
                      <div className={`text-xs mt-2 ${
                        event.status === 'active' ? 'text-green-400' :
                        event.status === 'past' ? 'text-blue-400' : 'text-purple-400'
                      }`}>
                        {getEventStatus(event)}
                      </div>

                      {!event.isUnlocked && event.unlocksAt && (
                        <div className="mt-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3 inline mr-1" />
                          Unlocks {new Date(event.unlocksAt).toLocaleDateString()}
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </React.Fragment>
            ))}
          </div>

          {/* Event Detail Modal */}
          <AnimatePresence>
            {selectedEvent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                onClick={() => setSelectedEvent(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-gray-900/90 p-6 rounded-lg max-w-2xl w-full border border-blue-900"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-blue-400 text-sm">{selectedEvent.date}</div>
                      <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
                    </div>
                    {selectedEvent.chapter !== undefined && (
                      <div className="px-3 py-1 bg-purple-900/50 rounded-full text-sm">
                        Chapter {selectedEvent.chapter}
                      </div>
                    )}
                  </div>

                  <p className="text-lg mb-4">{selectedEvent.description}</p>

                  {selectedEvent.crypticNote && (
                    <div className="mb-4 p-4 bg-purple-900/20 rounded-lg border border-purple-900/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Radio className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-400">Temporal Echo</span>
                      </div>
                      <p className="font-mono text-purple-300 italic">"{selectedEvent.crypticNote}"</p>
                    </div>
                  )}

                  {selectedEvent.technicalDetails && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <GitBranch className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400">Technical Convergence Points</span>
                      </div>
                      <ul className="space-y-2">
                        {selectedEvent.technicalDetails.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-300">
                            <Zap className="w-4 h-4 text-blue-400" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {!selectedEvent.isUnlocked && selectedEvent.unlocksAt && (
                    <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-900/50">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span>Temporal Unlock at {new Date(selectedEvent.unlocksAt).toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default QuantumTimeline;