const header = document.querySelector(".header-common"),
    footer = document.querySelector("footer"),
    mobileNav = document.querySelector(".mobile-nav")

let title = "";
switch (window.location.pathname) {
    case "/pages/blog.html":
        title = "Blog";
        break;
    case "/pages/cart.html":
        title = "Cart";
        break;
    case "/pages/contacts.html":
        title = "Contacts";

        break;
    case "/pages/details.html":
        title = "Details";

        break;
    case "/pages/faq.html":
        title = "FAQ";

        break;
    case "/pages/log-in.html":
        title = "Log In";
        break;
    case "/pages/my-account.html":
        title = "My Account";
        break;
    case "/pages/products.html":
        title = "Products";
        break;
    case "/pages/sign-up.html":
        title = "Sign Up";
        break;
    default:
        title = "";
}

header.innerHTML = `
<div class="background"></div>
        <section class="navigation py-3">
            <div class="background"></div>
            <div class="container">
                <div class="d-flex justify-content-between align-items-center">
                <div class="dark-mode-con position-absolute d-block d-xl-none">
                    <button class="brands d-flex justify-content-center align-items-center dark-mode-btn">
                        <i class="fa-solid fa-moon"></i>
                    </button>
                </div>
                    <div class="img-container">
                        <img src="../assets/images/kaffa_logo_light_2x.png" alt="">
                    </div>
                    <div class="hamburger-menu d-block d-xl-none">
                        <button id="hamburger-icon">
                            <span class="lines"></span>
                            <span class="lines"></span>
                            <span class="lines"></span>
                        </button>
                    </div>
                    <div style="gap: 40px;" class="d-none d-xl-flex align-items-center">
                        <ul class="d-flex gap-5 m-0">
                            <li><a class="active langdata" href="../index.html">Home <i class="fa-solid fa-chevron-left"
                                        aria-hidden="true"></i></a></li>
                            <li><a href="faq.html" class="langdata">FAQ <i class="fa-solid fa-chevron-left" aria-hidden="true"></i></a>
                            </li>
                            <li><a href="products.html" class="langdata">Products <i class="fa-solid fa-chevron-left"
                                        aria-hidden="true"></i></a></li>
                            <li><a href="blog.html" class="langdata">Blog <i class="fa-solid fa-chevron-left" aria-hidden="true"></i></a>
                            </li>
                            <li><a href="contacts.html" class="langdata">Contacts <i class="fa-solid fa-chevron-left"
                                        aria-hidden="true"></i></a></li>
                        </ul>
                        <div>
                            <i class="fa-solid fa-phone"></i>
                            <a href="tel:0905-456-987-3">0905-456-987-3</a>
                        </div>
                        <div class="d-none d-xl-flex gap-4 icons-right">
                            <button class="brands d-flex justify-content-center align-items-center dark-mode-btn">
                                <i class="fa-solid fa-moon"></i>
                            </button>
                            <div class="brands d-flex justify-content-center align-items-center">
                                <a href="../pages/log-in.html"><i class="fa-solid fa-user" aria-hidden="true"></i></a>
                            </div>
                            <div class="brands d-flex justify-content-center align-items-center">
                                <a href="../pages/cart.html"><i class="fa-solid fa-bag-shopping" aria-hidden="true"></i></a>
                                <div class="shopping-amount d-flex justify-content-center align-items-center">
                                    <p id="cart-amount2">0</p>
                                </div>
                            </div>
                            <div class="brands d-flex justify-content-center align-items-center">
                                <button class="lang-btn"><p>AZ</p></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="hero-section">
            <div class="container">
                <div class="d-none d-xl-block">
                    <p>Premium Coffee Market</p>
                </div>
                <div class="d-flex justify-content-center align-items-center flex-column hero-container gap-2">
                    <h1 class="langdata">
                    ${title}
                    </h1 ><p><span><a href="../index.html" class="langdata">Home</a></span> // ${title}</p>
                </div >
                <div class="icons d-none d-xl-flex flex-column gap-4">
                    <a href="#"><i class="fa-brands fa-twitter"></i></a>
                    <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="#"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#"><i class="fa-brands fa-youtube"></i></a>
                </div>
            </div >
        </section >
    `

footer.innerHTML = `
    <div class="background"></div>
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-6 col-xl-4">
                    <div class="img-container">
                        <img src="../assets/images/kaffa_logo_light_2x.png" alt="">
                    </div>
                    <p class="my-5">Etiam consequat sem ullamcorper, euismod
                        metus sit amet, tristique justo. Vestibulum
                        mattis, nisi ut.</p>
                    <div class="icons d-flex gap-5">
                        <i class="fa-brands fa-twitter"></i>
                        <i class="fa-brands fa-facebook-f"></i>
                        <i class="fa-brands fa-instagram"></i>
                        <i class="fa-brands fa-youtube"></i>
                    </div>
                </div>
                <div class="col-12 col-lg-6 col-xl-4 mt-5 mt-lg-0   ">
                    <h2 class="langdata">Contact Info</h2>
                    <div class="d-flex my-4 gap-3">
                        <div><i class="fa-solid fa-location-dot"></i></div>
                        <div>
                            <h6 class="langdata">Our location</h6>
                            <p>Rio de Janeiro, RJ Brazil, 04103 Route</p>
                        </div>
                    </div>
                    <div class="d-flex gap-3">
                        <div><i class="fa-solid fa-phone"></i></div>
                        <div>
                            <h6 class="langdata">Phones:</h6>
                            <div>
                                <a href="tel:+49078-039-23-11">
                                    +49078-039-23-11
                                </a>
                            </div>
                            <div>
                                <a href="tel:+49078-028-55-60">
                                    +49078-028-55-60
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 d-none d-xl-block col-xl-4">
                    <h2 class="langdata">Subscribe</h2>
                    <form class="mt-4" action="">
                        <div>
                            <input placeholder="Your email ..." class="email" type="email">
                                <button class="langdata">Subscribe</button>
                        </div>
                        <div class="mt-4">
                            <input type="checkbox">
                                <label for="" class="langdata">I have read and agree to the terms & conditions</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>`


