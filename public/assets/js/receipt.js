document.addEventListener("DOMContentLoaded", function () {
    const viewMoreBtns = document.querySelectorAll(".choose");
    const moreInforContent = document.querySelector('.more-infor-content');
    const blurOverlay = document.querySelector('.blur-overlay');

    viewMoreBtns.forEach(item => {
        item.addEventListener('click', function(){
            const orderId = this.getAttribute('data-order-id');
            fetch(`pages/receipt-detail.php?order_id=${orderId}`)
                .then(response => response.text())
                .then(data => {
                    // Thay vì innerHTML
                    moreInforContent.innerHTML = '';
                    moreInforContent.insertAdjacentHTML('beforeend', data);
                    
                    const moreInfor = moreInforContent.querySelector('.more-infor');
                    blurOverlay.classList.add('active');
                    
                    // Lồng hai lần requestAnimationFrame để đảm bảo render kịp:
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            moreInfor.classList.add('active');
                        });
                    });                       

                    const iconClose = moreInfor.querySelector('.icon-close');
                    iconClose.addEventListener('click', function(){
                        moreInfor.classList.remove('active');

                        moreInfor.addEventListener('transitionend', () => {
                            blurOverlay.classList.remove('active');
                            moreInforContent.innerHTML = "";
                        }, { once: true });
                    });
                })
                .catch(error => console.error('Error loading order details:', error));
        });
    });
});
