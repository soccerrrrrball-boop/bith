import { create } from 'zustand'

export const useAppStore = create((set) => ({
  cutProgress: 0,
  isCutting: false,
  cakeCut: false,
  candleLit: [true, true, true, true],
  showMessage: false,
  showShareCard: false,
  musicPlaying: false,
  knifePosition: [0, 0, 0],
  setCutProgress: (progress) => set({ cutProgress: progress }),
  setIsCutting: (isCutting) => set({ isCutting }),
  setCakeCut: (cut) => set({ cakeCut: cut }),
  toggleCandle: (index) => set((state) => {
    const newCandles = [...state.candleLit]
    newCandles[index] = !newCandles[index]
    return { candleLit: newCandles }
  }),
  setShowMessage: (show) => set({ showMessage: show }),
  setShowShareCard: (show) => set({ showShareCard: show }),
  setMusicPlaying: (playing) => set({ musicPlaying: playing }),
  setKnifePosition: (pos) => set({ knifePosition: pos }),
}))

