import bcrypt from "bcrypt"
 
export const hashPassword = async (password:string) => {
   try{
       const salt = await bcrypt.genSalt(10);
       const hashValue = await bcrypt.hash(password,salt)
       return hashValue
    }catch(error){
        throw new Error("Error generating the bcrypt")
    }
}

export const comparePassword = async(password:string, hashedPassword:string)=>{
    const value = await bcrypt.compare(password,hashedPassword)
    return value
}


