function initializeSliderCaptcha() {
    // 获取相关元素
    const captchaContainer = document.getElementById('captcha-container');
    const verificationSuccess = document.getElementById('verification-success');
    const captchaButton = document.getElementById('captcha-button');
    const targetSlider = document.getElementById('target-slider');
    const captchaSlider = document.getElementById('captcha-slider');

    let targetData = {
        'offset-width': null,
        'current-width': null,
    };

    // 获取验证码
    function getCaptcha() {
        const data = {
            'max-offset-width': captchaContainer.offsetWidth - targetSlider.offsetWidth,
            'uname': unameInput.value,
        };

        fetch('{% url "user:call_captcha" %}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': document.getElementsByName('csrfmiddlewaretoken')[0].value,
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === 'ok') {
                    let newPosition = result.data['offset-width'];
                    targetData['offset-width'] = newPosition;
                    targetSlider.style.transform = `translateX(${newPosition}px)`;
                    captchaButton.style.opacity = 0;
                    setTimeout(() => {
                        captchaButton.style.zIndex = -2;
                    }, 500);
                } else if (result.status === 'error') {
                    let errorMessage = result.message;
                    showPopup(errorMessage);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // 监听滑块鼠标按下事件
    function handleMouseDown(event) {
        event.preventDefault();
        isDragging = true;
        initialX = event.clientX;
    }

    // 监听滑块鼠标移动事件
    function handleMouseMove(event) {
        event.preventDefault();
        if (isDragging) {
            const offsetX = event.clientX - initialX;
            const captchaWidth = captchaContainer.offsetWidth - captchaSlider.offsetWidth;

            // 限制滑块位置在容器范围内
            let newPosition = Math.max(0, Math.min(offsetX, captchaWidth));
            captchaSlider.style.transform = `translateX(${newPosition}px)`;
        }
    }

    // 监听滑块鼠标释放事件
    function handleMouseUp(event) {
        event.preventDefault();
        if (isDragging) {
            isDragging = false;
            const captchaWidth = captchaContainer.offsetWidth - captchaSlider.offsetWidth;
            const sliderPosition = parseInt(captchaSlider.style.transform.replace('translateX(', '').replace('px)', ''), 10);

            // 验证滑块是否达到指定位置
            if (sliderPosition >= targetData['offset-width'] - 10 && sliderPosition <= targetData['offset-width'] + 10) {
                // 验证通过，执行相应操作
                captchaSlider.style.pointerEvents = 'none';
                verificationSuccess.style.opacity = 1;
                verificationSuccess.style.zIndex = 9999;
                targetData['current-width'] = sliderPosition;
            } else {
                // 验证失败，重置滑块位置
                captchaSlider.style.transform = 'translateX(0)';
            }
        }
    }

    // 监听点击获取验证码按钮事件
    function handleCaptchaButtonClick() {
        getCaptcha();
    }

    // 初始化滑块验证码
    function initialize() {
        captchaButton.addEventListener('click', handleCaptchaButtonClick);
        captchaSlider.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    // 启动初始化
    initialize();
}

// 调用函数初始化滑块验证码
initializeSliderCaptcha();
