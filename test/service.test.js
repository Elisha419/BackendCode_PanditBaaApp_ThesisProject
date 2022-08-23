// use the path of your model
const service = require('../models/serviceModel');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://localhost:27017/service-testing';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
    });
});
afterAll(async () => {
    await mongoose.connection.close();
});
describe('Service Schema test anything', () => {
// the code below is for insert testing
    let id = '';
    it('Add service testing anything', () => {
        const service_data = {
            'sname': "test",
            'sprice': '100',
        };
        
        return service.create(service_data)
        .then((service_ret) => {
            id = service_ret._id
            expect(service_ret.sname).toEqual('test');
        });
    });
    it('to test the update', async () => {
        return service.findOneAndUpdate({_id :id}, 
        {$set : {sname:'updatedone'}}, {new:true})
        .then((ss)=>{
            expect(ss.sname).toEqual('updatedone')
        })
    });
    // the code below is for delete testing
    it('to test the delete service is working or not', async () => {
        const status = await service.deleteMany();
        expect(status.deletedCount).toBe(1);
    });
 
})
