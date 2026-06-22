export async function createRecord(collection, payload) {
    console.log("API PAYLOAD:", payload)

    try {
        const isFormData = payload instanceof FormData;

        const response = await fetch(`http://localhost:8000/api/${collection}/create`, {
            method: "POST",
            headers: isFormData
                ? {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                } // ❗ browser khud set karega multipart headers
                : {
                    "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}`
                },

            body: isFormData
                ? payload
                : JSON.stringify(payload)
        });

        return await response.json();

    } catch (error) {
        console.log(error)
    }
}

export async function getRecord(collection) {
    try {
        if (collection == "maincategory") {
            var response = await fetch(`http://localhost:8000/api/maincategory`, {
                method: "GET"
            });
        }
        else if (collection == "brand") {
            var response = await fetch(`http://localhost:8000/api/brand`, {
                method: "GET"
            });
        }
        else if (collection == "product") {
            var response = await fetch(`http://localhost:8000/api/product`, {
                method: "GET"
            });
        }
        else if (collection == "faq") {
            var response = await fetch(`http://localhost:8000/api/faq`, {
                method: "GET"
            });
        }
        else if (collection == "feature") {
            var response = await fetch(`http://localhost:8000/api/feature`, {
                method: "GET"
            });
        }
        else if (collection == "user") {
            var response = await fetch(`http://localhost:8000/api/user`, {
                method: "GET"
            });
        }
        else if (collection == "wishlist") {
            var response = await fetch(
                `http://localhost:8000/api/wishlist`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
        }
        else if (collection == "cart") {
            var response = await fetch(
                `http://localhost:8000/api/cart`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
        }
        else if (collection == "address") {
            var response = await fetch(
                `http://localhost:8000/api/address`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
        }
        else {
            var response = await fetch(`http://localhost:8000/api/subcategory`, {
                method: "GET"
            });
        }

        const data = await response.json(); // ✅ only once
        console.log(data)
        console.log(data.resultObj); // ✅ log data (not response)

        return data.resultObj; // ✅ return same

    } catch (error) {
        console.log(error)
    }
};

export async function updateRecord(collection, payload, id) {
    try {
        console.log(payload)
        console.log(id)
        const isFormData = payload instanceof FormData;

        console.log(isFormData)

        const response = await fetch(
            `http://localhost:8000/api/${collection}/${id}`,
            {
                method: "PATCH",
                headers: isFormData
                    ? undefined
                    : { "Content-Type": "application/json" },

                body: isFormData
                    ? payload
                    : JSON.stringify(payload)
            }
        );

        return await response.json();

    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
}

export async function deleteRecord(collection, payload) {
    console.log(collection, payload)
    try {
        var response = await fetch(`http://localhost:8000/api/${collection}/${payload}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            method: "DELETE"
        });
        return await response.json()
    } catch (error) {
        console.log(error)
    }
};





