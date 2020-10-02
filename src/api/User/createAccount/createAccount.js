import {prisma} from '../../../../generated/prisma-client'
export default {
    Mutation : {
        createAccount : async(_, args) => {
            const { username, bio, email, firstName , lastName} = args;
            const user = await prisma.createUser({
                username,
                email,
                firstName,
                lastName,
                bio
            })
            return user
        }
    }
}