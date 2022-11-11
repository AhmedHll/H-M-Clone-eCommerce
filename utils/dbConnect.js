import mongoose from "mongoose";

const connection = {};
const dbConnect = async (dbname) => {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(
    `${process.env.MONGO_URL}${dbname}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: dbname,
    }
  );

  connection.isConnected = db.connections[0].readyState;
};

export default dbConnect;
