import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { ref, onValue, set, update, push } from 'firebase/database';
import { auth, googleProvider, db } from './firebase';

const AppContext = createContext(null);

export function useApp() {
    return useContext(AppContext);
}

const DEFAULT_GAME_STATE = {
    players: ['Player 1', 'Player 2', 'Player 3', 'Player 4'],
    draft: {
        started: false,
        completed: false,
        currentPick: 0,
        picks: {}, // { castawayId: playerIndex }
    },
    bingo: {
        cards: {}, // { playerIndex: { seed, marks: [] } }
    },
    scores: {
        events: [], // { castawayId, event, points, episode }
    },
    eliminated: [], // castawayIds
};

export function AppProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [gameState, setGameState] = useState(DEFAULT_GAME_STATE);
    const [gameId, setGameId] = useState(null);
    const [syncStatus, setSyncStatus] = useState('offline'); // 'online', 'syncing', 'offline'

    // Auth listener
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setAuthLoading(false);
        });
        return unsub;
    }, []);

    // Realtime DB sync — when user is logged in
    useEffect(() => {
        if (!user || !gameId) return;
        setSyncStatus('syncing');
        const gameRef = ref(db, `games/${gameId}`);
        const unsub = onValue(gameRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setGameState(data);
            }
            setSyncStatus('online');
        }, (error) => {
            console.error('DB sync error:', error);
            setSyncStatus('offline');
        });
        return () => unsub();
    }, [user, gameId]);

    // Save game state to Firebase
    const saveGame = async (newState) => {
        setGameState(newState);
        if (gameId && user) {
            setSyncStatus('syncing');
            try {
                await set(ref(db, `games/${gameId}`), newState);
                setSyncStatus('online');
            } catch (err) {
                console.error('Save error:', err);
                setSyncStatus('offline');
            }
        }
    };

    // Create a new game
    const createGame = async (playerNames) => {
        const state = { ...DEFAULT_GAME_STATE, players: playerNames };
        if (user) {
            const gamesRef = ref(db, 'games');
            const newRef = push(gamesRef);
            const id = newRef.key;
            await set(newRef, state);
            setGameId(id);
            // Store game ID for this user
            await set(ref(db, `users/${user.uid}/games/${id}`), { created: Date.now() });
            return id;
        } else {
            setGameState(state);
            setGameId('local');
            return 'local';
        }
    };

    // Join existing game
    const joinGame = (id) => {
        setGameId(id);
    };

    // Auth functions
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
    const logout = () => signOut(auth);

    const value = {
        user,
        authLoading,
        gameState,
        gameId,
        syncStatus,
        saveGame,
        createGame,
        joinGame,
        login,
        register,
        loginWithGoogle,
        logout,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
