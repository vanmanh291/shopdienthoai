var size = 10;

async function loadSanPhamBanChay(page) {
    var url = 'http://localhost:8080/api/product/public/best-saler?page=' + page + '&size=' + size + '&sort=quantitySold,desc';
    const response = await fetch(url);
    var result = await response.json();
    var list = result.content;
    var main = '';
    for (var i = 0; i < list.length; i++) {
        var discountHtml = '';
        if (list[i].oldPrice != null && list[i].oldPrice > 0) {
            var pct = Math.round((1 - list[i].price / list[i].oldPrice) * 100);
            discountHtml = `<span class="product-badge-discount">-${pct}%</span>`;
        }
        main += `
        <div class="col-lg-20p col-md-3 col-sm-6 col-6">
            <div class="product-card">
                ${discountHtml}
                <a href="detail?id=${list[i].id}" class="product-img-wrap">
                    <img src="${list[i].imageBanner}" class="product-img" alt="${list[i].name}" loading="lazy">
                </a>
                <div class="product-info">
                    <a href="detail?id=${list[i].id}" class="product-name">${list[i].name}</a>
                    <div class="product-price-row">
                        <strong class="product-price-new">${formatmoney(list[i].price)}</strong>
                        ${list[i].oldPrice != null && list[i].oldPrice > 0
                            ? `<span class="product-price-old">${formatmoney(list[i].oldPrice)}</span>`
                            : ''}
                    </div>
                </div>
            </div>
        </div>`
    }
    document.getElementById("sanphambanchay").innerHTML += main;

    if (result.last == false) {
        document.getElementById("btnsanphambanchay").onclick = function () {
            loadSanPhamBanChay(Number(page) + 1);
        }
    } else {
        document.getElementById("btnsanphambanchay").onclick = function () {
            toastr.warning("Đã hết kết quả tìm kiếm");
        }
    }
}

async function loadSanPhamMoiNhat(page) {
    var url = 'http://localhost:8080/api/product/public/new-product?page=' + page + '&size=' + size + '&sort=id,desc';
    const response = await fetch(url);
    var result = await response.json();
    var list = result.content;
    var main = '';
    for (var i = 0; i < list.length; i++) {
        var discountHtml = '';
        if (list[i].oldPrice != null && list[i].oldPrice > 0) {
            var pct = Math.round((1 - list[i].price / list[i].oldPrice) * 100);
            discountHtml = `<span class="product-badge-discount">-${pct}%</span>`;
        }
        main += `
        <div class="col-lg-20p col-md-3 col-sm-6 col-6">
            <div class="product-card">
                <span class="product-badge-new">Mới</span>
                ${discountHtml}
                <a href="detail?id=${list[i].id}" class="product-img-wrap">
                    <img src="${list[i].imageBanner}" class="product-img" alt="${list[i].name}" loading="lazy">
                </a>
                <div class="product-info">
                    <a href="detail?id=${list[i].id}" class="product-name">${list[i].name}</a>
                    <div class="product-price-row">
                        <strong class="product-price-new">${formatmoney(list[i].price)}</strong>
                        ${list[i].oldPrice != null && list[i].oldPrice > 0
                            ? `<span class="product-price-old">${formatmoney(list[i].oldPrice)}</span>`
                            : ''}
                    </div>
                </div>
            </div>
        </div>`
    }
    document.getElementById("sanphammoinhat").innerHTML += main;

    if (result.last == false) {
        document.getElementById("btnsanphammoi").onclick = function () {
            loadSanPhamMoiNhat(Number(page) + 1);
        }
    } else {
        document.getElementById("btnsanphammoi").onclick = function () {
            toastr.warning("Đã hết kết quả tìm kiếm");
        }
    }
}

async function loadSanPhamNoiBat() {
    var url = 'http://localhost:8080/api/product/public/best-saler?page=0&size=4&sort=quantitySold,desc';
    const response = await fetch(url);
    var result = await response.json();
    var list = result.content;
    var main = '';
    for (var i = 0; i < list.length; i++) {
        main += `
        <div class="row singlespnoibat">
            <div class="col-sm-3">
                <img src="${list[i].imageBanner}" class="anhspnoibat">
            </div>
            <div class="col-sm-9 ndspnoibat">
                <a href="detail?id=${list[i].id}" class="tenspnoibat">${list[i].name}</a>
                <div class="priceproductnoibat">
                    <strong class="newpricenoibat">${formatmoney(list[i].price)}</strong>
                    <span class="oldpricenoibat">${list[i].oldPrice != null && list[i].oldPrice > 0 ? formatmoney(list[i].oldPrice) : ''}</span>
                </div>
            </div>
        </div>`
    }
    document.getElementById("listspnoibat").innerHTML = main;
}

async function loadSanPhamNoiBatCart() {
    var url = 'http://localhost:8080/api/product/public/best-saler?page=0&size=4&sort=quantitySold,desc';
    const response = await fetch(url);
    var result = await response.json();
    var list = result.content;
    var main = '';
    for (var i = 0; i < list.length; i++) {
        main += `
        <div class="col-md-3 col-sm-4 col-6">
            <div class="product-card">
                <a href="detail?id=${list[i].id}" class="product-img-wrap">
                    <img src="${list[i].imageBanner}" class="product-img" alt="${list[i].name}">
                </a>
                <div class="product-info">
                    <a href="detail?id=${list[i].id}" class="product-name">${list[i].name}</a>
                    <div class="product-price-row">
                        <strong class="product-price-new">${formatmoney(list[i].price)}</strong>
                        ${list[i].oldPrice != null && list[i].oldPrice > 0
                            ? `<span class="product-price-old">${formatmoney(list[i].oldPrice)}</span>`
                            : ''}
                    </div>
                </div>
            </div>
        </div>`
    }
    document.getElementById("goiysanpham").innerHTML = main;
}

var listbonho = [];
async function loadAProduct() {
    var uls = new URL(document.URL);
    var id = uls.searchParams.get("id");
    var url = 'http://localhost:8080/api/product/public/findById?id=' + id;
    const response = await fetch(url);
    var result = await response.json();

    document.getElementById("detailnamepro").innerHTML = result.name;
    document.getElementById("codepro").innerHTML = result.code;
    document.getElementById("pricedetail").innerHTML = formatmoney(result.price);
    document.getElementById("oldpricestr").innerHTML = result.oldPrice == null || result.oldPrice == 0 ? "" : formatmoney(result.oldPrice);
    document.getElementById("imgdetailpro").src = result.imageBanner;
    document.getElementById("descriptiondetail").innerHTML = result.description;
    document.getElementById("tenspkythuat").innerHTML = result.name;
    document.getElementById("imganhkythuat").src = result.imageBanner;
    document.getElementById("phukiendikem").innerHTML = result.accessory;

    var main = '';
    result.screen == null || result.screen == "" ? main += "" : main += `<span class="congnghect">Công nghệ màn hình: <span class="chitietcongnghe">${result.screen}</span></span>`;
    result.operaSystem == null || result.operaSystem == "" ? main += "" : main += `<span class="congnghect">Hệ điều hành: <span class="chitietcongnghe">${result.operaSystem}</span></span>`;
    result.cpu == null || result.cpu == "" ? main += "" : main += `<span class="congnghect">Vi xử lý: <span class="chitietcongnghe">${result.cpu}</span></span>`;
    result.mobileNetwork == null || result.mobileNetwork == "" ? main += "" : main += `<span class="congnghect">Mạng di động: <span class="chitietcongnghe">${result.mobileNetwork}</span></span>`;
    result.sim == null || result.sim == "" ? main += "" : main += `<span class="congnghect">Số khe SIM: <span class="chitietcongnghe">${result.sim}</span></span>`;
    result.specialFeature == null || result.specialFeature == "" ? main += "" : main += `<span class="congnghect">Tính năng đặc biệt: <span class="chitietcongnghe">${result.specialFeature}</span></span>`;
    result.securityInfor == null || result.securityInfor == "" ? main += "" : main += `<span class="congnghect">Bảo mật: <span class="chitietcongnghe">${result.securityInfor}</span></span>`;
    result.material == null || result.material == "" ? main += "" : main += `<span class="congnghect">Chất liệu: <span class="chitietcongnghe">${result.material}</span></span>`;
    result.frontCamera == null || result.frontCamera == "" ? main += "" : main += `<span class="congnghect">Camera trước: <span class="chitietcongnghe">${result.frontCamera}</span></span>`;
    result.backCamera == null || result.backCamera == "" ? main += "" : main += `<span class="congnghect">Camera sau: <span class="chitietcongnghe">${result.backCamera}</span></span>`;
    document.getElementById("thongtincauhinh").innerHTML = main;

    var imgs = `<div class="col-lg-2 col-md-2 col-sm-2 col-2 singdimg"><img onclick="clickImgdetail(this)" src="${result.imageBanner}" class="imgldetail"></div>`;
    for (var i = 0; i < result.productImages.length; i++) {
        imgs += `<div class="col-lg-2 col-md-2 col-sm-2 col-2 singdimg"><img onclick="clickImgdetail(this)" src="${result.productImages[i].linkImage}" class="imgldetail"></div>`;
    }
    document.getElementById("listimgdetail").innerHTML = imgs;

    var colors = '';
    for (var i = 0; i < result.productColors.length; i++) {
        var cls = 'hetsp';
        var oncl = '';
        if (result.productColors[i].quantity > 0) {
            cls = '';
            oncl = `onclick="chonMauSac(${result.productColors[i].id}, this, ${result.productColors[i].price})"`;
        }
        colors += `
        <div class="col-lg-3 col-md-3 col-sm-6 col-6">
            <div ${oncl} class="colorcdiv ${cls}">
                <img src="${result.productColors[i].image}" class="imgcolorpro">
                <span class="storagedetail">${result.productColors[i].name} (${result.productColors[i].quantity})</span>
                <span class="pricestorage">${formatmoney(result.productColors[i].price)}</span>
            </div>
        </div>`;
    }
    document.getElementById("listcolor").innerHTML = colors;
    loadSanPhamLienQuan(result.tradeMark.id, null, id);
}

function chonMauSac(idmausac, e, price) {
    idColorCart = idmausac;
    var img = document.getElementsByClassName("colorcdiv");
    for (var k = 0; k < img.length; k++) {
        img[k].classList.remove('activecolor');
    }
    e.classList.add('activecolor');
    document.getElementById("pricedetail").innerHTML = formatmoney(price);
}

async function loadSanPhamLienQuan(idtrademark, idcategory, idproduct) {
    var url = 'http://localhost:8080/api/product/public/san-pham-lienquan?page=0&size=4&sort=id,desc&id=' + idproduct;
    if (idcategory != null) url += '&idcategory=' + idcategory;
    if (idtrademark != null) url += '&idtrademark=' + idtrademark;
    const response = await fetch(url);
    var result = await response.json();
    var list = result.content;
    var main = '';
    for (var i = 0; i < list.length; i++) {
        main += `
        <div class="col-md-6 col-sm-6 col-6">
            <div class="product-card">
                <a href="detail?id=${list[i].id}" class="product-img-wrap">
                    <img src="${list[i].imageBanner}" class="product-img" alt="${list[i].name}">
                </a>
                <div class="product-info">
                    <a href="detail?id=${list[i].id}" class="product-name">${list[i].name}</a>
                    <div class="product-price-row">
                        <strong class="product-price-new">${formatmoney(list[i].price)}</strong>
                        ${list[i].oldPrice != null && list[i].oldPrice > 0
                            ? `<span class="product-price-old">${formatmoney(list[i].oldPrice)}</span>`
                            : ''}
                    </div>
                </div>
            </div>
        </div>`;
    }
    document.getElementById("listsanphamlienquan").innerHTML = main;
}

async function clickImgdetail(e) {
    var imgs = document.getElementsByClassName("imgldetail");
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].classList.remove('imgactive');
    }
    e.classList.add('imgactive');
    document.getElementById("imgdetailpro").src = e.src;
}

var sizesearch = 8;
async function locSanPham(page) {
    var min_price = document.getElementById("khoanggia").value.split("-")[0];
    var max_price = document.getElementById("khoanggia").value.split("-")[1];
    var sort = document.getElementById("sortpro").value;
    const trademarkIds = Array.from(document.querySelectorAll('input[name="trademarkIds"]:checked')).map(cb => cb.value);
    const categoryIds = Array.from(document.querySelectorAll('input[name="categoryIds"]:checked')).map(cb => cb.value);

    var url = 'http://localhost:8080/api/product/public/search-full?page=' + page + '&size=' + sizesearch + '&sort=' + sort;
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ categoryIds, trademarkIds, minPrice: min_price, maxPrice: max_price })
    });
    var result = await response.json();
    var list = result.content;
    var totalPage = result.totalPages;
    var main = '';
    for (var i = 0; i < list.length; i++) {
        main += `
        <div class="col-lg-3 col-md-3 col-sm-6 col-6">
            <div class="product-card">
                <a href="detail?id=${list[i].id}" class="product-img-wrap">
                    <img src="${list[i].imageBanner}" class="product-img" alt="${list[i].name}">
                </a>
                <div class="product-info">
                    <a href="detail?id=${list[i].id}" class="product-name">${list[i].name}</a>
                    <div class="product-price-row">
                        <strong class="product-price-new">${formatmoney(list[i].price)}</strong>
                        ${list[i].oldPrice != null && list[i].oldPrice > 0
                            ? `<span class="product-price-old">${formatmoney(list[i].oldPrice)}</span>`
                            : ''}
                    </div>
                </div>
            </div>
        </div>`;
    }
    document.getElementById("sanphamloc").innerHTML = main;

    var mainpage = '';
    for (var i = 1; i <= totalPage; i++) {
        mainpage += `<li onclick="locSanPham(${i - 1})" class="page-item pointer"><a class="page-link">${i}</a></li>`;
    }
    document.getElementById("pageable").innerHTML = mainpage;
}

async function sanPhamByThuongHieu(page) {
    var uls = new URL(document.URL);
    var thuonghieu = uls.searchParams.get("thuonghieu");
    var search = uls.searchParams.get("search");
    var url = 'http://localhost:8080/api/product/public/san-pham-by-thuong-hieu-hoac-search?page=' + page + '&size=' + sizesearch;
    if (thuonghieu != null) url += '&trademark=' + thuonghieu;
    if (search != null) url += '&search=' + search;
    const response = await fetch(url);
    var result = await response.json();
    var list = result.content;
    var totalPage = result.totalPages;
    var main = '';
    for (var i = 0; i < list.length; i++) {
        main += `
        <div class="col-lg-3 col-md-3 col-sm-6 col-6">
            <div class="product-card">
                <a href="detail?id=${list[i].id}" class="product-img-wrap">
                    <img src="${list[i].imageBanner}" class="product-img" alt="${list[i].name}">
                </a>
                <div class="product-info">
                    <a href="detail?id=${list[i].id}" class="product-name">${list[i].name}</a>
                    <div class="product-price-row">
                        <strong class="product-price-new">${formatmoney(list[i].price)}</strong>
                        ${list[i].oldPrice != null && list[i].oldPrice > 0
                            ? `<span class="product-price-old">${formatmoney(list[i].oldPrice)}</span>`
                            : ''}
                    </div>
                </div>
            </div>
        </div>`;
    }
    document.getElementById("sanphamloc").innerHTML = main;

    var mainpage = '';
    for (var i = 1; i <= totalPage; i++) {
        mainpage += `<li onclick="sanPhamByThuongHieu(${i - 1})" class="page-item pointer"><a class="page-link">${i}</a></li>`;
    }
    document.getElementById("pageable").innerHTML = mainpage;
}

function locSpAction() {
    document.getElementById("sanphamloc").innerHTML = "";
    locSanPham(0);
}