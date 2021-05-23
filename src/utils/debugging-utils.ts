export const reducerLogger = <TState, TAction>(
    label: string,
    reducer: (state: TState, action: TAction) => TState,
): ((state: TState, action: TAction) => TState) => {
    return (incomingState: TState, action: TAction) => {
        const outgoingState = reducer(incomingState, action);

        console.log(`<- ${label} - state change ->`, {
            action,
            incomingState,
            outgoingState,
        });

        return outgoingState;
    };
};
