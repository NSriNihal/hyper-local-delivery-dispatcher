import {connect} from "mongoose"

const connetDb = async()=>{
    try{
        await connect(process.env.DB_URL);
        console.log("Atlas DB connected")
    }catch(err){
        console.log("DB error",err);
        process.exit(1);
    }
    
}

export default connetDb