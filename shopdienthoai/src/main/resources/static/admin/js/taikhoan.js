var size = 10;
async function loadAllUser(page, param) {
    var token = localStorage.getItem("token");
    if (param == null) {
        param = "";
    }
    var url = 'http://localhost:8080/api/admin/get-user-by-role?page=' + page + '&size=' + size + '&q=' + param;
    var role = document.getElementById("role").value
    if (role != "") {
        url += '&role=' + role
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var result = await response.json();
    console.log(result)
    var listUser = result.content;
    var totalPage = result.totalPages;

    var main = '';
    for (i = 0; i < listUser.length; i++) {
        var btn = '';
        if (listUser[i].actived == 0) {
            var btn = `<td class="sticky-col"><button onclick="lockOrUnlock(${listUser[i].id},0)" class="btn btn-danger"><i class="fa fa-unlock"></i> mở khóa</button></td>`
        } else {
            var btn = `<td class="sticky-col"><button onclick="lockOrUnlock(${listUser[i].id},1)" class="btn btn-primary"><i class="fa fa-lock"></i> Khóa</button></td>`
        }
        // if (listUser[i].authorities.name == "ROLE_ADMIN") {
        //     btn = '<td class="sticky-col"></td>'
        // }
        main += `<tr>
            <td>${listUser[i].id}</td>
            <td>${listUser[i].email}</td>
            <td>${listUser[i].fullname}</td>
            <td>${listUser[i].phone}</td>
            <td>${listUser[i].createdDate}</td>
            <!-- <td>${listUser[i].authorities.name}</td> -->
            <td>
                <a href="addtaikhoan?id=${listUser[i].id}" class="btn btn-warning btn-sm">
                    <i class="fa fa-edit"></i> Sửa
                </a>
                <button onclick="deleteUser(${listUser[i].id})" class="btn btn-danger btn-sm">
                    <i class="fa fa-trash"></i> Xóa
                </button>
                ${listUser[i].actived == 1 
                    ? `<button onclick="lockOrUnlock(${listUser[i].id},1)" class="btn btn-sm btn-secondary">
                            <i class="fa fa-lock"></i> Khóa
                       </button>` 
                    : `<button onclick="lockOrUnlock(${listUser[i].id},0)" class="btn btn-sm btn-success">
                            <i class="fa fa-unlock"></i> Mở khóa
                       </button>`
                }
            </td>
        </tr>`
    }
    document.getElementById("listuser").innerHTML = main
    var mainpage = ''
    for (i = 1; i <= totalPage; i++) {
        mainpage += `<li onclick="loadAllUser(${(Number(i) - 1)},${param})" class="page-item"><a class="page-link" href="#listsp">${i}</a></li>`
    }
    document.getElementById("pageable").innerHTML = mainpage
}


function filteruser() {
    loadAllUser(0, "");
}

function searchTable() {
    var val = document.getElementById("searchtable").value;
    loadAllUser(0, val);
}


async function lockOrUnlock(id, type) {
    var token = localStorage.getItem("token");
    var con = confirm("Xác nhận hành động?");
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/admin/lockOrUnlockUser?id=' + id;
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        var mess = '';
        if (type == 1) {
            mess = 'Khóa thành công'
        } else {
            mess = 'Mở khóa thành công'
        }
        swal({
                title: "Thông báo",
                text: mess,
                type: "success"
            },
            function() {
                window.location.reload();
            });
    } else {
        swal({
                title: "Thông báo",
                text: "hành động thất bại",
                type: "error"
            },
            function() {
                window.location.reload();
            });
    }
}


async function addAdmin() {
    var token = localStorage.getItem("token");
    var url = 'http://localhost:8080/api/admin/addaccount'
    var fullname = document.getElementById("fullname").value
    var phone = document.getElementById("phone").value
    var email = document.getElementById("email").value
    var password = document.getElementById("pass").value
    var repassword = document.getElementById("repass").value
    var user = {
        "fullname": fullname,
        "phone": phone,
        "email": email,
        "password": password

    }
    if (password != repassword) {
        alert("Mật khẩu không trùng khớp")
        return;
    }
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var result = await res.json();
    if (res.status < 300) {
        swal({
                title: "Thông báo",
                text: "Tạo tài khoản thành công!",
                type: "success"
            },
            function() {
                window.location.href = 'taikhoan'
            });
    }
    if (res.status == exceptionCode) {
        toastr.warning(result.defaultMessage);
    }
}

async function saveUser() {
    const id = document.getElementById("userId").value;
    if (id) {
        await updateUser(id); // Nếu có id → update
    } else {
        await addAdmin();     // Không có id → thêm mới
    }
}

async function loadUserForEdit(id) {
    var token = localStorage.getItem("token");
    const res = await fetch('http://localhost:8080/api/admin/get-user?id=' + id, {
        method: 'GET',
        headers: new Headers({ 'Authorization': 'Bearer ' + token })
    });
    var user = await res.json();

    document.getElementById("userId").value = user.id;
    document.getElementById("fullname").value = user.fullname || '';
    document.getElementById("phone").value = user.phone || '';
    document.getElementById("email").value = user.email || '';

    // ✅ Set role hiện tại
    document.getElementById("role").value = user.authorities.name;

    document.getElementById("submitBtn").innerText = "Cập nhật tài khoản";
}

async function updateUser(id) {
    var token = localStorage.getItem("token");
    var fullname = document.getElementById("fullname").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    var repassword = document.getElementById("repass").value;
    var role = document.getElementById("role").value; // ✅ Lấy role

    if (password && password !== repassword) {
        alert("Mật khẩu không trùng khớp");
        return;
    }

    var user = {
        "id": id,
        "fullname": fullname,
        "phone": phone,
        "email": email,
        "password": password || null,
        "role": role // ✅ Gửi role lên backend
    };

    const res = await fetch('http://localhost:8080/api/admin/update-account', {
        method: 'PUT',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });

    var result = await res.json();
    if (res.status < 300) {
        swal({ title: "Thông báo", text: "Cập nhật thành công!", type: "success" },
            function() { window.location.href = 'taikhoan'; });
    } else {
        toastr.warning(result.defaultMessage || "Cập nhật thất bại!");
    }
}

async function deleteUser(id) {
    var con = confirm("Bạn có chắc muốn xóa tài khoản này?");
    if (!con) return;

    var token = localStorage.getItem("token");
    const res = await fetch('http://localhost:8080/api/admin/delete-user?id=' + id, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });

    if (res.status < 300) {
        swal({ title: "Thông báo", text: "Xóa thành công!", type: "success" },
            function() { window.location.reload(); });
    } else {
        swal({ title: "Thông báo", text: "Xóa thất bại!", type: "error" },
            function() { window.location.reload(); });
    }
}