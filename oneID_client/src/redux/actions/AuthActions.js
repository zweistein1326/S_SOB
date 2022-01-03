/** @format */

import { AsyncStorage } from '@react-native-async-storage/async-storage';

export const setUser = (user) => ({
	type: 'SET_USER',
	payload: user,
});
