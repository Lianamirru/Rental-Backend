const mongoose = require("mongoose");
const config = require("config");
const fs = require("fs");

const { Category } = require("./models/category");
const { Instrument } = require("./models/instrument");

const data = [
  {
    category: "guitar",
    instruments: [
      {
        type: "Acoustic",
        maker: "Yamaha",
        model: "A5R ARE",
        year: 2020,
        numberInStock: 2,
        monthlyRentalPrice: 20,
        description: `The A5R ARE traditional western body cutaway guitar features all-solid 
          rosewood back and sides and a hand-selected Sitka spruce top with original 
          Yamaha A.R.E. wood-torrefaction technology.`,
      },
      {
        type: "Acoustic",
        maker: "Yamaha",
        model: "A4K LIMITED",
        year: 2020,
        numberInStock: 2,
        monthlyRentalPrice: 10,
        description: `Crafted from all-solid koa, the A4K features the A Series cutaway western 
        body, double-line abalone inlays, unique black tuning machine keys together with specially 
        recorded mic models on the SRT preamp for plugged-in tone that matches the acoustic sound.`,
      },
      {
        type: "Acoustic",
        maker: "Yamaha",
        model: "AC5R ARE",
        year: 2020,
        numberInStock: 2,
        monthlyRentalPrice: 20,
        description: `The AC5R ARE concert body cutaway guitar features all-solid rosewood back and sides and a hand-selected Sitka spruce top with original Yamaha A.R.E. wood-torrefaction technology.`,
      },
    ],
  },
  {
    category: "piano",
    instruments: [
      {
        type: "Electronic",
        maker: "Casio",
        model: "PX-S3100",
        year: 2020,
        numberInStock: 2,
        monthlyRentalPrice: 30,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget turpis et neque elementum lobortis ac sit amet lorem. Morbi nisl ligula, egestas a volutpat vitae, ultricies ac nibh. `,
      },
      {
        type: "Synthesizer",
        maker: "Casio",
        model: "CT-X3000",
        year: 2020,
        numberInStock: 2,
        monthlyRentalPrice: 40,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget turpis et neque elementum lobortis ac sit amet lorem. Morbi nisl ligula, egestas a volutpat vitae, ultricies ac nibh. `,
      },
      {
        type: "Electronic",
        maker: "Yamaha",
        model: "PSR-EW425",
        year: 2020,
        numberInStock: 2,
        monthlyRentalPrice: 20,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget turpis et neque elementum lobortis ac sit amet lorem. Morbi nisl ligula, egestas a volutpat vitae, ultricies ac nibh. `,
      },
      {
        type: "Electronic",
        maker: "Yamaha",
        model: "PSR-EW310",
        year: 2020,
        numberInStock: 2,
        monthlyRentalPrice: 20,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget turpis et neque elementum lobortis ac sit amet lorem. Morbi nisl ligula, egestas a volutpat vitae, ultricies ac nibh. `,
      },
      {
        type: "Electronic",
        maker: "Yamaha",
        model: "EZ-300",
        year: 2020,
        numberInStock: 2,
        monthlyRentalPrice: 20,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget turpis et neque elementum lobortis ac sit amet lorem. Morbi nisl ligula, egestas a volutpat vitae, ultricies ac nibh. `,
      },
    ],
  },
  {
    category: "drums",
    instruments: [
      {
        type: "Acoustic",
        maker: "Yamaha",
        model: "RDP2F5",
        year: 2020,
        numberInStock: 2,
        monthlyRentalPrice: 10,
        description: `The RYDEEN 5-piece drum kit is perfect for any beginner or intermediate player who is not willing to compromise on quality.`,
      },
    ],
  },
  {
    category: "flute",
    instruments: [
      {
        type: "Acoustic",
        maker: "J. Michael",
        model: "FLA-1500",
        year: 2020,
        numberInStock: 2,
        monthlyRentalPrice: 20,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget turpis et neque elementum lobortis ac sit amet lorem. Morbi nisl ligula, egestas a volutpat vitae, ultricies ac nibh. `,
      },
    ],
  },
];

const encodeImage = (path) => {
  const image = fs.readFileSync(path);
  return { data: image, contentType: "image/png" };
};

async function seed() {
  // await mongoose.connect(config.get("db"));

  await Instrument.deleteMany({});
  await Category.deleteMany({});

  for (let categoryList of data) {
    const { category } = categoryList;

    const { _id: categoryId } = await new Category({
      category,
    }).save();

    const instruments = categoryList.instruments.map((instrument, i) => {
      const imagePath = `./images/${category}/instrument-${i}.png`;
      return {
        ...instrument,
        image: encodeImage(imagePath),
        category: { _id: categoryId, category },
      };
    });
    await Instrument.insertMany(instruments);
  }

  // mongoose.disconnect();

  // console.info("Done!");
}

// seed();
module.exports = seed;
