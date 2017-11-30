const v1 = "/api/v1/";

export const createUser = v1 + "createUser";
export const updateUser = v1 + "updateUser/{id: number}";
export const updateUserPassword = v1 + "updateUserPassword/{id: number}";
export const deleteUser = v1 + "deleteUser/{id: number}";

export const getUser = v1 + "getUser/{id: number}";
export const getUserComments = v1 + "getUserComments/{id: number}";
export const getUserLiked = v1 + "getUserLiked/{id: number}";