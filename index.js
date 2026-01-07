import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import pg from "pg";
const app = express();
const port=5000;
const db=new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"MusicPlayer",
  password:"123456",
  port:5432,
});

db.connect();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
const imageBuffer=fs.readFileSync("/download.jpg");
const audioBuffer=fs.readFileSync("/backend/uploads/GehraHua.mp3");
const imageBase64=imageBuffer.toString("base64");
const audioBase64=audioBuffer.toString("base64");
app.post("/api/saveTrack",async(req,res)=>{
  try{
   db.query("Insert into MusicUsers (tracks) values(jsonb_build_object('Artist':$1,'Song':$2,'Image':$3,'Audio':$4))",
  ["Arijit Singh","Gehra Hua",imageBase64,audioBase64]);
  res.status(200).json({message:"Track saved successfully"});
  }
  catch(err){
    console.error(err);
    res.status(500).json({message:"Error in saving track"});
  }
})

  app.get("/api/retrieve",async(req,res)=>{
    try{
      const result=await db.query("Select tracks from MusicUsers where id=$1",[1]);
      res.status(200).json(result.rows[0]);
    }
    catch(err){
      console.error(err);
      res.status(500).json("Error in retrieving data");
    }
  })
app.post("/api/login",async (req,res)=>{
 try{
   const {email,password}=req.body;
   const result=db.query("Select * from users where email=$1",[email]);
   
  const user = result.rows[0];
  
  if (result.rows.length>0){
    if(user.password===password&&user.email===email)
    {
    res.status(200).json({ message: "Login successful" });
    }
    else{
      res.status(400).json({error:"Invalid credentials"});
    }
  } else {
    res.status(400).json({ error: "You're not registered" });
  }
 }
 catch(err)
 {
  console.error(err);
  res.status(500).json("Error in login into application");
 }
});
app.post("/api/register",async(req,res)=>{
  try{
    const{email,password}=req.body;
    
    const result1=await db.query("Select * from users where email=($1)",[email]);
    
    res.status(200).json({message:"User Registered Successfully"});
    if(result1.rows.length>0){
      res.status(400).json({
        error:"You're already registered"});
    }
    else{
     const result=await db.query("Insert into  users (email,password) values($1,$2)",[email,password]);
     res.status(200).json({message:"User Registered SuccessFully"});
    }
}
catch(err){
  console.error(err);
}
});
app.get("/api/tracks",async (req,res)=>{
  try{
const response=await db.query("SELECT * FROM MusicUsers");
 res.json([{data: response.rows}]);
  }
  catch(err){
    console.error(err);
    res.status(500).json("Error in fetching tracks");
  }
});
app.get("/api/podcasts",(req,res)=>{

});
app.get("/api/categories",(req,res)=>{
 res.json(["Hip-Hop", "Jazz", "Bollywood","Salsa","Classical","Rock","Pop"]);
});
app.get("/api/home", (req, res) => {
  res.json({
        message: "Welcome to the Homepage",
        
        
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
