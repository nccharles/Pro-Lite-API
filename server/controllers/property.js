import { serverFeedback, findError } from "../helpers/Feedback";
import imageUpload from "../middleware/cloudinary";
import db from '../database'
const Property = {
    async addProperty(req, res) {
        try {
            const { id } = req.tokenData;
            let image_url;
            if (process.env.NODE_ENV !== 'test') {
                image_url = req.files !== null ? await imageUpload(req.files.image_url) : "https://images.io/123"
            }
            const {
                state, city, address, type, price
            } = req.body;
            const table = 'property'
            const columns = `owner, state, city, address, type, price,image_url`;
            const values = `'${id}','${state}', '${city}', '${address}', '${type}', '${price}', '${image_url}'`;
            db.queryCreate(table, columns, values)
                .then(property => {
                    if (property) {
                        return serverFeedback(res, 201, ...['status', 201, 'Property Successfully posted', 'data', property]);
                    }
                    return findError(res);
                })
                .catch(err => {
                    return findError(res);
                });
        } catch (err) {
            return findError(res);
        }
    },
    async updateProperty(req, res) {
        try {
            let image_url;
            if (process.env.NODE_ENV !== 'test') {
                image_url = req.files !== null ? await imageUpload(req.files.image_url) : "https://images.io/123"
            }
            const { id } = req.tokenData;
            const { propertyId } = req.params;
            const {
                state, city, address, type, price
            } = req.body;
            const columns = `state='${state}', city='${city}', type='${type}', address='${address}', price= ${price}, image_url='${image_url}'`;
            const condition = `owner = ${id} AND id =${propertyId}`;
            db.updateProperty(columns, condition)
                .then(response => {
                    if (response) {
                        return serverFeedback(res, 200, ...['status', 200, 'Ok', 'data', response]);
                    }
                    return serverFeedback(res, 404, ...['status', 404, `This Property not fund.`]);
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
            const condition = `owner = ${id} AND id =${propertyId}`;
            db.deleteProperty(condition)
                .then(response => {
                    if (response) {
                        return serverFeedback(res, 200, ...['status', 200, 'Deleted Successfully!']);
                    }
                    return serverFeedback(res, 404, ...['status', 404, `This Property not fund.`]);
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
            const condition = `owner = ${id} AND id =${propertyId}`;
            db.markSold(condition)
                .then(response => {
                    if (response) {
                        return serverFeedback(res, 200, ...['status', 200, 'Marked as Sold!']);
                    }
                    return serverFeedback(res, 404, ...['status', 404, `This Property not fund.`]);
                })
                .catch(err => {
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
                            return serverFeedback(res, 200, ...['status', 200, 'success', 'data', response]);
                        }
                        return serverFeedback(res, 404, ...['status', 404, `This Property not fund.`]);
                    })
                    .catch(err => {
                        return findError(res);
                    });

            } else {
                db.getProperties(columns, condition)
                    .then(response => {

                        if (!response.length) return serverFeedback(res, 404, ...['status', 404, `This Property not fund.`]);

                        return serverFeedback(res, 200, ...['status', 200, 'Ok', 'data', response]);
                    })
                    .catch(err => {
                        return findError(res);
                    });
            }
        } catch (err) {
            console.log(err)
            return findError(res);
        }
    },
    getOneProperty(req, res) {

        try {
            const id = req.params.propertyId;
            const columns = `p.id, p.status, p.type, p.state, p.city, p.address, p.price, p.created_on, p.image_url, u.email AS ownerEmail, u.phonenumber AS ownerphoneNumber`;
            let condition = `WHERE u.id=p.owner AND p.id=${id}`;
            db.findByOne(columns, condition)
                .then(response => {
                    if (!response.length) return serverFeedback(res, 404, ...['status', 404, 'message', `This Property not fund.`]);

                    return serverFeedback(res, 200, ...['status', 200, 'Ok', 'data', response]);
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
