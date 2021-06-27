import express, { Request, Response, NextFunction } from 'express';
import { upload, s3, deleteImage } from '../functions/awsS3';
import dotenv from 'dotenv';
import { verify } from 'jsonwebtoken';

dotenv.config();

const router = express.Router();

// jwt check middleware
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers['authorization'];

  if (!authorization) return res.sendStatus(403);

  try {
    const token = authorization?.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
      if (err) throw err;

      // req.body.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(401);
  }
};

///////////////

router.post('/uploadOne', verifyToken, upload(`portfolio`).single('file'), (req, res) => {
  const file = req.file as any;

  res.send(file.location);
});

router.post('/uploadArray', verifyToken, upload(`portfolio`).array('file'), (req, res) => {
  const files = req.files! as any;
  const paths = files.map((file: any) => file.location);

  res.send(paths);
});

///////////////

router.delete('/image', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.url.forEach(async (s3filekey: string) => {
      const _temp = s3filekey.split('/');
      deleteImage(_temp[_temp.length - 1]);
    });
  } catch (error) {
    res.sendStatus(400);
  }
  res.sendStatus(200);
});

export default router;

/*

// 파일 하나만 업로드 할 때. ex) { img: File }
app.post('/uploadOne', upload(filePath).single('img'), (req, res) => {
  console.log(req.file);
});

// 파일 여러개를 배열로 업로드 할 때. ex) { img: [File,File,File,...] }
app.post('/uploadArray', upload(filePath).array('img'), (req, res) => {
  console.log(req.files);
});

// 파일을 여러개의 객체로 업로드 할 때.
app.post(
  '/uploadFields',
  upload(filePath).fields([{ name: 'img1' }, { name: 'img2' }, { name: 'img3' }]),
  (req, res) => {
    console.log(req.files);
  }
);

*/
