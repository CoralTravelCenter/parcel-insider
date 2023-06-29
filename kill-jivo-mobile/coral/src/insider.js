import css from 'bundle-text:./insider.less';
import markup from 'bundle-text:./modal-markup.html';

const ls_key = 'jivo-respawn-timestamp';

if (shouldDisplayJivo()) {
    $('head').append('<style>' + css + '</style>');
    awaitMobileButton();
} else {
    $('head').append('<style>body > jdiv { display: none!important; }</style>');
}

function shouldDisplayJivo() {
    const now = new Date().getTime();
    return now > Number(localStorage.getItem(ls_key));
}

function awaitMobileButton() {
    const $jivoBitton = $('.__jivoMobileButton');
    if ($jivoBitton.length) {
        addKillerTo($jivoBitton);
        const mo = new MutationObserver((list, observer) => {
            for (const mut of list) {
                if (mut.type === 'childList') {
                    let jivo_button = Array.from(mut.addedNodes).find(node => node.classList?.contains('__jivoMobileButton'));
                    if (jivo_button) {
                        addKillerTo(jivo_button);
                        return;
                    }
                }
            }
        });
        mo.observe(document.querySelector('body > jdiv'), {
            childList: true,
            subtree: true,
        });
        $(document).on('click', '[data-kill-timeout-mins]', handleKill);
    } else {
        setTimeout(arguments.callee, 200);
    }
}

function addKillerTo($jivoBitton) {
    $jivoBitton = $($jivoBitton);
    const $killer = $('<div class="jivo-killer">clear</div>');
    $killer.on('click', invokeModal);
    $jivoBitton.append($killer)
    $('body').append(markup);
}

function invokeModal() {
    $('#kill-jivo-options-modal').modal();
}

function handleKill() {
    const $this = $(this);
    const mins = Number($this.attr('data-kill-timeout-mins'));
    const respawn_timestamp = new Date().getTime() + mins * 60000;
    localStorage.setItem(ls_key, respawn_timestamp);
}