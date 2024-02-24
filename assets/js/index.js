
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


            // ----------- cart -------------\
            const cartaddBtn = document.querySelectorAll("#cart-add-btn")
            let amount = 0
            cartaddBtn.forEach(btn=>{
                btn.addEventListener("click", ()=>{
                    amount = JSON.parse(localStorage.getItem("amount")) + 1
                    localStorage.setItem("amount", amount)
                    cartAmount.innerHTML = localStorage.getItem("amount")
                })
            })
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

var isLight = true

if (localStorage.getItem("mode") === null) {
    localStorage.setItem("mode", "light")
} else {
    darkModeButtons.forEach(darkModeBtn => {
        darkModeBtn.addEventListener("click", () => {
            if (isLight) {
                darkContainers.forEach(container => {
                    container.classList.add("dark-mode")
                })
                isLight = false
                localStorage.setItem("mode", "dark")
            } else {
                darkContainers.forEach(container => {
                    container.classList.remove("dark-mode")
                })
                isLight = true
                localStorage.setItem("mode", "light")
            }
        })
    })
}

if (localStorage.getItem("mode") === "dark") {
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
            console.log(filterData);
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

// ------------ cart ------------

const cartAmount = document.querySelectorAll("#cart-amount")
cartAmount.forEach(cart => {
    cart.innerHTML = localStorage.getItem("amount")
})