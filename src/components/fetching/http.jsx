export const HTTP = {
    GET: async (url, headers) => {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        })
        return response.json()
    },
    POST: async (url, body) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'//avisamos al backend que el contenido que le enviamos es de tipo JSON.
            },
            body: JSON.stringify(body)//nos aseguramos de enviar también el body en formato JSON, como un string.
        })
        return response.json()
    },
    PUT: async (url, body) => {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'//avisamos al backend que el contenido que le enviamos es de tipo JSON.
            },
            body: JSON.stringify(body)//nos aseguramos de enviar también el body en formato JSON, como un string.
        })
        return response.json()
    },
    DELETE: async (url) => {
        const response = await fetch(url, {
            method: 'DELETE'
        })
        return response.json()
    }
}
export const URL = {
    URL_API: 'http://localhost:4040'
}