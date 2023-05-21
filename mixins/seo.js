
export default function seo() {
    function setProperty(title, descriptionContent){
        useHead({
            htmlAttrs: {
                lang: 'ru'
            },
            title: title,
            meta: [
                { name: 'description', content: descriptionContent }
            ],

        })
    }

    return {setProperty};
}
