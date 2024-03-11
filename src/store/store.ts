import { create } from "zustand";

export type TagType = {
  name: string;
  category: string;
  value: string;
  id: string;
};

interface State {
  tags: TagType[];
  addTag: (tag: TagType) => void;
  removeTag: (index: number) => void;
}

const useStore = create<State>((set) => ({
  tags: [],
  addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
  removeTag: (index) =>
    set((state) => ({ tags: state.tags.filter((_, i) => i !== index) })),
}));

export default useStore;
