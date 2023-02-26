import { put, takeLatest, call, all } from "redux-saga/effects";
import apiUrl from "../../config/urls";
import {
  getApi,
  postApi,
} from "../apis";
import queryString from "query-string";

export const actionTypes = {
  LIST_ITEMS: "LIST_ITEMS",
  LIST_SUCCESS: "LIST_SUCCESS",
  LIST_LOADING: "LIST_LOADING",
  DELETE_ITEM: "DELETE_ITEM",
  SET_LIST_ITEMS: "SET_LIST_ITEMS",
  SET_PROFILE_DATA: "SET_PROFILE_DATA",
  PROFILE_ADD_LOAD: "PROFILE_ADD_LOAD",
  PROFILE_SUBMIT: "PROFILE_SUBMIT",
};

const initialState = {
  listLoading: false,
  listSuccess: false,
  itemsList: [],
  profileData: {
    name:"",
    email:"",
    phone: "",
    addresses: [],
  },
  profileAddLoading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.SET_LIST_ITEMS: {
      const { data } = action.payload;
      return {
        ...state,
        itemsList: data,
      };
    }

    case actionTypes.LIST_LOADING: {
      const { data } = action.payload;
      return {
        ...state,
        listLoading: data,
      };
    }

    case actionTypes.LIST_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listSuccess: data,
      };
    }

    case actionTypes.SET_PROFILE_DATA: {
      const { data } = action.payload;
      return {
        ...state,
        profileData: data,
      };
    }

    case actionTypes.PROFILE_ADD_LOAD: {
      const { data } = action.payload;
      return {
        ...state,
        profileAddLoading: data,
      };
    }

    default: {
      return state;
    }
  }
};

export const actions = {
  listItems: () => ({
    type: actionTypes.LIST_ITEMS,
  }),
  listLoading: (data) => ({
    type: actionTypes.LIST_LOADING,
    payload: { data },
  }),
  listSuccess: (data) => ({
    type: actionTypes.LIST_SUCCESS,
    payload: { data },
  }),
  setListItems: (data) => ({
    type: actionTypes.SET_LIST_ITEMS,
    payload: { data },
  }),
  setProfileData: (data) => ({
    type: actionTypes.SET_PROFILE_DATA,
    payload: { data },
  }),
  profileAddLoading: (data) => ({
    type: actionTypes.PROFILE_ADD_LOAD,
    payload: { data },
  }),
  profileSubmit: (data) => ({
    type: actionTypes.PROFILE_SUBMIT,
    payload: { data },
  }),
  deleteProfile: (data) => ({
    type: actionTypes.DELETE_ITEM,
    payload: { data },
  }),
};

export function* saga() {
  yield takeLatest(actionTypes.LIST_ITEMS, listItemsSaga);
  yield takeLatest(actionTypes.PROFILE_SUBMIT, submitProfileSaga);
  yield takeLatest(actionTypes.DELETE_ITEM, deleteProfileSaga);
}

function* listItemsSaga(action) {
  yield all([put(actions.listLoading(true))]);

  try {
    const response = yield call(
      getApi,
      apiUrl("GET_LIST_ITEMS"),
      null,
    );
    if (response.status === 200) {
      let responseData = yield call([response, response.json]);
      console.log('res',responseData);
      if (responseData && responseData.data) {
        yield all([
          put(actions.setListItems(responseData.data)),
          put(actions.listLoading(false)),
          put(actions.listSuccess(true)),
        ]);
      } else {
        yield all([put(actions.listLoading(false))]);
      }
    } else if (response.status === 403) {
        yield all([put(actions.listLoading(false))]); 
    } else {
      yield all([put(actions.listLoading(false))]);      
    }
  } catch (error) {
    console.log(error);
    yield all([put(actions.listLoading(false))]);
  }
}

function* submitProfileSaga(action) {
  let {data } = action.payload;
 console.log('data',data)
  yield all([put(actions.profileAddLoading(true))]);
  try {
    const response = yield call(
      postApi,
      apiUrl("CREATE_PROFILE"),
      JSON.stringify(data)
    );
    if (response.status === 200) {
      let responseData = yield call([response, response.json]);
      if (responseData && responseData.data) {
          yield all([
            put(actions.profileAddLoading(false)),
            put(actions.listItems()),
          ]);
      }
    } else if (response.status === 403) {
      let errorData = yield call([response, response.json]);
      if (errorData && errorData.statusCode && errorData.statusCode === 403) {
       
      } else {
        yield all([put(actions.profileAddLoading(false))]);
      }
    } else {
      yield all([put(actions.profileAddLoading(false))]);
      let errorData = yield call([response, response.json]);
    }
  } catch (error) {
    console.log(error);
    yield all([put(actions.profileAddLoading(false))]);
  }
}

function* deleteProfileSaga(action) {
  let { data } = action.payload;
  yield all([put(actions.profileAddLoading(true))]);
  try {
    const response = yield call(
      postApi,
      apiUrl("DELETE_PROFILE"),
      JSON.stringify({ids:data})
    );
    if (response.status === 200) {
      let responseData = yield call([response, response.json]);
      if (responseData && responseData.data) {
          yield all([
            put(actions.profileAddLoading(false)),
            put(actions.listItems()),
          ]);
      }
    } else if (response.status === 403) {
      let errorData = yield call([response, response.json]);
      if (errorData && errorData.statusCode && errorData.statusCode === 403) {
       
      } else {
        yield all([put(actions.profileAddLoading(false))]);
      }
    } else {
      yield all([put(actions.profileAddLoading(false))]);
      let errorData = yield call([response, response.json]);
    }
  } catch (error) {
    console.log(error);
    yield all([put(actions.profileAddLoading(false))]);
  }
}