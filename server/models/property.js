import moment from 'moment';
import proData from '../utils/storage';


class Property {
    constructor() {
        this.proList = proData.propertyList
    }

    addNew(p) {
        const {
            owner, price, state, city, address, type, image_url
        } = p;
        const proId = this.proList.length;
       const Id = proId + 1;

        const newProperty = {
            owner,
            id: Id,
            price,
            state,
            city,
            type,
            address,
            image_url,
            created_on: moment.now(),
            status: 'Available'
        };

        this.proList.push(newProperty);
        return newProperty
    }

    AllProperty() {
        return this.proList;
    }

    findProperty(id) {
        const oneProperty = this.proList.find(property => property.id == id);
        return oneProperty;
    }

    updateProperty(propObj, propId) {
        this.proList.splice(propId, 1, propObj);
        return this.proList;
    }

    deleteProperty(id) {
        const propArr = this.proList;
        const propIndex = propArr.findIndex(property => property.id == id);
        if (propIndex >= 0) {
            propArr.splice(propIndex, 1);
            return true;
        }
        return false;
    }
}


export default new Property();