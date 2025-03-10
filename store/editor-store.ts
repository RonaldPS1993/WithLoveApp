import { create } from "zustand"

interface EditorState {
    color: string;
    fontSize: number;
    setColor: (color: string) => void;
    setFontSize: (size: number) => void;
    reset: () => void
}

export const useEditorStore = create<EditorState>((set) => ({
    color: "#000000",
    fontSize: 12,
    setColor: (color) => set({color}),
    setFontSize: (fontSize) => set({fontSize}),
    reset: () => set({color: "#000000", fontSize: 12}),
}));