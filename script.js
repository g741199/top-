document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.image-container');
    const slide = document.querySelectorAll('.slide');
    // マウス位置を表示する要素を取得
    const positionDisplay = document.getElementById('mousePosition');
    const positionDisplay2 = document.getElementById('mousePosition2');
    const trans_sec=`transform 0.7s ease`;

    let state = 1; // 初期状態
    let ini_left=[-100, 0, 100];
    let startX, isDragging = false, moveX, isAnimation = false, isOut = false;

    container.addEventListener('mousedown', function(e) {
        startX = e.clientX;
        moveX = 0;
        positionDisplay.textContent = `isDragging: ${isDragging}, isAnimation: ${isAnimation} moveX:${moveX}`;
        positionDisplay2.textContent = `mouse_down`;

        e.preventDefault(); // ドラッグ時のテキスト選択を防ぐ
        if (isAnimation) return;
        else {
            isDragging = true;
            positionDisplay.textContent = `isDragging: ${isDragging}, isAnimation: ${isAnimation} moveX:${moveX}`;

            //positionDisplay.textContent = `isDragging:${isDragging}, e.clientX: ${e.clientX}, e.clientY: ${e.clientY}, startX:${startX}, moveX:${moveX}`;
            slide[0].style.transition = `transform 0s ease`;
            slide[1].style.transition = `transform 0s ease`;
            slide[2].style.transition = `transform 0s ease`; 
        }
    });

    container.addEventListener('mousemove', function(e) {
        isOut = false;//バグフィックスに使用
        moveX = e.clientX - startX;
        positionDisplay.textContent = `isDragging: ${isDragging}, isAnimation: ${isAnimation} moveX:${moveX}`;
        positionDisplay2.textContent = `mouse_move`;
        e.preventDefault(); // ドラッグ時のテキスト選択を防ぐ
        if (!isDragging) return;
        if (isAnimation) return;
//        isAnimation = true;
        switch(state){
            case 1:
                slide[0].style.transform = `translateX(calc(0%    + ${moveX}px))`;
                slide[1].style.transform = `translateX(calc(0%    + ${moveX}px))`;
                slide[2].style.transform = `translateX(calc(0%    + ${moveX}px))`;
                break;
            case 2:
                slide[0].style.transform = `translateX(calc(100%  + ${moveX}px))`;
                slide[1].style.transform = `translateX(calc(100%  + ${moveX}px))`;
                slide[2].style.transform = `translateX(calc(-200% + ${moveX}px))`;
                break;
            case 3:
                slide[0].style.transform = `translateX(calc(200%  + ${moveX}px))`;
                slide[1].style.transform = `translateX(calc(-100% + ${moveX}px))`;
                slide[2].style.transform = `translateX(calc(-100% + ${moveX}px))`;
                break;
        }
    });

    container.addEventListener('mouseup', function(e) {
        if(isOut) {
            isOut=false; 
            positionDisplay.textContent = `isDragging: ${isDragging}, isAnimation: ${isAnimation} moveX:${moveX}`;
            positionDisplay2.textContent = `mouse_up`;
            isDragging = false;
            isAnimation = true;
            positionDisplay.textContent = `isDragging:${isDragging} moveX:${moveX}`;
            slide[0].style.transition = trans_sec;
            slide[1].style.transition = trans_sec;
            slide[2].style.transition = trans_sec;
            if (moveX>200) {
                switch(state){
                    case 1:
                        slide[0].style.zIndex=2;
                        slide[1].style.zIndex=2;
                        slide[2].style.zIndex=1;
                        slide[0].style.transform = `translateX( 100%)`;ini_left[0] =   0; 
                        slide[1].style.transform = `translateX( 100%)`;ini_left[1] = 100; 
                        slide[2].style.transform = `translateX(-200%)`;ini_left[2] =-100; 
                        state = 2;
                        break;
                    case 2:
                        slide[0].style.zIndex=2;
                        slide[1].style.zIndex=1;
                        slide[2].style.zIndex=2;
                        slide[0].style.transform = `translateX( 200%)`;ini_left[0] =  100; 
                        slide[1].style.transform = `translateX(-100%)`;ini_left[1] = -100; 
                        slide[2].style.transform = `translateX(-100%)`;ini_left[2] =    0; 
                        state = 3;
                        break;
                    case 3:
                        slide[0].style.zIndex=1;
                        slide[1].style.zIndex=2;
                        slide[2].style.zIndex=2;
                        slide[0].style.transform = `translateX(   0%)`;ini_left[0] = -100; 
                        slide[1].style.transform = `translateX(   0%)`;ini_left[1] =    0; 
                        slide[2].style.transform = `translateX(   0%)`;ini_left[2] =  100; 
                        state = 1;
                        break;
                }
            }
            if (moveX<-200) {
                switch(state){
                    case 1:
                        slide[0].style.zIndex=1;
                        slide[1].style.zIndex=2;
                        slide[2].style.zIndex=2;
                        slide[0].style.transform = `translateX( 200%)`;ini_left[0] =  100;
                        slide[1].style.transform = `translateX(-100%)`;ini_left[1] = -100;
                        slide[2].style.transform = `translateX(-100%)`;ini_left[2] =    0;
                        state = 3;
                        break;
                    case 2:
                        slide[0].style.zIndex=2;
                        slide[1].style.zIndex=2;
                        slide[2].style.zIndex=1;
                        slide[0].style.transform = `translateX(   0%)`;ini_left[0] = -100;
                        slide[1].style.transform = `translateX(   0%)`;ini_left[1] =    0;
                        slide[2].style.transform = `translateX(   0%)`;ini_left[2] =  100;
                        state = 1;
                        break;
                    case 3:
                        slide[0].style.zIndex=2;
                        slide[1].style.zIndex=1;
                        slide[2].style.zIndex=2;
                        slide[0].style.transform = `translateX( 100%)`;ini_left[0] =   0;
                        slide[1].style.transform = `translateX( 100%)`;ini_left[1] = 100;
                        slide[2].style.transform = `translateX(-200%)`;ini_left[2] =  -100;
                        state = 2;
                        break;
                }
            }
            if ( 200>=moveX && moveX>=-200 ) {
                slide[0].style.transition = `transform 0.5s ease`;slide[1].style.transition = `transform 0.5s ease`;slide[2].style.transition = `transform 0.5s ease`;
                switch (state){
                    case 1: slide[0].style.transform=`translateX(0%)`;slide[1].style.transform=`translateX(0%)`;slide[2].style.transform=`translateX(0%)`;break;
                    case 2: slide[0].style.transform=`translateX(100%)`;slide[1].style.transform=`translateX(100%)`;slide[2].style.transform=`translateX(-200%)`;break;
                    case 3: slide[0].style.transform=`translateX(200%)`;slide[1].style.transform=`translateX(-100%)`;slide[2].style.transform=`translateX(-100%)`;break;
                }
            }
        return;}

        moveX = e.clientX - startX;
        startX =  e.clientX;
        positionDisplay.textContent = `isDragging: ${isDragging}, isAnimation: ${isAnimation} moveX:${moveX}`;
        positionDisplay2.textContent = `mouse_up`;
        if (moveX==0) { 
            isDragging=false; 
            positionDisplay.textContent = `isDragging: ${isDragging}, isAnimation: ${isAnimation} moveX:${moveX}`;
            return;} 
        if (isAnimation) return;
        if (!isDragging) return;

        isDragging = false;
        isAnimation = true;
        positionDisplay.textContent = `isDragging:${isDragging} moveX:${moveX}`;
        slide[0].style.transition = trans_sec;
        slide[1].style.transition = trans_sec;
        slide[2].style.transition = trans_sec;
        if (moveX>200) {
            switch(state){
                case 1:
                    slide[0].style.zIndex=2;
                    slide[1].style.zIndex=2;
                    slide[2].style.zIndex=1;
                    slide[0].style.transform = `translateX( 100%)`;ini_left[0] =   0; 
                    slide[1].style.transform = `translateX( 100%)`;ini_left[1] = 100; 
                    slide[2].style.transform = `translateX(-200%)`;ini_left[2] =-100; 
                    state = 2;
                    break;
                case 2:
                    slide[0].style.zIndex=2;
                    slide[1].style.zIndex=1;
                    slide[2].style.zIndex=2;
                    slide[0].style.transform = `translateX( 200%)`;ini_left[0] =  100; 
                    slide[1].style.transform = `translateX(-100%)`;ini_left[1] = -100; 
                    slide[2].style.transform = `translateX(-100%)`;ini_left[2] =    0; 
                    state = 3;
                    break;
                case 3:
                    slide[0].style.zIndex=1;
                    slide[1].style.zIndex=2;
                    slide[2].style.zIndex=2;
                    slide[0].style.transform = `translateX(   0%)`;ini_left[0] = -100; 
                    slide[1].style.transform = `translateX(   0%)`;ini_left[1] =    0; 
                    slide[2].style.transform = `translateX(   0%)`;ini_left[2] =  100; 
                    state = 1;
                    break;
            }
        }
        if (moveX<-200) {
            switch(state){
                case 1:
                    slide[0].style.zIndex=1;
                    slide[1].style.zIndex=2;
                    slide[2].style.zIndex=2;
                    slide[0].style.transform = `translateX( 200%)`;ini_left[0] =  100;
                    slide[1].style.transform = `translateX(-100%)`;ini_left[1] = -100;
                    slide[2].style.transform = `translateX(-100%)`;ini_left[2] =    0;
                    state = 3;
                    break;
                case 2:
                    slide[0].style.zIndex=2;
                    slide[1].style.zIndex=2;
                    slide[2].style.zIndex=1;
                    slide[0].style.transform = `translateX(   0%)`;ini_left[0] = -100;
                    slide[1].style.transform = `translateX(   0%)`;ini_left[1] =    0;
                    slide[2].style.transform = `translateX(   0%)`;ini_left[2] =  100;
                    state = 1;
                    break;
                case 3:
                    slide[0].style.zIndex=2;
                    slide[1].style.zIndex=1;
                    slide[2].style.zIndex=2;
                    slide[0].style.transform = `translateX( 100%)`;ini_left[0] =   0;
                    slide[1].style.transform = `translateX( 100%)`;ini_left[1] = 100;
                    slide[2].style.transform = `translateX(-200%)`;ini_left[2] =  -100;
                    state = 2;
                    break;
            }
        }
        if ( 200>=moveX && moveX>=-200 ) {
            slide[0].style.transition = `transform 0.5s ease`;slide[1].style.transition = `transform 0.5s ease`;slide[2].style.transition = `transform 0.5s ease`;
            switch (state){
                case 1: slide[0].style.transform=`translateX(0%)`;slide[1].style.transform=`translateX(0%)`;slide[2].style.transform=`translateX(0%)`;break;
                case 2: slide[0].style.transform=`translateX(100%)`;slide[1].style.transform=`translateX(100%)`;slide[2].style.transform=`translateX(-200%)`;break;
                case 3: slide[0].style.transform=`translateX(200%)`;slide[1].style.transform=`translateX(-100%)`;slide[2].style.transform=`translateX(-100%)`;break;
            }
        }
    });

    container.addEventListener('transitionend', function(e) {
        moveX = 0;
        isAnimation = false;
        positionDisplay.textContent = `isDragging: ${isDragging}, isAnimation: ${isAnimation} moveX:${moveX}`;
        positionDisplay2.textContent = `スライド終了`;
    });

    //container.addEventListener('mouseenter', function(e)){
    //    isOut = false;
   // }
    container.addEventListener('mouseleave', function(e) {
//        if(isOut) return;
        isOut = true;

        moveX = e.clientX - startX;
        startX =  e.clientX;
        positionDisplay.textContent = `isDragging: ${isDragging}, isAnimation: ${isAnimation} moveX:${moveX}`;
        positionDisplay2.textContent = `mouse_leave`;
        if (moveX==0) { 
            isDragging=false; 
            positionDisplay.textContent = `isDragging: ${isDragging}, isAnimation: ${isAnimation} moveX:${moveX}`;
            return;} 

        positionDisplay.textContent = `isDragging:${isDragging} moveX:${moveX}`;
        if (isAnimation) return;
        if (!isDragging) return;

        isDragging = false;
        isAnimation = true;

        slide[0].style.transition = trans_sec;
        slide[1].style.transition = trans_sec;
        slide[2].style.transition = trans_sec;
        if (moveX>200) {
            switch(state){
                case 1:
                    slide[0].style.zIndex=2;
                    slide[1].style.zIndex=2;
                    slide[2].style.zIndex=1;
                    slide[0].style.transform = `translateX( 100%)`;ini_left[0] =   0; 
                    slide[1].style.transform = `translateX( 100%)`;ini_left[1] = 100; 
                    slide[2].style.transform = `translateX(-200%)`;ini_left[2] =-100; 
                    state = 2;
                    break;
                case 2:
                    slide[0].style.zIndex=2;
                    slide[1].style.zIndex=1;
                    slide[2].style.zIndex=2;
                    slide[0].style.transform = `translateX( 200%)`;ini_left[0] =  100; 
                    slide[1].style.transform = `translateX(-100%)`;ini_left[1] = -100; 
                    slide[2].style.transform = `translateX(-100%)`;ini_left[2] =    0; 
                    state = 3;
                    break;
                case 3:
                    slide[0].style.zIndex=1;
                    slide[1].style.zIndex=2;
                    slide[2].style.zIndex=2;
                    slide[0].style.transform = `translateX(   0%)`;ini_left[0] = -100; 
                    slide[1].style.transform = `translateX(   0%)`;ini_left[1] =    0; 
                    slide[2].style.transform = `translateX(   0%)`;ini_left[2] =  100; 
                    state = 1;
                    break;
            }
        }
        if (moveX<-200) {
            switch(state){
                case 1:
                    slide[0].style.zIndex=1;
                    slide[1].style.zIndex=2;
                    slide[2].style.zIndex=2;
                    slide[0].style.transform = `translateX( 200%)`;ini_left[0] =  100;
                    slide[1].style.transform = `translateX(-100%)`;ini_left[1] = -100;
                    slide[2].style.transform = `translateX(-100%)`;ini_left[2] =    0;
                    state = 3;
                    break;
                case 2:
                    slide[0].style.zIndex=2;
                    slide[1].style.zIndex=2;
                    slide[2].style.zIndex=1;
                    slide[0].style.transform = `translateX(   0%)`;ini_left[0] = -100;
                    slide[1].style.transform = `translateX(   0%)`;ini_left[1] =    0;
                    slide[2].style.transform = `translateX(   0%)`;ini_left[2] =  100;
                    state = 1;
                    break;
                case 3:
                    slide[0].style.zIndex=2;
                    slide[1].style.zIndex=1;
                    slide[2].style.zIndex=2;
                    slide[0].style.transform = `translateX( 100%)`;ini_left[0] =   0;
                    slide[1].style.transform = `translateX( 100%)`;ini_left[1] = 100;
                    slide[2].style.transform = `translateX(-200%)`;ini_left[2] =  -100;
                    state = 2;
                    break;
            }
        }
        if ( 200>=moveX && moveX>=-200 ) {
            slide[0].style.transition = `transform 0.5s ease`;slide[1].style.transition = `transform 0.5s ease`;slide[2].style.transition = `transform 0.5s ease`;
            switch (state){
                case 1: slide[0].style.transform=`translateX(0%)`;slide[1].style.transform=`translateX(0%)`;slide[2].style.transform=`translateX(0%)`;break;
                case 2: slide[0].style.transform=`translateX(100%)`;slide[1].style.transform=`translateX(100%)`;slide[2].style.transform=`translateX(-200%)`;break;
                case 3: slide[0].style.transform=`translateX(200%)`;slide[1].style.transform=`translateX(-100%)`;slide[2].style.transform=`translateX(-100%)`;break;
            }
        }
    });

    function animateSlide() {
        if (isAnimation) return;
        if (isDragging) return;
        isDragging = false;
        isAnimation = true;
        slide[0].style.transition = `transform 1s ease`;
        slide[1].style.transition = `transform 1s ease`;
        slide[2].style.transition = `transform 1s ease`;
        switch(state){
            case 1:
                slide[0].style.zIndex=1;
                slide[1].style.zIndex=2;
                slide[2].style.zIndex=2;
                slide[0].style.transform = `translateX( 200%)`;ini_left[0] =  100;
                slide[1].style.transform = `translateX(-100%)`;ini_left[1] = -100;
                slide[2].style.transform = `translateX(-100%)`;ini_left[2] =    0;
                state = 3;
                break;
            case 2:
                slide[0].style.zIndex=2;
                slide[1].style.zIndex=2;
                slide[2].style.zIndex=1;
                slide[0].style.transform = `translateX(   0%)`;ini_left[0] = -100;
                slide[1].style.transform = `translateX(   0%)`;ini_left[1] =    0;
                slide[2].style.transform = `translateX(   0%)`;ini_left[2] =  100;
                state = 1;
                break;
            case 3:
                slide[0].style.zIndex=2;
                slide[1].style.zIndex=1;
                slide[2].style.zIndex=2;
                slide[0].style.transform = `translateX( 100%)`;ini_left[0] =   0;
                slide[1].style.transform = `translateX( 100%)`;ini_left[1] = 100;
                slide[2].style.transform = `translateX(-200%)`;ini_left[2] =  -100;
                state = 2;
                break;
        }
    }
    setInterval(animateSlide, 6000); // 1秒ごとにanimateSlide関数を実行

});
