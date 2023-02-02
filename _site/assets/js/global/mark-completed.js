(function () {
  'use-strict';

  const getStoreFromLocalStorage = () => {
    const store = JSON.parse(localStorage.getItem('performanceKit')) || {};
    return store;
  };

  const getSections = () => {
    const sections = document.querySelectorAll('[data-section]');
    return sections;
  };

  const getButtons = () => {
    const buttons = document.querySelectorAll('[data-mark-complete-btn]');
    return buttons;
  };

  let store = getStoreFromLocalStorage() || {};
  const sections = getSections();
  const buttons = getButtons();
  const completedLessons = store?.completedLessons;

  const init = () => {
    addCompleteFlagToSections();
    updateMarkCompleteButtonUI();
    assignOnClickToButtons();
  };

  const assignOnClickToButtons = () => {
    buttons.forEach((button) => button.addEventListener('click', handleOnClick));
  };

  const updateMarkCompleteButtonUI = () => {
    buttons.forEach((button) => {
      const isCompleted = completedLessons?.find((lesson) => lesson === button.dataset.postid);

      if (isCompleted) {
        button.classList.add('completed');
        updateButton(button, 'add');
      } else {
        button.classList.remove('completed');
        updateButton(button, 'remove');
      }
    });
  };

  const addCompleteFlagToSections = () => {
    sections.forEach((section) => {
      const isCompleted = completedLessons?.find((lesson) => lesson === section.id);

      if (isCompleted) {
        section.classList.add('completed');
        const tick = createCompletedTick('section');
        const a = section.getElementsByTagName('a')[0];
        a.appendChild(tick);
      } else {
        section.classList.remove('completed');
        const tick = section.querySelector('[data-complete-tag]');
        tick?.remove();
      }
    });
  };

  const handleButtonTicks = (btn, action = null) => {
    if (action === 'add') {
      const tick = createCompletedTick('button');
      btn.appendChild(tick);
    } else {
      const btnTicks = document.querySelectorAll('[data-completed-tick]');
      btnTicks.forEach((btn) => btn.remove());
    }
  };

  const createCompletedTick = (element) => {
    const span = document.createElement('span');
    span.innerHTML = '&#9989';
    element === 'section' ? span.classList.add('text-4xl', 'absolute', 'right-6') : span.classList.add('text-2xl', 'ml-2', 'block');
    element === 'section' ? span.setAttribute('data-complete-tag', '') : span.setAttribute('data-completed-tick', '');
    return span;
  };

  const updateButton = (btn, action) => {
    if (action === 'remove') {
      btn.classList.remove('bg-primary-light', 'text-primary', 'hover:bg-secondary-hover', 'hover:text-primary', 'completed');

      btn.classList.add('bg-primary', 'text-secondary', 'hover:bg-primary-hover', 'hover:text-white');
      btn.innerHTML = 'Mark lesson complete';
      btn.dataset.completed = 'false';
      handleButtonTicks(btn);
    } else {
      btn.classList.remove('bg-primary', 'text-secondary', 'hover:bg-secondary-hover', 'hover:text-primary');
      btn.classList.add('bg-primary-light', 'text-primary', 'hover:bg-secondary-hover', 'hover:text-primary', 'completed');
      btn.innerHTML = 'Lesson complete';
      btn.dataset.completed = 'true';
      handleButtonTicks(btn, 'add');
    }
  };

  const updateLocalStorage = (btn, action) => {
    if (action === 'remove') {
      const filteredLessons = completedLessons.filter((lesson) => lesson !== btn.dataset.postid);
      store.completedLessons = filteredLessons;
      localStorage.performanceKit = JSON.stringify(store);
    } else {
      store = {
        completedLessons: [...(store.completedLessons ?? []), btn.dataset.postid],
      };
      localStorage.setItem('performanceKit', JSON.stringify(store));
    }
  };

  const handleOnClick = (event) => {
    const target = event.target;
    const action = target.dataset.completed === 'false' ? 'add' : 'remove';
    updateLocalStorage(target, action);
    updateButton(target, action);
  };

  init();
})();
