import UserModel from "../models/user";
import PropertyModel from "../models/property";
import { serverFeedback, findError } from "../helpers/Feedback";
import imageUpload from "../middleware/cloudinary";
const Property = {
    async addProperty(req, res) {
        console.log(req.body)
        try {
            const { id } = req.tokenData;
            let image_url;
            if(process.env.NODE_ENV!=='test'){
             image_url = req.files !== null ? await imageUpload(req.files.image_url): "https://images.io/123"
            }
            const {
                state, city, address, type, price
            } = req.body;
            const displayResult = PropertyModel.addNew({
                owner: id,
                price,
                state,
                city,
                image_url,
                type,
                address
            });
            return serverFeedback(res, 201, ...['status', 201, 'data', displayResult]);
        } catch (err) {
            console.log(err)
            return findError(res);
        }
    },
    async updateProperty(req, res) {
        try {
            let image_url;
            if(process.env.NODE_ENV!=='test'){
                image_url = req.files !== null ? await imageUpload(req.files.image_url) : null;
            }
             const propId = req.params.propertyId;
            const propArray = PropertyModel.AllProperty();
            const propertyData = propArray.find(property => property.id == propId);
            const propIndex = propArray.findIndex(property => property.id == propId);
            const {
                state, city, address, type, price
            } = req.body;
            propertyData.state = !state ? propertyData.state : state;
            propertyData.price = !price ? propertyData.price : price;
            propertyData.city = !city ? propertyData.city : city;
            propertyData.address = !address ? propertyData.address : address;
            propertyData.image_url = !image_url ? propertyData.image_url : image_url;
            propertyData.type = !type ? propertyData.type : type;
            PropertyModel.updateProperty(propertyData, propIndex);
            return serverFeedback(res, 200, ...['status', 200, 'data', propertyData]);
        } catch (err) {
            console.log(err.message)
            return findError(res);
        }
    },

    deleteProperty(req, res) {
        try {
            const id = req.params.propertyId;
            const propToDelete = PropertyModel.deleteProperty(id);
            if (propToDelete) {
                return serverFeedback(res, 200, ...['status', 200, 'data', propToDelete]);
            }
            return serverFeedback(res, 404, ...['status', 404, 'error', 'Property not found. Property may have been removed']);

        } catch (err) {
            return findError(res);
        }
    },
    markSold(req, res) {
        const { propertyId } = req.params
        try {
            const propArray = PropertyModel.AllProperty();
            const propToUpdate = propArray.find(property => property.id == propertyId);
            const propIndex = propArray.findIndex(property => property.id == propertyId);
            propToUpdate.status = 'Sold';
            PropertyModel.updateProperty(propToUpdate, propIndex);
            return serverFeedback(res, 200, ...['status', 200, 'data', propToUpdate]);
        } catch (err) {
            return findError(res);
        }
    },

    getAllProperty(req, res) {
        try {
            const properties = PropertyModel.AllProperty();
            const users = UserModel.AllUsers()
            const PropertyList = properties.map(pro => {
                const ownerID = pro.owner;
                const user = users.find(el => el.id == ownerID);
                pro.ownerEmail = user.email;
                pro.ownerPhoneNumber = user.phoneNumber;
                const { owner, ...finalResult } = pro;
                return finalResult
            })
            if (req.query.type) {
                const { type } = req.query
                const Result = PropertyList.find(property => property.type === type);
                if (Result) {
                    return serverFeedback(res, 200, ...['status', 200, 'data', Result]);
                } else {
                    return serverFeedback(res, 403, ...['status', 403, 'error', 'Property not found.Enter a valid value and try again.']);
                }
            }
            return serverFeedback(res, 200, ...['status', 200, 'data', PropertyList]);
        } catch (err) {
            return findError(res);
        }
    },
    getOneProperty(req, res) {
        try {
            const id = req.params.propertyId;
            if (!id) return serverFeedback(res, 403, ...['status', 403, 'error', 'Invalid ID']);
            const result = PropertyModel.findProperty(id);
            if (!result) return serverFeedback(res, 404, ...['status', 404, 'error', 'Property not found.Enter a valid value and try again.']);
            const proOwnerID = result.owner;
            const userList = UserModel.AllUsers();
            const proOwner = userList.find(user => user.id === proOwnerID);
            result.ownerEmail = proOwner.email;
            result.ownerPhoneNumber = proOwner.phoneNumber;
            const { owner, ...finalResult } = result;
            return serverFeedback(res, 200, ...['status', 200, 'data', finalResult]);
        } catch (err) {
            return findError(res);
        }
    }
}
export default Property;
