const express = require('express');
const sharp = require('sharp')

const app = express();
const port = 48503;


const bodyParser = require('body-parser');
app.use(bodyParser.json({}));


app.post('/process', async (req, res) => {
  try {

    const { input, stages, output } = req.body;

    const image = sharp(input);

    for (const stage of stages) {
  	  image[stage.method](stage.payload);
    }

    await image.toFile(output);

    res.json(true);


    console.log(`processed ${input} to ${output} by ${JSON.stringify(stages)}`);

  }
  catch (error) {
    res.status(400).send(error?.message);
    console.error(error);
  }
});


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
