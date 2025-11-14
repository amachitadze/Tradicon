/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import * as state from './state.js';
import * as storage from './storage.js';
import * as utils from './utils.js';
import * as dom from './dom.js';
import { translations, HOME_ICON_SVG, SOUND_ON_ICON_SVG, SOUND_OFF_ICON_SVG } from './constants.js';
import { TOPICS, ALL_PRACTICE_QUESTIONS, QUESTIONS_BY_TOPIC } from './practice/index.js';
import { PracticeQuestion } from './types.js';

// --- RENDER FUNCTIONS ---

export function renderPracticeView() {
    const container = document.getElementById('results-container');
    if (!container) return;

    dom.form.hidden = true;
    const practiceContainer = document.createElement('div');
    practiceContainer.className = 'practice-container';
    container.innerHTML = '';
    container.appendChild(practiceContainer);

    if (state.getCurrentPracticeSession() && !state.getCurrentPracticeSession()!.isComplete) {
        renderCurrentPracticeQuestion(practiceContainer);
    } else if (state.getCurrentPracticeSession() && state.getCurrentPracticeSession()!.isComplete) {
        renderPracticeSessionResults(practiceContainer);
    } else {
        renderPracticeTopicSelection(practiceContainer);
    }
}

function renderPracticeTopicSelection(container: HTMLElement) {
    const t = translations[state.getCurrentLanguage()];
    const history = storage.getPracticeHistory();
    const topicKeys = Object.keys(TOPICS);
    
    const topicsHtml = topicKeys.map(key => {
        const topic = TOPICS[key as keyof typeof TOPICS];
        return `
            <button class="topic-card-btn" data-topic-id="${key}">
                <h3 class="topic-card-title">${topic[state.getCurrentLanguage()]}</h3>
                <p class="topic-card-desc">${topic[`description_${state.getCurrentLanguage()}`]}</p>
            </button>
        `;
    }).join('');

    const historyHtml = history.length > 0 ? `
        <div class="practice-history">
            <h3>${t.history}</h3>
            <ul class="practice-history-list">
                ${history.map(item => `
                    <li class="practice-history-item">
                        <span>${new Date(item.timestamp).toLocaleString(state.getCurrentLanguage(), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                        <span>${t.yourScore.replace('{score}', String(item.score)).replace('{total}', String(item.total))}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    ` : `<p class="empty-section-text">${t.practiceEmpty}</p>`;

    container.innerHTML = `
        <div class="practice-intro">
            <h2>${t.practiceHeaderTitle}</h2>
            <p>${t.practiceIntro}</p>
        </div>
        <div class="topic-selection-grid">${topicsHtml}</div>
        ${historyHtml}
    `;
}

function renderCurrentPracticeQuestion(container: HTMLElement) {
    const session = state.getCurrentPracticeSession();
    if (!session) return;

    const t = translations[state.getCurrentLanguage()];
    const question = session.questions[session.currentQuestionIndex];
    const questionNum = session.currentQuestionIndex + 1;
    const total = session.questions.length;

    let questionBodyHtml = '';
    if (question.type.startsWith('FILL_IN_THE_BLANK') && question.sentence_template) {
        questionBodyHtml = `
            <p class="practice-question-text">${question.sentence_template.replace('___', '<input type="text" id="practice-answer-input" class="practice-input" autocapitalize="off" autocomplete="off" spellcheck="false" />')}</p>
            ${question.tense_hint ? `<p class="practice-question-hint">${question.tense_hint}</p>` : ''}
        `;
    } else if (question.type.startsWith('MULTIPLE_CHOICE') && question.question_text && question.options) {
        questionBodyHtml = `
            <p class="practice-question-text">${question.question_text}</p>
            <div class="practice-options">
                ${question.options.map(option => `
                    <button class="practice-option-btn" data-answer="${utils.escapeHtml(option)}">${option}</button>
                `).join('')}
            </div>
        `;
    }

    container.innerHTML = `
        <div id="practice-question-card">
            <div class="practice-header">
                <button id="practice-home-btn" class="practice-header-btn" title="${t.back}">${HOME_ICON_SVG}</button>
                <div class="practice-header-right-controls">
                    <h3>${t.questionOf.replace('{current}', String(questionNum)).replace('{total}', String(total))}</h3>
                    <button id="practice-sound-toggle-btn" class="practice-header-btn" title="${t.toggleSound}">
                        ${state.getIsSoundEnabled() ? SOUND_ON_ICON_SVG : SOUND_OFF_ICON_SVG}
                    </button>
                </div>
            </div>
            <progress max="${total}" value="${questionNum}"></progress>
            <div class="practice-body">${questionBodyHtml}</div>
            <div id="practice-feedback" class="practice-feedback" hidden></div>
            <div class="practice-footer">
                <button id="check-answer-btn" class="main-action-btn">${t.checkAnswer}</button>
            </div>
        </div>
    `;
    
    if (question.type.startsWith('FILL_IN_THE_BLANK')) {
        (document.getElementById('practice-answer-input') as HTMLInputElement)?.focus();
    }
}

function renderPracticeSessionResults(container: HTMLElement) {
    const session = state.getCurrentPracticeSession();
    if (!session) return;
    const t = translations[state.getCurrentLanguage()];

    const score = session.userAnswers.filter((ans, i) => ans?.toLowerCase() === session.questions[i].correct_answer.toLowerCase()).length;
    const total = session.questions.length;
    const mistakes = session.questions
        .map((q, i) => ({ q, ans: session.userAnswers[i] }))
        .filter(item => item.ans && item.ans.toLowerCase() !== item.q.correct_answer.toLowerCase());

    const mistakesHtml = mistakes.length > 0 ? `
        <div class="mistakes-review">
            <h4>${t.reviewYourMistakes}</h4>
            <ul class="mistakes-list">
                ${mistakes.map(m => `
                    <li>
                        <p class="mistake-q">${m.q.sentence_template?.replace('___', `(...)`) || m.q.question_text}</p>
                        <p><strong>Your answer:</strong> <span class="incorrect-text">${m.ans}</span></p>
                        <p><strong>Correct answer:</strong> <span class="correct-text">${m.q.correct_answer} (${m.q.explanation})</span></p>
                    </li>
                `).join('')}
            </ul>
        </div>
    ` : `<div class="mistakes-review"><p>${t.noMistakes}</p></div>`;

    container.innerHTML = `
        <div class="practice-results">
            <h2>${t.sessionComplete}</h2>
            <div class="score-card">
                <p>${t.yourScore.replace('{score}', String(score)).replace('{total}', String(total))}</p>
                <p class="score-visual">${Math.round((score / total) * 100)}%</p>
            </div>
            ${mistakesHtml}
            <div class="practice-footer">
                <button id="practice-home-btn" class="main-action-btn">${t.practiceTab}</button>
            </div>
        </div>
    `;
}

// --- HANDLER FUNCTIONS ---

function startPracticeSession(topicId: string) {
    let questions: PracticeQuestion[] = [];
    if (topicId === 'all') {
        questions = [...ALL_PRACTICE_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 10);
    } else {
        const topicQuestions = QUESTIONS_BY_TOPIC[topicId];
        if (topicQuestions) {
            questions = [...topicQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);
        }
    }

    if (questions.length === 0) {
        console.error("No questions found for topic:", topicId);
        const t = translations[state.getCurrentLanguage()];
        utils.showAlertModal(t.practiceNoQuestionsTitle, t.practiceNoQuestionsBody);
        return;
    }

    state.setCurrentPracticeSession({
        questions: questions,
        userAnswers: Array(questions.length).fill(null),
        currentQuestionIndex: 0,
        isComplete: false,
    });
    renderPracticeView();
}

function handleAnswerSubmission() {
    const session = state.getCurrentPracticeSession();
    if (!session) return;

    const question = session.questions[session.currentQuestionIndex];
    const t = translations[state.getCurrentLanguage()];
    
    let userAnswer: string | null = null;
    if (question.type.startsWith('FILL_IN_THE_BLANK')) {
        const input = document.getElementById('practice-answer-input') as HTMLInputElement;
        userAnswer = input?.value.trim() || null;
    } else {
        const selectedOption = document.querySelector('.practice-option-btn.selected');
        userAnswer = (selectedOption as HTMLElement)?.dataset.answer || null;
    }

    if (!userAnswer) return;

    session.userAnswers[session.currentQuestionIndex] = userAnswer;
    const isCorrect = userAnswer.toLowerCase() === question.correct_answer.toLowerCase();

    // Show feedback
    const feedbackDiv = document.getElementById('practice-feedback') as HTMLDivElement;
    const checkBtn = document.getElementById('check-answer-btn') as HTMLButtonElement;
    
    feedbackDiv.hidden = false;
    feedbackDiv.className = `practice-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    let feedbackHtml = `<p class="${isCorrect ? 'correct' : 'incorrect'}">${isCorrect ? t.correct : t.incorrect}</p>`;
    if (!isCorrect) {
        feedbackHtml += `<p>${t.correctAnswerIs} <strong>${question.correct_answer}</strong></p>`;
        feedbackHtml += `<p>${question.explanation}</p>`;
    }
    feedbackDiv.innerHTML = feedbackHtml;
    
    // Play sound
    utils.playSound(isCorrect ? 'correct' : 'incorrect');
    
    // Disable inputs
    (document.querySelectorAll('.practice-option-btn') as NodeListOf<HTMLButtonElement>).forEach(btn => btn.disabled = true);
    const inputEl = document.getElementById('practice-answer-input') as HTMLInputElement;
    if (inputEl) inputEl.disabled = true;

    // Change button to "Next"
    checkBtn.textContent = t.nextQuestion;
    checkBtn.id = 'next-question-btn';
}

function handleNextQuestion() {
    const session = state.getCurrentPracticeSession();
    if (!session) return;
    session.currentQuestionIndex++;
    if (session.currentQuestionIndex >= session.questions.length) {
        handleEndPracticeSession();
    } else {
        renderPracticeView();
    }
}

function handleEndPracticeSession() {
    const session = state.getCurrentPracticeSession();
    if (!session) return;

    session.isComplete = true;

    // Save history
    const score = session.userAnswers.filter((ans, i) => ans?.toLowerCase() === session.questions[i].correct_answer.toLowerCase()).length;
    const total = session.questions.length;
    const mistakes = session.questions
        .map((q, i) => ({ question: q, userAnswer: session.userAnswers[i] }))
        .filter(item => item.userAnswer && item.userAnswer.toLowerCase() !== item.question.correct_answer.toLowerCase());

    storage.addPracticeResultToHistory({
        timestamp: Date.now(),
        score,
        total,
        mistakes: mistakes as { question: PracticeQuestion; userAnswer: string; }[] // Type assertion after filtering nulls
    });

    renderPracticeView();
}

function quitPracticeSession() {
    const t = translations[state.getCurrentLanguage()];
    utils.showConfirmModal(
        t.quitSessionTitle,
        t.quitSessionBody,
        t.yesButton,
        t.noButton,
        () => {
            state.setCurrentPracticeSession(null);
            renderPracticeView();
        }
    );
}

export function addPracticeDelegatedEventListeners() {
    dom.resultsContainer.addEventListener('click', (e) => {
        if (state.getCurrentView() !== 'practice') return;
        const target = e.target as HTMLElement;

        // Topic selection
        const topicBtn = target.closest('.topic-card-btn');
        if (topicBtn) {
            const topicId = (topicBtn as HTMLElement).dataset.topicId;
            if (topicId) startPracticeSession(topicId);
            return;
        }

        // Inside a session
        if (target.closest('#practice-home-btn')) {
            quitPracticeSession();
            return;
        }

        if (target.closest('#practice-sound-toggle-btn')) {
            state.setIsSoundEnabled(!state.getIsSoundEnabled());
            (target.closest('#practice-sound-toggle-btn') as HTMLButtonElement).innerHTML = state.getIsSoundEnabled() ? SOUND_ON_ICON_SVG : SOUND_OFF_ICON_SVG;
            return;
        }

        const optionBtn = target.closest('.practice-option-btn');
        if (optionBtn) {
            document.querySelectorAll('.practice-option-btn.selected').forEach(btn => btn.classList.remove('selected'));
            optionBtn.classList.add('selected');
            return;
        }
        
        if (target.closest('#check-answer-btn')) {
            handleAnswerSubmission();
            return;
        }

        if (target.closest('#next-question-btn')) {
            handleNextQuestion();
            return;
        }
    });

    dom.resultsContainer.addEventListener('keydown', (e) => {
        if (state.getCurrentView() !== 'practice' || e.key !== 'Enter') return;
        
        const input = e.target as HTMLElement;
        if (input.id === 'practice-answer-input' && (document.getElementById('check-answer-btn'))) {
            handleAnswerSubmission();
        } else if (document.getElementById('next-question-btn')) {
             handleNextQuestion();
        }
    });
}