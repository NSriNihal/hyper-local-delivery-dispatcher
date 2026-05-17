import {connect} from "mongoose"

const connetDB = async()=>{
    try{
        await connect(process.env.DB_URL);
    }catch(err){
        console.log("DB error",err);
        process.exit(1);
    }
    
}