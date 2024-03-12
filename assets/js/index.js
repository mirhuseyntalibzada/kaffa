
// ------------ hamburger menu ------------

const hamburgerBtn = document.querySelector("#hamburger-icon");
const closeBtn = document.querySelectorAll(".icon-x");
const mobileSection = document.querySelector(".mobile");

if (hamburgerBtn && closeBtn.length > 0 && mobileSection) {
    closeBtn[0].addEventListener("click", () => {
        mobileSection.style.left = "100%";
    })

    hamburgerBtn.addEventListener("click", () => {
        mobileSection.style.left = "0px";
    })
}

// ------------ video ------------

const video = document.querySelector("#video")
const play = document.querySelector("#play")

if (closeBtn[1] && play) {
    closeBtn[1].addEventListener("click", () => {
        video.className = "video d-none"
    })

    play.addEventListener("click", () => {
        video.className = "video d-block"
    })
}

// ------------ api ------------

const itemContainer = document.querySelector("#products-row");

if (itemContainer) {
    fetch("../assets/api/data/kaffa.json")
        .then(res => res.json())
        .then(data => {
            let card = ''
            data.map(item => {
                card += `
            <div class="col-12 col-sm-6 col-xl-3">
                <div class="img-container">
                    <img src="${item.img}" alt="">
                </div>
                <div class="icons d-flex justify-content-center gap-1">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
                <div class="d-flex align-items-center flex-column">
                    <h5>${item.name}</h5>
                    <h5>${item.price}</h5>
                </div>
                <div class="add-btn d-flex justify-content-center d-xl-none">
                    <button>Add to cart</button>
                </div>
            </div>
            `
            })
            itemContainer.innerHTML = card
        })

        .catch(err => {
            console.log('Error', err)
        })
}


// ------------ accordion ------------

const accordion = document.querySelectorAll(".accordion-container");
const plusIcon = document.querySelectorAll("#plus-icon")

if (accordion) {
    for (let i = 0; i < accordion.length; i++) {
        accordion[i].addEventListener("click", () => {
            accordion[i].classList.toggle('active');
        })
    }
}

// ------------ shop-sidebar ------------

const shopSidebar = document.querySelector(".shop-sidebar"),
    btnOpen = document.querySelector(".sidebar-button"),
    btnClose = document.querySelector(".icon-x-shop")

if (shopSidebar && btnOpen && btnClose) {
    btnOpen.addEventListener("click", () => {
        shopSidebar.style.left = "0px"
    })

    btnClose.addEventListener("click", () => {
        shopSidebar.style.left = "-100%"
    })
}

// ------------ api - all products ------------

const productContainer = document.querySelector("#all-products-row");

if (productContainer) {
    fetch('../assets/api/data/kaffa-products.json')
        .then(res => res.json())
        .then(data => {
            const pagiBtns = document.querySelectorAll("#pagi-btn")

            function displayItems(start, end) {
                let card = ''
                data.slice(start, end).map(item => {
                    card += `
            <div class="col-12 col-sm-6 col-lg-4">
                <div class="img-container position-relative">
                    <div class="background"></div>
                    <img src="${item.img}" alt="">
                    <div class="d-flex flex-column row-gap-2">
                        <a href="details.html?id=${item.id}" target="_blank">Read More</a>
                        <a id="cart-add-btn" data-id="${item.id}">Add to Cart</a>
                    </div>
                </div>
                <div class="icons d-flex justify-content-center gap-1">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
                <div class="d-flex align-items-center flex-column">
                    <h5>${item.name}</h5>
                    <h5>$${item.price}</h5>
                </div>
            </div>
            `
                })
                productContainer.innerHTML = card;
                const cartBtn = document.querySelectorAll("#cart-add-btn");
                getItemID(cartBtn);
            }

            displayItems(0, 6);

            pagiBtns.forEach((btn, index) => {
                btn.addEventListener("click", () => {
                    const start = index * 6;
                    const end = start + 6;
                    displayItems(start, end);
                });
            });
        })

        .catch(err => {
            console.log('Error', err)
        })
}
// ------------ search ------------ 

if (productContainer) {
    fetch("../assets/api/data/kaffa-products.json")
        .then(res => res.json())
        .then(data => {

            const searchInput = document.querySelector("#search-product")
            const pagiBtns = document.querySelectorAll("#pagi-btn")

            searchInput.addEventListener("input", (e) => {
                const value = e.target.value.toLowerCase()
                const filteredProducts = data.filter(item => {
                    return item.name.toLowerCase().includes(value)
                })

                displayFilteredData(filteredProducts, value);
            })

            function displayFilteredData(filteredProducts) {
                function displayItems(start, end) {
                    let card = ''
                    filteredProducts.slice(start, end).map(item => {
                        card += `
                    <div class="col-12 col-sm-6 col-lg-4">
                        <div class="img-container position-relative">
                        <div class="background"></div>
                        <img src="${item.img}" alt="">
                        <div class="d-flex flex-column row-gap-2">
                        <a href="details.html?id=${item.id}" target="_blank">Read More</a>
                        <a id="cart-add-btn" >Add to Cart</a>
                    </div>
                    </div>
                    <div class="icons d-flex justify-content-center gap-1">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div class="d-flex align-items-center flex-column">
                        <h5>${item.name}</h5>
                        <h5>${item.price}</h5>
                    </div>
                </div>
                `
                    })
                    productContainer.innerHTML = card
                }
                displayItems(0, 6);

                pagiBtns.forEach((btn, index) => {
                    btn.addEventListener("click", () => {
                        const start = index * 6;
                        const end = start + 6;
                        displayItems(start, end);
                    });
                });
            }


        })

        .catch(err => {
            console.log('Error', err)
        })
}

// ------------ sign-up ------------

const signupBtn = document.querySelector("#sign-up-btn"),
    singupInput = document.querySelectorAll("#sign-up-input")

if (signupBtn) {
    signupBtn.addEventListener("click", (e) => {
        e.preventDefault()
        localStorage.setItem("name", singupInput[0].value)
        localStorage.setItem("email", singupInput[1].value)
        localStorage.setItem("password", singupInput[2].value)
        window.location.assign("log-in.html")
    })
}

// ------------ login ------------ 

const userData = {
    username: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    password: localStorage.getItem("password")
}

const loginInput = document.querySelectorAll("#log-in-input"),
    loginBtn = document.querySelector("#log-in-btn"),
    alertCont = document.querySelector(".alert-con")

if (loginInput && loginBtn && alertCont) {
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault()
        if ((loginInput[0].value === userData.username || loginInput[0].value === userData.email) && loginInput[1].value === userData.password) {
            alertCont.className = "alert-con success"
            alertCont.innerHTML = "<p>Success</p>"
            window.location.assign("my-account.html")
        }
        else {
            alertCont.className = "alert-con error"
            alertCont.innerHTML = "<p>Please, try again</p>"
        }
    })
}

// ------------ my-account ------------ 

const myaccountCon = document.querySelector("#my-account-main")

if (myaccountCon) {
    myaccountCon.innerHTML = `
    <div class='container'>
        <h1 class="mb-0">Welcome, ${localStorage.getItem("name")}</h1>
    </div>
    `
}

// ------------ contact ------------ 

const contactForm = document.getElementById('contact-form')

if (contactForm) {
    (function () {
        emailjs.init({
            publicKey: "oXFR7Wi59ZddU4-l-",
        });
    })();

    window.onload = function () {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            emailjs.sendForm('service_x07w339', 'template_467t0s8', this)
                .then(() => {
                    console.log('SUCCESS!');
                }, (error) => {
                    console.log('FAILED...', error);
                });
        });
    }
}

// ------------ dark-mode ------------ 

const darkContainers = document.querySelectorAll(".dark-con")
const darkModeButtons = document.querySelectorAll(".dark-mode-btn")

if (localStorage.getItem("mode") === null) {
    localStorage.setItem("mode", "light")
} else {
    darkModeButtons.forEach(darkModeBtn => {
        darkModeBtn.addEventListener("click", () => {
            if (localStorage.getItem("mode") == "light") {
                darkContainers.forEach(container => {
                    container.classList.add("dark-mode")
                })
                localStorage.setItem("mode", "dark")
            } else {
                darkContainers.forEach(container => {
                    container.classList.remove("dark-mode")
                })
                localStorage.setItem("mode", "light")
            }
        })
    })
}

if (localStorage.getItem("mode") == "dark") {
    darkContainers.forEach(container => {
        container.classList.add("dark-mode")
    })
} else {
    darkContainers.forEach(container => {
        container.classList.remove("dark-mode")
    })
}

// ------------ details ------------ 

const details = document.querySelector("#details")

if (details) {
    fetch("../assets/api/data/kaffa-products.json")
        .then(res => res.json())
        .then(data => {
            const urlid = location.href.slice(44, 99);
            const filterData = data.filter(p => p.id == urlid);
            let card = `
            <div class="col-12 col-md-8 align-self-center">
                <h1 class="text-center text-md-start">${filterData[0].name}</h1>
                <p class="my-3 my-lg-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium sequi saepe porro tenetur, doloremque rerum
                impedit voluptatem fugit fugiat eveniet totam esse? Molestiae repellat blanditiis numquam, eligendi excepturi sint
                nostrum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium sequi saepe porro tenetur, doloremque rerum
                impedit voluptatem fugit fugiat eveniet totam esse? Molestiae repellat blanditiis numquam, eligendi excepturi sint
                nostrum</p>
                <div class="d-flex column-gap-5 align-items-center justify-content-center justify-content-md-start mb-4 mb-md-0">
                    <button>Add to Cart</button>
                    <p class="price">${filterData[0].price}</p>
                </div>
            </div>
            <div class="col-12 col-md-4 align-self-center">
                <div class="img-container">
                    <img src="${filterData[0].img}">
                <div>
            </div>
            `
            details.innerHTML = card
        })

        .catch(err => {
            console.log('Error', err)
        })
}

// ------------ loading ------------

if (document.querySelector('.loading')) {
    setTimeout(() => {
        document.querySelector('.loading').style.display = "none";
        document.querySelectorAll('#loading-pages').forEach(page => page.style.display = "block")
    }, 1000);
}

// ---------- language -------------

const langData = document.querySelectorAll(".langdata"),
    langBtn = document.querySelector(".lang-btn")

if (window.location.pathname === "/index.html") {
    let dataLang = {
        eng: ["Home", "FAQ", "Products", "Blog", "Contacts", "Follow us", `Home <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Products <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Blog <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Contacts <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "Natural", "Brazilian Coffee", "Arabica & Robusta",
            "Exclusive Planted Coffee", "Download price", "Read more", "Shop now", "Arabica Green", "Arabica Roasted", "Robusta Roasted", "Mixed Sorts",
            "Divine", "Aroma <br> in Every Cup", "Read More", "Pure Grades", "Wide Assortment", "Proper Roasting", "High Quality", "Excellent Grinding",
            "Awesome Aroma", "How we Prepare our Beans", "Watch Video", "Read more", "Selected Varieties", "Hectares of Plantations", "Coffee Pickers",
            "Consumer Countries", "Online Store", "Popular Products", "Ethiopia Arabica", "Pure Grade", "Amazing Vanilla Aroma", "Strong Roasting",
            "Ultra Grinding", "Add to cart", "More info", "Online Store", "Contact Info", "Our location", "Phones:", "Subscribe", "Subscribe",
            "I have read and agree to the terms & conditions"],
        az: ["Ana Səhifə", "FAQ", "Məhsullar", "Məqalə", "Kontanklar", "Bizi İzləyin", `Ana Səhifə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Məhsullar <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Məqalə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Əlaqə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "Təbii", "Braziliya Kofesi", "Arabika və Robusta",
            "Ekskluziv Yetişmiş Kofe", "Qiyməti Yükləyin", "Daha çox", "İndi alın", "Yaşıl Arabika", "Qızardılmış Arabika", "Qızardılmış Robusta", "Qarışıq Növlər",
            "Hər fincanda", "Mükəmməl <br> Dad", "Daha çox", "Əla Növ", "Geniş çeşidlənmə", "Düzgün Qızarma", "Yüksək Keyfiyyət", "Mükəmməl Üyüdülmə",
            "Mükəmməl Aroma", "Kofelərimiz Necə Hazırlanır", "Videoyu İzləyin", "Daha çox", "Seçilmiş Növ", "Hektar Plantasiya", "Kofe Mütəxəssisləri",
            "İstehlakçı Ölkə", "Onlayn Mağaza", "Populyar Məhsullar", "Efiopiya Arabika", '<i class="fa-solid fa-check"></i> Əla növ', '<i class="fa-solid fa-check"></i>Mükəmməl Vanil Aroması', '<i class="fa-solid fa-check"></i> Düzgün Qızardılma',
            '<i class="fa-solid fa-check"></i> Ultra Üyüdülmə', "Səbətə Əlavə Edin", "Daha çox info", "Onlayn Mağaza", "Kontakt İnfo", "Ünvanımız", "Telefonlar:", "Abunə olun", "Abunə olun",
            "Şərtləri və qaydaları oxudum və qəbul edirəm"]
    }
    language(dataLang)
} else if (window.location.pathname === "/pages/faq.html") {
    let dataLang = {
        eng: ["Home", "FAQ", "Products", "Blog", "Contacts", `Home <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Products <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Blog <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Contacts <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "FAQ", "Home", "Every day we help for our customers", "Managment", "Analytics", "Consultation", "Engineering", "If you need more help", "Read More",
            "Is it possible to pay for an order with Visa and MasterCard payment cards?", "Is it possible to pay by credit card?",
            "What payment methods exist in your company?", "Can I return the product after purchase?", "How do I use a promotional code?",
            "What is the validity period of the gift certificate?", "What if the prepaid goods are not delivered?", "Where and how can I exchange or refund?",
            "Is it possible to pay for an order with Visa and MasterCard payment cards?", "Is it possible to pay by credit card?", "What payment methods exist in your company?",
            "Can I return the product after purchase?", "Contact Info", "Our location", "Phones:", "Subscribe", "Subscribe",
            "I have read and agree to the terms & conditions"],
        az: ["Ana Səhifə", "FAQ", "Məhsullar", "Məqalə", "Əlaqə", `Ana Səhifə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Məhsullar <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Məqalə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Əlaqə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "Tez-Tez Verilən Suallar", "Ana Səhifə", "Hər gün müştərilərimizə yardım edirik", "İdarəetmə", "Analitika", "Konsultasiya", "Mühəndislik", "Yardıma ehtiyacınız olarsa", "Daha Ətraflı",
            "Visa və Mastercard ödəniş kartları ilə sifarişi ödəmək mümkündür?", "Kredit kartı ilə ödəniş mümkündürmü?",
            "Şirkətinizdə hansı ödəniş üsulları mövcuddur?", "Məhsulu satın aldıqdan sonra geri qaytarmaq mümkündürmü?", "Promo kodu necə istifadə edə bilərəm?",
            "Hədiyyə sertifikatının etibarlılıq müddəti nə qədərdir?", "Əvvəlcədən ödənişi edilmiş məhsullar çatdırılmazsa nə etməli?", "Harada və necə məhsulu dəyişdirə və ya geri qaytara bilərəm?",
            "Visa və Mastercard ödəniş kartları ilə sifarişi ödəmək mümkündürmü?", "Kredit kartı ilə ödəniş mümkündürmü?", "Şirkətinizdə hansı ödəniş üsulları mövcuddur?",
            "Məhsulu satın aldıqdan sonra geri qaytarmaq mümkündürmü?", "Kontakt İnfo", "Ünvanımız", "Telefonlar:", "Abunə olun", "Abunə olun",
            "Şərtləri və qaydaları oxudum və qəbul edirəm"]
    }
    language(dataLang)
} else if (window.location.pathname === "/pages/products.html") {
    let dataLang = {
        eng: ["Home", "FAQ", "Products", "Blog", "Contacts", `Home <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Products <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Blog <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Contacts <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "Products", "Home", "PRODUCT CATEGORIES", "Arabica Green", "Arabica Roasted", "Black Coffee", "Mixed Sorts", "Products", "Bakery & Sweets",
            "Black & Green Tea", "Cakes", "Chocolate", "Coffee Drinks", "Fresh Croissants", "Sandwiches", "Sweet Cookies",
            "Robusta Roasted", "PRODUCT TAGS", "arabica", "chocolate", "coffee", "delivery", "espresso", "Showing 1-6 of 19 results",
            "Default sorting", "Sort by popularity", "Sort by average rating", "Sort by latest", "Sort by price: low to high", "Sort by price: high to low",
            "Contact Info", "Our location", "Phones:", "Subscribe", "Subscribe",
            "I have read and agree to the terms & conditions"],
        az: ["Ana Səhifə", "FAQ", "Məhsullar", "Məqalə", "Əlaqə", `Ana Səhifə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Məhsullar <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Məqalə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Əlaqə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "Məhsullar", "Ana Səhifə", "MƏHSUL KATEQORİYASI", "Yaşıl Arabika", "Qızarmış Arabika", "Qara Kofe", "Qarışıq Növlər", "Məhsullar", "Şirniyyatlar",
            "Qara & Yaşıl Çay", "Tortlar", "Şokolad", "Kofe İçkiləri", "Təzə Kruvasanlar", "Sendviçlər", "Şirin Peçenyelər",
            "Qızarmış Robusta", "MƏHSUL TEQLƏRİ", "arabika", "şokolad", "kofe", "çatdırılma", "espresso", "19 nəticədən 1-6 arası göstərilir",
            "Varsayılan çeşidləmə", "Populyarlığa görə çeşidləmə", "Ortalama reytinqə görə çeşidləmə", "Sonuncuya görə çeşidləmə", "Qiymətə görə çeşidləmə: azdan çoxa",
            "Qiymətə görə çeşidləmə: çoxdan aza", "Kontakt İnfo", "Ünvanımız", "Telefonlar:", "Abunə olun", "Abunə olun",
            "Şərtləri və qaydaları oxudum və qəbul edirəm"]
    }
    language(dataLang)
} else if (window.location.pathname === "/pages/blog.html") {
    let dataLang = {
        eng: ["Home", "FAQ", "Products", "Blog", "Contacts", `Home <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Products <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Blog <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Contacts <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "Blog", "Home", "<span>Roasted coffee</span>", "Coffee Machine Rental and Delivery Business", "February 12, 2024", "<span>Roasted coffee</span>", "The Most Expensive Cup of Coffee in the USA", "February 12, 2024", "Contact Info", "Our location", "Phones:", "Subscribe", "Subscribe",
            "I have read and agree to the terms & conditions"],
        az: ["Ana Səhifə", "FAQ", "Məhsullar", "Məqalə", "Əlaqə", `Ana Səhifə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Məhsullar <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Məqalə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Əlaqə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "Məqalə", "Ana Səhifə", "<span>Qızadılmış kofe</span>", "Qəhvə Maşınlarının İcarəsi və Çatdırılması Biznesi", "12 Fevral, 2024", "<span>Qızadılmış kofe</span>", "ABŞ-ın ən bahalı qəhvəsi", "12 Fevral, 2024", "Kontakt İnfo", "Ünvanımız", "Telefonlar:", "Abunə olun", "Abunə olun",
            "Şərtləri və qaydaları oxudum və qəbul edirəm"]
    }
    language(dataLang)
} else if (window.location.pathname === "/pages/contacts.html") {
    let dataLang = {
        eng: ["Home", "FAQ", "Products", "Blog", "Contacts", `Home <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Products <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Blog <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Contacts <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "Contacts", "Home", "Location", "29 Nicolas str, New York, 987597-50", "Phones", "Email", "Working Hours", "Wednesday - Sunday", "7:00 AM - 5:00 PM",
            "Send Message", "Contact Info", "Our location", "Phones:", "Subscribe", "Subscribe",
            "I have read and agree to the terms & conditions"],
        az: ["Ana Səhifə", "FAQ", "Məhsullar", "Məqalə", "Əlaqə", `Ana Səhifə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Məhsullar <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Məqalə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Əlaqə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "Əlaqə", "Ana Səhifə", "Ünvan", "29 Nikolas küç, Nyu York, 987597-50", "Telefon", "Elektron Poçt", "İşləmə Saatları", "Çərşənbə - Bazar", "07:00 - 17:00",
            "Mesaj Göndərin", "Kontakt İnfo", "Ünvanımız", "Telefonlar:", "Abunə olun", "Abunə olun",
            "Şərtləri və qaydaları oxudum və qəbul edirəm"]
    }
    language(dataLang)
} else if (window.location.pathname === "/pages/details.html") {
    let dataLang = {
        eng: ["Home", "FAQ", "Products", "Blog", "Contacts", `Home <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Products <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Blog <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Contacts <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "Details", "Home", "Contact Info", "Our location", "Phones:", "Subscribe", "Subscribe",
            "I have read and agree to the terms & conditions"],
        az: ["Ana Səhifə", "FAQ", "Məhsullar", "Məqalə", "Əlaqə", `Ana Səhifə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Məhsullar <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Məqalə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Əlaqə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "Təfərrüatlar", "Ana Səhifə", "Kontakt İnfo", "Ünvanımız", "Telefonlar:", "Abunə olun", "Abunə olun",
            "Şərtləri və qaydaları oxudum və qəbul edirəm"]
    }
    language(dataLang)
} else if (window.location.pathname === "/pages/cart.html") {
    let dataLang = {
        eng: ["Home", "FAQ", "Products", "Blog", "Contacts", `Home <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Products <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Blog <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Contacts <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "Cart", "Home", "Contact Info", "Our location", "Phones:", "Subscribe", "Subscribe",
            "I have read and agree to the terms & conditions"],
        az: ["Ana Səhifə", "FAQ", "Məhsullar", "Məqalə", "Əlaqə", `Ana Səhifə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Məhsullar <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Məqalə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Əlaqə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "Səbət", "Ana Səhifə", "Kontakt İnfo", "Ünvanımız", "Telefonlar:", "Abunə olun", "Abunə olun",
            "Şərtləri və qaydaları oxudum və qəbul edirəm"]
    }
    language(dataLang)
} else if (window.location.pathname === "/pages/log-in.html") {
    let dataLang = {
        eng: ["Home", "FAQ", "Products", "Blog", "Contacts", `Home <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Products <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Blog <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Contacts <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "Log In", "Home", "Login", "Username or email address <span>*</span>", "Password <span>*</span>", "Log in", "Sign up", "Remember me",
            "Lost your password?", "Contact Info", "Our location", "Phones:", "Subscribe", "Subscribe",
            "I have read and agree to the terms & conditions"],
        az: ["Ana Səhifə", "FAQ", "Məhsullar", "Məqalə", "Əlaqə", `Ana Səhifə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Məhsullar <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Məqalə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Əlaqə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "Daxil olun", "Ana Səhifə", "Daxil olun", "İstifadəçi adı və ya e-mail <span>*</span>", "Şifrə <span>*</span>", "Daxil olun", "Qeydiyyatdan keçin",
            "Yadda saxla", "Şifrənizi unutmusunuz?", "Kontakt İnfo", "Ünvanımız", "Telefonlar:", "Abunə olun", "Abunə olun",
            "Şərtləri və qaydaları oxudum və qəbul edirəm"]
    }
    language(dataLang)
} else if (window.location.pathname === "/pages/sign-up.html") {
    let dataLang = {
        eng: ["Home", "FAQ", "Products", "Blog", "Contacts", `Home <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Products <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Blog <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Contacts <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "Sign Up", "Home", "Sign up", "Username <span>*</span>", "Email <span>*</span>", "Password <span>*</span>", "Sign up", "Remember me", "Contact Info", "Our location", "Phones:", "Subscribe", "Subscribe",
            "I have read and agree to the terms & conditions"],
        az: ["Ana Səhifə", "FAQ", "Məhsullar", "Məqalə", "Əlaqə", `Ana Səhifə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Məhsullar <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Məqalə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Əlaqə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "Qeydiyyat", "Ana Səhifə", "Qeydiyyat", "İstifadəçi adı <span>*</span>", "E-mail <span>*</span>", "Şifrə <span>*</span>", "Qeydiyyatdan keç", "Yadda saxla", "Kontakt İnfo", "Ünvanımız", "Telefonlar:", "Abunə olun", "Abunə olun",
            "Şərtləri və qaydaları oxudum və qəbul edirəm"]
    }
    language(dataLang)
} else if (window.location.pathname === "/pages/my-account.html") {
    let dataLang = {
        eng: ["Home", "FAQ", "Products", "Blog", "Contacts", `Home <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Products <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Blog <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Contacts <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "My Account", "Home", "Contact Info", "Our location", "Phones:", "Subscribe", "Subscribe",
            "I have read and agree to the terms & conditions"],
        az: ["Ana Səhifə", "FAQ", "Məhsullar", "Məqalə", "Əlaqə", `Ana Səhifə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Məhsullar <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Məqalə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Əlaqə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "Hesabım", "Ana Səhifə", "Kontakt İnfo", "Ünvanımız", "Telefonlar:", "Abunə olun", "Abunə olun",
            "Şərtləri və qaydaları oxudum və qəbul edirəm"]
    }
    language(dataLang)
}

function language(dataArray) {
    if (localStorage.getItem("lang") === null) {
        localStorage.setItem("lang", "eng")
    } else {
        langBtn.addEventListener("click", () => {
            if (langBtn.innerHTML == "<p>AZ</p>") {
                langBtn.innerHTML = `<p>EN</p>`
                langData.forEach((data, index) => {
                    data.innerHTML = dataArray.az[index]
                })
                localStorage.setItem("lang", "az")
            } else {
                langBtn.innerHTML = `<p>AZ</p>`
                langData.forEach((data, index) => {
                    data.innerHTML = dataArray.eng[index]
                })
                localStorage.setItem("lang", "eng")
            }
        })
    }

    if (localStorage.getItem("lang") === "az") {
        langBtn.innerHTML = `<p>EN</p>`
        langData.forEach((data, index) => {
            data.innerHTML = dataArray.az[index]
        })
    } else {
        langBtn.innerHTML = `<p>AZ</p>`
        langData.forEach((data, index) => {
            data.innerHTML = dataArray.eng[index]
        })
    }
}

// ---------- addToCart -------------
let cart = []

const getItemID = (cartBtn) => {
    cartBtn.forEach(btn => (
        btn.addEventListener("click", () => {
            let product_id = btn.getAttribute("data-id")
            addToCart(product_id)
        })
    ))
}

const addToCart = (product_id) => {
    let positionOfItemCart = cart.findIndex((value) => value.product_id == product_id)
    if (cart <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }]
    } else if (positionOfItemCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        })
    } else {
        cart[positionOfItemCart].quantity += 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    getCart(cart)
}

const alertCart = document.querySelector("#alert")
const table = document.querySelector("#table-cont")
const btnShop = document.querySelector("#button-shop")
const checkout = document.querySelector("#checkout")

if (alertCart && table && btnShop) {
    if (JSON.parse(localStorage.getItem("cart")) === null) {
        alertCart.innerHTML = `<div>
                                    <p class="dark-p langdata">Your cart is currently empty.</p>
                                </div>`
        table.innerHTML = ``
        btnShop.innerHTML = `<button class="mt-4"><a href="../pages/products.html" class="langdata">Return to shop</a></button>`
    } else {
        alertCart.innerHTML = ``
        table.innerHTML = `<thead>
        <tr>
            <td colspan="3">PRODUCTS</td>
            <td>PRICE</td>
            <td>QUANTITY</td>
            <td>SUBTOTAL</td>
        </tr>
        </thead>
            <tbody class="cart-item-container">
        </tbody>`
        btnShop.innerHTML = ``
        checkout.innerHTML = `
        <a href="checkout.html">Proceed to checkout</a>
        `
    }
}


const cartCon = document.querySelector(".cart-item-container")
if (cartCon) {
    fetch('../assets/api/data/kaffa-products.json')
        .then(res => res.json())
        .then(data => {
            let newCart = ``
            JSON.parse(localStorage.getItem("cart")).map(cart => {
                data.forEach(item => {
                    if (cart.product_id == item.id) {
                        newCart += `
                        <tr>
                            <td style="width: 3em;">
                                <a href="#" class="remove delete" data-id=${item.id} style="width: 3em;">x</a>
                            </td>
                            <td style="width: 4em;">
                                <img style="width: 100%;" src="${item.img}" alt="">
                            </td>
                            <td>${item.name}</td>
                            <td>$${item.price}</td>
                            <td><input id="price" type="number" value="${cart.quantity}"></td>
                            <td>$${Math.round((Number(item.price) * cart.quantity) * 100) / 100}</td>
                        </tr>`
                    }
                })
            })
            cartCon.innerHTML = newCart
        })

        .catch(err => {
            console.log('Error', err)
        })
}


const cartAmount = document.querySelector("#cart-amount")
const cartAmount2 = document.querySelector("#cart-amount2")
const getCart = (cart) => {
    let cartItemCount = 0
    cart.map(cart => {
        console.log(cart.quantity);
        cartItemCount += cart.quantity
    })
    localStorage.setItem("amount", cartItemCount)
    cartAmount.innerHTML = cartItemCount
    cartAmount2.innerHTML = cartItemCount
}
cartAmount.innerHTML = localStorage.getItem("amount")
cartAmount2.innerHTML = localStorage.getItem("amount")


// ---------- checkout - accordion -------------

const radioBtn = document.querySelectorAll(".payment-radio")
const accordionCont = document.querySelectorAll(".accordion-content")

if (radioBtn && accordionCont) {
    for (let i = 0; i < radioBtn.length; i++) {
        radioBtn[i].addEventListener("click", () => {
            if (!accordionCont[i].classList.contains('active')) {
                closeAllCont()
                accordionCont[i].classList.add('active');
            }
        })
    }

    closeAllCont = () => {
        accordionCont.forEach(cont => {
            cont.classList.remove('active')
        })
    }
}

// ---------- checkout -------------

const tbodyCont = document.querySelector(".checkout-tbody"),
    tfootCont = document.querySelector(".checkout-tfoot")

if (tbodyCont && tfootCont) {
    fetch('../assets/api/data/kaffa-products.json')
        .then(res => res.json())
        .then(data => {
            let newBodyCart = ``,
                newFootCart = ``
            let totalSum = 0;
            JSON.parse(localStorage.getItem("cart")).map(cart => {
                data.forEach(item => {
                    if (cart.product_id == item.id) {
                        totalSum += Number(item.price) * cart.quantity
                        newBodyCart += `
                        <tr>
                            <td>${item.name} × ${cart.quantity}</td>
                            <td>$${Math.round((Number(item.price) * cart.quantity) * 100) / 100}</td>
                        </tr>`
                        newFootCart = `
                        <tr>
                            <th style="text-align: right;">Subtotal</th>
                            <td>$${Math.round((totalSum) * 100) / 100}</td>
                        </tr>
                        <tr>
                            <th style="text-align: right;">Total</th>
                            <td>$${Math.round((totalSum) * 100) / 100}</td>
                        </tr>
                        `
                    }
                })
            })
            tbodyCont.innerHTML = newBodyCart
            tfootCont.innerHTML = newFootCart
        })

        .catch(err => {
            console.log('Error', err)
        })
}