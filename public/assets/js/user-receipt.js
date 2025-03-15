const ViewMore = document.querySelectorAll(".choose");
const MoreInfor = document.querySelector(".more-infor");   
const iconClose = document.querySelectorAll('.icon-close');
const blurOverlay = document.querySelector('.blur-overlay');

ViewMore.forEach(item => {
    item.addEventListener('click', function(){
        MoreInfor.classList.add('active');
        blurOverlay.classList.add('active');
    });
});

iconClose.forEach(item => {
    item.addEventListener('click', function(){
        MoreInfor.classList.remove('active');
        blurOverlay.classList.remove('active');
    });
});


/*Client data*/
document.addEventListener('DOMContentLoaded', function() {
});

