import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../../tmp`)
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

export const upload = multer({ storage })