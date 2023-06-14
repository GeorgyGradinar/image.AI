
export default function seo() {
    function setProperty(title, meta, links, scripts){
        useHead({
            htmlAttrs: {
                lang: 'ru'
            },
            title: title,
            meta: [...meta],
            link:[...links],
            script: [...scripts],
        })
    }

    return {setProperty};
}
