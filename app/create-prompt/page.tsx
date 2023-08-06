"use client"

import React from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession() || { data: null };

    const [submitting, setSubmitting] = useState<boolean>(false);

    const [post, setPost] = useState<IPost>({
        prompt: '',
        tag: ''
    })

    const createPrompt = async (e: any) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch(
                '/api/prompt/new',{
                    method: 'POST',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        userId: session?.user?.id,
                        tag: post.tag
                    })
                }
            )
            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }

    }


  return (
    <Form 
      type = 'Create'
      post = {post}
      setPost = {setPost}
      submitting = {submitting}
      setSubmitting = {setSubmitting}
      handleSubmit = {createPrompt}
    />
  )
}

export default CreatePrompt