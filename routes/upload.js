const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary')

const fs = require('fs');

cloudinary.config({
  cloud_name: "khong",
  api_key: "456789442967236",
  api_secret: "N25WmC0sGrJ6KjB9BPkEwcL8Wf8",
});


router.post('/upload', async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'cloudinary_react',
    });
    console.log(uploadResponse);
    res.status(200).json({ secure_url: uploadResponse.secure_url, public_id: uploadResponse.public_id })
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }

})

router.post('/destroy', (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: 'No images Selected' })

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;

      res.json({ msg: "Deleted Image" })
    })

  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }

})
module.exports = router;