import { create } from "zustand";
import {
  applyVoice,
  approveDecision,
  completeTask,
  escalateSign,
  markReport,
  nextBeat,
  rejectDecision,
  releasePiece,
  remindStaff,
  saveDirection,
  setCeiling,
  steerPiece,
} from "./engine";
import { tehranNowLabel } from "./format";
import { freshData } from "./seed";
import type { Data, Role } from "./types";

const KEY = "tata-desk-v1";

type State = {
  data: Data;
  role: Role;
  hydrated: boolean;
  hydrate: () => void;
  setRole: (role: Role) => void;
  approve: (id: string) => void;
  reject: (id: string, reason: string) => void;
  beat: () => string;
  voice: (text: string) => string;
  setCeiling: (n: number) => void;
  completeTask: (id: string) => void;
  remind: (id: string) => void;
  saveDirection: (text: string) => void;
  steer: (id: string) => void;
  release: (id: string) => void;
  escalateSign: () => void;
  markReport: () => void;
  reset: () => void;
};

function valid(data: Data | undefined): data is Data {
  return Boolean(
    data &&
      Array.isArray(data.decisions) &&
      Array.isArray(data.agents) &&
      Array.isArray(data.programs) &&
      data.flags &&
      typeof data.ceiling === "number",
  );
}

export const useTata = create<State>((set) => ({
  data: freshData(),
  role: "hamzeh",
  hydrated: false,
  hydrate: () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) {
        set({ hydrated: true });
        return;
      }
      const parsed = JSON.parse(raw) as { data?: Data; role?: Role };
      if (!valid(parsed.data)) {
        set({ hydrated: true });
        return;
      }
      set({
        data: parsed.data,
        role: parsed.role === "content" ? "content" : "hamzeh",
        hydrated: true,
      });
    } catch {
      set({ hydrated: true });
    }
  },
  setRole: (role) => set({ role }),
  approve: (id) => set((s) => ({ data: approveDecision(s.data, id, tehranNowLabel()) })),
  reject: (id, reason) => set((s) => ({ data: rejectDecision(s.data, id, reason, tehranNowLabel()) })),
  beat: () => {
    let message = "";
    set((s) => {
      const result = nextBeat(s.data, tehranNowLabel());
      message = result.message;
      return { data: result.data };
    });
    return message;
  },
  voice: (text) => {
    let message = "";
    set((s) => {
      const result = applyVoice(s.data, text, tehranNowLabel());
      message = result.message;
      return { data: result.data };
    });
    return message;
  },
  setCeiling: (n) => set((s) => ({ data: setCeiling(s.data, n, tehranNowLabel()) })),
  completeTask: (id) => set((s) => ({ data: completeTask(s.data, id, tehranNowLabel()) })),
  remind: (id) => set((s) => ({ data: remindStaff(s.data, id, tehranNowLabel()) })),
  saveDirection: (text) => set((s) => ({ data: saveDirection(s.data, text, tehranNowLabel()) })),
  steer: (id) => set((s) => ({ data: steerPiece(s.data, id, tehranNowLabel()) })),
  release: (id) => set((s) => ({ data: releasePiece(s.data, id, tehranNowLabel()) })),
  escalateSign: () => set((s) => ({ data: escalateSign(s.data, tehranNowLabel()) })),
  markReport: () => set((s) => ({ data: markReport(s.data, tehranNowLabel()) })),
  reset: () => set({ data: freshData(), role: "hamzeh" }),
}));

if (typeof window !== "undefined") {
  useTata.subscribe((state, prev) => {
    if (!state.hydrated) return;
    if (prev.hydrated && prev.data === state.data && prev.role === state.role) return;
    localStorage.setItem(KEY, JSON.stringify({ data: state.data, role: state.role }));
  });
}
