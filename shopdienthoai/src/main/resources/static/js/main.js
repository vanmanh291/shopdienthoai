var token = localStorage.getItem("token");
var exceptionCode = 417;

async function loadMenu() {
    var user = JSON.parse(localStorage.getItem("user"));
    var isAdmin = user && user.authorities && user.authorities.name === "ROLE_ADMIN";

    var adminMenu = isAdmin ? `
    <li><a class="dropdown-item nav-dropdown-item" href="admin/index">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M12 4l8 4v4c0 4.42-3.58 8-8 8S4 16.42 4 12V8l8-4z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Quản lý
    </a></li>
    <li><hr class="dropdown-divider"></li>` : '';
    var dn = `
        <div class="nav-item-custom dropdown">
            <button class="nav-btn-custom" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="nav-icon-wrap">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
                        <path d="M4 20C4 16.6863 7.13401 14 11 14H13C16.866 14 20 16.6863 20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </span>
                <span class="nav-label">Tài khoản</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end nav-dropdown" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item nav-dropdown-item" href="taikhoan">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/><path d="M4 20C4 16.69 7.13 14 11 14h2c3.87 0 7 2.69 7 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                    Tài khoản
                </a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item nav-dropdown-item nav-logout" href="#" onclick="logout()">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    Đăng xuất
                </a></li>
            </ul>
        </div>`

    if (token == null) {
        dn = `
        <a href="login" class="nav-btn-custom nav-btn-login">
            <span class="nav-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
            <span class="nav-label">Đăng nhập</span>
        </a>`
    }

    var menu = `
    <div class="nav-wrapper">
        <nav class="navbar navbar-expand-lg nav-main">
            <div class="container-fluid nav-container">

                <!-- Logo -->
                <a class="nav-logo" href="index">
                    <img src="image/logo.png" alt="logo">
                    
                </a>

                <!-- Mobile toggle -->
                <button class="navbar-toggler nav-toggler" type="button"
                    data-bs-toggle="collapse" data-bs-target="#navbarMain"
                    aria-controls="navbarMain" aria-expanded="false">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>

                <!-- Collapse content -->
                <div class="collapse navbar-collapse" id="navbarMain">

                    <!-- Search bar -->
                    <div class="nav-search-wrap">
                        <form class="nav-search" action="product">
                            <span class="nav-search-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                                    <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </span>
                            <input class="nav-search-input" type="search" name="search" placeholder="Tìm kiếm sản phẩm...">
                        </form>
                    </div>

                    <!-- Right nav items -->
                    <div class="nav-actions">

                        <a href="baiviet" class="nav-btn-custom">
                            <span class="nav-icon-wrap">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </span>
                            <span class="nav-label">Bài viết</span>
                        </a>

                        <a href="product" class="nav-btn-custom">
                            <span class="nav-icon-wrap">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 11l3 3L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </span>
                            <span class="nav-label">Tra cứu</span>
                        </a>

                        <a href="giohang" class="nav-btn-custom nav-cart">
                            <span class="nav-icon-wrap">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span class="nav-cart-badge" id="totalcartheader">0</span>
                            </span>
                            <span class="nav-label">Giỏ hàng</span>
                        </a>

                        ${dn}
                    </div>
                </div>
            </div>
        </nav>
    </div>`

    document.getElementById("menumain").innerHTML = menu
    // Hiển thị tên tài khoản
    try {
        var userStr = localStorage.getItem("user");
        if (userStr) {
            var user = JSON.parse(userStr);
            var displayName = user.fullname || user.username || user.email || "Tài khoản";
            var el = document.getElementById("accountUsername");
            if (el) el.textContent = displayName;
        }
    } catch (e) { }
    try { loadFooter() } catch (error) { }
    try { countCart() } catch (error) { }
}

function loadFooter() {
    var footer = `
    <div class="footer-main">
        <div class="containercustom container">

            <!-- Top: social -->
            <div class="footer-top">
                <span class="footer-follow">Theo dõi chúng tôi tại:</span>
                <div class="footer-socials">
                    <a href="" class="footer-social-btn" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="" class="footer-social-btn" title="Twitter"><i class="fab fa-twitter"></i></a>
                    <a href="" class="footer-social-btn" title="Google"><i class="fab fa-google"></i></a>
                    <a href="" class="footer-social-btn" title="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="" class="footer-social-btn" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
                    <a href="" class="footer-social-btn" title="GitHub"><i class="fab fa-github"></i></a>
                </div>
            </div>

            <!-- Columns -->
            <div class="footer-cols">
                <div class="footer-col footer-col-brand">
                    <div class="footer-logo">
                        <i class="fa fa-mobile"></i>
                        <span>SHOPDIENTHOAI</span>
                    </div>
                    <p><i class="fas fa-map-marker-alt"></i> 111 Hồng Sơn, Đô Lương, Nghệ An</p>
                    <p><i class="fas fa-phone"></i> 0705.265.407</p>
                </div>

                <div class="footer-col">
                    <h6>Về chúng tôi</h6>
                    <a href="#">Hotline: 0705.265.407</a>
                    <a href="#">shopdienthoai@gmail.com</a>
                    <a href="#">111 Hồng Sơn, Đô Lương, Nghệ An</a>
                </div>

                <div class="footer-col">
                    <h6>Hỗ trợ khách hàng</h6>
                    <a href="#">Uy tín</a>
                    <a href="#">Chất lượng</a>
                    <a href="#">Nguồn gốc rõ ràng</a>
                    <a href="#">Giá rẻ</a>
                </div>

                <div class="footer-col">
                    <h6>Liên hệ</h6>
                    <a href="#"><i class="fas fa-home"></i> Hồng Sơn, Đô Lương, Nghệ An</a>
                    <a href="#"><i class="fas fa-envelope"></i> shopdienthoai@gmail.com</a>
                    <a href="#"><i class="fas fa-phone"></i> 0705.265.407</a>
                </div>
            </div>

            <div class="footer-bottom">
                <span>© 2026 Shopdienthoai. All rights reserved.</span>
            </div>
        </div>
    </div>`
    document.getElementById("footer").innerHTML = footer
}

async function countCart() {
    if (token == null) return;
    var url = 'http://localhost:8080/api/cart/user/count-cart';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({ 'Authorization': 'Bearer ' + token })
    });
    if (response.status > 300) return;
    var count = await response.text();
    var badge = document.getElementById("totalcartheader");
    if (badge) {
        badge.innerHTML = count;
        badge.style.display = count === '0' ? 'none' : 'flex';
    }
}

function formatmoney(money) {
    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    return VND.format(money);
}

async function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace('/logout')
}

async function checkroleUser() {
    var token = localStorage.getItem("token");
    var url = 'http://localhost:8080/api/user/check-role-user';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({ 'Authorization': 'Bearer ' + token })
    });
    if (response.status > 300) window.location.replace('login')
}