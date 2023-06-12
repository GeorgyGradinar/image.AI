export default function apiMapper() {

    function personMapper(user, authorisationToken) {
        return {
            id: user.id,
            credits: user.credits,
            name: user.name,
            email: user.email,
            emailVerified: user.email_verified_at,
            token: authorisationToken
        }
    }

    return {personMapper}
}
