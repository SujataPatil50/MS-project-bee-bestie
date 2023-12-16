export const baseUrl = "http://localhost:3001"

export const getRequest = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
        let message = "Error fetch"

        if (data?.message) {
           message= data.message
        }
        return { error: true, message }
    }
    return data;
 }