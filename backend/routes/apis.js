import Express from "express";
import { saveData, getData, deleteData, updateData } from "../controllers/dataController.js";
import { sendMail } from "../controllers/sendMail.js";
const router = Express.Router();

router.get('/', (req, res) => {
    res.status(200).json({success:"true", msg : "working endpoint"});
});
router.post('/save', saveData);
router.get('/getData', getData );
router.delete('/delete/:id', deleteData);
router.post('/update', updateData);
router.post('/send-mail', sendMail);


export default router;
