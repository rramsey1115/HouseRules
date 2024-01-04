export const getUserProfiles = () => {
    return fetch(`api/userprofile`).then(res => res.json());
}

export const getUserProfileById = (id) => {
    return fetch(`api/userprofile/${id}`).then(res => res.json());
}