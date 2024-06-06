import { call, put, takeLatest,select } from "redux-saga/effects";

import UserRepository from "../repository/userRepository";
import { userActions } from "../reducers/userReducer.redducer";


function* addUser(action) {
  try {
    const newUser =yield select((store) => store.currentCustomer);
   
 
      const response = yield call(()=>UserRepository.addUser(newUser));
      if (response.status === 'error') {
        
        return ({
          message: 'Unable to Add User. Please try again.',
          // description: 'Unable to Add User. Please try again.',
          placement: 'bottomRight',
          onClick: () => {
            console.log('Notification Clicked!');
          },
        })
        }
        yield put(userActions.addUser(action.payload))
      

  } catch (e) {
    
  }
}





function* updateCustomer(action){
  const userId = action.payload.id;
  console.log(action.payload);
  
  try {
    const response = yield call(() =>UserRepository.updateCustomer(userId,action.payload)
    );
   
    if (response.status === "error") {
      

      return ({
        message: "Unable to Update Product. Please try again.",
        // description: 'Unable to Add Dealer. Please try again.',
        placement: "bottomRight",
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    }
    // yield put(userActions.updateCustomer(action.payload));
    // setHistory("/user");
  } catch (e) {
   
  }

}

function* createOrUpdateProduct(action){

  try{
    const userId = action?.payload?.id;
    console.log(userId);
    if(userId){
      yield updateCustomer(action)

    }else{
      yield addUser(action)

    }

  }catch(e){
   
  }

}

function* removeCustomer(action) {
  try {
      const response = yield call(()=>UserRepository.removeCustomer(action.payload.id));
      
      if (response.status === 'error') {
        
        return ({
          message: 'Unable to remove Dealer. Please try again.',
          // description: 'Unable to Add Dealer. Please try again.',
          placement: 'bottomRight',
          onClick: () => {
            console.log('Notification Clicked!');
          },
        })
        }
        // setHistory('/user');

  } catch (e) {
    
  }
}







function* userSaga() {
  yield takeLatest("DELETE_CUSTOMER", removeCustomer);
  yield takeLatest("ADD_NEW_USER",createOrUpdateProduct);
}

export default userSaga;