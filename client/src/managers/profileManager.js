export const getUserProfiles = () => {
    return fetch(`/api/userprofile`).then((res) => res.json());
}

export const getUserProfileById = (id) => {
    console.log(id);
    return fetch(`/api/userprofile/${id * 1}`).then((res) => res.json());
}