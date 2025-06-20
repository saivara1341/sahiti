import React, { useState, useCallback, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import ChatScreen from './components/ChatScreen';
import GlobalHeader from './components/GlobalHeader';
import GreetingScreen from './components/GreetingScreen';
import { Screen, Theme } from './types';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Home);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        return 'dark';
      }
    }
    return 'light';
  });
  const [showGreeting, setShowGreeting] = useState(true); // Show greeting initially

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const navigateToChat = useCallback(() => {
    setCurrentScreen(Screen.Chat);
  }, []);

  const navigateToHome = useCallback(() => {
    setCurrentScreen(Screen.Home);
  }, []);
  
  const handleGreetingComplete = useCallback(() => {
    setShowGreeting(false);
  }, []);

  if (showGreeting) {
    return <GreetingScreen onComplete={handleGreetingComplete} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950">
      <GlobalHeader currentTheme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow flex flex-col">
        {currentScreen === Screen.Home && <HomeScreen onNavigateToChat={navigateToChat} />}
        {currentScreen === Screen.Chat && <ChatScreen onNavigateBack={navigateToHome} />}
      </main>
    </div>
  );
};

export default App;