// userReducer.ts
export const userActionTypes = Object.freeze({
    ADD_USER: "ADD_USER",
    GET_ALL_USERS: "GET_ALL_USERS",
    REMOVE_USER: "REMOVE_USER",
    UPDATE_USER: "UPDATE_USER",
    VALIDATE_USER: "VALIDATE_USER",
})

interface User {
    id: string
    name: string
    email: string
    // Add other fields as required
}

interface UserState {
    users: User[]
    isAuthenticated: boolean
}

const initialState: UserState = {
    users: [{ name: "amar", id: "6", email: "nana@gmail.com" }],
    isAuthenticated: false,
}

export default function userReducer(state: UserState = initialState, action: any): UserState {
    switch (action.type) {
        case userActionTypes.ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
            }

        case userActionTypes.GET_ALL_USERS:
            return {
                ...state,
                users: action.payload,
            }

        case userActionTypes.REMOVE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload),
            }

        case userActionTypes.UPDATE_USER:
            return {
                ...state,
                users: state.users.map((user) =>
                    user.id === action.payload.userID ? { ...user, ...action.payload.user } : user
                ),
            }

        case userActionTypes.VALIDATE_USER:
            return {
                ...state,
                isAuthenticated: action.payload,
            }

        default:
            return state
    }
}

export function addUser(payload: User) {
    return { type: userActionTypes.ADD_USER, payload }
}

export function getAllUsers(payload: User[]) {
    return { type: userActionTypes.GET_ALL_USERS, payload }
}

export function removeUser(payload: string) {
    // userID
    return { type: userActionTypes.REMOVE_USER, payload }
}

export function updateUser(payload: { userID: string; user: User }) {
    return { type: userActionTypes.UPDATE_USER, payload }
}

export function validateUser(payload: boolean) {
    // or some user validation state
    return { type: userActionTypes.VALIDATE_USER, payload }
}

export const userActions = {
    addUser,
    getAllUsers,
    removeUser,
    updateUser,
    validateUser,
}
