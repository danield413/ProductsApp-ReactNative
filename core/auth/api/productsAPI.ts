

import axios from 'axios';


const productsAPI = axios.create({
    baseURL: 'localhost:3000/api/products',
})


// Interceptores

export { productsAPI };
