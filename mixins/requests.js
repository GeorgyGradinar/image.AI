import {personStore} from "~/store/personStore";
import {modelsStore} from "~/store/models";
import {imageGenerationStore} from "~/store/imageGenerationStore";
import {ACCOUNT_STORAGE_KEY} from "~/constants";
import {HEADER_PARAMETERS, MAIN_URL} from "~/config"
import {navigateTo} from "nuxt/app";
import apiMapper from "~/mixins/apiMapper";
import getRequestOptions from "~/mixins/requestOptions";
import userSettings from "~/mixins/userSettings";

export default function requests() {
    const store = personStore();
    const {changePerson} = store;
    const models = modelsStore()
    const {toggleAcceptDialog, toggleSnackBarDone, toggleSnackBarReject} = models;
    const imageStore = imageGenerationStore();
    const {
        addOldImages,
        clearImages,
        changeImagePage,
        toggleShowMoreImages,
        toggleLoaderShowMoreImages,
        toggleShowMainLoader
    } = imageStore;
    const {personMapper} = apiMapper();
    const {updateUserData} = userSettings();
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
    let timer;

    async function initStore() {
        let savedPerson = process.client && localStorage.getItem(ACCOUNT_STORAGE_KEY);
        changePerson(savedPerson ? JSON.parse(savedPerson) : '');

        if (store.person.id) {
            getPersonInfo()
        }
    }

    function registration(data) {
        let requestOptions = [HEADER_PARAMETERS.accept];
        const body = {
            email: data.email,
            password: data.password,
            name: data.name,
            password_confirmation: data.passwordConfirmation
        }
        return $fetch(`${MAIN_URL}/api/v1/register?${new URLSearchParams(body)}`, getRequestOptions('POST', requestOptions));
    }

    function loginIn(data) {
        let requestOptions = [HEADER_PARAMETERS.accept];
        const body = {
            email: data.email,
            password: data.password
        }
        return $fetch(`${MAIN_URL}/api/v1/login?${new URLSearchParams(body)}`, getRequestOptions('POST', requestOptions));
    }

    function logout() {
        let requestOptions = [HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization];
        $fetch(`${MAIN_URL}/api/v1/logout`, getRequestOptions('POST', requestOptions))
            .then(request => {
                if (request.status === 'success') {
                    changePerson({});
                    clearImages();
                    navigateTo('/');
                }
            })
            .catch(error => {
                changePerson({});
                clearImages();
                navigateTo('/');
            });
    }

    function getPersonInfo() {
        let requestOptions = [HEADER_PARAMETERS.authorization];
        $fetch(`${MAIN_URL}/api/v1/user/me`, getRequestOptions('GET', requestOptions))
            .then(response => {
                changePerson(personMapper(response.user, store.person.token));
                if (!response.user.email_verified_at) {
                    toggleAcceptDialog(true);
                    if (timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(() => getPersonInfo(), 5000);
                } else {
                    toggleAcceptDialog(false);
                }
            })
            .catch(error => {
                if (error.status === 401) {
                    changePerson({});
                    navigateTo('/');
                }
            })
    }

    function getPersonTransaction() {
        let requestOptions = [HEADER_PARAMETERS.authorization];
        return $fetch(`${MAIN_URL}/api/v1/user/transactions`, getRequestOptions('GET', requestOptions))
    }

    function getImageShared(id) {
        return imagesData.find(image => image.img === `${id}.jpeg`)
    }

    function getPersonGallery() {
        let requestOptions = [HEADER_PARAMETERS.authorization];
        if (imageStore.getImagePages > 1) {
            toggleShowMoreImages(false);
            toggleLoaderShowMoreImages(true)
        } else if (imageStore.getImagePages === 1) {
            toggleShowMainLoader(true);
        }
        $fetch(`${MAIN_URL}/api/v1/user/gallery?items_per_page=10&page=${imageStore.getImagePages}`, getRequestOptions('GET', requestOptions))
            .then(response => {
                if (response.status === 'success') {
                    addOldImages(response.images.data);
                    if (response.images.data.length) {
                        toggleSnackBarDone({isOpen: true, text: 'Изображения загружены'});
                    }
                    if (response.images.total > imageStore.images.length) {
                        changeImagePage();
                        toggleShowMoreImages(true);
                    } else {
                        toggleShowMoreImages(false);
                    }
                    toggleLoaderShowMoreImages(false);
                    toggleShowMainLoader(false);
                }
            })
            .catch(error => {
                if (error.status === 401) {
                    changePerson({});
                    navigateTo('/');

                }
            })
    }

    return {
        registration,
        loginIn,
        logout,
        getPersonInfo,
        initStore,
        getImageShared,
        getPersonTransaction,
        getPersonGallery
    };
}
