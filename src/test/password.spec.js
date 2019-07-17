import Authentication from "../helpers/auth";
import chai from 'chai';

const { expect } = chai;
let passResult = null;
describe('Check Password', () => {
    it('should return a boolean', (done) => {
        const result = Authentication.hashPassword("ncpass")
        passResult = result;
        expect(result).to.be.a('string');
        done();
    });
    it('should return a boolean', (done) => {
        const result = Authentication.comparePassword(passResult, 'ncpass')

        expect(result).to.be.a('boolean');
        done();
    });
});
