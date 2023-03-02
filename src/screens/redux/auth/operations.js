import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { app } from "../../../../friebase/config";
import { authSlice } from "./authReducer";

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          login: displayName,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: login });
      const { uid, displayName } = await getAuth(app).currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          login: displayName,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    const auth = getAuth();
    await signOut(auth);
    dispatch(authSlice.actions.authSignOut());
  } catch (error) {
    console.log(error);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    const auth = getAuth();
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authSlice.actions.authStateChange({
            stateChange: true,
          })
        );
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            login: user.displayName,
          })
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
};
