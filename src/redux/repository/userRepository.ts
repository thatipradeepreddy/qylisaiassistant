import Fetch from "../fetch";

interface User {
  // Define the properties of a User here
  id?: string;
  name: string;
  email: string;
  // Add other fields as required
}

interface LoginObj {
  username: string;
  password: string;
}

interface UserRepository {
  addUser(user: User): Promise<any>;
  getAllUsers(): Promise<any>;
  removeCustomer(userID: string): Promise<any>;
  updateCustomer(userID: string, user: User): Promise<any>;
  validateUser(loginObj: LoginObj): Promise<any>;
}

async function addUser(user: User): Promise<any> {
  const response = await Fetch.post(`/customers`, user);
  return response;
}

async function getAllUsers(): Promise<any> {
  const response = await Fetch.get(`/customers`);
  return response;
}

async function removeCustomer(userID: string): Promise<any> {
  const response = await Fetch.remove(`/customers/${userID}`);
  return response;
}

async function updateCustomer(userID: string, user: User): Promise<any> {
  const response = await Fetch.update(`/customers/${userID}`, user);
  return response;
}

async function validateUser(loginObj: LoginObj): Promise<any> {
  const response = await Fetch.post('/authorization/login', loginObj);
  return response;
}

const UserRepository: UserRepository = {
  addUser,
  getAllUsers,
  removeCustomer,
  updateCustomer,
  validateUser,
};

export default UserRepository;
