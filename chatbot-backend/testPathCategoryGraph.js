const {createCategoriesGraph} = require('./categoriesGraph');

let categoriesGraph = createCategoriesGraph();

function getAllPaths(){
    let stack=[];
    stack.push(['root',""]);
    let allCategories = [];

    while(stack.length > 0){
        let curr = stack.pop();
        if(curr[1]){
            curr[1] += "->"
        }
        else{
            curr[1] += "\n"
        }
        curr[1] += curr[0];
        if(categoriesGraph[curr[0]] === null || categoriesGraph[curr[0]] === undefined){
            allCategories.push(curr[1].split('->'));
        }
        if(categoriesGraph[curr[0]]!==null && categoriesGraph[curr[0]]!==undefined)
        {
            for(const child of categoriesGraph[curr[0]]){
                stack.push([child,curr[1]]);
            }
        }
    }
    for(let categoryPath of allCategories){
        categoryPath.shift();
    }
    return allCategories;
}
const answers = getAllPaths();