async function loadProductComment(id) {
    var url = 'http://localhost:8080/api/product-comment/admin/find-all-by-product?idproduct=' + id;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
    var main = ''
    for (i = 0; i < list.length; i++) {
        var star = '';
        for (j = 0; j < list[i].star; j++) {
            star += `<span class="fa fa-star checkedstar"></span>`
        }
        var btn = `<button class="fa fa-primary" onclick="duyet(${list[i].id}, ${id})">Duyệt</button>`
        if(list[i].approved == true){
            btn = `<button class="fa fa-danger" onclick="duyet(${list[i].id}, ${id})">Hủy duyệt</button>`
        }
        main += `<tr>
                    <td>${list[i].id}</td>
                    <td>${list[i].createdDate}</td>
                    <td>${star}</td>
                    <td>${list[i].content}</td>
                    <td>${list[i].user.email}</td>
                    <td>${btn}</td>
                    <td><i class="fa fa-trash pointer" onclick="deleteComment(${list[i].id}, ${id})"></i></td>
                </tr>`
    }
    document.getElementById("listcautlct").innerHTML = main
}


async function deleteComment(id, idproduct) {
    var con = confirm("Bạn muốn xóa bình luận này?");
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/product-comment/admin/delete?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        toastr.success("xóa thành công!");
        loadProductComment(idproduct);
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}


async function duyet(id, idproduct) {
    var con = confirm("Xác nhận hành động?");
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/product-comment/admin/duyet?id=' + id;
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        toastr.success("Thành công!");
        loadProductComment(idproduct);
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}