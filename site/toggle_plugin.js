const answerClass = `toggle-answer`;
const buttonClass = `toggle-button`;

function toggleFunction(answerId){
    var answerEl = document.getElementById(answerId);
    if (answerEl.style.display === 'none') {
        answerEl.style.display = 'block';
    } else {
        answerEl.style.display = 'none';
    }
}


function wrapAnswer(answer, id){
    answerId = `${answerClass}-${id}`;
    return `<button onclick="toggleAnswer('${answerId}')" class="${buttonClass}">Show Answer</button>
    <div id="${answerId}" class="${answerClass}" style="display:none">
    ${answer}
    </div>`;
}

function getAllAnswers(text){
    const pattern = /%%%([\s\S]*?)%%%/g;
    let id = 0;
    return text.replace(pattern, function(match){
        const answer = match.replace(/%%%/g, '').trim();
        return wrapAnswer(answer,id++);
    });
}

function toggle_plugin(hook, vm) {
    hook.beforeEach(function(content) {
        content = getAllAnswers(content);
        return content;
    });
}
window.toggleAnswer = toggleFunction;
window.$docsify.plugins.push(toggle_plugin);
