const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URI);

  console.log(
    `MongoDB Connected: ${connection.connection.host}`.cyan.underline.bold
  );
};

module.exports = connectDB;
