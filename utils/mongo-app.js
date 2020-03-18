const faker = require('faker')
const { MongoClient } = require('mongodb')

const bulkAdd = () => {
    let people = []
    for(i = 0; i < 333; i++){
        people.push({email: faker.internet.email(), created_at: faker.date.past()})
    }
    return people
}

const getTotal = async () => {
    const uri = "mongodb+srv://gxc19:<password>@practice-cluster-5rwoc.mongodb.net/test?retryWrites=true&w=majority"

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    try {
        await client.connect()
        const db = client.db("joinus")

        const response = await db
        .collection("emails")
        .find()
        .count()
        console.log(response) 
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
}

getTotal()

const addEmail = async email => {
    const uri = "mongodb+srv://gxc19:<password>@practice-cluster-5rwoc.mongodb.net/test?retryWrites=true&w=majority"

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    try {
        await client.connect()
        const db = client.db("joinus")
        await db.collection("emails").insertOne({ email: email, created_at: new Date() })
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
}




module.exports = {
    getTotal,
    addEmail
}