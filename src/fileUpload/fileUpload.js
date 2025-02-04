import multer from "multer"
import { v4 as uuidv4 } from 'uuid'
import { AppError } from "../middleware/appError.js"




const uploadFile = (folderName)=>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
            cb(null, uuidv4() + "-"+file.originalname)
        }
    })

    function fileFilter (req, file, cb) {
        if(file.mimetype.startsWith('image')){
            cb(null, true)
        }else{
            cb(new AppError('please upload Image Only ', 401),false)
        }
    }
    const upload = multer({storage , fileFilter});
    return upload
}

export const uploadSingleFile =(filename , folderName) =>{
    return uploadFile(folderName).single(filename)
}
export const uploadMixOfFiles = (filename, folderName)=>{
    return uploadFile(folderName).fields(filename)
}