
import multer from "multer";
// import "../../public"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    //abhi key liye we are uploading with the same file name as the suer is uploading
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Specify the destination folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname); // Use the original file name
//     }
// });

// const upload = multer({ storage: storage });
  
  export const upload = multer({storage: storage })

  //this middleware is basically build to provide the local file path to the clodinary utility for effective file uploading