export default function requests() {
    function registration(data) {
        console.log(data)
    }

    function checkVerificationEmail(){
           return 111
    }

    return {registration, checkVerificationEmail}
}
