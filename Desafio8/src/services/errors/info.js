export const generateUserErrorInfo = (user) => {
    // console.log(user)
    return `Una o más propiedades están incompletas o no son válidas.
    Lista de propiedades requeridas:
    *first_name: needs to be a String, recieved ${user.first_name}
    *last_name : needs to be a String, recieved ${user.last_name }
    *email     : needs to be a String, recieved ${user.email}
    *role      : needs to be a String, recieved ${user.role}
    `
}

export const getProductErrorInfo = (query) => {
    // console.log(user)
    return `Una o más propiedades están incompletas o no son válidas.
    Lista de propiedades requeridas:
    *limit: needs to be a String, recieved ${query.limit}
    *page : needs to be a String, recieved ${query.page}
    *query: needs to be a String, recieved ${query.query}
    *sort : needs to be a String, recieved ${query.sort}
    `
}

export const createProductErrorInfo = (product) => {
    // console.log(user)
    return `Una o más propiedades están incompletas o no son válidas.
    Lista de propiedades requeridas:
    *title: needs to be a String, recieved ${product.title}
    *description : needs to be a String, recieved ${product.description}
    *code: needs to be a String, recieved ${product.code}
    *price : needs to be a Number, recieved ${product.price}
    *stock: needs to be a Number, recieved ${product.stock}
    *category : needs to be a String, recieved ${product.category}
    `
}

export const sessionErrorInfo = () => {
    // console.log(user)
    return `The session has ended, you have to login again.`
}


