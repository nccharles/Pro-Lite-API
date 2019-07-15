import chai from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import server from '../server';

const { expect } = chai;
chai.use(chaiHttp);
let userToken = null;
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
  it('should insert user data to the memory', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'chris@gmail.com',
        first_name: 'Charles',
        last_name: 'NDAYISABA',
        password: 'Ncinhouse',
        phoneNumber: '0784603404',
        address: 'Kigali'
      })
      .end((err, res) => {
        userToken = res.body.data.token;
        if (err) return done(err);
        expect(res.body).to.have.keys('status', 'data');
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
  it('should allow user to login if exist', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'nccharles1@gmail.com',
        password: 'ncinhouse'
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
  it('should save property details provided by user', (done) => {
    chai.request(server)
      .post('/api/v1/property')
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
        if (err) { done(err); }
        expect(res.body).to.have.keys('status', 'data');
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
      .patch('/api/v1/property/2')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        owner: 4,
        price: 4200000,
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
        expect(res.body).to.have.keys('status', 'data');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').that.equals(200);
        expect(res.body).to.have.ownProperty('data').to.be.an('object');
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
      .get('/api/v1/property')
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status', 'data');
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
  it('should get all specific property types', (done) => {
    chai.request(server)
      .get('/api/v1/property/?type=2-bedroom')
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.status).to.be.a('number');
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').to.be.a('number');
        expect(res.body).to.have.ownProperty('data').to.be.an('object');
        done();
      });
  });
  it('should retrieve a Specific Property', (done) => {
    chai.request(server)
      .get('/api/v1/property/1')
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.ownProperty('status').to.be.a('number');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.status).to.be.a('string');
        expect(res.body.data.state).to.be.a('string');
        expect(res.body.data.type).to.be.a('string');
        expect(res.body.data.city).to.be.a('string');
        expect(res.body.data.address).to.be.a('string');
        expect(res.body.data.image_url).to.be.a('string');
        expect(res.body.data.price).to.be.a('number');
        expect(res.body.data.ownerEmail).to.be.a('string');
        expect(res.body.data.ownerPhoneNumber).to.be.a('string');
        done();
      });
  });
  it('should mark property as Sold', (done) => {
    chai.request(server)
      .patch('/api/v1/property/2/sold')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').to.be.a('number');
        expect(res.body).to.have.ownProperty('data').to.be.an('object');
        expect(res.body.data.id).to.be.a('number');
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
  it('should delete a property', (done) => {
    chai.request(server)
      .delete('/api/v1/property/2')
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
  it('should return message if property ID does not exist', (done) => {
    chai.request(server)
      .delete('/api/v1/property/45')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status', 'error');
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').to.be.a('number');
        expect(res.body.status).to.be.a('number');
        expect(res.body.error).to.be.an('string');
        expect(res.body.error).to.equal('Property not found. Property may have been removed');
        done();
      });
  });
  it('should return a message `Something went wrong!`', (done) => {
    chai.request(server)
      .patch('/api/v1/property/27/sold')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status', 'error');
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').to.be.a('number');
        expect(res.body.status).to.be.a('number');
        expect(res.body.error).to.be.an('string');
        expect(res.body.error).to.equal('Something went wrong!');
        done();
      });
  });
  it('should return a message `Token must be provided`', (done) => {
    chai.request(server)
      .patch('/api/v1/property/2/sold')
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status', 'error');
        expect(res.status).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').to.be.a('number');
        expect(res.body.status).to.be.a('number');
        expect(res.body.error).to.be.an('string');
        expect(res.body.error).to.equal('Token must be provided');
        done();
      });
  });
});