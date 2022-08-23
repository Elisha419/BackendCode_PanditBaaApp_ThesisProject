// use the path of your model
const appointment = require('../models/appointmentModel');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://localhost:27017/appointment-testing';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
    });
});
afterAll(async () => {
    await mongoose.connection.close();
});
describe('Appointment Schema test anything', () => {
// the code below is for insert testing
    let id = '';
    it('Add appointment testing anything', () => {
        const appointment_data = {
            'name': "test",
            'phone': '9809809800',
            'email': 'test@gmail.com',
        };
        
        return appointment.create(appointment_data)
        .then((appointment_ret) => {
            id = appointment_ret._id
            expect(appointment_ret.name).toEqual('test');
        });
    });
    it('to test the update', async () => {
        return appointment.findOneAndUpdate({_id :id}, 
        {$set : {name:'updatedone'}}, {new:true})
        .then((aa)=>{
            expect(aa.name).toEqual('updatedone')
        })
    });
    // the code below is for delete testing
    it('to test the delete appointment is working or not', async () => {
        const status = await appointment.deleteMany();
        expect(status.deletedCount).toBe(1);
    });
 
})
