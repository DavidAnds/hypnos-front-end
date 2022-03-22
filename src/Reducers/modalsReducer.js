const initialState = {
  showLogin: true,
  showSignUp: false,
};

export default function modalsReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLEIN":
      if (state.showLogin) {
        return {
          showLogin: false,
          showSignUp: false,
        };
      } else {
        return {
          showLogin: true,
          showSignUp: false,
        };
      }
    case "TOGGLEUP":
      if (state.showSignUp) {
        return {
          showLogin: false,
          showSignUp: false,
        };
      } else {
        return {
          showLogin: false,
          showSignUp: true,
        };
      }
    case "CLOSEMODAL":
        return {
            showLogin: false,
            showSignUp: false
        }
    default: 
    return state;
  }
}