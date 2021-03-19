class Graph{
    constructor(g){
        this.g=g;
    }
    addEdge(a,b){
        try{
            this.g[a].push(b);
        }
        catch(err){
            this.g[a]=[b];
        }
    }
    getGraph(){
        return this.g;
    }
}
function createCategoriesGraph(){
    let categoryGraph = new Graph({});
    for(const primaryCategories of ['Orders','My Account','Stocks','Gold','FDs','Mutual Funds','Products']){
        categoryGraph.addEdge('root',primaryCategories);
    }
    for(const orderCategories of ['Completed','Not completed','General']){
        categoryGraph.addEdge('Orders',orderCategories);
    }
    for(const accountCategories of ['Groww Account','KYC','Bank Accounts','Payments']){
        categoryGraph.addEdge('My Account',accountCategories);
    }
    for(const stockCategories of ['Demat Account','Holdings','IPO','Margin','Charges','P&L Reports','Others']){
        categoryGraph.addEdge('Stocks',stockCategories);
    }
    for(const goldCategories of ['About Digital Gold','Buying Gold','Selling Gold','Gold Storage & Insurance']){
        categoryGraph.addEdge('Gold',goldCategories);
    }
    for(const fdCategories of ['About FDs','FD Orders','Taxation','Withdrawal']){
        categoryGraph.addEdge('FDs',fdCategories);
    }
    for(const mutualFundCategories of ['My SIPs','AutoPay','Import Funds']){
        categoryGraph.addEdge('Mutual Funds',mutualFundCategories);
    }
    for(const productCategories of ['Heranba Industries','Vodafone Idea','ICICI Prudential Technology Direct Plan Growth','Tata Digital India Fund Direct Growth','Equitas 1 Year','Equitas 3 Months','Augmont Gold']){
        categoryGraph.addEdge('Products',productCategories);
        categoryGraph.addEdge(productCategories,productCategories+' General');
        categoryGraph.addEdge(productCategories,productCategories+' Previous Orders');
    }
    return categoryGraph.getGraph();
}

exports.createCategoriesGraph = createCategoriesGraph;