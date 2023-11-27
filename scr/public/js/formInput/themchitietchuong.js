async function themChiTietChuong(index) {
    //có thể làm thêm key enter
var classNameDetailRows = ["body-5-content-course-content-255_55pt", "body-5-content-course-content-71_8pt", "body-5-content-course-content-44_85pt", "body-content--course-content-40_4pt", "body-5-course-content-55_85pt"];

var tbody = document.getElementById("myTable");
var newDetailRow = document.createElement('tr');
newDetailRow.className = "ChiTietChuong" + index;
var h =await document.getElementsByClassName("ChiTietChuong" + index);
var chuong1Row = document.getElementById("Chuong"+ index);

// Tạo các ô mới dựa trên số lượng ô trong dòng cuối cùng của "Chuong1"
for (var i = 0; i < chuong1Row.children.length; i++) {
    var newCell = document.createElement('td');
    newCell.className = classNameDetailRows[i];
    newCell.contentEditable = true;
    var newParagraph = document.createElement("p");
    newParagraph.className = 'header-5-course-content-p text-left';

    var newSpan = document.createElement("span");
    var stemp2 = (h.length+1)

    if (i === 0) {
        // Cập nhật giá trị của newSpan.id chỉ khi i là 0 (đầu tiên)
        newSpan.innerHTML = index +"."+stemp2+"&nbsp;";
        newSpan.id = "CTC" + index + "." + stemp2;
    }
    newParagraph.appendChild(newSpan);
    newCell.appendChild(newParagraph);
    newDetailRow.appendChild(newCell);
}

// Thêm tr vào tbody trước tr có id là "CuoiChuong1"
tbody.insertBefore(newDetailRow, document.getElementById("CuoiChuong"+index));
}