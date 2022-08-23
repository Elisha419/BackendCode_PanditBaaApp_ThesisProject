// use the path of your model
const contact = require('../models/contactModel');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://localhost:27017/contact-testing';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
    });
});
afterAll(async () => {
    await mongoose.connection.close();
});
describe('Contact Schema test anything', () => {
// the code below is for insert testing
    let id = '';
    it('Add contact testing anything', () => {
        const contact_data = {
            'name': "test",
            'phone': '9898989898',
            'email': 'test@gmail.com',
        };
        
        return contact.create(contact_data)
        .then((contact_ret) => {
            id = contact_ret._id
            expect(contact_ret.name).toEqual('test');
        });
    });
    it('to test the update', async () => {
        return contact.findOneAndUpdate({_id :id}, 
        {$set : {name:'updatedone'}}, {new:true})
        .then((cc)=>{
            expect(cc.name).toEqual('updatedone')
        })
    });
    // the code below is for delete testing
    it('to test the delete contact is working or not', async () => {
        const status = await contact.deleteMany();
        expect(status.deletedCount).toBe(1);
    });
 
})
