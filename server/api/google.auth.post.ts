import { OAuth2Client } from "google-auth-library";

// Get runtime config variables 
const config = useRuntimeConfig();

// Create google client
const clientId =  config.googleClientId;
const client = new OAuth2Client(clientId);

// API event handler
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const token = body.token;

  if(!token){
    throw createError({
      statusCode: 400,
      statusMessage: "No token or invalid token provided"
    })
  }
  const user = verify(token).catch(console.error);

  return  user;
})

/**
 * @returns
 * @param token JSON web token from goole 
 * @desc Virify JSON web token and returns user data if token is valid */ 


 async function verify(token: string){
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientId
  });
  const payload = ticket.getPayload()
  return payload;
}