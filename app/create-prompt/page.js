'use client';

import {useState} from 'react';
import { useSession } from "next-auth/react";
import {useRouter} from "next/navigation"

import Form from'@components/Form'

const CreatePrompt = () => {
    const [submitting, setsubmitting]=useState(false)
    const [post, setPost]=useState({
        prompt:'',
        tag:'',
    });
    const router = useRouter();
    const {data: session }= useSession();
    const createPrompt= async(e)=>{
      e.preventDefault();
      setsubmitting(true);
      try{
        const response=await fetch('/api/prompt/new',{
          method: 'POST',
          body: JSON.stringify({
            prompt: post.prompt,
            userId: session?.user.id,
            tag: post.tag
          })
        });
        if(response.ok){
          router.push('/');
        }

      } catch(error){

      }
    }
  return (
    <Form
    type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt
