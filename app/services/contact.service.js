const {ObjectId} = require("mongodb");
const { deleteAll } = require("../controller/contact.controller");

class ContactService {
    constructor(client) {
        this.Contact = client.db().collection("contacts");
    }

    extractConactData(payload) {
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };

        Object.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }

   async create(payload) {
        const contact = this.extractConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact,
            { $set: { favorite: contact.favorite === true} },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

   /* async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i"},
        });
    } */

   /* async findByID(id) {
        return await this.Contact.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : nulll,
        });
    } */

    /* async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : nulll,
        };
        const update = this.extractConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            { $set: update},
            { returnDocument: "after"}
        );
        return result.value
    } */

   /* async this.delete(id) {
        const result = await this.Contact.findOneAndUpdate({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : nulll,
        });
        return result.value
    } */

    /* async findFavorite() {
        return await this.findFavorite({ favorite: true});
    } */

   /* async deleteAll() {
        const result = await this.Contact.deleteMany({});
        return result.deleteCount;
    } */
} 

module.exports = ContactService;