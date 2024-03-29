export async function addRecord(payload) {
    try {
        let response = await fetch("http://localhost:8000/bills", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Failed to add record');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding record:', error);
        throw error; // Rethrow the error to handle it outside
    }
}

export async function getRecord() {
    try {
        let response = await fetch("http://localhost:8000/bills", {
            method: "get",
            headers: {
                "content-type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error('Failed to get records');
        }

        return await response.json();
    } catch (error) {
        console.error('Error getting records:', error);
        throw error;
    }
}

export async function updateRecord(payload) {
    try {
        let response = await fetch("http://localhost:8000/bills/" + payload.id, {
            method: "put",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Failed to update record');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating record:', error);
        throw error;
    }
}

export async function deleteRecord(id) {
    console.log("services delete")

    try {
        let response = await fetch("http://localhost:8000/bills/" + id, {
            method: "delete",
            headers: {
                "content-type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete record');
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting record:', error);
        throw error;
    }
}
