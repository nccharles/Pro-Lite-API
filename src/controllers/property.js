import { serverFeedback, findError } from "../helpers/Feedback";
import imageUpload from "../middleware/cloudinary";
import db from '../database'
const Property = {
    async addProperty(req, res) {
        try {
            const { id } = req.tokenData;
            let image_url;
            image_url = process.env.NODE_ENV !== 'test' && req.files !== null ? await imageUpload(req.files.image_url) : "https://images.io/123"
            const {
                state, city, address, type, price
            } = req.body;
            const table = 'property'
            const columns = `owner, state, city, address, type, price,image_url`;
            const condition = `WHERE owner ='${id}' AND state='${state}' AND city='${city}' AND address='${address}' AND type='${type}' AND price='${price}'`;
            const values = `'${id}','${state}', '${city}', '${address}', '${type}', '${price}', '${image_url}'`;
            db.proCreate(res, table, columns, values, condition)
                .then(response => {
                    return response
                }).catch(err => {
                    return findError(res);
                });
        } catch (err) {

            return findError(res);
        }
    },
    async updateProperty(req, res) {
        try {
            let image_url = null,
                columns = null;
            image_url = process.env.NODE_ENV !== 'test' && req.files !== null ? await imageUpload(req.files.image_url) : "https://images.io/123"
            const { id } = req.tokenData;
            const { propertyId } = req.params;
            const {
                state, city, address, type, price
            } = req.body;
            columns = `state='${state}', city='${city}', type='${type}', address='${address}', price= ${price}, image_url='${image_url}'`;

            db.updateProperty(res, columns, id, propertyId)
                .then(response => {
                    return response
                })
                .catch(err => {
                    return findError(res);
                });
        } catch (err) {
            return findError(res);
        }
    },

    deleteProperty(req, res) {
        try {
            const { id } = req.tokenData;
            const { propertyId } = req.params;
            db.deleteProperty(res, id, propertyId)
                .then(response => {
                    return response
                })
                .catch(err => {
                    return findError(res);
                });

        } catch (err) {
            return findError(res);
        }
    },
    markSold(req, res) {
        try {
            const { id } = req.tokenData;
            const { propertyId } = req.params;
            db.markSold(res, id, propertyId)
                .then(response => {
                    return response
                }).catch(err => {
                    return findError(res);
                });

        } catch (err) {
            return findError(res);
        }
    },

    getAllProperty(req, res) {
        try {
            const columns = `p.id, p.status, p.type, p.state, p.city, p.address, p.price, p.created_on, p.image_url, u.email AS ownerEmail, u.phonenumber AS ownerphoneNumber`;
            let condition = `WHERE u.id=p.owner`;
            if (req.query.type) {
                const { type } = req.query;
                condition = `WHERE u.id=p.owner AND p.type = '${type}'`;
                db.getProperties(columns, condition)
                    .then(response => {
                        if (response.length) {
                            return serverFeedback(res, 200, ...['status', 200, 'message', 'success', 'data', response]);
                        }
                        return serverFeedback(res, 404, ...['status', 404, 'message', `This property not found!`]);
                    }).catch(err => {
                        return findError(res);
                    });

            } else {
                db.getProperties(columns, condition)
                    .then(response => {

                        return serverFeedback(res, 200, ...['status', 200, 'message', 'Ok', 'data', response]);
                    }).catch(err => {
                        return findError(res);
                    });
            }
        } catch (err) {
            return findError(res);
        }
    },
    getOneProperty(req, res) {

        try {
            const id = req.params.propertyId;
            const columns = `p.id, p.status, p.type, p.state, p.city, p.address, p.price, p.created_on, p.image_url, u.email AS owner_email, u.phonenumber AS owner_phonenumber`;
            let condition = `WHERE u.id=p.owner AND p.id=${id}`;
            db.findByOne(columns, condition)
                .then(response => {
                    if (!response.length) return serverFeedback(res, 404, ...['status', 404, 'message', `This Property not found!`]);

                    return serverFeedback(res, 200, ...['status', 200, 'message', 'Ok', 'data', response]);
                })
                .catch(err => {
                    return findError(res);
                });
        } catch (err) {
            return findError(res);
        }
    }
}
export default Property;
