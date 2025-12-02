const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

dotenv.config();

// MEE DETAILS IKKADA MARCHANDI 👇
const myEmail = "admin@tanusri.com";
const myPassword = "tanusri123"; // Mee istam vachina password pettukondi

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB...");
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: myEmail });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists!");
      process.exit();
    }

    // Hash Password & Create
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(myPassword, salt);

    await Admin.create({ email: myEmail, password: hashedPassword });
    console.log("✅ Admin Created Successfully!");
    process.exit();
  })
  .catch((err) => console.log(err));