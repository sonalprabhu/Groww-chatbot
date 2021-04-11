const {dynamicQuestions} = require('./dynamic_questions_handler');

//Function for mapping correct answerFunc using context params
function getAnswerDynamicQuestion(answerFunc,context){
    return new Promise((resolve,reject)=>{
        const answerPromise = dynamicQuestions[answerFunc].call(null,context);
        answerPromise.then((answer)=>resolve(answer)).catch((err)=>reject(err));
    })
}
exports.getAnswerDynamicQuestion = getAnswerDynamicQuestion;