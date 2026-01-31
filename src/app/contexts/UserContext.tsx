import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserPreferences {
  selectedSports: string[];
  selectedTeams: string[];
  onboardingComplete: boolean;
  savedArticles: string[];
  hiddenSports: string[];
  hiddenTeams: string[];
  age: number | null;
  feedStyle: 'grid' | 'tiktok';
}

interface UserContextType {
  preferences: UserPreferences;
  updateSports: (sports: string[]) => void;
  updateTeams: (teams: string[]) => void;
  completeOnboarding: () => void;
  toggleSaveArticle: (articleId: string) => void;
  isArticleSaved: (articleId: string) => boolean;
  toggleHideSport: (sport: string) => void;
  toggleHideTeam: (team: string) => void;
  isSportHidden: (sport: string) => boolean;
  isTeamHidden: (team: string) => boolean;
  updateAge: (age: number | null) => void;
  updateFeedStyle: (style: 'grid' | 'tiktok') => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('userPreferences');
    const defaultPrefs = {
      selectedSports: [],
      selectedTeams: [],
      onboardingComplete: false,
      savedArticles: [],
      hiddenSports: [],
      hiddenTeams: [],
      age: null,
      feedStyle: 'grid',
    };
    
    if (saved) {
      const parsedPrefs = JSON.parse(saved);
      // Merge with defaults to ensure all properties exist
      return {
        ...defaultPrefs,
        ...parsedPrefs,
        hiddenSports: parsedPrefs.hiddenSports || [],
        hiddenTeams: parsedPrefs.hiddenTeams || [],
        age: parsedPrefs.age || null,
        feedStyle: parsedPrefs.feedStyle || 'grid',
      };
    }
    
    return defaultPrefs;
  });

  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);

  const updateSports = (sports: string[]) => {
    setPreferences(prev => ({ ...prev, selectedSports: sports }));
  };

  const updateTeams = (teams: string[]) => {
    setPreferences(prev => ({ ...prev, selectedTeams: teams }));
  };

  const completeOnboarding = () => {
    setPreferences(prev => ({ ...prev, onboardingComplete: true }));
  };

  const toggleSaveArticle = (articleId: string) => {
    setPreferences(prev => ({
      ...prev,
      savedArticles: prev.savedArticles.includes(articleId)
        ? prev.savedArticles.filter(id => id !== articleId)
        : [...prev.savedArticles, articleId]
    }));
  };

  const isArticleSaved = (articleId: string) => {
    return preferences.savedArticles.includes(articleId);
  };

  const toggleHideSport = (sport: string) => {
    setPreferences(prev => ({
      ...prev,
      hiddenSports: prev.hiddenSports.includes(sport)
        ? prev.hiddenSports.filter(s => s !== sport)
        : [...prev.hiddenSports, sport]
    }));
  };

  const toggleHideTeam = (team: string) => {
    setPreferences(prev => ({
      ...prev,
      hiddenTeams: prev.hiddenTeams.includes(team)
        ? prev.hiddenTeams.filter(t => t !== team)
        : [...prev.hiddenTeams, team]
    }));
  };

  const isSportHidden = (sport: string) => {
    return preferences.hiddenSports.includes(sport);
  };

  const isTeamHidden = (team: string) => {
    return preferences.hiddenTeams.includes(team);
  };

  const updateAge = (age: number | null) => {
    setPreferences(prev => ({ ...prev, age }));
  };

  const updateFeedStyle = (style: 'grid' | 'tiktok') => {
    setPreferences(prev => ({ ...prev, feedStyle: style }));
  };

  return (
    <UserContext.Provider value={{
      preferences,
      updateSports,
      updateTeams,
      completeOnboarding,
      toggleSaveArticle,
      isArticleSaved,
      toggleHideSport,
      toggleHideTeam,
      isSportHidden,
      isTeamHidden,
      updateAge,
      updateFeedStyle
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}