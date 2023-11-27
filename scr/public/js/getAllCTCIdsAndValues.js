export function getAllCTCIdsAndValues() {
    var allCTCData = {};
    var chuongRows = document.getElementsByClassName("Chuong");
    for (var i = 1; i <= chuongRows.length; i++) {
        // Xác định số lượng chi tiết chương trong mỗi chương
        var escapedDot = "\\.";
        // Xác định số lượng chi tiết chương trong mỗi chương
        var ctcElements = document.querySelectorAll('[id*="CTC' + i + escapedDot + '"]');

        var chuongData = [];
        // Duyệt qua từng phần tử CTC tương ứng với chương
        ctcElements.forEach(function (ctcElement) {
            var ctcValue = ctcElement.textContent.trim();
            var ctcData = {
                id: ctcElement.id,
                value: ctcValue
            };

            chuongData.push(ctcData);
        });
        allCTCData["Chuong" + i] = chuongData;
    }
    // In ra JSON chứa tất cả ID và giá trị của chi tiết chương
    console.log(JSON.stringify(allCTCData));
}

export function themChuong() {
    var table = document.getElementById("myTable");
    var chuongRows = document.getElementsByClassName("Chuong");
        var ctc = document.getElementsByClassName("ChiTietChuong" + (chuongRows.length))
    var newChuongId = "Chuong" + (chuongRows.length + 1);
    var footerChuongId = "CuoiChuong" + (chuongRows.length + 1);
    var newClassCTC = "ChiTietChuong" + (chuongRows.length + 1);
    // Add header row
    var newHeaderRow = table.insertRow(table.rows.length);
    newHeaderRow.id = newChuongId;
    newHeaderRow.className = "Chuong";

    //tạo các mảng để chứa các class css
    var classNameHeaderRows = ["body-5-course-content-255_55pt", "body-5-course-content-71_8pt", "body-5-course-content-44_85pt", "body-content--course-content-40_4pt", "body-5-course-content-55_85pt"];
    var classNameDetailRows = ["body-5-content-course-content-255_55pt", "body-5-content-course-content-71_8pt", "body-5-content-course-content-44_85pt", "body-content--course-content-40_4pt", "body-5-course-content-55_85pt"];
    var classNameFooterRows = ["footer-5-course-content-255_55pt", "footer-5-course-content-212_9pt"];
    for (var i = 0; i < classNameHeaderRows.length; i++) {
        var newHeaderCell = newHeaderRow.insertCell(i);
        //tạo id
        newHeaderCell.id = newChuongId + "." + (i + 1);
        newHeaderCell.className = classNameHeaderRows[i];
        newHeaderCell.contentEditable = true;
        // Create a new paragraph element
        var newParagraph = document.createElement("p");
        newParagraph.className = 'header-5-course-content-p text-left';
        var newStrong = document.createElement("strong");
        var newSpan = document.createElement("span");

        newSpan.textContent = "text";
        if (i === 0) {
            newSpan.textContent = "Chương " + (chuongRows.length) + ". "
        }

        newStrong.appendChild(newSpan);
        newParagraph.appendChild(newStrong);
        newHeaderCell.appendChild(newParagraph);
    }

    // Add detail row
    var newDetailRow = table.insertRow(table.rows.length);
    newDetailRow.className = newClassCTC;

    // Add th elements to the newDetailRow
    for (var i = 0; i < classNameDetailRows.length; i++) {
        
        var newDetailCell = newDetailRow.insertCell(i);
        newDetailCell.contentEditable = true;
        newDetailCell.className = classNameDetailRows[i];
        var newParagraph = document.createElement("p");
        newParagraph.className = 'header-5-course-content-p text-left';
        var newSpan = document.createElement("span");
        var temp = (chuongRows.length);
        var temp2 = (ctc.length + 1);
        if (i === 0) {
            newSpan.textContent =temp + "." + temp2;
            newSpan.id = "CTC" + temp + "." + temp2;
            // {{!-- newDetailCell.textContent = temp + "." + temp2;
            // newDetailCell.id = "CTC" + temp + "." + temp2; --}}
        }
// Append the span to the paragraph
newParagraph.appendChild(newSpan);

// Append the paragraph to the cell
newDetailCell.appendChild(newParagraph);
        
        
    }

    var FooterRow = table.insertRow(table.rows.length);
    FooterRow.id = footerChuongId;

    for (var i = 0; i < classNameFooterRows.length; i++) {
        var newFooterCell = FooterRow.insertCell(i);
        newFooterCell.className = classNameFooterRows[i];

        // Tạo phần tử paragraph
        var newParagraph = document.createElement("p");

        // Nếu là ô thứ nhất (i = 0), thêm thẻ em và span
        if (i === 0) {
            var newEm = document.createElement("em");
            var newSpan = document.createElement("span");
            newSpan.textContent = "Kỹ năng mềm và thái độ";
            newEm.appendChild(newSpan);
            newParagraph.appendChild(newEm);
        }

        // Nếu là ô thứ hai (i = 1), thêm colspan="4"
        if (i === 1) {
            newFooterCell.colSpan = 4;
        }

        // Nếu là ô thứ hai (i = 1), thêm input có contenteditable và id
        if (i === 1) {
            var editableSpan = document.createElement("span");
            editableSpan.contentEditable = true;
            editableSpan.id = "KyNangMem";
            newParagraph.appendChild(editableSpan);
        }

        // Thêm phần tử paragraph vào ô
        newFooterCell.appendChild(newParagraph);
    }
}

export async function themChiTietChuong(index) {
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

