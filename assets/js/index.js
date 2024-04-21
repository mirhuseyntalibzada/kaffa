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
                        <h5>${item.price}</h5>
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
            }


        })

        .catch(err => {
            console.log('Error', err)
        })
}

// ------------ sign-up ------------

const signupBtn = document.querySelector("#sign-up-btn"),
    singupInput = document.querySelectorAll("#sign-up-input"),
    loginInput = document.querySelectorAll("#log-in-input"),
    loginBtn = document.querySelector("#log-in-btn"),
    alertCont = document.querySelector(".alert-con")

if (signupBtn) {
    signupBtn.addEventListener("click", (e) => {
        e.preventDefault()
        if (singupInput[0].value && singupInput[1].value && singupInput[2].value && singupInput[3].value && singupInput[4].value) {
            localStorage.setItem("fisrtname", singupInput[0].value)
            localStorage.setItem("lastname", singupInput[1].value)
            localStorage.setItem("username", singupInput[2].value)
            localStorage.setItem("email", singupInput[3].value)
            localStorage.setItem("password", singupInput[4].value)
            window.location.assign("log-in.html")
        } else {
            alertCont.className = "alert-con error"
            alertCont.innerHTML = "<p>Please enter your Username, Email and Password</p>"
        }
    })
}

// ------------ login ------------ 

const userData = {
    fisrtname: localStorage.getItem("fisrtname"),
    lastname: localStorage.getItem("lastname"),
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    password: localStorage.getItem("password")
}

if (loginInput && loginBtn && alertCont) {
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault()
        if ((loginInput[0].value === userData.username || loginInput[0].value === userData.email) && loginInput[1].value === userData.password) {
            alertCont.className = "alert-con success"
            alertCont.innerHTML = "<p>Success</p>"
            window.location.assign("my-account.html")
            localStorage.setItem("logged-in", true)
        }
        else {
            alertCont.className = "alert-con error"
            alertCont.innerHTML = "<p>Please, try again</p>"
        }
    })
}

const myAccBtn = document.querySelector(".my-account-btn")

if (window.location.pathname === "/index.html") {
    if (localStorage.getItem("logged-in") === null) {
        myAccBtn.innerHTML = '<a href="pages/log-in.html"><i class="fa-solid fa-user"></i></a>'
    } else {
        myAccBtn.innerHTML = '<a href="pages/my-account.html"><i class="fa-solid fa-user"></i></a>'
    }
    console.log(myAccBtn);
}

// ------------ my-account ------------ 

const myaccountCon = document.querySelector("#my-account-main")

if (myaccountCon) {
    myaccountCon.innerHTML = `
    <div class="container">
    <div class="row">
        <div class="col-12 col-md-4">
            <div style="margin-bottom: 20px;padding: 20px;"
                class="d-flex flex-column align-items-center justify-content-center">
                <div class="img-container" style="width: 30%">
                    <img
                        src="../assets/images/logo.png" />
                </div>
                <div>
                    <h2 class="m-0">${localStorage.getItem("username")}</h2>
                </div>
            </div>
            <div class="d-flex flex-column account-sidebar">
                <button id="btn" style="padding: 20px;" class="text-start active">
                    <a><i class="fa-solid fa-user"></i> Account Details</a>
                </button>
                <button id="btn" style="padding: 20px;" class="text-start">
                    <a><i class="fa-solid fa-key"></i> Change Password</a>
                </button>
                <button id="btn" style="padding: 20px;" class="text-start">
                    <a><i class="fa-solid fa-ticket"></i> My Orders</a>
                </button>
                <button id="btn" style="padding: 20px;" class="text-start">
                    <a><i class="fa-regular fa-credit-card"></i> Payment Methods</a>
                </button>
                <button id="btn" style="padding: 20px;" class="text-start">
                    <a><i class="fa-solid fa-circle-info"></i> Need Help</a>
                </button>
                <button id="btn" style="padding: 20px;" class="log-out text-start">
                    <a><i class="fa-solid fa-door-open"></i> Log out</a>
                </button>
            </div>
        </div>
        <div class="col-12 col-md-8">
            <div>
                <h1>Account Details</h1>
            </div>
            <form class="mt-5" action="">
                <div class="d-flex flex-column">
                    <div class="mb-2">
                        <h6>User Name</h6>
                        <input style="width: 100%; padding: 15px 10px;" value="${localStorage.getItem("username")}" type="text" name="" id="" readonly>
                    </div>
                    <div class="mb-2">
                        <h6>First Name</h6>
                        <input style="width: 100%; padding: 15px 10px;" value="${localStorage.getItem("fisrtname")}" type="text" name="" id="" readonly>
                    </div>
                    <div class="mb-2">
                        <h6>Last Name</h6>
                        <input style="width: 100%; padding: 15px 10px;" value="${localStorage.getItem("lastname")}" type="text" name="" id="" readonly>
                    </div>
                    <div>
                    <h6>Your Email</h6>
                    <input style="width: 100%; padding: 15px 10px;" value="${localStorage.getItem("email")}" type="text" name="" id="" readonly>
                </div>
                </div>
            </form>
        </div>
    </div>
</div>
    `
    const logOutBtn = document.querySelector(".log-out")

    logOutBtn.addEventListener("click", () => {
        localStorage.removeItem("logged-in")
        window.location.assign("log-in.html")
    })
}


if (myaccountCon) {
    const btn = document.querySelectorAll("#btn");

    const closeAllBtn = (clickedBtn) => {
        btn.forEach(btn => {
            if (btn !== clickedBtn) {
                btn.classList.remove("active");
            }
        });
    };

    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", () => {
            closeAllBtn(btn[i]);
            btn[i].classList.add("active");
        });
    }
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
                    <button id="cart-add-btn" data-id="${filterData[0].id}">Add to Cart</button>
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
            const cartBtn = document.querySelectorAll("#cart-add-btn");
            getItemID(cartBtn);
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
            "Sign Up", "Home", "Sign up", "First Name <span>*</span>", "Last Name <span>*</span>", "Username <span>*</span>", "Email <span>*</span>", "Password <span>*</span>", "Sign up", "Remember me", "Contact Info", "Our location", "Phones:", "Subscribe", "Subscribe",
            "I have read and agree to the terms & conditions"],
        az: ["Ana Səhifə", "FAQ", "Məhsullar", "Məqalə", "Əlaqə", `Ana Səhifə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Məhsullar <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            `Məqalə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`, `Əlaqə <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>`,
            "Qeydiyyat", "Ana Səhifə", "Qeydiyyat", "Ad <span>*</span>", "Soyad <span>*</span>", "İstifadəçi adı <span>*</span>", "E-mail <span>*</span>", "Şifrə <span>*</span>", "Qeydiyyatdan keç", "Yadda saxla", "Kontakt İnfo", "Ünvanımız", "Telefonlar:", "Abunə olun", "Abunə olun",
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

const getBtnID = (btnID) => {
    btnID.forEach(btn => {
        btn.addEventListener("click", () => {
            let product_id = btn.getAttribute("data-id")
            deleteFromCard(product_id)
        })
    })
}

const deleteFromCard = (product_id) => {
    let positionOfItemCart = cart.findIndex((value) => value.product_id == product_id)
    if (cart[positionOfItemCart].quantity === 1) {
        cart.pop({
            product_id: product_id,
            quantity: 1
        })
    } else {
        cart[positionOfItemCart].quantity -= 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    getCart(cart)
    window.location.reload()

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

if (localStorage.getItem("cart") === null) {
    cart = []
} else {
    cart = JSON.parse(localStorage.getItem("cart"))
}

const alertCart = document.querySelectorAll("#alert")
const table = document.querySelector("#table-cont")
const tableMobile = document.querySelector("#table-cont-mobile")
const btnShop = document.querySelectorAll("#button-shop")
const checkout = document.querySelectorAll("#checkout")

if (alertCart && table && btnShop) {
    if (localStorage.getItem("cart") === null || JSON.parse(localStorage.getItem("cart")).length === 0) {
        alertCart.forEach(cont => {
            cont.innerHTML = `<div>
            <p class="dark-p langdata">Your cart is currently empty.</p>
        </div>`
        })
        table.innerHTML = ``
        tableMobile.innerHTML = ''
        btnShop.forEach(btn => {
            btn.innerHTML = `<button class="mt-4"><a href="../pages/products.html" class="langdata">Return to shop</a></button>`
        })
    } else {
        alertCart.forEach(cont => {
            cont.innerHTML = ``
        })
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
        tableMobile.innerHTML = `<tbody class="cart-item-container-mob"></tbody>`
        btnShop.forEach(btn => {
            btn.innerHTML = ``
        })
        checkout.forEach(btn => {
            btn.innerHTML = `
            <a class='clear-btn' href="#">Clear</a>
            <a href="checkout.html">Proceed to checkout</a>
            `
        })

        const clearBtn = document.querySelectorAll('.clear-btn')

        clearBtn.forEach(btn => {
            btn.addEventListener("click", () => {
                localStorage.removeItem("cart")
                window.location.reload()
            })
        })
    }

}

const cartCon = document.querySelector(".cart-item-container")
const cartConMobile = document.querySelector(".cart-item-container-mob")
if (cartCon) {
    fetch('../assets/api/data/kaffa-products.json')
        .then(res => res.json())
        .then(data => {
            let newCart = ``
            let newCartMob = ``
            JSON.parse(localStorage.getItem("cart")).map(cart => {
                data.forEach(item => {
                    if (cart.product_id == item.id) {
                        newCart += `
                        <tr>
                            <td style="width: 3em;">
                                <a href="#!" class="remove-btn remove delete" data-id=${cart.product_id} style="width: 3em;">x</a>
                            </td>
                            <td style="width: 4em;">
                                <img style="width: 100%;" src="${item.img}" alt="">
                            </td>
                            <td>${item.name}</td>
                            <td>$${item.price}</td>
                            <td><input id="price" type="text" value="${cart.quantity}" readonly></td>
                            <td>$${Math.round((Number(item.price) * cart.quantity) * 100) / 100}</td>
                        </tr>`

                    }
                })
            })
            JSON.parse(localStorage.getItem("cart")).map(cart => {
                data.forEach(item => {
                    if (cart.product_id == item.id) {
                        newCartMob += `
                    <tr>
                    <th></th>
                    <td style="text-align: right;">
                        <a href="#!" data-id=${cart.product_id} class="remove-btn remove delete">x</a>
                    </td>
                    </tr>
                    <tr>
                        <th>Product:</th>
                        <td style="text-align: right;">${item.name}</td>
                    </tr>
                    <tr>
                        <th>Price:</th>
                        <td style="text-align: right;">$${item.price}</td>
                    </tr>
                    <tr>
                        <th>Quantity:</th>
                        <td style="text-align: right;"><input id="price" type="text" value="${cart.quantity}"></td>
                    </tr>
                    <tr class="last-tr">
                        <th>Subtotal:</th>
                        <td style="text-align: right;">$${Math.round((Number(item.price) * cart.quantity) * 100) / 100}</td>
                    </tr>`
                    }
                })
            })
            cartCon.innerHTML = newCart
            cartConMobile.innerHTML = newCartMob
            const btnID = document.querySelectorAll(".remove-btn")
            getBtnID(btnID)
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
        cartItemCount += cart.quantity
    })
    cartAmount.innerHTML = cartItemCount
    cartAmount2.innerHTML = cartItemCount
    localStorage.setItem("amount", cartItemCount)
}
if (localStorage.getItem("cart") === null) {
    cartAmount.innerHTML = 0
    cartAmount2.innerHTML = 0
} else {
    cartAmount.innerHTML = localStorage.getItem("amount")
    cartAmount2.innerHTML = localStorage.getItem("amount")
}


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
