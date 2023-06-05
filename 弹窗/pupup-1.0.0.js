
// 创建弹窗元素并添加到文档中
var popupElement = document.createElement('div');
popupElement.id = 'popup';
popupElement.innerHTML = '<p id="popup-message"></p>';
document.body.appendChild(popupElement);

// 弹窗样式
var popupStyle = document.createElement('style');
popupStyle.textContent = `
    #popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border-radius: 4px;
        box-shadow: 0px 0px 10px #ccc;
        z-index: -9999;
        opacity: 0;
        transition: opacity 1s ease-in-out;
    }
`;
document.head.appendChild(popupStyle);

// 弹窗显示函数
function showPopup(message) {
    var popup = document.getElementById('popup');
    var popupMessage = document.getElementById('popup-message');
    popupMessage.textContent = message;
    popup.style.zIndex = 9999;
    popup.style.opacity = 1;
    setTimeout(function() {
        popup.style.opacity = 0;
    }, 1500);
    setTimeout(function() {
        popup.style.zIndex = -9999;
    }, 2600);
}