export const getAllChores = () => {
    return fetch("/api/chore").then(res => res.json());
}

export const getChoreById = (id) => {
    return fetch(`/api/chore/${id}`).then(res => res.json());
}

export const deleteChoreById = (id) => {
    return fetch(`/api/chore/${id}`, {
        method: "DELETE"
    });
}

export const createChore = (choreObj) => {
    return fetch(`/api/chore/create`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(choreObj)
    });
}