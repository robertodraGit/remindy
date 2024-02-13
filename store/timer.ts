import {create} from "zustand";

type Timer = {
    id: number;
    setupDate: Date;
    targetDate: Date;
    title: string;
    description: string;
    priority: 1 | 2 | 3;
    alwaysOnTop: boolean;
}

type State = {
    timers: Timer[];
}

const useTimer = create((set) => ({
    timers: [],
    removeAll: () => set({timers: []}),
    addTimer: (timer: Omit<Timer, 'id'>) => set((state: State) => ([
        {id: state.timers.length + 1, ...timer},
        ...state.timers
    ])),
    removeTimer: (idToRemove: number) => set((state: State) => state.timers
        .filter(({id}) => id !== idToRemove)),
    updateTimer: (timer: Timer) => set((state: State) => state.timers
        .map(({id, ...rest}) => (id === timer.id
                ? ({timer})
                : ({...rest, id})
        )))
}));
