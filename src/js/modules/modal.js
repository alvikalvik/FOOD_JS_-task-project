export function modal(modalSelector, dataModal, dataModalClose) {
    const modal = document.querySelector(modalSelector);        
    const modalTriggers = document.querySelectorAll(`[${dataModal}]`);        
    let isModalViewed = false;         

    function showModal() {            
        modal.classList.add('show', 'fade');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', function escapeModal(evt) {
            if (evt.code === 'Escape') {                    
                closeModal();
                document.removeEventListener('keydown', escapeModal);
            }
        });
        isModalViewed = true;
    }

    function closeModal() {
        modal.classList.remove('show', 'fade');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }
    
    for (const trigger of modalTriggers) {
        trigger.addEventListener('click', showModal);            
    }        

    modal.addEventListener('click', evt => {
        if (evt.target && (evt.target === modal || evt.target.matches(`[${dataModalClose}]`))) {
            closeModal();
        }
    });

    //AutoShow modal after 50 sec
    setTimeout(() => {
        if (!isModalViewed) {
            showModal();        
        }
    }, 50000);        

    window.addEventListener('scroll', function endScrollModal() {
        const scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        const scrollButtom = window.pageYOffset + document.documentElement.clientHeight;

        if(scrollButtom >= scrollHeight - 20) {
            if (!isModalViewed) {
                showModal();
            }                
            window.removeEventListener('scroll', endScrollModal);
        }
    });     
}