import chai from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import server from '../index';
import db from "../database";
const { expect } = chai;
chai.use(chaiHttp);
let userToken;
let userID;
let proId;
describe('Testing welcome endpoints', () => {
  it('should accept status 200', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        if (err) return done(err);
        expect((res.status)).to.equal(200);
        expect((res.body.status)).to.equal(200);
        expect((res.body.message)).to.equal('Welcome to PropertyPro-Lite');
        done();
      });
  });
  it('should insert user data to the database', (done) => {
    chai.request(server)
      .post('/api/v3/auth/signup')
      .send({
        email: 'charles@gmail.com',
        first_name: 'Charles',
        last_name: 'NDAYISABA',
        password: 'Ncinhouse',
        phoneNumber: '0784603404',
        address: 'Kigali'
      })
      .end((err, res) => {
        userToken = res.body.data.token;
        if (err) return done(err);
        expect(res.body).to.have.keys('status','message','data');
        expect(res.status).to.be.a('number');
        expect((res.body)).to.be.an('object');
        expect((res.body.data.token)).to.be.a('string');
        expect((res.body.data.id)).to.be.a('number');
        expect((res.body.data.first_name)).to.be.a('string');
        expect((res.body.data.last_name)).to.be.a('string');
        expect((res.body.data.email)).to.be.a('string');
        expect((res.body.data.phoneNumber)).to.be.a('string');
        expect((res.body.data.address)).to.be.a('string');
        done();
      });
  });
  it('should not allow user to login if not exist', (done) => {
    chai.request(server)
      .post('/api/v3/auth/signin')
      .send({
        email: 'churles@gmail.com',
        password: 'Ncinhouse'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.keys('status','message');
        expect(res.status).to.equal(404);
        expect(res.body).to.have.ownProperty('status').to.be.a('number');
        done();
      });
  });
  it('should allow user to login if exist', (done) => {
    chai.request(server)
      .post('/api/v3/auth/signin')
      .send({
        email: 'charles@gmail.com',
        password: 'Ncinhouse'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.be.a('number');
        expect(res.body).to.be.an('object');
        expect((res.body.data)).to.be.an('object');
        expect((res.body.data.email)).to.be.a('string');
        expect((res.body.data.first_name)).to.be.a('string');
        expect((res.body.data.last_name)).to.be.a('string');
        expect((res.body.data.token)).to.be.a('string');
        expect((res.body.data.id)).to.be.a('number');
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body).to.haveOwnProperty('status').to.be.a('number');
        expect(res.body).to.haveOwnProperty('data').to.be.an('object');

        done();
      });
  });
})
describe('ENDPOINTS TESTING', () => {
  it('should return a message if save property failed', (done) => {
    chai.request(server)
      .post('/api/v3/property')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        price: 4200000,
        state: 'Kigali',
        city: 'Kigali',
        address: 'Kicukiro KK 15 Road',
      })
      .end((err, res) => {
        if (err) { done(err); }
        expect(res.body).to.have.keys('status','error');
        expect(res.status).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').that.equals(422);
        expect(res.body).to.have.ownProperty('error').that.equals(`"type" is required`);
        done();
      });
  });
  it('should save property details provided by user', (done) => {
    chai.request(server)
      .post('/api/v3/property')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        price: 4200000,
        state: 'Kigali',
        city: 'Kigali',
        address: 'Kicukiro KK 15 Road',
        type: '4-bedroom',
        image_url: 'https://images.io/123'
      })
      .end((err, res) => {
        proId= res.body.data.id
        userID=res.body.data.owner
        if (err) { done(err); }
        expect(res.body).to.have.keys('status','message','data');
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').that.equals(201);
        expect(res.body).to.have.ownProperty('data').to.be.an('object');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.owner).to.be.a('number');
        expect(res.body.data.status).to.be.a('string');
        expect(res.body.data.state).to.be.a('string');
        expect(res.body.data.type).to.be.a('string');
        expect(res.body.data.city).to.be.a('string');
        expect(res.body.data.address).to.be.a('string');
        expect(res.body.data.price).to.be.a('number');
        done();
      });
  });
  it('should update property details provided by user', (done) => {
    chai.request(server)
      .patch(`/api/v3/property/${proId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        price: 4600000,
        state: 'Kigali',
        city: 'Kigali',
        address: 'Kicukiro KK 15 Road',
        type: '2-bedroom',
        image_url: 'https://images.io/123'
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body).to.have.keys('status','message','data');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').that.equal(200);
        expect(res.body).to.have.ownProperty('data').to.be.an('object');
        expect(res.body).to.have.ownProperty('message').to.be.an('string');
        expect(res.body).to.have.ownProperty('message').to.equal('Updated Successfully');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.owner).to.be.a('number');
        expect(res.body.data.status).to.be.a('string');
        expect(res.body.data.state).to.be.a('string');
        expect(res.body.data.type).to.be.a('string');
        expect(res.body.data.city).to.be.a('string');
        expect(res.body.data.address).to.be.a('string');
        expect(res.body.data.image_url).to.be.a('string');
        expect(res.body.data.price).to.be.a('number');
        done();
      });
  });
  it('should get all properties posted', (done) => {
    chai.request(server)
      .get('/api/v3/property')
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status','message', 'data');
        expect(res.status).to.be.a('number');
        expect(res.body.status).to.be.a('number');
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').that.equals(200);
        expect(res.body).to.have.ownProperty('data').to.be.an('array');
        expect(res.body.data[0].id).to.be.a('number');
        expect(res.body.data[0].status).to.be.a('string');
        expect(res.body.data[0].state).to.be.a('string');
        expect(res.body.data[0].type).to.be.a('string');
        expect(res.body.data[0].city).to.be.a('string');
        expect(res.body.data[0].address).to.be.a('string');
        expect(res.body.data[0].image_url).to.be.a('string');
        expect(res.body.data[0].price).to.be.a('number');
        done();
      });
  });
  
  it('should retrieve a Specific Property', (done) => {
    chai.request(server)
      .get(`/api/v3/property/${proId}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status','message','data');
        expect(res.body).to.have.ownProperty('message').to.equal('Ok');
        expect(res.status).to.equal(200);
        expect(res.body.data[0].id).to.be.a('number');
        expect(res.body.data[0].status).to.be.a('string');
        expect(res.body.data[0].state).to.be.a('string');
        expect(res.body.data[0].type).to.be.a('string');
        expect(res.body.data[0].city).to.be.a('string');
        expect(res.body.data[0].address).to.be.a('string');
        expect(res.body.data[0].price).to.be.a('number');
        expect(res.body.data[0].owner_email).to.be.a('string');
        expect(res.body.data[0].owner_phonenumber).to.be.a('string');
        expect(res.body.data[0].image_url).to.be.a('string');
        done();
      });
  });
  it('should return a message if a Specific Property not found', (done) => {
    chai.request(server)
      .get(`/api/v3/property/200`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status','message');
        expect(res.body).to.have.ownProperty('message').to.equal('This Property not found!');
        expect(res.status).to.equal(404);
        expect(res.body).to.have.ownProperty('status').to.be.a('number');
        done();
      });
  });
  it('should return a message if a Property type not found', (done) => {
    chai.request(server)
      .get(`/api/v3/property/?type=500-bedroom`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status','message');
        expect(res.body).to.have.ownProperty('message').to.equal('This property not found!');
        expect(res.status).to.equal(404);
        expect(res.body).to.have.ownProperty('status').to.be.a('number');
        done();
      });
  });
  it('should mark property as Sold', (done) => {
    chai.request(server)
      .patch(`/api/v3/property/${proId}/sold`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status','message','data');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').to.be.a('number');
        expect(res.body).to.have.ownProperty('message').to.be.an('string');
        expect(res.body).to.have.ownProperty('message').to.equal('Marked as Sold!');
        done();
      });
  });
  it('should mark property as Sold', (done) => {
    chai.request(server)
      .patch(`/api/v3/property/4/sold`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status','error');
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').to.be.a('number');
        expect(res.body).to.have.ownProperty('error').to.be.an('string');
        expect(res.body).to.have.ownProperty('error').to.equal('This Property not found!');
        done();
      });
  });
  it('should get all specific property types', (done) => {
    chai.request(server)
      .get('/api/v3/property/?type=2-bedroom')
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status','message','data');
        expect(res.status).to.be.a('number');
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').to.be.a('number');
        expect(res.body).to.have.ownProperty('data').to.be.an('array');
        expect(res.body.data[0].id).to.be.a('number');
        expect(res.body.data[0].status).to.be.a('string');
        expect(res.body.data[0].state).to.be.a('string');
        expect(res.body.data[0].type).to.be.a('string');
        expect(res.body.data[0].city).to.be.a('string');
        expect(res.body.data[0].address).to.be.a('string');
        expect(res.body.data[0].price).to.be.a('number');
        done();
      });
  });
  it('should delete a property', (done) => {
    chai.request(server)
      .delete(`/api/v3/property/${proId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.be.a('number');
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').to.be.a('number');
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.be.a('number');
        done();
      });
  });
  it('should return error if property ID does not exist', (done) => {
    chai.request(server)
      .delete('/api/v3/property/45')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status', 'error');
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').to.be.a('number');
        expect(res.body.status).to.be.a('number');
        expect(res.body.error).to.be.an('string');
        expect(res.body.error).to.equal('This Property not found!');
        done();
      });
  });
  it('should return a error `This Property not found.`', (done) => {
    chai.request(server)
      .patch('/api/v3/property/27/sold')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status','error');
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').to.be.a('number');
        expect(res.body.status).to.be.a('number');
        expect(res.body.error).to.be.an('string');
        done();
      });
  });
  
  it('should return a message `Token must be provided`', (done) => {
    chai.request(server)
      .patch('/api/v3/property/1/sold')
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status', 'error');
        expect(res.status).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').to.be.a('number');
        expect(res.body.status).to.be.a('number');
        expect(res.body.error).to.be.an('string');
        done();
      });
  });
  it("It should truncate table users", done => {
    const queryText = "TRUNCATE users CASCADE";
    db.query(queryText)
      .then(response => {
          expect(response).to.be.an("array");
          expect(response.length).to.equal(0);
        done();
      })
      .catch(err => {
        done();
      });
  });
  
});