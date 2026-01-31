// Mock data for the sports media platform

export interface Sport {
  id: string;
  name: string;
  icon: string;
  imageUrl: string;
  color: string;
}

export interface Team {
  id: string;
  name: string;
  sport: string;
  logo: string;
  imageUrl: string;
  color: string;
}

export interface Player {
  id: string;
  name: string;
  sport: string;
  team?: string;
  imageUrl?: string;
  position?: string;
  jerseyNumber?: number;
  stats?: {
    gamesPlayed: number;
    pointsPerGame?: number;
    assistsPerGame?: number;
    reboundsPerGame?: number;
    passingYards?: number;
    touchdowns?: number;
    goals?: number;
    acesPerMatch?: number;
    [key: string]: number | undefined;
  };
  bio?: string;
}

export interface TeamStats {
  id: string;
  name: string;
  sport: string;
  wins: number;
  losses: number;
  standing: number;
  imageUrl: string;
  recentForm: string[]; // ['W', 'L', 'W', 'W', 'L']
  stats: {
    [key: string]: string | number;
  };
}

export interface SportTerminology {
  id: string;
  term: string;
  sport: string;
  definition: string;
  example?: string;
}

export interface Competition {
  id: string;
  name: string;
  sport: string;
  type: 'league' | 'tournament' | 'championship';
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  source: string;
  author: string;
  publishedAt: string;
  readTime: number;
  sport: string;
  teams: string[];
  tags: string[];
  trending: boolean;
  saved: boolean;
  aiInsights?: {
    summary?: string;
    keyStats?: Array<{ label: string; value: string }>;
    playerInfo?: Array<{ name: string; team: string; stats: string }>;
    timeline?: Array<{ time: string; event: string }>;
    comparison?: { team1: string; team2: string; stats: Array<{ label: string; value1: string; value2: string }> };
  };
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  brand: string;
  category: string;
}

export interface LiveMatch {
  id: string;
  sport: string;
  team1: {
    id: string;
    name: string;
    logo: string;
    score: number;
  };
  team2: {
    id: string;
    name: string;
    logo: string;
    score: number;
  };
  status: string; // e.g., "2nd Quarter", "3rd Set", "45' 1st Half"
  time: string; // e.g., "12:45", "LIVE"
  isLive: boolean;
  startedAt: string;
}

export const sports: Sport[] = [
  { id: 'basketball', name: 'Basketball', icon: '🏀', imageUrl: 'https://images.unsplash.com/photo-1762860799648-0a957a2e51a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#FF6B35' },
  { id: 'football', name: 'Football', icon: '🏈', imageUrl: 'https://images.unsplash.com/photo-1706092647576-8c4ce0229954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#4A5568' },
  { id: 'soccer', name: 'Soccer', icon: '⚽', imageUrl: 'https://images.unsplash.com/photo-1698844013403-b7c4cf0d3b2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#48BB78' },
  { id: 'baseball', name: 'Baseball', icon: '⚾', imageUrl: 'https://images.unsplash.com/photo-1650124077853-b6fcb0231cc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#ED8936' },
  { id: 'hockey', name: 'Hockey', icon: '🏒', imageUrl: 'https://images.unsplash.com/photo-1768483070177-78303f00c726?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#4299E1' },
  { id: 'tennis', name: 'Tennis', icon: '🎾', imageUrl: 'https://images.unsplash.com/photo-1728723557302-00da31aef888?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#9F7AEA' },
  { id: 'golf', name: 'Golf', icon: '⛳', imageUrl: 'https://images.unsplash.com/photo-1768396747921-5a18367415d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#38B2AC' },
  { id: 'mma', name: 'MMA/Boxing', icon: '🥊', imageUrl: 'https://images.unsplash.com/photo-1681203888755-bd61fe3558eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#F56565' },
];

export const teams: Team[] = [
  { id: 'lakers', name: 'Lakers', sport: 'basketball', logo: '🟣', imageUrl: 'https://images.unsplash.com/photo-1550171362-62bca9e5ad4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#552583' },
  { id: 'warriors', name: 'Warriors', sport: 'basketball', logo: '🔵', imageUrl: 'https://images.unsplash.com/photo-1611729801920-9de93172486f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#006BB6' },
  { id: 'chiefs', name: 'Chiefs', sport: 'football', logo: '🔴', imageUrl: 'https://images.unsplash.com/photo-1561393930-8c83ca7d2060?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#FF3C00' },
  { id: '49ers', name: '49ers', sport: 'football', logo: '🟡', imageUrl: 'https://images.unsplash.com/photo-1728188498233-da994f8cb53a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#FFC107' },
  { id: 'real-madrid', name: 'Real Madrid', sport: 'soccer', logo: '⚪', imageUrl: 'https://images.unsplash.com/photo-1604331546936-ba127df7370e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#000000' },
  { id: 'barcelona', name: 'Barcelona', sport: 'soccer', logo: '🔵', imageUrl: 'https://images.unsplash.com/photo-1656357386325-3faecf2438cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#A50044' },
];

export const players: Player[] = [
  { id: 'lebron-james', name: 'LeBron James', sport: 'basketball', team: 'lakers', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', position: 'Small Forward', jerseyNumber: 23, stats: { gamesPlayed: 50, pointsPerGame: 27.5, assistsPerGame: 7.5, reboundsPerGame: 7.5 } },
  { id: 'anthony-davis', name: 'Anthony Davis', sport: 'basketball', team: 'lakers', imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400', position: 'Power Forward', jerseyNumber: 3, stats: { gamesPlayed: 50, pointsPerGame: 25.5, reboundsPerGame: 10.5 } },
  { id: 'stephen-curry', name: 'Stephen Curry', sport: 'basketball', team: 'warriors', imageUrl: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400', position: 'Point Guard', jerseyNumber: 30, stats: { gamesPlayed: 50, pointsPerGame: 28.5, assistsPerGame: 6.5, threePointersPerGame: 4.5 } },
  { id: 'klay-thompson', name: 'Klay Thompson', sport: 'basketball', team: 'warriors', imageUrl: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400', position: 'Shooting Guard', jerseyNumber: 11, stats: { gamesPlayed: 50, pointsPerGame: 20.5, threePointersPerGame: 3.5 } },
  { id: 'patrick-mahomes', name: 'Patrick Mahomes', sport: 'football', team: 'chiefs', imageUrl: 'https://images.unsplash.com/photo-1546563367-4893bfd46f6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2NrZXklMjBpY2UlMjBzcG9ydHxlbnwxfHx8fDE3Njk3OTk1NjV8MA&ixlib=rb-4.1.0&q=80&w=1080', position: 'Quarterback', jerseyNumber: 15, stats: { gamesPlayed: 50, passingYards: 4000, touchdowns: 30 } },
  { id: 'brock-purdy', name: 'Brock Purdy', sport: 'football', team: '49ers', imageUrl: 'https://images.unsplash.com/photo-1546563367-4893bfd46f6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2NrZXklMjBpY2UlMjBzcG9ydHxlbnwxfHx8fDE3Njk3OTk1NjV8MA&ixlib=rb-4.1.0&q=80&w=1080', position: 'Quarterback', jerseyNumber: 10, stats: { gamesPlayed: 50, passingYards: 3500, touchdowns: 25 } },
  { id: 'robert-lewandowski', name: 'Robert Lewandowski', sport: 'soccer', team: 'barcelona', imageUrl: 'https://images.unsplash.com/photo-1568495019994-e9f1045bf0ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmb290YmFsbCUyMG1hdGNofGVufDF8fHx8MTc2OTczODg4M3ww&ixlib=rb-4.1.0&q=80&w=1080', position: 'Striker', jerseyNumber: 9, stats: { gamesPlayed: 50, goals: 35 } },
  { id: 'vinicius-junior', name: 'Vinícius Júnior', sport: 'soccer', team: 'real-madrid', imageUrl: 'https://images.unsplash.com/photo-1568495019994-e9f1045bf0ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmb290YmFsbCUyMG1hdGNofGVufDF8fHx8MTc2OTczODg4M3ww&ixlib=rb-4.1.0&q=80&w=1080', position: 'Winger', jerseyNumber: 20, stats: { gamesPlayed: 50, goals: 15, assists: 10 } },
  { id: 'jude-bellingham', name: 'Jude Bellingham', sport: 'soccer', team: 'real-madrid', imageUrl: 'https://images.unsplash.com/photo-1568495019994-e9f1045bf0ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmb290YmFsbCUyMG1hdGNofGVufDF8fHx8MTc2OTczODg4M3ww&ixlib=rb-4.1.0&q=80&w=1080', position: 'Midfielder', jerseyNumber: 22, stats: { gamesPlayed: 50, assists: 12 } },
  { id: 'serena-williams', name: 'Serena Williams', sport: 'tennis', imageUrl: 'https://images.unsplash.com/photo-1512227847796-ddde7e3979c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBwbGF5ZXIlMjBjb21wZXRpdGlvbnxlbnwxfHx8fDE3Njk3Nzg0NDd8MA&ixlib=rb-4.1.0&q=80&w=1080', position: 'Right Handed', stats: { gamesPlayed: 50, acesPerMatch: 5, pointsPerGame: 65 } },
  { id: 'maria-sakkari', name: 'Maria Sakkari', sport: 'tennis', imageUrl: 'https://images.unsplash.com/photo-1512227847796-ddde7e3979c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBwbGF5ZXIlMjBjb21wZXRpdGlvbnxlbnwxfHx8fDE3Njk3Nzg0NDd8MA&ixlib=rb-4.1.0&q=80&w=1080', position: 'Right Handed', stats: { gamesPlayed: 50, acesPerMatch: 4, pointsPerGame: 60 } },
  { id: 'connor-mcdavid', name: 'Connor McDavid', sport: 'hockey', team: 'oilers', imageUrl: 'https://images.unsplash.com/photo-1546563367-4893bfd46f6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2NrZXklMjBpY2UlMjBzcG9ydHxlbnwxfHx8fDE3Njk3OTk1NjV8MA&ixlib=rb-4.1.0&q=80&w=1080', position: 'Center', jerseyNumber: 97, stats: { gamesPlayed: 50, pointsPerGame: 100, assistsPerGame: 80 } },
  { id: 'auston-matthews', name: 'Auston Matthews', sport: 'hockey', team: 'leafs', imageUrl: 'https://images.unsplash.com/photo-1546563367-4893bfd46f6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2NrZXklMjBpY2UlMjBzcG9ydHxlbnwxfHx8fDE3Njk3OTk1NjV8MA&ixlib=rb-4.1.0&q=80&w=1080', position: 'Winger', jerseyNumber: 21, stats: { gamesPlayed: 50, pointsPerGame: 90, assistsPerGame: 70 } },
];

export const teamStats: TeamStats[] = [
  { id: 'lakers', name: 'Lakers', sport: 'basketball', wins: 28, losses: 15, standing: 1, imageUrl: 'https://images.unsplash.com/photo-1550171362-62bca9e5ad4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', recentForm: ['W', 'L', 'W', 'W', 'L'], stats: { pointsPerGame: 115, reboundsPerGame: 48, assistsPerGame: 27 } },
  { id: 'warriors', name: 'Warriors', sport: 'basketball', wins: 25, losses: 18, standing: 2, imageUrl: 'https://images.unsplash.com/photo-1611729801920-9de93172486f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', recentForm: ['W', 'W', 'L', 'W', 'L'], stats: { pointsPerGame: 110, reboundsPerGame: 45, assistsPerGame: 31 } },
  { id: 'chiefs', name: 'Chiefs', sport: 'football', wins: 11, losses: 2, standing: 1, imageUrl: 'https://images.unsplash.com/photo-1561393930-8c83ca7d2060?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', recentForm: ['W', 'W', 'W', 'W', 'L'], stats: { pointsPerGame: 30, passingYardsPerGame: 350, touchdownsPerGame: 2.5 } },
  { id: '49ers', name: '49ers', sport: 'football', wins: 8, losses: 5, standing: 3, imageUrl: 'https://images.unsplash.com/photo-1728188498233-da994f8cb53a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', recentForm: ['W', 'L', 'W', 'L', 'W'], stats: { pointsPerGame: 28, passingYardsPerGame: 300, touchdownsPerGame: 2 } },
  { id: 'real-madrid', name: 'Real Madrid', sport: 'soccer', wins: 15, losses: 2, standing: 1, imageUrl: 'https://images.unsplash.com/photo-1604331546936-ba127df7370e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', recentForm: ['W', 'W', 'W', 'W', 'L'], stats: { goalsPerGame: 2.5, assistsPerGame: 1.5 } },
  { id: 'barcelona', name: 'Barcelona', sport: 'soccer', wins: 14, losses: 3, standing: 2, imageUrl: 'https://images.unsplash.com/photo-1656357386325-3faecf2438cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', recentForm: ['W', 'L', 'W', 'W', 'L'], stats: { goalsPerGame: 2.2, assistsPerGame: 1.8 } },
];

export const sportTerminology: SportTerminology[] = [
  { id: '1', term: 'Three-Pointer', sport: 'basketball', definition: 'A field goal made from beyond the three-point arc, worth three points.', example: 'LeBron James made a three-pointer in the final seconds to win the game.' },
  { id: '2', term: 'Touchdown', sport: 'football', definition: 'A score in American football when a player carries the ball into the end zone.', example: 'Patrick Mahomes threw a touchdown pass to Travis Kelce.' },
  { id: '3', term: 'Goal', sport: 'soccer', definition: 'A score in soccer when a player kicks the ball into the opponent\'s net.', example: 'Vinícius Júnior scored a goal in the 88th minute to equalize the match.' },
  { id: '4', term: 'Home Run', sport: 'baseball', definition: 'A hit in baseball that allows the batter to circle the bases and score a run without being put out.', example: 'Marcus Strider hit a home run in the 5th inning to give the Yankees a lead.' },
  { id: '5', term: 'Hat Trick', sport: 'hockey', definition: 'A score in hockey when a player scores three goals in a single game.', example: 'Connor McDavid scored a hat trick in the 3rd period to secure the win.' },
  { id: '6', term: 'Ace', sport: 'tennis', definition: 'A serve in tennis that is not touched by the opponent and results in a point.', example: 'Serena Williams served an ace to win the game.' },
  { id: '7', term: 'Birdie', sport: 'golf', definition: 'A score in golf when a player completes a hole in one stroke under par.', example: 'Tiger Woods hit a birdie on the 18th hole to win the tournament.' },
  { id: '8', term: 'Knockout', sport: 'mma', definition: 'A fight in MMA that ends when one fighter is knocked out or submits.', example: 'Conor McGregor knocked out Nate Diaz in the 3rd round to win the title.' },
];

export const competitions: Competition[] = [
  { id: 'nba', name: 'NBA', sport: 'basketball', type: 'league' },
  { id: 'nfl', name: 'NFL', sport: 'football', type: 'league' },
  { id: 'la-liga', name: 'La Liga', sport: 'soccer', type: 'league' },
  { id: 'mlb', name: 'MLB', sport: 'baseball', type: 'league' },
  { id: 'nhl', name: 'NHL', sport: 'hockey', type: 'league' },
  { id: 'atp', name: 'ATP', sport: 'tennis', type: 'league' },
  { id: 'wta', name: 'WTA', sport: 'tennis', type: 'league' },
  { id: 'super-bowl', name: 'Super Bowl', sport: 'football', type: 'championship' },
  { id: 'world-series', name: 'World Series', sport: 'baseball', type: 'championship' },
  { id: 'stanley-cup', name: 'Stanley Cup', sport: 'hockey', type: 'championship' },
  { id: 'australian-open', name: 'Australian Open', sport: 'tennis', type: 'championship' },
  { id: 'fifa-world-cup', name: 'FIFA World Cup', sport: 'soccer', type: 'championship' },
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'Lakers Secure Dramatic Victory in Overtime Thriller Against Warriors',
    excerpt: 'LeBron James scores 45 points as Lakers edge Warriors 128-125 in overtime classic at Crypto.com Arena.',
    content: `In what can only be described as an instant classic, the Los Angeles Lakers defeated the Golden State Warriors 128-125 in a thrilling overtime battle that had fans on the edge of their seats until the final buzzer.

LeBron James turned back the clock with a masterful 45-point performance, adding 12 rebounds and 8 assists in 42 minutes of action. The 39-year-old superstar showed no signs of slowing down, particularly in the overtime period where he scored 8 of the Lakers' 13 points.

Anthony Davis contributed 28 points and 15 rebounds, providing the perfect complement to James' offensive explosion. The Lakers duo combined for 73 points, showcasing the formidable one-two punch that has defined their partnership.

For the Warriors, Stephen Curry matched LeBron's intensity with 42 points of his own, including 8 three-pointers. Klay Thompson added 24 points, but it wasn't enough to overcome the Lakers' late-game execution.

The game featured 15 lead changes and was tied 12 times, with neither team leading by more than 7 points at any point. The tension was palpable as regulation ended at 115-115, sending the game to overtime.

In the extra period, LeBron took over, hitting a crucial three-pointer with 1:24 remaining to give the Lakers a 123-120 lead. After Curry answered with a layup, LeBron drew a foul and calmly sank both free throws to extend the lead to 125-122.

The Warriors had one final chance with 8.5 seconds left, but Curry's contested three-pointer bounced off the rim, sealing the victory for the Lakers.

Lakers head coach Darvin Ham praised his team's resilience: "This is what championship basketball looks like. When the pressure is highest, our guys stepped up and made winning plays."

The victory improves the Lakers' record to 28-15, keeping them in strong position in the Western Conference playoff race.`,
    imageUrl: 'https://images.unsplash.com/photo-1762025930827-9f1dda45aff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwcGxheWVyJTIwYWN0aW9ufGVufDF8fHx8MTc2OTc1MTUwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    source: 'ESPN',
    author: 'Adrian Wojnarowski',
    publishedAt: '2026-01-30T03:45:00Z',
    readTime: 4,
    sport: 'basketball',
    teams: ['lakers', 'warriors'],
    tags: ['NBA', 'Playoffs', 'LeBron James'],
    trending: true,
    saved: false,
    aiInsights: {
      summary: 'Lakers defeat Warriors 128-125 in OT. LeBron James scored 45 points with 12 rebounds and 8 assists. Stephen Curry led Warriors with 42 points. Game featured 15 lead changes.',
      keyStats: [
        { label: 'LeBron Points', value: '45' },
        { label: 'Curry Points', value: '42' },
        { label: 'Lead Changes', value: '15' },
        { label: 'Three-Pointers', value: '8' }
      ],
      playerInfo: [
        { name: 'LeBron James', team: 'Lakers', stats: '45 PTS, 12 REB, 8 AST' },
        { name: 'Anthony Davis', team: 'Lakers', stats: '28 PTS, 15 REB' },
        { name: 'Stephen Curry', team: 'Warriors', stats: '42 PTS, 8 3PM' },
        { name: 'Klay Thompson', team: 'Warriors', stats: '24 PTS' }
      ],
      comparison: {
        team1: 'Lakers',
        team2: 'Warriors',
        stats: [
          { label: 'Field Goal %', value1: '48.2%', value2: '46.7%' },
          { label: '3-Point %', value1: '38.5%', value2: '41.2%' },
          { label: 'Rebounds', value1: '48', value2: '42' },
          { label: 'Assists', value1: '27', value2: '31' }
        ]
      }
    }
  },
  {
    id: '2',
    title: 'Real Madrid Stuns Barcelona with Last-Minute Goal in El Clásico',
    excerpt: 'Jude Bellingham scores in the 93rd minute to give Real Madrid a 2-1 victory over Barcelona in thrilling El Clásico encounter.',
    content: `In one of the most dramatic El Clásico matches in recent memory, Real Madrid snatched victory from the jaws of defeat with a stunning 93rd-minute winner from Jude Bellingham to beat Barcelona 2-1 at the Santiago Bernabéu.

The match looked destined for a Barcelona victory after Robert Lewandowski's 75th-minute goal gave the visitors a 1-0 lead. However, Real Madrid had other plans.

Vinícius Júnior equalized in the 88th minute with a brilliant individual effort, cutting in from the left wing and curling a shot into the far corner past Marc-André ter Stegen. The goal sent the Bernabéu into raptures and set the stage for an incredible finale.

Just when it seemed the match would end in a draw, Bellingham rose highest to meet a Luka Modrić corner kick, powering a header past ter Stegen to complete the comeback. The young English midfielder wheeled away in celebration as the stadium erupted.

Real Madrid manager Carlo Ancelotti was full of praise for his team: "This is the mentality of champions. We never gave up, even when things looked difficult. The players showed incredible character."

Barcelona coach Xavi Hernández was left frustrated: "We controlled the game for 85 minutes. To lose like this is very painful, but this is football."

The victory keeps Real Madrid at the top of La Liga, three points clear of Barcelona with 15 matches remaining.`,
    imageUrl: 'https://images.unsplash.com/photo-1568495019994-e9f1045bf0ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmb290YmFsbCUyMG1hdGNofGVufDF8fHx8MTc2OTczODg4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    source: 'BBC Sport',
    author: 'Guillem Balagué',
    publishedAt: '2026-01-29T21:30:00Z',
    readTime: 3,
    sport: 'soccer',
    teams: ['real-madrid', 'barcelona'],
    tags: ['La Liga', 'El Clásico', 'Champions'],
    trending: true,
    saved: false,
    aiInsights: {
      summary: 'Real Madrid beat Barcelona 2-1 with a 93rd-minute winner from Jude Bellingham. Barcelona led 1-0 until the 88th minute when Vinícius equalized.',
      keyStats: [
        { label: 'Possession', value: '45% RM vs 55% BAR' },
        { label: 'Shots on Target', value: '6 vs 8' },
        { label: 'Winning Goal Time', value: "93'" },
      ],
      timeline: [
        { time: "75'", event: 'Lewandowski scores for Barcelona (0-1)' },
        { time: "88'", event: 'Vinícius equalizes for Real Madrid (1-1)' },
        { time: "93'", event: 'Bellingham scores winning header (2-1)' }
      ]
    }
  },
  {
    id: '3',
    title: 'Chiefs Edge 49ers in Super Bowl Rematch Thriller',
    excerpt: 'Patrick Mahomes throws for 342 yards and 3 touchdowns as Kansas City defeats San Francisco 31-28.',
    content: `The Kansas City Chiefs defeated the San Francisco 49ers 31-28 in a thrilling rematch of their Super Bowl encounter, with Patrick Mahomes once again proving why he's considered the best quarterback in the NFL.

Mahomes threw for 342 yards and 3 touchdowns, including the game-winning 15-yard strike to Travis Kelce with just 1:13 remaining on the clock. The victory improves Kansas City's record to 11-2 and strengthens their position as the top seed in the AFC.

"This is what we live for," Mahomes said after the game. "Playing against great teams like San Francisco and finding a way to win. Our offense executed when it mattered most."

The 49ers fought valiantly, with Brock Purdy throwing for 289 yards and 2 touchdowns. Christian McCaffrey added 124 yards from scrimmage and a touchdown, but it wasn't enough to overcome Mahomes' late-game heroics.

The game featured several momentum swings, with the lead changing hands four times in the fourth quarter alone. Chiefs head coach Andy Reid called it "one of the most exciting games I've been a part of."

This victory adds another chapter to the growing rivalry between these two teams and sets up a potential playoff rematch down the road.`,
    imageUrl: 'https://images.unsplash.com/photo-1757587986665-f51004989a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWVyaWNhbiUyMGZvb3RiYWxsJTIwZ2FtZXxlbnwxfHx8fDE3Njk3NDgzNDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    source: 'NFL Network',
    author: 'Ian Rapoport',
    publishedAt: '2026-01-29T19:15:00Z',
    readTime: 3,
    sport: 'football',
    teams: ['chiefs', '49ers'],
    tags: ['NFL', 'Super Bowl Rematch', 'Mahomes'],
    trending: true,
    saved: false,
  },
  {
    id: '4',
    title: 'Serena Williams Returns: Wins First Match in Comeback Tour',
    excerpt: 'Tennis legend defeats world No. 15 in straight sets at Australian Open warm-up event.',
    content: `Tennis icon Serena Williams made a triumphant return to professional tennis, defeating world No. 15 Maria Sakkari 6-4, 7-5 in her first competitive match since announcing her comeback.

The 42-year-old showed flashes of the brilliance that earned her 23 Grand Slam titles, serving 8 aces and winning 82% of her first-serve points. The sold-out crowd at Rod Laver Arena gave her multiple standing ovations throughout the match.

"It feels amazing to be back," Williams said in her post-match interview. "I've worked incredibly hard to get to this point, and to win my first match back means everything to me."

Williams' return has generated massive excitement in the tennis world, with many wondering if she can add to her Grand Slam tally. Her next match is scheduled for Friday against qualifier Donna Vekić.

Tennis legend Billie Jean King tweeted: "What a performance! Serena proving once again why she's the greatest. Welcome back, champion!"`,
    imageUrl: 'https://images.unsplash.com/photo-1512227847796-ddde7e3979c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBwbGF5ZXIlMjBjb21wZXRpdGlvbnxlbnwxfHx8fDE3Njk3Nzg0NDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    source: 'Tennis Channel',
    author: 'Chris McKendry',
    publishedAt: '2026-01-29T12:00:00Z',
    readTime: 2,
    sport: 'tennis',
    teams: [],
    tags: ['Tennis', 'Grand Slam', 'Comeback'],
    trending: false,
    saved: true,
  },
  {
    id: '5',
    title: 'Yankees Sign All-Star Pitcher to Record-Breaking Contract',
    excerpt: 'New York Yankees agree to 8-year, $324 million deal with Cy Young winner in biggest pitching contract ever.',
    content: `The New York Yankees have made the biggest splash of the MLB offseason, signing reigning Cy Young Award winner Marcus Strider to an 8-year, $324 million contract, the largest pitching deal in baseball history.

The 26-year-old right-hander was 18-5 with a 2.67 ERA last season, striking out 281 batters in 201 innings. His addition gives the Yankees one of the most formidable starting rotations in baseball.

"This is a historic day for the New York Yankees," said team owner Hal Steinbrenner. "Marcus is not only an elite pitcher but also a leader and a winner. We believe this move positions us to compete for championships for years to come."

Strider expressed his excitement about joining the storied franchise: "Growing up, I always dreamed of wearing the pinstripes. To have this opportunity is surreal. I can't wait to help bring another championship to New York."

Baseball analysts are calling the deal a "game-changer" for the Yankees, who haven't won a World Series since 2009. With Strider anchoring the rotation, expectations are sky-high in the Bronx.`,
    imageUrl: 'https://images.unsplash.com/photo-1650124077853-b6fcb0231cc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNlYmFsbCUyMHN0YWRpdW0lMjBnYW1lfGVufDF8fHx8MTc2OTc5OTM3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    source: 'MLB.com',
    author: 'Jeff Passan',
    publishedAt: '2026-01-28T16:45:00Z',
    readTime: 3,
    sport: 'baseball',
    teams: [],
    tags: ['MLB', 'Transfers', 'Yankees'],
    trending: false,
    saved: false,
  },
  {
    id: '6',
    title: 'NHL All-Star Weekend: McDavid Wins MVP in Record-Setting Performance',
    excerpt: 'Edmonton captain scores 6 goals in skills competition and All-Star Game combined.',
    content: `Connor McDavid put on an absolute clinic at NHL All-Star Weekend, earning MVP honors after a record-setting performance that left fans and fellow players in awe.

The Edmonton Oilers captain scored 4 goals in the All-Star Game and won three skills competition events, including the fastest skater competition for the fourth consecutive year with a blistering time of 13.02 seconds.

"Connor is on a different level," said fellow All-Star Auston Matthews. "What he can do with the puck at that speed is something I've never seen before."

McDavid's Metropolitan Division team won the 3-on-3 tournament, defeating the Pacific Division 6-4 in the final. His 4 goals in the championship game tied the all-time All-Star Game record.

"This weekend is always so much fun," McDavid said. "Getting to showcase the game alongside the best players in the world is an honor. The fans here were incredible."

The NHL All-Star Weekend drew record attendance and television viewership, highlighting the growing popularity of hockey in North America.`,
    imageUrl: 'https://images.unsplash.com/photo-1546563367-4893bfd46f6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2NrZXklMjBpY2UlMjBzcG9ydHxlbnwxfHx8fDE3Njk3OTk1NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    source: 'The Athletic',
    author: 'Pierre LeBrun',
    publishedAt: '2026-01-28T02:30:00Z',
    readTime: 2,
    sport: 'hockey',
    teams: [],
    tags: ['NHL', 'All-Star', 'McDavid'],
    trending: false,
    saved: false,
  },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Nike LeBron 21 Basketball Shoes',
    price: 179.99,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    brand: 'Nike',
    category: 'Footwear'
  },
  {
    id: 'p2',
    name: 'Wilson Evolution Basketball',
    price: 64.99,
    imageUrl: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400',
    brand: 'Wilson',
    category: 'Equipment'
  },
  {
    id: 'p3',
    name: 'Lakers City Edition Jersey',
    price: 119.99,
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
    brand: 'Nike',
    category: 'Apparel'
  },
];

export const liveMatches: LiveMatch[] = [
  {
    id: 'lm1',
    sport: 'basketball',
    team1: {
      id: 'lakers',
      name: 'Lakers',
      logo: '🟣',
      score: 102
    },
    team2: {
      id: 'warriors',
      name: 'Warriors',
      logo: '🔵',
      score: 98
    },
    status: '2nd Quarter',
    time: '12:45',
    isLive: true,
    startedAt: '2026-01-30T03:45:00Z'
  },
  {
    id: 'lm2',
    sport: 'soccer',
    team1: {
      id: 'real-madrid',
      name: 'Real Madrid',
      logo: '⚪',
      score: 1
    },
    team2: {
      id: 'barcelona',
      name: 'Barcelona',
      logo: '🔵',
      score: 0
    },
    status: '3rd Set',
    time: 'LIVE',
    isLive: true,
    startedAt: '2026-01-29T21:30:00Z'
  },
  {
    id: 'lm3',
    sport: 'football',
    team1: {
      id: 'chiefs',
      name: 'Chiefs',
      logo: '🔴',
      score: 21
    },
    team2: {
      id: '49ers',
      name: '49ers',
      logo: '🟡',
      score: 17
    },
    status: '45\' 1st Half',
    time: '10:00',
    isLive: true,
    startedAt: '2026-01-29T19:15:00Z'
  },
  {
    id: 'lm4',
    sport: 'tennis',
    team1: {
      id: 'serena-williams',
      name: 'Serena Williams',
      logo: '👩‍🎾',
      score: 6
    },
    team2: {
      id: 'maria-sakkari',
      name: 'Maria Sakkari',
      logo: '👩‍🎾',
      score: 4
    },
    status: '2nd Set',
    time: 'LIVE',
    isLive: true,
    startedAt: '2026-01-29T12:00:00Z'
  },
  {
    id: 'lm5',
    sport: 'baseball',
    team1: {
      id: 'yankees',
      name: 'Yankees',
      logo: ' Yankees Logo',
      score: 5
    },
    team2: {
      id: 'red-sox',
      name: 'Red Sox',
      logo: 'Red Sox Logo',
      score: 3
    },
    status: '5th Inning',
    time: '14:30',
    isLive: true,
    startedAt: '2026-01-28T16:45:00Z'
  },
  {
    id: 'lm6',
    sport: 'hockey',
    team1: {
      id: 'oilers',
      name: 'Oilers',
      logo: ' Oilers Logo',
      score: 3
    },
    team2: {
      id: 'leafs',
      name: 'Leafs',
      logo: 'Leafs Logo',
      score: 2
    },
    status: '3rd Period',
    time: 'LIVE',
    isLive: true,
    startedAt: '2026-01-28T02:30:00Z'
  },
];