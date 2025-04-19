function addCode() {
    const codeType = document.querySelector('input[name="codeType"]:checked').value;
    const codeValue = document.getElementById("codeInput").value.trim();
    if (!codeValue) return alert("Please enter a code.");
  
    const previewBox = document.getElementById("previewBox");
    const codeItem = document.createElement("div");
    codeItem.className = "code-item";
  
    if (codeType === "barcode") {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("id", `barcode-${Date.now()}`);
      codeItem.appendChild(svg);
      previewBox.appendChild(codeItem);
  
      JsBarcode(svg, codeValue, {
        format: "CODE128",
        displayValue: true,
        fontSize: 14,
        height: 60
      });
    } else if (codeType === "qrcode") {
      const qr = new QRious({ value: codeValue, size: 300 });
      const img = document.createElement("img");
      img.src = qr.toDataURL();
      codeItem.appendChild(img);
      previewBox.appendChild(codeItem);
    } else {
      const text = document.createElement("div");
      text.innerText = `Other: ${codeValue}`;
      text.style.fontFamily = 'monospace';
      text.style.fontSize = '16px';
      codeItem.appendChild(text);
      previewBox.appendChild(codeItem);
    }
  
    document.getElementById("codeInput").value = "";
  }
  
  function printPreview() {
    const printContent = document.getElementById("previewBox").innerHTML;
    const win = window.open('', '', 'width=800,height=600');
    win.document.write('<html><head><title>Print Preview</title></head><body>');
    win.document.write(printContent);
    win.document.write('</body></html>');
    win.document.close();
    win.focus();
    win.print();
    win.close();
  }
  