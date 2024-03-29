export async function addRecord(payload) {
    try {
        console.log("user addRecord services");
        let response = await fetch("http://localhost:8000/user", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error('Failed to create account');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding record:', error);
        throw error; // Rethrow the error to handle it outside
    }
}
// export async function addRecord(payload) {
//     let response = await fetch("http://localhost:8000/user", {
//         method: "post",
//         headers: {
//             "content-type": "application/json"
//         },
//         body: JSON.stringify(payload)
//     })
//     return await response.json()
// }

export async function getRecord() {
    let response = await fetch("http://localhost:8000/user", {
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}

export async function updateRecord(payload) {
    let response = await fetch("http://localhost:8000/user/" + payload.id, {
        method: "put",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    return await response.json()
}

export async function deleteRecord(payload) {
    let response = await fetch("http://localhost:8000/user/" + payload.id, {
        method: "delete",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}