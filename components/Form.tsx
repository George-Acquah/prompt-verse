import Link from 'next/link';

const Form = ({
        type,
        post, 
        setPost, 
        submitting, 
        setSubmitting,
        handleSubmit,
      }: FormProps) => {
  return (
    <section className="w-full max-w-full flext-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient capitalize">
          {type} Post
        </span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompt with the world, and let your imagination run wild with any AI-Powered platform.
      </p>

      <form 
        action="" 
        method="post"
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
        >
          <label htmlFor="">
            <span className='font-semibold fonr-satoshi text-base text-gray-700'>Your AI Prompt</span>
          </label>

          <textarea 
          name="" 
          id="" 
          className="form_textarea"
          placeholder='Write your prompt here...'
          required
          value={post.prompt}
          onChange={(e) => setPost({
            ...post,
            prompt: e.target.value
          })}>

          </textarea>

          <label htmlFor="">
            <span className='font-semibold fonr-satoshi text-base text-gray-700'>
              Tag {` `}
              <span className="font-normal">
                (#product, # webdevelopment, #idea, #AI)
              </span>
            </span>
          </label>

          <input 
          name="" 
          id="" 
          className="form_input"
          placeholder='#tag'
          required
          value={post.tag}
          onChange={(e) => setPost({
            ...post,
            tag: e.target.value
          })}>
          </input>

          <div className="flex-end mx-3 mb-5 gap-4">
            <Link 
              href='/'
              className='text-gray-500 text-sm'
            >
              Cancel
            </Link>

            <button 
              type="submit"
              disabled={submitting}
              className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
            >
              {submitting ? `${type}...` : type}
            </button>
          </div>
      </form>
    </section>
  )
}

export default Form