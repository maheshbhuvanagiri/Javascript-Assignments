requirejs(['text!../template/main.html',
           'util', 'service', 'pagination'], function(template, util, service, Pagination) {
    
    let main = document.querySelector('#main');
    main.appendChild(util.stringToElement(template));
    
    let container = main.querySelector('#container');
    container.addEventListener('click', event => {
        let target = event.target;
        
        if (target.classList.contains('title')) {
            event.stopPropagation();
            service.open(target.parentNode.getAttribute('id'));
        }
    });
    window.addEventListener('beforeunload', Pagination.destroy);
    Pagination.init(container);
    
    main.querySelector('input#search').addEventListener('keyup', event => {
        if (event.keyCode !== 13) {
            return;
        }
        
        let query = event.target.value;
        if (query.trim().length == 0) {
            Pagination.stop();
        } else {        
            service.search(query).then(data => {
                Pagination.start(data, query);
            }).catch(err => {
                container.querySelector('#viewPort').textContent = 'Search failed: ' + err;
            });
        }
    });
});