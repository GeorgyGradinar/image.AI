
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
            noscript:[{
                children:'<div><img src="https://mc.yandex.ru/watch/93987528" style="position:absolute; left:-9999px;" alt="" /></div>'
            }]
        })
    }

    return {setProperty};
}
