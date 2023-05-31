const express=require("express");
const router=express.Router();
const studentcontroller=require("../controllers/studentscontroller");

//view All records
router.get("/",studentcontroller.view);
//Add New Records
router.get("/adduser",studentcontroller.adduser);
router.post("/adduser",studentcontroller.save);

/*update Records*/
router.get("/edituser/:id",studentcontroller.edituser);
router.post("/edituser/:id",studentcontroller.edit);

//delete Records
router.get("/deleteuser/:id",studentcontroller.delete);

module.exports=router;
