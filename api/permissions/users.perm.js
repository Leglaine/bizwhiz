function canViewUser(currentUser, requestedUserId) {
    return currentUser.role === "ADMIN" || currentUser.id === requestedUserId;
}

function canDeleteUser(currentUser, requestedUserId) {
    return currentUser.role === "ADMIN" || currentUser.id === requestedUserId;
}

module.exports = { canViewUser, canDeleteUser };
