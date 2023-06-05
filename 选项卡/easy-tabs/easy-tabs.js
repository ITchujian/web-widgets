function Tabs(containerId, defaultTabIndex = 0) {
  var container = document.getElementById(containerId);
  var tabs = container.getElementsByClassName("tab");
  var tabContents = document.getElementsByClassName("tab-content");

  function showTab(tabIndex) {
    // 隐藏所有选项卡内容
    for (var i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = "none";
    }

    // 显示选中的选项卡内容
    if (tabContents[tabIndex]) {
      tabContents[tabIndex].style.display = "block";
    }
  }

  // 绑定选项卡点击事件
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function () {
      var tabIndex = Array.prototype.indexOf.call(tabs, this);
      showTab(tabIndex);
    });
  }

  // 默认加载显示的页签
  if (defaultTabIndex >= 0 && defaultTabIndex < tabs.length) {
    showTab(defaultTabIndex);
  }
}
