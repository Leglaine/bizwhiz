function canViewUser(currentUser, requestedUserId) {
    return currentUser.role === "ADMIN" || currentUser.id === requestedUserId;
}

module.exports = { canViewUser };
