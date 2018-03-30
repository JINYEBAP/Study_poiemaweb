function renderFilterResults(filters, products){

    var criteria = ['manufacturer','storage','os','camera'],
        results = [],
        isFiltered = false;

    checkboxes.prop('checked', false);


    criteria.forEach(function (c) {
        if(filters[c] && filters[c].length){

            if(isFiltered){
                products = results;
                results = [];
            }
            filters[c].forEach(function (filter) {
                products.forEach(function (item){
                    if(typeof item.specs[c] == 'number'){
                        if(item.specs[c] == filter){
                            results.push(item);
                            isFiltered = true;
                        }
                    }
                    if(typeof item.specs[c] == 'string'){
                        if(item.specs[c].toLowerCase().indexOf(filter) != -1){
                            results.push(item);
                            isFiltered = true;
                        }
                    }

                });
                if(c && filter){
                    $('input[name='+c+'][value='+filter+']').prop('checked',true);
                }
            });
        }
    });
    renderProductsPage(results);
}
