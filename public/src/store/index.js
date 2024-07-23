// src/store/index.js
import { createStore } from 'vuex';
import axios from 'axios';

const loadStateFromLocalStorage = () => {
	try {
		const serializedState = localStorage.getItem('vuex');
		return serializedState ? JSON.parse(serializedState) : undefined;
	} catch (err) {
		return undefined;
	}
};

const saveStateToLocalStorage = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('vuex', serializedState);
	} catch (err) {
		console.error('Could not save state', err);
	}
};

const store = createStore({
	state: {
		user: loadStateFromLocalStorage()?.user || null,
		isLoggedIn: loadStateFromLocalStorage()?.isLoggedIn || false,
	},
	mutations: {
		setUser(state, user) {
			state.user = user; 	
			state.isLoggedIn = true;
			saveStateToLocalStorage(state);
		},
		clearUser(state) {
			state.user = null;
			state.isLoggedIn = false;	
			saveStateToLocalStorage(state);
		}
	},
	actions: {
		async checkAuth({ commit }) {
			try {
				const response = await axios.get('https://electronic-medical-record-uqm3.onrender.com/api/user/profile', { withCredentials: true });
				console.log(response);
				commit('setUser', response);
			} catch (error) {
				console.log(error);

				commit('clearUser');
			}
		},
		async logout({ commit }) {
			commit('clearUser');
		}
	},
	getters: {
		isLoggedIn: (state) => state.isLoggedIn,
	},
});

export default store;
