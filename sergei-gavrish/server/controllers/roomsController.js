import express from 'express';
import bodyParser from 'body-parser';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
import Room from '../models/roomSchema';
// import { KEY } from '../config/config';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/getRooms',
  (req, res) => {
    Room
      .find({})
      .populate({
        path: 'users',
        model: 'User',
        select: '_id login'
      })
      .then(rooms => res.send(rooms))
  }
);

router.post('/newRoom',
  (req, res) => {
    Room
      .create({
        title: req.body.title,
        users: req.body.userId,
      })
      .then(room => res.send(room));
  }
);

// async (req, res) => {
//   const hashedPassword = await bcrypt.genSalt()
//     .then(salt => bcrypt.hash(req.body.password, salt))
//     .catch(err => {
//       res.status(500).send('Something went wrong');
//       return console.error(err);
//     });

//   User.create({
//     login: req.body.login,
//     password: hashedPassword
//   })
//     .then(() => {
//       return res.status(200).send({ message: 'Everything good. You\'re singed up' })
//     })
//     .catch(err => {
//       res.status(500).send('Something went wrong');
//       return console.error(11111, err);
//     });
// })

// router.post('/login',
//   (req, res) => {
//     console.log(req.body)
//     User.findOne({ login: req.body.login })
//       .then( user => {
//         if(!user) res.status(404).send('User not found');

//         const validPassword = bcrypt.compareSync(req.body.password, user.password);
//         if(!validPassword) return res.status(400).send({ auth: false, token: null});

//         const token = jwt.sign({ id: user._id }, KEY, {
//           expiresIn: 86400
//         });

//         res
//           .send({
//             auth: true,
//             tokenId: token,
//             expiresIn: 86400,
//           });
//       })
//       .catch( err => {
//         if(!res.headersSent) res.status(500).send('Something went wrong');
//         return console.error(err);
//       });
// });

export default router;
