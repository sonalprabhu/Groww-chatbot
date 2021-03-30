const {dynamicQuestions} = require('./dynamic_questions_handler');

async function getAnswerDynamicQuestion(answerFunc,context){
    let answer = await dynamicQuestions[answerFunc].call(null,context);
    return answer;
}
exports.getAnswerDynamicQuestion = getAnswerDynamicQuestion;