
export default function seo() {
    function setProperty(title, descriptionContent){
        useHead({
            title: title,
            meta: [
                { name: 'description', content: descriptionContent }
            ],
        })
    }

    return {setProperty};
}
