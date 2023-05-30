import {personStore} from "~/store/personStore";
import {ACCOUNT_STORAGE_KEY} from "~/constants";

export default function requests() {
    let store = personStore();
    const imagesData = [
        {
            id: '31554',
            img: 'img-i77g0LU68dD7As1cNlm7gR.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: ' качество, ',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },

        {
            id: '3155g544',
            img: 'img-aHbNRGbgmNutEKIOHdTQ2t.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: 'резк sdsd ssd',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3f4355g544',
            img: 'img-56NIBOvrjSaKS45vxomR6n.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: ' качество, резк',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3f777g544',
            img: 'img-5lxSExuwWStJCuwd4OjIn6.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: 'изображения  изображения ',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3f743g3g44',
            img: 'img-YkfgHICXA8YFGEzbWC36kS.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: 'тренде  тренде ',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3fasdggg44',
            img: 'img-WIBwVTR1rF74J3tVc8C2dE.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: 'Подедворна Подедворна',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3f2367jt44',
            img: 'img-q9tOtcskhqYjxvpFdvE5c2.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: 'лепить Подедворна',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3f239944',
            img: 'img-kWY1RGIowDFHObYWrqKEuX.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: 'лепить лепить',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3fasv54',
            img: 'img-9jjtCkXWwKjZe9wElBEly2.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: 'тренде тренде ',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3f213454',
            img: 'img-Azk6WKhpgaMAoMweR2HkUy.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: 'аллея аллея аллея',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3fhmmnb54',
            img: 'img-DjVseuFs8N2CikjWGgXM0T.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: 'еоновая  на ',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3fhdsikimnb54',
            img: 'img-hoT72XlOTiNoUcWPamhr9v.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: 'еоновая аллея на ',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3fh23m0b54',
            img: 'img-jYjnraZM46IaWERJsWQEw5.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: 'катаной катаной катаной',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3f111154',
            img: 'img-9jjtCkXWwKjZe9wElBEly2.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: 'лазерной катаной, поза г',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3fqqq54',
            img: 'img-Azk6WKhpgaMAoMweR2HkUy.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: 'лазерной , поза г',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3fiuytt4',
            img: 'img-DjVseuFs8N2CikjWGgXM0T.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: 'vvvvvvvvvvvvvvvv',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3fcvsert4',
            img: 'img-hoT72XlOTiNoUcWPamhr9v.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: 'dfsfsfsvx',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3fkjhytrt4',
            img: 'img-jYjnraZM46IaWERJsWQEw5.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: 'fffffghjjgfbn',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3fwessst4',
            img: 'img-nCU8xt4kkugIc6gMvDqWVF.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: 'fghfg',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3vbnmmst4',
            img: 'img-pflMQRap58h9aCuMEEekHf.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: '',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 5,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3vbassxst4',
            img: 'img-WcykmlaekkgasgzP70JQTD.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: 'ddddddd',
                exception: 'lllll',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 3,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3vbaasert4',
            img: 'img-Xcw19IKMv7yPiqDyASeju1.jpeg',
            like: false,
            date: '14.03.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: '',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3vbaasert4',
            img: 'img-i77g0LU68dD7As1cNlm7gR.jpeg',
            like: false,
            date: '20.12.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: ' гта, симметрия в',
                exception: ' гта',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3vazzxxt4',
            img: 'img-aHbNRGbgmNutEKIOHdTQ2t.jpeg',
            like: false,
            date: '14.06.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: 'планета с арт в стиле гта, симметрия в объектах',
                exception: 'gffd',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        },
        {
            id: '3vabhjkit4',
            img: 'img-56NIBOvrjSaKS45vxomR6n.jpeg',
            like: false,
            date: '02.02.2022',
            filters: {
                model: 'Диффузия v2.1',
                description: ' dsjfklj sd kdlsjf sd sdklfj sdh',
                exception: '',
                image: null,
                size: {
                    width: 512,
                    height: 512
                },
                parameters: {
                    countImages: 1,
                    step: 5,
                    navigation: 2,
                    seed: null
                },
            }
        }
    ];

    function initStore() {
        let savedPerson = process.client && localStorage.getItem(ACCOUNT_STORAGE_KEY);
        store.person = savedPerson ? JSON.parse(savedPerson) : '';
    }

    function registration(data) {
        console.log(data)
    }

    function checkVerificationEmail() {

    }

    function loginIn() {
        const person = {
            id: 26516,
            name: 'Евгений Кондратьев',
            email: 'test-email@mail.ru',
            password: 'frej4324f43',
            credits: 25,
        }
        store.person = person;
        localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(person));
    }

    function logout() {
        const person = {}
        const images = {images: [], newImages: []}

        store.person = person;
        store.imagesData = images;

        localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(person));
    }

    function getImages() {
        const images = [
            ...store.imagesData.images,
            {
                id: Math.floor(Math.random() * 10000),
                img: 'img-i77g0LU68dD7As1cNlm7gR.jpeg',
                like: false,
                date: '14.03.2022',
                filters: {
                    model: 'Диффузия v2.1',
                    description: ' качество, ',
                    exception: '',
                    image: null,
                    size: {
                        width: 512,
                        height: 512
                    },
                    parameters: {
                        countImages: 1,
                        step: 5,
                        navigation: 2,
                        seed: null
                    },
                }
            },

            {
                id: Math.floor(Math.random() * 10000),
                img: 'img-aHbNRGbgmNutEKIOHdTQ2t.jpeg',
                like: false,
                date: '23.11.2022',
                filters: {
                    model: 'Реалистичное',
                    description: 'резк sdsd ssd',
                    exception: '',
                    image: null,
                    size: {
                        width: 512,
                        height: 512
                    },
                    parameters: {
                        countImages: 1,
                        step: 5,
                        navigation: 2,
                        seed: null
                    },
                }
            },
            {
                id: Math.floor(Math.random() * 10000),
                img: 'img-56NIBOvrjSaKS45vxomR6n.jpeg',
                like: false,
                date: '10.06.2022',
                filters: {
                    model: 'Бесконечная мечта',
                    description: ' качество, резк',
                    exception: '',
                    image: null,
                    size: {
                        width: 512,
                        height: 512
                    },
                    parameters: {
                        countImages: 1,
                        step: 5,
                        navigation: 2,
                        seed: null
                    },
                }
            },
            {
                id: Math.floor(Math.random() * 10000),
                img: 'img-5lxSExuwWStJCuwd4OjIn6.jpeg',
                like: false,
                date: '12.03.2022',
                filters: {
                    model: 'Диффузия v2.1',
                    description: 'изображения  изображения ',
                    exception: '',
                    image: null,
                    size: {
                        width: 512,
                        height: 512
                    },
                    parameters: {
                        countImages: 1,
                        step: 5,
                        navigation: 2,
                        seed: null
                    },
                }
            },
            {
                id: Math.floor(Math.random() * 10000),
                img: 'img-YkfgHICXA8YFGEzbWC36kS.jpeg',
                like: false,
                date: '12.03.2022',
                filters: {
                    model: 'Опенджорни',
                    description: 'тренде  тренде ',
                    exception: '',
                    image: null,
                    size: {
                        width: 512,
                        height: 512
                    },
                    parameters: {
                        countImages: 1,
                        step: 5,
                        navigation: 2,
                        seed: null
                    },
                }
            },
            {
                id: Math.floor(Math.random() * 10000),
                img: 'img-WIBwVTR1rF74J3tVc8C2dE.jpeg',
                like: false,
                date: '12.03.2022',
                filters: {
                    model: 'Диффузия v2.1',
                    description: 'Подедворна Подедворна',
                    exception: '',
                    image: null,
                    size: {
                        width: 512,
                        height: 512
                    },
                    parameters: {
                        countImages: 1,
                        step: 5,
                        navigation: 2,
                        seed: null
                    },
                }
            },
            {
                id: Math.floor(Math.random() * 10000),
                img: 'img-q9tOtcskhqYjxvpFdvE5c2.jpeg',
                like: false,
                date: '12.03.2022',
                filters: {
                    model: 'Диффузия v2.1',
                    description: 'лепить Подедворна',
                    exception: '',
                    image: null,
                    size: {
                        width: 512,
                        height: 512
                    },
                    parameters: {
                        countImages: 1,
                        step: 5,
                        navigation: 2,
                        seed: null
                    },
                }
            },
            {
                id: Math.floor(Math.random() * 10000),
                img: 'img-kWY1RGIowDFHObYWrqKEuX.jpeg',
                like: false,
                date: '07.07.2022',
                filters: {
                    model: 'Диффузия v2.1',
                    description: 'лепить лепить',
                    exception: '',
                    image: null,
                    size: {
                        width: 512,
                        height: 512
                    },
                    parameters: {
                        countImages: 1,
                        step: 5,
                        navigation: 2,
                        seed: null
                    },
                }
            },
            {
                id: Math.floor(Math.random() * 10000),
                img: 'img-9jjtCkXWwKjZe9wElBEly2.jpeg',
                like: false,
                date: '12.12.2022',
                filters: {
                    model: 'Диффузия v2.1',
                    description: 'тренде тренде ',
                    exception: '',
                    image: null,
                    size: {
                        width: 512,
                        height: 512
                    },
                    parameters: {
                        countImages: 1,
                        step: 5,
                        navigation: 2,
                        seed: null
                    },
                }
            },
            {
                id: Math.floor(Math.random() * 10000),
                img: 'img-Azk6WKhpgaMAoMweR2HkUy.jpeg',
                like: false,
                date: '26.12.2022',
                filters: {
                    model: 'Диффузия v2.1',
                    description: 'аллея аллея аллея',
                    exception: '',
                    image: null,
                    size: {
                        width: 512,
                        height: 512
                    },
                    parameters: {
                        countImages: 1,
                        step: 5,
                        navigation: 2,
                        seed: null
                    },
                }
            },
            {
                id: Math.floor(Math.random() * 10000),
                img: 'img-DjVseuFs8N2CikjWGgXM0T.jpeg',
                like: false,
                date: '30.06.2022',
                filters: {
                    model: 'Диффузия v2.1',
                    description: 'еоновая  на ',
                    exception: '',
                    image: null,
                    size: {
                        width: 512,
                        height: 512
                    },
                    parameters: {
                        countImages: 1,
                        step: 5,
                        navigation: 2,
                        seed: null
                    },
                }
            },
            {
                id: Math.floor(Math.random() * 10000),
                img: 'img-hoT72XlOTiNoUcWPamhr9v.jpeg',
                like: false,
                date: '10.10.2022',
                filters: {
                    model: 'Диффузия v2.1',
                    description: 'еоновая аллея на ',
                    exception: '',
                    image: null,
                    size: {
                        width: 512,
                        height: 512
                    },
                    parameters: {
                        countImages: 1,
                        step: 5,
                        navigation: 2,
                        seed: null
                    },
                }
            },
            {
                id: Math.floor(Math.random() * 10000),
                img: 'img-jYjnraZM46IaWERJsWQEw5.jpeg',
                like: false,
                date: '20.03.2022',
                filters: {
                    model: 'Диффузия v2.1',
                    description: 'катаной катаной катаной',
                    exception: '',
                    image: null,
                    size: {
                        width: 512,
                        height: 512
                    },
                    parameters: {
                        countImages: 1,
                        step: 5,
                        navigation: 2,
                        seed: null
                    },
                }
            },
            {
                id: Math.floor(Math.random() * 10000),
                img: 'img-9jjtCkXWwKjZe9wElBEly2.jpeg',
                like: false,
                date: '11.11.2022',
                filters: {
                    model: 'Диффузия v2.1',
                    description: 'лазерной катаной, поза г',
                    exception: '',
                    image: null,
                    size: {
                        width: 512,
                        height: 512
                    },
                    parameters: {
                        countImages: 1,
                        step: 5,
                        navigation: 2,
                        seed: null
                    },
                }
            },
            {
                id: Math.floor(Math.random() * 10000),
                img: 'img-Azk6WKhpgaMAoMweR2HkUy.jpeg',
                like: false,
                date: '09.08.2022',
                filters: {
                    model: 'Диффузия v2.1',
                    description: 'лазерной , поза г',
                    exception: '',
                    image: null,
                    size: {
                        width: 512,
                        height: 512
                    },
                    parameters: {
                        countImages: 1,
                        step: 5,
                        navigation: 2,
                        seed: null
                    },
                }
            },
            {
                id: Math.floor(Math.random() * 10000),
                img: 'img-DjVseuFs8N2CikjWGgXM0T.jpeg',
                like: false,
                date: '19.08.2022',
                filters: {
                    model: 'Диффузия v2.1',
                    description: 'vvvvvvvvvvvvvvvv',
                    exception: '',
                    image: null,
                    size: {
                        width: 512,
                        height: 512
                    },
                    parameters: {
                        countImages: 1,
                        step: 5,
                        navigation: 2,
                        seed: null
                    },
                }
            },
            {
                id: Math.floor(Math.random() * 10000),
                img: 'img-hoT72XlOTiNoUcWPamhr9v.jpeg',
                like: false,
                date: '15.05.2022',
                filters: {
                    model: 'Диффузия v2.1',
                    description: 'dfsfsfsvx',
                    exception: '',
                    image: null,
                    size: {
                        width: 512,
                        height: 512
                    },
                    parameters: {
                        countImages: 1,
                        step: 5,
                        navigation: 2,
                        seed: null
                    },
                }
            },
            {
                id: Math.floor(Math.random() * 10000),
                img: 'img-jYjnraZM46IaWERJsWQEw5.jpeg',
                like: false,
                date: '22.03.2022',
                filters: {
                    model: 'Диффузия v2.1',
                    description: 'fffffghjjgfbn',
                    exception: '',
                    image: null,
                    size: {
                        width: 512,
                        height: 512
                    },
                    parameters: {
                        countImages: 1,
                        step: 5,
                        navigation: 2,
                        seed: null
                    },
                }
            },
        ];
        store.imagesData = {
            ...store.imagesData,
            images
        };
    }

    function getImageShared(id) {
        return imagesData.find(image => image.img.includes(id))
    }

    function generateImage(filters) {

        for (let x = 0; x < filters.parameters.countImages; x++) {
            let randomId = Math.floor(Math.random() * 10000);
            const loading = {
                id: String(randomId)
            };

            let loadImages = [...store.imagesData.images];
            loadImages.unshift(loading);
            let loadNewImages = [...store.imagesData.newImages];
            loadNewImages.unshift(loading.id);

            store.imagesData = {
                images: loadImages,
                newImages: loadNewImages
            }
        }

        setTimeout(() => {
            for (let x = 0; x < store.imagesData.newImages.length; x++) {
                let imageIndex = store.imagesData.images.findIndex(img => img.id === store.imagesData.newImages[x]);
                if (imageIndex >= 0) {
                    store.imagesData.images[imageIndex] = {
                        ...imagesData[x],
                        id: store.imagesData.images[imageIndex].id,
                    }
                }
            }
            store.imagesData.newImages = [];

        }, 2000);
        store.changeCredits(store.person.credits - filters.parameters.countImages * 2);
    }

    return {registration, checkVerificationEmail, loginIn, logout, generateImage, getImages, initStore, getImageShared};
}
