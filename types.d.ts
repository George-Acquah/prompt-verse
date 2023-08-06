interface IPost {
    prompt: string;
    tag: string;
}

interface ICreatePrompt extends IPost {
    userId: string;
}



//FORMS 
type FormProps = {
    type: string;
    post: IPost;
    setPost: React.Dispatch<React.SetStateAction<IPost>>
    submitting: boolean
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
    // handleSubmit: (e: React.FormEventHandler) => Promise<any> | undefined;
    handleSubmit: any;
  }