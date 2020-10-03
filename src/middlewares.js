export const isAuthenticated = (request) => {
    if (!request.user) {
        throw Error("Login First!")
    }
    return;
}