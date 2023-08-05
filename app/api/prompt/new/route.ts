import { connectToDB } from "@utils/database";

export const POST = async (res: any, req: { json: () => ICreatePrompt | PromiseLike<ICreatePrompt>; }) => {
    const { userId, prompt, tag }: ICreatePrompt = await req.json();

    try {
        await connectToDB();
    } catch (error) {
        
    }
}