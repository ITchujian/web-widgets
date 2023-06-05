function Modal() {
    var modal = document.createElement("div");
    modal.id = "modal";
    modal.className = "modal";
    var modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    var closeBtn = document.createElement("span");
    closeBtn.className = "close";
    closeBtn.innerHTML = "&times;";
    var modalTitle = document.createElement("h2");
    modalTitle.innerHTML = "Modal Title";
    var modalBody = document.createElement("p");
    modalBody.innerHTML = "Modal content goes here...";
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  
    // 显示模态框
    this.showModal = function() {
      modal.style.display = "block";
    };
  
    // 隐藏模态框
    this.hideModal = function() {
      modal.style.display = "none";
    };
  
    // 关闭按钮事件
    closeBtn.onclick = this.hideModal;
  
    // 点击模态框外部区域关闭模态框
    window.onclick = function(event) {
      if (event.target == modal) {
        hideModal();
      }
    };
  }
  
  // 创建模态框实例
  var modal = new Modal();
  