import axios from "axios";
import { BACKEND_URL } from "../config"
import { useEffect, useState } from "react"
import { getInitialLetters } from "../utils/getinitialLetters";


export interface BlogType{
    id:string,
    author:{
        name:string
    }
    title:string,
    content:string,
    published:boolean,
    createdAt:string
}

export const useBlog=({id}:{id:string})=>{
    console.log("in useBlog() hook");
    const [loading,setLoading]=useState(true);
    const [blog,setBlog]=useState<BlogType>({
        id:"",
        author:{
            name:""
        },
        title:"",
        content:"",
        published:false,
        createdAt:""
    })
    const [authorName,setAuthorName]=useState("");

    

    async function getBlog(){
        try{
            const response=await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("mediumToken")}`
                }
            });
            const fetchedBlog=response.data.blogIs;
            console.log("Blog from backend:",fetchedBlog);
            const authorName=fetchedBlog.author.name;
            const res=getInitialLetters(authorName);
            setAuthorName(res);
            setBlog(fetchedBlog);
            setLoading(false);
        }catch(err){
            console.log(`error while fetching a blog`);
            return err;
        }
    }
    useEffect(()=>{
        getBlog();
    },[])

    return{
        loading,
        blog,
        authorName
    }
}