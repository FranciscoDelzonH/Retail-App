import bcrypt from "bcryptjs"

const users = [
    {
        name: 'Dominique',
        email: 'd0ms@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Francisco',
        email: 'franc@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Jane',
        email: 'jane@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users