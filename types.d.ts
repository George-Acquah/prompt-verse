interface IPost {
    prompt: string;
    private: boolean;
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
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    promptType: string;
    setPromptType: React.Dispatch<React.SetStateAction<string>>
    // handleSubmit: (e: React.FormEventHandler) => Promise<any> | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleSubmit: any;
  }

  // PROMPT CARD LIST
  interface IPromptCardList {
    data: IPrompt[];
  }

  //CREATOR
  interface ICreator {
    _id: string;
    username: string;
    email: string;
    image: string;
}
  
  interface ILoginValues extends Record<string, unknown> {
    email: string;
    password: string;
    callbackUrl: string;
  }
interface IPrompt extends IPost {
  _id: string;
  creator: ICreator;
  likes: number;
  likedBy: string[];
}

interface _ITrendingTags {
  _id: string;
  name: string;
}

  interface ILikePrompt {
    likes: number;
    liked: boolean;
  }

interface ITag {
  name: string;
  count: number;
}

  interface IChildren {
  children: React.ReactNode;
}

// types/response.ts
interface IApiResponse<T> {
  data?: T;
  error?: string;
  message: string;
  status: number;
}

interface _ISearchQuery {
  query: string;
  size: number;
  page: number;
  tag?: string;
  sort?: PromptSortType;
}

interface _ISearchParams {
  SESSION: string;
  ENTITY_TYPE: string;
  TOASTER_TYPE: string;
  TOASTER_MSG: string;
  QUERY: string;
  TAG: string;
  SORT: string;
  PRIVACY_STATUS: string;
}

interface _IInput {
  id: string;
  label: string | React.ReactNode;
  type: string;
  value?: string | boolean | number;
  placeholder?: string;
  width?: string;
  input_type?: | "radio" | "textarea";
  icon?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  options?: string[];
  radio?: string[];
  disabled?: boolean;
  tooltip?: boolean;
  errors?: string | string[] | undefined;
}

type IconType = React.ComponentProps<"svg">;


  
type FormErrors<T extends Record<string, unknown> | null> = {
  [K in keyof T]?: string[];
} & {
  general?: string[];
};

type CustomFormData<T extends Record<string, unknown> | null> = {
  [K in keyof T]?: string | boolean | number;
};

type FormActionState<T extends Record<string, unknown> | null> = {
  data?: Partial<CustomFormData<T>>;
  errors?: FormErrors<T>;
  message?: string;
};

type ToasterType = 'error' | 'success';
type PromptSortType = "newest" | "popular" | "alphabetical";

type SortDirection = 1 | -1;
type PaginationOptions<T> = {
  query?: string;
  filter?: Partial<T>;
  size?: number;
  page?: number;
  userId?: string | null;
  sortBy?: Record<string, SortDirection>;
  populate?: string | string[];
};

type LoginActionState = FormActionState<ILoginValues>;
type LikePromptActionState = FormActionState<ILikePrompt>;