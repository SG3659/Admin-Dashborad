import { Router } from "express";
const router = Router();
import {createCarInfo, fetchCars, editCarInfo, fetchCarByID } from "../controller/cars.js";
router.post("/createCar", createCarInfo);
router.get("/fetchCar", fetchCars);
router.get("/fetchCar/:id", fetchCarByID); 
router.patch("/editCar/:id", editCarInfo);    
export default router;