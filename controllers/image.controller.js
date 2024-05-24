import connectDb from "../database/configDB.js";
import mongoose from "mongoose";
import mongodb from "mongodb"

const {ObjectId} = mongodb

export const uploadImage = (req,res) => {
    const file = req.file
    console.log(file)
    res.send({
        message: "Uploaded",
        id: file.id,
        name: file.filename,
        contentType: file.contentType,
      });
}

export const downloadImage = async(req, res) => {
    try {
        // const Db = connectDb.connections[0].db;
        const mongoConfig = await connectDb();
        const Db = mongoConfig.connections[0].db
        // console.log(Db.connections[0].db)
        console.log("connected to mongodb");
    
        const imageBucket = new mongoose.mongo.GridFSBucket(Db, {
          bucketName: "quotation_req_photos",
        });
    
        let downloadStream = imageBucket.openDownloadStreamByName(
          req.params.filename
        );
    
        downloadStream.on("data", function (data) { //.on is an event emitter which was emitted by streams
          return res.status(200).write(data);       // data is the event which was emitted
        });
    
        downloadStream.on("error", function (data) {
          return res.status(404).send({ error: "Image not found" });
        });
    
        downloadStream.on("end", () => {
          return res.end();
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Error Something went wrong",
          error,
        });
      }
}

export const deleteImage = async(req,res) => {
    try {
        const mongoConfig = await connectDb();
        const Db = mongoConfig.connections[0].db
        // console.log(Db.connections[0].db)
        console.log("connected to mongodb");
    
        const imageBucket = new mongoose.mongo.GridFSBucket(Db, {
          bucketName: "quotation_req_photos",
        });

        // const obj_id = new mongoose.Types.ObjectId(req.params.id);
        const obj_id = new mongoose.mongo.BSON.ObjectId(req.params.id);
        console.log(obj_id)

        const deletedData = await imageBucket.delete(obj_id)

        res.status(200).json({message: "deleted data successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Error Something went wrong",
          error,
        });
    }
}