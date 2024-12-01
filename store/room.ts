import { Track } from '@prisma/client';
import { create } from 'zustand';

type State = {
  tracks: Track[];
  currentPlayingTrack:
    | (Track & {
        _count: { votes: number };
        votes: { votedTrackId: string; voterId: string }[];
      })
    | null;
  nextPlayingTrack:
    | (Track & {
        _count: { votes: number };
        votes: { votedTrackId: string; voterId: string }[];
      })
    | null;
};

type Action = {
  setTracks: (track: State['tracks']) => void;
  setCurrentPlayingTrack: (track: State['currentPlayingTrack']) => void;
  setNextPlayingTrack: (track: State['nextPlayingTrack']) => void;
};

export const useRoomStore = create<State & Action>((set) => ({
  tracks: [],
  currentPlayingTrack: null,
  nextPlayingTrack: null,
  setTracks: (tracks) => set(() => ({ tracks })),
  setCurrentPlayingTrack: (track) =>
    set(() => ({ currentPlayingTrack: track })),
  setNextPlayingTrack: (track) => set(() => ({ nextPlayingTrack: track })),
}));
