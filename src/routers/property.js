import { Router } from 'express';
import Property from '../controllers/property';
import { checkToken } from '../middleware/handleToken';
import fileUpload from 'express-fileupload';
import { validProperty, validUpdate } from '../helpers/validations';
const router = Router();
router.use(fileUpload({
    useTempFiles: true,
  }));
router.post('/',checkToken,validProperty, Property.addProperty);
router.patch('/:propertyId', checkToken,validUpdate, Property.updateProperty);
router.patch('/:propertyId/sold', checkToken, Property.markSold);
router.delete('/:propertyId', checkToken, Property.deleteProperty);
router.get('/', Property.getAllProperty);
router.get('/:propertyId', Property.getOneProperty);


export default router;