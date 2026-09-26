// A ViewModel is the presentation-orchestration layer between a screen and the application’s data/state layers.

//It prepares everything the screen needs to render and handles everything the user can do on that screen.

//  Most common Responsibilities : 
//  1. Owns screen-specific UI state 
//  2. Consumes server state
//  3. Derives UI-ready data
//  4. Exposes user-action handlers


const useHomeViewModel = () => {
  return {
    name: "test",
    value: 10,
  };
};

export default useHomeViewModel;
