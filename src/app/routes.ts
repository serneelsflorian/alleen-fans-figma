import { createBrowserRouter, redirect } from 'react-router';
import { Onboarding } from '@/app/components/Onboarding';
import { Feed } from '@/app/components/Feed';
import { ArticleDetail } from '@/app/components/ArticleDetail';
import { Profile } from '@/app/components/Profile';
import { ProductVision } from '@/app/components/ProductVision';
import { Welcome } from '@/app/components/Welcome';
import { UserStories } from '@/app/components/UserStories';
import { ImageRecognition } from '@/app/components/ImageRecognition';
import { LiveMatchStats } from '@/app/components/LiveMatchStats';
import { Explore } from '@/app/components/Explore';
import { RootLayout } from '@/app/components/RootLayout';
import { PlayerStats } from '@/app/components/PlayerStats';
import { TeamStats } from '@/app/components/TeamStats';
import { TagDetail } from '@/app/components/TagDetail';

// Check if onboarding is complete
function checkOnboarding() {
  const saved = localStorage.getItem('userPreferences');
  if (saved) {
    const prefs = JSON.parse(saved);
    return prefs.onboardingComplete;
  }
  return false;
}

// Check if user has visited before
function checkFirstVisit() {
  return !localStorage.getItem('hasVisited');
}

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: '/',
        loader: () => {
          // First time visitors see welcome screen
          if (checkFirstVisit()) {
            localStorage.setItem('hasVisited', 'true');
            return redirect('/welcome');
          }
          // Return users who haven't onboarded go to onboarding
          if (!checkOnboarding()) {
            return redirect('/onboarding');
          }
          return null;
        },
        Component: Feed,
      },
      {
        path: '/welcome',
        Component: Welcome,
      },
      {
        path: '/onboarding',
        Component: Onboarding,
      },
      {
        path: '/vision',
        Component: ProductVision,
      },
      {
        path: '/article/:id',
        Component: ArticleDetail,
        loader: () => {
          if (!checkOnboarding()) {
            return redirect('/onboarding');
          }
          return null;
        },
      },
      {
        path: '/profile',
        Component: Profile,
        loader: () => {
          if (!checkOnboarding()) {
            return redirect('/onboarding');
          }
          return null;
        },
      },
      {
        path: '/user-stories',
        Component: UserStories,
      },
      {
        path: '/image-recognition',
        Component: ImageRecognition,
      },
      {
        path: '/live-match/:matchId',
        Component: LiveMatchStats,
      },
      {
        path: '/explore',
        Component: Explore,
        loader: () => {
          if (!checkOnboarding()) {
            return redirect('/onboarding');
          }
          return null;
        },
      },
      {
        path: '/player/:id',
        Component: PlayerStats,
      },
      {
        path: '/team/:id',
        Component: TeamStats,
      },
      {
        path: '/tag/:id',
        Component: TagDetail,
      },
    ],
  },
]);