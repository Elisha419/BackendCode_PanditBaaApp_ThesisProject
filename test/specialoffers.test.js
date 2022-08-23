// use the path of your model
const specialoffers = require('../models/specialoffersModel');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://localhost:27017/specialoffers-testing';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
    });
});
afterAll(async () => {
    await mongoose.connection.close();
});
describe('SpecialOffers Schema test anything', () => {
// the code below is for insert testing
    let id = '';
    it('Add specialoffers testing anything', () => {
        const specialoffers_data = {
            'soname': "test",
            'sooriginalprice': '350',
        };
        
        return specialoffers.create(specialoffers_data)
        .then((specialoffers_ret) => {
            id = specialoffers_ret._id
            expect(specialoffers_ret.soname).toEqual('test');
        });
    });
    it('to test the update', async () => {
        return specialoffers.findOneAndUpdate({_id :id}, 
        {$set : {soname:'updatedone'}}, {new:true})
        .then((so)=>{
            expect(so.soname).toEqual('updatedone')
        })
    });
    // the code below is for delete testing
    it('to test the delete specialoffers is working or not', async () => {
        const status = await specialoffers.deleteMany();
        expect(status.deletedCount).toBe(1);
    });
 
})
