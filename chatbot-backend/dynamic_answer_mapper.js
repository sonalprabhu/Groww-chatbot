const { faqArr } = require('./data');

async function getAnswerDynamicQuestion(questionText,context){
    let answer = await faqArr.filter((faq)=>faq.faqQuestionText === questionText)[0].faqDynamicAnswer(context);
    return answer;
}
exports.getAnswerDynamicQuestion = getAnswerDynamicQuestion;