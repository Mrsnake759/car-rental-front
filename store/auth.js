export const state = () => ({
  isAuthenticated: false,
});

export const mutations = {
  login(state) {
    state.isAuthenticated = true;
  },
  logout(state) {
    state.isAuthenticated = false;
  },
};

