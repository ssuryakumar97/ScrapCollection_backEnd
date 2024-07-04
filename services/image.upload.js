import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv"

dotenv.config()

const storage = new GridFsStorage({
    url: process.env.MONGO_URL,
    file: (req, file) => {
        // console.log("storage:",file)
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"
          ) {
            return {
                bucketName: "quotation_req_photos",
                filename: `${Date.now()}_${file.originalname}`
            }
          } else {
            //Otherwise save to default bucket. Default bucket is fs
            return `${Date.now()}_${file.originalname}`;
          }
    }
})

export const upload = multer({storage})
