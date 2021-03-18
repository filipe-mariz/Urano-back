import request from 'supertest'
import app from '../../src/app';
import createConnection from '../../src/database/connection';

describe('Authenticate', async () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })
    

    it ('Should be abel a new user create', async () => {
        const response = await request(app).post('/create')
        .send({
            name: "Camila Maria de Souza Lira",
            email: "Camila_lira@gmail.com",
            number: "55 (81) 98569-7007",
            userName: "Camila_lira",
            password: "camilotaMaria"
    })
    }) 
        
    
})

