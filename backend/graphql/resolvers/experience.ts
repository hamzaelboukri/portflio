import experience from "../../models/experience";

export const resolvers ={
query :{
experiences : async ()=>{
    const docs = await experience.find ().lean();
}

}




}