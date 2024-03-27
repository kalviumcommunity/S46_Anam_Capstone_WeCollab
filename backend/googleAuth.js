import express from "express"
import {OAuth2Client} from "google-auth-library"
const router = express.Router()

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
)

async function getUserInfo(accessToken){
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`)
    return response.json()
}

router.post("/api/google", async (req,res) => {
    try{
        const authorizeUrl = await oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile email',
            prompt: 'consent'
        })

        res.json({redirectURI: authorizeUrl})
        
    }catch(err){
        console.error(err,message)
        throw new Error(err.message)
    }
})

router.get("/google/oauth", async (req,res) => {
    
    const { code } = req.query
    try {
        const { tokens } = await oAuth2Client.getToken(code)
        console.log(tokens)
        oAuth2Client.setCredentials(tokens)
        const tokenInfo = await oAuth2Client.getTokenInfo(
        oAuth2Client.credentials.access_token
        )
        const {name, email} = await getUserInfo(tokenInfo.access_token)
        console.log(tokenInfo,name,email)
        res.send('Authentication successful!')
    } catch (error) {
        console.error('Error during Google Auth:', error)
        res.status(500).send('Authentication failed')
    }

})

export default router